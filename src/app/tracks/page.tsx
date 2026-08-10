import Link from "next/link";
import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { TrackCard } from "@/components/TrackCard";
import { Callout } from "@/components/Callout";
import TracksContent from "@/content/2027/tracks.mdx";

export const metadata: Metadata = {
  title: `Tracks — ${conference.acronym} ${conference.year}`,
};

export default function TracksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">Conference Tracks</h1>

      <div className="prose prose-neutral mb-8 max-w-none">
        <TracksContent />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {conference.tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>

      <div className="mt-10">
        <Callout variant="reassurance">
          <p>
            Not sure which track fits your project? Pick whichever one your
            work leans on most — reviewers judge substance, not the label.
            More questions like this are answered on the{" "}
            <Link href="/faq">FAQ page</Link>.
          </p>
        </Callout>
      </div>
    </div>
  );
}
