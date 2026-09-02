/**
 * Every fact on the page lives here. Change a value, reload, done.
 *
 * Values tagged // MOCK are placeholders written to look plausible for a UK
 * kitchen job application. Replace all of them before sending this to anyone.
 * Dish names and descriptions are written from the photographs and are safe to
 * keep, though the chef should check the ingredient lists read the way he cooks.
 */

export const CHEF = {
  name: 'Mykhailo Savchuk',                    // MOCK
  role: 'Head Chef · Chef Patron',             // MOCK
  strapline: 'Modern European cooking, built around vegetables, fish and precision.',
  from: 'Chernivtsi, Ukraine',
  seeking: 'London, UK',                       // MOCK
  available: 'Available from October 2026',    // MOCK

  // UK employers look for this first. Get the wording exactly right.
  rightToWork: 'Full right to work in the UK — no sponsorship required.', // MOCK
  english: 'English B2 · Ukrainian and Russian native',                   // MOCK

  email: 'chef@example.com',                   // MOCK
  phone: '+44 7000 000000',                    // MOCK
  instagram: 'https://www.instagram.com/eatme_cv.ua/',
  instagramLabel: '@eatme_cv.ua',

  intro: [
    'I cook food that people eat every day and still remember. Twelve years on the line taught me the two things a kitchen is actually judged on: the same plate leaving the pass at 7pm and at 11pm, and a gross profit that survives a bad week.',
    'My own kitchen was a healthy-food brand in Chernivtsi — menu, costing, hiring, packaging, delivery. I built it from an empty room to three hundred meals a day. I am now looking for a section or a head chef role in London where that appetite has somewhere to go.'
  ]
};

/** The numbers a head chef is hired on. All MOCK — replace with real figures. */
export const NUMBERS = [
  { value: '12',   label: 'years in professional kitchens' },  // MOCK
  { value: '320',  label: 'meals a day at peak service' },     // MOCK
  { value: '60+',  label: 'dishes developed and costed' },     // MOCK
  { value: '9',    label: 'chefs in the brigade I ran' }       // MOCK
];

/**
 * Career, most recent first. Rendered as courses because the order carries the
 * story: each role is what the one before it made possible.
 */
export const HISTORY = [                        // MOCK — every entry below
  {
    course: 'I',
    role: 'Chef Patron',
    venue: 'EatMe',
    place: 'Chernivtsi, UA',
    years: '2019 — 2024',
    kind: 'Own kitchen · healthy food and delivery',
    notes: [
      'Founded the brand and ran the kitchen: menu, recipes, costing, purchasing, rota, hiring.',
      'Grew from 40 to 320 meals a day across delivery, collection and a retail counter.',
      'Held food cost at 31% while sourcing from local growers.',
      'Developed a cold-pressed juice and smoothie range sold under our own label.'
    ]
  },
  {
    course: 'II',
    role: 'Head Chef',
    venue: 'Restaurant name',
    place: 'Chernivtsi, UA',
    years: '2016 — 2019',
    kind: '120 covers · à la carte and banqueting',
    notes: [
      'Ran a brigade of seven across larder, grill and pastry.',
      'Rewrote the menu twice a year; introduced a seasonal fish list.',
      'Took the kitchen through its first full HACCP documentation.'
    ]
  },
  {
    course: 'III',
    role: 'Sous Chef',
    venue: 'Hotel name',
    place: 'Chernivtsi, UA',
    years: '2014 — 2016',
    kind: 'Hotel restaurant · breakfast, à la carte, events',
    notes: [
      'Breakfast service to 200 guests and banqueting to 300.',
      'Second in charge of ordering, stock and section training.'
    ]
  },
  {
    course: 'IV',
    role: 'Chef de Partie',
    venue: 'Restaurant name',
    place: 'Lviv, UA',
    years: '2012 — 2014',
    kind: 'Larder and grill sections',
    notes: [
      'Learned the sections properly: mise en place, prep lists, and speed.'
    ]
  }
];

/**
 * Signature dishes. Photographed by the chef; two angles each where available.
 * `section` is the kitchen section the dish belongs to — it says something true
 * about where the work happened, which a decorative tag would not.
 * `focus` sets the crop centre inside the round plate.
 */
