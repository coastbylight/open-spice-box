import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const recipes = [
  {
    title: 'Chinese Steamed Eggs (蒸蛋)', slug: 'steamed-eggs',
    subtitle: 'Silky egg custard steamed with warm water, chicken bouillon, and a drizzle of oil, the Chinese comfort food that feels like home',
    cultural_origin: 'China', tradition: 'Cross-Cultural',
    headnote: 'Chinese steamed eggs are one of those dishes that looks like nothing and tastes like everything. It is a savory egg custard, smooth and silky, the kind of food that soothes a sore throat, pleases a fussy child, and satisfies a tired adult who does not feel like cooking. The technique is four eggs, two cups of warm water, a little salt and chicken bouillon, and ten minutes in a steamer. The result is a custard so tender it trembles when you touch the bowl.\n\nThe ratio is the key: half a cup of warm water for every egg. The water must be warm, around 35 to 45 degrees Celsius, not hot and not cold. Hot water would scramble the eggs on contact. Cold water takes longer to steam and produces a denser texture. Warm water integrates smoothly and produces the lightest, most delicate custard.\n\nThe steaming has two phases. High heat until the water in the steamer returns to a full boil, then a drop to a gentle simmer for about eight minutes. High heat the whole time creates bubbles and craters in the surface. The simmer lets the custard set gently and evenly. When done, the custard should jiggle like gelatin when you shake the bowl, not ripple like liquid. A tablespoon of oil goes in with the eggs, which adds richness and helps the surface stay smooth. Scallions and a dash of white pepper go on at the end, and optionally a drizzle of soy sauce or oyster sauce.',
    yield: '4 servings', prep_time: '5 minutes', cook_time: '10 minutes', total_time: '15 minutes', difficulty: 'Easy',
    ingredients: [
      { amount: '4', unit: null, ingredient: 'large eggs', prep_note: null, optional: false },
      { amount: '2', unit: 'cups', ingredient: 'warm water', prep_note: '35-45°C / 95-115°F', optional: false },
      { amount: '1/2', unit: 'tsp', ingredient: 'salt', prep_note: null, optional: false },
      { amount: '1/2', unit: 'tsp', ingredient: 'chicken bouillon powder', prep_note: null, optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'neutral oil', prep_note: null, optional: false },
      { amount: '2', unit: null, ingredient: 'scallion stalks', prep_note: 'chopped, for garnish', optional: false },
      { amount: '1', unit: 'dash', ingredient: 'white pepper', prep_note: null, optional: false },
    ],
    instructions: [
      { step: 1, text: 'Set up steamer. Place a rack in a wok with enough water so the bowl sits partially submerged. Remove the bowl, cover, and bring water to a boil.' },
      { step: 2, text: 'Mix eggs. Crack eggs into a bowl. Add salt, chicken bouillon, and oil. Beat with a fork until combined.' },
      { step: 3, text: 'Add warm water. Pour a quarter of the warm water into the eggs and mix until bubbles form. Add the rest and mix again.' },
      { step: 4, text: 'Steam. Place the bowl in the steamer on high heat. When the water returns to a boil (1-4 min), reduce to a simmer. Cook 8 minutes.' },
      { step: 5, text: 'Test doneness. Gently shake the wok. The custard should jiggle like gelatin, not ripple like liquid. If still liquid, steam 1-2 min more.' },
      { step: 6, text: 'Garnish with chopped scallion and white pepper. Optionally drizzle with soy sauce or oyster sauce. Serve.' },
    ],
    tags: ['chinese', 'cantonese', 'eggs', 'steamed', 'comfort-food', 'side-dish', 'simple', 'quick', 'weeknight'],
    seo_title: 'Chinese Steamed Eggs (蒸蛋) — Silky Savory Custard',
    meta_description: 'Chinese steamed eggs with a silky, custard-like texture. Four eggs, warm water, and 10 minutes of steaming. The ultimate Chinese comfort food.',
    published: true,
  },
  {
    title: 'Steamed Fish with Ginger and Scallion (薑蔥蒸魚)', slug: 'steamed-fish-ginger-scallion',
    subtitle: 'Whole fish steamed with ginger and scallion, finished with smoking hot oil poured over julienned aromatics and a savory soy sauce',
    cultural_origin: 'China', tradition: 'Cross-Cultural',
    headnote: 'Steamed whole fish with ginger and scallion is one of the most important dishes in Cantonese cooking. It appears at banquets, at New Year dinners, and on weeknight tables, and it is a test of two things: the freshness of the fish and the restraint of the cook. A good steamed fish needs almost nothing. Ginger, scallion, soy sauce, and hot oil. The fish does the rest.\n\nThe technique has a moment that defines it. After the fish is steamed, the cooking liquid is poured off, julienned ginger and scallion strips are laid across the top, and then smoking hot oil is poured directly over them. The oil hits the aromatics and they sizzle violently, blooming their flavor in an instant and infusing the fish with a fragrance that steaming alone cannot produce. That sizzle, that thirty-second burst of aroma, is the reason this dish exists in the form it does.\n\nThe fish steams for about twelve minutes on high heat, which is enough for a fish of about one and a half pounds. The eyes turning white is the traditional doneness indicator. Oversteaming by even two minutes produces fish that is dry and chalky rather than moist and silky. A cut along the backbone of a whole fish helps the thicker side cook evenly. The sauce, a mixture of light and dark soy sauce, cooking wine, white pepper, sugar, and water, goes on after the hot oil. Sesame oil and fresh cilantro finish the plate.',
    yield: '4 servings', prep_time: '10 minutes', cook_time: '12 minutes', total_time: '25 minutes', difficulty: 'Easy',
    ingredients: [
      { amount: '1.5', unit: 'lbs', ingredient: 'whole fish (tilapia, bass, or snapper)', prep_note: 'cleaned and scaled (680g)', optional: false },
      { amount: '1', unit: 'oz', ingredient: 'fresh ginger', prep_note: 'half julienned, half sliced (28g)', optional: false },
      { amount: '5', unit: null, ingredient: 'scallion stalks', prep_note: 'greens under fish, whites julienned for top', optional: false },
      { amount: '5', unit: null, ingredient: 'cilantro sprigs', prep_note: 'for garnish', optional: true },
      { amount: '2', unit: 'tbsp', ingredient: 'neutral oil', prep_note: 'heated until smoking', optional: false },
      { amount: '2', unit: 'tbsp', ingredient: 'light soy sauce', prep_note: null, optional: false },
      { amount: '1/2', unit: 'tsp', ingredient: 'dark soy sauce', prep_note: null, optional: false },
      { amount: '1/2', unit: 'tbsp', ingredient: 'cooking wine', prep_note: null, optional: false },
      { amount: '1/4', unit: 'tsp', ingredient: 'white pepper', prep_note: null, optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'water', prep_note: null, optional: false },
      { amount: '1/2', unit: 'tsp', ingredient: 'sugar', prep_note: null, optional: false },
      { amount: '1/2', unit: 'tsp', ingredient: 'salt', prep_note: null, optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'sesame oil', prep_note: null, optional: false },
    ],
    instructions: [
      { step: 1, text: 'Prepare fish. Cut away belly fat and trim fins. Make a long cut along the backbone for even cooking. Place on a steam-safe plate. Lay scallion greens under the fish and ginger slices on top.' },
      { step: 2, text: 'Mix sauce. Combine light soy sauce, dark soy sauce, cooking wine, white pepper, water, sugar, and salt.' },
      { step: 3, text: 'Steam fish on high heat for 12 minutes (10 min for smaller fish ~1 lb). Eyes turning white indicates doneness.' },
      { step: 4, text: 'Remove fish from steamer. Pour off the accumulated cooking liquid. Remove the steamed ginger slices. Top with julienned ginger strips and scallion strips.' },
      { step: 5, text: 'Heat 2 tbsp oil on high for about 1 minute until smoking. Carefully pour the hot oil directly over the ginger and scallion on the fish. It will sizzle violently.' },
      { step: 6, text: 'Drizzle sesame oil and the prepared sauce over the fish. Garnish with cilantro. Serve immediately.' },
    ],
    tags: ['chinese', 'cantonese', 'fish', 'steamed', 'ginger', 'scallion', 'whole-fish', 'banquet', 'weeknight', 'healthy'],
    seo_title: 'Steamed Fish with Ginger and Scallion (薑蔥蒸魚) — Cantonese Classic',
    meta_description: 'Cantonese steamed whole fish with ginger and scallion, finished with smoking hot oil for a dramatic sizzle. The fish dish that defines Cantonese cooking.',
    published: true,
  },
  {
    title: 'Napa Cabbage Kimchi (통배추김치)', slug: 'tongbaechu-kimchi',
    subtitle: 'Traditional whole-leaf napa cabbage kimchi salted, stuffed with a gochugaru-fish sauce-garlic paste, and fermented for complex sour, spicy, umami flavor',
    cultural_origin: 'Korea', tradition: 'Cross-Cultural',
    headnote: 'Kimchi is the single most important food in Korean cooking. It appears at every meal, breakfast through dinner, and the act of making it, kimjang, is a communal ritual that UNESCO has recognized as an Intangible Cultural Heritage of Humanity. Every Korean family has their own recipe, adjusted over generations, and the variations are endless. This is the traditional tongbaechu version: whole cabbage leaves, salted, rinsed, and packed with a paste of gochugaru, fish sauce, garlic, ginger, and rice flour porridge.\n\nThe process takes time but very little skill. You salt the quartered cabbage for six to eight hours until the thick white parts bend without snapping. You rinse it three times and drain it. You make a rice flour paste that will feed the lactobacillus bacteria during fermentation. You build the kimchi paste, a vivid red mixture of gochugaru, fish sauce, garlic, ginger, and blended onion. You fold in matchstick radish, carrot, scallions, and chives. Then you work through the cabbage, spreading the paste between every leaf, and fold each quarter into a tight bundle.\n\nThe bundles go into an airtight container, pressed down to eliminate air pockets, and sit at room temperature for one to two days. During this time, the lactobacillus bacteria produce lactic acid, carbon dioxide, and the complex sour-spicy-umami flavor that makes kimchi kimchi. Then it goes into the refrigerator, where fermentation continues slowly for weeks and months. Fresh kimchi is mild and bright. Week-old kimchi is tangy. Month-old kimchi is deeply sour and complex, the kind that makes the best kimchi jjigae and kimchi fried rice.',
    yield: 'about 1 gallon', prep_time: '1 hour', cook_time: '0 minutes', total_time: '8 hours plus 1-2 days fermentation', difficulty: 'Medium',
    ingredients: [
      { amount: '5.7', unit: 'lbs', ingredient: 'napa cabbage', prep_note: '3-4 medium heads (2.6 kg)', optional: false },
      { amount: '1/2', unit: 'cup', ingredient: 'coarse sea salt', prep_note: 'Korean or kosher', optional: false },
      { amount: '2', unit: 'cups', ingredient: 'water', prep_note: 'for rice paste', optional: false },
      { amount: '2', unit: 'tbsp', ingredient: 'glutinous rice flour', prep_note: null, optional: false },
      { amount: '2', unit: 'tbsp', ingredient: 'brown sugar', prep_note: null, optional: false },
      { amount: '1', unit: 'cup', ingredient: 'gochugaru', prep_note: 'Korean red pepper flakes; up to 2 cups for spicier', optional: false },
      { amount: '1/4-1/2', unit: 'cup', ingredient: 'fish sauce', prep_note: null, optional: false },
      { amount: '24', unit: null, ingredient: 'garlic cloves', prep_note: 'minced or blended (about 1.5 bulbs)', optional: false },
      { amount: '1', unit: 'inch', ingredient: 'fresh ginger', prep_note: 'minced or blended', optional: false },
      { amount: '1', unit: null, ingredient: 'medium onion', prep_note: 'blended', optional: false },
      { amount: '2', unit: 'cups', ingredient: 'Korean radish', prep_note: 'cut into matchsticks', optional: false },
      { amount: '1', unit: 'cup', ingredient: 'carrot', prep_note: 'cut into matchsticks', optional: false },
      { amount: '1', unit: 'cup', ingredient: 'scallions', prep_note: 'chopped', optional: false },
      { amount: '1', unit: 'cup', ingredient: 'Asian chives (buchu)', prep_note: 'cut into 1-inch pieces', optional: false },
    ],
    instructions: [
      { step: 1, text: 'Salt the cabbage. Quarter each head lengthwise. Sprinkle coarse salt between the leaves, concentrating on the thick white parts. Let sit 6-8 hours or overnight, turning halfway. Done when thick parts bend without snapping.' },
      { step: 2, text: 'Rinse the cabbage 3 times under cold running water. Drain in a colander 30 min to 1 hour.' },
      { step: 3, text: 'Make rice paste. Combine 2 cups water and glutinous rice flour in a pot over medium heat, stirring until thick and bubbly. Add sugar, stir, remove from heat. Cool completely.' },
      { step: 4, text: 'Make kimchi paste. Combine cooled rice paste with gochugaru, fish sauce, minced garlic, ginger, and blended onion. Mix well.' },
      { step: 5, text: 'Add vegetables. Fold in radish matchsticks, carrot, scallions, and chives.' },
      { step: 6, text: 'Stuff the cabbage. Working one quarter at a time, spread paste generously between every leaf. Fold the outer leaf around to form a tight bundle.' },
      { step: 7, text: 'Pack tightly into an airtight container, pressing down to remove air pockets.' },
      { step: 8, text: 'Ferment at room temperature 1-2 days, then refrigerate. Continues fermenting slowly for weeks.' },
    ],
    tags: ['korean', 'kimchi', 'fermented', 'condiment', 'napa-cabbage', 'gochugaru', 'probiotic', 'essential', 'make-ahead'],
    seo_title: 'Napa Cabbage Kimchi (통배추김치) — Traditional Korean Kimchi',
    meta_description: 'Traditional Korean napa cabbage kimchi with gochugaru, fish sauce, garlic, and ginger. The complete guide to making tongbaechu-kimchi at home.',
    published: true,
  },
  {
    title: 'Doenjang-jjigae (된장찌개)', slug: 'doenjang-jjigae',
    subtitle: 'Korean fermented soybean paste stew with potato, zucchini, tofu, and shrimp simmered in an anchovy broth',
    cultural_origin: 'Korea', tradition: 'Cross-Cultural',
    headnote: 'Doenjang-jjigae is the stew that Koreans eat more than any other. It is on the table at nearly every meal, bubbling in an earthenware pot alongside rice and banchan, and it is the dish that Korean grandmothers make when someone needs to feel better. The flavor is deep, earthy, and funky in the best possible way, built on doenjang, a fermented soybean paste that is older than the country itself.\n\nThe stew is not complicated. Dried anchovies wrapped in cheesecloth simmer in water to create a quick broth. Potato and onion go in first because they take the longest. Doenjang is stirred in, and the pot simmers for twenty minutes while the paste dissolves and the vegetables soften. Zucchini, green chili, garlic, and chopped shrimp go in next. Tofu goes in last, just three minutes before serving, so it warms through without falling apart.\n\nThe earthenware pot, called a ttukbaegi, is not just traditional. It retains heat so well that the stew arrives at the table still bubbling and stays hot through the entire meal. If you do not have one, any heavy pot works, but the cooking time will be shorter because metal conducts heat faster. The stew is forgiving with vegetables. Use what you have. The doenjang and the anchovy broth do the heavy lifting, and everything else is just along for the ride.',
    yield: '2 to 4 servings', prep_time: '10 minutes', cook_time: '38 minutes', total_time: '50 minutes', difficulty: 'Easy',
    ingredients: [
      { amount: '5', unit: 'tbsp', ingredient: 'doenjang', prep_note: 'fermented soybean paste', optional: false },
      { amount: '7', unit: null, ingredient: 'dried anchovies', prep_note: 'guts removed, wrapped in cheesecloth', optional: false },
      { amount: '2 1/2', unit: 'cups', ingredient: 'water', prep_note: null, optional: false },
      { amount: '1', unit: null, ingredient: 'small potato', prep_note: 'cut into 1/2-inch cubes', optional: false },
      { amount: '1', unit: null, ingredient: 'medium onion', prep_note: 'cut into 1/2-inch pieces', optional: false },
      { amount: '1', unit: null, ingredient: 'small zucchini', prep_note: 'cut into 1/2-inch pieces', optional: false },
      { amount: '1', unit: null, ingredient: 'green Korean chili pepper', prep_note: 'chopped', optional: false },
      { amount: '4', unit: null, ingredient: 'garlic cloves', prep_note: 'minced', optional: false },
      { amount: '4', unit: null, ingredient: 'large shrimp', prep_note: 'shelled, deveined, coarsely chopped', optional: false },
      { amount: '6', unit: 'oz', ingredient: 'medium-firm tofu', prep_note: 'cut into 1/2-inch cubes (170g)', optional: false },
      { amount: '2', unit: null, ingredient: 'scallions', prep_note: 'chopped, for garnish', optional: false },
    ],
    instructions: [
      { step: 1, text: 'Place potato, onion, zucchini, chili, garlic, and shrimp into an earthenware pot or heavy pot.' },
      { step: 2, text: 'Add anchovy pouch and water. Cover, cook on medium-high heat for about 15 minutes until boiling.' },
      { step: 3, text: 'Stir in doenjang, mixing well to dissolve. Cover and cook 20 minutes over medium heat.' },
      { step: 4, text: 'Add tofu cubes and cook 3 more minutes.' },
      { step: 5, text: 'Remove and discard anchovy pouch. Top with chopped scallions. Serve hot with rice.' },
    ],
    tags: ['korean', 'soup', 'stew', 'doenjang', 'fermented', 'tofu', 'comfort-food', 'weeknight', 'essential'],
    seo_title: 'Doenjang-jjigae (된장찌개) — Korean Fermented Soybean Paste Stew',
    meta_description: 'Doenjang-jjigae with fermented soybean paste, potato, zucchini, tofu, and shrimp in anchovy broth. Korea\'s most beloved comfort stew.',
    published: true,
  },
]

for (const recipe of recipes) {
  const { error } = await supabase
    .from('recipes')
    .upsert(recipe, { onConflict: 'slug' })
  if (error) {
    console.error(`❌ ${recipe.title}: ${error.message}`)
    process.exit(1)
  }
  console.log(`✅ ${recipe.title}`)
}
