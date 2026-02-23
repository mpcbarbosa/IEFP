import type React from 'react';
import type { Dataset, Course } from '@/lib/schema';
import { getProgramTheme } from '@/lib/programTheme';
import { CourseTable } from './CourseTable';

export function Section({
  section,
  courses,
  emptyState
}: {
  section: Dataset['sections'][number];
  courses: Course[];
  emptyState?: React.ReactNode;
}) {
  const theme = getProgramTheme(section.program);
  const isEmpty = courses.length === 0;

  const Requirements = ({ text, notes }: { text?: string; notes?: string[] }) => {
    if (!text && (!notes || notes.length === 0)) return null;
    return (
      <div className={`rounded-xl2 border border-iefp-line bg-white/75 backdrop-blur p-4 shadow-soft ring-1 ${theme.ring}`}>
        {text ? (
          <p className="whitespace-pre-line text-sm text-iefp-ink">{text}</p>
        ) : null}
        {notes?.length ? (
          <p className="mt-3 text-xs text-iefp-muted">{notes.join(' · ')}</p>
        ) : null}
      </div>
    );
  };

  return (
    <section id={`sec-${section.anchor}`} className="scroll-mt-28">
      <div className="rounded-xl2 border border-iefp-line bg-white/70 backdrop-blur shadow-card overflow-hidden">
        <div className={`${theme.headerBg} px-5 py-4`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold text-white">
                  {theme.label}
                </span>
                <h2 className="truncate text-base sm:text-lg font-semibold text-white">{section.title}</h2>
              </div>
            </div>

            <a
              href={`#sec-${section.anchor}`}
              className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white hover:bg-white/25"
              aria-label="link direto para secção"
              title="link da secção"
            >
              link
            </a>
          </div>
        </div>

        <div className="p-5">
          {section.subprograms?.length ? (
            <div className="space-y-10">
              {section.subprograms.map((sp) => {
                const subCourses = courses.filter((c) => (c.subprogram ?? '') === sp.title);
                return (
                  <div key={sp.anchor} id={`sub-${sp.anchor}`} className="scroll-mt-28">
                    <div className="grid gap-4 lg:grid-cols-[1fr_360px] lg:items-start">
                      <div>
                        <h3 className="text-sm font-semibold text-iefp-ink">{sp.title}</h3>
                        <div className="mt-3">
                          {subCourses.length ? (
                            <>
                              <div className="hidden md:block">
                                <CourseTable courses={subCourses} variant="desktop" program={section.program} />
                              </div>
                              <div className="md:hidden">
                                <CourseTable courses={subCourses} variant="mobile" program={section.program} />
                              </div>
                            </>
                          ) : (
                            emptyState ?? null
                          )}
                        </div>
                      </div>

                      <div>
                        <Requirements text={sp.requirementsText} notes={sp.notes} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-[1fr_360px] lg:items-start">
              <div>
                {isEmpty ? (
                  emptyState ?? null
                ) : (
                  <>
                    <div className="hidden md:block">
                      <CourseTable courses={courses} variant="desktop" program={section.program} />
                    </div>
                    <div className="md:hidden">
                      <CourseTable courses={courses} variant="mobile" program={section.program} />
                    </div>
                  </>
                )}
              </div>
              <div>
                <Requirements text={section.requirementsText} notes={section.notes} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
