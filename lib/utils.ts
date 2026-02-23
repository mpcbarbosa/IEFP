export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}+/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const monthOrder: Record<string, number> = {
  janeiro: 1,
  fevereiro: 2,
  marco: 3,
  'março': 3,
  abril: 4,
  maio: 5,
  junho: 6,
  julho: 7,
  agosto: 8,
  setembro: 9,
  outubro: 10,
  novembro: 11,
  dezembro: 12,
  'a definir': 99
};

export function monthRank(m?: string): number {
  if (!m) return 999;
  const k = m.trim().toLowerCase();
  return monthOrder[k] ?? 998;
}

export function normalizeRegime(regime?: string): string | undefined {
  if (!regime) return undefined;
  const r = regime.trim().toLowerCase();
  if (r.includes('dist')) return 'a distância';
  if (r.includes('misto')) return 'misto';
  if (r.includes('pres')) return 'presencial';
  return regime;
}

export function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
