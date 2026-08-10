"use client";

import { useState } from "react";
import { conference } from "@/lib/conference";

// Every item here traces to conference.paperRequirements — nothing added
// beyond what's already required elsewhere on the site. State is in-memory
// only: closing the tab clears it, nothing is sent or stored.
export function SubmissionChecklist() {
  const req = conference.paperRequirements;

  const items = [
    `Written in ${req.language}.`,
    `At most ${req.maxPages} pages, ${req.pageScopeNote}.`,
    "Original work — not previously published, and not under review elsewhere.",
    `Formatted using the ${req.templateName}.`,
    ...req.requiredSections.map(
      (section) => `Includes a ${section} section.`
    ),
  ];

  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));

  function toggle(index: number) {
    setChecked((prev) => prev.map((c, i) => (i === index ? !c : c)));
  }

  const allChecked = checked.every(Boolean);
  const checkedCount = checked.filter(Boolean).length;

  return (
    <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper-raised)] p-5 sm:p-6">
      <h2 className="mb-1.5 text-xl font-extrabold tracking-tight">
        Submission-readiness checklist
      </h2>
      <p className="mb-4 max-w-2xl text-sm text-[var(--color-ink-muted)]">
        Check off each requirement as you confirm it. {checkedCount} of{" "}
        {items.length} so far — nothing here is saved or sent anywhere.
      </p>

      <ul className="mb-4 space-y-2.5">
        {items.map((item, index) => (
          <li key={item}>
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={() => toggle(index)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-focus)] ${
                  checked[index]
                    ? "border-[var(--color-brand)] bg-[var(--color-brand)]"
                    : "border-[var(--color-border)] bg-[var(--color-paper)]"
                }`}
              >
                {checked[index] && (
                  <svg viewBox="0 0 16 16" className="h-3 w-3">
                    <path
                      d="M3 8.5l3.2 3.2L13 4.5"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span
                className={
                  checked[index]
                    ? "pt-0.5 text-[var(--color-ink-muted)] line-through"
                    : "pt-0.5"
                }
              >
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>

      {allChecked && (
        <p
          role="status"
          className="rounded-md border-2 border-[var(--color-accent)] bg-[var(--color-paper)] p-4 text-sm font-medium"
        >
          Looks ready. Head to the review process below for what happens
          next.
        </p>
      )}
    </section>
  );
}
