import Link from "next/link";
import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { DatesTable } from "@/components/DatesTable";
import { AddToCalendarButton } from "@/components/AddToCalendarButton";
import type { CalendarEvent } from "@/lib/ics";

export const metadata: Metadata = {
  title: `Key Dates | ${conference.acronym} ${conference.year}`,
};

const pipeline = [
  { label: "Submit", href: "/submission#requirements" },
  { label: "Review", href: "/submission#review" },
  { label: "Notification", href: "/submission#review" },
  { label: "Camera-ready", href: "/submission#presentation" },
  { label: "Register", href: "/submission#presentation" },
  { label: "Present", href: "/submission#presentation" },
];

// Only dates the foundation has actually confirmed become calendar events —
// this list is empty (and the button doesn't render) until that happens.
const calendarEvents: CalendarEvent[] = [
  { uid: "submission-deadline", title: "Submission deadline", date: conference.dates.submissionDeadline },
  { uid: "notification-date", title: "Notification date", date: conference.dates.notificationDate },
  { uid: "camera-ready-deadline", title: "Camera-ready deadline", date: conference.dates.cameraReadyDeadline },
  { uid: "author-registration-deadline", title: "Author registration deadline", date: conference.dates.authorRegistrationDeadline },
  { uid: "conference-start", title: "Conference begins", date: conference.dates.conferenceStart },
]
  .filter((event): event is { uid: string; title: string; date: string } => event.date !== null)
  .map((event) => ({ ...event, uid: `${event.uid}@incabs2027` }));

export default function DatesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 3xl:max-w-4xl">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Key Dates</h1>
      <p className="mb-8 max-w-2xl">
        Nothing on this page is invented. Every date below will be filled in
        the moment {conference.hostOrg.acronym} confirms it. Until then, it
        honestly says &ldquo;To be announced.&rdquo;
      </p>

      <DatesTable />

      <div className="mt-5">
        {calendarEvents.length > 0 ? (
          <AddToCalendarButton
            events={calendarEvents}
            calendarName={`${conference.acronym} ${conference.year}`}
            fileName={`${conference.acronym}-${conference.year}-dates.ics`}
            className="rounded-md border border-[var(--color-border)] bg-[var(--color-paper-raised)] px-4 py-2 text-sm font-semibold text-[var(--color-brand)] hover:border-[var(--color-brand)]"
          />
        ) : (
          <p className="text-sm text-[var(--color-ink-muted)]">
            A downloadable calendar file will be available here once dates
            are announced.
          </p>
        )}
      </div>

      <h2 className="mb-4 mt-10 text-2xl font-extrabold tracking-tight">
        What happens, in order
      </h2>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
        {pipeline.map((step, i) => (
          <li key={step.label} className="flex items-center gap-2">
            <Link
              href={step.href}
              className="rounded border border-[var(--color-border)] bg-[var(--color-paper-raised)] px-4 py-1.5 font-mono text-sm font-semibold text-[var(--color-brand)] hover:border-[var(--color-brand)]"
            >
              {step.label}
            </Link>
            {i < pipeline.length - 1 && (
              <span aria-hidden="true" className="text-[var(--color-ink-muted)]">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
