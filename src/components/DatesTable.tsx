import { conference } from "@/lib/conference";
import { TBA } from "./TBA";

const conferenceDates =
  conference.dates.conferenceStart && conference.dates.conferenceEnd
    ? `${conference.dates.conferenceStart} – ${conference.dates.conferenceEnd}`
    : null;

const rows: { label: string; value: string | null }[] = [
  { label: "Submission deadline", value: conference.dates.submissionDeadline },
  { label: "Notification date", value: conference.dates.notificationDate },
  {
    label: "Camera-ready deadline",
    value: conference.dates.cameraReadyDeadline,
  },
  {
    label: "Author registration deadline",
    value: conference.dates.authorRegistrationDeadline,
  },
  { label: "Conference dates", value: conferenceDates },
  { label: "Format & location", value: conference.format.location },
];

export function DatesTable() {
  return (
    <table className="w-full border-collapse overflow-hidden rounded-lg border border-[var(--color-border)] text-left shadow-sm">
      <caption className="sr-only">
        Key dates for {conference.acronym} {conference.year}
      </caption>
      <thead>
        <tr className="bg-[var(--color-paper-raised)]">
          <th
            scope="col"
            className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-[var(--color-ink-muted)]"
          >
            Milestone
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-[var(--color-ink-muted)]"
          >
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-t border-[var(--color-border)]">
            <th
              scope="row"
              className="px-4 py-3 align-top font-semibold text-[var(--color-ink)]"
            >
              {row.label}
            </th>
            <td className="px-4 py-3 align-top">
              <TBA value={row.value} label={row.label} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
