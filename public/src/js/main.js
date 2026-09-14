/**
 * Renders the page from data.js and wires the three interactions that matter:
 * filtering the menu, opening a plate, and printing a plain CV.
 *
 * There is no inline script anywhere on purpose — the deployed CSP sets
 * script-src 'self', which is what stops an injected <script> from running.
 */

import { CHEF, HISTORY, SKILLS, DISHES, SETS, HOUSE, FEED } from './data.js';

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const el = (tag, props = {}, children = []) => {
  const node = Object.assign(document.createElement(tag), props);
  for (const child of [].concat(children)) {
    if (child != null) node.append(child);
  }
  return node;
};

/* Scroll reveal. Defined before anything renders, because the menu asks for it
   as soon as it is built. */
const revealer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      revealer.unobserve(entry.target);
    }
  },
  { rootMargin: '0px 0px -8% 0px' }
);

function observeReveals(root = document) {
  for (const node of $$('[data-reveal]:not(.is-in)', root)) revealer.observe(node);
}

/* -------------------------------------------------------------- simple fills */

for (const node of $$('[data-fill]')) {
  node.textContent = CHEF[node.dataset.fill] ?? '';
}

$('[data-fill-intro]').append(...CHEF.intro.map((text) => el('p', { textContent: text })));

/* ------------------------------------------------------------------ history */

$('[data-fill-history]').append(
  ...HISTORY.map((job) =>
    el('li', { }, [
      el('div', {}, [
        el('h3', { className: 'history__role' }, [
          `${job.role}, `,
          el('span', { className: 'history__venue', textContent: job.venue })
        ]),
        el('p', { className: 'history__kind', textContent: job.kind }),
        el('ul', { className: 'history__notes' },
          job.notes.map((note) => el('li', { textContent: note })))
      ]),
      el('p', { className: 'history__years' }, [
        job.years,
        el('span', { className: 'history__place', textContent: job.place })
      ])
    ])
  )
);

$('[data-fill-skills]').append(...SKILLS.map((skill) => el('li', { textContent: skill })));

/* --------------------------------------------------------------------- menu */

const menuList = $('[data-fill-menu]');
let   visible  = DISHES;

const dishCard = (dish, index) => {
  const img = el('img', {
    src: `/assets/img/menu/${dish.slug}.jpg`,
    alt: dish.name,
    loading: index < 6 ? 'eager' : 'lazy',
    decoding: 'async',
    width: 1000,
    height: 1000
  });

  const plate = el('span', { className: 'plate' }, img);
  if (dish.focus) plate.style.setProperty('--focus', dish.focus);

  const button = el('button', { type: 'button', className: 'dish__btn' }, [
    plate,
    el('span', { className: 'dish__line' }, [
      el('span', { className: 'dish__name', textContent: dish.name }),
      el('span', { className: 'dish__leader', ariaHidden: 'true' }),
      el('span', { className: 'dish__section', textContent: dish.section })
    ]),
    el('span', { className: 'dish__desc', textContent: dish.desc })
  ]);
  button.addEventListener('click', () =>
    openViewer(visible.map(dishFrame), visible.indexOf(dish)));

  const item = el('li', { className: 'dish' }, button);
  item.dataset.reveal = '';
  return item;
};

const renderMenu = (course) => {
  visible = course === 'all' ? DISHES : DISHES.filter((d) => d.course === course);
  menuList.replaceChildren(
    ...(visible.length
      ? visible.map(dishCard)
      : [el('p', { className: 'menu__empty', textContent: 'Nothing here yet.' })])
  );
  observeReveals(menuList);
};

renderMenu('all');

/* --------------------------------------------------------------------- sets */

/* The weekly sets, told the way the stories told them: a circle a day, and the
   whole card behind it. */
const setsList = $('[data-fill-sets]');
const setBox   = $('#setbox');
const setCard  = $('#setcard');
let   setIndex = 0;

function paintSet() {
  const set = SETS[setIndex];
  if (!set) return;

  const photo = el('img', {
    className: 'setcard__photo', src: set.photo, alt: set.day, decoding: 'async'
  });
  photo.style.objectPosition = set.focus;

  setCard.replaceChildren(
    el('div', { className: 'setcard__text' }, [
      el('p', { className: 'setcard__day', textContent: set.day }),
      el('ul', { className: 'setcard__meals' },
        set.meals.map(([label, items]) =>
          el('li', {}, [
            el('span', { className: 'setcard__label', textContent: label }),
            el('ul', {}, items.map((item) => el('li', { textContent: item })))
          ]))),
      el('p', { className: 'setcard__macros', textContent: set.macros })
    ]),
    photo
  );
}

const stepSet = (delta) => {
  setIndex = (setIndex + delta + SETS.length) % SETS.length;
  paintSet();
};

setsList.append(
  ...SETS.map((set, index) => {
    const thumb = el('img', { src: set.thumb, alt: '', loading: 'lazy', decoding: 'async' });
    thumb.style.objectPosition = set.focus;

    const button = el('button', { type: 'button', className: 'set' }, [
      el('span', { className: 'set__ring' }, thumb),
      el('span', { className: 'set__day', textContent: set.day })
    ]);
    button.addEventListener('click', () => {
      setIndex = index;
      paintSet();
      if (!setBox.open) setBox.showModal();
    });
    return el('li', {}, button);
  })
);

