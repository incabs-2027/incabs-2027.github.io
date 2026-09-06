import Link from "next/link";
import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { GetInvolved } from "@/components/GetInvolved";

export const metadata: Metadata = {
  title: `Contact | ${conference.acronym} ${conference.year}`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 xl:px-16 3xl:max-w-4xl">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">Contact</h1>

      <p className="mb-4">
        {conference.acronym} {conference.year} is run by a small, fully
        volunteer team. Before emailing
        us, a lot of common questions are already answered on the{" "}
        <Link href="/faq" className="text-[var(--color-brand)] underline underline-offset-2">
          FAQ
        </Link>{" "}
        and{" "}
        <Link
          href="/for-teachers-and-parents"
          className="text-[var(--color-brand)] underline underline-offset-2"
        >
          For Teachers &amp; Parents
        </Link>{" "}
        pages. Checking there first helps us answer everyone faster.
      </p>

      <div className="mb-10 space-y-2">
        {conference.contact.emails.map((email) => (
          <p key={email}>
            <a
              href={`mailto:${email}`}
              className="font-medium text-[var(--color-brand)] underline underline-offset-2"
            >
              {email}
            </a>
          </p>
        ))}
      </div>

      <h2 className="mb-4 text-2xl font-extrabold tracking-tight">
        Get involved
      </h2>
      <GetInvolved />

      <div className="mt-10 rounded-lg bg-[var(--color-paper-raised)] p-5 shadow-sm">
        <p className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--color-ink-muted)]">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
          />
          Acknowledgement
        </p>
        <p className="text-sm text-[var(--color-ink-muted)]">
          Site design &amp; development
        </p>
        <p className="text-base font-bold">{conference.acknowledgement}</p>
      </div>
    </div>
  );
}
