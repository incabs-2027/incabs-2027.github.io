import Link from "next/link";
import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { formatDateRange } from "@/lib/formatDate";
import { DatesTimeline } from "@/components/DatesTimeline";
import { AddToCalendarButton } from "@/components/AddToCalendarButton";
import { TBA } from "@/components/TBA";
import type { CalendarEvent } from "@/lib/ics";

export const metadata: Metadata = {
  title: `Key Dates | ${conference.acronym} ${conference.year}`,
};

const conferenceDates = formatDateRange(
  conference.dates.conferenceStart,
  conference.dates.conferenceEnd
);

const formatAndLocation =
  conference.format.mode && conference.format.location
    ? `In person · ${conference.format.location}`
    : conference.format.location;

// Only dates the foundation has actually confirmed become calendar events —
// this list is empty (and the button doesn't render) until that happens.
const calendarEvents: CalendarEvent[] = [
  { uid: "abstract-deadline", title: "Abstract deadline", date: conference.dates.abstractDeadline },
  { uid: "submission-deadline", title: "Full paper deadline", date: conference.dates.submissionDeadline },
  { uid: "notification-date", title: "Notification date", date: conference.dates.notificationDate },
  { uid: "camera-ready-deadline", title: "Camera-ready deadline", date: conference.dates.cameraReadyDeadline },
  { uid: "author-registration-deadline", title: "Author registration deadline", date: conference.dates.authorRegistrationDeadline },
  { uid: "early-registration-deadline", title: "Early registration deadline", date: conference.dates.earlyRegistrationDeadline },
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
            These dates are confirmed and come straight from the{" "}
            <Link
              href="/call-for-papers"
              className="font-medium text-[var(--color-brand)] underline underline-offset-2"
            >
              Call for Papers
            </Link>
            . Anything still undecided says &ldquo;To be announced&rdquo;
            rather than being guessed at.
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

      <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
        Key events and due dates
      </h2>
      <DatesTimeline />

      <dl className="mt-4 grid gap-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-paper-raised)] p-5 sm:grid-cols-2 sm:p-6">
        <div className="border-l-2 border-[var(--color-accent)] pl-4">
          <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
            Conference dates
          </dt>
          <dd className="mt-1.5 font-semibold">
            <TBA value={conferenceDates} label="Conference dates" />
          </dd>
        </div>
        <div className="border-l-2 border-[var(--color-accent)] pl-4">
          <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
            Format &amp; location
          </dt>
          <dd className="mt-1.5 font-semibold">
            <TBA value={formatAndLocation} label="Format & location" />
          </dd>
        </div>
        <div className="border-l-2 border-[var(--color-accent)] pl-4">
          <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
            Working language
          </dt>
          <dd className="mt-1.5 font-semibold">{conference.language}</dd>
        </div>
      </dl>
    </div>
  );
}
