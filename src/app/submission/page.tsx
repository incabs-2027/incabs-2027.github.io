import Link from "next/link";
import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { Callout } from "@/components/Callout";
import { SubmissionChecklist } from "@/components/SubmissionChecklist";

export const metadata: Metadata = {
  title: `Submission | ${conference.acronym} ${conference.year}`,
};

const sections = [
  { id: "requirements", label: "Requirements" },
  { id: "format", label: "Format" },
  { id: "review", label: "Review process" },
  { id: "presentation", label: "Presentation & registration" },
];

export default function SubmissionPage() {
  const req = conference.paperRequirements;
  const review = conference.reviewProcess;
  const presentation = conference.presentation;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 xl:px-16 3xl:max-w-4xl">
      <h1 className="mb-3 text-4xl font-extrabold tracking-tight">Submission</h1>
      <p className="mb-8 max-w-2xl text-[var(--color-ink-muted)]">
        What to prepare, how it&apos;s judged, and what happens after you hit
        send — the same process every author goes through, whether this is
        your first paper or your fifth.
      </p>

      <nav aria-label="Jump to a section" className="mb-10 flex flex-wrap gap-2">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-paper-raised)] px-3.5 py-1.5 text-sm font-semibold text-[var(--color-brand)] hover:border-[var(--color-brand)]"
          >
            {s.label}
          </a>
        ))}
      </nav>

      <section id="requirements" className="mb-12 scroll-mt-20">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
          Requirements
        </h2>
        <p className="mb-5 max-w-2xl">
          Papers must be original, unpublished, at most {req.maxPages} pages,
          and written in {req.language}. For the full requirement list and
          what each section of your paper should cover, see the{" "}
          <Link
            href="/call-for-papers"
            className="text-[var(--color-brand)] underline underline-offset-2"
          >
            Call for Papers
          </Link>
          .
        </p>

        <dl className="mb-6 grid gap-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-paper-raised)] p-5 sm:grid-cols-3 sm:p-6">
          <div className="border-l-2 border-[var(--color-accent)] pl-4">
            <dt className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
              Length
            </dt>
            <dd className="mt-1.5 font-semibold">Up to {req.maxPages} pages</dd>
          </div>
          <div className="border-l-2 border-[var(--color-accent)] pl-4">
            <dt className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
              Language
            </dt>
            <dd className="mt-1.5 font-semibold">{req.language}</dd>
          </div>
          <div className="border-l-2 border-[var(--color-accent)] pl-4">
            <dt className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
              Authors
            </dt>
            <dd className="mt-1.5 font-semibold">
              {req.teamsAllowed ? "Individual or team" : "Individual"}
            </dd>
          </div>
        </dl>

        <SubmissionChecklist />
      </section>

      <section id="format" className="mb-12 scroll-mt-20">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight">Format</h2>
        <Callout variant="disclaimer" title="Formatting template">
          <p>
            Papers must be formatted using the {req.templateName}. Template
            files are available at{" "}
            <a href={req.templateUrl} target="_blank" rel="noopener noreferrer">
              {req.templateUrl}
            </a>
            . {req.acmDisclaimer}
          </p>
        </Callout>

        <div className="mt-6 grid gap-6 sm:grid-cols-[200px_1fr] sm:items-center">
          <div
            aria-hidden="true"
            className="relative mx-auto w-full max-w-[200px] rounded-lg border border-[var(--color-border)] bg-white p-4 shadow-sm"
          >
            <span className="absolute -right-3 -top-3 flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[var(--color-accent)] text-center font-mono text-[0.55rem] font-bold leading-tight text-white shadow-sm">
              <span>MAX</span>
              <span>{req.maxPages}P</span>
            </span>
            <div className="mb-2 h-2.5 w-3/4 rounded-full bg-[var(--color-brand)]" />
            <div className="mb-4 h-1.5 w-1/2 rounded-full bg-[var(--color-gold)]" />
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <div className="h-1.5 rounded-full bg-[var(--color-border)]" style={{ width: "95%" }} />
                <div className="h-1.5 rounded-full bg-[var(--color-border)]" style={{ width: "88%" }} />
                <div className="h-1.5 rounded-full bg-[var(--color-border)]" style={{ width: "92%" }} />
                <div className="h-1.5 rounded-full bg-[var(--color-border)]" style={{ width: "70%" }} />
                <div className="h-1.5 rounded-full bg-[var(--color-border)]" style={{ width: "90%" }} />
                <div className="h-1.5 rounded-full bg-[var(--color-border)]" style={{ width: "85%" }} />
                <div className="h-1.5 rounded-full bg-[var(--color-border)]" style={{ width: "60%" }} />
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 rounded-full bg-[var(--color-border)]" style={{ width: "90%" }} />
                <div className="h-1.5 rounded-full bg-[var(--color-border)]" style={{ width: "80%" }} />
                <div className="h-1.5 rounded-full bg-[var(--color-border)]" style={{ width: "94%" }} />
                <div className="h-1.5 rounded-full bg-[var(--color-border)]" style={{ width: "65%" }} />
                <div className="h-1.5 rounded-full bg-[var(--color-border)]" style={{ width: "88%" }} />
                <div className="h-1.5 rounded-full bg-[var(--color-border)]" style={{ width: "75%" }} />
                <div className="h-1.5 rounded-full bg-[var(--color-border)]" style={{ width: "50%" }} />
              </div>
            </div>
          </div>
          <p className="text-sm text-[var(--color-ink-muted)]">
            Roughly what a two-column page in the template looks like — a
            title, an author list, and two columns of body text.{" "}
            {req.maxPages} of these pages is your full paper,{" "}
            {req.pageScopeNote}.
          </p>
        </div>
      </section>

      <section id="review" className="mb-12 scroll-mt-20">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
          Review process
        </h2>
        <p className="mb-5 flex max-w-2xl flex-wrap items-start gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] font-mono text-xs font-bold text-white"
          >
            {review.reviewersPerPaper}
          </span>
          <span>
            Every submission goes through peer review by the{" "}
            {review.committeeName} — about {review.reviewersPerPaper}{" "}
            independent reviewers with expertise relevant to your track.
          </span>
        </p>
        <p className="mb-3 font-semibold">Reviewers evaluate each paper on:</p>
        <ul className="flex flex-wrap gap-2">
          {review.criteria.map((c) => (
            <li
              key={c}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-paper-raised)] px-3.5 py-1.5 text-sm font-medium"
            >
              {c}
            </li>
          ))}
        </ul>
      </section>

      <section id="presentation" className="mb-12 scroll-mt-20">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
          Presentation, registration &amp; publication
        </h2>
        <p className="mb-4 max-w-2xl">
          Accepted papers are invited to present as either:
        </p>
        <ul className="mb-5 flex flex-wrap gap-3">
          {presentation.formats.map((f) => (
            <li
              key={f}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-3 text-sm font-semibold shadow-sm"
            >
              {f}
            </li>
          ))}
        </ul>
        <p className="mb-5 max-w-2xl text-[var(--color-ink-muted)]">
          {presentation.cameraReadyNote}
        </p>

        <Callout variant="disclaimer" title="Registration is required to present">
          <p>{presentation.registrationRequirement}</p>
        </Callout>

        <p className="mt-5 max-w-2xl text-[var(--color-ink-muted)]">
          {presentation.publicationStatement}
        </p>
      </section>

      <Callout variant="reassurance" title="First time submitting a research paper?">
        <p>
          You don&apos;t need a lab or a professor to submit here. Read the{" "}
          <Link href="/faq">frequently asked questions</Link> for honest
          answers to the questions most first-time student researchers have,
          or check the <Link href="/call-for-papers">Call for Papers</Link>{" "}
          for what each section of your paper should cover.
        </p>
      </Callout>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/dates"
          className="rounded-md bg-[var(--color-brand)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--color-brand-dark)]"
        >
          See key dates
        </Link>
        <Link
          href="/call-for-papers"
          className="rounded-md border border-[var(--color-border)] px-5 py-3 text-sm font-semibold hover:border-[var(--color-brand)]"
        >
          Back to Call for Papers
        </Link>
      </div>
    </div>
  );
}
