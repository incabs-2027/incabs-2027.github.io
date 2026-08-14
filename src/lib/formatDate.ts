// Dates are stored in lib/conference.ts as ISO calendar days so the calendar
// export, the countdown, and the schema.org Event can all consume them. This
// is the one place they get turned into something a reader sees.
//
// Everything is pinned to UTC. An ISO day like "2027-02-01" is a calendar day,
// not an instant; parsing it and formatting in the viewer's local zone would
// render "January 31" for anyone west of Greenwich.

const DAY_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
};

/** "2027-02-01" -> "February 1, 2027". Returns null for null, so callers can
 *  pass the result straight to <TBA />. */
export function formatDate(isoDate: string | null): string | null {
  if (!isoDate) return null;
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", DAY_FORMAT);
}

/** A start/end pair as one span, collapsing the shared month and year:
 *  "2027-07-08" + "2027-07-10" -> "July 8–10, 2027". Falls back to a plain
 *  range across a month or year boundary, and to the start alone if there
 *  is no end date. */
export function formatDateRange(
  isoStart: string | null,
  isoEnd: string | null
): string | null {
  if (!isoStart) return null;
  if (!isoEnd) return formatDate(isoStart);

  const start = new Date(`${isoStart}T00:00:00Z`);
  const end = new Date(`${isoEnd}T00:00:00Z`);

  const sameMonth =
    start.getUTCFullYear() === end.getUTCFullYear() &&
    start.getUTCMonth() === end.getUTCMonth();

  if (sameMonth) {
    const month = start.toLocaleDateString("en-US", {
      month: "long",
      timeZone: "UTC",
    });
    return `${month} ${start.getUTCDate()}–${end.getUTCDate()}, ${start.getUTCFullYear()}`;
  }

  return `${formatDate(isoStart)} – ${formatDate(isoEnd)}`;
}
