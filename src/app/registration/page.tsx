import Link from "next/link";
import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { formatDate } from "@/lib/formatDate";
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
        The registration dates below are confirmed. More details will become available as things settle down.
  
      </p>

      <div className="mb-8 space-y-4">
        {conference.registration.tiers.map((tier) => (
          <div
            key={tier.name}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper-raised)] p-5 sm:p-6"
          >
            <p className="mb-4 text-lg font-bold tracking-tight">
              {tier.name}
            </p>

            {/* Fee and date are labelled separately and side by side. The
                dates are confirmed while the amounts are not, so an
                unlabelled "To be announced" here reads as though the whole
                tier were unsettled — and sits directly above a real date
                that says otherwise. */}
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="border-l-2 border-[var(--color-accent)] pl-4">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
                  Fee
                </dt>
                <dd className="mt-1.5 text-xl font-extrabold">
                  <TBA value={tier.amount} label={`${tier.name} fee`} />
                </dd>
              </div>

              {(tier.opensOn || tier.deadline) && (
                <div className="border-l-2 border-[var(--color-accent)] pl-4">
                  <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
                    {tier.opensOn ? "Opens" : "Deadline"}
                  </dt>
                  <dd className="mt-1.5 text-xl font-extrabold">
                    {formatDate(tier.opensOn ?? tier.deadline)}
                  </dd>
                </div>
              )}
            </dl>

            {tier.note && (
              <p className="mt-4 text-sm text-[var(--color-ink-muted)]">
                {tier.note}
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="text-sm text-[var(--color-ink-muted)]">
        At least one author of every accepted paper must register by the
        Author Registration Deadline to be invited to present at the conference. See the{" "}
        <Link
          href="/dates"
          className="font-medium text-[var(--color-brand)] underline underline-offset-2"
        >
          Key Dates
        </Link>{" "}
        page for the full schedule.
      </p>
    </div>
  );
}
