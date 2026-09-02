# Chef portfolio — a CV laid out as a tasting menu

A static site: cover, service history, twenty-four signature dishes, the EatMe
case study, skills, certification, contact. It prints to a plain CV.

Live locally on <http://localhost:4321>.

---

## Architecture

There is no server code and no data source. Everything the page shows is in one
file, `public/src/js/data.js`, and `main.js` renders the DOM from it. That is the
whole design: the chef edits facts, never markup.

```
Browser ──► public/index.html ──► src/js/main.js ──► src/js/data.js
                                        │
                                        └─► /assets/img/menu/<slug>.jpg
```

The project follows the Cloudflare POC standard, minus the parts that only apply
to an app with a private data source:

| Standard says | Here |
|---|---|
| `public/` is the only published directory | yes — `public/` is the Pages output directory |
| `functions/` at the repository root | not present: nothing needs a server |
| secrets in `context.env`, `.env.example` committed | no secrets and no variables exist |
| `_headers` in the output directory | `public/_headers` |
| local dev applies the same headers | `serve.mjs` parses `public/_headers` and applies it |
| degrade, do not crash | no network call to fail; the page is its own fallback |

If a contact form or a live Instagram feed is ever added, that is the moment to
add `functions/api/…` and re-read the standard's sections 03–06.

## Layout

```
public/                 THE ONLY DIRECTORY PUBLISHED
  index.html
  _headers              security headers and cache policy
  assets/img/menu/      dish photographs: <slug>.jpg, -full.jpg, -alt.jpg
  assets/img/brand/     EatMe bottle shots
  src/css/style.css
  src/js/data.js        every fact on the page
  src/js/main.js        rendering and behaviour
assets/img/src/         camera originals, 5-18 MB each — gitignored, never deployed
tools/check-assets.mjs  asserts photos exist and public/ holds nothing private
serve.mjs               local dev server, never deployed
```

## Commands

```bash
npm run dev      # node serve.mjs — serves public/ with the production headers
npm run dev:cf   # wrangler pages dev public — the real platform runtime
npm run check    # every dish has its photographs; public/ holds nothing private
npm run deploy   # wrangler pages deploy public
```

No dependencies, no build step. `npm install` is not required for `npm run dev`.

## Deploying to Cloudflare Pages

Either route works. The Git one is less to remember.

**Connect the repository** (Workers & Pages → Create → Pages → Connect to Git):

- Framework preset: **None**
- Build command: *(empty)*
- Build output directory: **`public`**

**Or from this machine:**

```bash
npx wrangler pages deploy public --project-name chef-portfolio
```

There are no environment variables or secrets to set.

### Before the first deploy

- [ ] `npm run check` passes
- [ ] Build output directory is `public`, not the repository root
- [ ] `curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/README.md` returns 404
- [ ] Every `// MOCK` in `data.js` has been replaced (see below)

## What must be replaced before sending this to anyone

Everything tagged `// MOCK` in `public/src/js/data.js` is a plausible-looking
placeholder, not a fact. Dish names and descriptions were written from the
photographs and are real; check the ingredient lists read the way you cook.

- **`CHEF.name`** — currently *Mykhailo Savchuk*, invented.
- **`CHEF.rightToWork`** — the single line a UK employer reads first. Word it
  exactly as your status actually stands.
- **`CHEF.email`, `CHEF.phone`, `CHEF.seeking`, `CHEF.available`, `CHEF.english`**
- **`NUMBERS`** — years, covers, dishes, brigade size.
- **`HISTORY`** — four roles with placeholder venue names, dates and achievements.
- **`HOUSE.years` and `HOUSE.facts`** — the EatMe figures.
- **`TRAINING`** — certificate names, awarding bodies and years.

Two things are not mock: the EatMe Instagram links, and the photographs.

## The feed wall

