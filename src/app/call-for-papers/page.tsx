import Link from "next/link";
import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { formatDate, formatDateRange } from "@/lib/formatDate";
import { TrackCard } from "@/components/TrackCard";
import { EligibilityCheck } from "@/components/EligibilityCheck";
import { DownloadCFP } from "@/components/DownloadCFP";
import { TBA } from "@/components/TBA";
import CfpContent from "@/content/2027/cfp.mdx";

export const metadata: Metadata = {
  title: `Call for Papers | ${conference.acronym} ${conference.year}`,
};

const conferenceDates = formatDateRange(
  conference.dates.conferenceStart,
  conference.dates.conferenceEnd
);

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
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 xl:px-16 3xl:max-w-4xl">
      <h1 className="mb-3 text-4xl font-extrabold tracking-tight">Call for Papers</h1>
      <p className="mb-6 max-w-2xl text-[var(--color-ink-muted)]">
        Everything below is also available as a single printable document,
        useful for sharing with a teacher, a mentor, or a school.
      </p>

      <div className="mb-8">
        <DownloadCFP />
      </div>

      <dl className="mb-10 grid gap-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-paper-raised)] p-5 sm:grid-cols-3 sm:p-6">
        <div className="border-l-2 border-[var(--color-accent)] pl-4">
          <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
            Conference
          </dt>
          <dd className="mt-1.5 font-semibold">
            <TBA value={conferenceDates} label="Conference dates" />
          </dd>
        </div>
        <div className="border-l-2 border-[var(--color-accent)] pl-4">
          <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
            Location
          </dt>
          <dd className="mt-1.5 font-semibold">
            <TBA value={conference.format.location} label="Location" />
          </dd>
        </div>
        <div className="border-l-2 border-[var(--color-accent)] pl-4">
          <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
            Full paper deadline
          </dt>
          <dd className="mt-1.5 font-semibold">
            <TBA
              value={formatDate(conference.dates.submissionDeadline)}
              label="Full paper deadline"
            />
          </dd>
        </div>
      </dl>

      <div className="prose prose-neutral max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-[var(--color-brand)]">
        <CfpContent />
      </div>

      <h2 className="mb-2 mt-10 text-2xl font-extrabold tracking-tight">
        Conference tracks
      </h2>
      <p className="mb-4 max-w-2xl text-[var(--color-ink-muted)]">
        {conference.tracksNote}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {conference.tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
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
        <li>Submitted as a {req.fileFormat}.</li>
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
