export function NotesBlock(props: { lines: string[] }) {
  return (
    <section aria-label="notas importantes" className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-soft">
      <h2 className="text-sm font-semibold text-amber-900">notas importantes</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-900">
        {props.lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </section>
  );
}
