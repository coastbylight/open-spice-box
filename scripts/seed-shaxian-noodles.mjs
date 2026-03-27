import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const recipe = {
  title: 'Shaxian Peanut Sauce Noodles (沙县拌面)',
  slug: 'shaxian-peanut-sauce-noodles',
  subtitle: 'Fujian street noodles tossed in a rich peanut sauce with scallion lard and seasoned soy sauce, ready in minutes',
  cultural_origin: 'China',
  tradition: 'Traditional Chinese Medicine',
  headnote:
    'Shaxian is a small mountain town in Fujian province that most people outside China have never heard of, but its food is everywhere. Shaxian snack shops are one of the largest informal restaurant chains in the country, numbering in the tens of thousands, serving cheap, fast, surprisingly good food to workers and students across southern China. The peanut sauce noodles are the signature dish, and the one that people order again and again.\n\nThe sauce is built from three components that you prepare separately and then combine at the plate. A cooked peanut sauce made by blooming peanut butter in hot peanut oil until it darkens to a roux-like consistency. Scallion lard, rendered slowly until the scallions crisp and the fat takes on their flavor. And a simple seasoned soy sauce sweetened with sugar. Each component takes minutes. Together they produce a sauce that is rich without being heavy, nutty without being cloying, and savory in a way that makes you want to scrape the plate clean.\n\nThe assembly is almost absurdly simple. Mix the sauce components on a plate, boil noodles, drop them on top still a little wet, and toss. The starchy noodle water helps the sauce emulsify and cling. This is food designed to be made fast and eaten immediately, which is exactly what makes it so good. It is the kind of dish that takes longer to describe than to cook.',
  yield: '4 snack-sized servings',
  prep_time: '10 minutes',
  cook_time: '15 minutes',
  total_time: '25 minutes',
  difficulty: 'Easy',
  ingredients: [
    { amount: '1/4', unit: 'cup', ingredient: 'peanut oil', prep_note: 'Chinese semi-refined preferred', optional: false },
    { amount: '1/4', unit: 'cup', ingredient: 'all-natural peanut butter', prep_note: 'no sugar added', optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'toasted sesame oil', prep_note: 'only if using refined Western peanut oil', optional: true },
    { amount: '3', unit: 'tbsp', ingredient: 'lard', prep_note: null, optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'scallion', prep_note: 'sliced', optional: false },
    { amount: '2', unit: 'tbsp', ingredient: 'light soy sauce', prep_note: null, optional: false },
    { amount: '2', unit: 'tbsp', ingredient: 'water', prep_note: null, optional: false },
    { amount: '2', unit: 'tsp', ingredient: 'sugar', prep_note: null, optional: false },
    { amount: '240', unit: 'g', ingredient: 'dried noodles', prep_note: 'alkaline noodles preferred, or any thin wheat noodle; 60g per serving', optional: false },
    { amount: '1/4', unit: 'tsp', ingredient: 'MSG', prep_note: 'per serving', optional: true },
    { amount: null, unit: null, ingredient: 'sliced scallion', prep_note: 'for topping', optional: false },
    { amount: null, unit: null, ingredient: 'blanched baby bok choy', prep_note: 'for serving', optional: true },
  ],
  instructions: [
    { step: 1, text: 'Make the peanut sauce. Heat the peanut oil in a small saucepan over medium heat until faint wisps of smoke appear. Remove from heat and add the peanut butter. Stir well until combined. Return to a low flame and cook, stirring constantly, until the mixture deepens to the color of a peanut butter roux, about 2 to 3 minutes. It should smell deeply nutty and toasted. Remove from heat. If using refined Western peanut oil, stir in the sesame oil now. Set aside to cool.' },
    { step: 2, text: 'Make the scallion lard. Combine the lard and sliced scallion in a small pan over medium-low heat. Cook slowly, stirring occasionally, for about 10 minutes until the scallion pieces are browned and crisp and the lard is fragrant. Do not rush this step. The slow rendering is what infuses the fat with scallion flavor. Set aside.' },
    { step: 3, text: 'Make the seasoned soy sauce. Combine the light soy sauce, water, and sugar in a small saucepan. Bring to a boil over medium heat, stirring until the sugar dissolves. Remove from heat.' },
    { step: 4, text: 'Assemble the sauce. For each serving, place 1 tablespoon peanut sauce, 2 teaspoons seasoned soy sauce, 1 teaspoon scallion lard, 2 teaspoons water or stock, a pinch of salt, and the MSG on a plate or in a wide bowl. Do not mix yet.' },
    { step: 5, text: 'Cook the noodles. Bring a large pot of water to a boil. Cook 60 grams of dried noodles per serving according to package directions, or until just slightly past al dente. They should be tender with no chalkiness. Do not drain completely. Lift the noodles out with tongs or a spider, letting some cooking water cling to them, and transfer directly to the plate with the sauce.' },
    { step: 6, text: 'Toss and serve. Mix the noodles thoroughly with the sauce until every strand is coated and the sauce has emulsified into a glossy coating. Top with sliced scallion. Serve immediately with blanched baby bok choy on the side if you like.' },
  ],
  key_ingredient_benefits:
    '**Peanuts:** A dense source of protein (about 26 grams per 100 grams), healthy monounsaturated fats, and niacin. Peanuts contain resveratrol, the same antioxidant found in red wine, though in smaller quantities. Traditional Chinese medicine considers peanuts nourishing to the Spleen and Lung, used to promote lactation and moisten dryness.\n\n**Lard:** Once vilified, lard has been reassessed by nutritional science. It is lower in saturated fat than butter and contains no trans fats when unhydrogenated. It is high in oleic acid, the same monounsaturated fat that makes olive oil heart-healthy. In Chinese cooking, lard is valued for its neutral flavor and high smoke point.\n\n**Soy Sauce:** Naturally fermented soy sauce contains amino acids, B vitamins, and antioxidants produced during the fermentation process. Light soy sauce (sheng chou) is thinner and saltier than dark soy sauce, used primarily for seasoning rather than coloring.',
  why_this_works:
    'The three-component sauce system is what makes this dish work so well despite its simplicity. Each element contributes something the others lack. The peanut sauce brings fat and nuttiness. The seasoned soy sauce brings salt, sweetness, and umami. The scallion lard brings aromatic depth and richness. Combined in the right ratio (roughly 3:2:1), they create a balanced sauce without any single note dominating.\n\nCooking the peanut butter in hot oil is not just mixing. The heat triggers Maillard reactions in the peanut proteins, deepening the flavor from raw and flat to toasted and complex. The technique is similar in principle to making a roux, and the color change is the visual indicator that the flavor transformation has happened.\n\nThe noodle cooking water is the unwritten ingredient. The starch dissolved in the water acts as an emulsifier, binding the oil-based sauce components into a cohesive coating that clings to the noodles rather than pooling at the bottom of the plate. This is why you transfer the noodles wet rather than draining them dry.',
  substitutions: 'Replace the lard with peanut oil or vegetable oil for a vegetarian version. Any thin wheat noodle works, including lo mein, ramen, or even spaghetti. For the MSG, add an extra teaspoon of soy sauce or mushroom soy sauce instead. Use only all-natural peanut butter with no added sugar. Fried shallots, chili oil, or a soft-boiled egg are common additions at Shaxian shops.',
  serving_suggestions: 'In Shaxian snack shops, these noodles are part of a spread, served alongside wonton soup and steamed dumplings. At home, a bowl of simple broth-based soup balances the richness. Blanched baby bok choy or gai lan dressed with oyster sauce provides a clean, green contrast. Pair with egg drop soup for an easy weeknight dinner.',
  storage_reheating: 'The peanut sauce, scallion lard, and seasoned soy sauce all store well individually in sealed containers in the refrigerator for up to 2 weeks. The peanut sauce and scallion lard solidify when cold; let them come to room temperature before using. Assembled noodles are best eaten immediately. The sauce components can be frozen for up to 2 months.',
  cultural_notes: 'Shaxian snack shops are one of the largest informal restaurant networks in China, numbering in the tens of thousands across the country. Originating from Shaxian, a small mountain town in Fujian province, these shops serve cheap, fast street food to workers and students. The peanut sauce noodles are the signature dish, built on a three-component sauce system that can be assembled in minutes.',
  tags: ['chinese', 'fujian', 'noodles', 'peanut', 'street-food', 'weeknight', 'quick', 'comfort-food', 'snack', 'scallion-lard'],
  seo_title: 'Shaxian Peanut Sauce Noodles (沙县拌面) — Fujian Street Food Classic',
  meta_description: 'Shaxian peanut sauce noodles from Fujian province, with homemade peanut sauce, scallion lard, and seasoned soy. Street food simplicity in 25 minutes.',
  published: true,
}

const { error } = await supabase
  .from('recipes')
  .upsert(recipe, { onConflict: 'slug' })

if (error) {
  console.error('❌', error.message)
  process.exit(1)
}
console.log('✅ Shaxian Peanut Sauce Noodles seeded')