$('[data-set-close]').addEventListener('click', () => setBox.close());
$('[data-set-prev]').addEventListener('click', () => stepSet(-1));
$('[data-set-next]').addEventListener('click', () => stepSet(1));
setBox.addEventListener('click', (event) => {
  if (event.target === setBox) setBox.close();
});

/* ------------------------------------------------------------------- viewer */

/**
 * One viewer serves both the menu and the feed. It takes a list of frames —
 * `{ images, title, sub, tag }` — and an index, so neither caller knows the
 * other exists.
 */
const lb     = $('#lightbox');
const lbImgA = $('#lbImgA');
const lbImgB = $('#lbImgB');
const lbName = $('#lbName');
const lbDesc = $('#lbDesc');
const lbSect = $('#lbSection');

// Which dishes were photographed twice. Written down rather than probed, so a
// missing file is a data bug instead of a broken image.
const TWO_SHOTS = new Set([
  'omelette-rolls','green-fritters','rye-club','chicken-roulade','greek-salad',
  'veg-muffins','mozzarella-salad','chicken-cutlets','hake-sweet-potato',
  'banana-crepes','poppy-crepe-rolls','asparagus-salad','chicken-parmesan-salad',
  'prawn-quail-salad','salmon-mussel-salad','crumbed-chicken','fish-roulade'
]);

const dishFrame = (dish) => ({
  images: TWO_SHOTS.has(dish.slug)
    ? [`/assets/img/menu/${dish.slug}-full.jpg`, `/assets/img/menu/${dish.slug}-alt.jpg`]
    : [`/assets/img/menu/${dish.slug}-full.jpg`],
  alt: dish.name,
  title: dish.name,
  sub: dish.desc,
  tag: dish.section
});

// The feed frames open as photographs only: no caption, no tag.
const postFrame = (post) => ({
  images: [`/assets/img/feed/${post.slug}-full.jpg`],
  alt: post.caption,
  title: '',
  sub: '',
  tag: ''
});

let frames = [];
let cursor = 0;

function openViewer(list, index) {
  frames = list;
  cursor = index;
  paintFrame();
  if (!lb.open) lb.showModal();
}

function paintFrame() {
  const frame = frames[cursor];
  if (!frame) return;

  lbImgA.src = frame.images[0];
  lbImgA.alt = frame.alt ?? frame.title;

  if (frame.images[1]) {
    lbImgB.src = frame.images[1];
    lbImgB.alt = `${frame.alt ?? frame.title}, second angle`;
    lbImgB.hidden = false;
  } else {
    lbImgB.hidden = true;
    lbImgB.removeAttribute('src');
  }

  lbName.textContent = frame.title;
  lbName.hidden = frame.title === '';
  lbDesc.textContent = frame.sub;
  lbDesc.hidden = frame.sub === '';
  lbSect.textContent = frame.tag;
  lbSect.hidden = frame.tag === '';

  // With nothing to say, the caption bar itself has no reason to be there.
  lbName.parentElement.hidden = !frame.title && !frame.sub && !frame.tag;
}

const step = (delta) => {
  cursor = (cursor + delta + frames.length) % frames.length;
  paintFrame();
};

$('[data-lb-close]').addEventListener('click', () => lb.close());
$('[data-lb-prev]').addEventListener('click', () => step(-1));
$('[data-lb-next]').addEventListener('click', () => step(1));

lb.addEventListener('click', (event) => {
  // A click on the backdrop lands on the dialog itself, never on its children.
  if (event.target === lb) lb.close();
});

document.addEventListener('keydown', (event) => {
  if (!lb.open) return;
  if (event.key === 'ArrowLeft')  step(-1);
  if (event.key === 'ArrowRight') step(1);
});

/* -------------------------------------------------------------------- house */

for (const node of $$('[data-fill-house]')) {
  const key = node.dataset.fillHouse;
  if (node.tagName === 'A') {
    node.href = HOUSE.instagram;
    node.textContent = HOUSE.instagramLabel;
  } else {
    node.textContent = HOUSE[key] ?? '';
  }
}

$('[data-fill-house-body]').append(...HOUSE.body.map((text) => el('p', { textContent: text })));

$('[data-fill-house-facts]').append(
  ...HOUSE.facts.map(([key, value]) =>
    el('div', {}, [el('dt', { textContent: key }), el('dd', { textContent: value })])
  )
);

$('[data-fill-bottles]').append(
  ...HOUSE.bottles.map(({ file, name }) =>
    el('figure', { className: 'bottle' },
      el('img', {
        src: `/assets/img/brand/${file}`,
        alt: `EatMe — ${name.toLowerCase()}`,
        loading: 'lazy', decoding: 'async', width: 344, height: 900
      })
    )
  )
);

/* --------------------------------------------------------------- feed wall */

