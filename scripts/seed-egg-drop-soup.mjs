import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const recipe = {
  title: 'Egg Drop Soup (蛋花汤)',
  slug: 'egg-drop-soup',
  subtitle: 'A five-minute Chinese soup of silky egg ribbons in seasoned chicken broth, thickened with cornstarch and finished with white pepper and sesame oil',
  cultural_origin: 'China',
  tradition: 'Traditional Chinese Medicine',
  headnote:
    'The Chinese name for this soup is dan hua tang, which translates to "egg flower soup." That name is more accurate than the English one. When you drizzle beaten eggs into simmering broth, they bloom into soft, feathery ribbons that look like petals drifting through the liquid. It is one of the simplest dishes in the Chinese home cooking repertoire, and one of the most satisfying to get right.\n\nThe technique comes down to two things: thickening the broth with a cornstarch slurry before the eggs go in, and pouring the eggs in a slow, thin stream while stirring in one direction. The starch gives the broth just enough body to suspend the egg ribbons so they float rather than sinking and clumping at the bottom. The slow pour and steady stirring create the delicate, flocculent texture that separates a good version from a mediocre one.\n\nThis is a soup that takes about ten minutes from start to finish, requires almost nothing in the way of technique or special ingredients, and somehow manages to feel like real cooking rather than an emergency meal. It is the soup that appears on Chinese dinner tables between heavier dishes, the one that grandmothers make for sick grandchildren, and the one that restaurant kitchens can produce in the time it takes to read the menu. White pepper, not black, gives it the gentle warmth that defines the flavor. A few drops of sesame oil at the end pull everything together.',
  yield: '4 servings',
  prep_time: '5 minutes',
  cook_time: '10 minutes',
  total_time: '15 minutes',
  difficulty: 'Easy',
  ingredients: [
    { amount: '4', unit: 'cups', ingredient: 'chicken broth', prep_note: 'homemade or low-sodium store-bought', optional: false },
    { amount: '3', unit: 'tbsp', ingredient: 'cornstarch', prep_note: null, optional: false },
    { amount: '3', unit: 'tbsp', ingredient: 'cold water', prep_note: null, optional: false },
    { amount: '3', unit: null, ingredient: 'large eggs', prep_note: null, optional: false },
    { amount: '½', unit: 'tsp', ingredient: 'ground white pepper', prep_note: null, optional: false },
    { amount: '½', unit: 'tsp', ingredient: 'salt', prep_note: 'or to taste', optional: false },
    { amount: '¼', unit: 'tsp', ingredient: 'sugar', prep_note: null, optional: true },
    { amount: '½', unit: 'tsp', ingredient: 'sesame oil', prep_note: 'toasted', optional: false },
    { amount: '2', unit: null, ingredient: 'scallions', prep_note: 'thinly sliced, for garnish', optional: false },
  ],
  instructions: [
    { step: 1, text: 'Make the cornstarch slurry. In a small bowl, stir the cornstarch into the cold water until completely smooth. Set it near the stove. Cornstarch settles quickly, so you will need to re-stir it right before adding it to the pot.' },
    { step: 2, text: 'Beat the eggs. Crack the eggs into a bowl and beat them lightly with a fork or chopsticks until the whites and yolks are just combined. Do not overbeat. You want a uniform mixture, not a frothy one.' },
    { step: 3, text: 'Heat the broth. Pour the chicken broth into a medium saucepan and bring it to a boil over medium-high heat. Season with the white pepper, salt, and sugar if using. Taste and adjust. The broth should be well-seasoned on its own before the eggs go in.' },
    { step: 4, text: 'Thicken the broth. Give the cornstarch slurry a quick stir and pour it into the boiling broth while stirring constantly. The broth will turn slightly glossy and thicken within 30 seconds. It should coat the back of a spoon lightly, not become gloopy. If it thickens too much, add a splash of water.' },
    { step: 5, text: 'Add the eggs. Reduce the heat to the lowest setting so the broth is barely simmering, not bubbling. Hold the bowl of beaten eggs about 6 inches above the pot and pour in a thin, steady stream while slowly stirring the broth in one direction with a fork or chopsticks. The eggs will set almost immediately into soft, wispy ribbons. Pour slowly. The thinner the stream, the more delicate the ribbons.' },
    { step: 6, text: 'Finish and serve. Once all the eggs are in, turn off the heat. Drizzle the sesame oil over the surface and stir gently once or twice. Ladle into bowls and scatter the sliced scallions on top. Serve immediately.' },
  ],
  key_ingredient_benefits:
    '**Eggs:** A single large egg provides about 6 grams of complete protein and is one of few natural food sources of vitamin D. The choline in egg yolks has been studied for its role in brain health and liver function. Traditional Chinese medicine considers eggs nourishing and mildly cooling, often recommended during recovery from illness.\n\n**White Pepper:** Ground from fully ripened peppercorns with the outer husk removed, white pepper has a sharper, more direct heat than black pepper. In traditional Chinese medicine, white pepper is considered warming to the stomach and is often used in soups intended to aid digestion. Modern research has identified piperine, the active compound in pepper, as potentially enhancing nutrient absorption.\n\n**Sesame Oil:** The toasted variety used here is a finishing oil, not a cooking oil. A small amount adds a nutty depth that rounds out the soup. Sesame oil is rich in antioxidants including sesamin and sesamolin, which have been studied for potential anti-inflammatory properties.',
  why_this_works:
    'The cornstarch slurry is the single most important step in this recipe, and the reason restaurant egg drop soup looks and tastes different from the thin, watery versions people often make at home. The starch increases the viscosity of the broth just enough that the egg ribbons stay suspended in the liquid rather than sinking and forming a dense layer at the bottom. It also gives the soup a slightly silky mouthfeel that makes it feel more substantial than plain broth.\n\nThe temperature of the broth when the eggs go in determines the texture of the ribbons. At a rolling boil, the eggs cook too quickly and become tough, breaking into small, grainy pieces. At a bare simmer, the eggs set gently into soft, feathery strands. Reducing the heat before adding the eggs is not optional.\n\nWhite pepper rather than black is traditional in Chinese soups. The flavor is sharper and more aromatic, with a heat that registers in the nose rather than on the tongue. It also dissolves into the broth without leaving visible specks, keeping the soup clean-looking.',
  substitutions: 'Vegetable broth works well for a vegetarian version. Tapioca starch, sweet potato starch, or arrowroot powder can replace cornstarch. For tomato egg drop soup, add one medium tomato cut into thin wedges to the broth and simmer for 3 minutes before adding the cornstarch slurry. For seaweed egg drop soup, add a small handful of dried wakame a minute before adding the eggs.',
  serving_suggestions: 'Egg drop soup is a between-courses soup, the kind that appears on the table alongside three or four other dishes to give the palate a rest and add warmth to the meal. Serve it with mapo tofu or kung pao chicken for contrast, or alongside stir-fried greens and steamed rice for a lighter dinner. On cold evenings or when someone in the house is feeling under the weather, a bowl of this with extra white pepper is exactly the right thing.',
  storage_reheating: 'Refrigerate in an airtight container for up to 2 days. The egg ribbons will soften further as they sit. Warm gently in a saucepan over medium-low heat, adding a splash of broth or water to thin the soup back to its original consistency. Do not boil. Freezing is not recommended as the egg texture becomes rubbery and the starch breaks down.',
  cultural_notes: 'The Chinese name dan hua tang literally means "egg flower soup," referring to the flocculent appearance of cooked eggs resembling tiny blossoms. The English name "egg drop" refers to the technique of dropping or drizzling eggs into broth. This is one of the fastest soups in any cuisine and a staple comfort food across China.',
  tags: ['chinese', 'soup', 'eggs', 'comfort-food', 'weeknight', 'quick', 'light', 'white-pepper', 'sesame-oil', 'gluten-free', 'low-calorie'],
  seo_title: 'Egg Drop Soup (蛋花汤) — Classic Chinese Egg Flower Soup',
  meta_description: 'Classic Chinese egg drop soup with silky egg ribbons in seasoned chicken broth, ready in 15 minutes. The cornstarch trick that makes it restaurant-quality.',
  published: true,
}

const { error } = await supabase
  .from('recipes')
  .upsert(recipe, { onConflict: 'slug' })

if (error) {
  console.error('❌', error.message)
  process.exit(1)
}
console.log('✅ Egg Drop Soup seeded')
