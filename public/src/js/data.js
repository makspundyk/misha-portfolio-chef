/**
 * Every fact on the page lives here. Change a value, reload, done.
 *
 * Values tagged // MOCK are placeholders. Replace all of them before sending
 * this to anyone.
 */

export const CHEF = {
  name: 'Mykhailo Sanduliak',
  role: 'Cook · healthy-food menu creator',
  strapline: 'Healthy food that looks after your health and your weight.',
  from: 'Chernivtsi, Ukraine',
  seeking: 'London, UK',                       // MOCK
  available: 'Available from October 2026',    // MOCK

  // UK employers look for this first. Get the wording exactly right.
  rightToWork: 'Right to work in the UK — no sponsorship required.',
  english: 'English B1 · Ukrainian and Russian (native)',

  email: 'mykhailos22@gmail.com',
  phone: '+380 95 698 7519',
  instagram: 'https://www.instagram.com/eatme_cv.ua/',
  instagramLabel: '@eatme_cv.ua',

  intro: [
    'You are what you eat. To me that is not just a nice phrase but a way of working: if a dish becomes part of someone’s day, it should build that person up, not simply stop them being hungry.',
    'Cooking is like meditation for me. At the stove there are only my hands, the ingredients and time, and everything else goes quiet. That is where my menu grew from: every dish was counted down to the last calorie, yet it was never made for the numbers. It was made so that whoever ate it felt better afterwards.'
  ]
};

/** Skills, shown in the Experience section. Kept in step with the CV's Key Skills. */
export const SKILLS = [
  'Menu development and dish costing',
  'Calorie and macronutrient calculation',
  'Healthy, balanced meal preparation',
  'Set menus for weight loss, fitness and everyday eating',
  'High-volume daily production',
  'Purchasing and stock management',
  'Packing and presentation for delivery',
  'Teamwork and working under pressure',
  'Discipline and reliability'
];

/**
 * Signature dishes, photographed by the chef; two angles each where available.
 * `section` is the kitchen section the dish belongs to — it says something true
 * about where the work happened, which a decorative tag would not.
 * `focus` sets the crop centre inside the round plate.
 */
