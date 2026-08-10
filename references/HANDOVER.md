# inCABS 2027 / GYST-AI — Project Handover

**Last updated:** 2026-08-08
**Written for:** continuation in Claude Code, and for my own reference
**Owner:** Sri Bhargava Bhamidi (engineer / web + infrastructure)

**Changed in this revision:** stack decision moved from plain HTML to
**Next.js + Tailwind + static export**. Timeline extended from "by Monday" to
"across this week," with a reduced Monday milestone. Sections 5, 6, 7 rewritten.

---

## 0. How to use this document

Claude Code: read sections 1–4 before touching any file. Section 4 contains
integrity constraints that override any instinct to fill in reasonable defaults.
Section 5 is the ordered task list. Section 7 is the technical spec.

Me: section 6 is the week schedule, section 10 is the glossary.

---

## 1. Project context

Three separate entities. Keeping them distinct matters.

### GYST-AI — Global Youth AI & STEM Foundation
The parent organization. Permanent. Runs conferences and programs. Has a mission
and (eventually) a board and legal status. Has no dates or deadlines of its own.

Tagline: *"Connecting Young Minds with AI and Biomedical Discovery"*

### inCABS 2027 — International NextGen Conference on AI in Biomedical Sciences
One event, one year, hosted by GYST-AI. The inaugural edition. Future years
(inCABS 2028, etc.) are separate instances under the same parent — this is why
the component/content split in section 7 matters.

Audience: **high school students worldwide**, individually or in teams.
Working language: English.

### The proceedings
The published collection of accepted papers. **Does not exist and is not
promised yet.** See section 4, rule R3.

### People
| Role | Person | Notes |
|---|---|---|
| General Chair | Dr. Xiong | PhD advisor / PI. Affiliation pending — see Q4 |
| Program Chair | Dr. Xiong | Same person for year one |
| Web / Infrastructure | Sri Bhargava Bhamidi | Me |
| Technical Program Committee | **Not yet recruited** | Blocking for review phase |

General Chair and Program Chair are normally different people (GC owns logistics
and budget; PC owns review integrity). Same-person is acceptable for an
inaugural year, should be split by 2028.

---

## 2. Current state

### Repositories
| Repo | Org | Should become |
|---|---|---|
| `GYST-AI/gystemai` | GYST-AI | `GYST-AI/gyst-ai.github.io`, **public** |
| `incabs-2027/incabs2027` | incabs-2027 | `incabs-2027/incabs-2027.github.io`, **public** |

Both currently **private and empty**.

### Two hosting facts that drive everything
1. **GitHub Pages does not publish from private repos on the free plan.** Free
   and Free-for-organizations support Pages only in public repositories;
   private-repo Pages requires Pro / Team / Enterprise. → Make both public.
2. **Repo name controls the URL.** A repo named exactly `<org>.github.io`
   publishes at the org root. This is why the rename matters: it gives us root
   sites, which means **no `basePath` / `assetPrefix`** — removing the single
   most common Next.js-on-Pages failure mode.

### Content that already exists
Full Call for Papers text (tracks T1–T4, submission guidelines, review process,
awards, academic integrity, eligibility, contact). Source:
`inCABS_call_for_paper.docx`. This is the primary content source — restructure
it into pages, don't rewrite it.

### Contact emails currently in use
`incabs2027@gmail.com` and `gystem.ai@gmail.com`. Placeholders. Free-email
domains are a recognised warning sign of predatory conferences. Replace with
domain addresses once DNS is live.

---

## 3. Decisions

### Made
- **Next.js (App Router, TypeScript) + Tailwind CSS**, static export, MDX content
- Deployed to **GitHub Pages via GitHub Actions**
- **No backend.** See "explicitly rejected" below
- Two separate sites matching the two GitHub orgs
- One domain (`incabs.org`), years as paths (`/2027`, `/2028`), not new domains

### Explicitly rejected, with reasons
| Rejected | Why |
|---|---|
| **FastAPI / any backend** | Nothing needs one. Contact form → Formspree. Paper submission → CMT/EasyChair/OpenReview (free, and reviewers already know them). Payments → Stripe/Eventbrite, and blocked on legal entity anyway. A running service also can't be archived — `incabs.org/2027` must still resolve in 2035 for citations, and static files do that for free. |
| **Self-hosting minors' data** | Users are under 18. Storing their names, schools, and emails on self-built infrastructure pulls in COPPA, GDPR children's provisions, and state laws, for an unincorporated org, maintained by one person. CMT/EasyChair already carry that compliance burden. |
| **Next.js Image optimization** | Requires a server. `unoptimized: true`; pre-compress images manually. |

