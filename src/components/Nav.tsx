"use client";

import { useState } from "react";
import Link from "next/link";

// Navigation labels are UI copy, not conference facts, so they live here
// rather than in lib/conference.ts.
const links = [
  { href: "/call-for-papers", label: "Call for Papers" },
  { href: "/tracks", label: "Tracks" },
  { href: "/dates", label: "Dates" },
  { href: "/submission", label: "Submission" },
  { href: "/committee", label: "Committee" },
  { href: "/awards", label: "Awards" },
  { href: "/integrity", label: "Integrity" },
  { href: "/faq", label: "FAQ" },
  { href: "/for-teachers-and-parents", label: "Teachers & Parents" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Primary" className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="primary-nav-menu"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded border border-[var(--color-border)] px-3 py-2 text-sm font-semibold sm:hidden"
      >
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        Menu
      </button>

      <ul
        id="primary-nav-menu"
        className={`${
          open ? "flex" : "hidden"
        } absolute right-0 z-40 mt-2 w-64 flex-col gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-3 shadow-md sm:static sm:mt-0 sm:flex sm:w-auto sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-1 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none`}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded px-2 py-1.5 text-sm font-semibold text-[var(--color-ink)] hover:text-[var(--color-brand)] sm:px-0 sm:py-0"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
