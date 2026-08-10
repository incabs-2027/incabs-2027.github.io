import Link from "next/link";
import type { Track } from "@/lib/conference";

const trackColor: Record<Track["id"], string> = {
  T1: "var(--color-track-1)",
  T2: "var(--color-track-2)",
  T3: "var(--color-track-3)",
  T4: "var(--color-track-4)",
};

type TrackCardProps = {
  track: Track;
  compact?: boolean;
};

export function TrackCard({ track, compact = false }: TrackCardProps) {
  const color = trackColor[track.id];

  return (
    <article
      id={track.id}
      aria-labelledby={`${track.id}-title`}
      className="rounded-lg border-l-4 bg-[var(--color-paper)] p-5 shadow-sm"
      style={{ borderLeftColor: color }}
    >
      <span
        className="mb-2 inline-block rounded px-2 py-0.5 text-xs font-bold tracking-wide text-white"
        style={{ backgroundColor: color }}
      >
        {track.id}
      </span>
      <h3 id={`${track.id}-title`} className="mb-2 text-lg font-bold tracking-tight">
        {track.title}
      </h3>
      {compact ? (
        <>
          <p className="mb-3 text-[var(--color-ink-muted)]">
            {track.summary.split(". ")[0]}.
          </p>
          <Link
            href={`/tracks#${track.id}`}
            className="font-semibold text-[var(--color-brand)] underline underline-offset-2"
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
                className="rounded-full bg-[var(--color-paper-raised)] px-3 py-1 text-sm text-[var(--color-ink-muted)]"
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
