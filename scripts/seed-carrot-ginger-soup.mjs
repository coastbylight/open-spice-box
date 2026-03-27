import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const recipe = {
  title: 'Carrot Ginger Soup',
  slug: 'carrot-ginger-soup',
  subtitle: 'A silky, golden soup of slow-simmered carrots with ginger, turmeric, and coconut milk, finished with a squeeze of lime',
  cultural_origin: 'Cross-Cultural',
  tradition: 'Cross-Cultural',
  headnote:
    'There is a category of soup that exists purely because someone looked at a single vegetable and thought, "what if I just made a whole pot of this?" Carrot soup is the best of that category. The carrot does nearly all the work. It brings its own sweetness, its own color, and a body that blends into something remarkably creamy without a drop of dairy.\n\nThis version leans into the warming spice direction. Fresh ginger and ground turmeric go in early, simmering with the carrots until the whole pot turns a deep, sunset gold. Coconut milk stirred in after blending adds richness and a faint tropical sweetness that keeps the soup from tasting like health food. A squeeze of lime at the end sharpens everything, cutting through the sweetness of the carrots and the fat of the coconut in a way that makes each spoonful feel balanced rather than heavy.\n\nThe whole thing takes about 30 minutes. The technique is essentially chop, simmer, blend. There is no cream to temper, no roux to build, no stock to clarify. You could make this on a Tuesday night after a long day and still feel like you cooked something worth eating. The leftovers get better overnight as the ginger and turmeric continue to steep into the base. It is one of those rare soups that improves with neglect.',
  yield: '4 servings',
  prep_time: '10 minutes',
  cook_time: '20 minutes',
  total_time: '30 minutes',
  difficulty: 'Easy',
  ingredients: [
    { amount: '1', unit: 'tbsp', ingredient: 'coconut oil', prep_note: null, optional: false },
    { amount: '1', unit: null, ingredient: 'large onion', prep_note: 'chopped', optional: false },
    { amount: '2', unit: 'tbsp', ingredient: 'fresh ginger', prep_note: 'chopped', optional: false },
    { amount: '2', unit: null, ingredient: 'cloves garlic', prep_note: 'chopped', optional: false },
    { amount: '2', unit: 'lbs', ingredient: 'carrots', prep_note: 'peeled and chopped into rough 1-inch pieces', optional: false },
    { amount: '2', unit: 'tsp', ingredient: 'ground turmeric', prep_note: null, optional: false },
    { amount: '4', unit: 'cups', ingredient: 'vegetable or chicken stock', prep_note: null, optional: false },
    { amount: '15', unit: 'oz', ingredient: 'coconut milk', prep_note: 'one can', optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'fresh lime juice', prep_note: 'about half a lime', optional: false },
    { amount: null, unit: null, ingredient: 'salt and pepper', prep_note: 'to taste', optional: false },
    { amount: null, unit: null, ingredient: 'fresh cilantro', prep_note: 'chopped, for serving', optional: true },
    { amount: null, unit: null, ingredient: 'roasted cashews or peanuts', prep_note: 'roughly chopped, for serving', optional: true },
  ],
  instructions: [
    { step: 1, text: 'Cook the aromatics. Heat the coconut oil in a large pot over medium-high heat. Add the onion and cook until soft and translucent, about 3 minutes. Add the ginger and garlic and stir for another minute until fragrant. The kitchen should smell sharp and warm.' },
    { step: 2, text: 'Simmer the carrots. Add the carrots, turmeric, and stock to the pot. Raise the heat to high and bring to a boil. Reduce the heat to medium-low, cover, and simmer for 15 minutes, or until the carrots are completely tender and a knife slides through them with no resistance.' },
    { step: 3, text: 'Blend until smooth. Remove the pot from heat. Using an immersion blender, puree the soup directly in the pot until completely smooth and velvety. If using a countertop blender, work in batches and fill the jar no more than halfway, venting the lid to let steam escape. Return the blended soup to the pot.' },
    { step: 4, text: 'Finish the soup. Stir in the coconut milk and lime juice. Warm gently over medium-low heat for 2 minutes. Season with salt and pepper, tasting as you go. The lime should brighten the soup without making it obviously citrusy.' },
    { step: 5, text: 'Serve. Ladle into bowls. Top with chopped cilantro and a scatter of crushed cashews or peanuts if using. A small drizzle of coconut cream over the surface makes it look as good as it tastes.' },
  ],
  key_ingredient_benefits:
    '**Carrots:** Among the richest food sources of beta-carotene, the precursor the body converts to vitamin A. A single serving of this soup provides well over the daily recommended intake. Beta-carotene is fat-soluble, and the coconut oil and coconut milk in this recipe significantly improve its absorption. Traditional Chinese medicine classifies carrots as sweet and neutral, used to nourish the Liver and improve vision.\n\n**Ginger:** Fresh ginger contains gingerols, compounds with documented anti-inflammatory and anti-nausea properties. Research suggests ginger may reduce muscle pain, lower blood sugar, and support digestive function. In Ayurveda, ginger is considered the "universal medicine," used to kindle digestive fire and warm the body. In TCM, fresh ginger (sheng jiang) is classified as warm and acrid, used to dispel cold and warm the Lung and Stomach.\n\n**Turmeric:** The curcumin in turmeric is one of the most studied natural anti-inflammatory compounds. Its bioavailability is limited on its own but increases dramatically when consumed with fat (coconut milk here) and piperine from black pepper. Adding a few cracks of black pepper to your bowl is not just a flavor choice.\n\n**Coconut Milk:** Provides medium-chain triglycerides (MCTs), a type of fat that the body metabolizes differently from long-chain fats, converting them to energy more readily. The fat content also serves as a carrier for the fat-soluble nutrients in the carrots and turmeric.',
  why_this_works:
    'Carrots have a natural sugar content of about 5 to 6 percent, which is high for a vegetable. That sweetness concentrates during simmering and becomes the backbone of the soup\'s flavor. Blending breaks down the cell walls completely, releasing starches and sugars that give the soup body without any thickener.\n\nThe turmeric does double duty here. It deepens the color from pale orange to a rich, saturated gold, and it contributes an earthy, slightly bitter note that prevents the soup from tasting one-dimensionally sweet. Ginger works in the same direction, adding a sharpness that cuts across the sweetness.\n\nCoconut milk is added after blending rather than simmered with the carrots. This preserves its clean, fatty richness. If cooked too long, coconut milk can break and turn oily. Stirred in at the end, it emulsifies smoothly into the pureed base and adds a rounded creaminess.\n\nThe lime juice is the ingredient people skip and then wonder why their carrot soup tastes flat. Acid is what transforms a sweet vegetable puree into something that reads as a complete, balanced soup. Even half a tablespoon changes the entire bowl.',
  substitutions: 'Olive oil or butter work in place of coconut oil. For a dairy version, replace coconut milk with heavy cream. A teaspoon of ground cumin or curry powder added with the turmeric shifts the soup toward a more South Asian profile. For deeper flavor, roast the carrots at 425°F with the coconut oil and turmeric for 25 minutes until caramelized before adding to the pot with the stock. If you cannot eat coconut, cashew cream blended from soaked raw cashews is an excellent substitute.',
  serving_suggestions: 'This soup wants bread. A thick slice of crusty sourdough, warmed and spread with salted butter, is the obvious companion. For a fuller meal, serve alongside a sharp green salad dressed with lemon and olive oil to contrast the soup\'s sweetness. It also pairs well as a starter before heavier dishes.',
  storage_reheating: 'Refrigerate in an airtight container for up to 4 days. The flavors deepen overnight. Warm gently over medium-low heat, adding a splash of stock or water if the soup has thickened. Freezes well for up to 3 months in individual portions. Thaw overnight in the refrigerator and reheat gently.',
  cultural_notes: 'The pairing of carrots with ginger and turmeric reflects a convergence of Ayurvedic and TCM principles around warming, anti-inflammatory foods. Both traditions classify ginger as a digestive stimulant and turmeric as a systemic anti-inflammatory. The coconut milk and lime point toward Southeast Asian influence, making this a genuinely cross-cultural preparation.',
  tags: ['soup', 'carrots', 'ginger', 'turmeric', 'coconut-milk', 'anti-inflammatory', 'vegan', 'gluten-free', 'dairy-free', 'weeknight', 'comfort-food', 'blended'],
  seo_title: 'Carrot Ginger Soup — Creamy Anti-Inflammatory Blended Soup',
  meta_description: 'Silky carrot ginger soup with turmeric and coconut milk, ready in 30 minutes. Naturally vegan, dairy-free, and packed with anti-inflammatory ingredients.',
  published: true,
}

const { error } = await supabase
  .from('recipes')
  .upsert(recipe, { onConflict: 'slug' })

if (error) {
  console.error('❌', error.message)
  process.exit(1)
}
console.log('✅ Carrot Ginger Soup seeded')
