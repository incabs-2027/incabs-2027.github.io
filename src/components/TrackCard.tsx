import Link from "next/link";
import type { Track } from "@/lib/conference";
import { trackColor } from "@/lib/trackColor";

type TrackCardProps = {
  track: Track;
};

export function TrackCard({ track }: TrackCardProps) {
  return (
    <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-5 transition-shadow hover:shadow-md sm:p-6">
      <p className="mb-3 flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: trackColor(track.id) }}
        >
          {track.id.slice(1)}
        </span>
        <span className="text-xs font-bold tracking-wide text-[var(--color-brand)]">
          TRACK {track.id}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-[var(--color-border)]" />
      </p>
      <h3 className="mb-2 text-lg font-bold tracking-tight text-balance">
        {track.title}
      </h3>
      <p className="mb-3 text-[var(--color-ink-muted)]">
        {track.summary.split(". ")[0]}.
      </p>
      <Link
        href={`/tracks#${track.id}`}
        className="font-semibold text-[var(--color-gold-ink)] underline underline-offset-2"
      >
        See topics →
      </Link>
    </article>
  );
}