Inside the EatMe block, a full-bleed wall of 3:4 frames runs in two lanes:
**from the kitchen** (what came off the pass) above, **from the counter**
(packaging, delivery, guests, the juice line) below, travelling in opposite
directions. Hover or focus pauses a lane; a click opens the same viewer the menu
uses. Below 760px, and whenever the visitor asks for reduced motion, the lanes
stop moving and become swipeable rows with the captions always shown.

Round plates are the menu; rectangles are the feed. The shapes carry the
difference between the craft and the business, which is why the frames are not
circles.

The frames are 3:4 because that is the aspect an Instagram profile grid uses
since 2026. The wall does not embed Instagram and does not scrape it.

### Going live

`FEED` in `data.js` is already shaped like an API response. Set `FEED.live` to
`true` and the page will `fetch('/api/instagram')` once, on load, and swap the
wall for whatever comes back. Anything other than a well-formed
`{ ok: true, posts: [...] }` — a 404, a timeout, an empty list — leaves the
committed selection on screen and the line under the note keeps saying it is a
selection. Nothing to catch, nothing to spin.

The flag ships as `false` on purpose: with no endpoint deployed, the fetch is a
guaranteed 404 on every page load, which is a wasted round trip and a red line
in the console for something that is working correctly.

The endpoint itself is **not** in this repository, because it cannot be written
against anything real yet. Building it needs, in order:

1. The EatMe account converted to a Business or Creator account and linked to a
   Facebook Page.
2. A Meta app with **Instagram API with Instagram Login**, and a long-lived
   access token — which expires every 60 days and has to be refreshed.
3. `functions/api/instagram.js` reading `IG_TOKEN` and `IG_USER_ID` from
   `context.env` (never `process.env`), calling the Graph API, and returning
   only the fields the wall draws: `slug`, `lane`, `tag`, `caption`, plus image
   URLs. Errors return `{ ok: false, reason }` with HTTP 200 and a generic
   message; the detail goes to the log.
4. `img-src` in `_headers` widened to the Instagram CDN, or the images proxied
   through the same function. Say which, in a comment, next to the change.

Until step 4 the CSP will block the images silently, which is the failure mode
worth knowing about in advance.

### The people in these photographs

Several frames in the counter lane show customers. They are EatMe's own
marketing photography, but if any face is not cleared for reuse on a personal
portfolio, delete that entry from `FEED.posts` — `npm run check` will then tell
you which files are orphaned.

## Photographs

`public/assets/img/menu/` holds three sizes per dish, generated from the camera
originals in `assets/img/src/`:

| File | Size | Used by |
|---|---|---|
| `<slug>.jpg` | 1000 px | the round plate in the menu grid |
| `<slug>-full.jpg` | 1400 px | the lightbox |
| `<slug>-alt.jpg` | 1400 px | the lightbox's second angle, where one exists |

`public/assets/img/feed/` holds two sizes per feed frame, from a different
shoot in `assets/img/feed-src/`:

| File | Size | Used by |
|---|---|---|
| `<slug>.jpg` | 620 px | the tile in the wall |
| `<slug>-full.jpg` | 1200 px | the lightbox |

`public/assets/brand/eatme-logo.svg` is the real EatMe mark, white, used as the
avatar on a brand-green circle.

Which dishes have a second angle is listed in `TWO_SHOTS` in `main.js`.
`npm run check` fails if that list and the files on disk disagree.

To add a dish: put the photographs in place, add an entry to `DISHES`, and add
the slug to `TWO_SHOTS` if it has a second angle.

## Notes on the front end

- **No inline script and no inline event handlers.** The deployed CSP sets
  `script-src 'self'`, and `serve.mjs` applies the same policy locally, so a
  violation breaks the page on a laptop rather than in production.
- Google Fonts is the only external origin, allowed by name in `_headers`.
- `prefers-reduced-motion` switches off the reveals and the plate animation.
- `@media print` hides the photographs and navigation and lays the same content
  out as a plain CV — that is what the **Save as PDF** button triggers.
