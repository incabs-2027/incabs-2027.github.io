import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import AwardsContent from "@/content/2027/awards.mdx";

export const metadata: Metadata = {
  title: `Awards — ${conference.acronym} ${conference.year}`,
};

export default function AwardsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">Awards</h1>

      <div className="prose prose-neutral mb-8 max-w-none">
        <AwardsContent />
      </div>

      <ul className="mb-4 space-y-3">
        {conference.awards.map((award) => (
          <li
            key={award.name}
            className="rounded-lg border-l-4 border-l-[var(--color-brand)] bg-[var(--color-paper)] px-4 py-3 font-semibold shadow-sm"
          >
            {award.name}
          </li>
        ))}
      </ul>

      <p className="text-[var(--color-ink-muted)]">
        {conference.awardsClosingNote}
      </p>
    </div>
  );
}
