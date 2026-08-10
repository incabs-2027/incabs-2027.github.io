// The single place "To be announced" exists in the codebase. Every unresolved
// fact on the site renders through here, driven directly by a nullable value
// from lib/conference.ts, never a hardcoded placeholder string elsewhere.

type TBAProps = {
  value: string | null | undefined;
  label?: string;
};

export function TBA({ value, label }: TBAProps) {
  if (value) {
    return <>{value}</>;
  }

  return (
    <span
      role="status"
      className="inline-flex items-center rounded bg-[var(--color-gold-tint)] px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wide text-[var(--color-gold-ink)]"
    >
      {label && <span className="sr-only">{label}: </span>}
      To be announced
    </span>
  );
}
