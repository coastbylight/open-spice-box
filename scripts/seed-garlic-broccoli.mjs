import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const recipe = {
  title: 'Sauteed Broccoli with Minced Garlic (蒜蓉西兰花)',
  slug: 'sauteed-broccoli-with-garlic',
  subtitle: 'Blanched broccoli florets flash-sauteed with a generous amount of minced garlic and nothing else, the way Chinese home kitchens actually cook vegetables',
  cultural_origin: 'China',
  tradition: 'Traditional Chinese Medicine',
  headnote:
    'If you have only eaten broccoli in Chinese restaurants in the West, you have probably only seen it buried under a thick brown sauce with chicken or beef. That is not how most Chinese families cook broccoli at home. At home, it is usually just the vegetable, garlic, salt, and oil. That is the entire dish. The point is to taste the broccoli, not the sauce.\n\nThe technique here matters more than the ingredient list. Blanching the broccoli first in boiling water for exactly two minutes does three things: it removes the raw, slightly bitter edge that cruciferous vegetables carry, it sets the color to a vivid, almost electric green, and it partially cooks the florets so the time in the wok is measured in seconds rather than minutes. The cold water rinse after blanching stops the cooking immediately. Without it, the broccoli continues to soften from residual heat and turns army green.\n\nThe sauteing is fast and aggressive. Hot oil, garlic, broccoli, salt, done. The garlic should be fragrant but not brown. Ten seconds in the oil before the broccoli goes in is enough. The whole stir-fry takes about a minute. This is a dish that belongs at the table within two minutes of leaving the wok. It is meant to be bright, crisp, garlicky, and clean, the kind of vegetable dish that makes everything else on the table better by giving your palate somewhere simple to land between bites of richer food.',
  yield: '2 to 4 servings',
  prep_time: '15 minutes',
  cook_time: '5 minutes',
  total_time: '20 minutes',
  difficulty: 'Easy',
  ingredients: [
    { amount: '1', unit: null, ingredient: 'large broccoli crown', prep_note: 'or 2 medium, separated into small florets (about 1 lb)', optional: false },
    { amount: '5', unit: null, ingredient: 'garlic cloves', prep_note: 'minced', optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'vegetable oil', prep_note: null, optional: false },
    { amount: '1/2', unit: 'tsp', ingredient: 'kosher salt', prep_note: 'or 1/4 tsp table salt', optional: false },
  ],
  instructions: [
    { step: 1, text: 'Prepare the broccoli. Wash the broccoli thoroughly by submerging it in cold water for a few minutes. Use your hands or a knife to separate the crowns into small, bite-sized florets. Try to keep them roughly uniform in size so they cook evenly. Save the stems for another use. Mince the garlic and set it near the stove.' },
    { step: 2, text: 'Blanch the broccoli. Bring a large pot of water to a boil over medium-high heat. Add the broccoli florets, making sure they are all submerged. Add a few drops of oil to the water. Blanch for exactly 2 minutes. Do not wait for the water to return to a boil.' },
    { step: 3, text: 'Shock in cold water. Immediately drain the broccoli and rinse under cold running water until cool to the touch. This stops the cooking and locks in the bright green color. Drain thoroughly and pat dry with a kitchen towel if needed. Excess water will cause the oil to splatter in the next step.' },
    { step: 4, text: 'Saute with garlic. Heat a wok or large skillet over medium-high heat. When the pan is hot, add the tablespoon of vegetable oil. Add the minced garlic and stir for about 10 seconds, just until it releases its fragrance. Do not let it brown, as burnt garlic turns bitter and will ruin the dish.' },
    { step: 5, text: 'Finish and serve. Add the blanched broccoli florets to the wok. Toss gently for 1 to 2 minutes to coat the florets evenly with the garlic and oil. Sprinkle in the salt and give everything one final stir. Transfer to a plate immediately and serve while hot.' },
  ],
  key_ingredient_benefits:
    '**Broccoli:** One of the most nutrient-dense vegetables available. A single cup of cooked broccoli provides more than 100% of the daily recommended intake of vitamin C and vitamin K. Broccoli belongs to the cruciferous family, which contains sulforaphane, a compound extensively studied for potential anti-cancer properties. Brief cooking preserves more sulforaphane than long cooking.\n\n**Garlic:** Fresh garlic contains allicin, a sulfur compound with documented antibacterial and antifungal properties and the subject of ongoing cardiovascular research. Traditional Chinese medicine classifies garlic as warm and pungent, used to warm the Spleen and Stomach and to expel cold. The brief cooking in this recipe preserves more of garlic\'s volatile compounds than long roasting or braising.',
  why_this_works:
    'The blanch-then-saute method is the standard technique for cooking green vegetables in Chinese home kitchens. Raw broccoli florets need several minutes of high heat to become tender, but in that time they lose their color, develop bitter flavors, and cook unevenly. Blanching equalizes the cooking so every piece enters the wok already tender-crisp. The wok step then becomes purely about flavor: coating the florets with garlic-infused oil and seasoning with salt.\n\nThe cold water shock after blanching is not optional. Broccoli retains enough heat after draining to continue cooking for several more minutes. Without the cold rinse, the florets will be overcooked and dull-colored by the time they reach the plate. The bright green color of properly blanched broccoli indicates that the chlorophyll is intact, meaning the vegetable has been cooked quickly enough to retain both its texture and most of its heat-sensitive nutrients.',
  substitutions: 'Broccolini needs only 1 minute of blanching. Chinese broccoli (gai lan) works with 2 minutes, splitting thick stems lengthwise. Cauliflower needs 3 minutes. For a richer dish, add 1 tablespoon oyster sauce to the wok with the broccoli. A pinch of dried chili flakes with the garlic adds gentle heat.',
  serving_suggestions: 'This is a side dish meant to sit on the table alongside two or three other things. It pairs especially well with rich, strongly flavored dishes like mapo tofu or braised pork, where its clean simplicity gives your palate somewhere to rest. Serve with steamed rice and one protein dish for a complete weeknight dinner.',
  storage_reheating: 'Store in an airtight container for up to 2 days. Reheat with a quick toss in a hot wok for 30 seconds to 1 minute. Microwave works but softens the texture. Freezing is not recommended as the assembled dish becomes waterlogged.',
  cultural_notes: 'In Chinese home cooking, vegetables are often prepared with minimal seasoning, just garlic or ginger, oil, and salt. The heavy sauces seen in Western Chinese restaurants are largely a diaspora adaptation. This dish represents how most Chinese families actually cook their daily vegetables: simply, quickly, and with the goal of tasting the vegetable itself.',
  tags: ['chinese', 'vegetable', 'broccoli', 'garlic', 'vegan', 'gluten-free', 'low-carb', 'side-dish', 'weeknight', 'quick', 'simple', 'healthy'],
  seo_title: 'Sauteed Broccoli with Minced Garlic (蒜蓉西兰花) — Simple Chinese Vegetable',
  meta_description: 'Chinese-style garlic broccoli with just four ingredients. Blanched then flash-sauteed for bright color, crisp texture, and pure garlic flavor in 20 minutes.',
  published: true,
}

const { error } = await supabase
  .from('recipes')
  .upsert(recipe, { onConflict: 'slug' })

if (error) {
  console.error('❌', error.message)
  process.exit(1)
}
console.log('✅ Sauteed Broccoli with Minced Garlic seeded')