export const DISHES = [
  // ---- Starters ------------------------------------------------------------
  { slug: 'greek-salad', course: 'starters', section: 'Larder',
    name: 'Greek Salad',
    desc: 'Feta, tomato, cucumber, bell pepper, red onion, olives, microgreens' },
  { slug: 'mozzarella-salad', course: 'starters', section: 'Larder',
    name: 'Mozzarella Salad',
    desc: 'Mozzarella, cherry tomatoes, red pepper, olives, salad leaves, pesto' },
  { slug: 'asparagus-salad', course: 'starters', section: 'Larder',
    name: 'Green Salad with Pesto',
    desc: 'Cucumber, avocado, celery, green olives, pesto, microgreens' },
  { slug: 'chicken-parmesan-salad', course: 'starters', section: 'Larder',
    name: 'Caesar Salad',
    desc: 'Chicken breast, parmesan, quail egg, cherry tomatoes, salad leaves, homemade mayonnaise' },
  { slug: 'prawn-quail-salad', course: 'starters', section: 'Larder',
    name: 'Prawn and Quail Egg Salad',
    desc: 'Prawns, avocado, quail egg, cherry tomatoes, mixed leaves, sesame, pesto dressing',
    focus: '46% 46%' },
  { slug: 'salmon-mussel-salad', course: 'starters', section: 'Larder',
    name: 'Salmon Salad',
    desc: 'Salmon, mussels, quail egg, tomato, mixed leaves' },
  { slug: 'grilled-vegetables', course: 'starters', section: 'Grill',
    name: 'Roasted Vegetables',
    desc: 'Aubergine, courgette, red pepper, mushrooms, olive oil, spices' },
  { slug: 'green-veloute', course: 'starters', section: 'Hot section',
    name: 'Broccoli Soup',
    desc: 'Broccoli, garlic, olive oil, microgreens' },

  // ---- Brunch --------------------------------------------------------------
  { slug: 'omelette-rolls', course: 'brunch', section: 'Hot section',
    name: 'Prawn Pancakes',
    desc: 'Oat-flour pancakes, prawns, feta, avocado' },
  { slug: 'green-fritters', course: 'brunch', section: 'Hot section',
    name: 'Spinach Syrniki',
    desc: 'Curd cheese, spinach, egg' },
  { slug: 'rye-club', course: 'brunch', section: 'Larder',
    name: 'Prawn Sandwich',
    desc: 'Bread, salad leaves, prawns, avocado, feta' },

  // ---- Mains ---------------------------------------------------------------
  { slug: 'chicken-roulade', course: 'mains', section: 'Hot section',
    name: 'Chicken Roulade',
    desc: 'Chicken fillet, parmesan, almonds, mint, onion, olive oil',
    focus: '46% 50%' },
  { slug: 'chicken-cutlets', course: 'mains', section: 'Hot section',
    name: 'Chicken Patties with Tomato Sauce',
    desc: '' },
  { slug: 'chicken-skewers', course: 'mains', section: 'Grill',
    name: 'Chicken Skewers',
    desc: 'Marinated chicken breast, roasted aubergine, courgette, pepper' },
  { slug: 'crumbed-chicken', course: 'mains', section: 'Hot section',
    name: 'Chicken Nuggets',
    desc: 'Chicken fillet in a coconut crumb, red wine and berry sauce',
    focus: '44% 50%' },
  { slug: 'bulgur', course: 'mains', section: 'Hot section',
    name: 'Bulgur with Vegetables',
    desc: 'Bulgur, green beans, peas, carrot, sweetcorn',
    focus: '46% 50%' },

  // ---- Fish ----------------------------------------------------------------
  { slug: 'fish-roulade', course: 'fish', section: 'Fish',
    name: 'Fish Roulade',
    desc: '' },
  { slug: 'mackerel', course: 'fish', section: 'Grill',
    name: 'Grilled Mackerel',
    desc: 'Mackerel fillet, broccoli, tomato, rocket',
    focus: '46% 55%' },

  // ---- Pastry --------------------------------------------------------------
  { slug: 'syrniki', course: 'pastry', section: 'Pastry',
    name: 'Syrniki',
    desc: 'Curd cheese pancakes, honey, toasted almonds, mint' },
  { slug: 'banana-crepes', course: 'pastry', section: 'Pastry',
    name: 'Banana Pancakes',
    desc: 'Thin pancakes, banana, almonds, dark chocolate, mint' },
  { slug: 'poppy-crepe-rolls', course: 'pastry', section: 'Pastry',
    name: 'Poppy Seed Pancake Rolls',
    desc: 'Pancake rolls, poppy seeds with chocolate, mandarin, almonds' }
];

/**
 * The weekly sets, the way they ran in the EatMe stories: one card a day,
 * five meals in it, transcribed from the "Нове меню" story cards. `photo` is
 * the plate from that day's card; `focus` is its crop centre.
 */
