import { conference } from "@/lib/conference";

const primaryEmail = conference.contact.emails[0];

const options = [
  {
    title: "Become a sponsor",
    description:
      "Support the inaugural inCABS conference and help fund a global platform for first-time student researchers.",
    subject: "Sponsorship inquiry",
  },
  {
    title: "Become a foundation member",
    description: `Join ${conference.hostOrg.name} (${conference.hostOrg.acronym}) and help build future programs for young researchers worldwide.`,
    subject: "Foundation membership inquiry",
  },
];

export function GetInvolved() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {options.map((option) => (
        <div
          key={option.title}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper-raised)] p-5"
        >
          <p className="mb-1.5 text-base font-bold tracking-tight">
            {option.title}
          </p>
          <p className="mb-3 text-sm text-[var(--color-ink-muted)]">
            {option.description}
          </p>
          <a
            href={`mailto:${primaryEmail}?subject=${encodeURIComponent(option.subject)}`}
            className="inline-block text-sm font-semibold text-[var(--color-brand)] underline underline-offset-2"
          >
            {option.title} →
          </a>
        </div>
      ))}
    </div>
  );
}
