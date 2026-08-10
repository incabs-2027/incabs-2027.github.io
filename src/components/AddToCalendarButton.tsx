"use client";

import { buildICS, type CalendarEvent } from "@/lib/ics";

type AddToCalendarButtonProps = {
  events: CalendarEvent[];
  calendarName: string;
  fileName: string;
  className?: string;
};

// Builds the .ics file in-browser at click time and triggers a download —
// no server, no build-time generation, nothing pre-baked.
export function AddToCalendarButton({
  events,
  calendarName,
  fileName,
  className,
}: AddToCalendarButtonProps) {
  function handleClick() {
    const ics = buildICS(events, calendarName, new Date());
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      Add key dates to calendar
    </button>
  );
}