export const DISHES = [
  // ---- Starters ------------------------------------------------------------
  { slug: 'greek-salad', course: 'starters', section: 'Larder',
    name: 'Greek Salad',
    desc: 'Feta, vine tomato, cucumber, kalamata olive, red onion, oregano, lemon' },
  { slug: 'mozzarella-salad', course: 'starters', section: 'Larder',
    name: 'Mozzarella & Frisée',
    desc: 'Bocconcini, cherry tomato, radicchio, cucumber, basil oil' },
  { slug: 'asparagus-salad', course: 'starters', section: 'Larder',
    name: 'Asparagus & Green Olive',
    desc: 'Green asparagus, cucumber, radicchio, olive, herb pesto' },
  { slug: 'chicken-parmesan-salad', course: 'starters', section: 'Larder',
    name: 'Chicken & Parmesan',
    desc: 'Roast chicken, aged parmesan, radicchio, tarragon, soft dressing' },
  { slug: 'prawn-quail-salad', course: 'starters', section: 'Larder',
    name: 'King Prawn & Quail Egg',
    desc: 'Prawn, avocado, quail egg, leaves, toasted sesame, green herb dressing',
    focus: '46% 46%' },
  { slug: 'salmon-mussel-salad', course: 'starters', section: 'Larder',
    name: 'Salmon, Mussel & Sourdough',
    desc: 'Cured salmon, mussels, quail egg, tomato, croutons, dill vinaigrette' },
  { slug: 'grilled-vegetables', course: 'starters', section: 'Grill',
    name: 'Grilled Vegetables, Salsa Verde',
    desc: 'Courgette, aubergine, red pepper, tomato, caper, salsa verde' },
  { slug: 'green-veloute', course: 'starters', section: 'Hot line',
    name: 'Green Vegetable Velouté',
    desc: 'Broccoli, spinach, leek, olive oil, micro herbs' },

  // ---- Brunch --------------------------------------------------------------
  { slug: 'omelette-rolls', course: 'brunch', section: 'Hot line',
    name: 'Omelette Rolls',
    desc: 'Rolled herb omelette, ricotta, avocado, spring onion, alfalfa' },
  { slug: 'green-fritters', course: 'brunch', section: 'Hot line',
    name: 'Broccoli & Courgette Fritters',
    desc: 'Green vegetable fritters, cashew cream, pea shoots, radish' },
  { slug: 'chickpea-flatbread', course: 'brunch', section: 'Hot line',
    name: 'Chickpea Flatbread',
    desc: 'Folded chickpea pancake, leaves, avocado, radicchio, soft cheese' },
  { slug: 'rye-club', course: 'brunch', section: 'Larder',
    name: 'Rye Club Sandwich',
    desc: 'Toasted rye, avocado, prawn, radicchio, alfalfa, lemon mayonnaise' },
  { slug: 'veg-muffins', course: 'brunch', section: 'Hot line',
    name: 'Vegetable & Cheese Muffins',
    desc: 'Baked root vegetable muffins, garlic aioli, rocket' },

  // ---- Mains ---------------------------------------------------------------
  { slug: 'chicken-roulade', course: 'mains', section: 'Hot line',
    name: 'Chicken Roulade, Spinach Pesto',
    desc: 'Rolled chicken breast, spinach and pine nut pesto, basil',
    focus: '46% 50%' },
  { slug: 'chicken-cutlets', course: 'mains', section: 'Hot line',
    name: 'Chicken Cutlets, Smoked Tomato',
    desc: 'Chicken cutlets, smoked tomato sauce, radish, micro herbs' },
  { slug: 'chicken-skewers', course: 'mains', section: 'Grill',
    name: 'Paprika Chicken Skewers',
    desc: 'Marinated chicken, grilled pepper and aubergine, herb oil' },
  { slug: 'crumbed-chicken', course: 'mains', section: 'Hot line',
    name: 'Crumbed Chicken, Beetroot',
    desc: 'Panko chicken, roast beetroot purée, garlic aioli, cress',
    focus: '44% 50%' },
  { slug: 'bulgur', course: 'mains', section: 'Hot line',
    name: 'Bulgur, Green Bean & Carrot',
    desc: 'Bulgur pilaf, green beans, carrot, olive oil, parsley',
    focus: '46% 50%' },

  // ---- Fish ----------------------------------------------------------------
  { slug: 'hake-sweet-potato', course: 'fish', section: 'Fish',
    name: 'Hake, Sweet Potato Purée',
    desc: 'Pan-seared hake, sweet potato purée, toasted spice, micro cress',
    focus: '50% 52%' },
  { slug: 'fish-roulade', course: 'fish', section: 'Fish',
    name: 'Fish Roulade, Saffron Velouté',
    desc: 'Stuffed white fish roulade, saffron velouté, potato, broccoli' },
  { slug: 'mackerel', course: 'fish', section: 'Grill',
    name: 'Grilled Mackerel',
    desc: 'Mackerel fillet, tenderstem broccoli, tomato, rocket',
    focus: '46% 55%' },

  // ---- Pastry --------------------------------------------------------------
  { slug: 'syrniki', course: 'pastry', section: 'Pastry',
    name: 'Curd Cheese Pancakes',
    desc: 'Syrniki, dark chocolate, toasted almond, mint' },
  { slug: 'banana-crepes', course: 'pastry', section: 'Pastry',
    name: 'Banana Crêpes',
    desc: 'Thin crêpes, banana, almond, dark chocolate, mint' },
  { slug: 'poppy-crepe-rolls', course: 'pastry', section: 'Pastry',
    name: 'Poppy Seed Crêpe Rolls',
    desc: 'Crêpe rolls, poppy seed and chocolate, mandarin, almond' }
];

