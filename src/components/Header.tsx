import Link from "next/link";
import Image from "next/image";
import { conference } from "@/lib/conference";
import { Nav } from "./Nav";

export function Header() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-paper)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/incabs-logo.png"
            alt={`${conference.acronym} ${conference.year} logo`}
            width={299}
            height={320}
            priority
            className="h-11 w-auto"
          />
        </Link>
        <Nav />
      </div>
    </header>
  );
}
