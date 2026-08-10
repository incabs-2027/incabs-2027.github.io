import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { DatesTimeline } from "@/components/DatesTimeline";
import { AddToCalendarButton } from "@/components/AddToCalendarButton";
import { TBA } from "@/components/TBA";
import type { CalendarEvent } from "@/lib/ics";

export const metadata: Metadata = {
  title: `Key Dates | ${conference.acronym} ${conference.year}`,
};

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
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 xl:px-16 3xl:max-w-4xl">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight">Key Dates</h1>
          <p className="max-w-xl text-[var(--color-ink-muted)]">
            Nothing here is invented. Every date below will be filled in the
            moment {conference.hostOrg.acronym} confirms it — until then it
            honestly says &ldquo;To be announced.&rdquo;
          </p>
        </div>
        {calendarEvents.length > 0 && (
          <AddToCalendarButton
            events={calendarEvents}
            calendarName={`${conference.acronym} ${conference.year}`}
            fileName={`${conference.acronym}-${conference.year}-dates.ics`}
            className="shrink-0 rounded-md border border-[var(--color-border)] bg-[var(--color-paper-raised)] px-4 py-2 text-sm font-semibold text-[var(--color-brand)] hover:border-[var(--color-brand)]"
          />
        )}
      </div>

      <h2 className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
        What happens, in order
      </h2>
      <DatesTimeline />

      <dl className="mt-4 grid gap-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-paper-raised)] p-5 sm:grid-cols-2 sm:p-6">
        <div className="border-l-2 border-[var(--color-accent)] pl-4">
          <dt className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
            Format &amp; location
          </dt>
          <dd className="mt-1.5 font-semibold">
            <TBA value={conference.format.location} label="Format & location" />
          </dd>
        </div>
        <div className="border-l-2 border-[var(--color-accent)] pl-4">
          <dt className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
            Working language
          </dt>
          <dd className="mt-1.5 font-semibold">{conference.language}</dd>
        </div>
      </dl>
    </div>
  );
}
