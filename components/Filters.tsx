'use client';

import type { Dataset } from '@/lib/schema';
import { uniq } from '@/lib/utils';
import { useCourseQuery } from '@/lib/useCourseQuery';

function Select({
  id,
  label,
  value,
  options,
  onChange
}: {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-xs font-semibold text-iefp-muted">
        {label}
      </label>
      <select
        id={id}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl2 border border-iefp-line bg-white/80 backdrop-blur px-3 py-2 text-sm shadow-soft focus:ring-4 focus:ring-[rgba(18,179,166,0.18)]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-2 rounded-full border border-iefp-line bg-white/80 px-3 py-1 text-xs font-semibold text-iefp-ink hover:bg-white"
      aria-label={`remover filtro: ${label}`}
      title="remover filtro"
    >
      <span>{label}</span>
      <span className="text-iefp-muted">×</span>
    </button>
  );
}

export function Filters({ dataset }: { dataset: Dataset }) {
  const { state, set, reset } = useCourseQuery();

  const concelhos = uniq(dataset.courses.map((c) => c.concelho).filter(Boolean) as string[]).sort();
  const regimes = uniq(dataset.courses.map((c) => c.regime).filter(Boolean) as string[]).sort();
  const meses = uniq(dataset.courses.map((c) => c.monthStart).filter(Boolean) as string[]).sort();
  const acessos = uniq(dataset.courses.map((c) => c.access).filter(Boolean) as string[]).sort();

  const chips: Array<{ key: string; label: string; clear: () => void }> = [];
  if (state.concelho) chips.push({ key: 'concelho', label: `concelho: ${state.concelho}`, clear: () => set({ concelho: '' }) });
  if (state.regime) chips.push({ key: 'regime', label: `regime: ${state.regime}`, clear: () => set({ regime: '' }) });
  if (state.mes) chips.push({ key: 'mes', label: `mês: ${state.mes}`, clear: () => set({ mes: '' }) });
  if (state.access) chips.push({ key: 'access', label: `habil.: ${state.access}`, clear: () => set({ access: '' }) });
  if (state.program) chips.push({ key: 'program', label: `programa: ${state.program}`, clear: () => set({ program: '' }) });

  return (
    <div className="space-y-4" aria-label="filtros">
      <div className="flex items-end justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-iefp-muted">filtros</h2>
        <button
          type="button"
          className="text-xs font-semibold text-program-qi hover:underline"
          onClick={() => reset()}
          aria-label="limpar todos os filtros"
        >
          limpar tudo
        </button>
      </div>

      {chips.length ? (
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <Chip key={c.key} label={c.label} onRemove={c.clear} />
          ))}
        </div>
      ) : (
        <p className="text-xs text-iefp-muted">sem filtros ativos</p>
      )}

      <div className="grid gap-3">
        <Select
          id="program"
          label="programa"
          value={state.program}
          onChange={(v) => set({ program: v })}
          options={[
            { value: '', label: 'todos' },
            { value: 'APZ', label: 'APZ' },
            { value: 'APZ+', label: 'APZ+' },
            { value: 'EFA', label: 'EFA' },
            { value: 'CCD', label: 'CCD' },
            { value: 'PLA', label: 'PLA' },
            { value: 'J+D', label: 'J+D' },
            { value: 'QI', label: 'QI' },
            { value: 'VA', label: 'VA' }
          ]}
        />

        <Select
          id="concelho"
          label="concelho"
          value={state.concelho}
          onChange={(v) => set({ concelho: v })}
          options={[{ value: '', label: 'todos' }, ...concelhos.map((c) => ({ value: c, label: c }))]}
        />

        <Select
          id="regime"
          label="regime"
          value={state.regime}
          onChange={(v) => set({ regime: v })}
          options={[{ value: '', label: 'todos' }, ...regimes.map((r) => ({ value: r, label: r }))]}
        />

        <Select
          id="mes"
          label="mês início"
          value={state.mes}
          onChange={(v) => set({ mes: v })}
          options={[{ value: '', label: 'todos' }, ...meses.map((m) => ({ value: m, label: m }))]}
        />

        <Select
          id="access"
          label="habilitação de acesso"
          value={state.access}
          onChange={(v) => set({ access: v })}
          options={[{ value: '', label: 'todas' }, ...acessos.map((a) => ({ value: a, label: a }))]}
        />

        <Select
          id="order"
          label="ordenar"
          value={state.sort}
          onChange={(v) => set({ sort: v as any })}
          options={[
            { value: 'mes', label: 'mês de início' },
            { value: 'concelho', label: 'concelho' }
          ]}
        />
      </div>
    </div>
  );
}