/**
 * Two lanes of frames running against each other. Each lane holds its tiles
 * twice: the track travels exactly half its width and starts over, which is
 * what makes the loop seamless. The second copy is hidden from assistive tech
 * and from the tab order — it is the same content, drawn again.
 */

const wallBox = $('[data-fill-wall]');

// Seconds per tile. Multiplying by the tile count keeps both lanes moving at
// the same speed on screen, however many frames each one holds.
const LANE_PACE = 5.5;

const tile = (post, index, list) => {
  // The track is wider than the screen, so browser lazy-loading leaves the
  // off-screen tiles as dark holes until the marquee drags them in. The frames
  // carry their URL instead, and the whole wall loads when it nears the fold.
  const img = el('img', {
    alt: post.caption,
    decoding: 'async', width: 620, height: 827
  });
  img.dataset.src = `/assets/img/feed/${post.slug}.jpg`;

  const button = el('button', { type: 'button', className: 'tile' }, img);
  button.addEventListener('click', () => openViewer(list.map(postFrame), index));
  return button;
};

function buildLanes() {
  for (const lane of FEED.lanes) {
    const posts = FEED.posts.filter((post) => post.lane === lane.id);
    if (!posts.length) continue;

    const track = el('div', { className: 'lane__track' });
    track.append(...posts.map((post, i) => tile(post, i, posts)));

    const echo = el('div', {});
    for (const post of posts) {
      const copy = tile(post, posts.indexOf(post), posts);
      copy.tabIndex = -1;
      copy.setAttribute('aria-hidden', 'true');
      echo.append(copy);
    }
    track.append(...echo.children);

    const row = el('div', { className: `lane${lane.id === 'counter' ? ' lane--back' : ''}` }, [
      el('p', { className: 'lane__label', textContent: lane.label }),
      track
    ]);
    row.style.setProperty('--run', `${(posts.length * LANE_PACE).toFixed(0)}s`);
    wallBox.append(row);
  }

  for (const img of $$('.tile img[data-src]', wallBox)) {
    if (wallLoaded) {
      img.src = img.dataset.src;
      delete img.dataset.src;
    }
  }
}

let wallLoaded = false;

const wallLoader = new IntersectionObserver(
  (entries, self) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    wallLoaded = true;
    for (const img of $$('.tile img[data-src]', wallBox)) {
      img.src = img.dataset.src;
      delete img.dataset.src;
    }
    self.disconnect();
  },
  { rootMargin: '600px 0px' }
);

buildLanes();
wallLoader.observe(wallBox);

/**
 * Upgrade the wall to the live account, if there is anything to upgrade from.
 *
 * The endpoint must answer with the same shape as FEED — { ok, source, posts }
 * where each post has slug/lane/tag/caption and images already sized. Anything
 * else, any error, any timeout: the committed selection stays on screen and the
 * line under the note says which one the visitor is looking at. The page never
 * shows a spinner and never shows an empty wall.
 */
async function refreshFeed() {
  if (FEED.live !== true) return;

  try {
    const response = await fetch('/api/instagram', { headers: { accept: 'application/json' } });
    if (!response.ok) return;

    const body = await response.json();
    if (body?.ok !== true || !Array.isArray(body.posts) || body.posts.length === 0) return;

    FEED.posts = body.posts;
    FEED.source = body.source ?? 'live';
    wallBox.replaceChildren();
    buildLanes();
    paintProfile();
  } catch {
    // Offline, blocked, or malformed. The selection is already on screen.
  }
}

function paintProfile() {
  for (const node of $$('[data-fill-feed]')) {
    const key = node.dataset.fillFeed;
    if (key === 'handle') {
      node.href = FEED.profile.url;
      node.textContent = FEED.profile.handle;
    }
  }
}

paintProfile();
refreshFeed();

/* ------------------------------------------------------------------ contact */

$('[data-fill-contact]').append(
  ...[
    ['Email',     CHEF.email,          `mailto:${CHEF.email}`],
    ['Phone',     CHEF.phone,          `tel:${CHEF.phone.replace(/\s/g, '')}`],
    ['Instagram', CHEF.instagramLabel, CHEF.instagram],
    ['Based in',  CHEF.seeking,        null]
  ].map(([key, value, href]) =>
    el('li', {}, [
      el('span', { className: 'contact__key', textContent: key }),
      href
        ? el('a', {
            className: 'contact__val', href, textContent: value,
            rel: 'noopener noreferrer',
            target: href.startsWith('http') ? '_blank' : ''
          })
        : el('span', { className: 'contact__val', textContent: value })
    ])
  )
);

/* --------------------------------------------------------------- behaviours */

$('[data-print]').addEventListener('click', () => window.print());

const topbar = $('#topbar');
const stickWatcher = new IntersectionObserver(
  ([entry]) => topbar.toggleAttribute('data-stuck', !entry.isIntersecting),
  { rootMargin: '-80px 0px 0px 0px' }
);
stickWatcher.observe($('#cover'));

for (const node of $$('.band .head, .chef, .history li, .house, .skill, .training li')) {
  node.dataset.reveal = '';
}
observeReveals();
