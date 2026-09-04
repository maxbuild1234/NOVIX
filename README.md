# AruWeb

Marketing site for AruWeb, a website design studio in Oranjestad, Aruba. The
business model is recurring: we design and build a site, then keep it running on
a monthly maintenance plan. The site is built around that — the plans section is
the main conversion target, and every case study says which plan the client is on.

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis.
No CMS and no database: all content lives in typed files under `src/content/`.

---

## Running it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with Turbopack on port 3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

### Building while the dev server is running

`next build` and `next dev` both write to `.next`, so building while the dev
server is up will pull the files out from under it and the dev server will start
returning 500s. Either stop the dev server first, or build into a separate
directory:

```bash
NEXT_DIST_DIR=.next-verify npm run build
```

`NEXT_DIST_DIR` defaults to `.next`, so Vercel and every other host need no
configuration for this.

---

## Editing the content

Everything a non-developer would want to change is in `src/content/`. Each file
is typed, so a wrong shape fails the build rather than silently breaking a page.

| File | Holds |
| --- | --- |
| `site.ts` | Studio name, email, street address, languages, timezone, nav links |
| `plans.ts` | **The three monthly prices**, what each plan includes, budget ranges for the contact form |
| `projects.ts` | The six case studies: client, sector, year, headline metric, challenge/approach/outcome, images |
| `services.ts` | The four services and what each one includes |
| `process.ts` | The four process steps |
| `testimonials.ts` | The three quotes |

### Changing a price

Edit the `price` field in `src/content/plans.ts`. Nothing else hardcodes a
number — the plans section, the hero's "from $89 a month", the contact page and
the JSON-LD `Offer` entries all read from that file.

### Adding a case study

Add an object to the `projects` array in `src/content/projects.ts`. The route,
the work grid, the pinned scroll section, the sitemap and the "next case" link at
the bottom of each study all pick it up automatically. Two things to get right:

- `slug` becomes the URL (`/work/your-slug`).
- The `width` and `height` on each image must match the real file, or the page
  will reserve the wrong space and shift as the image loads.

### Replacing the images

`public/work/*.png` and `public/og.png` are generated placeholders, not real
screenshots. Replace them with real imagery, keep the filenames, and update the
`width`/`height` in `projects.ts` to match.

To regenerate the placeholders (they are deterministic, so this produces
identical files every time):

```bash
node scripts/generate-placeholders.mjs
```

### Making the contact form actually send

`src/app/api/contact/route.ts` currently validates the submission and logs it to
the server console. To deliver enquiries, replace the `console.info` call with
your mail provider or CRM. Everything above that line — parsing, validation, the
honeypot, the error response shapes — stays as it is. The form and the route
share one schema (`src/lib/contact-schema.ts`), so a validation rule only has to
be written once.

---

## Design system

Eight colours, defined as Tailwind theme tokens in `src/app/globals.css`.
Tailwind's default palette is cleared (`--color-*: initial`), so a stray
`text-gray-500` simply does not exist and shows up immediately.

| Token | Value | Use |
| --- | --- | --- |
| `black` | `#050505` | Page base |
| `ink` | `#0f0f11` | Raised surfaces |
| `gray-1` | `#1c1c20` | Borders and dividers |
| `gray-2` | `#7c7c86` | Secondary text |
| `gray-3` | `#c9c9d1` | Body text |
| `white` | `#ffffff` | Headings |
| `purple` | `#7c3aed` | Accent: large type, edges, glows |
| `violet` | `#a855f7` | Accent: small text and focus rings |

Two notes on those last three, both from a contrast audit:

- **`gray-2` is `#7c7c86`, not the `#6b6b75` it started as.** The original was
  3.90:1 on `black` and 3.71:1 on `ink`, which fails WCAG AA for body text.
  `#7c7c86` measures 4.93:1 and 4.64:1 and reads the same.
- **`purple` is 3.58:1 on black**, which passes AA for large text only. Anything
  under 24px that needs to be purple uses `violet` instead, at 5.15:1. Focus
  rings are violet for the same reason.

Purple is rationed to one element per viewport: the hero's last line, the
cursor, the recommended plan's edge, link underlines. There is deliberately no
purple-washed background anywhere.

Type is Poppins only, self-hosted by `next/font` at build time — no request ever
leaves for a font CDN. The scale is defined once as `--text-*` tokens, each
carrying its own line-height, tracking and weight, so `text-display-1` sets all
four at once.

---

## Motion

Every animation is gated on `prefers-reduced-motion`. With it set, Lenis is never
initialised, the custom cursor is never mounted, the pinned horizontal scroll is
replaced by a vertical stack, the marquee stops, and every scroll reveal renders
at full opacity. Verified in headless Chrome with the media feature emulated:
the document is 12,870px tall instead of 16,804px, and nothing is hidden.

| Piece | Where | Reduced-motion fallback |
| --- | --- | --- |
| Character-mask headline | Hero | Renders in place |
| Magnetic buttons | Primary CTAs | Static |
| Custom cursor | Global | Not mounted (also skipped on touch) |
| Pinned horizontal scroll | Selected work | Vertical stack (also below 1024px) |
| Slow marquee | Between Why Aruba and Testimonials | Static row |
| Page transitions | All routes | Instant |
| Lenis smooth scroll | Global | Not initialised |
| Film grain | Global | Static, 3.5% opacity |

The pinned section measures its own travel distance with a `ResizeObserver`
rather than computing it from viewport units, because the panels are capped at a
max width and so are not a fixed fraction of the viewport at every size.

---

## Accessibility and performance

Lighthouse on the production build, desktop and mobile presets:

| Page | Perf | A11y | Best practices | SEO |
| --- | --- | --- | --- | --- |
| `/` | 99–100 | 100 | 100 | 100 |
| `/services` | 100 | 100 | 100 | 100 |
| `/contact` | 100 | 100 | 100 | 100 |
| `/work/casa-marisol` | 100 | 100 | 100 | 100 |

CLS is 0 on every page and total blocking time is under 70ms. Also checked: one
`h1` per page, no skipped heading levels, alt text on every image, no focusable
elements inside `aria-hidden`, visible focus rings throughout, and no horizontal
overflow down to 360px.

SEO is wired up with per-page metadata and OpenGraph tags, `sitemap.ts`,
`robots.ts`, and a `ProfessionalService` JSON-LD block that places the studio in
Aruba and exposes the three plans as `Offer` entries.

---

## Known issues

- `npm audit` reports a moderate and a high advisory against a transitive
  `postcss` inside Next 15. The only available fix is Next 16, which is a major
  upgrade. The advisory is for a build-time CSS stringifier and is not reachable
  at runtime on this site.
- If the project lives in a cloud-synced folder (OneDrive, Dropbox), the sync
  client occasionally races Turbopack's temp-file renames and the dev server logs
  `ENOENT ... .next/static/development/_buildManifest.js.tmp.*`. It recovers on
  its own. Excluding `.next` from sync stops it.

## Deploying

Push to a Git repository and import it on Vercel. No configuration, no
environment variables, no build command overrides. Every page is statically
generated except `/api/contact`.
