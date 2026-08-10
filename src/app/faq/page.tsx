import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import FaqContent from "@/content/2027/faq.mdx";

export const metadata: Metadata = {
  title: `FAQ — ${conference.acronym} ${conference.year}`,
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">
        Frequently Asked Questions
      </h1>

      <div className="prose prose-neutral max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-[var(--color-brand)]">
        <FaqContent />
      </div>
    </div>
  );
}
