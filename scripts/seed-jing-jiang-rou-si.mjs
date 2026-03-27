import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const recipe = {
  title: 'Jing Jiang Rou Si (京酱肉丝)',
  slug: 'jing-jiang-rou-si',
  subtitle: 'Beijing-style shredded pork tenderloin stir-fried in sweet bean sauce, wrapped in tofu skin with raw scallion strips, the home cook\'s Peking duck',
  cultural_origin: 'China',
  tradition: 'Cross-Cultural',
  headnote:
    'The name breaks down simply: jing for Beijing, jiang for sauce, rou for meat, si for shreds. It is one of the defining dishes of Beijing home cooking, and the reason it works so well is that it borrows the entire eating experience of Peking duck, the sweet-savory sauce, the raw scallion strips, the thin wrapper, and replaces the duck with something a home cook can actually make on a Tuesday night.\n\nThe origin story, whether true or embellished, places the dish in a 1930s Beijing courtyard where an old man named Lao Chen could not afford roast duck for his grandson on New Year\'s Eve. He shredded pork, stir-fried it in sweet bean sauce, and wrapped it in the tofu skins he made for a living. His grandson grew up to become a chef at a duck restaurant, and the improvised dish eventually became one of Beijing\'s most iconic.\n\nThe sauce that defines this dish is tian mian jiang, sweet fermented wheat paste. It is not hoisin, not doubanjiang, not regular soybean paste. Tian mian jiang is thick, dark, salty, and faintly sweet, with a deep fermented umami that nothing else can replicate. It gets fried briefly in hot oil before the pork goes back in, which transforms it from a raw, sharp paste into something rounded and aromatic. The pork is tenderloin cut into thin matchsticks, marinated with cornstarch and Shaoxing wine for a basic velvet that keeps the shreds silky rather than tough. The whole stir-fry takes about three minutes. The eating is the slow part: laying a strip of tofu skin on your palm, spooning on the sauced pork, adding a few strips of raw scallion, rolling it up, and biting through the cool wrapper into the warm, savory filling.',
  yield: '3 to 4 servings',
  prep_time: '25 minutes',
  cook_time: '5 minutes',
  total_time: '30 minutes',
  difficulty: 'Medium',
  ingredients: [
    { amount: '12', unit: 'oz', ingredient: 'pork tenderloin', prep_note: 'cut into thin matchstick strips (350g)', optional: false },
    { amount: '1/4', unit: 'tsp', ingredient: 'salt', prep_note: 'for marinade', optional: false },
    { amount: '1/8', unit: 'tsp', ingredient: 'ground white pepper', prep_note: null, optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'Shaoxing wine', prep_note: null, optional: false },
    { amount: '2', unit: 'tsp', ingredient: 'cornstarch', prep_note: null, optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'vegetable oil', prep_note: 'for sealing marinade', optional: false },
    { amount: '2 1/2', unit: 'tbsp', ingredient: 'tian mian jiang', prep_note: 'sweet bean sauce / sweet wheat paste', optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'light soy sauce', prep_note: null, optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'sugar', prep_note: null, optional: false },
    { amount: '1/4', unit: 'cup', ingredient: 'water', prep_note: null, optional: false },
    { amount: '1/2', unit: 'tsp', ingredient: 'dark soy sauce', prep_note: 'optional, for color', optional: true },
    { amount: '3', unit: 'tbsp', ingredient: 'vegetable oil', prep_note: 'for stir-frying', optional: false },
    { amount: '8-10', unit: null, ingredient: 'scallions', prep_note: 'white parts cut into 3-inch strips, soaked in ice water', optional: false },
    { amount: null, unit: null, ingredient: 'tofu skin sheets', prep_note: 'blanched and cut into squares; or Mandarin pancakes', optional: false },
  ],
  instructions: [
    { step: 1, text: 'Marinate the pork. Combine the pork strips with salt, white pepper, and Shaoxing wine. Mix and let absorb for a minute. Add cornstarch and toss to coat. Add the teaspoon of oil last to seal. Set aside for 15 minutes.' },
    { step: 2, text: 'Mix the sauce. Combine tian mian jiang, light soy sauce, sugar, water, and dark soy sauce if using. Stir well.' },
    { step: 3, text: 'Stir-fry the pork. Heat wok over high heat until smoking. Add oil, then the pork. Stir-fry for 30 to 45 seconds, separating the strips, until the surface turns white but the inside is still slightly pink. Remove and set aside. Leave about 1 tablespoon of oil in the wok.' },
    { step: 4, text: 'Cook the sauce. Return wok to medium heat. Add the tian mian jiang from the sauce mixture first and stir-fry vigorously for 30 seconds until fragrant and slightly darkened. Add the remaining sauce liquid and stir until thick and glossy, about 1 minute.' },
    { step: 5, text: 'Combine and finish. Return the pork to the wok. Toss quickly to coat every strip, about 30 seconds. The sauce should cling in a concentrated glaze. Turn off heat.' },
    { step: 6, text: 'Plate and serve. Drain the scallion strips and arrange as a bed on a plate. Pile the pork on top. Serve with tofu skin squares or Mandarin pancakes. Wrap, add scallion, roll, and eat.' },
  ],
  key_ingredient_benefits:
    '**Tian Mian Jiang (Sweet Bean Sauce):** A fermented paste made from wheat flour and soybeans. The fermentation produces glutamate (umami), amino acids, and B vitamins. It is the same sauce family as the dipping sauce for Peking duck. Not interchangeable with hoisin (sweeter, thinner) or doubanjiang (chili-based, Sichuanese).\n\n**Pork Tenderloin:** The leanest cut of pork with about 22 grams of protein and only 3 grams of fat per 100g. One of the best meat sources of thiamine (vitamin B1).\n\n**Scallions:** Raw scallions provide allicin with antimicrobial properties, plus vitamin K and folate. In TCM, scallions are classified as warming and pungent, used to dispel surface cold.',
  why_this_works:
    'Cornstarch marinade creates a basic velvet that protects the thin pork strips during high-heat stir-frying. Removing pork while still slightly pink ensures it finishes gently in the sauce. Frying the tian mian jiang in oil before adding liquid triggers Maillard reactions in the fermented wheat proteins, rounding the flavor from sharp to toasted. Ice-water-soaked scallion strips curl and develop a crisp bite that contrasts the warm, rich pork. The tofu skin wrapper creates a three-texture bite: cool wrapper, warm sauced pork, crisp raw scallion.',
  substitutions: 'Pork loin works if tenderloin is unavailable. Chicken breast is a common substitute. Hoisin thinned with soy sauce is the closest tian mian jiang approximation but is sweeter. Mandarin pancakes or butter lettuce cups can replace tofu skin. Add 1 tbsp egg white to the marinade for an even silkier texture.',
  serving_suggestions: 'Set the platter in the center with wrappers and let everyone build their own. For a complete Beijing-style meal, serve alongside egg drop soup, a green vegetable side, and steamed rice. The pork also works over plain noodles.',
  storage_reheating: 'Store pork in sauce for up to 2 days. Keep scallions and wrappers separate. Reheat in a wok with a splash of water. Freezes well for up to 2 months.',
  cultural_notes: 'One of the defining dishes of Beijing home cooking. It borrows the entire eating experience of Peking duck (sweet sauce, raw scallion, thin wrapper) and makes it accessible for everyday cooking. The origin story places it in a 1930s Beijing courtyard. The most famous tian mian jiang comes from Liu Bi Ju, a Beijing soy sauce shop operating since the Ming Dynasty.',
  tags: ['chinese', 'beijing', 'pork', 'stir-fry', 'sweet-bean-sauce', 'tian-mian-jiang', 'tofu-skin', 'weeknight', 'quick', 'wraps'],
  seo_title: 'Jing Jiang Rou Si (京酱肉丝) — Beijing Shredded Pork in Sweet Bean Sauce',
  meta_description: 'Beijing-style shredded pork in sweet bean sauce, wrapped in tofu skin with scallion. The home cook\'s Peking duck, ready in 30 minutes.',
  published: true,
}

const { error } = await supabase
  .from('recipes')
  .upsert(recipe, { onConflict: 'slug' })

if (error) {
  console.error('❌', error.message)
  process.exit(1)
}
console.log('✅ Jing Jiang Rou Si seeded')
