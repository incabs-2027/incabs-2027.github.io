// Minimal RFC 5545 (iCalendar) builder — just enough for a short list of
// all-day conference milestones. No recurrence, no timezones beyond UTC
// (dates are treated as UTC-anchored calendar days, matching the site's "no
// geographic restrictions" stance), no line folding (fine for our short
// titles). `now` is passed in rather than read internally so this stays a
// pure, testable function — the caller supplies `new Date()` at click time.

export type CalendarEvent = {
  uid: string;
  title: string;
  description?: string;
  /** ISO date, e.g. "2027-03-03". Rendered as an all-day event. */
  date: string;
};

function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function toICSDate(isoDate: string): string {
  return isoDate.replace(/-/g, "");
}

function toICSDateTimeUTC(date: Date): string {
  return `${date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
}

export function buildICS(
  events: CalendarEvent[],
  calendarName: string,
  now: Date
): string {
  const stamp = toICSDateTimeUTC(now);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${escapeText(calendarName)}//EN`,
    "CALSCALE:GREGORIAN",
    ...events.flatMap((event) => [
      "BEGIN:VEVENT",
      `UID:${event.uid}`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${toICSDate(event.date)}`,
      `SUMMARY:${escapeText(event.title)}`,
      ...(event.description
        ? [`DESCRIPTION:${escapeText(event.description)}`]
        : []),
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}
