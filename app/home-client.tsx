"use client";

import { useMemo } from "react";

import { Header } from "@/components/Header";
import { IndexNav } from "@/components/IndexNav";
import { Filters } from "@/components/Filters";
import { Section } from "@/components/Section";

import type { Course } from "@/lib/schema";
import { getDataset } from "@/lib/loadDataset";
import { applyFilters } from "@/lib/filterCourses";
import { useCourseQuery } from "@/lib/useCourseQuery";

export default function HomeClient() {
  const { state } = useCourseQuery();

  // dataset validado via zod (DatasetSchema) no getDataset()
  const dataset = useMemo(() => getDataset(), []);

  const filtered = useMemo(() => applyFilters(dataset.courses, state), [dataset.courses, state]);

  const byProgram = useMemo(() => {
    const map = new Map<string, Course[]>();
    for (const c of filtered) {
      const key = c.program;
      const arr = map.get(key) ?? [];
      arr.push(c);
      map.set(key, arr);
    }
    return map;
  }, [filtered]);

  return (
    <div className="min-h-screen">
      <Header title={dataset.meta.title} updateDate={dataset.meta.updateDate} />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl2 border border-iefp-line bg-white/70 backdrop-blur shadow-soft">
              <div className="p-4">
                <h2 id="indice" className="text-sm font-semibold text-iefp-ink">
                  índice e filtros
                </h2>
              </div>

              <div className="border-t border-iefp-line p-4">
                <Filters dataset={dataset} />
              </div>

              <div className="border-t border-iefp-line p-4">
                <IndexNav />
              </div>
            </div>
          </aside>

          <section className="space-y-8">
            {dataset.sections.map((sec) => (
              <Section
                key={sec.anchor}
                section={sec}
                courses={byProgram.get(sec.program) ?? []}
                emptyState={
                  <div className="rounded-xl2 border border-iefp-line bg-white/70 backdrop-blur p-6 shadow-soft">
                    <p className="text-sm text-iefp-muted">
                      sem cursos para mostrar nesta secção com os filtros atuais
                    </p>
                  </div>
                }
              />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
