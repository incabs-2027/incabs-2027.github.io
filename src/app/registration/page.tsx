import Link from "next/link";
import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { TBA } from "@/components/TBA";

export const metadata: Metadata = {
  title: `Registration | ${conference.acronym} ${conference.year}`,
};

export default function RegistrationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 xl:px-16 3xl:max-w-4xl">
      <h1 className="mb-3 text-4xl font-extrabold tracking-tight">
        Registration
      </h1>
      <p className="mb-8 max-w-2xl text-[var(--color-ink-muted)]">
        No registration fee has been announced yet, and none will be
        collected until one is. This page will list real prices, and this
        site will link to a payment method, only once that decision is made
        and published here first.
      </p>

      <div className="mb-8 space-y-4">
        {conference.registration.tiers.map((tier) => (
          <div
            key={tier.name}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper-raised)] p-5 sm:p-6"
          >
            <p className="text-lg font-bold tracking-tight">{tier.name}</p>
            <p className="mt-1.5 text-xl font-extrabold">
              <TBA value={tier.amount} label={`${tier.name} fee`} />
            </p>
            {tier.note && (
              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                {tier.note}
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="text-sm text-[var(--color-ink-muted)]">
        At least one author of every accepted paper must register by the
        Author Registration Deadline to present. See the{" "}
        <Link
          href="/dates"
          className="font-medium text-[var(--color-brand)] underline underline-offset-2"
        >
          Key Dates
        </Link>{" "}
        page for the deadline once it&apos;s announced.
      </p>
    </div>
  );
}
