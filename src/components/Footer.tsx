import Link from "next/link";
import { conference } from "@/lib/conference";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-paper-raised)]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Link
          href="/gyst-ai/conferences"
          className="text-base font-bold tracking-tight text-[var(--color-brand)] underline underline-offset-2"
        >
          Hosted by {conference.hostOrg.name} ({conference.hostOrg.acronym})
        </Link>
        <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
          {conference.hostOrg.tagline}
        </p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
          <Link href="/faq" className="text-[var(--color-brand)] underline underline-offset-2">
            FAQ
          </Link>
          <Link
            href="/for-teachers-and-parents"
            className="text-[var(--color-brand)] underline underline-offset-2"
          >
            For Teachers &amp; Parents
          </Link>
          <Link href="/contact" className="text-[var(--color-brand)] underline underline-offset-2">
            Contact
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--color-ink-muted)]">
          {conference.contact.emails.map((email) => (
            <a key={email} href={`mailto:${email}`} className="hover:text-[var(--color-brand)]">
              {email}
            </a>
          ))}
        </div>

        <p className="mt-6 text-xs text-[var(--color-ink-muted)]">
          &copy; {conference.year} {conference.hostOrg.name}.
        </p>
      </div>
    </footer>
  );
}
