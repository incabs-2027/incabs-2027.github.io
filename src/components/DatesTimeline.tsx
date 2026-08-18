import Link from "next/link";
import { conference } from "@/lib/conference";
import { formatDate, formatDateRange } from "@/lib/formatDate";
import { TBA } from "./TBA";

const conferenceDates = formatDateRange(
  conference.dates.conferenceStart,
  conference.dates.conferenceEnd
);

type Step = {
  id: string;
  label: string;
  href: string;
  description: string;
  dateLabel: string | null;
  date: string | null;
};

const steps: Step[] = [
  {
    id: "abstract",
    label: "Abstract",
    href: "/submission#how-to-submit",
    description:
      "Authors submit a short abstract describing the work they intend to present. It goes through the same system as the full paper.",
    dateLabel: "Abstract deadline",
    date: formatDate(conference.dates.abstractDeadline),
  },
  {
    id: "submit",
    label: "Submit",
    href: "/submission#requirements",
    description: `Authors submit an original paper, up to ${conference.paperRequirements.maxPages} pages, following the ${conference.paperRequirements.templateName}.`,
    dateLabel: "Full paper deadline",
    date: formatDate(conference.dates.submissionDeadline),
  },
  {
    id: "review",
    label: "Review",
    href: "/submission#review",
    description: `The ${conference.reviewProcess.committeeName} reviews each paper, about ${conference.reviewProcess.reviewersPerPaper} reviewers per paper. There's no separate deadline for this step — it starts as soon as submissions close.`,
    dateLabel: null,
    date: null,
  },
  {
    id: "notification",
    label: "Notification",
    href: "/submission#review",
    description: "Authors receive a decision on their paper.",
    dateLabel: "Notification date",
    date: formatDate(conference.dates.notificationDate),
  },
  {
    id: "camera-ready",
    label: "Camera-ready",
    href: "/submission#presentation",
    description: "Accepted authors submit a final version incorporating reviewer feedback.",
    dateLabel: "Camera-ready deadline",
    date: formatDate(conference.dates.cameraReadyDeadline),
  },
  {
    id: "register",
    label: "Author Registration Deadline",
    href: "/submission#presentation",
    description: "At least one author registers to present the paper at the conference.",
    dateLabel: "Author registration deadline",
    date: formatDate(conference.dates.authorRegistrationDeadline),
  },
  {
    id: "early-registration",
    label: "Early Registration Deadline",
    href: "/registration",
    description:
      "The early registration window closes. Regular registration opens the following day and stays open until the conference days.",
    dateLabel: "Early registration deadline",
    date: formatDate(conference.dates.earlyRegistrationDeadline),
  },
  {
    id: "present",
    label: "Present",
    href: "/submission#presentation",
    description: "Authors present their work, oral or poster, at the conference.",
    dateLabel: "Conference dates",
    date: conferenceDates,
  },
];

export function DatesTimeline() {
  return (
    <ol aria-label="Conference timeline, in order">
      {steps.map((step, i) => (
        <li key={step.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-xs font-bold text-white"
            >
              {i + 1}
            </span>
            {i < steps.length - 1 && (
              <span className="my-1 w-px flex-1 bg-[var(--color-border)]" aria-hidden="true" />
            )}
          </div>

          <div className={`flex-1 ${i < steps.length - 1 ? "pb-8" : ""}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <Link
                href={step.href}
                className="text-lg font-bold tracking-tight text-[var(--color-ink)] underline decoration-[var(--color-border)] underline-offset-4 hover:decoration-[var(--color-brand)]"
              >
                {step.label}
              </Link>
              {step.dateLabel && (
                <span className="text-sm">
                  <TBA value={step.date} label={step.dateLabel} />
                </span>
              )}
            </div>
            <p className="mt-1 max-w-xl text-sm text-[var(--color-ink-muted)]">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