### Pending — BLOCKING (site cannot be finished without these)
| # | Decision | Who |
|---|---|---|
| D1 | Conference dates | Dr. Xiong |
| D2 | Format: in-person / virtual / hybrid, and location | Dr. Xiong |
| D3 | May we list Dr. Xiong's institutional affiliation? | Dr. Xiong |
| D4 | What exactly are we promising authors re: publication? | Dr. Xiong |
| D5 | Registration fee: yes/no, amount, recipient account | Dr. Xiong |

### Pending — NON-BLOCKING
| # | Decision | Notes |
|---|---|---|
| D6 | Domain purchase | ~$12–15/yr. Recommend `incabs.org` |
| D7 | Submission platform | CMT / EasyChair / OpenReview. Section 9 |
| D8 | Additional committee members | Dr. Xiong's network |
| D9 | GYST-AI legal entity | Required before collecting money |

---

## 4. Hard rules — integrity constraints

Not style preferences. Violating these creates real reputational and legal risk
for a new conference with no track record to absorb it.

**R1 — Never invent a date, deadline, venue, price, or person.** Unknown values
render "To be announced." Do not generate example values to be replaced later.

**R2 — Never imply affiliation with ACM, IEEE, or any other body.** The ACM SIG
Proceedings *formatting template* may be used; every mention carries an explicit
non-affiliation disclaimer. No third-party logos. ACM's own rules prohibit
organizers referring to ACM sponsorship or using its name or logo on a
conference website prior to approval through their program.

Approved wording:
> Papers must be formatted using the ACM SIG Proceedings format. Template files
> are available at [link]. inCABS 2027 is not affiliated with or sponsored by
> ACM; we use this format for consistency and readability.

**R3 — Do not promise publication, indexing, or DOIs** until D4 is answered.
Placeholder: "Publication details for accepted papers will be announced."

**R4 — Do not list any person by name without confirmed consent.** Listing
academics without permission is a hallmark of predatory conferences.

**R5 — No payment solicitation** until D5 and D9 resolve.

**R6 — Every claim must trace** to the CFP document or to section 3.

---

## 5. Task list — ordered

The list

Setup — 30 min, do once

npx create-next-app@latest — TypeScript, Tailwind, App Router, src/
Add output: 'export', images: { unoptimized: true }, trailingSlash: true to next.config.ts
Run npm run build, then npx serve out — confirm the exported site actually works
Add CLAUDE.md and HANDOVER.md to the project root

Shell — 2 hr

lib/conference.ts — all names, dates, emails as constants, unknowns as null
app/layout.tsx — metadata, font, skip-to-content link
Header + Nav (mobile hamburger), Footer
Tailwind theme — colors, type scale, prose container
<TBA /> component

inCABS pages — 4 hr, in this order

/ home
/call-for-papers
/tracks
/dates
/submission — includes the ACM disclaimer
/committee
/integrity
/awards
/contact
not-found.tsx

GYST-AI — 1.5 hr

Copy the shell components into the second project
Home, About, Conferences, Contact
Cross-link the two sites

Monday — deploy, ~1 hr

Make both repos public
Rename to gyst-ai.github.io and incabs-2027.github.io
Settings → Pages → Source → GitHub Actions
Add .github/workflows/deploy.yml and public/.nojekyll
Push, watch the Actions tab, fix until green
Email Dr. Xiong with the live link

Domain comes later in the week, once the site is up and stable.
---

## 6. Schedule

| When | Block | Depends on |
|---|---|---|
| **Sat night, 45 min** | Phase 0 | nothing |
| **Sun AM, 2 hr** | Phase 1 — pipeline | Phase 0 |
| **Sun PM, 2.5 hr** | Phase 2 — layout | Phase 1 green |
| **Sun eve, 2 hr** | Phase 3.1–3.4 | Phase 2 |
| **Mon AM, 2 hr** | Phase 3.5–3.6, Phase 4 | — |
| **Tue–Fri** | Phase 5 | Dr. Xiong's answers |

Do Phase 0 tonight — DNS propagation needs lead time.

### Monday milestone, honestly scoped
**Five pages live at `incabs-2027.github.io`, deploying automatically, nothing
invented on any of them.** That is a real result. Custom domain, FAQ, and the
GYST-AI site are this week, not this weekend.

### Fallback — if the build is not green by Sunday 20:00
Stop debugging. Switch Settings → Pages → Source back to **Deploy from a
branch**, push a single hand-written `index.html` with the conference name, one
paragraph, and the contact email. Ship that Monday, return to Next.js Tuesday
with no deadline pressure. A working one-page site beats a broken build.

---

## 7. Technical specification

