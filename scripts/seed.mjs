import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const ingredients = [
  {
    name: "Turmeric",
    slug: "turmeric",
    alternative_names: ["Haldi", "Curcuma longa", "Indian Saffron"],
    overview: "A rhizomatous plant in the ginger family, turmeric has been at the center of South Asian cooking and healing traditions for over four thousand years. Its warm, slightly bitter flavor and vivid golden color make it one of the most recognizable spices in the world.",
    flavor_profile: ["earthy", "warm", "slightly bitter", "peppery", "musky"],
    cultural_history: "Turmeric has been used in Ayurvedic medicine since at least 500 BCE, described in ancient texts as a remedy for digestive problems, skin conditions, and inflammation. In South Asian households, it is as much a medicine cabinet staple as a pantry one. Golden milk — warm milk with turmeric, black pepper, and ghee — has been consumed as a nightly tonic for generations.",
    origin_regions: ["South Asia", "Southeast Asia", "India"],
    traditional_medicine_perspectives: {
      "Ayurveda": "Turmeric is considered a tridoshic spice — it balances all three doshas (Vata, Pitta, and Kapha). It is classified as a deepana (digestive stimulant) and pachana (carminative). Ayurvedic texts recommend it for liver support, skin health, and as an anti-inflammatory agent.",
      "Traditional Chinese Medicine": "In TCM, turmeric (Jiang Huang) is classified as warming, acrid, and bitter. It is said to move Qi and Blood, relieve pain, and clear obstructions. It is used for menstrual irregularities, chest pain, and joint pain caused by cold-damp patterns."
    },
    modern_scientific_research: "Curcumin, the primary bioactive compound in turmeric, has been widely studied for its anti-inflammatory and antioxidant properties. Research suggests it may inhibit NF-kB, a molecule that activates genes related to inflammation. Bioavailability is significantly enhanced when consumed with piperine (black pepper) — studies indicate a 2000% increase in absorption. Research also indicates potential benefits for cognitive function and metabolic health, though most studies note that curcumin's low bioavailability remains a challenge in clinical applications.",
    culinary_uses: "Turmeric is fundamental to South Asian curries, dals, and rice dishes. It is used fresh (grated rhizome) in Southeast Asian cooking and dried/ground throughout South Asia and the Middle East. Beyond flavoring, it acts as a natural dye, turning dishes a deep golden yellow. It pairs naturally with black pepper, ginger, coconut milk, and warm spices.",
    preparation_methods: "Ground turmeric can be added directly to dishes. Fresh turmeric root should be peeled and grated or pounded. Blooming ground turmeric in oil or ghee before adding other ingredients deepens its flavor and color. Always pair with black pepper when seeking anti-inflammatory benefits.",
    traditional_dishes: ["Golden milk", "Dal tadka", "Biryani", "Aloo gobi", "Khichdi"],
    tags: ["anti-inflammatory", "antioxidant", "digestive", "ayurveda", "tcm", "south-asian", "spice"],
    published: true
  },
  {
    name: "Ginger",
    slug: "ginger",
    alternative_names: ["Adrak (fresh)", "Sonth (dried)", "Zingiber officinale"],
    overview: "Ginger is one of the oldest and most globally dispersed culinary and medicinal plants, used continuously across Asia, the Middle East, and Europe for over five thousand years. Its sharp, warming heat and bright, citrusy aroma make it indispensable in both sweet and savory cooking.",
    flavor_profile: ["spicy", "warm", "bright", "citrusy", "pungent"],
    cultural_history: "Ginger appears in ancient Sanskrit texts, Chinese medical manuscripts, and the writings of Greek and Roman physicians. The spice trade routes that connected Asia to Europe were partly built on demand for ginger. In medieval Europe, it was nearly as common as pepper. In South Asia, it remains a foundational flavor — nearly every savory dish begins with ginger, garlic, and onion.",
    origin_regions: ["Southeast Asia", "South Asia", "China"],
    traditional_medicine_perspectives: {
      "Ayurveda": "Ginger (Shunthi when dried, Adrak when fresh) is considered one of Ayurveda's most important medicinal plants. It is classified as a deepana (digestive stimulant) and is used to kindle agni (digestive fire). Fresh and dried ginger are considered distinct medicines — fresh is more cooling and drying, dried is more heating and stimulating.",
      "Traditional Chinese Medicine": "In TCM, fresh ginger (Sheng Jiang) warms the Lung and Stomach, disperses cold, and stops vomiting. Dried ginger (Gan Jiang) is hotter and more penetrating — used to warm the interior and rescue devastated Yang. Ginger is prescribed for nausea, cold-induced digestive complaints, and exterior wind-cold patterns."
    },
    modern_scientific_research: "Ginger contains gingerols and shogaols — bioactive compounds with well-documented anti-nausea properties. Clinical trials consistently show ginger reduces nausea related to pregnancy, chemotherapy, and motion sickness. Research also suggests anti-inflammatory effects comparable to ibuprofen in some studies, with potential benefits for osteoarthritis and muscle pain. Its gastroprotective properties are supported by multiple studies showing reduction in gastric ulcer formation.",
    culinary_uses: "Fresh ginger is used in stir-fries, curries, soups, and marinades. Dried ground ginger is used in baking, spice blends, and some curry powders. Ginger pairs with garlic, scallion, turmeric, cardamom, citrus, and soy sauce. It is essential in many Asian cuisines and widely used in Middle Eastern and West African cooking.",
    preparation_methods: "Peel fresh ginger with a spoon (easier than a peeler on the knobbly root). Grate on a microplane for maximum juice release. Slice or julienne for soups and braises. Store unpeeled fresh ginger in the freezer and grate directly from frozen.",
    traditional_dishes: ["Ginger tea", "Ginger chicken", "Khichdi", "Gingerbread", "Miso soup"],
    tags: ["anti-nausea", "anti-inflammatory", "digestive", "ayurveda", "tcm", "spice", "warming"],
    published: true
  },
  {
    name: "Saffron",
    slug: "saffron",
    alternative_names: ["Kesar", "Zafaran", "Crocus sativus"],
    overview: "The world's most expensive spice by weight, saffron consists of the dried stigmas of the Crocus sativus flower. Each flower produces only three stigmas, all harvested by hand. Its flavor is floral, honeyed, and slightly metallic — unlike anything else in the spice world.",
    flavor_profile: ["floral", "honeyed", "slightly metallic", "earthy", "complex"],
    cultural_history: "Saffron cultivation dates to ancient Persia (modern Iran), where it has been used for over three thousand years in cooking, medicine, and dye. Persian poetry and cuisine are intertwined with saffron. The Mughal court in India adopted it enthusiastically — it became central to biryanis and kormas. In Spain, saffron arrived with the Moors and became essential to paella and other rice dishes.",
    origin_regions: ["Persia (Iran)", "Kashmir", "Spain", "Greece"],
    traditional_medicine_perspectives: {
      "Ayurveda": "Saffron (Kumkuma) is considered warm and sweet in Ayurveda. It is used to stimulate digestion, improve circulation, and support reproductive health. It is often prescribed in Ayurvedic formulations for women's health and as a general tonic mixed with warm milk.",
      "Traditional Chinese Medicine": "In TCM, saffron (Xi Hong Hua) is used to invigorate Blood, dispel stasis, and relieve emotional depression. It is prescribed for menstrual irregularities, pain from Blood stagnation, and conditions where emotional constraint has caused physical symptoms."
    },
    modern_scientific_research: "Saffron has been studied for its effects on mood — several clinical trials show it to be as effective as low-dose antidepressants for mild to moderate depression, with fewer side effects. Its active compounds, crocin and safranal, show antioxidant, neuroprotective, and anti-inflammatory properties in research. Studies also suggest potential benefits for memory and cognitive function in early Alzheimer's disease.",
    culinary_uses: "Saffron must be bloomed before use — steep threads in warm water, milk, or broth for 15 to 30 minutes to release color and flavor. A small pinch (20 to 30 threads) is sufficient for most dishes. Essential to Persian polo rice, Milanese risotto, Provençal bouillabaisse, and Indian biryani.",
    preparation_methods: "Crush threads lightly with your fingers before steeping. Bloom in a small amount of warm (not boiling) liquid for at least 15 minutes. Add the saffron water along with its threads to the dish. Never add dry threads directly to a dish — the flavor will not fully develop.",
    traditional_dishes: ["Biryani", "Risotto Milanese", "Bouillabaisse", "Persian saffron rice", "Kheer"],
    tags: ["mood", "antioxidant", "anti-inflammatory", "ayurveda", "tcm", "persian", "spice", "luxury"],
    published: true
  },
  {
    name: "Black Pepper",
    slug: "black-pepper",
    alternative_names: ["Kali Mirch", "Piper nigrum", "King of Spices"],
    overview: "Black pepper is the most traded spice in the world. The dried fruit of a flowering vine native to South India, it has been used in cooking and medicine for over four thousand years. Its sharp, biting heat comes from piperine — a compound with significant medicinal properties of its own.",
    flavor_profile: ["sharp", "spicy", "woody", "citrusy", "pungent"],
    cultural_history: "Black pepper was so valuable in ancient and medieval trade that it was used as currency and offered to gods. The spice trade routes connecting India to the Mediterranean world were largely built on pepper demand. Vasco da Gama's 1498 voyage to India was driven by the desire to break Arab monopolies on the pepper trade. In Ayurveda, pepper has been used medicinally since the time of the earliest Sanskrit texts.",
    origin_regions: ["South India", "Kerala", "Southeast Asia"],
    traditional_medicine_perspectives: {
      "Ayurveda": "Black pepper (Maricha) is considered one of Ayurveda's most important medicinal spices. It is used to stimulate digestive fire (agni), treat respiratory congestion, and enhance the bioavailability of other herbs. Trikatu — a formula of black pepper, long pepper, and ginger — is one of the most commonly prescribed Ayurvedic combinations for digestion and metabolism.",
      "Traditional Chinese Medicine": "In TCM, black pepper (Hu Jiao) is acrid and hot, warming the middle burner and dispersing cold. It is used for stomach cold with vomiting, diarrhea, and abdominal pain caused by cold patterns. It is also used topically for pain caused by cold-damp obstruction."
    },
    modern_scientific_research: "Piperine, black pepper's primary bioactive, enhances the bioavailability of many compounds by inhibiting enzymes that break them down in the gut. This is most famously documented with curcumin (turmeric) — piperine increases curcumin absorption by up to 2000%. Piperine also shows antioxidant, anti-inflammatory, and potential anti-cancer properties in preclinical research. Studies suggest benefits for cognitive function and thermogenesis.",
    culinary_uses: "Black pepper is used in virtually every global cuisine. Freshly ground pepper has dramatically more flavor than pre-ground. It pairs with nearly everything — meats, vegetables, eggs, cheeses, fruits. Essential to spice blends including garam masala, quatre épices, and mole negro.",
    preparation_methods: "Always grind fresh from whole peppercorns for best flavor. Toast whole peppercorns in a dry pan before grinding to deepen flavor. Crack coarsely for steak au poivre, grind fine for general seasoning.",
    traditional_dishes: ["Cacio e pepe", "Pepper chicken", "Steak au poivre", "Garam masala", "Rasam"],
    tags: ["bioavailability-enhancer", "digestive", "anti-inflammatory", "ayurveda", "tcm", "spice", "essential"],
    published: true
  },
  {
    name: "Cardamom",
    slug: "cardamom",
    alternative_names: ["Elaichi", "Elettaria cardamomum", "Queen of Spices"],
    overview: "Cardamom is among the world's oldest spices, native to the forests of South India and used medicinally and culinarily for at least four thousand years. Its intensely aromatic pods contain seeds with a complex flavor — floral, citrusy, slightly camphoraceous, and deeply warming.",
    flavor_profile: ["floral", "citrusy", "warm", "slightly camphoraceous", "sweet"],
    cultural_history: "Cardamom appears in ancient Ayurvedic texts as a remedy for digestive complaints and as an aromatic to freshen breath. It spread via trade routes to Persia and the Arab world, where it became essential to coffee and sweet preparations. In Scandinavia — an unusual endpoint for a tropical spice — it became central to baking through Viking-era trade networks.",
    origin_regions: ["South India", "Kerala", "Guatemala", "Sri Lanka"],
    traditional_medicine_perspectives: {
      "Ayurveda": "Cardamom (Ela) is considered tridoshic — balancing for all three doshas. It is classified as a deepana (digestive stimulant) and is used to treat nausea, bad breath, and respiratory conditions. It is considered particularly beneficial for Kapha-type digestive sluggishness.",
      "Traditional Chinese Medicine": "In TCM, cardamom (Sha Ren) warms the Spleen and Stomach, moves Qi, and dispels dampness. It is prescribed for nausea, vomiting, diarrhea, and abdominal bloating caused by cold-damp obstructing the middle burner."
    },
    modern_scientific_research: "Cardamom shows promising anti-inflammatory and antioxidant properties in research. Studies suggest benefits for blood pressure reduction, with one randomized controlled trial showing significant reductions in hypertensive subjects after 12 weeks. Research also indicates potential anti-ulcer properties and blood sugar modulation effects. Its volatile oils show antimicrobial activity against several pathogens.",
    culinary_uses: "Used in both sweet and savory preparations across South Asia, the Middle East, and Scandinavia. Green cardamom pods are used whole in biryanis and rice dishes, ground in spice blends and baking. Black cardamom (a different species) is smokier and used primarily in savory dishes. Essential to chai, Arabic coffee, and many desserts.",
    preparation_methods: "Lightly crush pods to release seeds before use. Use whole pods in rice and braise dishes, remove before serving. For maximum flavor, toast pods briefly in a dry pan, then grind seeds fresh. Ground cardamom loses potency quickly — buy small quantities.",
    traditional_dishes: ["Chai", "Arabic coffee", "Biryani", "Kheer", "Scandinavian cardamom buns"],
    tags: ["digestive", "anti-inflammatory", "antioxidant", "ayurveda", "tcm", "spice", "aromatic"],
    published: true
  }
]

