import type { Track } from "@/lib/conference";

type TrackRowProps = {
  track: Track;
  index: number;
};

export function TrackRow({ track, index }: TrackRowProps) {
  return (
    <article
      id={track.id}
      aria-labelledby={`${track.id}-title`}
      className="grid scroll-mt-24 gap-4 border-b border-[var(--color-border)] py-6 sm:grid-cols-[230px_1fr] sm:gap-6 sm:py-7"
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] font-mono text-xs font-bold text-white"
        >
          {index + 1}
        </span>
        <div>
          <p className="mb-1 font-mono text-[0.65rem] font-bold tracking-wide text-[var(--color-brand)]">
            TRACK {track.id}
          </p>
          <h3
            id={`${track.id}-title`}
            className="text-[0.95rem] font-bold leading-snug tracking-tight text-balance"
          >
            {track.title}
          </h3>
        </div>
      </div>

      <div>
        <p className="mb-3 text-[var(--color-ink-muted)]">{track.summary}</p>
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
      </div>
    </article>
  );
}
