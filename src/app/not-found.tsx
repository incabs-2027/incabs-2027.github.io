import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <h1 className="mb-4 text-3xl font-extrabold tracking-tight">Page not found</h1>
      <p className="mb-8 text-[var(--color-ink-muted)]">
        We couldn&apos;t find that page. It may have moved, or the link may
        be out of date.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-[var(--color-brand)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--color-brand-dark)]"
        >
          Go home
        </Link>
        <Link
          href="/contact"
          className="rounded-md border border-[var(--color-border)] px-5 py-3 text-sm font-semibold hover:border-[var(--color-brand)]"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