export const COURSES = [
  { id: 'all',      label: 'Full menu' },
  { id: 'starters', label: 'Starters' },
  { id: 'brunch',   label: 'Brunch' },
  { id: 'mains',    label: 'Mains' },
  { id: 'fish',     label: 'Fish' },
  { id: 'pastry',   label: 'Pastry' }
];

/** The own-brand case study. */
export const HOUSE = {
  name: 'EatMe',
  place: 'Chernivtsi, Ukraine',
  years: '2019 — 2024',                        // MOCK
  role: 'Founder and Chef Patron',
  instagram: 'https://www.instagram.com/eatme_cv.ua/',
  instagramLabel: '@eatme_cv.ua',
  shopLabel: '@eatme_shop1',
  body: [
    'EatMe was a healthy-food kitchen: balanced meals cooked daily, packed, and delivered across the city, with a retail counter and our own cold-pressed juice line.',
    'I was the chef and the owner, which means I wrote the menu and also signed the invoices. Every dish had to plate beautifully, travel forty minutes in a box, and still make its margin. That constraint made me a better cook than any tasting menu would have.'
  ],
  facts: [
    ['Daily output',   '320 meals'],            // MOCK
    ['Menu',           '60 dishes on rotation'],// MOCK
    ['Team',           '9 chefs and packers'],  // MOCK
    ['Own label',      'Cold-pressed juices']
  ],
  bottles: [
    { file: 'juice-green.jpg',  name: 'Green' },
    { file: 'juice-verde.jpg',  name: 'Deep green' },
    { file: 'juice-citrus.jpg', name: 'Mango & orange' },
    { file: 'juice-cacao.jpg',  name: 'Cacao & nut' }
  ]
};

export const SKILLS = [
  { title: 'Sections',
    items: ['Larder', 'Hot line', 'Grill', 'Fish', 'Pastry', 'Pass'] },
  { title: 'Running a kitchen',
    items: ['Menu development', 'Recipe and dish costing', 'GP control', 'Ordering and stock',
            'Supplier sourcing', 'Rota and labour cost', 'Training and section handover'] },
  { title: 'Compliance',
    items: ['HACCP documentation', 'Allergen control (Natasha’s Law)', 'Temperature and cleaning records',
            'Due diligence for EHO visits'] },
  { title: 'Kitchens I cook in',
    items: ['Modern European', 'Mediterranean', 'Ukrainian', 'Healthy and meal-prep', 'High-volume delivery'] }
];

export const TRAINING = [                       // MOCK — every entry below
  { name: 'Level 2 Food Safety & Hygiene for Catering', body: 'Awarding body', year: '2025' },
  { name: 'Level 2 HACCP for Catering',                 body: 'Awarding body', year: '2025' },
  { name: 'Level 2 Allergen Awareness',                 body: 'Awarding body', year: '2025' },
  { name: 'Diploma in Culinary Arts',                   body: 'Culinary college, Ukraine', year: '2012' }
];
