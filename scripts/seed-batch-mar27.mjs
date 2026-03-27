import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const recipes = [
  {
    title: 'Yu Choy with Oyster Sauce (蚝油油菜)',
    slug: 'yu-choy-with-oyster-sauce',
    subtitle: 'Blanched yu choy sum drizzled with a warm oyster sauce dressing, the dim sum side dish that belongs on every dinner table',
    cultural_origin: 'China',
    tradition: 'Traditional Chinese Medicine',
    headnote:
      'Yu choy is the sweetest of the Chinese leafy greens, noticeably sweeter and milder than its more famous cousin gai lan. The stems are tender and juicy, the leaves soft and mild, and the small yellow flowers that sometimes appear at the tips are edible and faintly honey-scented. It is the green that people who think they do not like Chinese greens end up liking.\n\nThis preparation is about as minimal as cooking gets. Blanch the yu choy for 30 seconds in boiling water with a splash of oil. Plate it. Pour a warm sauce of oyster sauce, soy sauce, and sesame oil over the top. That is the entire recipe. You will see this dish at dim sum restaurants next to plates of char siu and har gow, sitting quietly on the table doing exactly what it is supposed to do: providing something fresh and green to balance everything else.\n\nThe technique has one detail that makes the difference between a good result and a watery one. After blanching and plating, water will pool under the greens on the plate. Pour it off before adding the sauce. If you skip this step, the sauce dilutes and you lose the glossy, concentrated coating that makes this dish satisfying rather than bland. It is the kind of small thing that Chinese grandmothers do without thinking and that recipes often forget to mention.',
    yield: '4 servings',
    prep_time: '30 minutes',
    cook_time: '10 minutes',
    total_time: '40 minutes',
    difficulty: 'Easy',
    ingredients: [
      { amount: '1', unit: 'lb', ingredient: 'yu choy', prep_note: 'about 450g', optional: false },
      { amount: '2', unit: 'tbsp', ingredient: 'vegetable oil', prep_note: 'divided', optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'oyster sauce', prep_note: null, optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'light soy sauce', prep_note: null, optional: false },
      { amount: '1/2', unit: 'tsp', ingredient: 'sesame oil', prep_note: 'toasted', optional: false },
      { amount: '1/8', unit: 'tsp', ingredient: 'ground white pepper', prep_note: null, optional: false },
    ],
    instructions: [
      { step: 1, text: 'Wash the yu choy three times in cold water, swishing it around to dislodge any dirt and sand. Drain in a colander.' },
      { step: 2, text: 'Make the sauce. Heat 1 tablespoon of oil in a small saucepan over low heat for 30 seconds. Add the oyster sauce, soy sauce, sesame oil, and white pepper. Stir and bring to a gentle simmer, then immediately turn off the heat. Set aside.' },
      { step: 3, text: 'Blanch the yu choy. Bring a large pot of water to a rolling boil. Add the remaining 1 tablespoon of oil to the water. Add the yu choy and stir gently. The leaves will turn a deep, vivid green almost immediately. Blanch for 30 seconds for thin-stemmed yu choy, up to 1 minute if the stems are thick.' },
      { step: 4, text: 'Use tongs to lift the yu choy from the water and arrange on a serving plate. Let it sit for a moment, then carefully tilt the plate and pour off any water that has pooled underneath. This step is important to prevent a watery sauce.' },
      { step: 5, text: 'Pour the warm sauce evenly over the yu choy. If the stalks are long, use kitchen scissors to cut them in half on the plate. Serve immediately.' },
    ],
    key_ingredient_benefits:
      '**Yu Choy:** One of the most nutritionally dense leafy greens available. A single serving provides over 200% of the daily recommended vitamin A and 175% of vitamin C. It is also a significant source of calcium, iron, and folate. Like all cruciferous vegetables, it contains glucosinolates, compounds that the body converts to sulforaphane, which has been extensively studied for anti-cancer properties.\n\n**Oyster Sauce:** A thick, savory condiment that provides umami depth without the sharp saltiness of straight soy sauce. The combination of oyster sauce and soy sauce follows the principle of layering different umami sources for a more complex, rounded flavor.',
    why_this_works:
      'Blanching in water with oil serves two purposes. The oil coats the surface of the greens and gives them a subtle sheen, and the boiling water cooks the stems and leaves quickly and evenly. The sauce is warmed rather than cooked, loosening its consistency so it spreads evenly. Draining the water from the plate before saucing is the difference between a clean, well-dressed vegetable and a diluted puddle.',
    substitutions: 'Chinese broccoli (gai lan) is the classic substitute, blanched for 1 to 2 minutes. Broccolini and baby bok choy also work well. Mushroom-based oyster sauce substitutes directly for vegetarian.',
    serving_suggestions: 'This is the vegetable side that goes with everything. Serve alongside roast duck, steamed fish, congee, mapo tofu, or any rice-and-protein meal where the table needs something green and simple.',
    storage_reheating: 'Store undressed in an airtight container for up to 1 day. Add fresh sauce when serving. Freezing is not recommended.',
    cultural_notes: 'Yu choy with oyster sauce is a staple at dim sum restaurants, served alongside heavier dishes as a palate cleanser. The name choy sum means "heart of the vegetable" in Cantonese, referring to the tender flowering stems.',
    tags: ['chinese', 'vegetable', 'yu-choy', 'choy-sum', 'oyster-sauce', 'side-dish', 'weeknight', 'quick', 'simple', 'healthy', 'dim-sum'],
    seo_title: 'Yu Choy with Oyster Sauce (蚝油油菜) — Simple Chinese Greens',
    meta_description: 'Blanched yu choy sum with a warm oyster sauce dressing. The dim sum classic made at home in 10 minutes, sweet and tender with every bite.',
    published: true,
  },
  {
    title: 'Chinese Tea Eggs (茶叶蛋)',
    slug: 'chinese-tea-eggs',
    subtitle: 'Soft-boiled eggs marbled with a fragrant brine of black tea, star anise, cinnamon, and soy sauce, soaked overnight for deep flavor',
    cultural_origin: 'China',
    tradition: 'Traditional Chinese Medicine',
    headnote:
      'Chinese tea eggs are sold from simmering pots on street corners and in convenience stores across China, their fragrance drifting through morning markets and train stations. You can smell them before you see them. Star anise, cinnamon, black tea, and soy sauce create an aroma that is warm and spiced and deeply savory, the kind that makes you buy one even if you were not hungry.\n\nThe technique is simple but requires patience. Eggs are boiled, their shells cracked all over with the back of a spoon to create a web of fine fractures, then submerged in a spiced brine and left to soak for at least 24 hours. The brine seeps through the cracks and stains the egg white in a beautiful marbled pattern, like cracked porcelain. The flavor penetrates gently, giving the white a savory, tea-scented depth without overwhelming the egg itself.\n\nThis version uses a shorter initial boil and an ice bath to keep the yolk soft and slightly jammy rather than the traditional fully hard-cooked crumbly yolk. It borrows the timing from Japanese ramen eggs while keeping the Chinese tea egg flavor profile. The result is an egg with a creamy, golden center and a marbled exterior that looks like something from a museum. They keep in the fridge for days and get better as they soak, which makes them one of the best make-ahead snacks in any cuisine.',
    yield: '12 eggs',
    prep_time: '1 day',
    cook_time: '15 minutes',
    total_time: '1 day 15 minutes',
    difficulty: 'Easy',
    ingredients: [
      { amount: '12', unit: null, ingredient: 'large eggs', prep_note: 'brought to room temperature', optional: false },
      { amount: '4-5', unit: 'cups', ingredient: 'water', prep_note: 'enough to submerge all eggs', optional: false },
      { amount: '2', unit: null, ingredient: 'slices fresh ginger', prep_note: null, optional: false },
      { amount: '3', unit: null, ingredient: 'whole star anise', prep_note: null, optional: false },
      { amount: '1', unit: null, ingredient: 'cinnamon stick', prep_note: null, optional: false },
      { amount: '2', unit: null, ingredient: 'bay leaves', prep_note: null, optional: false },
      { amount: '2', unit: 'tbsp', ingredient: 'black tea leaves', prep_note: null, optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'Sichuan peppercorns', prep_note: null, optional: false },
      { amount: '3', unit: 'tbsp', ingredient: 'light soy sauce', prep_note: null, optional: false },
      { amount: '4', unit: 'tsp', ingredient: 'dark soy sauce', prep_note: null, optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'sugar', prep_note: null, optional: false },
      { amount: '2', unit: 'tsp', ingredient: 'salt', prep_note: null, optional: false },
      { amount: '2', unit: 'tbsp', ingredient: 'Shaoxing wine', prep_note: null, optional: false },
    ],
    instructions: [
      { step: 1, text: 'Make the brine. Add the water, ginger, star anise, cinnamon stick, bay leaves, tea leaves, Sichuan peppercorns, light soy sauce, dark soy sauce, sugar, salt, and Shaoxing wine to a medium pot. Bring to a boil, then reduce to a low simmer. Cover and simmer for 10 minutes. Turn off the heat and let the brine cool completely.' },
      { step: 2, text: 'Boil the eggs. Bring a separate pot of water to a rolling boil. Gently lower the room-temperature eggs into the water one at a time using a large spoon. Boil for exactly 7 minutes.' },
      { step: 3, text: 'Ice bath. Immediately transfer the eggs to a bowl of ice water. Let them sit until completely cool, about 10 minutes.' },
      { step: 4, text: 'Crack the shells. Gently tap each egg all over with the back of a small spoon to create a dense web of fine cracks across the entire surface. Do not tap too hard as the yolk is still soft.' },
      { step: 5, text: 'Soak for 24 hours. Place the cracked eggs in the cooled brine, making sure every egg is fully submerged. Cover and refrigerate for at least 24 hours. Two to three days produces the best results.' },
      { step: 6, text: 'Peel and serve. Remove eggs from the brine and peel carefully. The marbled pattern will be revealed as the shell comes away.' },
    ],
    key_ingredient_benefits:
      '**Eggs:** Each egg provides about 6 grams of complete protein and is one of the best dietary sources of choline, important for brain function and liver health. Traditional Chinese medicine considers eggs nourishing and mildly cooling, recommended for recovery.\n\n**Star Anise:** Contains anethole with documented anti-inflammatory properties. In TCM, star anise is classified as warming, used to warm the Kidney and Spleen and relieve cold-related abdominal pain. It is the natural source of shikimic acid, the precursor compound used in the production of oseltamivir (Tamiflu).\n\n**Black Tea:** The tannins contribute a slight astringency that balances the richness of the soy sauce. Tea polyphenols have been studied for antioxidant properties.',
    why_this_works:
      'The cracked shell creates channels for the soy sauce, tea, and spices to penetrate, staining the white in a pattern that follows the fracture lines. The 7-minute boil followed by an ice bath produces a yolk that is set but still creamy. The brine is built on layers of flavor: black tea provides tannins, star anise and cinnamon add aromatic sweetness, Sichuan peppercorn contributes a faint numbing quality, and soy sauce provides salt, umami, and color.',
    substitutions: 'For traditional fully hard-cooked yolk, boil for 12 minutes and skip the ice bath. Any unflavored black tea works; pu-erh makes a darker, earthier version. Omit Sichuan peppercorn if unavailable. Replace individual spices with 2 teaspoons Chinese five-spice powder for a quicker brine.',
    serving_suggestions: 'Eat on their own with a sprinkle of salt, halve them over congee, slice into noodle soup, or pack in a lunchbox. They are one of the most portable snacks in Chinese cooking.',
    storage_reheating: 'Keep in the brine in the refrigerator for up to 3 to 4 days. Flavor continues to develop as they soak. After peeling, eat within 1 day. Serve at room temperature or cold. Freezing is not recommended.',
    cultural_notes: 'Chinese tea eggs are a street food snack sold from simmering pots across China. The marbled pattern created by cracking the shell before soaking is both beautiful and functional, allowing the brine to penetrate and flavor the egg white.',
    tags: ['chinese', 'eggs', 'snack', 'tea', 'star-anise', 'cinnamon', 'sichuan-peppercorn', 'make-ahead', 'street-food', 'cold-snack'],
    seo_title: 'Chinese Tea Eggs (茶叶蛋) — Marbled Soy and Spice Eggs',
    meta_description: 'Chinese tea eggs with a soft, jammy yolk and a fragrant soy-tea-spice brine. The street food snack that looks as beautiful as it tastes.',
    published: true,
  },
  {
    title: 'Daegu-jeon (대구전)',
    slug: 'daegu-jeon',
    subtitle: 'Korean pan-fried cod fillets coated in flour and egg batter with scallion and chili, served with a soy-vinegar dipping sauce',
    cultural_origin: 'Korea',
    tradition: 'Cross-Cultural',
    headnote:
      'Jeon is the Korean word for a whole category of pan-fried dishes where ingredients are coated in flour, dipped in beaten egg, and cooked in a thin layer of oil until golden on both sides. The technique is one of the foundations of Korean home cooking, applied to everything from zucchini to mung beans to fish. Daegu-jeon uses cod, and it is one of the most elegant versions, the kind that appears at holiday tables during Lunar New Year and Chuseok alongside towers of other carefully prepared banchan.\n\nThe method is straightforward. Pieces of cod are tossed in flour, then dipped in beaten egg that has been studded with chopped scallion and red chili pepper. They go into a pan with a thin layer of oil and cook until the egg sets into a golden crust, about two minutes per side. The flour layer between the fish and the egg is what holds everything together. Without it, the egg slides off. With it, you get a thin, crispy shell around tender, flaky fish.\n\nThe result is delicate rather than heavy. This is not deep-fried fish. The coating is barely there, more like a second skin than a batter. The cod stays moist inside, and the scallion and chili in the egg add color and a faint sharpness without overwhelming the mild fish. A dipping sauce of soy sauce and vinegar is the only accompaniment it needs. It is the kind of dish that looks fussy but is actually one of the fastest things you can put on a table once you understand the three-step coating process.',
    yield: '4 servings',
    prep_time: '10 minutes',
    cook_time: '15 minutes',
    total_time: '25 minutes',
    difficulty: 'Easy',
    ingredients: [
      { amount: '14', unit: 'oz', ingredient: 'cod fillets', prep_note: 'cut into bite-sized pieces, about 400g', optional: false },
      { amount: '1', unit: 'cup', ingredient: 'all-purpose flour', prep_note: null, optional: false },
      { amount: '2', unit: null, ingredient: 'large eggs', prep_note: null, optional: false },
      { amount: '1', unit: 'pinch', ingredient: 'salt', prep_note: null, optional: false },
      { amount: '1', unit: 'pinch', ingredient: 'ground black pepper', prep_note: null, optional: false },
      { amount: '1', unit: null, ingredient: 'green onion (scallion)', prep_note: 'finely chopped', optional: false },
      { amount: '1', unit: null, ingredient: 'red chili pepper', prep_note: 'finely chopped', optional: true },
      { amount: null, unit: null, ingredient: 'vegetable oil', prep_note: 'for pan-frying', optional: false },
      { amount: '2', unit: 'tbsp', ingredient: 'soy sauce', prep_note: 'for dipping sauce', optional: false },
      { amount: '1-2', unit: 'tbsp', ingredient: 'rice vinegar', prep_note: 'for dipping sauce', optional: false },
      { amount: null, unit: null, ingredient: 'lettuce leaves', prep_note: 'for serving', optional: true },
    ],
    instructions: [
      { step: 1, text: 'Season and flour the cod. Pat the cod pieces dry with a paper towel and season lightly with salt and pepper. Place the flour in a wide, shallow bowl. Add the cod pieces and toss until each piece is lightly and evenly coated. Shake off excess flour.' },
      { step: 2, text: 'Prepare the egg wash. Beat the eggs in a shallow bowl with a pinch of salt. Stir in the chopped scallion and red chili pepper.' },
      { step: 3, text: 'Pan-fry. Heat a large non-stick skillet over medium-high heat. Add about 1 tablespoon of oil. One piece at a time, dip each flour-coated cod piece into the egg mixture and place gently into the pan. Reduce heat to medium. Cook until the bottom is golden, about 2 minutes, then turn carefully. Cook the other side until golden, about 2 more minutes. Add more oil as needed between batches.' },
      { step: 4, text: 'Make the dipping sauce. Stir together the soy sauce and vinegar in a small dish.' },
      { step: 5, text: 'Serve. Line a plate with lettuce leaves and arrange the cooked fish on top. Serve with the dipping sauce on the side.' },
    ],
    key_ingredient_benefits:
      '**Cod:** A lean white fish with about 20 grams of protein and less than 1 gram of fat per 100-gram serving. An excellent source of vitamin B12, phosphorus, selenium, and iodine. In Korean food culture, fish jeon dishes appear at celebrations because fish symbolizes abundance and prosperity.\n\n**Eggs:** The egg coating adds protein and creates a barrier that keeps the fish moist during cooking.\n\n**Vinegar:** The acidity in the dipping sauce cuts through the richness of the fried coating and brightens the mild flavor of the cod. Vinegar also stimulates digestive enzymes.',
    why_this_works:
      'The flour creates a dry, starchy layer that the egg clings to. Without it, the wet egg would slide off the fish. The flour also absorbs surface moisture, preventing steaming and promoting browning. The egg cooks into a thin golden shell that seals in moisture. Medium heat gives the egg time to set while the cod cooks through evenly.',
    substitutions: 'Any firm, mild white fish works: halibut, haddock, or pollock. Replace flour with rice flour for gluten-free. Omit the red chili for a milder version. Add gochugaru to the dipping sauce for heat.',
    serving_suggestions: 'Serve as banchan alongside steamed rice, kimchi, and other side dishes. Pairs well with doenjang-jjigae, seaweed soup, or as part of a holiday spread with japchae and galbi-jjim.',
    storage_reheating: 'Store in an airtight container for up to 2 days. Reheat in a dry skillet over medium heat for 1 to 2 minutes per side to re-crisp. Freezes well: freeze in a single layer, then bag. Reheat from frozen at 375°F for 8 to 10 minutes.',
    cultural_notes: 'Jeon is a category of Korean pan-fried dishes served as banchan. Daegu-jeon is a traditional side dish commonly prepared for holidays and ancestral rites (jesa), including Lunar New Year and Chuseok.',
    tags: ['korean', 'fish', 'cod', 'jeon', 'pancake', 'pan-fried', 'banchan', 'holiday', 'lunar-new-year', 'chuseok', 'gluten-free-adaptable'],
    seo_title: 'Daegu-jeon (대구전) — Korean Pan-Fried Cod',
    meta_description: 'Korean pan-fried cod coated in flour and egg with scallion and chili. A traditional banchan served at holidays and celebrations, ready in 25 minutes.',
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