const recipes = [
  {
    title: "Khichdi",
    slug: "khichdi",
    subtitle: "The ancient healing porridge of South Asia",
    cultural_origin: "India",
    tradition: "Ayurveda",
    headnote: "Khichdi is perhaps the oldest continuously cooked dish in South Asian history. Mentioned in ancient Sanskrit texts and described by the fourteenth-century Moroccan traveler Ibn Battuta as a dish eaten across the Indian subcontinent, it has fed people through illness, harvest seasons, and quiet evenings for thousands of years.\n\nIn Ayurveda, khichdi occupies a unique position: it is considered the ideal food for restoring balance to all three doshas. The combination of rice and split mung dal creates a complete protein while remaining easy to digest. Ghee, turmeric, ginger, and cumin are not mere flavorings here — each is selected for its digestive and anti-inflammatory properties.\n\nThis version follows the traditional Ayurvedic preparation closely, with a tadka (tempered spice bloom) added at the end to deepen flavor without compromising digestibility. It is soft, golden, and deeply soothing — the kind of food that feels like care.",
    yield: "4 servings",
    prep_time: "10 minutes",
    cook_time: "35 minutes",
    total_time: "45 minutes",
    difficulty: "Easy",
    ingredients: [
      {"amount": "1", "unit": "cup", "ingredient": "white basmati rice", "prep_note": "rinsed until water runs clear", "optional": false},
      {"amount": "½", "unit": "cup", "ingredient": "split yellow mung dal", "prep_note": "rinsed", "optional": false},
      {"amount": "4", "unit": "cups", "ingredient": "water", "prep_note": null, "optional": false},
      {"amount": "2", "unit": "tbsp", "ingredient": "ghee", "prep_note": "divided", "optional": false},
      {"amount": "1", "unit": "tsp", "ingredient": "turmeric", "prep_note": "ground", "optional": false},
      {"amount": "1", "unit": "tsp", "ingredient": "cumin seeds", "prep_note": null, "optional": false},
      {"amount": "1", "unit": "inch", "ingredient": "ginger", "prep_note": "peeled and finely grated", "optional": false},
      {"amount": "1", "unit": "tsp", "ingredient": "salt", "prep_note": "or to taste", "optional": false},
      {"amount": "¼", "unit": "tsp", "ingredient": "black pepper", "prep_note": "freshly ground", "optional": false},
      {"amount": "1", "unit": "tsp", "ingredient": "cumin seeds", "prep_note": "for tadka", "optional": false},
      {"amount": "1", "unit": "pinch", "ingredient": "asafoetida (hing)", "prep_note": "for tadka", "optional": true}
    ],
    instructions: [
      {"step": 1, "text": "Combine the rinsed rice and mung dal in a medium pot. Add the water, 1 tablespoon of ghee, turmeric, grated ginger, salt, and black pepper. Stir to combine."},
      {"step": 2, "text": "Bring to a boil over medium-high heat, then reduce to a low simmer. Cook uncovered, stirring occasionally, for 25 to 30 minutes until the rice and dal have broken down into a soft, porridge-like consistency. Add more water if it becomes too thick — the finished texture should be looser than you think, as it thickens further off heat."},
      {"step": 3, "text": "While the khichdi finishes cooking, prepare the tadka. Heat the remaining tablespoon of ghee in a small pan over medium-high heat until it shimmers. Add the cumin seeds — they should sizzle immediately. Cook for 30 seconds until fragrant and beginning to turn golden. Add the asafoetida if using and cook for 10 seconds more."},
      {"step": 4, "text": "Pour the tadka over the khichdi and stir to combine. Taste and adjust salt. Serve immediately, as it thickens quickly."}
    ],
    key_ingredient_benefits: "**Turmeric:** In Ayurveda, turmeric is considered a tridoshic spice — balancing for all constitutions — and is used to support liver function and reduce inflammation. Modern research identifies curcumin as the primary bioactive, with studies showing significant anti-inflammatory effects. Black pepper is added here not only for flavor but because piperine increases curcumin bioavailability by up to 2000%.\n\n**Mung Dal:** Split yellow mung dal is considered the easiest legume to digest in Ayurvedic tradition, making it appropriate even during illness or digestive recovery. It provides complete protein when combined with rice and is rich in folate, magnesium, and B vitamins.\n\n**Ghee:** Clarified butter holds a revered place in Ayurveda as a carrier for other medicinal properties and as a digestive aid in its own right. It is considered to kindle agni (digestive fire) rather than suppress it, unlike heavier fats.",
    why_this_works: "The combination of rice and split mung dal creates a nutritionally complete, highly digestible base. Cooking them together allows the starches to interweave, creating a porridge that is comforting without being heavy. The initial ghee and spice bloom distributes flavor throughout the dish, while the finishing tadka adds aromatic brightness that a single-stage cook cannot achieve.",
    substitutions: "Ghee can be replaced with coconut oil for a dairy-free version, though the flavor changes meaningfully. Yellow mung dal can be replaced with red lentils (cook time may reduce by 5 minutes). Brown basmati can be used but requires longer cooking and more water.",
    serving_suggestions: "Serve with a simple cucumber raita, a wedge of lemon to squeeze over, and a light pickle. A small amount of fresh cilantro scattered on top adds brightness. Khichdi pairs naturally with papadum and a simple vegetable sabzi.",
    storage_reheating: "Khichdi thickens considerably as it cools. Store in the refrigerator for up to 3 days. Reheat with a generous splash of water over low heat, stirring frequently, until loosened and hot throughout. It does not freeze well.",
    cultural_notes: "Khichdi is eaten across all of South Asia in dozens of regional variations — some with vegetables, some with meat, some extremely thin (pej, or rice gruel), some thick enough to mold. In Bengal it is prepared during the festival of Saraswati Puja. In Gujarat, it is a standard weekly meal. The dish's reputation as invalid food in some contexts undersells it: it has been the daily sustenance of monks, farmers, and travelers for millennia.",
    tags: ["ayurveda", "vegetarian", "vegan", "gluten-free", "anti-inflammatory", "digestive", "indian", "rice", "dal", "easy", "healing"],
    seo_title: "Khichdi Recipe — Ancient Ayurvedic Healing Porridge",
    meta_description: "A traditional Ayurvedic khichdi with turmeric, mung dal, and ghee. One of South Asia's oldest healing foods, made simple.",
    published: true
  },
  {
    title: "Golden Milk",
    slug: "golden-milk",
    subtitle: "The ancient Ayurvedic tonic, made as it has always been",
    cultural_origin: "India",
    tradition: "Ayurveda",
    headnote: "Golden milk — haldi doodh in Hindi — is not a wellness trend. It is a nightly ritual that has been practiced in South Asian households for centuries, long before it acquired its English name and appeared on café menus.\n\nIn Ayurveda, this preparation is a rasayana — a rejuvenating tonic meant to be taken regularly, not occasionally. Each ingredient is chosen with specific intent: turmeric for its anti-inflammatory properties, black pepper to make the curcumin bioavailable, ginger to kindle digestive fire, and ghee or a fat source to aid fat-soluble compound absorption. The honey, if used, is added only after the milk cools slightly, as Ayurveda holds that heating honey produces toxins.\n\nThis is the traditional preparation: not sweetened heavily, not made with six spices competing for attention, but quiet and purposeful. Drink it warm before sleep.",
    yield: "1 serving",
    prep_time: "2 minutes",
    cook_time: "8 minutes",
    total_time: "10 minutes",
    difficulty: "Easy",
    ingredients: [
      {"amount": "1", "unit": "cup", "ingredient": "whole milk", "prep_note": "or full-fat coconut milk for dairy-free", "optional": false},
      {"amount": "½", "unit": "tsp", "ingredient": "turmeric", "prep_note": "ground", "optional": false},
      {"amount": "¼", "unit": "tsp", "ingredient": "ginger", "prep_note": "ground, or ½ tsp fresh grated", "optional": false},
      {"amount": "1", "unit": "pinch", "ingredient": "black pepper", "prep_note": "freshly ground", "optional": false},
      {"amount": "¼", "unit": "tsp", "ingredient": "cardamom", "prep_note": "ground", "optional": false},
      {"amount": "½", "unit": "tsp", "ingredient": "ghee", "prep_note": null, "optional": true},
      {"amount": "1", "unit": "tsp", "ingredient": "raw honey", "prep_note": "added after cooling slightly, not while hot", "optional": true}
    ],
    instructions: [
      {"step": 1, "text": "Combine the milk, turmeric, ginger, black pepper, and cardamom in a small saucepan. Add the ghee if using."},
      {"step": 2, "text": "Heat over medium-low heat, whisking or stirring frequently, until the milk is hot and steaming — about 6 to 8 minutes. Do not let it boil."},
      {"step": 3, "text": "Pour into a mug. Allow to cool for 1 to 2 minutes until it is warm but not scalding. If using honey, stir it in now — adding honey to boiling liquid is avoided in Ayurvedic practice."},
      {"step": 4, "text": "Drink warm, ideally 30 to 60 minutes before sleep."}
    ],
    key_ingredient_benefits: "**Turmeric and Black Pepper:** The pairing is deliberate and ancient. Curcumin, turmeric's primary bioactive compound, is poorly absorbed on its own. Piperine in black pepper inhibits the enzyme that breaks curcumin down in the gut, increasing absorption by up to 2000% according to research. This combination appears in traditional Ayurvedic formulas centuries before the mechanism was understood.\n\n**Ginger:** Classified in Ayurveda as a universal medicine (vishwabhesaj), ginger warms the digestive system and has well-documented anti-inflammatory and anti-nausea properties in modern research. It also contains gingerols and shogaols that complement turmeric's curcumin.\n\n**Ghee:** In Ayurvedic pharmacology, ghee is used as a carrier — a vehicle that helps fat-soluble compounds like curcumin cross the gut lining more effectively. This function has partial support in modern nutrition research, which confirms that curcumin absorption improves significantly when consumed with fat.",
    why_this_works: "Every ingredient serves a dual purpose as food and medicine. The fat from milk and optional ghee makes the fat-soluble curcumin bioavailable. Black pepper dramatically enhances absorption further. The warming spices support evening digestion. The result is a preparation where the whole is meaningfully greater than the sum of its parts.",
    substitutions: "Full-fat coconut milk works well and adds a subtle sweetness. Maple syrup can replace honey (add at any point, as the Ayurvedic restriction applies specifically to honey). Freshly grated ginger can replace ground — use about twice the amount.",
    serving_suggestions: "Drink before sleep for maximum benefit. Can be served over ice in summer as a golden iced latte. Works well with a small piece of dark chocolate.",
    storage_reheating: "Best made fresh. If making ahead, store in a sealed jar in the refrigerator for up to 2 days. Reheat gently over low heat, stirring well — the spices will have settled.",
    cultural_notes: "The Western popularization of golden milk in the 2010s created some distance from its origins — it became a café menu item rather than a household remedy. In its traditional context, haldi doodh is not consumed for novelty. It is given to children with colds, to new mothers during recovery, and to anyone whose digestion or joints are troubled. Its power is in consistency, not occasion.",
    tags: ["ayurveda", "vegetarian", "gluten-free", "anti-inflammatory", "tonic", "drinks", "turmeric", "ginger", "easy", "healing", "bedtime"],
    seo_title: "Golden Milk Recipe — Traditional Ayurvedic Haldi Doodh",
    meta_description: "The traditional Ayurvedic golden milk recipe with turmeric, black pepper, ginger, and ghee. Made as it has always been.",
    published: true
  }
]

async function seed() {
  console.log('Seeding ingredients...')
  for (const ingredient of ingredients) {
    const { error } = await supabase
      .from('ingredients')
      .upsert(ingredient, { onConflict: 'slug' })
    if (error) {
      console.error(`❌ Failed: ${ingredient.name}`, error.message)
      process.exit(1)
    }
    console.log(`✅ ${ingredient.name}`)
  }

  console.log('\nSeeding recipes...')
  for (const recipe of recipes) {
    const { error } = await supabase
      .from('recipes')
      .upsert(recipe, { onConflict: 'slug' })
    if (error) {
      console.error(`❌ Failed: ${recipe.title}`, error.message)
      process.exit(1)
    }
    console.log(`✅ ${recipe.title}`)
  }

  console.log('\nDone.')
}

seed()
