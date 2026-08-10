import Link from "next/link";
import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { TrackCard } from "@/components/TrackCard";
import { EligibilityCheck } from "@/components/EligibilityCheck";
import CfpContent from "@/content/2027/cfp.mdx";

export const metadata: Metadata = {
  title: `Call for Papers | ${conference.acronym} ${conference.year}`,
};

const sectionGlosses: Record<string, string> = {
  "research motivation": "why this problem matters, and why you chose to study it",
  methodology: "how you actually did the research, including your approach, tools, and data",
  "results (where applicable)":
    "what you found, and it's fine if this is short, exploratory, or inconclusive",
  discussion: "what your results mean, in context",
  limitations:
    "what your research couldn't answer, which is a normal, expected part of real science, not a weakness",
  conclusions: "your main takeaway, in a sentence or two",
};

export default function CallForPapersPage() {
  const req = conference.paperRequirements;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">Call for Papers</h1>

      <div className="prose prose-neutral max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-[var(--color-brand)]">
        <CfpContent />
      </div>

      <h2 className="mb-4 mt-10 text-2xl font-extrabold tracking-tight">
        Conference tracks
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {conference.tracks.map((track) => (
          <TrackCard key={track.id} track={track} compact />
        ))}
      </div>

      <div className="mt-10">
        <EligibilityCheck />
      </div>

      <h2 className="mb-4 mt-10 text-2xl font-extrabold tracking-tight">
        Paper requirements
      </h2>
      <ul className="mb-4 list-disc space-y-1 pl-5">
        <li>Written in {req.language}.</li>
        <li>
          Limited to {req.maxPages} pages, {req.pageScopeNote}.
        </li>
        <li>{req.originalityNote}</li>
        <li>
          {req.teamsAllowed
            ? "Both individual and team submissions are welcome."
            : null}
        </li>
      </ul>

      <p className="mb-3">
        Your paper should clearly describe each of the following six
        sections. The review process, explained on the{" "}
        <Link href="/submission">Submission</Link> page, expects all of
        them.
      </p>
      <ul className="mb-8 space-y-2">
        {req.requiredSections.map((section) => (
          <li key={section}>
            <span className="font-semibold capitalize">{section}</span>,{" "}
            {sectionGlosses[section]}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/submission"
          className="rounded-md bg-[var(--color-brand)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--color-brand-dark)]"
        >
          Submission details
        </Link>
        <Link
          href="/dates"
          className="rounded-md border border-[var(--color-border)] px-5 py-3 text-sm font-semibold hover:border-[var(--color-brand)]"
        >
          Key dates
        </Link>
      </div>
    </div>
  );
}
