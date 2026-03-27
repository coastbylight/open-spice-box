import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const recipe = {
  title: 'Bok Choy in Ginger Sauce (姜汁白菜)',
  slug: 'bok-choy-in-ginger-sauce',
  subtitle: 'Tender bok choy steamed in ginger-infused oil and tossed in a light sauce of soy, oyster sauce, and sesame oil',
  cultural_origin: 'China',
  tradition: 'Traditional Chinese Medicine',
  headnote:
    'This is a six-minute dish. Three minutes of prep, three minutes of cooking. That is not an exaggeration or a marketing claim. It is the actual time it takes to put bok choy on the table in a glossy, ginger-laced sauce that looks like it came from a restaurant kitchen.\n\nThe method is a hybrid that Chinese home cooks use constantly: a quick flash in ginger-infused oil, a brief covered steam with a splash of water, then a sauce tossed in at the end. Each stage lasts less than a minute. The ginger goes in first, julienned fine enough that it crisps slightly in the oil and perfumes everything that follows. The bok choy gets tossed to coat, then steamed just long enough to go from raw to tender-crisp, about 45 seconds under a lid. The sauce, pre-mixed in a bowl, goes in last and thickens almost instantly around the greens.\n\nThe margin for error is measured in seconds. Bok choy goes from perfectly done to overcooked in about 30 seconds, and overcooked bok choy is a different vegetable entirely: limp, waterlogged, and sad. Pull it when the stems are still slightly crunchy and the leaves have just wilted. The residual heat finishes the job on the plate. If this sounds stressful, it is not. It is the kind of speed that becomes instinctive after you make it twice. And you will make it more than twice, because six minutes is less time than it takes to order delivery.',
  yield: '4 servings',
  prep_time: '3 minutes',
  cook_time: '3 minutes',
  total_time: '6 minutes',
  difficulty: 'Easy',
  ingredients: [
    { amount: '6', unit: null, ingredient: 'small bok choy', prep_note: 'up to about 7 inches long', optional: false },
    { amount: '2', unit: 'tbsp', ingredient: 'vegetable oil', prep_note: null, optional: false },
    { amount: '1/4', unit: 'cup', ingredient: 'fresh ginger', prep_note: 'finely julienned', optional: false },
    { amount: '1/4', unit: 'cup', ingredient: 'water', prep_note: 'for steaming', optional: false },
    { amount: '3', unit: 'tsp', ingredient: 'cornstarch', prep_note: null, optional: false },
    { amount: '1 1/2', unit: 'tsp', ingredient: 'light soy sauce', prep_note: null, optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'oyster sauce', prep_note: null, optional: false },
    { amount: '2', unit: 'tsp', ingredient: 'Chinese cooking wine', prep_note: 'Shaoxing wine', optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'toasted sesame oil', prep_note: null, optional: false },
    { amount: '1/4', unit: 'cup', ingredient: 'water', prep_note: 'for sauce', optional: false },
    { amount: '1/4', unit: 'tsp', ingredient: 'salt', prep_note: null, optional: false },
    { amount: '1', unit: 'pinch', ingredient: 'white pepper', prep_note: null, optional: false },
  ],
  instructions: [
    { step: 1, text: 'Prepare the bok choy. Trim the base of each bok choy and separate the leaves, keeping the delicate center clusters intact. If any stems are particularly thick, cut them in half lengthwise so everything cooks at the same rate. Rinse well and shake off the excess water.' },
    { step: 2, text: 'Mix the sauce. In a small bowl, stir the cornstarch into the soy sauce and oyster sauce until dissolved. Add the cooking wine, sesame oil, water, salt, and white pepper. Stir and set near the stove.' },
    { step: 3, text: 'Infuse the oil with ginger. Heat the vegetable oil in a large non-stick pan or wok over medium heat. Add the julienned ginger and saute for about 1 minute, stirring occasionally, until the ginger turns light golden and the oil smells fragrant and sharp. Add the bok choy and toss for about 15 seconds to coat the leaves in the ginger oil.' },
    { step: 4, text: 'Steam the bok choy. Pour the water over the bok choy and immediately cover with a lid. Let it steam for 45 seconds only. Do not walk away.' },
    { step: 5, text: 'Add the sauce. Remove the lid. The bok choy will look slightly underdone, which is correct. Give the sauce a quick stir and pour it over the bok choy. Toss everything together for about 30 seconds. The sauce will clarify and thicken as the cornstarch cooks. The bok choy should be floppy and tender but still have a soft crunch in the stems. If the sauce gets too thick, add a small splash of water.' },
    { step: 6, text: 'Serve immediately. Transfer the bok choy and all the sauce to a serving plate.' },
  ],
  key_ingredient_benefits:
    '**Bok Choy:** A member of the cruciferous family, bok choy is exceptionally high in vitamins A, C, and K relative to its calorie content (about 13 calories per cup). It contains calcium in a form that the body absorbs more readily than the calcium in many other leafy greens. Traditional Chinese medicine classifies bok choy as cooling and moistening, used to clear heat from the body and promote healthy digestion.\n\n**Ginger:** The julienned fresh ginger provides gingerols, compounds with documented anti-inflammatory and digestive benefits. In TCM, fresh ginger (sheng jiang) is considered warm and acrid, used to warm the Stomach, dispel cold, and promote circulation.\n\n**Sesame Oil:** Used here as a finishing flavor rather than a cooking fat. Toasted sesame oil contains lignans (sesamin and sesamol) that have been studied for antioxidant and anti-inflammatory properties.',
  why_this_works:
    'The three-stage cooking method (oil infusion, steam, sauce toss) is engineered for speed and precision. The ginger goes into cool-ish oil and heats with it, which extracts flavor more gently than dropping it into smoking oil. This gives you fragrant, lightly crisped ginger without burned edges.\n\nThe 45-second steam is the critical window. Bok choy stems are mostly water, and they conduct heat efficiently. Under a lid with a splash of water, they reach the tender-crisp stage in under a minute. Removing the lid stops the steam cooking, and the sauce goes in while the bok choy is still slightly underdone. The residual heat and the hot sauce finish the cooking on the plate.\n\nThe cornstarch in the sauce thickens the liquid into a glossy coating that clings to the leaves, giving the thin sauce enough body to feel like a proper dressing rather than flavored water.',
  substitutions: 'Choy sum, pak choy, or baby bok choy all work with the same timing. Chinese broccoli (gai lan) needs an extra 30 seconds of steaming. Replace ginger with 3 to 4 minced garlic cloves for a different but equally good version. Mushroom-based oyster sauce substitutes directly for vegetarian. Dry sherry replaces cooking wine, or skip it and add an extra half teaspoon of soy sauce.',
  serving_suggestions: 'This belongs on the table next to something with weight. Braised pork belly, mapo tofu, or any rich stir-fry. The light, gingery bok choy acts as a palate cleanser between bites of heavier food. For a simple dinner, serve alongside egg drop soup and steamed rice.',
  storage_reheating: 'Store in an airtight container for up to 1 day. Best eaten fresh. Reheat with a quick toss in a hot wok for 20 to 30 seconds. Freezing is not recommended as bok choy becomes mushy when thawed.',
  cultural_notes: 'This three-stage method of oil-infuse, steam, and sauce-toss is one of the most common techniques for cooking leafy greens in Chinese home kitchens. It produces restaurant-quality results in minutes with minimal equipment.',
  tags: ['chinese', 'vegetable', 'bok-choy', 'ginger', 'side-dish', 'weeknight', 'quick', 'simple', 'healthy', 'gluten-free-adaptable'],
  seo_title: 'Bok Choy in Ginger Sauce (姜汁白菜) — 6-Minute Chinese Vegetable Side',
  meta_description: 'Tender bok choy in a light ginger sauce with soy and sesame oil. Six minutes from start to plate. The fastest vegetable side in Chinese home cooking.',
  published: true,
}

const { error } = await supabase
  .from('recipes')
  .upsert(recipe, { onConflict: 'slug' })

if (error) {
  console.error('❌', error.message)
  process.exit(1)
}
console.log('✅ Bok Choy in Ginger Sauce seeded')
