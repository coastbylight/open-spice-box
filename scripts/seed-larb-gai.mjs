import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const recipe = {
  title: 'Larb Gai (ลาบไก่)',
  slug: 'larb-gai',
  subtitle: 'Thai ground chicken salad with lime, fish sauce, mint, and cilantro, served in crisp lettuce cups with toasted rice powder and crushed peanuts',
  cultural_origin: 'Thailand',
  tradition: 'Cross-Cultural',
  headnote:
    'Larb is the national dish of Laos and one of the most popular salads in Thai cooking, a category of food that barely exists in the Western sense of the word. It is not leafy greens with dressing. It is a warm, intensely seasoned ground meat dish built on a foundation of three flavors: lime juice for sour, fish sauce for salty, and sugar for sweet, with enough fresh chili to make your eyes water and enough fresh herbs to make your nose happy at the same time.\n\nThe aromatics do the heavy lifting. Ginger, garlic, lemongrass, and chili go into hot oil for barely a minute, just long enough to turn fragrant and golden without burning. The ground chicken follows and cooks fast, broken into small crumbles that catch the sauce in every crevice. The sauce itself is almost nothing: lime juice, fish sauce, sugar, and a little starch to help it cling. But when those three flavors hit in the right ratio, with the warmth of the aromatics underneath, the result is one of the most complete bites in any cuisine.\n\nThe fresh herbs go in off-heat. Mint and cilantro, roughly torn or chopped, along with thin slices of red onion that still have their sharp bite. Everything gets spooned into crisp lettuce cups, the kind that crunch when you pick them up and shatter slightly as you bite through to the warm filling inside. The traditional version uses toasted rice powder for texture, rice grains dry-roasted in a wok until dark golden and then ground to a coarse powder. Crushed peanuts work as a simpler alternative. Either way, the contrast of warm meat and cool herbs and crisp lettuce is what makes this dish more than the sum of its ingredients.',
  yield: '2 to 3 servings',
  prep_time: '10 minutes',
  cook_time: '10 minutes',
  total_time: '20 minutes',
  difficulty: 'Easy',
  ingredients: [
    { amount: '2', unit: 'tsp', ingredient: 'cornstarch', prep_note: 'or 2 tbsp toasted rice powder', optional: false },
    { amount: '3', unit: 'tbsp', ingredient: 'water', prep_note: null, optional: false },
    { amount: '2 1/2', unit: 'tbsp', ingredient: 'fresh lime juice', prep_note: '1 to 2 limes', optional: false },
    { amount: '2', unit: 'tbsp', ingredient: 'fish sauce', prep_note: null, optional: false },
    { amount: '2', unit: 'tsp', ingredient: 'brown sugar or palm sugar', prep_note: null, optional: false },
    { amount: '2', unit: 'tbsp', ingredient: 'peanut oil', prep_note: null, optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'fresh ginger', prep_note: 'grated or very finely chopped', optional: false },
    { amount: '2', unit: null, ingredient: 'large garlic cloves', prep_note: 'minced', optional: false },
    { amount: '1', unit: null, ingredient: 'stalk lemongrass', prep_note: 'white and pale green part only, finely chopped', optional: false },
    { amount: '2', unit: null, ingredient: 'Thai bird\'s eye chilies', prep_note: 'deseeded and finely chopped, adjust to taste', optional: false },
    { amount: '1', unit: 'lb', ingredient: 'ground chicken', prep_note: 'about 500g; ground pork also works', optional: false },
    { amount: '1/2', unit: null, ingredient: 'red onion', prep_note: 'quartered and thinly sliced', optional: false },
    { amount: '1/3', unit: 'cup', ingredient: 'fresh cilantro leaves', prep_note: 'roughly chopped, plus extra', optional: false },
    { amount: '1/3', unit: 'cup', ingredient: 'fresh mint leaves', prep_note: 'roughly torn, plus extra', optional: false },
    { amount: '3', unit: 'tbsp', ingredient: 'crushed roasted peanuts', prep_note: null, optional: true },
    { amount: '6-8', unit: null, ingredient: 'small lettuce leaves', prep_note: 'baby romaine or butter lettuce', optional: false },
  ],
  instructions: [
    { step: 1, text: 'Make the sauce. Combine the cornstarch (or toasted rice powder) with the water in a small bowl. Add the lime juice, fish sauce, and sugar. Stir until the sugar dissolves. Set aside.' },
    { step: 2, text: 'Cook the aromatics. Heat the peanut oil in a wok over medium-high heat. Add the ginger, garlic, lemongrass, and chilies. Saute for 45 seconds to 1 minute until fragrant. Do not let the garlic brown.' },
    { step: 3, text: 'Cook the chicken. Add the ground chicken and turn heat to high. Break the meat into small crumbles. Cook for 3 to 4 minutes until cooked through with no pink remaining.' },
    { step: 4, text: 'Add the sauce. Pour the sauce over the chicken and cook for 45 seconds to 1 minute, tossing constantly, until the sauce coats the chicken and thickens slightly.' },
    { step: 5, text: 'Add fresh herbs. Remove from heat. Stir in the sliced red onion, cilantro, and mint.' },
    { step: 6, text: 'Serve. Transfer filling to a bowl. Arrange lettuce cups, peanuts, extra herbs, lime wedges, and sliced chili on a plate. Let everyone assemble their own.' },
  ],
  key_ingredient_benefits:
    '**Lemongrass:** The essential oil citral gives it its citrusy flavor and has been studied for antibacterial and antifungal properties. In Thai traditional medicine, lemongrass tea is used as a digestive aid and fever reducer.\n\n**Fish Sauce:** A fermented condiment providing salt, umami, amino acids, B vitamins, and minerals. High-quality fish sauce aged for a year or more provides savory depth that salt alone cannot.\n\n**Mint:** Fresh mint contains menthol with a cooling sensation and documented digestive benefits. In Thai cooking, mint is used raw to preserve its volatile oils.',
  why_this_works:
    'The sauce ratio of lime juice, fish sauce, and sugar is the foundation of Thai salad dressing. The three flavors check each other so none dominates. Cooking aromatics before the meat infuses the oil, distributing flavor evenly. Fresh herbs and onion go in off-heat to preserve their volatile flavors. The lettuce provides temperature and texture contrast against the warm, seasoned filling.',
  substitutions: 'Ground pork is the most common alternative and produces a more traditional Isan-style larb. Lemongrass paste (1 tbsp) can replace fresh. For vegetarian, use finely chopped mushrooms. Toasted rice powder is traditional; cornstarch is a quick shortcut. Butter lettuce, baby romaine, or endive leaves all work for cups.',
  serving_suggestions: 'As a starter, one or two cups per person before a Thai curry and rice. As a light main, three to four cups with steamed rice and cucumber salad. Works well as party food set out on a platter.',
  storage_reheating: 'Store filling and herbs separately for up to 2 days. Reheat filling in a skillet and add a squeeze of fresh lime juice. Filling without herbs freezes well for up to 2 months.',
  cultural_notes: 'Larb is the national dish of Laos and one of the most popular salads in Thai cooking. The traditional version uses toasted rice powder for a smoky, sandy texture. It is typically a starter at Thai restaurants but can be a full meal with rice.',
  tags: ['thai', 'chicken', 'lettuce-wraps', 'larb', 'laab', 'mint', 'cilantro', 'fish-sauce', 'lime', 'quick', 'light', 'gluten-free', 'low-carb'],
  seo_title: 'Larb Gai (ลาบไก่) — Thai Ground Chicken Lettuce Cups',
  meta_description: 'Larb gai with ground chicken, lime, fish sauce, mint, and lemongrass in crisp lettuce cups. The Thai salad that is fast, fresh, and explosively flavorful.',
  published: true,
}

const { error } = await supabase
  .from('recipes')
  .upsert(recipe, { onConflict: 'slug' })

if (error) {
  console.error('❌', error.message)
  process.exit(1)
}
console.log('✅ Larb Gai seeded')
