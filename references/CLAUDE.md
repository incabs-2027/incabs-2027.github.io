# CLAUDE.md — inCABS 2027 / GYST-AI website

Read `HANDOVER.md` before starting work. This file is the short version of the
rules that apply to every task.

## What this is

A website for **inCABS 2027**, the inaugural International NextGen Conference on
AI in Biomedical Sciences — an academic conference for **high school students
worldwide**, hosted by the **Global Youth AI & STEM Foundation (GYST-AI)**.

Two sites, two repos, both deployed to GitHub Pages.

## Stack

- **Next.js**, App Router, TypeScript
- **Tailwind CSS**
- **Static export** (`output: 'export'`) — no backend as of now. This is a
  current decision, not a permanent one; if a real need appears later, revisit
  it deliberately rather than adding one mid-task
- **MDX** for page content, so 2028 reuses the components
- Deployed via **GitHub Actions** to GitHub Pages

Both repos are named `<org>.github.io`, so they publish at the **org root**.
That means **no `basePath` and no `assetPrefix`.** Do not add them — that is the
single most common way this setup breaks.

## Static-export constraints — build will fail or silently break otherwise

1. **No API routes, no Route Handlers, no Server Actions, no middleware.**
   There is no server. If a task seems to need one, stop and flag it.
2. **`images: { unoptimized: true }`** is mandatory. Next.js image optimization
   needs a running server and is incompatible with static export.
3. **No `dynamic = 'force-dynamic'`, no ISR, no `revalidate`.**
4. Any dynamic route segment needs **`generateStaticParams`**.
5. Prefer **Server Components**. Add `'use client'` only where genuinely needed
   (currently: the mobile nav toggle, and nothing else).
6. Run `npm run build` locally before every push. A broken build means the site
   silently stops updating.

## Integrity rules — these override helpfulness

1. **Never invent a date, deadline, venue, price, or person.** Unknown values
   render as "To be announced." Do not generate example values intended to be
   replaced later — they get shipped by accident.

2. **Never imply affiliation with ACM, IEEE, or any other body.** The ACM
   formatting template may be referenced, but every mention carries an explicit
   non-affiliation disclaimer. No third-party logos.

3. **Never promise publication, indexing, or DOIs.** Use "Publication details
   for accepted papers will be announced."

4. **Never list a named person without confirmed consent.** Currently only
   Dr. Xiong is confirmed, as General Chair and Program Chair. His affiliation
   is still pending confirmation — do not add one.

5. **No payment links, fee tables, or bank details.** Registration terms are
   undecided.

6. **Every claim must trace** to the source CFP document or to a decision
   recorded in HANDOVER.md section 3. If it doesn't, leave it out and flag it.

### Why these exist
This is a brand-new conference with no track record. Every unverifiable claim
makes it resemble a predatory conference — the fake-venue scam academics are
trained to filter out. Honest "TBA" reads as credible; invented specifics that
later change do not.

## Audience rules — who is actually reading this

A 16-year-old who has never written or submitted a research paper, often on a
mid-range Android phone, on metered mobile data, in a country where bandwidth is
expensive. Also their teachers and parents, who are checking whether this is
legitimate.

**Performance is an equity issue, not an optimization exercise.** Every kilobyte
of JavaScript is paid for hardest by the students with the least access.

- Zero client JS on content pages. Server Components by default.
- No analytics scripts, no third-party embeds, no web fonts unless self-hosted
  with `font-display: swap`.
- Target: Lighthouse performance 95+ on mobile throttling; total JS under 100 KB
  on the home page.

**Write for someone who doesn't know the vocabulary.**

- Define terms inline on first use, not in a footnote. Not "submit your
  camera-ready version" but "submit your final version — the *camera-ready*
  version —".
- Show rather than specify. "Six pages, ACM format" means nothing without a
  rendered example to look at.
- Answer the fears directly: Do I need a lab? A professor? What if my results
  are negative? What if I've never written a paper?
- Tone: warm but never condescending. "This is real research and you're capable
  of it," not "science is fun!" Teenagers detect being talked down to instantly.

**Accessibility is part of the mission,** not a checkbox. 4.5:1 contrast
minimum, 16px base text, visible focus states, alt text on every image, semantic
HTML, full keyboard navigation. A conference for students that some students
can't navigate is failing its own premise.

## Working style

- Ask before assuming. If a fact is missing, stop and ask rather than filling it.
- Content comes from the existing CFP document. Restructure it into pages;
  don't rewrite or embellish it.
- Content lives in MDX under `content/`. Components live in `components/`.
  Do not hardcode conference copy inside components.
- When a task is finished, tick the checkbox in HANDOVER.md section 5.
- When a decision gets made, record it in HANDOVER.md section 3 — not only in
  the code.

## Pre-push checklist

1. `npm run build` passes locally
2. **Scan the built output for risky claims.** `out/` is the static HTML that
   `npm run build` produces and that actually gets deployed — the last place to
   catch something before it's public. Run:

   ```bash
   grep -rniE 'deadline|DOI|indexed|proceedings|ACM|IEEE|\$|fee|register' out/
   ```

   Each word is a tripwire for one of the integrity rules above:
   - `deadline`, `register`, `fee`, `$` → invented dates, payment solicitation (R1, R5)
   - `DOI`, `indexed`, `proceedings` → publication promises we can't back (R3)
   - `ACM`, `IEEE` → implied affiliation (R2)

   Most hits are legitimate — "Submission deadline: To be announced" is fine.
   Read each one and confirm it complies. The point is not having to hold all
   six rules in your head; six words and one command surface anything risky.
3. No `basePath` or `assetPrefix` in `next.config.ts`
4. No `'use client'` added without a stated reason
