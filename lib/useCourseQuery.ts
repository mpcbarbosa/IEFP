'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type QueryState = {
  q: string;
  concelho: string;
  regime: string;
  mes: string;
  program: string;
  subprogram: string;
  access: string;
  sort: string;
};

const DEFAULTS: QueryState = {
  q: '',
  concelho: '',
  regime: '',
  mes: '',
  program: '',
  subprogram: '',
  access: '',
  sort: 'mes'
};

export function useCourseQuery() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const state: QueryState = useMemo(() => {
    const get = (k: keyof QueryState) => sp.get(k) ?? sp.get(mapKey(k)) ?? '';
    return {
      q: get('q'),
      concelho: get('concelho'),
      regime: get('regime'),
      mes: get('mes'),
      program: get('program'),
      subprogram: get('subprogram'),
      access: get('access'),
      sort: get('sort') || DEFAULTS.sort
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  function mapKey(k: keyof QueryState): string {
    // allow alias 'm' (mes) if you ever want
    return k;
  }

  function set(partial: Partial<QueryState>) {
    const next = { ...state, ...partial };
    const params = new URLSearchParams(sp.toString());

    (Object.keys(next) as (keyof QueryState)[]).forEach((k) => {
      const v = String(next[k] ?? '').trim();
      if (!v || v === String(DEFAULTS[k])) params.delete(k);
      else params.set(k, v);
    });

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function reset() {
    router.replace(pathname, { scroll: false });
  }

  return { state, set, reset };
}
