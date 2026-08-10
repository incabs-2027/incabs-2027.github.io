// schema.org Event structured data for the homepage. Deliberately mirrors
// the TBA architecture in lib/conference.ts: this returns null — meaning no
// <script> tag renders at all — until the foundation has confirmed a real
// conferenceStart date. An Event without a real startDate is either invalid
// per Google's guidelines or, worse, would mean inventing one, which
// references/CLAUDE.md's integrity rules explicitly forbid.

import { conference, type ConferenceData } from "@/lib/conference";

export const SITE_URL = "https://incabs-2027.github.io";

const ATTENDANCE_MODE: Record<
  NonNullable<ConferenceData["format"]["mode"]>,
  string
> = {
  "in-person": "https://schema.org/OfflineEventAttendanceMode",
  virtual: "https://schema.org/OnlineEventAttendanceMode",
  hybrid: "https://schema.org/MixedEventAttendanceMode",
};

export function buildEventJsonLd(): Record<string, unknown> | null {
  if (!conference.dates.conferenceStart) return null;

  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${conference.acronym} ${conference.year} — ${conference.name}`,
    description: conference.theme.description,
    startDate: conference.dates.conferenceStart,
    eventStatus: "https://schema.org/EventScheduled",
    url: SITE_URL,
    organizer: {
      "@type": "Organization",
      name: conference.hostOrg.name,
      url: SITE_URL,
    },
  };

  if (conference.dates.conferenceEnd) {
    json.endDate = conference.dates.conferenceEnd;
  }

  if (conference.format.mode) {
    json.eventAttendanceMode = ATTENDANCE_MODE[conference.format.mode];
    if (conference.format.mode === "virtual") {
      json.location = { "@type": "VirtualLocation", url: SITE_URL };
    } else if (conference.format.location) {
      json.location = { "@type": "Place", name: conference.format.location };
    }
  }

  return json;
}
