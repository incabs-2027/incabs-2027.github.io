import Image from "next/image";
import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { TBA } from "@/components/TBA";

export const metadata: Metadata = {
  title: `Committee | ${conference.acronym} ${conference.year}`,
};

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function CommitteePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 xl:px-16 3xl:max-w-6xl">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">
        Organizing Committee
      </h1>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {conference.committee.map((member) => (
          // Full-bleed: the photo (or, until one exists, an initials plate)
          // fills the entire 4:5 card, with details overlaid on a scrim.
          <article
            key={member.name}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-sm transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {member.photoUrl ? (
              <Image
                src={member.photoUrl}
                alt={member.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex h-full w-full items-center justify-center bg-[var(--color-panel-raised)] text-5xl font-bold text-[var(--color-panel-muted)]"
              >
                {initials(member.name)}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,16,28,0.92)] from-10% via-[rgba(8,16,28,0.55)] via-40% to-transparent to-70%" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-lg font-extrabold text-white">{member.name}</p>
              <p className="text-xs font-bold uppercase tracking-wide text-[#8fd9dc]">
                {member.role}
              </p>
              <p className="mt-1.5 text-sm text-white/80">
                Affiliation: <TBA value={member.affiliation} label="Affiliation" />
              </p>
            </div>
          </article>
        ))}
      </div>

      <p className="mb-4 max-w-2xl">
        The Technical Program Committee, the group of reviewers who
        evaluate submitted papers, is still being formed. Each paper is
        reviewed by approximately {conference.reviewProcess.reviewersPerPaper}{" "}
        independent reviewers with expertise relevant to its track.
      </p>

      <p className="max-w-2xl text-[var(--color-ink-muted)]">
        {conference.committeeClosingNote}
      </p>
    </div>
  );
}
