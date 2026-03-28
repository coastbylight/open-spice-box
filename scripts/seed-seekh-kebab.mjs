import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const recipe = {
  title: 'Mutton Seekh Kebab',
  slug: 'mutton-seekh-kebab',
  subtitle: 'Spiced minced mutton pressed onto skewers with raw onion, green chili, and fresh herbs, grilled over charcoal or cooked in a hot pan until charred and juicy',
  cultural_origin: 'India',
  tradition: 'Cross-Cultural',
  headnote:
    'Seekh kebabs are the reason people stand around charcoal grills in the cold outside kebab shops across Pakistan and northern India. The word seekh means skewer, and the technique is ancient: seasoned minced meat pressed by hand onto flat metal skewers, held over live coals, and turned until the outside chars and the inside stays pink and juicy. The fat in the meat bastes the kebab from within as it cooks, dripping into the coals and sending up smoke that flavors everything it touches.\n\nThe key to a good seekh kebab is the mince. It needs to be fatty, ideally from the shoulder or leg with about 20 percent fat, and it needs to be kneaded aggressively until it becomes sticky and cohesive enough to hold onto the skewer without falling off. This kneading develops the myosin proteins in the meat, which act as a natural binder. No egg, no breadcrumb, no flour. The meat holds itself together through technique alone.\n\nThe spice mix is restrained compared to a curry. Cumin, coriander, garam masala, and chili powder provide warmth and heat. Raw onion goes in finely chopped, squeezed dry, because wet onion will steam the kebab from inside and make it fall apart. Green chilies, fresh coriander, and fresh mint go in at the end and stay in rough pieces, providing bursts of freshness and heat in every bite. The mixture chills for at least an hour before shaping, which firms the fat and makes the kebabs easier to mold.\n\nOn a charcoal grill, seekh kebabs take about eight to ten minutes, turned every two minutes. In a pan or under a broiler, they take the same time but need oil and high heat to develop the char that makes them worth eating. Serve them straight off the skewer onto a piece of naan with raw onion rings, green chutney, and a squeeze of lemon. They do not need a plate. They barely need a table.',
  yield: '8 to 10 kebabs',
  prep_time: '20 minutes',
  cook_time: '10 minutes',
  total_time: '1 hour 30 minutes',
  difficulty: 'Medium',
  ingredients: [
    { amount: '1.1', unit: 'lbs', ingredient: 'mutton or lamb mince', prep_note: 'from shoulder or leg, at least 20% fat (500g)', optional: false },
    { amount: '1', unit: null, ingredient: 'medium onion', prep_note: 'very finely chopped and squeezed dry in a towel', optional: false },
    { amount: '2', unit: null, ingredient: 'green chilies', prep_note: 'finely chopped', optional: false },
    { amount: '3', unit: 'tbsp', ingredient: 'fresh coriander (cilantro)', prep_note: 'finely chopped', optional: false },
    { amount: '2', unit: 'tbsp', ingredient: 'fresh mint leaves', prep_note: 'finely chopped', optional: false },
    { amount: '2', unit: 'tsp', ingredient: 'ginger paste', prep_note: null, optional: false },
    { amount: '2', unit: 'tsp', ingredient: 'garlic paste', prep_note: null, optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'cumin powder', prep_note: null, optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'coriander powder', prep_note: null, optional: false },
    { amount: '1', unit: 'tsp', ingredient: 'Kashmiri red chili powder', prep_note: 'or paprika for less heat', optional: false },
    { amount: '1/2', unit: 'tsp', ingredient: 'garam masala', prep_note: null, optional: false },
    { amount: '1/4', unit: 'tsp', ingredient: 'ground black pepper', prep_note: null, optional: false },
    { amount: '1 1/4', unit: 'tsp', ingredient: 'salt', prep_note: null, optional: false },
    { amount: '1', unit: 'tbsp', ingredient: 'vegetable oil or ghee', prep_note: 'for pan-cooking', optional: false },
  ],
  instructions: [
    { step: 1, text: 'Squeeze the onion. Place finely chopped onion in a kitchen towel and wring out as much water as possible. Wet onion will steam inside the kebab and cause it to fall apart.' },
    { step: 2, text: 'Mix the mince. Combine mince with squeezed onion, green chilies, fresh coriander, mint, ginger paste, garlic paste, cumin, coriander powder, chili powder, garam masala, black pepper, and salt.' },
    { step: 3, text: 'Knead aggressively for 4 to 5 minutes, pressing, folding, and slapping the meat against the bowl. The mixture should become sticky and cohesive. This develops myosin proteins that bind the meat naturally.' },
    { step: 4, text: 'Chill. Cover and refrigerate for at least 1 hour.' },
    { step: 5, text: 'Shape the kebabs. Wet your hands. Press about 60 to 70 grams of mixture around a flat metal skewer into a 1-inch thick cylinder. Without skewers, shape into logs or long patties.' },
    { step: 6, text: 'Cook. Charcoal grill: turn every 2 minutes, 8 to 10 minutes total. Pan: heat 1 tbsp oil over high heat, turn every 2 minutes, 8 to 10 minutes until deeply browned.' },
    { step: 7, text: 'Serve immediately on naan with raw onion, green chutney, lemon wedges, and chaat masala.' },
  ],
  key_ingredient_benefits:
    '**Mutton/Lamb:** Rich in iron, zinc, B12, and complete protein. Contains conjugated linoleic acid (CLA) studied for metabolic benefits. In Ayurveda, mutton is considered warming and nourishing, recommended during winter.\n\n**Cumin:** A foundational digestive spice in Ayurveda and Unani medicine. Stimulates digestive enzymes.\n\n**Green Chilies:** Contain capsaicin with anti-inflammatory and metabolic properties.',
  why_this_works:
    'Kneading develops myosin, a sticky protein that acts as natural glue, the same principle behind sausage-making. Squeezing the onion dry prevents steam pockets that weaken the structure. The fat content (20%+) bastes the meat from inside during cooking. Chilling firms the fat for easier shaping.',
  substitutions: 'Beef mince with 20% fat works identically. Chicken thigh mince with 1 tbsp cream cheese for binding. Broil on a wire rack at high, 4-5 min per side. Without skewers, shape into logs and pan-fry.',
  serving_suggestions: 'On hot naan or inside a paratha roll with raw onion, green chutney, lemon wedges, and chaat masala. Alongside chicken achar, raita, and a cucumber-tomato salad. Part of a mixed grill platter.',
  storage_reheating: 'Cooked kebabs keep 3 days. Raw mixture keeps 24 hours shaped and refrigerated. Reheat under a broiler 2-3 min per side. Raw mixture freezes well for 2 months.',
  cultural_notes: 'Seekh kebabs are street food across Pakistan and northern India. The word seekh means skewer. The technique of hand-pressing spiced mince onto flat metal skewers and grilling over charcoal is ancient. The no-binder approach, relying on myosin development through kneading, is the hallmark of authentic preparation.',
  tags: ['indian', 'punjabi', 'pakistani', 'mutton', 'lamb', 'kebab', 'seekh', 'grilled', 'street-food', 'spicy', 'gluten-free', 'dairy-free'],
  seo_title: 'Mutton Seekh Kebab — Charcoal-Grilled Spiced Lamb Skewers',
  meta_description: 'Mutton seekh kebabs with hand-kneaded spiced mince, fresh herbs, and green chili, grilled until charred and juicy. No binder, no filler, just technique.',
  published: true,
}

const { error } = await supabase
  .from('recipes')
  .upsert(recipe, { onConflict: 'slug' })

if (error) {
  console.error('❌', error.message)
  process.exit(1)
}
console.log('✅ Mutton Seekh Kebab seeded')
