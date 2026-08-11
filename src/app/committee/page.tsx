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
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 xl:px-16 3xl:max-w-4xl">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">
        Organizing Committee
      </h1>

      <div className="mb-8 space-y-4">
        {conference.committee.map((member) => (
          <div
            key={member.name}
            className="flex items-start gap-4 rounded-lg border-l-4 border-l-[var(--color-brand)] bg-[var(--color-paper)] p-5 shadow-sm"
          >
            {member.photoUrl ? (
              <Image
                src={member.photoUrl}
                alt={member.name}
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-paper-raised)] text-lg font-bold text-[var(--color-ink-muted)]"
              >
                {initials(member.name)}
              </span>
            )}
            <div>
              <p className="text-lg font-bold tracking-tight">{member.name}</p>
              <p className="text-[var(--color-ink-muted)]">{member.role}</p>
              <p className="mt-2 text-sm">
                Affiliation: <TBA value={member.affiliation} label="Affiliation" />
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mb-4">
        The Technical Program Committee, the group of reviewers who
        evaluate submitted papers, is still being formed. Each paper is
        reviewed by approximately {conference.reviewProcess.reviewersPerPaper}{" "}
        independent reviewers with expertise relevant to its track.
      </p>

      <p className="text-[var(--color-ink-muted)]">
        {conference.committeeClosingNote}
      </p>
    </div>
  );
}
