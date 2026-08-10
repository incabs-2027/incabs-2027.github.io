import Link from "next/link";
import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { DatesTable } from "@/components/DatesTable";

export const metadata: Metadata = {
  title: `Key Dates — ${conference.acronym} ${conference.year}`,
};

const pipeline = [
  { label: "Submit", href: "/submission#requirements" },
  { label: "Review", href: "/submission#review" },
  { label: "Notification", href: "/submission#review" },
  { label: "Camera-ready", href: "/submission#presentation" },
  { label: "Register", href: "/submission#presentation" },
  { label: "Present", href: "/submission#presentation" },
];

export default function DatesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Key Dates</h1>
      <p className="mb-8 max-w-2xl">
        Nothing on this page is invented. Every date below will be filled in
        the moment {conference.hostOrg.acronym} confirms it — until then, it
        honestly says &ldquo;To be announced.&rdquo;
      </p>

      <DatesTable />

      <h2 className="mb-4 mt-10 text-2xl font-extrabold tracking-tight">
        What happens, in order
      </h2>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
        {pipeline.map((step, i) => (
          <li key={step.label} className="flex items-center gap-2">
            <Link
              href={step.href}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-paper-raised)] px-4 py-1.5 text-sm font-semibold text-[var(--color-brand)] shadow-sm hover:border-[var(--color-brand)]"
            >
              {step.label}
            </Link>
            {i < pipeline.length - 1 && (
              <span aria-hidden="true" className="text-[var(--color-ink-muted)]">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
