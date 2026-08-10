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
      className="scroll-mt-24 rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-5 transition-shadow hover:shadow-md sm:p-6"
    >
      <p className="mb-3 flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] font-mono text-xs font-bold text-white"
        >
          {track.id.slice(1)}
        </span>
        <span className="font-mono text-xs font-bold tracking-wide text-[var(--color-brand)]">
          TRACK {track.id}
        </span>
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
          <p className="mb-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
            Topics this track covers
          </p>
          <ul className="flex flex-wrap gap-2">
            {track.topics.map((topic) => (
              <li
                key={topic}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-paper-raised)] px-3 py-1 text-xs font-medium text-[var(--color-ink-muted)]"
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
