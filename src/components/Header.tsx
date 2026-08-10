import Link from "next/link";
import { conference } from "@/lib/conference";
import { Nav } from "./Nav";

export function Header() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-paper)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-xl font-extrabold tracking-tight text-[var(--color-ink)]">
            {conference.acronym} {conference.year}
          </span>
          <span className="text-xs text-[var(--color-ink-muted)]">
            {conference.hostOrg.acronym}
          </span>
        </Link>
        <Nav />
      </div>
    </header>
  );
}
