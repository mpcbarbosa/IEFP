'use client';

import { useEffect, useState } from 'react';
import { useCourseQuery } from '@/lib/useCourseQuery';

function SearchIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m21 21-4.3-4.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header(props: { title: string; updateDate: string }) {
  const { state, set } = useCourseQuery();
  const [value, setValue] = useState(state.q);

  useEffect(() => setValue(state.q), [state.q]);

  return (
    <header className="sticky top-0 z-40 border-b border-iefp-line bg-white/75 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wider text-iefp-muted">atualização: {props.updateDate}</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl2 bg-iefp-ink text-white shadow-soft">
              <span className="text-xs font-semibold">i</span>
            </span>
            <span className="truncate text-sm font-semibold text-iefp-ink sm:text-base">{props.title}</span>
          </div>
        </div>

        <div className="flex w-[52%] max-w-[520px] items-center gap-2 sm:w-[420px]">
          <label className="sr-only" htmlFor="search">pesquisar cursos</label>
          <div className="relative w-full">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-iefp-muted">
              <SearchIcon />
            </span>
            <input
              id="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') set({ q: value });
              }}
              placeholder="pesquisar por designação…"
              className="w-full rounded-xl2 border border-iefp-line bg-white px-9 py-2 text-sm shadow-soft placeholder:text-iefp-muted/80 focus:border-program-qi/60 focus:ring-4 focus:ring-[rgba(18,179,166,0.18)]"
            />
          </div>

          <button
            type="button"
            onClick={() => set({ q: value })}
            className="hidden rounded-xl2 bg-iefp-ink px-3 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95 sm:inline-flex"
            aria-label="aplicar pesquisa"
          >
            procurar
          </button>
        </div>
      </div>
    </header>
  );
}
