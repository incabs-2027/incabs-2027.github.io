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
        Your student wants to submit a paper to this conference, and you&apos;re wondering whether this is a legitimate
        conference before they invest
        time in it. Here&apos;s a direct answer to that.
      </p>

      <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
        Who runs this conference?
      </h2>
      <p className="mb-8">
        {conference.acronym} {conference.year} is organized by{" "}
        {conference.hostOrg.name} ({conference.hostOrg.acronym}). The
        General Chair and Program Chair is Ms. {conference.committee[0].name}
        {conference.committee[0].affiliation
          ? `, ${conference.committee[0].affiliation}`
          : ""}
        . This is the inaugural edition, the first time this conference has
        run.
      </p>

      <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
        How serious is this conference?
      </h2>
      <p className="mb-3">
        We run this conference as rigorous as any other professional academic conferences
        by following exactly the same process. All submitted papers will go through an independent but rigorous
         review process. Each submission will receive about{" "}
        {conference.reviewProcess.reviewersPerPaper} reviews before the paper's acceptance/rejection decision.
        The review process is documented publicly on the{" "}
        <Link href="/submission" className="text-[var(--color-brand)] underline underline-offset-2">
          Submission
        </Link>{" "}
        page. All submissions have to be formated according to the ACM SIG
        Proceedings format, though{" "}{conference.paperRequirements.acmDisclaimer}
      </p>
      <p className="mb-8">
        Dates, location, and the submission system are confirmed and
        published. Anything still undecided is marked &ldquo;To be announced&rdquo;. 
      </p>

      <h2 className="mb-3 text-2xl font-extrabold tracking-tight">How much does the conference cost?</h2>
      <p className="mb-2">
        Registration fee: <TBA value={conference.registration.feeAmount} label="Registration fee" />
      </p>
      <p className="mb-8">
        The conference is run through volunteers and hosted by the non-profit organization. The conference registration
        fee will be used to cover the operational cost of running conference (such as venues, materails, and food). Based on the actual submission
        numbers and the sponsorship received, we will determine a lowest possible registration fee for conference attendees. Before than, no 
        fee has been announced, and none will be collected until then.
        This website does not carry payment links or fee tables until that
        decision is made and published here first.
      </p>

      <p className="mb-8">
        Conference paper submission is completely free without any cost.
      </p>

      <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
        What participation involves?
      </h2>
      <p className="mb-4">
        A student submits an abstract, then a full paper. The papers go through
        peer review, and then receive a decision. If accepted, students will revise,
        register, and present their paper. The full timeline is on the{" "}
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
