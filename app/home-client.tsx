"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { Header } from "@/components/Header";
import { IndexNav } from "@/components/IndexNav";
import { Filters } from "@/components/Filters";
import { Section } from "@/components/Section";

import coursesRaw from "@/data/courses.json";
import { validateCourses } from "@/lib/validate";

export default function HomeClient() {
  const searchParams = useSearchParams();

  // validação (zod) dos dados locais
  const courses = useMemo(() => validateCourses(coursesRaw as any), []);

  // leitura de filtros via query params
  const q = (searchParams.get("q") ?? "").trim();
  const concelho = searchParams.get("concelho") ?? "";
  const regime = searchParams.get("regime") ?? "";
  const mes = searchParams.get("mes") ?? "";
  const program = searchParams.get("program") ?? "";
  const sort = searchParams.get("sort") ?? "mes";

  return (
    <div className="min-h-screen">
      <Header title="plano de formação" updateDate="18.12.2025" />

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
                <Filters courses={courses} />
              </div>
              <div className="border-t border-iefp-line p-4">
                <IndexNav />
              </div>
            </div>
          </aside>

          <section className="space-y-8">
            {/* A tua UI principal por secções */}
            <Section
              courses={courses}
              query={{ q, concelho, regime, mes, program, sort }}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

