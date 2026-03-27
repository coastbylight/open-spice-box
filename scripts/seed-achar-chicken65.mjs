import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const recipes = [
  {
    title: 'Chicken Achar',
    slug: 'chicken-achar',
    subtitle: 'Pickle-spiced chicken braised in smoked mustard oil with fenugreek seeds and vinegar, the Punjabi dish that turns condiment logic into a main course',
    cultural_origin: 'India',
    tradition: 'Ayurveda',
    headnote:
      'Achar is the Urdu and Hindi word for pickle, and across South Asia, pickle is not a cucumber in brine. It is a category unto itself: vegetables or fruit preserved in mustard oil with a heavy hand of whole spices, chili, and something sour. Every household has its own recipe, its own jar, its own opinions about whose mother\'s mango achar is the best. Chicken achar takes that entire flavor system and applies it to fresh chicken, cooking the meat in the same spices and fat that would normally preserve raw mangoes for a year.\n\nThe dish starts with mustard oil, and the mustard oil starts with a ritual. You heat it until it smokes, a gray haze rising from the surface as the harsh, acrid compounds in the raw oil burn off. Then you turn off the heat completely and let it cool for a few minutes. Then you bring it back to heat and add the fenugreek seeds. This smoking and cooling process is not optional. Raw mustard oil tastes bitter and unpleasant. Smoked mustard oil is pungent, warm, and deeply aromatic, with a sinus-clearing sharpness that no other cooking fat can replicate.\n\nThe fenugreek seeds are used sparingly, a heaped teaspoon at most. They provide the bitter, maple-like undertone that makes anything taste like achar. The ginger-garlic-onion paste cooks down until nearly dry before the chicken goes in, which concentrates the flavors and prevents a watery gravy. The vinegar is added at the end, after the heat is off, so its sharpness stays intact. This is a family recipe from a Punjabi kitchen, the kind of dish that gets made without measuring and tastes slightly different every time, which is part of the point.',
    yield: '4 to 6 servings',
    prep_time: '15 minutes',
    cook_time: '30 minutes',
    total_time: '45 minutes',
    difficulty: 'Medium',
    ingredients: [
      { amount: '2.2', unit: 'lbs', ingredient: 'chicken', prep_note: 'bone-in pieces preferred, or boneless thighs cut into large chunks (1 kg)', optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'salt', prep_note: 'for marinade', optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'red chili powder', prep_note: 'for marinade', optional: false },
      { amount: '1/2', unit: 'cup', ingredient: 'mustard oil', prep_note: 'about 120 ml', optional: false },
      { amount: '1', unit: 'heaped tsp', ingredient: 'fenugreek seeds', prep_note: 'methi dana', optional: false },
      { amount: '9', unit: 'oz', ingredient: 'onion', prep_note: 'made into a paste or very finely chopped (250g)', optional: false },
      { amount: '3.5', unit: 'oz', ingredient: 'ginger-garlic paste', prep_note: 'roughly equal parts ginger and garlic (100g)', optional: false },
      { amount: '2', unit: null, ingredient: 'long dried red chilies', prep_note: 'whole', optional: false },
      { amount: null, unit: null, ingredient: 'salt and red chili powder', prep_note: 'to taste', optional: false },
      { amount: '2-3', unit: 'tbsp', ingredient: 'malt vinegar', prep_note: 'white vinegar works fine', optional: false },
    ],
    instructions: [
      { step: 1, text: 'Marinate the chicken. Rub the chicken pieces with the salt and chili powder. Set aside while you prepare the rest.' },
      { step: 2, text: 'Smoke the mustard oil. Pour the mustard oil into a wok or kadai and heat it over high heat until it begins to smoke, a visible gray haze rising from the surface. This takes 3 to 4 minutes. Turn the heat off completely and let the oil cool for 3 to 4 minutes.' },
      { step: 3, text: 'Bloom the fenugreek. Turn the heat back on to medium for about 20 seconds. Add the fenugreek seeds. They will darken quickly, turning reddish-brown in about 30 seconds. Stir constantly. Do not let them blacken.' },
      { step: 4, text: 'Cook the base. Add the ginger-garlic paste and onion paste. Add the whole dried red chilies and a little salt and chili powder. Lower the heat and cook until most of the water has evaporated and the paste has thickened, about 10 to 12 minutes. The oil should start to separate.' },
      { step: 5, text: 'Braise the chicken. Add the marinated chicken to the wok while the heat is still low. Stir to coat. Cover with a lid and cook for about 10 minutes for boneless, 20 to 25 minutes for bone-in, stirring once or twice. The chicken will release its own liquid. Do not add water.' },
      { step: 6, text: 'Add the vinegar and finish. Turn off the heat. Add the vinegar and stir through. Cover and let sit for at least 5 minutes before serving. The dish is even better the next day.' },
    ],
    key_ingredient_benefits:
      '**Mustard Oil:** Rich in monounsaturated and polyunsaturated fats, including alpha-linolenic acid (an omega-3 fatty acid). Used in Ayurvedic medicine for centuries as a warming oil to stimulate digestion and circulation. The smoking process burns off allyl isothiocyanate, transforming the harsh raw oil into a pungent, deeply flavored cooking fat.\n\n**Fenugreek Seeds (Methi Dana):** One of the most clinically studied plants for blood sugar management. Multiple randomized trials show fenugreek reduces fasting glucose and improves insulin sensitivity. In Ayurveda, fenugreek is classified as heating, used to stimulate digestive fire. The seeds provide the bitter, maple-like signature of achari cooking.\n\n**Vinegar:** Added off-heat to preserve its volatile acidity. The sourness connects this cooked dish to the raw, pungent world of actual South Asian pickle, where acid serves as both preservative and flavoring agent.',
    why_this_works:
      'The smoking and cooling of mustard oil volatilizes allyl isothiocyanate, the compound that makes raw mustard oil harsh. What remains is pungent, warm, and deeply aromatic. Fenugreek seeds in small quantities provide the bitter-sweet depth that defines achari flavor. Cooking the onion-ginger-garlic paste until nearly dry (bhuno) concentrates the aromatics into an intense paste. Adding vinegar off-heat preserves its sharp tang. The three non-negotiable elements of achari cooking are mustard oil, whole pickling spices, and a sour element.',
    substitutions: 'For full achari spice blend, add 1 tsp each mustard seeds, nigella seeds (kalonji), fennel seeds, and cumin seeds with the fenugreek. Lemon juice or amchur (dried mango powder) can replace vinegar. Boneless thighs cook in 10 minutes vs 20-25 for bone-in. Without mustard oil, use vegetable oil plus mustard powder and a drizzle of mustard oil at the end. Some Punjabi versions add 2-3 pureed tomatoes for a thicker gravy.',
    serving_suggestions: 'Serve with hot naan, paratha, or roti. For a complete Punjabi meal, add steamed basmati rice, a simple dal, and a cooling raita of yogurt with cucumber and mint.',
    storage_reheating: 'Store for up to 4 days. The flavor improves significantly overnight. Warm gently in a covered pan. The mustard oil may solidify when cold, which is normal. Freezes well for up to 2 months.',
    cultural_notes: 'Achar (pickle) is a cornerstone of South Asian cuisine. Chicken achar takes the entire flavor system of mustard oil pickling and applies it to fresh chicken. It is a winter dish in many households, as mustard oil is considered warming. The flavor improves the next day, making it ideal for dinner parties.',
    tags: ['indian', 'punjabi', 'pakistani', 'chicken', 'pickle', 'achari', 'mustard-oil', 'fenugreek', 'bone-in', 'spicy', 'comfort-food', 'winter', 'gluten-free', 'dairy-free'],
    seo_title: 'Chicken Achar — Pickle-Spiced Chicken in Mustard Oil',
    meta_description: 'Chicken achar braised in smoked mustard oil with fenugreek seeds, ginger-garlic, and vinegar. The Punjabi pickle-spiced chicken that tastes better the next day.',
    published: true,
  },
  {
    title: 'Chicken 65',
    slug: 'chicken-65',
    subtitle: 'Chennai\'s famous deep-fried chicken tossed in a crackling tempering of curry leaves, mustard seeds, green chilies, and garlic',
    cultural_origin: 'India',
    tradition: 'Ayurveda',
    headnote:
      'The story goes that Chicken 65 was invented in 1965 at Buhari Hotel on Mount Road in Chennai, and that the number was simply the item\'s position on the menu. The restaurant later added Chicken 78 and Chicken 82, following the same logic. Whether the origin story is precisely true matters less than the fact that the dish became one of the most popular appetizers in India, traveling from Chennai to Hyderabad to every Indian restaurant with a tandoor section and a drinks menu.\n\nWhat makes Chicken 65 different from other fried chicken is what happens after the frying. The chicken comes out of the oil golden and crispy, looking like any good fritter. Then it goes into a wok with a small amount of oil where mustard seeds are crackling, curry leaves are crisping, green chilies are sizzling, and garlic is turning golden. This tempering, this tadka, is what transforms fried chicken into Chicken 65. The curry leaves shatter between your teeth with a nutty, citrusy intensity. The mustard seeds pop with sharp, pungent heat. The green chilies add a fresh, grassy fire that is completely different from the dried chili heat already in the marinade.\n\nThe marinade itself is yogurt-based, which is the South Asian solution to tender fried chicken. The lactic acid in the yogurt breaks down the surface proteins gently, making the chicken tender without the mushiness that vinegar or citrus can cause. A whole egg goes in to bind the coating, along with cornstarch for crunch and enough chili powder to turn everything a deep, warning red. The chicken marinates for at least a couple of hours, though overnight is better. Then it fries fast in small batches and finishes in the tadka. The whole second phase takes about two minutes. Serve it with sambar and rice and do not expect leftovers.',
    yield: '4 servings',
    prep_time: '2 hours',
    cook_time: '25 minutes',
    total_time: '2 hours 25 minutes',
    difficulty: 'Medium',
    ingredients: [
      { amount: '1.1', unit: 'lbs', ingredient: 'boneless chicken', prep_note: 'thighs preferred, cut into big chunks or strips (500g)', optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'plain yogurt', prep_note: null, optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'red chili powder', prep_note: 'Kashmiri for color, regular for heat', optional: false },
      { amount: null, unit: null, ingredient: 'salt', prep_note: 'to taste', optional: false },
      { amount: '2', unit: 'tsp', ingredient: 'ginger-garlic paste', prep_note: null, optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'turmeric', prep_note: null, optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'cornstarch', prep_note: null, optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'garam masala', prep_note: null, optional: false },
      { amount: '1', unit: null, ingredient: 'large egg', prep_note: null, optional: false },
      { amount: null, unit: null, ingredient: 'oil', prep_note: 'for deep frying', optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'oil', prep_note: 'for tempering', optional: false },
      { amount: '1/2', unit: 'tsp', ingredient: 'mustard seeds', prep_note: null, optional: false },
      { amount: '20-25', unit: null, ingredient: 'fresh curry leaves', prep_note: 'torn from the stem', optional: false },
      { amount: '5-6', unit: null, ingredient: 'green chilies', prep_note: 'slit lengthwise and cut into 2-inch pieces', optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'fresh yogurt', prep_note: 'curd, for finishing', optional: false },
      { amount: null, unit: null, ingredient: 'red chili powder', prep_note: 'optional, for extra color', optional: true },
    ],
    instructions: [
      { step: 1, text: 'Marinate the chicken. Combine the chicken with yogurt, red chili powder, salt, ginger-garlic paste, turmeric, cornstarch, garam masala, and egg. Mix thoroughly until every piece is evenly coated. Cover and refrigerate for at least 2 hours, ideally overnight.' },
      { step: 2, text: 'Deep fry the chicken. Heat oil for deep frying over medium-high heat. Fry in small batches, 5 to 6 pieces at a time, for 4 to 5 minutes per batch until golden and crispy. They should come out looking like golden fritters. Drain on paper towels. Repeat until all the chicken is fried.' },
      { step: 3, text: 'Make the tempering. In the same pan with about 1 tablespoon of oil (pour out the excess), heat over high heat. Add the mustard seeds and wait for them to crackle. Add the torn curry leaves and slit green chilies. Toss for 15 to 20 seconds until the curry leaves are crisp.' },
      { step: 4, text: 'Toss the chicken. Add all the fried chicken back into the pan. Toss vigorously to coat every piece with the tempering. Add the tablespoon of fresh yogurt and toss again. If not red enough, dust in more chili powder.' },
      { step: 5, text: 'Serve immediately with sambar and rice, or on its own with onion rings and lemon wedges.' },
    ],
    key_ingredient_benefits:
      '**Curry Leaves:** Rich in carbazole alkaloids studied for antioxidant and anti-inflammatory properties. In Ayurveda, curry leaves stimulate digestive fire (agni), relieve indigestion and nausea, and support liver function. Traditionally also used in hair oils to prevent premature graying. The brief frying preserves aromatic compounds while making them crisp enough to eat whole.\n\n**Mustard Seeds:** When crackled in hot oil, they release isothiocyanates with antimicrobial and anti-inflammatory properties. In Ayurveda, mustard seeds are warming, used to stimulate digestion and circulation.\n\n**Yogurt:** The lactic acid gently denatures surface proteins, tenderizing the chicken without harshness. Yogurt marinades have been used across South and Central Asia for thousands of years.',
    why_this_works:
      'The yogurt marinade tenderizes the chicken while the egg and cornstarch create a crispy coating that sets during frying. Frying in small batches maintains oil temperature for a crispy result. The tempering (tadka) is what makes this Chicken 65 rather than generic fried chicken. Mustard seeds, curry leaves, and green chilies provide three different kinds of heat: sharp pungency, nutty warmth, and fresh grassy burn, layered on top of the dried chili heat in the marinade.',
    substitutions: 'For bone-in, use drumsticks or wings and fry 7-8 minutes. Replace the egg with 2 tbsp rice flour for egg-free. Paneer or cauliflower can replace chicken for vegetarian versions. Kashmiri chili powder gives the deep red color without extreme heat.',
    serving_suggestions: 'Serve with sambar and steamed rice for a South Indian meal, or on its own as a drinking snack with sliced raw onion and lemon wedges. Also excellent in a paratha wrap with onions and mint chutney.',
    storage_reheating: 'Store for up to 2 days. Reheat in oven at 400°F for 8-10 minutes. Freeze fried chicken (before tempering) for up to 2 months; do the tadka fresh when serving.',
    cultural_notes: 'Chicken 65 was reportedly invented in 1965 at Buhari Hotel in Chennai. The number referred to its menu position. The restaurant later created Chicken 78, 82, and 90 following the same logic. The dish traveled from Chennai to Hyderabad, where it was adapted to local tastes with more yogurt and green chilies, becoming the most popular version nationwide.',
    tags: ['indian', 'south-indian', 'chennai', 'chicken', 'fried', 'appetizer', 'snack', 'curry-leaves', 'mustard-seeds', 'spicy', 'street-food'],
    seo_title: 'Chicken 65 — Chennai\'s Legendary Fried Chicken',
    meta_description: 'Chicken 65 with a yogurt-spice marinade, deep-fried golden, then tossed in a curry leaf and mustard seed tempering. The Chennai street food legend, made at home.',
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
