import type { Course } from './schema';
import { monthRank } from './utils';
import type { QueryState } from './useCourseQuery';

export function applyFilters(courses: Course[], q: QueryState): Course[] {
  const needle = q.q.trim().toLowerCase();

  let out = courses;
  if (needle) {
    out = out.filter((c) => c.designation.toLowerCase().includes(needle));
  }
  if (q.program) out = out.filter((c) => c.program === q.program);
  if (q.concelho) out = out.filter((c) => (c.concelho ?? '') === q.concelho);
  if (q.regime) out = out.filter((c) => (c.regime ?? '') === q.regime);
  if (q.mes) out = out.filter((c) => (c.monthStart ?? '') === q.mes);
  if (q.subprogram) out = out.filter((c) => (c.subprogram ?? '') === q.subprogram);
  if (q.access) out = out.filter((c) => (c.access ?? '') === q.access);

  const sort = q.sort || 'mes';
  out = [...out].sort((a, b) => {
    if (sort === 'concelho') {
      const c = (a.concelho ?? '').localeCompare(b.concelho ?? '', 'pt');
      if (c !== 0) return c;
      return monthRank(a.monthStart) - monthRank(b.monthStart);
    }
    const m = monthRank(a.monthStart) - monthRank(b.monthStart);
    if (m !== 0) return m;
    return (a.concelho ?? '').localeCompare(b.concelho ?? '', 'pt');
  });

  return out;
}
