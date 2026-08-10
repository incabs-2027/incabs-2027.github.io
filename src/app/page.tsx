import Link from "next/link";
import { conference } from "@/lib/conference";
import { TBA } from "@/components/TBA";
import { Countdown } from "@/components/Countdown";
import { TrackCard } from "@/components/TrackCard";
import { Callout } from "@/components/Callout";

export default function Home() {
  return (
    <>
      <section className="relative w-full overflow-hidden border-b-4 border-[var(--color-gold)] bg-[var(--color-panel)] text-[var(--color-panel-ink)]">
        {/* Static — no client JS on this page. See references/CLAUDE.md:
            "zero client JS on content pages," this audience is often on
            metered mobile data. A full-bleed gradient + wide viewBox (with
            preserveAspectRatio="slice") so the panel reads as designed —
            not empty — from a phone up to a 4K/TV-width viewport, instead
            of a fixed-size graphic pinned to one corner. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_100%_0%,var(--color-panel-raised),transparent_65%)]"
        />
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1600 640"
        >
          <g stroke="var(--color-accent)" strokeOpacity="0.4" strokeWidth="1">
            <line x1="80" y1="90" x2="300" y2="60" />
            <line x1="300" y1="60" x2="550" y2="140" />
            <line x1="550" y1="140" x2="820" y2="120" />
            <line x1="820" y1="120" x2="950" y2="220" />
            <line x1="950" y1="220" x2="1120" y2="160" />
            <line x1="950" y1="220" x2="1080" y2="340" />
            <line x1="1120" y1="160" x2="1250" y2="280" />
            <line x1="1250" y1="280" x2="1400" y2="180" />
            <line x1="1250" y1="280" x2="1180" y2="500" />
            <line x1="1400" y1="180" x2="1420" y2="380" />
            <line x1="1400" y1="180" x2="1550" y2="120" />
            <line x1="1420" y1="380" x2="1300" y2="460" />
            <line x1="1420" y1="380" x2="1560" y2="420" />
            <line x1="1300" y1="460" x2="1180" y2="500" />
            <line x1="1080" y1="340" x2="980" y2="480" />
          </g>
          <g fill="var(--color-gold)">
            <circle cx="80" cy="90" r="3.5" />
            <circle cx="300" cy="60" r="4" />
            <circle cx="550" cy="140" r="4" />
            <circle cx="820" cy="120" r="4" />
            <circle cx="950" cy="220" r="5.5" />
            <circle cx="1120" cy="160" r="4" />
            <circle cx="1080" cy="340" r="4" />
            <circle cx="1250" cy="280" r="5.5" />
            <circle cx="1400" cy="180" r="4" />
            <circle cx="1180" cy="500" r="4" />
            <circle cx="1420" cy="380" r="5.5" />
            <circle cx="1550" cy="120" r="3.5" />
            <circle cx="1300" cy="460" r="4" />
            <circle cx="1560" cy="420" r="3.5" />
            <circle cx="980" cy="480" r="4" />
          </g>
        </svg>

        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 2xl:max-w-6xl 3xl:max-w-7xl">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
            // {conference.hostOrg.acronym} presents
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-balance sm:text-5xl">
            AI in biomedical sciences, from the{" "}
            <span className="text-[var(--color-gold)]">researchers</span>{" "}
            who&apos;ll shape it next.
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-semibold text-[var(--color-panel-ink)]">
            {conference.acronym} {conference.year}, {conference.name}
          </p>
          <p className="mt-3 max-w-2xl text-[var(--color-panel-muted)]">
            A student research conference for high school researchers
            worldwide. Submit original work, get real peer review, and
            present alongside researchers from all over the world.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/call-for-papers"
              className="rounded-md bg-[var(--color-gold)] px-5 py-3 text-sm font-bold text-[var(--color-ink)] hover:bg-[#dcb567]"
            >
              Read the Call for Papers
            </Link>
            <Link
              href="/faq"
              className="rounded-md border border-white/25 px-5 py-3 text-sm font-bold text-white hover:border-white/50"
            >
              New to research? Start here
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 2xl:max-w-6xl 3xl:max-w-7xl">
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight">
            What this is
          </h2>
          <div className="max-w-2xl space-y-3 text-[var(--color-ink)]">
            <p>
              {conference.acronym} is an annual international conference
              dedicated to showcasing outstanding research conducted by high
              school students from around the world. It&apos;s a rigorous
              academic forum, not a science fair, where young researchers
              submit original work, get real peer feedback from a Technical
              Program Committee, and present alongside students from other
              countries.
            </p>
            <p>
              This is the inaugural edition, the first {conference.acronym},
              run by a brand-new foundation, {conference.hostOrg.name}. We
              are building the process in the open, and we would rather tell
              you honestly what is still being decided than guess.
            </p>
          </div>
        </section>

        <section className="mb-14 rounded-lg border border-[var(--color-border)] bg-[var(--color-paper-raised)] p-5 sm:p-6">
          <h2 className="mb-5 text-xl font-extrabold tracking-tight">
            Key details
          </h2>
          <dl className="grid gap-5 sm:grid-cols-3">
            <div className="border-l-2 border-[var(--color-accent)] pl-4">
              <dt className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
                Format
              </dt>
              <dd className="mt-1.5 font-semibold">
                <TBA value={conference.format.mode} label="Format" />
              </dd>
            </div>
            <div className="border-l-2 border-[var(--color-accent)] pl-4">
              <dt className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
                Submission deadline
              </dt>
              <dd className="mt-1.5">
                <Countdown
                  target={conference.dates.submissionDeadline}
                  label="Submission deadline"
                />
              </dd>
            </div>
            <div className="border-l-2 border-[var(--color-accent)] pl-4">
              <dt className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
                Working language
              </dt>
              <dd className="mt-1.5 font-semibold">{conference.language}</dd>
            </div>
          </dl>
          <Link
            href="/dates"
            className="mt-6 inline-block font-semibold text-[var(--color-gold-ink)] underline underline-offset-2"
          >
            See the full schedule →
          </Link>
        </section>

        <section className="mb-14">
          <h2 className="mb-2 text-2xl font-extrabold tracking-tight">
            Four research tracks
          </h2>
          <p className="mb-6 max-w-2xl text-[var(--color-ink-muted)]">
            Explore {conference.theme.title} by picking the track closest
            to your work, or read all four if you&apos;re not sure yet.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {conference.tracks.map((track) => (
              <TrackCard key={track.id} track={track} compact />
            ))}
          </div>
        </section>

        <Callout variant="reassurance" title="Never submitted a research paper before?">
          <p>
            You&apos;re exactly who this conference is for. Lab and professor requirement is not mandatory. Read the{" "}
            <Link href="/faq">frequently asked questions</Link> for honest
            answers to the questions most first-time student researchers
            have.
          </p>
        </Callout>
      </div>
    </>
  );
}
