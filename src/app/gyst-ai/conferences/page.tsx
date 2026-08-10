import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { conference } from "@/lib/conference";

// Temporary home. This page belongs to the separate GYST-AI site
// (gyst-ai.github.io), not to inCABS 2027. It lives in this repo for now
// because that site hasn't been split into its own repo yet. When it is,
// move this file across and change the Link below from "/" to the inCABS
// site's real absolute URL.

export const metadata: Metadata = {
  title: `Conferences | ${conference.hostOrg.name}`,
};

export default function GystAiConferencesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Image
        src="/images/gystai-logo.png"
        alt={`${conference.hostOrg.name} logo`}
        width={320}
        height={268}
        className="mb-6 h-20 w-auto"
      />
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight">
        Conferences
      </h1>
      <p className="mb-10 max-w-2xl text-[var(--color-ink-muted)]">
        {conference.hostOrg.name} ({conference.hostOrg.acronym}) runs
        conferences and programs for high school students worldwide:{" "}
        {conference.hostOrg.tagline}. Here&apos;s what&apos;s currently
        running.
      </p>

      <div className="mb-6 flex flex-col gap-5 rounded-lg border-l-4 border-l-[var(--color-brand)] bg-[var(--color-paper)] p-6 shadow-sm sm:flex-row sm:items-start">
        <Image
          src="/images/incabs-logo.png"
          alt={`${conference.acronym} ${conference.year} logo`}
          width={299}
          height={320}
          className="h-24 w-auto flex-shrink-0"
        />
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[var(--color-brand)]">
            Inaugural edition &middot; Call for Papers published
          </p>
          <h2 className="mb-2 text-2xl font-extrabold tracking-tight">
            {conference.acronym} {conference.year}
          </h2>
          <p className="mb-1 font-medium text-[var(--color-ink-muted)]">
            {conference.name}
          </p>
          <p className="mb-4">
            {conference.theme.title}, a student research conference for high
            school researchers worldwide, individually or in teams.
          </p>
          <Link
            href="/"
            className="inline-block font-semibold text-[var(--color-brand)] underline underline-offset-2"
          >
            Visit the {conference.acronym} {conference.year} site →
          </Link>
        </div>
      </div>

      <p className="text-sm text-[var(--color-ink-muted)]">
        Future editions of {conference.acronym}, and future{" "}
        {conference.hostOrg.acronym} programs, will be listed here as
        they&apos;re announced.
      </p>
    </div>
  );
}
