import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { TBA } from "@/components/TBA";

export const metadata: Metadata = {
  title: `Committee — ${conference.acronym} ${conference.year}`,
};

export default function CommitteePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">
        Organizing Committee
      </h1>

      <div className="mb-8 space-y-4">
        {conference.committee.map((member) => (
          <div
            key={member.name}
            className="rounded-lg border-l-4 border-l-[var(--color-brand)] bg-[var(--color-paper)] p-5 shadow-sm"
          >
            <p className="text-lg font-bold tracking-tight">{member.name}</p>
            <p className="text-[var(--color-ink-muted)]">{member.role}</p>
            <p className="mt-2 text-sm">
              Affiliation: <TBA value={member.affiliation} label="Affiliation" />
            </p>
          </div>
        ))}
      </div>

      <p className="mb-4">
        The Technical Program Committee — the group of reviewers who
        evaluate submitted papers — is still being formed. Each paper is
        reviewed by approximately {conference.reviewProcess.reviewersPerPaper}{" "}
        independent reviewers with expertise relevant to its track.
      </p>

      <p className="text-[var(--color-ink-muted)]">
        {conference.committeeClosingNote}
      </p>
    </div>
  );
}
