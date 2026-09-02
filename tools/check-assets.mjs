/**
 * Asserts that every dish in data.js has the photographs the page will ask for,
 * and that nothing private sits inside the published directory.
 *
 * Run with `npm run check` before deploying.
 */

import { readdir, access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT   = join(fileURLToPath(new URL('..', import.meta.url)));
const PUBLIC = join(ROOT, 'public');

const { DISHES, HOUSE } = await import(join(PUBLIC, 'src/js/data.js'));

const exists = async (path) => {
  try { await access(path); return true; } catch { return false; }
};

const problems = [];

for (const dish of DISHES) {
  for (const suffix of ['', '-full']) {
    const rel = `assets/img/menu/${dish.slug}${suffix}.jpg`;
    if (!(await exists(join(PUBLIC, rel)))) problems.push(`missing ${rel}`);
  }
}

for (const bottle of HOUSE.bottles) {
  const rel = `assets/img/brand/${bottle.file}`;
  if (!(await exists(join(PUBLIC, rel)))) problems.push(`missing ${rel}`);
}

// The published directory must hold nothing but the site.
const FORBIDDEN = ['.env', '.env.example', 'node_modules', 'tools', 'docs', 'serve.mjs', 'README.md'];
for (const name of await readdir(PUBLIC)) {
  if (FORBIDDEN.includes(name)) problems.push(`public/${name} must not be published`);
}

// Every dish main.js promises a second angle for must actually have one, and
// every -alt file on disk should be promised — otherwise the lightbox either
// requests a 404 or silently hides a photograph that exists.
const source = await readFile(join(PUBLIC, 'src/js/main.js'), 'utf8');
const block = source.match(/const TWO_SHOTS = new Set\(\[([\s\S]*?)\]\)/);
const promised = new Set([...(block?.[1] ?? '').matchAll(/'([^']+)'/g)].map((m) => m[1]));

for (const slug of promised) {
  if (!(await exists(join(PUBLIC, `assets/img/menu/${slug}-alt.jpg`)))) {
    problems.push(`main.js promises a second angle for ${slug}, but ${slug}-alt.jpg is missing`);
  }
}
for (const dish of DISHES) {
  if (!promised.has(dish.slug) && (await exists(join(PUBLIC, `assets/img/menu/${dish.slug}-alt.jpg`)))) {
    problems.push(`${dish.slug}-alt.jpg exists but main.js never shows it`);
  }
}

if (problems.length) {
  console.error('FAIL');
  for (const line of problems) console.error(`  - ${line}`);
  process.exit(1);
}

console.log(`OK — ${DISHES.length} dishes, ${HOUSE.bottles.length} bottles, nothing private in public/`);
