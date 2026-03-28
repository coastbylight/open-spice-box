import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const recipe = {
  title: 'Black Pepper Beef (黑椒牛柳)',
  slug: 'black-pepper-beef',
  subtitle: 'Tender beef strips stir-fried with bell pepper and red onion in a peppery sauce of soy, oyster sauce, and a splash of red wine',
  cultural_origin: 'China',
  tradition: 'Cross-Cultural',
  headnote:
    'The Cantonese name for this dish is haak jiu ngauh lauh, and the word lauh is worth knowing. It refers to the willow-style cut, long thin strips of meat that cook fast in a hot wok and pick up sauce on every surface. This is the Chinese approach to steak: rather than serving a whole slab of meat and letting the diner cut it, the cook does the knife work first and the wok work second. The result is beef that is tender, thoroughly seasoned, and ready to eat with chopsticks.\n\nBlack pepper is the star, which is unusual in Chinese cooking where white pepper is more common. Here the coarser, more aromatic black pepper goes into the marinade and drives the flavor of the entire dish. It is not a background note. You should taste it in every bite, warm and sharp and slightly floral, backed by the savory depth of oyster sauce and soy.\n\nThe technique has a step that surprises most Western cooks: rinsing the raw beef in cold water before marinating. This is common in Cantonese cooking and removes the myoglobin, the protein that gives raw beef its bloody color and raw-meat smell. The result is cleaner-tasting beef that takes on the marinade more readily. A splash of red wine goes into both the marinade and the sauce, a Hong Kong restaurant touch that adds a fruity acidity you cannot get from Shaoxing wine alone. The bell pepper and red onion cook for just long enough to soften without losing their crunch, and the sauce thickens into a glossy coating that pulls everything together.',
  yield: '2 to 4 servings',
  prep_time: '20 minutes',
  cook_time: '10 minutes',
  total_time: '30 minutes',
  difficulty: 'Medium',
  ingredients: [
    { amount: '12', unit: 'oz', ingredient: 'New York strip or beef tenderloin', prep_note: 'cut into thin strips against the grain (340g)', optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'coarsely ground black pepper', prep_note: null, optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'cornstarch', prep_note: 'for marinade', optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'oyster sauce', prep_note: 'for marinade', optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'light soy sauce', prep_note: 'for marinade', optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'Shaoxing wine', prep_note: 'for marinade', optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'water', prep_note: 'for marinade', optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'red wine', prep_note: 'for marinade', optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'sesame oil', prep_note: null, optional: false },
    { amount: '2', unit: 'tbsp', ingredient: 'corn or vegetable oil', prep_note: 'added to beef last, to seal', optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'cornstarch', prep_note: 'for sauce', optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'water', prep_note: 'for sauce', optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'sugar', prep_note: null, optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'light soy sauce', prep_note: 'for sauce', optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'dark soy sauce', prep_note: null, optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'Shaoxing wine', prep_note: 'for sauce', optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'red wine', prep_note: 'for sauce', optional: false },
    { amount: '1/2', unit: 'tsp', ingredient: 'salt', prep_note: null, optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'oyster sauce', prep_note: 'for sauce', optional: false },
    { amount: '1', unit: null, ingredient: 'bell pepper', prep_note: 'cut into strips', optional: false },
    { amount: '1/2', unit: null, ingredient: 'red onion', prep_note: 'sliced into thin strips', optional: false },
    { amount: '2', unit: null, ingredient: 'garlic cloves', prep_note: 'minced', optional: false },
    { amount: '2', unit: 'tbsp', ingredient: 'corn or vegetable oil', prep_note: 'for wok', optional: false },
  ],
  instructions: [
    { step: 1, text: 'Rinse the beef in cold water, massaging for 1-2 minutes. Drain in a colander and press dry.' },
    { step: 2, text: 'Marinate. Combine black pepper, cornstarch, oyster sauce, soy sauce, Shaoxing wine, water, red wine, and sesame oil. Add beef, massage 30-60 seconds. Just before cooking, add 2 tbsp oil to the beef and mix to coat.' },
    { step: 3, text: 'Mix the sauce: cornstarch, water, sugar, soy sauces, Shaoxing wine, red wine, salt, oyster sauce.' },
    { step: 4, text: 'Heat wok over high heat for 2-3 minutes. Add oil. Cook the beef, searing 30 seconds undisturbed, then stir-frying about 2 minutes. Remove.' },
    { step: 5, text: 'Add garlic (10 seconds), then bell pepper and onion (1-2 minutes until slightly softened).' },
    { step: 6, text: 'Return beef, pour in sauce, stir until it thickens into a glossy glaze (30-45 seconds). Serve with rice.' },
  ],
  key_ingredient_benefits:
    '**Black Pepper:** The outer husk contains aromatic terpenes that white pepper lacks. Piperine enhances nutrient absorption, particularly of curcumin. In TCM, black pepper is classified as warming, used to stimulate digestion.\n\n**Beef (New York Strip):** Moderately lean with good marbling. High in protein, iron, zinc, and B12.',
  why_this_works:
    'Rinsing beef removes surface myoglobin for cleaner flavor. Adding oil to marinated beef before cooking seals moisture during high-heat searing. Red wine in both marinade and sauce adds fruity acidity that Shaoxing wine alone cannot. Black pepper rather than white gives more robust, complex heat.',
  substitutions: 'Flank steak sliced thin with 1/4 tsp baking soda for tenderness. Extra Shaoxing wine replaces red wine. Add asparagus, snap peas, or mushrooms. Chicken or shrimp work with same sauce.',
  serving_suggestions: 'Serve over steamed rice with egg drop soup and sauteed broccoli or lo mein.',
  storage_reheating: 'Store 2 days. Pepper flavor intensifies overnight. Reheat in a hot wok. Do not freeze.',
  cultural_notes: 'The Cantonese word lauh (willow) refers to the thin strip cut. Rinsing beef in cold water before marinating is standard Cantonese technique. The red wine is a Hong Kong restaurant touch that has been standard in black pepper beef for decades.',
  tags: ['chinese', 'cantonese', 'beef', 'black-pepper', 'stir-fry', 'bell-pepper', 'weeknight', 'wok'],
  seo_title: 'Black Pepper Beef (黑椒牛柳) — Cantonese Stir-Fry',
  meta_description: 'Black pepper beef stir-fry with tender strips of New York strip, bell pepper, and red onion in a peppery soy-oyster sauce. Cantonese wok cooking at home.',
  published: true,
}

const { error } = await supabase
  .from('recipes')
  .upsert(recipe, { onConflict: 'slug' })

if (error) {
  console.error('❌', error.message)
  process.exit(1)
}
console.log('✅ Black Pepper Beef seeded')
