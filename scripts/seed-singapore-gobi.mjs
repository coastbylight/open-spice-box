import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const recipes = [
  {
    title: 'Singapore Noodles (星洲炒米)',
    slug: 'singapore-noodles',
    subtitle: 'Curry-spiced rice vermicelli stir-fried with shrimp, char siu, egg ribbons, and bell pepper, the Cantonese takeout classic done right',
    cultural_origin: 'China',
    tradition: 'Cross-Cultural',
    headnote:
      'Singapore noodles have nothing to do with Singapore. You will not find them on menus there. The dish is a creation of Cantonese and Hong Kong restaurant kitchens, named for a country rather than born in one, the way General Tso\'s chicken has no connection to the actual General Tso. What it does have is curry powder, which is the ingredient that makes it unlike anything else on a Chinese takeout menu.\n\nThe curry powder goes into a sauce with soy sauce, Shaoxing wine, and white pepper, and that sauce gets tossed with thin rice vermicelli noodles, shrimp, sliced char siu pork, and egg that has been cooked into a thin omelet, rolled up, and sliced into ribbons. The result is a tangle of golden noodles that are savory and aromatic and faintly spicy, with enough going on in every bite that you never get bored.\n\nThe technique requires a hot wok and some confidence. Rice vermicelli is delicate and can clump or stick if you hesitate, so everything needs to be prepped and ready before you start cooking. The proteins cook first and come out. The aromatics go in. The noodles and sauce follow. Then everything gets tossed back together in the final minute. The whole stir-fry takes about ten minutes, which means the prep takes longer than the cooking. That is normal for wok cooking. The work is in the chopping, not the flame.',
    yield: '2 generous servings',
    prep_time: '15 minutes',
    cook_time: '10 minutes',
    total_time: '25 minutes',
    difficulty: 'Medium',
    ingredients: [
      { amount: '2', unit: 'tbsp', ingredient: 'soy sauce', prep_note: 'light or all-purpose, not dark', optional: false },
      { amount: '2', unit: 'tbsp', ingredient: 'Shaoxing wine', prep_note: null, optional: false },
      { amount: '2 1/2', unit: 'tsp', ingredient: 'curry powder', prep_note: null, optional: false },
      { amount: '1/2', unit: 'tsp', ingredient: 'sugar', prep_note: null, optional: false },
      { amount: '1/2', unit: 'tsp', ingredient: 'ground white pepper', prep_note: null, optional: false },
      { amount: '3.5', unit: 'oz', ingredient: 'dried rice vermicelli noodles', prep_note: 'about 100g', optional: false },
      { amount: '2', unit: 'tbsp', ingredient: 'peanut oil', prep_note: 'divided', optional: false },
      { amount: '8-10', unit: null, ingredient: 'medium raw shrimp', prep_note: 'shelled and deveined', optional: false },
      { amount: '2', unit: null, ingredient: 'large eggs', prep_note: 'beaten', optional: false },
      { amount: '1/2', unit: null, ingredient: 'medium onion', prep_note: 'thinly sliced', optional: false },
      { amount: '4', unit: null, ingredient: 'garlic cloves', prep_note: 'minced', optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'fresh ginger', prep_note: 'grated', optional: false },
      { amount: '1/2', unit: 'lb', ingredient: 'Chinese barbecue pork (char siu)', prep_note: 'thinly sliced, about 225g', optional: false },
      { amount: '1', unit: null, ingredient: 'red bell pepper', prep_note: 'cut into thin strips', optional: false },
      { amount: '2', unit: 'tsp', ingredient: 'hot green pepper', prep_note: 'thinly sliced', optional: true },
    ],
    instructions: [
      { step: 1, text: 'Prepare the sauce. Combine the soy sauce, Shaoxing wine, curry powder, sugar, and white pepper in a small bowl. Stir well and set aside.' },
      { step: 2, text: 'Soak the noodles. Place the rice vermicelli in a large bowl and cover with boiling water. Soak according to package directions until softened but still slightly firm, usually 3 to 5 minutes. Drain well and set aside.' },
      { step: 3, text: 'Cook the shrimp. Heat 1 tablespoon of oil in a wok over medium-high heat. Add the shrimp and cook until just pink and curled into a C shape, about 2 to 3 minutes. Remove and set aside.' },
      { step: 4, text: 'Make the egg ribbons. In the same wok, pour in the beaten eggs and swirl to form a thin omelet. Once set, roll it up with a spatula, slide it out, and slice the roll into thin ribbons. Set aside.' },
      { step: 5, text: 'Stir-fry the aromatics. Return the wok to medium-high heat with the remaining 1 tablespoon of oil. Add the garlic, ginger, and onion. Cook for 2 minutes until the onion softens. Add the bell pepper and cook for 1 more minute.' },
      { step: 6, text: 'Toss everything together. Add the drained noodles and the sauce to the wok. Toss vigorously to coat. Add the shrimp, egg ribbons, char siu, and green pepper if using. Toss for 1 to 2 minutes until everything is heated through and the sauce is evenly distributed.' },
      { step: 7, text: 'Serve immediately.' },
    ],
    key_ingredient_benefits:
      '**Curry Powder:** The turmeric in curry powder provides curcumin, one of the most studied natural anti-inflammatory compounds. The combination of cumin, coriander, and fenugreek in most curry blends reflects spice combinations that Ayurvedic tradition considers digestive and warming.\n\n**Shrimp:** A lean protein source high in selenium, B12, and iodine. Shrimp also contains astaxanthin, a carotenoid studied for antioxidant properties.\n\n**Rice Vermicelli:** Made from rice flour and water, these noodles are naturally gluten-free and lighter than wheat noodles.',
    why_this_works:
      'Curry powder marries surprisingly well with soy sauce and Shaoxing wine, creating a flavor profile that is neither purely Chinese nor purely South Asian. The turmeric gives the noodles their golden color. Rice vermicelli absorbs sauce quickly, so the sauce is concentrated rather than voluminous. Cooking components separately and combining at the end ensures nothing is overcooked.',
    substitutions: 'Replace char siu with diced chicken, bacon, ham, or Chinese sausage. Chicken or firm tofu can replace shrimp. Dry sherry substitutes for Shaoxing wine. Any thin rice noodle works.',
    serving_suggestions: 'Singapore noodles are a complete meal on their own. For a bigger spread, serve alongside egg drop soup or bok choy in ginger sauce.',
    storage_reheating: 'Store for up to 2 days. Reheat in a hot wok with a splash of water or soy sauce. Freezing is not recommended for rice vermicelli.',
    cultural_notes: 'Despite the name, Singapore noodles are not from Singapore. The dish is a creation of Cantonese and Hong Kong restaurant kitchens, popularized in Western Chinese restaurants. The signature curry powder gives it a flavor unlike any other dish on a Chinese takeout menu.',
    tags: ['chinese', 'cantonese', 'noodles', 'curry', 'shrimp', 'char-siu', 'stir-fry', 'rice-vermicelli', 'weeknight', 'street-food'],
    seo_title: 'Singapore Noodles (星洲炒米) — Curry Rice Vermicelli Stir-Fry',
    meta_description: 'Singapore noodles with curry-spiced rice vermicelli, shrimp, char siu, and egg. The Cantonese takeout favorite made at home in 25 minutes.',
    published: true,
  },
  {
    title: 'Gobi Manchurian',
    slug: 'gobi-manchurian',
    subtitle: 'Crispy battered cauliflower tossed in a tangy, sweet, and spicy Indo-Chinese sauce of soy, chili, and vinegar',
    cultural_origin: 'India',
    tradition: 'Cross-Cultural',
    headnote:
      'Indo-Chinese food is one of those cuisines that exists because two cultures collided in a kitchen and decided to keep going. It was born in the Chinese communities of Kolkata and Mumbai, where Chinese cooking techniques met Indian ingredients and Indian appetites. The result is a category of food that sounds Chinese and tastes Indian, or maybe the other way around. Gobi Manchurian is its most famous creation, and it appears on street carts and restaurant menus across India in quantities that dwarf most actual Chinese dishes in popularity.\n\nThe dish is cauliflower florets dipped in a batter of flour and cornstarch, deep-fried until shatteringly crisp, and then tossed in a sauce built from soy sauce, chili sauce, vinegar, and garlic. The sauce is the key. It hits sweet, sour, salty, and spicy simultaneously, and it clings to the cratered surface of the fried cauliflower like it was designed for exactly that purpose. The contrast between the crunchy batter and the sticky, punchy sauce is what makes the dish addictive.\n\nThere are two versions: dry and gravy. The dry version, which is what this recipe produces, is an appetizer or snack, meant to be eaten with toothpicks or fingers alongside drinks or as a starter before fried rice and hakka noodles. The gravy version adds more liquid to the sauce and is served over rice. Both are good. The dry version is more popular because the crunch lasts longer. Make it, eat it fast, and do not apologize for the pile of napkins.',
    yield: '3 servings',
    prep_time: '10 minutes',
    cook_time: '25 minutes',
    total_time: '35 minutes',
    difficulty: 'Medium',
    ingredients: [
      { amount: '1', unit: null, ingredient: 'small head cauliflower', prep_note: 'about 500g, cut into medium florets', optional: false },
      { amount: '1/2', unit: 'cup', ingredient: 'all-purpose flour', prep_note: 'about 65g', optional: false },
      { amount: '1/4', unit: 'cup', ingredient: 'cornstarch', prep_note: 'about 32g', optional: false },
      { amount: '1/2-1', unit: 'tsp', ingredient: 'Kashmiri red chili powder', prep_note: 'optional, for color', optional: true },
      { amount: '1/4', unit: 'tsp', ingredient: 'ground black pepper', prep_note: null, optional: false },
      { amount: '1/4', unit: 'tsp', ingredient: 'salt', prep_note: 'for batter', optional: false },
      { amount: '1/2', unit: 'cup', ingredient: 'water', prep_note: 'for batter, or as needed', optional: false },
      { amount: null, unit: null, ingredient: 'oil', prep_note: 'for deep frying', optional: false },
      { amount: '1 1/2', unit: 'tbsp', ingredient: 'vegetable oil', prep_note: 'for sauce', optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'garlic', prep_note: 'finely chopped', optional: false },
      { amount: '1/2', unit: 'tbsp', ingredient: 'fresh ginger', prep_note: 'finely chopped', optional: false },
      { amount: '1', unit: null, ingredient: 'green chili', prep_note: 'chopped', optional: true },
      { amount: '1/3', unit: 'cup', ingredient: 'scallion whites', prep_note: 'finely chopped', optional: false },
      { amount: '1/4', unit: 'cup', ingredient: 'bell pepper', prep_note: 'finely chopped', optional: true },
      { amount: '1', unit: 'tbsp', ingredient: 'soy sauce', prep_note: null, optional: false },
      { amount: '2-3', unit: 'tbsp', ingredient: 'red chili sauce', prep_note: 'adjust to taste', optional: false },
      { amount: '1-2', unit: 'tbsp', ingredient: 'tomato ketchup', prep_note: null, optional: true },
      { amount: '1/2', unit: 'tbsp', ingredient: 'rice vinegar', prep_note: null, optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'sugar', prep_note: null, optional: false },
      { amount: '1/2-3/4', unit: 'tsp', ingredient: 'ground black pepper', prep_note: 'for sauce', optional: false },
      { amount: '3-4', unit: 'tbsp', ingredient: 'water', prep_note: 'for sauce', optional: false },
      { amount: '2', unit: 'tbsp', ingredient: 'scallion greens', prep_note: 'chopped, for garnish', optional: false },
    ],
    instructions: [
      { step: 1, text: 'Prepare the cauliflower. Cut into medium-sized florets. Soak in slightly hot water for 5 minutes, drain, rinse with cold water, and pat dry thoroughly with a clean cloth or paper towels. Any moisture will prevent crisping.' },
      { step: 2, text: 'Make the batter. Combine the flour, cornstarch, chili powder, black pepper, and salt in a bowl. Add water gradually, stirring until you have a smooth, free-flowing batter with no lumps.' },
      { step: 3, text: 'Fry the cauliflower. Heat oil for deep frying over medium heat. Test by dropping a small amount of batter into the oil; it should sizzle and rise without browning immediately. Coat the florets in batter and drop them one by one into the oil. Do not stir for the first 1 to 2 minutes. Fry until golden and crisp, then drain on paper towels. Repeat in batches.' },
      { step: 4, text: 'Make the sauce. Heat 1 1/2 tablespoons of oil in a wide pan or wok over high heat. Add garlic, ginger, and green chili. Saute for 1 to 2 minutes. Add scallion whites and bell pepper and cook on high for 2 minutes.' },
      { step: 5, text: 'Add the sauce liquids. Stir together the soy sauce, chili sauce, ketchup, vinegar, and sugar. Pour into the pan with the water. Cook, stirring, until the sauce thickens and becomes glossy. Add black pepper. Taste and adjust the balance of tangy, sweet, and hot.' },
      { step: 6, text: 'Toss and serve. Let the sauce cool for 1 to 2 minutes so it does not soften the batter immediately. Add the fried cauliflower and toss gently to coat. Garnish with scallion greens. Serve immediately while still crisp.' },
    ],
    key_ingredient_benefits:
      '**Cauliflower:** A cruciferous vegetable rich in vitamin C, vitamin K, and fiber. Contains sulforaphane and indole-3-carbinol, compounds studied for supporting detoxification pathways and potential anti-cancer properties. In Ayurveda, cauliflower benefits from warming spices and oil to balance its vata-aggravating qualities.\n\n**Ginger and Garlic:** The aromatics that bridge Indian and Chinese cooking traditions. Ginger\'s gingerols and garlic\'s allicin both have documented anti-inflammatory properties.\n\n**Soy Sauce:** The fermented soybean condiment anchoring the dish in its Chinese roots, providing glutamate, amino acids, and antioxidants from fermentation.',
    why_this_works:
      'The batter combines flour for structure and cornstarch for crunch. Drying the cauliflower prevents steam during frying that would soften the coating. The Manchurian sauce achieves its flavor through balancing soy (salt/umami), chili sauce (heat/sweetness), vinegar (acidity), and sugar. Letting the sauce cool briefly before adding the cauliflower preserves the crust.',
    substitutions: 'For gravy version, triple the sauce quantities and add 3/4 tbsp cornstarch mixed with 1 cup water. Paneer, baby corn, or mushrooms can replace cauliflower. Bake at 425°F for 25 minutes for a less oily version.',
    serving_suggestions: 'Serve as an appetizer with toothpicks alongside drinks, or as a starter before hakka noodles or vegetable fried rice. In Indo-Chinese restaurants, it appears alongside chili paneer, spring rolls, and manchow soup.',
    storage_reheating: 'Store fried cauliflower and sauce separately for up to 2 days. Reheat cauliflower in oven at 400°F for 8 to 10 minutes to restore crunch, then toss with warmed sauce. Freezing not recommended.',
    cultural_notes: 'Gobi Manchurian is the signature dish of Indo-Chinese cuisine, born in the Chinese communities of Kolkata and Mumbai where Chinese cooking techniques met Indian tastes. It is one of the most popular street food and restaurant appetizers across India.',
    tags: ['indian', 'indo-chinese', 'cauliflower', 'gobi', 'fried', 'appetizer', 'street-food', 'vegan', 'spicy', 'tangy', 'snack'],
    seo_title: 'Gobi Manchurian — Crispy Indo-Chinese Cauliflower',
    meta_description: 'Crispy fried cauliflower tossed in a tangy, sweet, spicy Manchurian sauce. The Indo-Chinese street food favorite, ready in 35 minutes.',
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
