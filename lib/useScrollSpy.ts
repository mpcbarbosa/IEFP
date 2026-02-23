'use client';

import { useEffect, useMemo, useState } from 'react';

export function useScrollSpy(anchors: string[], options?: IntersectionObserverInit) {
  const [active, setActive] = useState<string>(anchors[0] ?? '');

  const ids = useMemo(() => anchors.map((a) => `sec-${a}`), [anchors]);

  useEffect(() => {
    if (!ids.length) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // pick the entry nearest the top that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0))[0];

        if (visible?.target?.id) {
          const anchor = visible.target.id.replace(/^sec-/, '');
          setActive(anchor);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: [0, 0.1, 0.25], ...(options ?? {}) }
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids, options]);

  return active;
}
