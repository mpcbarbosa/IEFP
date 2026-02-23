# plano de formação — coimbra (SPA offline)

Aplicação web (Next.js + TypeScript + Tailwind) para explorar o PDF **“Plano de Formação — Serviço de Formação Profissional de Coimbra (ATUALIZAÇÃO: 18.12.2025)”** com:

- cabeçalho fixo com título e pesquisa global
- bloco de avisos/notas importantes
- índice navegável por secções e subsecções (âncoras)
- listagem fiel dos cursos (tabelas no desktop; cards no mobile)
- filtros (com estado no URL) e ordenação
- deep links por curso (hash `#curso-<slug>`) e rota alternativa `/curso/<slug>`
- validação do dataset com zod

## requisitos

- Node.js 18+

## instalar dependências

```bash
npm install
```

## correr em desenvolvimento

```bash
npm run dev
```

Abrir: `http://localhost:3000`

## build + start

```bash
npm run build
npm run start
```

## dataset

- dataset final (curado e validado): `data/courses.json`
- PDF local: `data/coimbra.pdf`

## parsing do PDF (best effort)

O PDF é fortemente visual; o script de parsing tenta extrair texto e gerar um JSON **parcial** + dump de texto, para apoiar correções.

```bash
npm run parse:pdf
```

Outputs:
- `data/courses.generated.json`
- `data/courses.generated.raw.txt`

> Nota: a fonte de verdade para a app é `data/courses.json` (fidelidade ao PDF).
