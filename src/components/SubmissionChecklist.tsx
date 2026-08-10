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

      <ul className="mb-4 space-y-2">
        {items.map((item, index) => (
          <li key={item}>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={() => toggle(index)}
                className="mt-0.5"
              />
              <span className={checked[index] ? "text-[var(--color-ink-muted)] line-through" : undefined}>
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
