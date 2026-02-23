'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Course } from '@/lib/schema';
import { getProgramTheme } from '@/lib/programTheme';

function SignupCell({ value }: { value?: string }) {
  if (!value) return <span className="text-iefp-muted">—</span>;
  const v = value.trim();
  if (v.toLowerCase() === 'iefponline') {
    return (
      <a
        href="https://iefponline.iefp.pt"
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-program-qi hover:underline"
      >
        iefponline
      </a>
    );
  }
  return <span>{v}</span>;
}

function LinkIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10 13a5 5 0 0 1 0-7l1.4-1.4a5 5 0 0 1 7 7L17 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 11a5 5 0 0 1 0 7L12.6 19.4a5 5 0 0 1-7-7L7 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CopyLinkButton({ id }: { id: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 rounded-xl2 border border-iefp-line bg-white px-2 py-1 text-xs font-semibold text-iefp-ink hover:bg-white/70"
      onClick={async () => {
        const url = `${window.location.origin}${window.location.pathname}${window.location.search}#curso-${id}`;
        await navigator.clipboard.writeText(url);
      }}
      aria-label="copiar link do curso"
      title="copiar link"
    >
      <LinkIcon />
      link
    </button>
  );
}

function useActiveHashId() {
  const [hash, setHash] = useState<string>(() => (typeof window !== 'undefined' ? window.location.hash : ''));
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  const id = useMemo(() => {
    const m = hash.match(/^#curso-(.+)$/);
    return m?.[1] ?? '';
  }, [hash]);
  return id;
}

export function CourseTable({
  courses,
  variant,
  program
}: {
  courses: Course[];
  variant: 'desktop' | 'mobile';
  program: Course['program'];
}) {
  const theme = getProgramTheme(program);
  const activeId = useActiveHashId();

  if (variant === 'mobile') {
    return (
      <div className="grid gap-3">
        {courses.map((c) => {
          const isActive = activeId === c.id;
          return (
            <article
              key={c.id}
              id={`curso-${c.id}`}
              className={[
                'rounded-xl2 border border-iefp-line bg-white/80 backdrop-blur p-4 shadow-soft',
                isActive ? `ring-4 ${theme.ring} shadow-card` : ''
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${theme.chipBg} ${theme.chipText}`}>
                      {theme.label}
                    </span>
                    <h3 className="truncate text-sm font-semibold text-iefp-ink">{c.designation}</h3>
                  </div>
                  {c.notes?.length ? (
                    <p className="mt-2 text-xs text-iefp-muted">{c.notes.join(' · ')}</p>
                  ) : null}
                </div>
                <CopyLinkButton id={c.id} />
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <dt className="text-iefp-muted">mês início</dt>
                  <dd className="font-semibold text-iefp-ink">{c.monthStart ?? '—'}</dd>
                </div>
                <div>
                  <dt className="text-iefp-muted">concelho</dt>
                  <dd className="font-semibold text-iefp-ink">{c.concelho ?? '—'}</dd>
                </div>
                <div>
                  <dt className="text-iefp-muted">regime</dt>
                  <dd className="font-semibold text-iefp-ink">{c.regime ?? '—'}</dd>
                </div>
                {c.horario ? (
                  <div>
                    <dt className="text-iefp-muted">horário</dt>
                    <dd className="font-semibold text-iefp-ink">{c.horario}</dd>
                  </div>
                ) : null}
                {typeof c.hours === 'number' ? (
                  <div>
                    <dt className="text-iefp-muted">nº horas</dt>
                    <dd className="font-semibold text-iefp-ink">{c.hours}</dd>
                  </div>
                ) : null}
                {c.access ? (
                  <div className="col-span-2">
                    <dt className="text-iefp-muted">habil. acesso</dt>
                    <dd className="font-semibold text-iefp-ink">{c.access}</dd>
                  </div>
                ) : null}
                <div className="col-span-2">
                  <dt className="text-iefp-muted">inscrição</dt>
                  <dd className="font-semibold text-iefp-ink">
                    <SignupCell value={c.inscrição} />
                  </dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    );
  }

  // desktop table
  const hasHorario = courses.some((c) => Boolean(c.horario));
  const hasHours = courses.some((c) => typeof c.hours === 'number');
  const hasAccess = courses.some((c) => Boolean(c.access));

  return (
    <div className="overflow-hidden rounded-xl2 border border-iefp-line bg-white/80 backdrop-blur shadow-soft">
      <div className="max-h-[70vh] overflow-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className={`sticky top-0 ${theme.headerBg}`}>
            <tr className="text-xs uppercase tracking-wide text-white/90">
              <th className="px-4 py-3">designação</th>
              <th className="px-4 py-3">inscrição</th>
              <th className="px-4 py-3">mês início</th>
              <th className="px-4 py-3">concelho</th>
              {hasHorario ? <th className="px-4 py-3">horário</th> : null}
              <th className="px-4 py-3">regime</th>
              {hasHours ? <th className="px-4 py-3">nº horas</th> : null}
              {hasAccess ? <th className="px-4 py-3">habil. acesso</th> : null}
              <th className="px-4 py-3" aria-label="link"> </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, idx) => {
              const isActive = activeId === c.id;
              const zebra = idx % 2 === 0 ? 'bg-white' : 'bg-white/70';
              return (
                <tr
                  key={c.id}
                  id={`curso-${c.id}`}
                  className={[
                    'border-t border-iefp-line/60 align-top transition',
                    zebra,
                    'hover:bg-iefp-bg/60',
                    isActive ? 'bg-iefp-bg/70' : ''
                  ].join(' ')}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      <span className={`mt-0.5 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${theme.chipBg} ${theme.chipText}`}>
                        {theme.label}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-iefp-ink">{c.designation}</p>
                        {c.notes?.length ? (
                          <p className="mt-1 text-xs text-iefp-muted">{c.notes.join(' · ')}</p>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <SignupCell value={c.inscrição} />
                  </td>
                  <td className="px-4 py-3">{c.monthStart ?? '—'}</td>
                  <td className="px-4 py-3">{c.concelho ?? '—'}</td>
                  {hasHorario ? <td className="px-4 py-3">{c.horario ?? '—'}</td> : null}
                  <td className="px-4 py-3">{c.regime ?? '—'}</td>
                  {hasHours ? (
                    <td className="px-4 py-3">{typeof c.hours === 'number' ? c.hours : '—'}</td>
                  ) : null}
                  {hasAccess ? <td className="px-4 py-3">{c.access ?? '—'}</td> : null}
                  <td className="px-4 py-3">
                    <CopyLinkButton id={c.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
