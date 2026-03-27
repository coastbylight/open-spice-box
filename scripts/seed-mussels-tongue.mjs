import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const recipes = [
  {
    title: 'Thai Coconut Curry Mussels',
    slug: 'thai-coconut-curry-mussels',
    subtitle: 'Mussels steamed open in a rich coconut broth built on a pounded paste of cilantro, garlic, coriander, and green curry, finished with lime and fresh chili',
    cultural_origin: 'Thailand',
    tradition: 'Cross-Cultural',
    headnote:
      'Mussels are the fastest serious dinner you can cook. They go from raw to open in about three minutes, and the liquid they release as they steam becomes part of the sauce. Every other ingredient in the pot is really just a framework for catching that briny, mineral-rich mussel liquor and turning it into something you want to drink from the bowl after the shells are gone.\n\nThis version builds a Thai-style coconut curry broth. A paste of cilantro stems, garlic, shallot, coriander seeds, and dried chili gets pounded together and cooked in the thick cream skimmed from the top of a can of coconut milk. Green curry paste goes in next, followed by the rest of the coconut milk, fish sauce, palm sugar, and a stalk of lemongrass bruised to release its oils. The broth simmers for a few minutes until it smells like something you would order in a beach town in southern Thailand. Then the mussels go in, the lid goes on, and three minutes later dinner is ready.\n\nThe finish matters. Lime juice squeezed in at the last second, fresh cilantro leaves, and thin slices of a hot chili scattered over the top. The lime brightens the coconut fat, the cilantro adds freshness, and the chili provides a sharp heat that cuts through the richness. Serve it with crusty bread or steamed jasmine rice, something to soak up the broth, because the broth is the real point of the dish. The mussels are almost an excuse to make it.',
    yield: '3 to 4 servings',
    prep_time: '10 minutes',
    cook_time: '10 minutes',
    total_time: '20 minutes',
    difficulty: 'Easy',
    ingredients: [
      { amount: '8', unit: null, ingredient: 'sprigs fresh cilantro', prep_note: 'stems and leaves separated, both chopped', optional: false },
      { amount: '3', unit: null, ingredient: 'cloves garlic', prep_note: 'roughly chopped', optional: false },
      { amount: '2', unit: null, ingredient: 'small shallots', prep_note: 'roughly chopped', optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'whole coriander seeds', prep_note: null, optional: false },
      { amount: '1/2', unit: 'tsp', ingredient: 'dried Thai chilies or red chili flakes', prep_note: null, optional: false },
      { amount: '1', unit: null, ingredient: 'lime', prep_note: 'zested and juiced', optional: false },
      { amount: '14', unit: 'oz', ingredient: 'coconut milk', prep_note: 'one can, do not shake before opening', optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'vegetable oil', prep_note: null, optional: false },
      { amount: '1 1/2', unit: 'tbsp', ingredient: 'Thai green curry paste', prep_note: null, optional: false },
      { amount: '1', unit: null, ingredient: 'stalk lemongrass', prep_note: 'bruised and cut into 3 pieces', optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'palm sugar or brown sugar', prep_note: null, optional: false },
      { amount: '1 1/2', unit: 'tbsp', ingredient: 'fish sauce', prep_note: 'plus more to taste', optional: false },
      { amount: '2', unit: 'lbs', ingredient: 'mussels', prep_note: 'scrubbed and debearded', optional: false },
      { amount: '1', unit: null, ingredient: 'small Thai or serrano chili', prep_note: 'thinly sliced', optional: false },
    ],
    instructions: [
      { step: 1, text: 'Pound the aromatic paste. Combine the cilantro stems, half the garlic, half the shallot, the coriander seeds, dried chili, lime zest, and a pinch of salt in a mortar and pestle. Pound until a rough paste forms. A blender works too with a tablespoon of water.' },
      { step: 2, text: 'Build the broth. Scoop about 2 tablespoons of thick cream from the top of the coconut milk can into a large pot with the oil. Heat over medium heat until shimmering. Add the remaining garlic and shallot, the pounded paste, and the curry paste. Cook for about 3 minutes until very aromatic.' },
      { step: 3, text: 'Simmer. Pour in the rest of the coconut milk. Add the lemongrass, sugar, and fish sauce. Simmer for 3 to 4 minutes until rich and fragrant. Taste and adjust with more fish sauce if needed. Remove the lemongrass.' },
      { step: 4, text: 'Steam the mussels. Discard any cracked or open mussels. Add mussels to the broth, stir, and cover. Cook over medium-high heat, shaking the pan every 30 seconds. Mussels will open in 2 to 3 minutes. Discard any that do not open after 4 minutes.' },
      { step: 5, text: 'Finish. Stir in the lime juice, sliced fresh chili, and cilantro leaves. Ladle into wide bowls with plenty of broth. Serve with lime wedges and bread or rice.' },
    ],
    key_ingredient_benefits:
      '**Mussels:** One of the most nutrient-dense and sustainable seafood options. A 3-ounce serving provides about 20 grams of protein, over 100% daily B12, and significant iron, zinc, selenium, and omega-3 fatty acids. Farm-raised mussels have one of the lowest environmental footprints of any animal protein.\n\n**Coconut Milk:** The fat consists primarily of medium-chain triglycerides (MCTs) and serves as a carrier for fat-soluble aromatic compounds in the curry paste and spices.\n\n**Cilantro:** The stems contain more concentrated flavor than the leaves. Cilantro has been studied for potential heavy metal chelation properties and contains antioxidant compounds.',
    why_this_works:
      'Pounding the aromatics into a paste releases essential oils and creates concentrated flavor. Scooping the thick coconut cream and using it as cooking fat allows you to fry the aromatics at higher temperature, blooming their flavors in fat rather than steaming them. Mussels release briny liquor as they open, enriching the coconut broth in a way no amount of seasoning can replicate. Lemongrass adds a citrusy, floral bridge between the coconut richness and the mussel brininess.',
    substitutions: 'Littleneck or Manila clams work with the same timing. Shell-on shrimp (1 lb) can replace mussels, cooking 3-4 minutes. Red curry paste for green gives a sweeter, less herbaceous result. Without lemongrass, use extra lime zest and makrut lime leaf.',
    serving_suggestions: 'Serve with crusty bread or steamed jasmine rice to soak up the broth. A simple cucumber salad with rice vinegar and sesame oil provides a cool contrast.',
    storage_reheating: 'Store in broth for up to 1 day. Warm gently without boiling. The broth can be frozen without mussels for up to 2 months. Cooked mussels do not freeze well.',
    cultural_notes: 'This recipe applies Central Thai curry flavors to a one-pot mussel preparation. The coconut cream scooping technique is borrowed from traditional Thai curry-making, where the cream is used as a cooking fat to bloom the curry paste before the thinner milk is added.',
    tags: ['thai', 'seafood', 'mussels', 'coconut', 'curry', 'one-pot', 'quick', 'weeknight', 'gluten-free-adaptable', 'lemongrass'],
    seo_title: 'Thai Coconut Curry Mussels — One-Pot Steamed Mussels in Curry Broth',
    meta_description: 'Mussels steamed in a Thai coconut curry broth with lemongrass, lime, and fresh chili. Twenty minutes, one pot, and a bowl of broth worth fighting over.',
    published: true,
  },
  {
    title: 'My Favorite Japanese Beef Tongue Recipe',
    slug: 'japanese-beef-tongue',
    subtitle: 'Thin-sliced beef tongue hard-seared until deeply browned, finished with a sweet-savory sauce of oyster sauce, soy, lemon, ginger, and sesame oil over sauteed vegetables',
    cultural_origin: 'Japan',
    tradition: 'Cross-Cultural',
    headnote:
      'Gyutan, grilled beef tongue, is one of Japan\'s great regional specialties, originating in Sendai in the 1940s and spreading from there to dedicated gyutan restaurants across the country. In those restaurants, tongue is sliced thin, seasoned with salt, and grilled over charcoal until the edges char and the fat renders into something impossibly rich and tender. It is served with barley rice, pickled vegetables, and a bowl of oxtail soup, and it is one of those meals that changes the way you think about what meat can taste like.\n\nThis is a home version that takes the core idea, thin-sliced tongue seared hard in a hot pan, and finishes it with a sauce that pulls from both Japanese and Chinese flavors: oyster sauce for savory depth, soy sauce for salt, lemon juice for brightness, ginger and garlic for aromatic sharpness, and sesame oil to round everything out with its nutty warmth. The vegetables cook first and come out, the tongue goes in next.\n\nThe sear on the tongue is the most important step. You want the pan hot enough that the slices develop real color, a deep brown that borders on charred, on the first side. That is where the flavor lives. The second side gets a lighter treatment, just enough to cook it through. Then the sauce goes in and coats everything in a glossy, sweet-savory glaze. One thing: if you are starting with a whole tongue, you need to skin it first. Simmer it for about an hour until the thick outer skin loosens, then peel it off while still warm. The skin pulls away easily when hot and becomes nearly impossible when cold.',
    yield: '2 servings',
    prep_time: '15 minutes',
    cook_time: '10 minutes',
    total_time: '25 minutes',
    difficulty: 'Easy',
    ingredients: [
      { amount: '5', unit: 'oz', ingredient: 'beef tongue', prep_note: 'thinly sliced, skinned if starting from whole (150g)', optional: false },
      { amount: '1/2', unit: null, ingredient: 'medium onion', prep_note: 'sliced into thin half-moons', optional: false },
      { amount: '1/2', unit: null, ingredient: 'bell pepper', prep_note: 'sliced into thin strips', optional: false },
      { amount: '2', unit: 'tbsp', ingredient: 'vegetable oil', prep_note: 'divided', optional: false },
      { amount: '3', unit: 'tbsp', ingredient: 'oyster sauce', prep_note: null, optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'soy sauce', prep_note: null, optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'fresh lemon juice', prep_note: null, optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'sugar', prep_note: null, optional: false },
      { amount: '1', unit: null, ingredient: 'knob fresh ginger', prep_note: 'grated, about 1 tbsp', optional: false },
      { amount: '1', unit: null, ingredient: 'clove garlic', prep_note: 'thinly sliced', optional: false },
      { amount: '2', unit: 'tsp', ingredient: 'toasted sesame oil', prep_note: null, optional: false },
    ],
    instructions: [
      { step: 1, text: 'Mix the sauce. Combine the oyster sauce, soy sauce, lemon juice, sugar, grated ginger, sliced garlic, and sesame oil in a small bowl. Stir until the sugar dissolves.' },
      { step: 2, text: 'Saute the vegetables. Heat 1 tablespoon of oil in a frying pan over medium heat. Add the onion and bell pepper and cook for 2 to 3 minutes until softened. Pour about half the sauce over the vegetables and toss to coat. Transfer to a serving plate.' },
      { step: 3, text: 'Wipe and reheat the pan. Use a paper towel to wipe the pan clean. Add the remaining 1 tablespoon of oil and heat over high heat until the oil shimmers and just begins to smoke.' },
      { step: 4, text: 'Sear the tongue. Lay the tongue slices in the pan in a single layer. Do not move them. Let them sear undisturbed for about 1 to 1 1/2 minutes until a deep brown crust develops. You want real color, dark and caramelized. Turn each piece and cook the second side more gently, about 30 seconds to 1 minute.' },
      { step: 5, text: 'Sauce and finish. Pour the remaining sauce over the tongue and toss quickly for 20 to 30 seconds until every piece is glazed. Transfer onto the plate over the vegetables. Serve immediately.' },
    ],
    key_ingredient_benefits:
      '**Beef Tongue:** One of the most nutrient-dense organ meats. A 3-ounce serving provides about 16 grams of protein, over 100% daily B12, and significant iron, zinc, and niacin. In Japanese food culture, gyutan is prized as a delicacy. In traditional Chinese medicine, organ meats are considered nourishing to their corresponding organs.\n\n**Sesame Oil:** Toasted sesame oil contains sesamin and sesamolin, lignans with documented antioxidant and anti-inflammatory properties.\n\n**Ginger:** Fresh grated ginger releases gingerols directly into the sauce, providing both aromatic heat and digestive support.',
    why_this_works:
      'Thin slicing across the grain shortens muscle fibers, making dense tongue meat tender. The hard sear triggers aggressive Maillard reactions, creating deep flavor that no sauce can replicate. Searing the second side more gently prevents toughening. The sauce balances five flavors: oyster sauce (umami/sweetness), soy (salt/fermented depth), lemon (acid), sugar (glazing), and sesame oil (nutty richness). Cooking vegetables first and wiping the pan ensures the tongue gets a screaming hot, dry surface for the sear.',
    substitutions: 'Pre-sliced tongue from Japanese or Korean markets eliminates the skinning step. For traditional gyutan, skip the sauce and serve with just salt and lemon. Replace bell pepper with scallions for a sharper flavor. Thinly sliced flank or skirt steak works if tongue is unavailable.',
    serving_suggestions: 'Serve over steamed short-grain rice with pickled vegetables and miso soup. The richness of the tongue wants something sharp and plain on the table.',
    storage_reheating: 'Store for up to 2 days. Reheat in a hot skillet for 1-2 minutes with a splash of water. Freezes well in sauce for up to 2 months.',
    cultural_notes: 'Gyutan originated in Sendai, Japan in the 1940s and became a regional specialty with dedicated restaurants across the country. Tongue is sliced thin, grilled over charcoal, and served with barley rice, pickled vegetables, and oxtail soup. This home version combines the Japanese searing technique with a sauce influenced by both Japanese and Chinese flavors.',
    tags: ['japanese', 'beef', 'tongue', 'offal', 'gyutan', 'stir-fry', 'weeknight', 'quick', 'sesame-oil', 'ginger', 'oyster-sauce'],
    seo_title: 'Japanese Beef Tongue (Gyutan) — Seared and Sauced',
    meta_description: 'Thin-sliced beef tongue hard-seared for deep color, finished with oyster sauce, lemon, ginger, and sesame oil over sauteed vegetables. Fast, bold, and unforgettable.',
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
