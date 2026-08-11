"use client";

import { useState } from "react";
import Link from "next/link";

// Navigation labels are UI copy, not conference facts, so they live here
// rather than in lib/conference.ts.
const primaryLinks = [
  { href: "/tracks", label: "Tracks" },
  { href: "/dates", label: "Dates" },
  { href: "/submission", label: "Submission" },
  { href: "/registration", label: "Registration" },
  { href: "/committee", label: "Committee" },
];

const resourceLinks = [
  { href: "/awards", label: "Awards" },
  { href: "/integrity", label: "Academic Integrity & Eligibility" },
  { href: "/travel", label: "Travel & Venue" },
  { href: "/faq", label: "FAQ" },
  { href: "/for-teachers-and-parents", label: "Teachers & Parents" },
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
        className="inline-flex items-center gap-2 rounded border border-white/20 px-3 py-2 text-sm font-semibold text-[var(--color-panel-ink)] sm:hidden"
      >
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        Menu
      </button>

      <ul
        id="primary-nav-menu"
        className={`${
          open ? "flex" : "hidden"
        } absolute right-0 z-40 mt-2 w-72 flex-col gap-1 rounded-lg border border-white/10 bg-[var(--color-panel-raised)] p-3 shadow-lg sm:static sm:mt-0 sm:flex sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-1 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none`}
      >
        {primaryLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded px-2 py-1.5 text-sm font-semibold text-[var(--color-panel-ink)] hover:text-[var(--color-accent)] sm:px-0 sm:py-0"
            >
              {link.label}
            </Link>
          </li>
        ))}

        <li className="sm:relative">
          <details className="group sm:relative">
            <summary
              className="flex cursor-pointer list-none items-center gap-1 rounded px-2 py-1.5 text-sm font-semibold text-[var(--color-panel-ink)] hover:text-[var(--color-accent)] marker:content-[''] sm:px-0 sm:py-0 [&::-webkit-details-marker]:hidden"
            >
              Resources
              <span aria-hidden="true" className="text-xs transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>
            <div className="mt-1 flex w-full flex-col gap-0.5 rounded-md bg-[var(--color-panel)] p-1 sm:absolute sm:left-0 sm:top-full sm:mt-2 sm:w-52 sm:border sm:border-white/10 sm:p-1.5 sm:shadow-lg">
              {resourceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded px-2.5 py-1.5 text-sm font-medium text-[var(--color-panel-muted)] hover:bg-white/5 hover:text-[var(--color-panel-ink)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </details>
        </li>

        <li>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block rounded px-2 py-1.5 text-sm font-semibold text-[var(--color-panel-ink)] hover:text-[var(--color-accent)] sm:px-0 sm:py-0"
          >
            Contact
          </Link>
        </li>

        <li className="mt-2 sm:mt-0 sm:ml-2">
          <Link
            href="/call-for-papers"
            onClick={() => setOpen(false)}
            className="block rounded-md bg-[var(--color-gold)] px-4 py-2 text-center text-sm font-bold text-[var(--color-ink)] hover:bg-[#ff8a3d]"
          >
            Call for Papers
          </Link>
        </li>
      </ul>
    </nav>
  );
}
