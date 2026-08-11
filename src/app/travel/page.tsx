import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { TBA } from "@/components/TBA";

export const metadata: Metadata = {
  title: `Travel & Venue | ${conference.acronym} ${conference.year}`,
};

export default function TravelPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 xl:px-16 3xl:max-w-4xl">
      <h1 className="mb-3 text-4xl font-extrabold tracking-tight">
        Travel &amp; Venue
      </h1>
      <p className="mb-8 max-w-2xl text-[var(--color-ink-muted)]">
        This page will fill in once a host city and venue are confirmed.
        Nothing here is invented in the meantime.
      </p>

      <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
        Location
      </h2>
      <p className="mb-8">
        <TBA value={conference.format.location} label="Location" />
      </p>

      <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
        Conference hotel
      </h2>
      <p className="mb-8">
        <TBA value={null} label="Conference hotel" />
      </p>

      <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
        Getting there
      </h2>
      <p className="mb-8">
        <TBA value={null} label="Travel information" />
      </p>

      <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
        Visa invitation letters
      </h2>
      <p className="mb-2">
        Authors who need a visa invitation letter should contact us once
        registered — details on requesting one will be posted here.
      </p>
      <p className="mb-8">
        If you may need a visa to travel to the conference location, start
        with the U.S. Department of State&apos;s overview of visa
        requirements:{" "}
        <a
          href="https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[var(--color-brand)] underline underline-offset-2"
        >
          travel.state.gov: Visa Waiver Program
        </a>
        .
      </p>

      <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
        Things to do
      </h2>
      <p>
        <TBA value={null} label="Things to do near the conference" />
      </p>
    </div>
  );
}
