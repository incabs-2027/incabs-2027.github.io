import Link from "next/link";
import type { Metadata } from "next";
import { conference } from "@/lib/conference";
import { formatDateRange } from "@/lib/formatDate";
import { TBA } from "@/components/TBA";
import { Callout } from "@/components/Callout";

export const metadata: Metadata = {
  title: `For Teachers & Parents | ${conference.acronym} ${conference.year}`,
};

const conferenceDates = formatDateRange(
  conference.dates.conferenceStart,
  conference.dates.conferenceEnd
);

export default function ForTeachersAndParentsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 xl:px-16 3xl:max-w-4xl">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight">
        For Teachers &amp; Parents
      </h1>

      <p className="mb-8 max-w-2xl">
        A student wants to submit a paper here, and you&apos;re doing the
        sensible thing, checking whether this is real before they invest
        time in it. Here&apos;s a direct answer to that.
      </p>

      <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
        Who runs this
      </h2>
      <p className="mb-8">
        {conference.acronym} {conference.year} is organized by{" "}
        {conference.hostOrg.name} ({conference.hostOrg.acronym}). The
        General Chair and Program Chair is {conference.committee[0].name}
        {conference.committee[0].affiliation
          ? `, ${conference.committee[0].affiliation}`
          : ""}
        . This is the inaugural edition, the first time this conference has
        run, and it is organized by a newly formed foundation. We think
        that&apos;s worth saying plainly rather than dressing it up.
      </p>

      <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
        How to check this is legitimate
      </h2>
      <p className="mb-3">
        Submitted papers go through independent peer review, roughly{" "}
        {conference.reviewProcess.reviewersPerPaper} reviewers per paper,
        before acceptance. That review process, and everything else about
        submitting, is documented publicly on the{" "}
        <Link href="/submission" className="text-[var(--color-brand)] underline underline-offset-2">
          Submission
        </Link>{" "}
        page rather than handled privately. Formatting follows the ACM SIG
        Proceedings format. {conference.paperRequirements.acmDisclaimer}
      </p>
      <p className="mb-8">
        Dates, location, and the submission system are now confirmed and
        published. Anything still undecided — the registration fee, the
        specific venue — is marked &ldquo;To be announced&rdquo; rather than
        guessed at. That is deliberate. Inventing details to look more
        finished would be a red flag, not a reassurance.
      </p>

      <h2 className="mb-3 text-2xl font-extrabold tracking-tight">Cost</h2>
      <p className="mb-2">
        Registration fee: <TBA value={conference.registration.feeAmount} label="Registration fee" />
      </p>
      <p className="mb-8">
        No fee has been announced, and none will be collected until one is.
        This site does not carry payment links or fee tables until that
        decision is made and published here first.
      </p>

      <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
        What participation involves
      </h2>
      <p className="mb-4">
        A student submits an abstract, then a full paper. It goes through
        peer review, and they receive a decision. If accepted, they revise,
        register, and present. The full timeline is on the{" "}
        <Link href="/dates" className="text-[var(--color-brand)] underline underline-offset-2">
          Key Dates
        </Link>{" "}
        page.
      </p>
      <p className="mb-8">
        The conference itself is held{" "}
        <span className="font-semibold">
          <TBA value={conferenceDates} label="Conference dates" />
        </span>{" "}
        in{" "}
        <span className="font-semibold">
          <TBA value={conference.format.location} label="Location" />
        </span>
        , in person. Attending means travelling there, so it is worth
        checking the{" "}
        <Link href="/travel" className="text-[var(--color-brand)] underline underline-offset-2">
          Travel &amp; Venue
        </Link>{" "}
        page — particularly the visa guidance — well before the registration
        deadline.
      </p>

      <h2 className="mb-3 text-2xl font-extrabold tracking-tight">Student data</h2>
      <Callout variant="reassurance">
        <p className="mb-2">
          This website itself collects no personal information. There are
          no forms, no accounts, and no analytics on it.
        </p>
        <p>
          Paper submission happens through{" "}
          {conference.submissionPlatform.name}, a separate external platform
          run by Microsoft that carries its own privacy policy and account
          system. Students create an account there, not here. We are not in a
          position to make promises on that platform&apos;s behalf — please
          read its own terms. The{" "}
          <Link href="/submission">Submission</Link> page links straight to
          it.
        </p>
      </Callout>
    </div>
  );
}
