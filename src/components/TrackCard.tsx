import Link from "next/link";
import type { Track } from "@/lib/conference";

type TrackCardProps = {
  track: Track;
  compact?: boolean;
};

export function TrackCard({ track, compact = false }: TrackCardProps) {
  return (
    <article
      id={track.id}
      aria-labelledby={`${track.id}-title`}
      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-5 sm:p-6"
    >
      <p className="mb-3 flex items-center gap-3 font-mono text-xs font-bold tracking-wide text-[var(--color-brand)]">
        TRACK {track.id}
        <span aria-hidden="true" className="h-px flex-1 bg-[var(--color-border)]" />
      </p>
      <h3 id={`${track.id}-title`} className="mb-2 text-lg font-bold tracking-tight text-balance">
        {track.title}
      </h3>
      {compact ? (
        <>
          <p className="mb-3 text-[var(--color-ink-muted)]">
            {track.summary.split(". ")[0]}.
          </p>
          <Link
            href={`/tracks#${track.id}`}
            className="font-semibold text-[var(--color-gold-ink)] underline underline-offset-2"
          >
            See topics →
          </Link>
        </>
      ) : (
        <>
          <p className="mb-4 text-[var(--color-ink-muted)]">{track.summary}</p>
          <ul className="flex flex-wrap gap-2">
            {track.topics.map((topic) => (
              <li
                key={topic}
                className="rounded border border-[var(--color-border)] px-2.5 py-1 text-xs font-medium text-[var(--color-ink-muted)]"
              >
                {topic}
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
