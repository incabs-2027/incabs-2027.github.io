"use client";

import { useEffect, useState } from "react";
import { TBA } from "@/components/TBA";

type CountdownProps = {
  target: string | null;
  label?: string;
};

function formatRemaining(ms: number): string {
  if (ms <= 0) return "deadline has passed";
  const minutes = Math.floor(ms / 60_000);
  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const mins = minutes % 60;
  if (days > 0) {
    return `${days} day${days === 1 ? "" : "s"}, ${hours} hour${hours === 1 ? "" : "s"} left`;
  }
  if (hours > 0) {
    return `${hours} hour${hours === 1 ? "" : "s"}, ${mins} minute${mins === 1 ? "" : "s"} left`;
  }
  return `${mins} minute${mins === 1 ? "" : "s"} left`;
}

// Server render always shows the plain date, never a computed "time left" —
// computing that from `now` during SSR would bake a stale number into the
// static HTML (built once, served for weeks) and mismatch on hydration. The
// live countdown fills in client-side, after mount, and ticks every minute.
export function Countdown({ target, label }: CountdownProps) {
  const [remaining, setRemaining] = useState<string | null>(null);

  useEffect(() => {
    if (!target) return;
    const targetMs = new Date(target).getTime();
    const tick = () => setRemaining(formatRemaining(targetMs - Date.now()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [target]);

  if (!target) {
    return <TBA value={null} label={label} />;
  }

  const formattedDate = new Date(target).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <span className="font-semibold">
      {formattedDate}
      {remaining && (
        <span className="ml-2 font-mono text-xs font-semibold text-[var(--color-brand)]">
          ({remaining})
        </span>
      )}
    </span>
  );
}
