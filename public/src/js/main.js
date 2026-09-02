/**
 * Renders the page from data.js and wires the three interactions that matter:
 * filtering the menu, opening a plate, and printing a plain CV.
 *
 * There is no inline script anywhere on purpose — the deployed CSP sets
 * script-src 'self', which is what stops an injected <script> from running.
 */

import { CHEF, NUMBERS, HISTORY, DISHES, COURSES, HOUSE, SKILLS, TRAINING } from './data.js';

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

$('[data-fill-numbers]').append(
  ...NUMBERS.map(({ value, label }) =>
    el('li', {}, [el('b', { textContent: value }), el('span', { textContent: label })])
  )
);

/* ------------------------------------------------------------------ history */

$('[data-fill-history]').append(
  ...HISTORY.map((job) =>
    el('li', { }, [
      el('span', { className: 'history__course', textContent: job.course }),
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

/* --------------------------------------------------------------------- menu */

const menuList   = $('[data-fill-menu]');
const courseBar  = $('[data-fill-courses]');
let   visible    = DISHES;

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
  button.addEventListener('click', () => openPlate(dish));

  const item = el('li', { className: 'dish' }, button);
  item.dataset.reveal = '';
  return item;
};

const renderMenu = (course) => {
  visible = course === 'all' ? DISHES : DISHES.filter((d) => d.course === course);
  menuList.replaceChildren(
    ...(visible.length
      ? visible.map(dishCard)
      : [el('p', { className: 'menu__empty', textContent: 'Nothing on this course yet.' })])
  );
  observeReveals(menuList);
};

courseBar.append(
  ...COURSES.map(({ id, label }) => {
    const btn = el('button', {
      type: 'button',
      className: 'course-btn',
      textContent: label,
      role: 'tab'
    });
    btn.setAttribute('aria-selected', String(id === 'all'));
    btn.addEventListener('click', () => {
      $$('.course-btn', courseBar).forEach((b) => b.setAttribute('aria-selected', 'false'));
      btn.setAttribute('aria-selected', 'true');
      renderMenu(id);
    });
    return btn;
  })
);

renderMenu('all');

/* ----------------------------------------------------------------- lightbox */

const lb      = $('#lightbox');
const lbImgA  = $('#lbImgA');
const lbImgB  = $('#lbImgB');
const lbName  = $('#lbName');
const lbDesc  = $('#lbDesc');
const lbSect  = $('#lbSection');

// Which dishes have a second photograph. Written once here rather than probed
// at runtime, so a missing file is a data bug and not a broken image.
const TWO_SHOTS = new Set([
  'omelette-rolls','green-fritters','rye-club','chicken-roulade','greek-salad',
  'veg-muffins','mozzarella-salad','chicken-cutlets','hake-sweet-potato',
  'banana-crepes','poppy-crepe-rolls','asparagus-salad','chicken-parmesan-salad',
  'prawn-quail-salad','salmon-mussel-salad','crumbed-chicken','fish-roulade'
]);

let current = 0;

function openPlate(dish) {
  current = visible.indexOf(dish);
  paintPlate();
  if (!lb.open) lb.showModal();
}

function paintPlate() {
  const dish = visible[current];
  if (!dish) return;
  lbImgA.src = `/assets/img/menu/${dish.slug}-full.jpg`;
  lbImgA.alt = dish.name;
  if (TWO_SHOTS.has(dish.slug)) {
    lbImgB.src = `/assets/img/menu/${dish.slug}-alt.jpg`;
    lbImgB.alt = `${dish.name}, second angle`;
    lbImgB.hidden = false;
  } else {
    lbImgB.hidden = true;
    lbImgB.removeAttribute('src');
  }
  lbName.textContent = dish.name;
  lbDesc.textContent = dish.desc;
  lbSect.textContent = `${dish.section} section`;
}

const step = (delta) => {
  current = (current + delta + visible.length) % visible.length;
  paintPlate();
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
    el('figure', { className: 'bottle' }, [
      el('img', {
        src: `/assets/img/brand/${file}`,
        alt: `EatMe cold-pressed ${name.toLowerCase()}`,
        loading: 'lazy', decoding: 'async', width: 344, height: 900
      }),
      el('figcaption', { textContent: name })
    ])
  )
);

/* ------------------------------------------------------------ skills, certs */

$('[data-fill-skills]').append(
  ...SKILLS.map(({ title, items }) =>
    el('div', { className: 'skill' }, [
      el('h3', { className: 'skill__title', textContent: title }),
      el('ul', {}, items.map((item) => el('li', { textContent: item })))
    ])
  )
);

$('[data-fill-training]').append(
  ...TRAINING.map(({ name, body, year }) =>
    el('li', {}, [
      el('span', { className: 'training__name', textContent: name }),
      el('span', { className: 'training__leader', ariaHidden: 'true' }),
      el('span', { className: 'training__body', textContent: body }),
      el('span', { className: 'training__year', textContent: year })
    ])
  )
);

/* ------------------------------------------------------------------ contact */

$('[data-fill-contact]').append(
  ...[
    ['Email',     CHEF.email,          `mailto:${CHEF.email}`],
    ['Telephone', CHEF.phone,          `tel:${CHEF.phone.replace(/\s/g, '')}`],
    ['Instagram', CHEF.instagramLabel, CHEF.instagram],
    ['Based',     CHEF.seeking,        null]
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