### 7.1 Why this stack
Multi-year reuse is the real argument: 2028 needs the same header, footer, and
page shells with different content. Components plus MDX means that's a content
change, not a copy-paste of ten HTML files. Static export keeps the hosting
free, permanent, and archivable.

The root-site rename (`<org>.github.io`) removes the `basePath` friction that
normally makes Next.js on Pages painful.

### 7.2 `next.config.ts`
```ts
import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  output: 'export',              // static HTML, no server
  images: { unoptimized: true }, // mandatory: image optimization needs a server
  trailingSlash: true,           // emits dir/index.html — safest on Pages
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  // NO basePath. NO assetPrefix. Root site.
}

export default createMDX()(nextConfig)
```

### 7.3 Deploy workflow
`.github/workflows/deploy.yml`. Build on push to `main`, upload `out/`, deploy
via the official Pages actions. Requirements:
- `permissions: contents: read, pages: write, id-token: write`
- `concurrency` group so overlapping pushes don't race
- `actions/configure-pages`, `actions/upload-pages-artifact` (path `./out`),
  `actions/deploy-pages`
- Node 20+, `npm ci`, `npm run build`

Pin action versions rather than floating on `@main`, and check the current major
versions when writing the file — these actions do get revised.

### 7.4 Custom domain
- `public/CNAME` containing exactly `incabs.org` — bare domain, no scheme, no
  trailing slash
- Registrar: four `A` records for the apex + a `CNAME` for `www`.
  **Get the current IPs from GitHub's Pages custom-domain docs.** Do not copy
  them from a blog post or from memory; they change
- Settings → Pages → Custom domain → wait for the green check → enable
  **Enforce HTTPS** (greyed out until the certificate issues; can take hours)

### 7.5 Directory layout
```
src/
  app/
    layout.tsx
    page.tsx
    call-for-papers/page.tsx
    tracks/page.tsx
    dates/page.tsx
    submission/page.tsx
    committee/page.tsx
    integrity/page.tsx
    awards/page.tsx
    contact/page.tsx
    faq/page.tsx
    not-found.tsx
  components/
    Header.tsx  Nav.tsx  Footer.tsx
    TBA.tsx  Callout.tsx  DatesTable.tsx  TrackCard.tsx
  content/
    2027/
      cfp.mdx  tracks.mdx  integrity.mdx  awards.mdx  faq.mdx
  lib/
    conference.ts   // single source of truth: name, year, dates, contacts
public/
  .nojekyll  CNAME
```

**`lib/conference.ts` is important.** Every date, deadline, email, and the
conference name live there as typed constants, with unknown values as `null`
rendering through `<TBA />`. One file to update when Dr. Xiong answers, and it
makes R1 structurally hard to violate.

### 7.6 Page contents
Source all copy from the CFP document.

- **`/`** — full name, acronym, year; one-sentence description; dates and
  location block (TBA); three-sentence "what this is"; primary link to CFP;
  "Hosted by GYST-AI" footer
- **`/call-for-papers`** — CFP intro, conference theme, four track summaries
  linking to `/tracks`, paper requirements (English; 6 pages max including
  figures, tables, references, appendices; original and unpublished; must cover
  motivation, methodology, results, discussion, limitations, conclusions);
  individual and team submissions both welcome
- **`/tracks`** — T1 Healthcare/Diagnostics/Clinical Decision Support;
  T2 Biomedical Research/Genomics/Drug Discovery; T3 Responsible AI/Ethics/
  Policy; T4 Emerging Technologies. Each with its description and topic list
- **`/dates`** — submission deadline, notification, camera-ready, author
  registration, conference dates. All `<TBA />`
- **`/submission`** — requirements; ACM format **with mandatory disclaimer**;
  submission system "to be announced"; review process (~3 independent
  reviewers); evaluation criteria; oral vs poster; at least one author must
  register and present; publication **placeholder only per R3**
- **`/committee`** — Dr. Xiong, General Chair and Program Chair, no affiliation
  until D3. "Additional committee members will be announced"
