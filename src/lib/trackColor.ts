import type { TrackId } from "@/lib/conference";

const TRACK_COLOR_VAR: Record<TrackId, string> = {
  T1: "var(--color-track-1)",
  T2: "var(--color-track-2)",
  T3: "var(--color-track-3)",
  T4: "var(--color-track-4)",
};

export function trackColor(id: TrackId): string {
  return TRACK_COLOR_VAR[id];
}
