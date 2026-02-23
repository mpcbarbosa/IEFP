'use client';

import type { Dataset } from '@/lib/schema';
import { useCourseQuery } from '@/lib/useCourseQuery';
import { applyFilters } from '@/lib/filterCourses';
import { Filters } from './Filters';
import { IndexNav } from './IndexNav';
import { Notices } from './Notices';
import { Section } from './Section';
import { Hero } from './Hero';

export function Explorer({ dataset }: { dataset: Dataset }) {
  const { state, reset } = useCourseQuery();
  const filteredAll = applyFilters(dataset.courses, state);

  const emptyState = (
    <div className="rounded-xl2 border border-iefp-line bg-white/80 backdrop-blur p-4 text-sm text-iefp-ink shadow-soft">
      <p className="font-semibold">sem resultados</p>
      <p className="mt-1 text-iefp-muted">tenta limpar filtros ou ajustar a pesquisa.</p>
      <button
        type="button"
        className="mt-3 rounded-xl2 bg-iefp-ink px-3 py-2 text-xs font-semibold text-white hover:opacity-95"
        onClick={() => reset()}
      >
        limpar tudo
      </button>
    </div>
  );

  return (
    <main id="topo" className="mx-auto max-w-7xl px-4 py-6">
      <div className="space-y-6">
        <Hero meta={dataset.meta} />

        <div className="grid gap-6 lg:grid-cols-[360px_1fr] lg:items-start">
          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-xl2 border border-iefp-line bg-white/70 backdrop-blur p-4 shadow-card">
              <IndexNav sections={dataset.sections} />
            </div>

            <div className="rounded-xl2 border border-iefp-line bg-white/70 backdrop-blur p-4 shadow-card">
              <Filters dataset={dataset} />
            </div>

            <div className="rounded-xl2 border border-iefp-line bg-white/70 backdrop-blur p-4 shadow-soft">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-iefp-muted">sobre</h3>
              <p className="mt-2 text-sm text-iefp-muted">
                exploração local e offline do documento, com pesquisa, filtros, ordenação e links diretos por curso.
              </p>
              {dataset.meta.contactEmail ? (
                <p className="mt-3 text-sm">
                  <span className="text-iefp-muted">contacto: </span>
                  <a className="font-semibold text-program-qi hover:underline" href={`mailto:${dataset.meta.contactEmail}`}>
                    {dataset.meta.contactEmail}
                  </a>
                </p>
              ) : null}
            </div>
          </aside>

          <div className="space-y-8">
            <Notices notes={dataset.importantNotes} />

            <div className="space-y-10">
              {dataset.sections.map((s) => (
                <Section
                  key={s.anchor}
                  section={s}
                  courses={filteredAll.filter((c) => c.program === s.program)}
                  emptyState={emptyState}
                />
              ))}
            </div>

            <footer className="pb-10 pt-2 text-xs text-iefp-muted">
              <p>fonte: {dataset.meta.sourcePdf}. app offline (sem APIs externas). dados locais validados com zod.</p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
