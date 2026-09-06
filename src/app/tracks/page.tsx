import Link from "next/link";
import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { TrackRow } from "@/components/TrackRow";
import { TrackRecommender } from "@/components/TrackRecommender";
import { Callout } from "@/components/Callout";
import TracksContent from "@/content/2027/tracks.mdx";

export const metadata: Metadata = {
  title: `Tracks | ${conference.acronym} ${conference.year}`,
};

export default function TracksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 xl:px-16 3xl:max-w-5xl">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">Conference Tracks</h1>

      <div className="prose prose-neutral mb-6 max-w-none">
        <TracksContent />
      </div>

      <nav aria-label="Jump to a track" className="mb-10 flex flex-wrap gap-2">
        {conference.tracks.map((track) => (
          <a
            key={track.id}
            href={`#${track.id}`}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-paper-raised)] px-3.5 py-1.5 text-sm font-semibold text-[var(--color-brand)] hover:border-[var(--color-brand)]"
          >
            {track.id} · {track.title.split(/,| and /)[0]}
          </a>
        ))}
      </nav>

      <TrackRecommender />

      <h2 className="mb-2 mt-12 text-2xl font-extrabold tracking-tight">
        Or browse all four tracks in detail below.
      </h2>

      <div className="border-t border-[var(--color-border)]">
        {conference.tracks.map((track, index) => (
          <TrackRow key={track.id} track={track} index={index} />
        ))}
      </div>

      <div className="mt-6">
        <Callout variant="reassurance">
          <p>
            Still not sure which track fits your project? More questions like this are answered on the{" "}
            <Link href="/faq">FAQ page</Link>.
          </p>
        </Callout>
      </div>
    </div>
  );
}
