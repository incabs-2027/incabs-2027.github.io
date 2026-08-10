import Link from "next/link";
import type { Metadata } from "next";
import { conference } from "@/lib/conference";

export const metadata: Metadata = {
  title: `Contact | ${conference.acronym} ${conference.year}`,
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 xl:px-16 3xl:max-w-4xl">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">Contact</h1>

      <p className="mb-4">
        {conference.acronym} {conference.year} is run by a small,
        mostly-volunteer team at {conference.hostOrg.name}. Before emailing
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

      <div className="space-y-2">
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
    </div>
  );
}
