import type { Dataset } from '@/lib/schema';

function Icon({ variant }: { variant: 'alert' | 'check' | 'mail' | 'video' }) {
  const common = 'h-5 w-5';
  switch (variant) {
    case 'alert':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 9v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 17h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'check':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 6 9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'mail':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 6h16v12H4V6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="m4 7 8 6 8-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'video':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M14 8H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="m17 10 4-2v8l-4-2v-4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export function Notices({ notes }: { notes: Dataset['importantNotes'] }) {
  // Expecting 3-4 lines. If more, we still render all.
  const items = notes.map((text, idx) => {
    const variant = idx === 0 ? 'alert' : idx === 1 ? 'check' : idx === 2 ? 'mail' : 'video';
    const tone =
      idx === 0
        ? { ring: 'ring-program-apz/20', bg: 'bg-program-apz/10', text: 'text-program-apz' }
        : idx === 1
          ? { ring: 'ring-program-efa/20', bg: 'bg-program-efa/10', text: 'text-program-efa' }
          : idx === 2
            ? { ring: 'ring-program-ccd/20', bg: 'bg-program-ccd/10', text: 'text-program-ccd' }
            : { ring: 'ring-program-jd/20', bg: 'bg-program-jd/10', text: 'text-program-jd' };

    return { text, variant, tone };
  });

  return (
    <section aria-label="notas importantes" className="space-y-3">
      <div className="flex items-end justify-between">
        <h2 className="text-sm font-semibold text-iefp-ink">notas importantes</h2>
        <p className="text-xs text-iefp-muted">informação do documento</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((it) => (
          <div
            key={it.text}
            className={`rounded-xl2 border border-iefp-line bg-white/80 backdrop-blur p-4 shadow-soft ring-1 ${it.tone.ring}`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl2 ${it.tone.bg} ${it.tone.text}`}>
                <Icon variant={it.variant as any} />
              </div>
              <p className="text-sm leading-relaxed text-iefp-ink">{it.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