- **`/integrity`** — academic integrity policy; eligibility (high school
  students worldwide, no geographic restrictions, schools including homeschools
  recognised by their country's Ministry of Education or equivalent)
- **`/awards`** — Best Paper, Best Oral, Best Poster, Outstanding Innovation,
  Outstanding Interdisciplinary Research; Organizing Committee may add more
- **`/contact`** — emails; swap gmail → domain addresses once live

### 7.7 GYST-AI site
Four pages: home (mission), about, conferences (links to inCABS), contact.
Reuse the conference components — copy them across, or extract to a shared
package later if the duplication becomes annoying. Do not block on abstraction.

---

## 8. Audience design — the part that actually differentiates this

The reader is a 16-year-old who has never submitted a paper, often on a
mid-range Android phone on metered data, plus their teachers and parents.

**Performance is an equity issue.** JavaScript parse time on low-end phones is
what makes pages feel broken, and the students who pay that cost are exactly the
ones with the least access. Server Components by default; `'use client'` only
for the nav toggle; no analytics, no third-party embeds, no unoptimised web
fonts. Budget: under 100 KB JS on the home page, Lighthouse mobile 95+.

**Write for someone without the vocabulary.**
- Define terms inline on first use, not in footnotes
- Show a rendered example paper — "six pages, ACM format" means nothing to
  someone who has never seen one
- Linear "what happens next" timeline: submit → review → decision → revise →
  present. The dates table assumes you already know what the dates refer to
- Tone: warm, never condescending. "This is real research and you're capable of
  it," not "science is fun!"

**The `/faq` page is the highest-value page on the site** and no other
conference has one. Answer what actually stops students from submitting:
*Do I need a lab? Do I need a professor? What if my results are negative? What
if I'm the only person at my school doing this? What if I've never written a
paper? What if my English isn't strong?*

**`/for-teachers-and-parents`** — who runs this, what it costs, what happens to
students' data, what participation involves. Serves the adults doing the
legitimacy check, and answers our own credibility problem at the same time.

**Accessibility is part of the mission.** 4.5:1 contrast, 16px base, visible
focus states, alt text, semantic HTML, keyboard navigable throughout.

---

## 9. After this week

1. **Recruit the Technical Program Committee.** Hardest and most important. The
   CFP promises ~3 reviews per paper — 30 submissions means 90 reviews. Runs on
   Dr. Xiong's network, not on anything I can build
2. **Choose the submission platform.** *Microsoft CMT* — free, requires at least
   one chair with a valid, current, non-student, non-anonymous university email
   (Dr. Xiong qualifies). *EasyChair* — free tier, widely used. *OpenReview* —
   used by ML conferences, supports public review
3. **Lock and publish dates.** Once published, treat as promises
4. **Decide the publication path.** (a) self-hosted PDF proceedings — free,
   immediate, no external credential. (b) same plus DOIs via Crossref — annual
   membership plus per-paper fee, permanently citable, still not indexed.
   (c) an established series such as ACM's International Conference Proceedings
   Series, which publishes proceedings of non-ACM-sponsored conferences —
   application with a $50 non-refundable fee, 4–6 week response, review period
   of no less than one month, at least two positive reviews per accepted paper,
   organizer/chair websites hosted by an affiliated institution rather than a
   personal homepage, and open-access article processing charges under the
   current model. **Verify all terms with ACM directly before relying on them.**
   Recommendation: commit publicly to (a), pursue (c) quietly, upgrade the
   announcement only once secured
5. **GYST-AI legal entity** — required before handling registration money
6. **Run the cycle:** submissions → review → notification → camera-ready →
   registration → event → proceedings

---

## 10. Glossary

| Term | Meaning |
|---|---|
| **ACM** | Association for Computing Machinery. Professional membership society for computer scientists, founded 1947. Runs conferences, publishes journals, maintains the ACM Digital Library. Not a company |
| **IEEE** | Institute of Electrical and Electronics Engineers. Same kind of body, broader scope |
| **CFP** | Call for Papers. The public announcement inviting submissions |
| **TPC** | Technical Program Committee. The reviewers |
| **General Chair** | Owns the event: logistics, budget, venue, sponsors |
| **Program Chair** | Owns review quality and accept/reject decisions |
| **Peer review** | Experts evaluating a paper before publication. The mechanism that makes a venue credible |
| **Camera-ready** | The final formatted version of an accepted paper, after revisions |
| **Proceedings** | The published collection of accepted papers from one edition |
| **DOI** | Digital Object Identifier. A permanent link for a paper, issued via agencies such as Crossref, for a fee |
| **Indexing** | Inclusion in searchable academic databases (Scopus, Web of Science, DBLP). What makes a paper discoverable and "count" |
| **Acceptance rate** | Accepted ÷ submitted. The main prestige proxy. Top venues sit around 15–25% |
| **Predatory conference** | A sham event that accepts everything and charges fees. Recognised by free-email domains, no real website, non-consenting committees, vague venues, no history |
| **ICPS** | ACM's International Conference Proceedings Series — the route by which non-ACM conferences can apply to have proceedings appear in the ACM Digital Library |
| **Static export** | Next.js mode that emits plain HTML/CSS/JS with no server. Required for GitHub Pages |
| **basePath** | Next.js setting for sites served from a subpath. **We do not need it** — root sites |
