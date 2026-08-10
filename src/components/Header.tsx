import Link from "next/link";
import Image from "next/image";
import { conference } from "@/lib/conference";
import { Nav } from "./Nav";

export function Header() {
  return (
    <header className="border-b-4 border-[var(--color-gold)] bg-[var(--color-panel)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6 3xl:max-w-7xl">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex items-center justify-center rounded-lg bg-[var(--color-paper)] p-1.5 shadow-sm">
            <Image
              src="/images/incabs2-logo.png"
              alt={`${conference.acronym} ${conference.year} logo`}
              width={299}
              height={320}
              priority
              className="h-10 w-auto"
            />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-lg font-extrabold tracking-tight text-[var(--color-panel-ink)]">
              {conference.acronym} {conference.year}
            </span>
            <span className="block font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-gold)]">
              AI in Biomedical Sciences
            </span>
          </span>
        </Link>
        <Nav />
      </div>
    </header>
  );
}
