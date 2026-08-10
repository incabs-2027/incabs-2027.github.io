import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { Callout } from "@/components/Callout";
import IntegrityContent from "@/content/2027/integrity.mdx";

export const metadata: Metadata = {
  title: `Academic Integrity & Eligibility | ${conference.acronym} ${conference.year}`,
};

export default function IntegrityPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 3xl:max-w-4xl">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">
        Academic Integrity &amp; Eligibility
      </h1>

      <div className="prose prose-neutral mb-8 max-w-none">
        <IntegrityContent />
      </div>

      <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
        Academic integrity
      </h2>
      <p className="mb-8">{conference.academicIntegrity.statement}</p>

      <h2 className="mb-3 text-2xl font-extrabold tracking-tight">Eligibility</h2>
      <p className="mb-2">{conference.eligibility.statement}</p>
      <p className="mb-2">{conference.eligibility.geographicRestriction}</p>
      <p className="mb-8">{conference.eligibility.schoolRecognitionNote}</p>

      <Callout variant="reassurance">
        <p>
          This isn&apos;t about excluding anyone. It&apos;s about your
          school being one your own country already recognizes as a school.
          If you&apos;re homeschooled and your country recognizes
          homeschooling, you&apos;re covered.
        </p>
      </Callout>
    </div>
  );
}