export const SETS = [
  {
    day: 'Monday',
    photo: '/assets/img/feed/beetroot-goat-cheese-full.jpg',
    thumb: '/assets/img/feed/beetroot-goat-cheese.jpg',
    focus: '62% 55%',
    macros: 'Protein 120 g · Fat 75 g · Carbs 100 g · 1,500 kcal',
    meals: [
      ['Meal 1', ['Chia pudding']],
      ['Meal 2', ['Beetroot, feta and walnut salad']],
      ['Meal 3', ['Hake', 'Seafood soup']],
      ['Meal 4', ['Mozzarella salad', 'Coconut chicken nuggets']],
      ['Meal 5', ['Roasted vegetables']]
    ]
  },
  {
    day: 'Tuesday',
    photo: '/assets/img/menu/prawn-quail-salad-full.jpg',
    thumb: '/assets/img/menu/prawn-quail-salad.jpg',
    focus: '55% 50%',
    macros: 'Protein 150 g · Fat 90 g · Carbs 140 g · 1,800 kcal',
    meals: [
      ['Meal 1', ['Mango fruit bowl']],
      ['Meal 2', ['Chicken salad']],
      ['Meal 3', ['Blended vegetable soup', 'Pollock']],
      ['Meal 4', ['Prawn salad', 'Chicken roulade']],
      ['Meal 5', ['Spinach syrniki']]
    ]
  },
  {
    day: 'Wednesday',
    photo: '/assets/img/feed/porridge-berries-full.jpg',
    thumb: '/assets/img/feed/porridge-berries.jpg',
    focus: '50% 52%',
    macros: 'Protein 110 g · Fat 85 g · Carbs 150 g · 1,900 kcal',
    meals: [
      ['Meal 1', ['Kiwi fruit bowl']],
      ['Meal 2', ['Apple salad']],
      ['Meal 3', ['Salmon', 'Couscous']],
      ['Meal 4', ['Green salad']],
      ['Meal 5', ['Waffles with honey']]
    ]
  },
  {
    day: 'Thursday',
    photo: '/assets/img/menu/mackerel-full.jpg',
    thumb: '/assets/img/menu/mackerel.jpg',
    focus: '45% 50%',
    macros: 'Protein 90 g · Fat 80 g · Carbs 160 g · 1,800 kcal',
    meals: [
      ['Meal 1', ['Pancakes with maple syrup']],
      ['Meal 2', ['Greek salad']],
      ['Meal 3', ['Carrot soup', 'Beetroot, feta and walnut salad']],
      ['Meal 4', ['Hake']],
      ['Meal 5', ['Poppy seed pancakes']]
    ]
  },
  {
    day: 'Friday',
    photo: '/assets/img/menu/chicken-parmesan-salad-full.jpg',
    thumb: '/assets/img/menu/chicken-parmesan-salad.jpg',
    focus: '50% 52%',
    macros: 'Protein 110 g · Fat 80 g · Carbs 120 g · 1,900 kcal',
    meals: [
      ['Meal 1', ['Syrniki']],
      ['Meal 2', ['Chicken salad']],
      ['Meal 3', ['Chicken meatballs']],
      ['Meal 4', ['Mozzarella salad']],
      ['Meal 5', ['Pancakes with avocado and prawns']]
    ]
  },
  {
    day: 'Saturday',
    photo: '/assets/img/menu/salmon-mussel-salad-full.jpg',
    thumb: '/assets/img/menu/salmon-mussel-salad.jpg',
    focus: '50% 52%',
    macros: 'Protein 120 g · Fat 75 g · Carbs 140 g · 1,800 kcal',
    meals: [
      ['Meal 1', ['Sandwich']],
      ['Meal 2', ['Salmon salad']],
      ['Meal 3', ['Blended vegetable soup', 'Sesame-crusted pork']],
      ['Meal 4', ['Prawn salad']],
      ['Meal 5', ['Waffles with berries']]
    ]
  }
];

/** The own-brand case study. */
export const HOUSE = {
  name: 'EatMe',
  place: 'Chernivtsi, Ukraine',
  years: '',
  role: 'Founder · menu and kitchen',
  instagram: 'https://www.instagram.com/eatme_cv.ua/',
  instagramLabel: '@eatme_cv.ua',
  shopLabel: '@eatme_shop1',
  body: [
    'EatMe was a healthy-food kitchen: balanced meals cooked every day, packed and delivered across the city, plus a retail counter and our own line of cold-pressed juices.',
    'I was both the cook and the owner, which meant I wrote the menu and signed the invoices too. Every dish had to look good on the plate, survive forty minutes in a box and still make a profit.'
  ],
  facts: [
    ['Daily output', '350 portions'],
    ['Customers',    '150 people a day'],
    ['Team',         '4 people'],
    ['Own brand',    'EatMe']
  ],
  bottles: [
    { file: 'juice-green.jpg',  name: 'Green' },
    { file: 'juice-verde.jpg',  name: 'Deep green' },
    { file: 'juice-citrus.jpg', name: 'Mango and orange' },
    { file: 'juice-cacao.jpg',  name: 'Cacao and nut' }
  ]
};

/**
 * The EatMe feed.
 *
 * Shaped like the response a live endpoint would return, so `/api/instagram`
 * can replace it later without the front end changing. `lane` decides which of
 * the two rows a frame runs in: the kitchen made it, the counter sold it.
 * Captions are no longer shown on the page; they remain as image alt text.
 *
 * These are the brand's own photographs. Some show customers — if any face is
 * not cleared for use, drop that entry.
 */
