# Mykhailo Sanduliak — cook portfolio

Personal portfolio site for Mykhailo Sanduliak, cook and creator of the EatMe
healthy-food menu. A static site: no build step and no dependencies to install.

---

## Швидкий старт (українською)

### 1. Один раз встановити

- **Node.js** — версія LTS: <https://nodejs.org>
- **Git**: <https://git-scm.com/downloads>

### 2. Завантажити проєкт

Відкрий термінал (на Windows — PowerShell, на Mac — Terminal) і виконай:

```
git clone https://github.com/makspundyk/misha-portfolio-chef.git
cd misha-portfolio-chef
```

### 3. Запустити сайт

```
npm run dev
```

Відкрий у браузері **<http://localhost:4321>**.
Щоб зупинити сайт — натисни `Ctrl + C` у терміналі.

### 4. Отримати свіжі зміни

У папці проєкту:

```
git pull
```

Потім знову `npm run dev` (якщо сайт був зупинений) і онови сторінку в браузері.

### Де що лежить

| Що | Де |
|---|---|
| Весь текст сайту | `public/src/js/data.js` — змінив значення, оновив сторінку |
| Фото страв | `public/assets/img/menu/` |
| Фото зі стрічки EatMe | `public/assets/img/feed/` |
| Резюме (готовий PDF) | `cv/Mykhailo-Sanduliak-CV.pdf` |
| Резюме (для редагування) | `cv/cv.html` |

---

## What is on the page

Cover → About → Experience (skills) → The menu (21 dishes; tap a plate for the
photographs) → A week of meals (six day cards opened from story-style circles)
→ EatMe (facts, bottles, Instagram photo wall) → Contact.

## Layout

```
public/                   THE ONLY DIRECTORY PUBLISHED
  index.html              page structure and static labels
  _headers                security headers and cache policy
  assets/img/menu/        dish photographs: <slug>.jpg, -full.jpg, -alt.jpg
  assets/img/feed/        EatMe feed photographs: <slug>.jpg, -full.jpg
  assets/img/brand/       EatMe bottle shots
  assets/brand/           EatMe logo
  src/css/style.css
  src/js/data.js          every fact on the page
  src/js/main.js          rendering and behaviour
cv/
  cv.html                 the CV source (A4, UK format)
  Mykhailo-Sanduliak-CV.pdf
tools/check-assets.mjs    asserts photos exist and public/ holds nothing private
serve.mjs                 local dev server, never deployed
```

Camera originals (`assets/img/src/`, `assets/img/feed-src/`) are gitignored and
never deployed.

## Commands

```bash
npm run dev      # node serve.mjs — serves public/ on http://localhost:4321 with the production headers
npm run check    # every dish and feed frame has its photographs; public/ holds nothing private
npm run dev:cf   # wrangler pages dev public — the real Cloudflare runtime
npm run deploy   # wrangler pages deploy public
```

`npm install` is not needed for `npm run dev` or `npm run check`. Use another
port with `PORT=5000 npm run dev` (PowerShell: `$env:PORT=5000; npm run dev`).

## Editing the content

Everything the page shows lives in `public/src/js/data.js`:

- `CHEF` — name, role, strapline, contacts, right to work, languages, intro.
- `SKILLS` — the skills shown in the Experience section (keep in step with the CV).
- `DISHES` — the menu. Each dish needs `<slug>.jpg` (1000 px) and
  `<slug>-full.jpg` (1400 px) in `public/assets/img/menu/`. If the dish has a
  second angle, add `<slug>-alt.jpg` and put the slug in `TWO_SHOTS` in
  `public/src/js/main.js`.
- `SETS` — the week of meals: one entry per day with its photo, meals and
  macros.
- `HOUSE` — the EatMe block. `FEED` — the Instagram photo wall; captions are not
  shown on the page but are kept as image alt text.

Run `npm run check` after adding or removing photographs.

## The CV

`cv/cv.html` is the source. To produce the PDF after an edit: open the file in
Chrome or Edge, press `Ctrl + P`, choose **Save as PDF**, paper size **A4**,
turn **Headers and footers** off, and save over `cv/Mykhailo-Sanduliak-CV.pdf`.

The portfolio link in the CV points to <https://mykhailo-sanduliak.pages.dev>.
It works once the site is deployed under that Cloudflare Pages project name; if
Cloudflare gives a different address, update the link in `cv/cv.html`.

## Deploying to Cloudflare Pages

**Connect the repository** (Workers & Pages → Create → Pages → Connect to Git):

- Framework preset: **None**
- Build command: *(empty)*
- Build output directory: **`public`**

**Or from a computer with this project:**

```bash
npx wrangler login
npx wrangler pages deploy public --project-name mykhailo-sanduliak
```

There are no environment variables or secrets to set.

## Still to confirm

- `CHEF.available` — "Available from October 2026" is a placeholder.
- `HOUSE.body` mentions a cold-pressed juice line, while the own brand is now
  listed as EatMe.
- The phone number is Ukrainian; replace it with the UK number (site and CV)
  once there is one.
- Some feed photographs show customers. If any face is not cleared for reuse on
  a personal portfolio, delete that entry from `FEED.posts`.

## Notes on the front end

- **No inline script and no inline event handlers.** The deployed CSP sets
  `script-src 'self'`, and `serve.mjs` applies the same policy locally, so a
  violation breaks the page on a laptop rather than in production.
- Google Fonts is the only external origin, allowed by name in `_headers`.
- `prefers-reduced-motion` switches off the reveals and the plate animation.
- `@media print` lays the page out as a plain document — that is what the
  **Save as PDF** button triggers.
- `FEED.live` is `false`: the page makes no request to Instagram. Setting it to
  `true` requires a `functions/api/instagram.js` endpoint that does not exist yet.
