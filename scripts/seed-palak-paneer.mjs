import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const recipe = {
  title: 'Palak Paneer',
  slug: 'palak-paneer',
  subtitle: 'A generous amount of spinach pressure-cooked with ginger, pureed, and simmered with a cumin-coriander base, loaded with ghee-fried paneer and finished with kasuri methi',
  cultural_origin: 'India',
  tradition: 'Ayurveda',
  headnote:
    'There are two kinds of palak paneer. There is the restaurant kind, which is a mild, creamy, pale green sauce with a few cubes of paneer floating in it, and there is the home kind, which is a thick, dark, intensely spinach-forward dish where the paneer has been fried in ghee until golden and the gravy tastes like spinach that has actually been cooked by someone who wanted to eat spinach.\n\nThis is the home kind. It uses a generous amount of spinach, four to five large bundles, which is roughly twice what most recipes call for. The spinach is pressure-cooked with salt and ginger paste, which is the older North Indian method that predates the blanching technique popularized by food blogs. Pressure cooking produces a deeper, darker green and a more concentrated spinach flavor. It does not produce the bright, vivid green of restaurant versions, and it does not try to. The color is honest. The flavor is the point.\n\nThe base is simple: cumin seeds crackled in ghee, chopped onions and tomatoes cooked down and mashed together on low heat until they become a paste, with a little ginger and coriander powder. The blended spinach goes in and the two simmer together until they become one thing rather than two. The paneer is cut into big chunks, salted and dusted with chili powder, and shallow-fried in ghee until brown on the edges. It goes into the spinach at the end. Kasuri methi, the dried fenugreek leaves that are the quiet signature of North Indian cooking, gets crushed between your palms and stirred in after the heat is off. No cream. Some people add cream. This recipe does not, because the ghee provides all the richness the dish needs, and the spinach tastes more like itself without dairy diluting it.',
  yield: '4 to 6 servings',
  prep_time: '20 minutes',
  cook_time: '40 minutes',
  total_time: '1 hour',
  difficulty: 'Medium',
  ingredients: [
    { amount: '1.5', unit: 'lbs', ingredient: 'fresh spinach', prep_note: '4-5 large bundles, washed and roughly chopped (600-750g)', optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'ginger paste', prep_note: 'for spinach', optional: false },
    { amount: '1/2', unit: 'tsp', ingredient: 'salt', prep_note: 'for spinach', optional: false },
    { amount: '1/4', unit: 'cup', ingredient: 'water', prep_note: null, optional: false },
    { amount: '2', unit: 'tbsp', ingredient: 'ghee', prep_note: 'for base', optional: false },
    { amount: '1/2', unit: 'tsp', ingredient: 'cumin seeds', prep_note: null, optional: false },
    { amount: '1', unit: null, ingredient: 'large onion', prep_note: 'finely chopped', optional: false },
    { amount: '2', unit: null, ingredient: 'medium tomatoes', prep_note: 'chopped', optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'ginger paste', prep_note: 'for base', optional: false },
    { amount: '1/2', unit: 'tsp', ingredient: 'coriander powder', prep_note: null, optional: false },
    { amount: '1/4', unit: 'tsp', ingredient: 'turmeric', prep_note: null, optional: false },
    { amount: null, unit: null, ingredient: 'salt', prep_note: 'to taste', optional: false },
    { amount: '10', unit: 'oz', ingredient: 'paneer', prep_note: 'cut into big chunks (300g)', optional: false },
    { amount: '1-2', unit: 'tbsp', ingredient: 'ghee', prep_note: 'for frying paneer', optional: false },
    { amount: '1', unit: 'pinch', ingredient: 'salt', prep_note: 'for paneer', optional: false },
    { amount: '1', unit: 'pinch', ingredient: 'red chili powder', prep_note: 'for paneer', optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'kasuri methi', prep_note: 'dried fenugreek leaves, crushed between palms', optional: false },
    { amount: '1/2', unit: 'tsp', ingredient: 'garam masala', prep_note: null, optional: false },
  ],
  instructions: [
    { step: 1, text: 'Pressure cook the spinach. Place the washed spinach in a pressure cooker with the ginger paste, salt, and water. Close the lid and cook on medium heat for 1 whistle. Turn off the heat and let the pressure release naturally. Open and let the spinach cool for about 15 minutes.' },
    { step: 2, text: 'Blend the spinach. Transfer the cooked spinach with its liquid to a blender and puree until smooth. Set aside.' },
    { step: 3, text: 'Cook the base. Heat 2 tablespoons of ghee in a wok or kadai over low heat. Add the cumin seeds and let them crackle. Add the chopped onions and cook on low heat until soft, about 5 minutes. Add the ginger paste and stir for a minute. Add the tomatoes, coriander powder, turmeric, and salt. Cover and cook on low heat until the tomatoes break down completely and the mixture becomes a paste, about 8 to 10 minutes. Mash everything together with the back of a spoon.' },
    { step: 4, text: 'Combine spinach and base. Add the blended spinach puree to the wok. Stir well and let it simmer on a low flame for 8 to 10 minutes, stirring occasionally, until the gravy thickens and the flavors meld.' },
    { step: 5, text: 'Fry the paneer. Heat 1 to 2 tablespoons of ghee in a separate pan over medium heat. Sprinkle the paneer chunks with salt and chili powder. Shallow fry until golden brown on the edges, about 3 to 4 minutes. Let each side develop color before turning.' },
    { step: 6, text: 'Finish. Add the fried paneer to the spinach gravy and stir gently. Turn off the heat. Crush the kasuri methi between your palms and sprinkle over the dish. Add the garam masala and stir once. Cover and let sit for 5 minutes before serving.' },
  ],
  key_ingredient_benefits:
    '**Spinach:** Exceptionally nutrient-dense, high in iron, vitamin K, vitamin A, folate, and magnesium. Cooking significantly reduces oxalate content. In Ayurveda, spinach is classified as cooling, traditionally paired with warming spices like ginger and cumin to balance its cold qualities. Pairing with dairy (paneer) provides calcium that binds to oxalates in the gut.\n\n**Paneer:** Fresh, unaged cheese providing about 18 grams of protein per 100 grams, along with calcium and B12. In Ayurveda, paneer is considered heavy and cooling, which is why it is paired with warming spices.\n\n**Ghee:** Ayurveda considers ghee one of the most sattvic foods, used to kindle digestive fire. Modern research identifies ghee as a source of butyric acid, a short-chain fatty acid that supports gut health. The fat aids absorption of fat-soluble vitamins in the spinach.\n\n**Kasuri Methi:** Dried fenugreek leaves with a sweet, hay-like aroma. The finishing spice that professional Indian cooks consider essential for palak paneer. Always added at the end and crushed before adding to release oils.',
  why_this_works:
    'Pressure cooking spinach with ginger paste infuses the ginger flavor throughout at a level sauteing cannot match. The high pressure breaks down cell walls more completely than blanching, producing a smoother puree with deeper spinach flavor. Cooking the onion-tomato base on low heat softens everything gently into a smooth paste. Frying paneer in ghee adds richness and a thin crust that helps it hold shape in the gravy. Kasuri methi added off-heat preserves its volatile aromatic compounds.',
  substitutions: 'For brighter green color, blanch spinach 2 minutes then ice bath instead of pressure cooking. Add 2-3 tbsp cream after the spinach puree for restaurant-style richness. Replace paneer with extra-firm tofu for vegan. Replace half the spinach with mustard greens for a palak-sarson hybrid. Without a pressure cooker, boil covered for 10-15 minutes.',
  serving_suggestions: 'Serve with hot roti, naan, or paratha. For a complete North Indian meal, add steamed basmati rice, a yellow moong dal, and a simple raita or kachumber salad of chopped onion, tomato, and cucumber with lemon juice.',
  storage_reheating: 'Store for up to 3 days. The flavor deepens overnight. Reheat in a covered pan over medium-low heat with a splash of water. The spinach gravy freezes well for up to 2 months. Freeze without paneer if possible and add freshly fried paneer when reheating.',
  cultural_notes: 'This recipe represents traditional North Indian home-style palak paneer: generous spinach, pressure-cooked method, ghee throughout, no cream. The cream addition is a restaurant innovation from the 1980s-90s. Older home recipes rarely include it. The pressure cooking method predates the blanching technique popularized by food blogs and produces a deeper, more concentrated spinach flavor.',
  tags: ['indian', 'punjabi', 'north-indian', 'paneer', 'spinach', 'vegetarian', 'comfort-food', 'ghee', 'kasuri-methi', 'gluten-free', 'winter'],
  seo_title: 'Palak Paneer — Home-Style Spinach and Paneer in Ghee',
  meta_description: 'Traditional home-style palak paneer with pressure-cooked spinach, ghee-fried paneer, and a cumin-coriander base. No cream, no shortcuts, all flavor.',
  published: true,
}

const { error } = await supabase
  .from('recipes')
  .upsert(recipe, { onConflict: 'slug' })

if (error) {
  console.error('❌', error.message)
  process.exit(1)
}
console.log('✅ Palak Paneer seeded')
