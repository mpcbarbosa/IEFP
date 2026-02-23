import fs from 'node:fs';
import path from 'node:path';
import pdf from 'pdf-parse';

// NOTE:
// Este parser é "best effort". O PDF é muito visual e pode ter quebras de linha/coluna.
// A prioridade do repositório é a fidelidade do dataset final em data/courses.json.

type Args = { pdfPath: string; outPath: string };

function parseArgs(): Args {
  const argv = process.argv.slice(2);
  const get = (k: string) => {
    const idx = argv.indexOf(k);
    return idx >= 0 ? argv[idx + 1] : undefined;
  };
  const pdfPath = get('--pdf');
  const outPath = get('--out');
  if (!pdfPath || !outPath) {
    // eslint-disable-next-line no-console
    console.error('uso: tsx scripts/parse-pdf-to-json.ts --pdf ./data/coimbra.pdf --out ./data/courses.generated.json');
    process.exit(1);
  }
  return { pdfPath, outPath };
}

function cleanLines(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => l.replace(/\s+/g, ' '));
}

async function main() {
  const { pdfPath, outPath } = parseArgs();

  const buf = fs.readFileSync(pdfPath);
  const res = await pdf(buf);
  const lines = cleanLines(res.text);

  // Dump raw text for debugging (optional)
  const rawOut = outPath.replace(/\.json$/i, '.raw.txt');
  fs.writeFileSync(rawOut, lines.join('\n'), 'utf8');

  // Very small heuristic parser for this specific document.
  // It finds course rows by scanning known program headers and table columns.
  // If you need 100% fidelity, use data/courses.json (curated dataset).

  const programs = ['APZ', 'APZ+', 'EFA', 'CCD', 'PLA', 'J+D', 'QI', 'VA'] as const;
  const dataset: any = {
    meta: {
      title: 'Plano de Formação — Serviço de Formação Profissional de Coimbra',
      updateDate: '18.12.2025'
    },
    importantNotes: [],
    sections: [],
    courses: []
  };

  // Important notes: grab first occurrence of the 4 standard statements.
  const noteMatchers = [
    'As ações de formação estão sujeitas a alterações',
    'Em caso de excesso de inscrições',
    'Os candidatos elegíveis e selecionados',
    'Para as formações com sessões a distância'
  ];

  for (const m of noteMatchers) {
    const found = lines.find((l) => l.startsWith(m));
    if (found) dataset.importantNotes.push(found);
  }

  // Minimal course extraction via regex patterns found in this PDF.
  // This is not a generic table extractor.
  const addCourse = (c: any) => dataset.courses.push(c);

  // Hard-coded patterns (stable for this document).
  // APZ
  if (lines.some((l) => l.startsWith('APZ Cursos de Aprendizagem'))) {
    const row = lines.find((l) => l.startsWith('Técnico/a Instalações Elétricas'));
    if (row) {
      // row is typically: "Técnico/a Instalações Elétricas fevereiro Coimbra presencial"
      const parts = row.split(' ');
      const month = parts.at(-3);
      const concelho = parts.at(-2);
      const regime = parts.at(-1);
      addCourse({
        id: 'apz-tecnico-instalacoes-eletricas-coimbra-fevereiro',
        program: 'APZ',
        subprogram: '12º ano + nível 4 (dupla certificação)',
        designation: 'Técnico/a Instalações Elétricas',
        inscrição: 'iefponline',
        monthStart: month,
        concelho,
        regime
      });
    }
  }

  // APZ+
  const apzPlusRows = lines.filter((l) => l.startsWith('Técnico/a Especialista em'));
  for (const r of apzPlusRows) {
    const month = r.includes('março') ? 'março' : r.includes('fevereiro') ? 'fevereiro' : undefined;
    const concelho = 'Coimbra';
    addCourse({
      id: `apzplus-${r.includes('E-Commerce') ? 'tecnico-especialista-e-commerce-coimbra-fevereiro' : 'tecnico-especialista-gestao-hoteleira-alojamento-coimbra-marco'}`,
      program: 'APZ+',
      subprogram: 'nível 5 (certificação profissional)',
      designation: r.replace(/\s+(fevereiro|março)\s+Coimbra\s+misto$/i, ''),
      inscrição: 'iefponline',
      monthStart: month,
      concelho,
      regime: 'misto'
    });
  }

  // The rest of the sections are better kept as curated data.
  // Emit what we have + raw text to help manual completion.
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(dataset, null, 2), 'utf8');

  // eslint-disable-next-line no-console
  console.log(`ok: wrote ${outPath}`);
  // eslint-disable-next-line no-console
  console.log(`raw text: ${rawOut}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
