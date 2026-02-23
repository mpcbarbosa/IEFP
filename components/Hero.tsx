import Link from 'next/link';
import type { Dataset } from '@/lib/schema';

export function Hero({ meta }: { meta: Dataset['meta'] }) {
  const trimester = meta.trimester ?? '1.º trimestre';
  return (
    <section className="relative overflow-hidden rounded-xl2 border border-iefp-line bg-white/70 backdrop-blur shadow-card">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="select-none text-[140px] sm:text-[240px] font-semibold tracking-[0.28em] text-iefp-ink/10">
          2026
        </div>
      </div>

      <div className="relative p-5 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-iefp-muted">
              serviço de formação profissional de coimbra
            </p>
            <h1 className="mt-2 text-2xl sm:text-4xl font-semibold text-iefp-ink">{meta.title}</h1>
            <p className="mt-2 text-sm text-iefp-muted">
              atualização: <span className="font-semibold text-iefp-ink">{meta.updateDate}</span>
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-iefp-ink text-white shadow-soft">
            <span className="text-xs tracking-wide uppercase">{trimester}</span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="rounded-xl2 border border-iefp-line bg-white p-4">
            <p className="text-sm text-iefp-muted">consulta e inscreve-te</p>
            <p className="mt-1 text-base sm:text-lg font-semibold text-iefp-ink">
              {meta.signupHint ?? 'ofertas.iefp.pt/coimbra.pdf'}
            </p>
          </div>

          <Link
            href="#indice"
            className="inline-flex justify-center rounded-xl2 bg-program-qi px-4 py-3 text-white font-semibold shadow-soft hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-[rgba(18,179,166,0.25)]"
          >
            ver índice
          </Link>
        </div>
      </div>
    </section>
  );
}
