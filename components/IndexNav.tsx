'use client';

import type { Dataset } from '@/lib/schema';
import { getProgramTheme } from '@/lib/programTheme';
import { useScrollSpy } from '@/lib/useScrollSpy';

export function IndexNav({ sections }: { sections: Dataset['sections'] }) {
  const active = useScrollSpy(sections.map((s) => s.anchor));

  return (
    <nav aria-label="índice" id="indice" className="space-y-3">
      <div className="flex items-end justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-iefp-muted">índice</h2>
        <a href="#topo" className="text-xs text-iefp-muted hover:underline">
          topo
        </a>
      </div>

      <ul className="space-y-1 text-sm">
        {sections.map((s) => {
          const theme = getProgramTheme(s.program);
          const isActive = active === s.anchor;
          return (
            <li key={s.anchor}>
              <a
                className={[
                  'group flex items-center gap-2 rounded-xl2 px-2 py-1.5 transition',
                  isActive
                    ? 'bg-white shadow-soft ring-1 ring-iefp-line'
                    : 'hover:bg-white/70 hover:shadow-soft'
                ].join(' ')}
                href={`#sec-${s.anchor}`}
              >
                <span className={`h-2 w-2 rounded-full ${theme.bulletBg}`} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate text-iefp-ink">{s.title}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${theme.chipBg} ${theme.chipText}`}
                >
                  {theme.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
