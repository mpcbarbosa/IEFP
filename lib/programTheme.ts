import type { Course } from './schema';

export type Program = Course['program'];

export const programTheme: Record<
  Program,
  {
    label: string;
    bulletBg: string;
    headerBg: string;
    headerText: string;
    chipBg: string;
    chipText: string;
    ring: string;
  }
> = {
  APZ: {
    label: 'APZ',
    bulletBg: 'bg-program-apz',
    headerBg: 'bg-program-apz',
    headerText: 'text-program-apz',
    chipBg: 'bg-program-apz/10',
    chipText: 'text-program-apz',
    ring: 'ring-program-apz/20'
  },
  'APZ+': {
    label: 'APZ+',
    bulletBg: 'bg-program-apz',
    headerBg: 'bg-program-apz',
    headerText: 'text-program-apz',
    chipBg: 'bg-program-apz/10',
    chipText: 'text-program-apz',
    ring: 'ring-program-apz/20'
  },
  EFA: {
    label: 'EFA',
    bulletBg: 'bg-program-efa',
    headerBg: 'bg-program-efa',
    headerText: 'text-program-efa',
    chipBg: 'bg-program-efa/10',
    chipText: 'text-program-efa',
    ring: 'ring-program-efa/20'
  },
  CCD: {
    label: 'CCD',
    bulletBg: 'bg-program-ccd',
    headerBg: 'bg-program-ccd',
    headerText: 'text-program-ccd',
    chipBg: 'bg-program-ccd/10',
    chipText: 'text-program-ccd',
    ring: 'ring-program-ccd/20'
  },
  PLA: {
    label: 'PLA',
    bulletBg: 'bg-program-pla',
    headerBg: 'bg-program-pla',
    headerText: 'text-program-pla',
    chipBg: 'bg-program-pla/10',
    chipText: 'text-program-pla',
    ring: 'ring-program-pla/20'
  },
  'J+D': {
    label: 'J+D',
    bulletBg: 'bg-program-jd',
    headerBg: 'bg-program-jd',
    headerText: 'text-program-jd',
    chipBg: 'bg-program-jd/10',
    chipText: 'text-program-jd',
    ring: 'ring-program-jd/20'
  },
  QI: {
    label: 'QI',
    bulletBg: 'bg-program-qi',
    headerBg: 'bg-program-qi',
    headerText: 'text-program-qi',
    chipBg: 'bg-program-qi/10',
    chipText: 'text-program-qi',
    ring: 'ring-program-qi/20'
  },
  VA: {
    label: 'VA',
    bulletBg: 'bg-program-va',
    headerBg: 'bg-program-va',
    headerText: 'text-program-va',
    chipBg: 'bg-program-va/10',
    chipText: 'text-program-va',
    ring: 'ring-program-va/20'
  }
};

export function getProgramTheme(program: Program) {
  return programTheme[program];
}
