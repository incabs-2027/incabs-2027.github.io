import Link from "next/link";
import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { Callout } from "@/components/Callout";
import { SubmissionChecklist } from "@/components/SubmissionChecklist";

export const metadata: Metadata = {
  title: `Submission | ${conference.acronym} ${conference.year}`,
};

export default function SubmissionPage() {
  const req = conference.paperRequirements;
  const review = conference.reviewProcess;
  const presentation = conference.presentation;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 3xl:max-w-4xl">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">Submission</h1>

      <section id="requirements" className="mb-10 scroll-mt-20">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
          Requirements
        </h2>
        <p>
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
        <div className="mt-6">
          <SubmissionChecklist />
        </div>
      </section>

      <section id="format" className="mb-10 scroll-mt-20">
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

        <div className="mt-6">
          <div
            aria-hidden="true"
            className="rounded border border-[var(--color-border)] bg-white p-5 shadow-sm"
          >
            <div className="mb-3 h-3 w-2/3 rounded bg-[var(--color-ink)] opacity-80" />
            <div className="mb-5 h-2 w-1/3 rounded bg-[var(--color-ink-muted)] opacity-60" />
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <div className="h-2 rounded bg-[var(--color-border)]" style={{ width: "95%" }} />
                <div className="h-2 rounded bg-[var(--color-border)]" style={{ width: "88%" }} />
                <div className="h-2 rounded bg-[var(--color-border)]" style={{ width: "92%" }} />
                <div className="h-2 rounded bg-[var(--color-border)]" style={{ width: "70%" }} />
                <div className="h-2 rounded bg-[var(--color-border)]" style={{ width: "90%" }} />
                <div className="h-2 rounded bg-[var(--color-border)]" style={{ width: "85%" }} />
                <div className="h-2 rounded bg-[var(--color-border)]" style={{ width: "60%" }} />
              </div>
              <div className="space-y-2">
                <div className="h-2 rounded bg-[var(--color-border)]" style={{ width: "90%" }} />
                <div className="h-2 rounded bg-[var(--color-border)]" style={{ width: "80%" }} />
                <div className="h-2 rounded bg-[var(--color-border)]" style={{ width: "94%" }} />
                <div className="h-2 rounded bg-[var(--color-border)]" style={{ width: "65%" }} />
                <div className="h-2 rounded bg-[var(--color-border)]" style={{ width: "88%" }} />
                <div className="h-2 rounded bg-[var(--color-border)]" style={{ width: "75%" }} />
                <div className="h-2 rounded bg-[var(--color-border)]" style={{ width: "50%" }} />
              </div>
            </div>
          </div>
          <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
            Roughly what a two-column page in the template above looks
            like. It has a title, an author list, and two columns of body
            text. {req.maxPages} of these pages is your full paper,
            {" "}{req.pageScopeNote}.
          </p>
        </div>
      </section>

      <section id="review" className="mb-10 scroll-mt-20">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
          Review process
        </h2>
        <p className="mb-3">
          Every submission goes through peer review by the {review.committeeName},
          evaluated by approximately {review.reviewersPerPaper} independent
          reviewers with expertise relevant to your track.
        </p>
        <p className="mb-2">Reviewers evaluate each paper on:</p>
        <ul className="list-disc space-y-1 pl-5">
          {review.criteria.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section id="presentation" className="mb-4 scroll-mt-20">
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
          Presentation, registration &amp; publication
        </h2>
        <p className="mb-3">
          Accepted papers are invited to present as either an{" "}
          {presentation.formats.join(" or a ")}. {presentation.cameraReadyNote}
        </p>
        <p className="mb-3">{presentation.registrationRequirement}</p>
        <p>{presentation.publicationStatement}</p>
      </section>
    </div>
  );
}