export const FEED = {
  ok: true,
  source: 'selection',

  // Flip to true once /api/instagram exists. Until then the page makes no
  // request at all: a fetch that is always going to 404 is not a fallback,
  // it is a wasted round trip and a red line in the console.
  live: false,
  profile: {
    handle: '@eatme_cv.ua',
    url: 'https://www.instagram.com/eatme_cv.ua/',
    bio: 'Healthy food, fresh every day · Chernivtsi'
  },
  lanes: [
    { id: 'kitchen', label: 'From the kitchen' },
    { id: 'counter', label: 'From the counter' }
  ],
  posts: [
    // --- kitchen ------------------------------------------------------------
    { slug: 'salmon-sourdough',    lane: 'kitchen', tag: 'salads',   caption: 'Salmon, wheat croutons and quail egg' },
    { slug: 'salmon-top',          lane: 'kitchen', tag: 'salads',   caption: 'The same bowl from above' },
    { slug: 'salmon-leaves',       lane: 'kitchen', tag: 'salads',   caption: 'Salmon on dressed leaves' },
    { slug: 'mozzarella-apple',    lane: 'kitchen', tag: 'salads',   caption: 'Mozzarella, apple, rocket and walnuts' },
    { slug: 'beetroot-goat-cheese',lane: 'kitchen', tag: 'salads',   caption: 'Roasted beetroot, goat cheese, walnuts and pomegranate' },
    { slug: 'prawn-quail',         lane: 'kitchen', tag: 'salads',   caption: 'Prawns, avocado, quail egg and sesame' },
    { slug: 'salmon-citrus',       lane: 'kitchen', tag: 'fish',     caption: 'Salmon with citrus butter and herbs' },
    { slug: 'mackerel-broccoli',   lane: 'kitchen', tag: 'fish',     caption: 'Grilled mackerel with broccoli' },
    { slug: 'grilled-veg-closeup', lane: 'kitchen', tag: 'grill',    caption: 'Roasted vegetables on a green sauce' },
    { slug: 'skewers-peppers',     lane: 'kitchen', tag: 'grill',    caption: 'Chicken skewers with roasted peppers' },
    { slug: 'sesame-beef',         lane: 'kitchen', tag: 'mains',    caption: 'Sesame beef with teriyaki' },
    { slug: 'pumpkin-veloute',     lane: 'kitchen', tag: 'soups',    caption: 'Pumpkin soup with sesame' },
    { slug: 'pumpkin-soup',        lane: 'kitchen', tag: 'soups',    caption: 'Pumpkin soup with chilli oil and cress' },
    { slug: 'herb-rice',           lane: 'kitchen', tag: 'sides',    caption: 'Rice with herbs and spring onion' },
    { slug: 'bulgur-peas',         lane: 'kitchen', tag: 'sides',    caption: 'Bulgur with peas, sweetcorn and carrot' },
    { slug: 'rice-corn',           lane: 'kitchen', tag: 'sides',    caption: 'Rice with sweetcorn and herbs' },
    { slug: 'syrniki-mango',       lane: 'kitchen', tag: 'desserts', caption: 'Syrniki with mango and almonds' },
    { slug: 'chia-mango',          lane: 'kitchen', tag: 'desserts', caption: 'Chia pudding with mango purée and almonds' },
    { slug: 'banana-kiwi',         lane: 'kitchen', tag: 'desserts', caption: 'Banana and kiwi in vanilla cream' },
    { slug: 'porridge-berries',    lane: 'kitchen', tag: 'desserts', caption: 'Porridge with kiwi, blackberries and raspberries' },

    // --- counter ------------------------------------------------------------
    { slug: 'three-juices',        lane: 'counter', tag: 'own brand', caption: 'Cold-pressed juices: cacao, green and mango' },
    { slug: 'apple-juice',         lane: 'counter', tag: 'own brand', caption: 'Apple and ginger, pressed this morning' },
    { slug: 'packed-flatlay',      lane: 'counter', tag: 'packing',   caption: 'Three meals and a juice, packed for the day' },
    { slug: 'delivery-bag',        lane: 'counter', tag: 'delivery',  caption: 'One order, ready to go' },
    { slug: 'syrniki-box',         lane: 'counter', tag: 'packing',   caption: 'Syrniki travel better than you would think' },
    { slug: 'customer-bowl',       lane: 'counter', tag: 'customers', caption: 'Lunch straight out of the box' },
    { slug: 'desk-lunch',          lane: 'counter', tag: 'customers', caption: 'Lunch at the desk, no washing-up' },
    { slug: 'bowl-book',           lane: 'counter', tag: 'customers', caption: 'A Greek salad and a long read' },
    { slug: 'bed-flatlay',         lane: 'counter', tag: 'delivery',  caption: 'Breakfast that comes to you' },
    { slug: 'bed-bag',             lane: 'counter', tag: 'delivery',  caption: 'Saturday, delivered' },
    { slug: 'porridge-hands',      lane: 'counter', tag: 'customers', caption: 'Porridge, still warm' },
    { slug: 'eating-cup',          lane: 'counter', tag: 'customers', caption: 'The cup is the plate' },
    { slug: 'street-customer',     lane: 'counter', tag: 'customers', caption: 'Collected at the counter' }
  ]
};
