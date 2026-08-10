import Link from "next/link";
import Image from "next/image";
import { conference } from "@/lib/conference";

export function Footer() {
  return (
    <footer className="mt-16 bg-[var(--color-panel)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Link href="/gyst-ai/conferences" className="flex items-center gap-3">
          <span className="flex items-center justify-center rounded-lg bg-[var(--color-paper)] p-1.5">
            <Image
              src="/images/gystai-logo.png"
              alt={`${conference.hostOrg.name} logo`}
              width={320}
              height={268}
              className="h-9 w-auto"
            />
          </span>
          <span className="text-base font-bold tracking-tight text-[var(--color-panel-ink)] underline decoration-[var(--color-gold)] underline-offset-4">
            Hosted by {conference.hostOrg.name} ({conference.hostOrg.acronym})
          </span>
        </Link>
        <p className="mt-2 text-sm text-[var(--color-panel-muted)]">
          {conference.hostOrg.tagline}
        </p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <Link href="/faq" className="text-[var(--color-panel-ink)] hover:text-[var(--color-accent)]">
            FAQ
          </Link>
          <Link
            href="/for-teachers-and-parents"
            className="text-[var(--color-panel-ink)] hover:text-[var(--color-accent)]"
          >
            For Teachers &amp; Parents
          </Link>
          <Link href="/contact" className="text-[var(--color-panel-ink)] hover:text-[var(--color-accent)]">
            Contact
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-sm text-[var(--color-panel-muted)]">
          {conference.contact.emails.map((email) => (
            <a key={email} href={`mailto:${email}`} className="hover:text-[var(--color-accent)]">
              {email}
            </a>
          ))}
        </div>

        <p className="mt-8 border-t border-white/10 pt-4 text-xs text-[var(--color-panel-muted)]">
          &copy; {conference.year} {conference.hostOrg.name}.
        </p>
      </div>
    </footer>
  );
}
