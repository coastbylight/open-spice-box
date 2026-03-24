import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

// Batch 4: Root vegetables, dried/preserved pantry, tofu varieties, noodles & wrappers
// Note: mustard-greens (fresh) already exists — preserved-mustard-greens is a distinct entry.
// Note: shiitake-mushrooms (fresh) already exists — dried-shiitake-mushrooms is a distinct entry.

const ingredients = [
  // --- Root Vegetables ---
  {
    name: "Daikon Radish",
    slug: "daikon-radish",
    alternative_names: ["Luo Bo", "White Radish", "Japanese Radish", "Chinese Radish", "Raphanus sativus var. longipinnatus"],
    overview: "Daikon is a large, mild-flavored white radish that is one of the most versatile and beloved vegetables in East Asian cooking. Raw, it is crisp and mildly peppery with a clean, refreshing bite; cooked, it turns silky and sweet, absorbing the flavors of the broth or sauce around it with exceptional aptitude. A single daikon can weigh several kilograms and delivers extraordinary culinary range: it can be braised until tender as butter, shredded raw into a palate-cleansing salad, pickled into a condiment, pressed into rice flour cakes, or used as a garnish. In Chinese, Japanese, and Korean cooking, daikon is a cornerstone ingredient.",
    flavor_profile: ["mild", "slightly peppery", "clean", "crisp", "sweet when cooked"],
    cultural_history: "Daikon has been cultivated in China for over a thousand years and spread throughout East and Southeast Asia, becoming independently central to Chinese, Japanese, Korean, Vietnamese, and Indian cooking. In Japan, daikon is one of the most consumed vegetables — featured in simmered dishes (oden), grated as a condiment (oroshi daikon), and pickled as takuan. In China, luo bo appears in soups, stir-fries, and as a major ingredient in the dim sum staple lo bak go (turnip cake, though daikon is not a turnip). In Korea, daikon is critical to kimchi and banchan culture. Daikon radish cakes have become a defining item of Cantonese dim sum worldwide.",
    origin_regions: ["China", "Japan", "Korea", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Daikon (Luo Bo) is classified as cool and acrid-sweet in TCM, associated with the Lung, Stomach, and Large Intestine meridians. It is one of the most important vegetables in TCM dietary medicine — used to resolve food stagnation, transform phlegm, clear Lung heat, relieve cough, and promote digestion. A Chinese proverb holds that 'a daikon a day keeps the doctor away,' reflecting centuries of belief in its digestive and respiratory benefits. It is prescribed for accumulation of food, phlegm-heat cough, and abdominal distension."
    },
    modern_scientific_research: "Daikon contains glucosinolates that break down to isothiocyanates, compounds with documented antimicrobial and potential cancer-preventive properties. It contains amylases, proteases, and esterases — digestive enzymes that survive in raw preparations and support the breakdown of starchy foods. Research shows daikon consumption may reduce the formation of N-nitroso compounds in the stomach. It is rich in vitamin C, folate, and potassium.",
    culinary_uses: "Braise in dashi or master stock with soy sauce and mirin for a classic simmered preparation. Shred raw and use as a garnish with fish to cut through richness. Grate raw (oroshi) and serve alongside grilled fish and tempura. Make daikon radish cake (lo bak go) with rice flour for dim sum. Pickle in rice vinegar, sugar, and salt for a bright condiment. Add to hot pots and soups for sweetness and body.",
    preparation_methods: "Peel with a vegetable peeler — the skin is fibrous and should be removed for most applications. For braising, cut into thick rounds or half-moons. For soups, cut into chunks. For raw preparations, julienne or grate. Blanch daikon briefly before adding to simmered dishes to remove bitterness. Store in the refrigerator wrapped in damp paper towel.",
    traditional_dishes: ["Daikon and pork rib soup", "Braised daikon with soy sauce", "Daikon radish cake (lo bak go)", "Pickled daikon", "Japanese oroshi daikon with grilled fish"],
    tags: ["vegetable", "chinese", "japanese", "korean", "braising", "pickling", "digestive", "tcm"],
    published: true
  },
  {
    name: "Taro",
    slug: "taro",
    alternative_names: ["Yu Tou", "Yam Taro", "Colocasia esculenta", "Arbi", "Kalo", "Dasheen"],
    overview: "Taro is one of the oldest cultivated root vegetables in the world — a large, shaggy-skinned corm with purple-specked white flesh that turns creamy and richly starchy when cooked. Its flavor is mild and subtly sweet with a distinctive nuttiness, and its texture when fully cooked is smooth and almost fluffy. Raw taro contains calcium oxalate crystals that cause irritation — it must always be cooked. In Chinese cooking, taro appears in both savory and sweet preparations, often paired with rich fatty meats or coconut milk.",
    flavor_profile: ["starchy", "mildly sweet", "nutty", "earthy", "creamy when cooked"],
    cultural_history: "Taro has been cultivated for at least ten thousand years, originating in Southeast Asia and spreading globally with human migration. It is the primary starchy staple of many Pacific Island cultures (poi in Hawaii) and has been central to South and Southeast Asian cooking for millennia. In Chinese cuisine, taro (yu tou) is associated with Cantonese and Hakka cooking — the dim sum classic wu gok (taro dumpling with honeycomb crust) is one of the most technically demanding dim sum items. Braised pork belly with taro is a Cantonese and Hakka celebration dish, the taro absorbing the rich braising liquid to become more flavorful than the meat itself.",
    origin_regions: ["Southeast Asia (origin)", "China", "South Asia", "Pacific Islands", "West Africa"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Taro (Yu Tou) is classified as neutral and sweet in TCM, associated with the Spleen, Stomach, and Large Intestine meridians. It is used to tonify the Spleen and Stomach, resolve accumulation, reduce nodules and swellings, and support digestion. It is considered a tonifying, grounding food appropriate for people with Spleen deficiency."
    },
    modern_scientific_research: "Taro contains resistant starch — a type of dietary fiber that acts as a prebiotic in the colon, supporting gut microbiome health. Research shows resistant starch consumption lowers postprandial blood glucose and insulin responses. Taro is a good source of potassium, magnesium, vitamin E, and B vitamins. The purple pigmentation in some varieties comes from anthocyanins with antioxidant properties.",
    culinary_uses: "Braise with pork belly and oyster sauce for the classic Cantonese preparation. Use as a base for Taiwanese taro balls in sweet soup. Use in dim sum dumpling dough (wu gok). Add to coconut milk with palm sugar for a simple dessert soup. Fry thin slices for taro chips.",
    preparation_methods: "Always handle raw taro with gloves or oiled hands — the calcium oxalate crystals in raw taro cause skin irritation. Peel thickly with a knife. Cut into chunks for braising. For mashing and dumplings, steam or boil until completely tender, then mash with butter or lard while hot. Always cook thoroughly — raw taro is inedible.",
    traditional_dishes: ["Braised pork belly with taro", "Wu gok (taro dumpling)", "Taro balls in sweet ginger soup", "Cantonese steamed taro cake", "Taro in coconut milk"],
    tags: ["root-vegetable", "chinese", "cantonese", "starchy", "comfort", "tcm", "tropical"],
    published: true
  },
  {
    name: "Chinese Yam",
    slug: "chinese-yam",
    alternative_names: ["Shan Yao", "Huai Shan", "Dioscorea polystachya", "Japanese Mountain Yam", "Nagaimo"],
    overview: "Chinese yam is a climbing vine with a long, cylindrical tuber valued throughout East Asia both as a food and as one of the most important tonic herbs in Traditional Chinese Medicine. Its flesh is dense, starchy, and white, with a uniquely mucilaginous texture when grated raw that is prized in Japanese cooking. Cooked, it turns fluffy and mild with a clean, slightly sweet flavor. In Chinese medicinal cooking, shan yao is one of the most regularly prescribed dietary tonics, appearing in soups and congee designed to strengthen the Spleen and Lungs.",
    flavor_profile: ["mild", "slightly sweet", "starchy", "mucilaginous when raw", "fluffy when cooked"],
    cultural_history: "Chinese yam has been cultivated in China for over two thousand years. Henan province, where the Huai River flows, produces the most prized variety — Huai Shan — which has been used in both cooking and pharmacy since antiquity. It appears in the earliest Chinese medical texts and remains one of the most widely used tonic food-medicines in TCM practice today. In Japan, raw grated nagaimo (tororo) is a beloved condiment served over rice or soba, its slippery, mucilaginous texture considered both delicious and fortifying.",
    origin_regions: ["China", "Japan", "Korea", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Chinese yam (Shan Yao) is one of the most important tonic herbs in the TCM pharmacopoeia — classified as neutral and sweet, associated with the Spleen, Lung, and Kidney meridians. It tonifies Qi and Yin simultaneously across all three organ systems, strengthens the Spleen, nourishes Lung Yin, and astringes the Kidney. It is frequently prescribed for Spleen Qi deficiency (fatigue, poor appetite, loose stools), Lung Yin deficiency (dry cough), and Kidney deficiency. It is considered one of the safest, most widely applicable tonic herbs."
    },
    modern_scientific_research: "Chinese yam contains diosgenin, a steroidal saponin that serves as a precursor to synthetic steroid hormones in pharmaceutical production. Research suggests diosgenin and related compounds may have estrogenic, anti-osteoporosis, and anti-inflammatory effects. The mucilage may support gut health and slow glucose absorption. Research on shan yao polysaccharides shows immunomodulatory and antioxidant activity.",
    culinary_uses: "Add chunks to bone broth soups alongside other tonic ingredients (goji berries, longan, lotus seeds) for a classic medicinal soup. Stir-fry sliced yam with wood ear mushrooms. Grate raw and serve over rice or soba noodles in the Japanese style. Add to congee for extra nutrition and a smooth texture.",
    preparation_methods: "Peel the brown skin — wear gloves as the mucilage can cause mild skin irritation. Slice or cube for soups and stir-fries. For grating: grate the peeled yam into a bowl — the result is viscous and slippery. Keep peeled yam in acidulated water to prevent browning.",
    traditional_dishes: ["Shan yao and pork rib soup", "Stir-fried Chinese yam with wood ear", "Tororo over rice (Japanese)", "Congee with shan yao", "Red date and yam sweet soup"],
    tags: ["root-vegetable", "chinese", "tcm", "spleen", "tonic", "medicinal", "adaptogenic"],
    published: true
  },
  {
    name: "Water Chestnuts",
    slug: "water-chestnuts",
    alternative_names: ["Ma Ti", "Chinese Water Chestnut", "Eleocharis dulcis", "Pi Qi"],
    overview: "Water chestnuts are the corms of an aquatic sedge plant — not a nut at all, but a firm, crisp, starchy vegetable that grows in shallow water and mudflats. Their defining quality is their extraordinary crunch, which survives cooking remarkably well. The flavor is mild, slightly sweet, and clean, with a faint nuttiness. Fresh water chestnuts are far superior to canned, with a sweeter flavor and even better crunch; both are used in Chinese cooking as a textural accent in stir-fries, dumplings, meatballs, and desserts.",
    flavor_profile: ["crisp", "slightly sweet", "fresh", "clean", "nutty"],
    cultural_history: "Water chestnuts have been cultivated in China for over three thousand years and feature prominently in the food culture of Guangdong and southern China, where water-based agriculture flourished in the Pearl River Delta. Fresh water chestnuts were once sold by street vendors as a snack across Chinese cities. Ma ti gao (water chestnut cake) is a classic Cantonese dim sum and New Year's treat. In Cantonese cooking, water chestnut is added to meatballs and wontons specifically for the textural contrast it provides.",
    origin_regions: ["China", "Southeast Asia", "South Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Water chestnuts (Ma Ti) are classified as cool and sweet in TCM, associated with the Lung and Stomach meridians. They are used to clear heat, generate fluids, transform phlegm, detoxify, and support the digestion. They are prescribed for heat conditions affecting the Lung and Stomach, thirst, dry throat, and phlegm-heat cough. Considered a cooling, refreshing food particularly appropriate for summer consumption."
    },
    modern_scientific_research: "Water chestnuts contain phloretin, a flavonoid compound studied for antibacterial and antioxidant properties. Research suggests water chestnut extract may inhibit certain bacterial strains and have anti-inflammatory effects. They are a good source of potassium, manganese, copper, vitamin B6, and riboflavin. The starch structure contributes to their unique cooking-resistant crunch.",
    culinary_uses: "Add diced water chestnuts to pork, shrimp, or chicken meatballs and fillings for crunch. Use in stir-fries as a textural element. Make ma ti gao (water chestnut cake) with rice flour. Add to hot pots near the end of cooking to preserve crunch. Combine with bamboo shoots and mushrooms in vegetarian stir-fries.",
    preparation_methods: "Fresh: peel the dark brown outer skin with a knife or peeler. The inner flesh is white and firm. Canned: drain and rinse well. For maximum crunch in cooked dishes, add in the final minute of cooking.",
    traditional_dishes: ["Ma ti gao (water chestnut cake)", "Cantonese steamed meatballs with water chestnut", "Stir-fried water chestnuts with snow peas", "Wonton filling", "Red bean and water chestnut dessert soup"],
    tags: ["vegetable", "chinese", "cantonese", "crisp", "starchy", "sweet", "texture", "cooling"],
    published: true
  },
  {
    name: "Arrowhead Root",
    slug: "arrowhead-root",
    alternative_names: ["Ci Gu", "Arrowhead", "Sagittaria trifolia", "Chinese Arrowhead", "Duck Potato"],
    overview: "Arrowhead root is a small, smooth-skinned aquatic tuber harvested in late autumn and winter from shallow ponds and paddy fields. The corm has a mildly starchy, slightly sweet flavor with a clean, earthy quality reminiscent of potato. It is a seasonal delicacy in Shanghainese and Cantonese cooking — available only in the colder months — and is one of the traditional New Year ingredients of the Yangtze Delta. Slow-braised with pork fat and soy sauce until caramelized, it achieves extraordinary depth of flavor for such a humble root.",
    flavor_profile: ["mildly starchy", "slightly sweet", "clean", "earthy", "potato-like"],
    cultural_history: "Arrowhead root has been harvested and eaten in China for over two thousand years, growing wild in rice paddies and wetlands across the Yangtze Delta. In Shanghai and the surrounding Jiangnan region, it is a deeply cherished seasonal ingredient associated with the lunar New Year and cold-weather cooking. The traditional Shanghainese preparation — ci gu braised slowly with pork belly fat, soy sauce, sugar, and Shaoxing wine until deeply glossy — is considered a defining regional dish.",
    origin_regions: ["China", "East Asia", "Southeast Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Arrowhead (Ci Gu) is classified as neutral to slightly cool and sweet in TCM, associated with the Spleen and Stomach meridians. It is used to strengthen the Spleen, promote digestion, resolve phlegm and nodules, detoxify, and promote urination. Considered a nourishing, digestive food appropriate for most constitutions."
    },
    modern_scientific_research: "Arrowhead root is a source of complex carbohydrates, potassium, phosphorus, and B vitamins. It contains flavonoids and polyphenols with antioxidant properties. Research on similar aquatic tubers shows potential benefits for blood sugar regulation from the fiber and complex starch content.",
    culinary_uses: "Braise whole with pork belly, soy sauce, Shaoxing wine, and rock sugar for the classic Shanghainese preparation — long, slow cooking transforms them into deeply savory, glazed bites. Stir-fry sliced with garlic and oyster sauce. Add to hot pots and stews.",
    preparation_methods: "Peel the smooth outer skin with a knife or peeler. Cut off both ends. Leave whole for braising. Slice for stir-fries. Arrowhead root discolors quickly after peeling — keep in water until ready to cook. Available at Chinese markets only in autumn and winter.",
    traditional_dishes: ["Shanghainese braised arrowhead with pork belly", "Stir-fried arrowhead with garlic", "Hot pot root vegetables", "New Year braised mixed root vegetables"],
    tags: ["root-vegetable", "chinese", "shanghainese", "seasonal", "new-year", "starchy", "braising"],
    published: true
  },

  // --- Dried & Preserved Pantry ---
  {
    name: "Dried Shiitake Mushrooms",
    slug: "dried-shiitake-mushrooms",
    alternative_names: ["Dong Gu", "Winter Mushrooms", "Dried Xiang Gu", "Flower Mushrooms", "Hua Gu"],
    overview: "Dried shiitake mushrooms are one of the great pantry ingredients in Chinese and Japanese cooking — their flavor more concentrated, more complex, and more deeply umami than fresh shiitake by a significant degree. The drying process intensifies guanylate content (a flavor compound that acts synergistically with glutamates) to extraordinary levels, making dried shiitake one of the most potent natural sources of umami available to a cook. The soaking liquid they produce is equally prized — a dark, fragrant mushroom stock that is one of the finest vegetarian cooking liquids in the world. Dong gu (winter mushrooms), with their thick caps and characteristic cracked 'flower' pattern, are the premium grade.",
    flavor_profile: ["intensely umami", "deeply earthy", "woody", "concentrated", "rich"],
    cultural_history: "The tradition of drying shiitake mushrooms dates back centuries in China and Japan — a preservation technique that not only extended shelf life but dramatically improved flavor. Dried winter shiitake (dong gu) became luxury trade goods in imperial China, presented as tribute and used in the most refined court preparations. They feature prominently in Chinese New Year cooking and in the most celebrated Shanghainese and Cantonese braised preparations. The soaking liquid from reconstituted dried shiitake is treated as a prized stock.",
    origin_regions: ["China", "Japan", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Dried shiitake carry the same TCM profile as fresh — neutral and sweet, associated with the Spleen and Stomach — but their concentrated form is considered more tonifying. They are used to tonify Qi and Blood, support immune function, and strengthen the Spleen and Stomach. The drying process in TCM understanding concentrates the essential Qi of the mushroom, making it more medicinally potent."
    },
    modern_scientific_research: "Dried shiitake contain dramatically higher levels of guanylate (GMP) than fresh — the drying process converts RNA to GMP through enzymatic action, explaining the exponential flavor increase. Lentinan, the beta-glucan studied as an immune modulator, is present in high concentrations. Research shows dried shiitake consumption lowers LDL cholesterol (from eritadenine), modulates immune function, and provides ergothioneine (a potent antioxidant). The soaking liquid contains water-soluble lentinan and other bioactive compounds.",
    culinary_uses: "Rehydrate and braise whole for an intensely flavored preparation. Add to all braises, red-braised meats, and long-cooked preparations where the soaking liquid can be incorporated. Use in Buddha's delight as the primary umami source. Slice and add to dumpling fillings. Use the strained soaking liquid as a stock for soups and sauces.",
    preparation_methods: "Soak in warm (not boiling) water for 30–60 minutes until fully plumped. Squeeze gently back into the bowl. Strain the soaking liquid through a fine sieve to remove grit — reserve it. Trim and discard the tough woody stem. Do not discard the soaking liquid.",
    traditional_dishes: ["Buddha's delight (lo han jai)", "Red-braised pork with dried shiitake", "Stuffed shiitake caps", "Shanghainese lion's head meatball soup", "Steamed chicken with dried shiitake and ginger"],
    tags: ["mushroom", "dried", "chinese", "japanese", "umami", "pantry-staple", "tcm", "immune", "beta-glucan"],
    published: true
  },
  {
    name: "Dried Scallops",
    slug: "dried-scallops",
    alternative_names: ["Gan Bei", "Conpoy", "Dried Scallop", "Yao Zhu"],
    overview: "Dried scallops are among the most prized pantry ingredients in Cantonese cooking — concentrated buttons of intensely savory, sweet, oceanic flavor that elevate every dish they touch. The drying process concentrates the natural sweetness and umami of the scallop adductor muscle to extraordinary levels. Whole dried scallops are expensive and treated with great respect; lower-grade broken or shredded pieces are used more freely in everyday cooking. Just a small amount — one or two scallops per dish — is enough to transform a simple congee or braised preparation.",
    flavor_profile: ["intensely savory", "sweet", "deeply umami", "oceanic", "concentrated"],
    cultural_history: "Dried scallops have been produced and traded in China for centuries, with the finest specimens coming from the cold, clear coastal waters of Dalian in northeastern China and from Japan. In Cantonese cuisine, gan bei are a symbol of prosperity and quality — their expense and concentrated flavor making them a luxury ingredient used to signal care and celebration. They feature prominently in New Year dishes, imperial cuisine, and in high-end Cantonese cooking. Conpoy is the Cantonese name by which dried scallops became known internationally through Hong Kong.",
    origin_regions: ["China", "Japan", "Cantonese cuisine", "Southern China"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Dried scallops (Gan Bei) are classified as neutral and sweet-salty in TCM, associated with the Kidney, Liver, and Spleen meridians. They are used to nourish Yin, benefit the Kidney, tonify the Spleen and Stomach, and dissolve phlegm. Prescribed for Kidney Yin deficiency, fatigue, and poor appetite. Considered a high-quality tonic food."
    },
    modern_scientific_research: "Dried scallops are an exceptionally concentrated source of protein and amino acids, particularly glutamic acid and inosinic acid (IMP) — major contributors to umami taste. They provide high levels of zinc, selenium, magnesium, and vitamin B12. Research on the glycine and taurine content of scallops suggests cardiovascular-protective effects. The dehydration process concentrates all nutrients proportionally.",
    culinary_uses: "Add one or two dried scallops to congee for a profoundly flavored base. Use in XO sauce with dried shrimp, chili, and garlic. Add to clay pot rice for depth. Rehydrate and floss (shred finely) as a topping for congee. The soaking liquid is intensely flavored — add it to the dish.",
    preparation_methods: "Soak in cold or warm water for 2–4 hours (or overnight) until softened — cold water soaking produces the most delicate result. Reserve the soaking liquid. For flossing: soak until soft, steam briefly, cool, and shred by hand into fine threads.",
    traditional_dishes: ["Scallop and pork congee", "XO sauce", "Braised daikon with dried scallop", "Steamed tofu with dried scallop", "Turnip cake with dried scallop and pork"],
    tags: ["dried", "seafood", "chinese", "cantonese", "luxury", "umami", "pantry-staple", "new-year"],
    published: true
  },
  {
    name: "Dried Shrimp",
    slug: "dried-shrimp",
    alternative_names: ["Xia Mi", "Dried Prawns", "Hay Bee", "Ebi (Japanese)"],
    overview: "Dried shrimp are tiny, intensely flavored orange-pink shrimp that have been salted and sun-dried to a chewy, concentrated form. They are one of the essential umami-boosting ingredients in Chinese, Southeast Asian, and Brazilian cooking — small in size but enormous in flavor impact. Added to stir-fries, scrambled eggs, soups, and stuffings, they impart a savory, oceanic depth that anchors a dish's flavor profile. Unlike dried scallops, dried shrimp are affordable and used with abandon in everyday Chinese home cooking.",
    flavor_profile: ["intensely savory", "salty", "umami", "oceanic", "slightly sweet"],
    cultural_history: "Dried shrimp have been produced across coastal China, particularly in Guangdong, Fujian, and Zhejiang provinces, for centuries — a preservation technique that allowed the bounty of the sea to reach inland communities. In Cantonese home cooking, xia mi are a near-universal pantry staple, added to turnip cake, taro cake, and virtually every stir-fried leafy green. Dried shrimp spread globally with Chinese and Vietnamese diaspora communities and became a cornerstone seasoning in Southeast Asian and Latin American cuisines as well.",
    origin_regions: ["China", "Southeast Asia", "Cantonese cuisine", "Fujian"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Dried shrimp share the TCM properties of shrimp generally — warm and sweet-salty, associated with the Kidney and Spleen meridians. They are used to tonify Kidney Yang, strengthen the back, benefit Qi and Blood, and nourish the sea of marrow. Prescribed for Kidney Yang deficiency, weakness, and cold-type deficiency conditions."
    },
    modern_scientific_research: "Dried shrimp are a concentrated source of protein, iodine, selenium, calcium, and zinc — all amplified by the drying process. Iodine content is particularly high, reflecting the shrimp's marine origin. Research on shellfish consumption shows associations with improved thyroid function (from iodine), immune support (from zinc and selenium), and cardiovascular benefits. The calcium content of dried shrimp is notably high.",
    culinary_uses: "Add a small handful to stir-fried napa cabbage, leafy greens, or bean sprouts for savory depth. Use in turnip cake, taro cake, and other steamed savory cakes. Add to XO sauce. Use in fried rice and egg dishes. Grind coarsely and use as a seasoning powder. The soaking liquid is flavorful — add it to the dish.",
    preparation_methods: "For most applications, soak in warm water for 10–20 minutes to soften and remove excess salt. Drain, reserving the liquid. Chop roughly for stir-fries and stuffings.",
    traditional_dishes: ["Stir-fried napa cabbage with dried shrimp", "Lo bak go (turnip cake)", "XO sauce", "Fried rice", "Fujianese dried shrimp wonton soup"],
    tags: ["dried", "seafood", "chinese", "cantonese", "umami", "pantry-staple", "seasoning"],
    published: true
  },
  {
    name: "Fermented Black Beans",
    slug: "fermented-black-beans",
    alternative_names: ["Dou Chi", "Salted Black Beans", "Black Bean Paste", "Douchi"],
    overview: "Fermented black beans (dou chi) are small black soybeans that have been salted, steamed, and fermented — one of the oldest condiments in Chinese cooking, with a history stretching back over two thousand years. The fermentation transforms the beans into intensely savory, earthy, slightly pungent flavor bombs that pack extraordinary umami depth into every dish they touch. Used whole or roughly chopped and combined with garlic and ginger, they create the foundation of one of the great flavor bases in Cantonese cooking.",
    flavor_profile: ["intensely savory", "salty", "earthy", "deeply umami", "slightly pungent", "rich"],
    cultural_history: "Dou chi is documented in Chinese texts as early as the Han dynasty (206 BCE–220 CE), making it one of the oldest manufactured food products in Chinese history. Its origins likely lie in the accidental fermentation of salted soybeans, which ancient cooks recognized as creating something more flavorful than the original. Fermented black beans became central to Hunanese and Cantonese cooking and spread throughout Southeast Asia. In Cantonese dim sum culture, pai gwat (steamed pork ribs with black bean and garlic) is one of the most beloved items.",
    origin_regions: ["China", "Hunan", "Cantonese cuisine", "Sichuan"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Fermented black beans (Dou Chi) are classified as cool to neutral and bitter-sweet in TCM, associated with the Lung and Stomach meridians. Unlike plain black beans (which are warming), the fermentation process creates cooling properties. Dou Chi is prescribed to disperse wind-heat, clear vexation and heat, and resolve exterior conditions. It is used in classical formulas for early-stage fevers and heat patterns."
    },
    modern_scientific_research: "Fermented black beans contain bioactive peptides generated during fermentation, studied for ACE-inhibiting (blood pressure-lowering) properties. The fermentation process reduces phytic acid, increasing mineral bioavailability, and generates antioxidant compounds from soybean isoflavones. Research on fermented soy products consistently shows cardiovascular-protective, antioxidant, and potentially cancer-preventive effects.",
    culinary_uses: "Roughly chop or mash with garlic before using — this helps release flavor. Combine with garlic, ginger, and Shaoxing wine as the flavor base for steamed fish and ribs. Use in stir-fried shellfish (clams, mussels, lobster). Add to mapo tofu. Use in braised eggplant and bitter melon preparations.",
    preparation_methods: "Rinse lightly to remove excess salt if overly salty. Roughly chop or lightly mash before using in most applications. Combine with equal quantities of minced garlic for the classic Cantonese black bean-garlic base.",
    traditional_dishes: ["Dim sum pai gwat (steamed ribs with black bean)", "Cantonese steamed fish with black bean and ginger", "Stir-fried clams with black bean", "Bitter melon with black bean and beef", "Mapo tofu (black bean variant)"],
    tags: ["fermented", "chinese", "cantonese", "umami", "pantry-staple", "condiment", "probiotic"],
    published: true
  },
  {
    name: "Fermented Tofu",
    slug: "fermented-tofu",
    alternative_names: ["Doufu Ru", "Sufu", "Preserved Tofu", "Tofu Cheese", "Nan Ru (red)", "Bai Furu (white)"],
    overview: "Fermented tofu is tofu that has been inoculated with molds, aged in brine, and transformed into a soft, intensely savory, pungent paste-like substance — often called 'Chinese cheese' by those encountering it for the first time. It comes in two primary forms: white fermented tofu (bai furu), creamy and intensely salty-savory; and red fermented tofu (nan ru or hong furu), colored and flavored by red fermented rice, with a sweeter, more complex flavor. A single cube flavors an entire dish.",
    flavor_profile: ["intensely savory", "salty", "creamy", "pungent", "complex", "funky"],
    cultural_history: "Fermented tofu has been produced in China for over a thousand years, with the earliest records from the Tang dynasty. The fermentation technique likely developed as a preservation method for tofu. Over centuries, it evolved from a practical preservation food to a celebrated condiment with regional variations. In Cantonese cooking, the combination of fermented white tofu with garlic in stir-fried water spinach is one of the most beloved street food preparations. Red fermented tofu (nan ru) from Guangdong is used to marinate roasted meats and braise pork belly.",
    origin_regions: ["China", "Southern China", "Cantonese cuisine"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Fermented tofu shares properties with plain tofu (cool and sweet, tonifying Yin and clearing heat) but the fermentation process reduces the cooling nature somewhat. It is associated with the Spleen, Stomach, and Lung meridians and is used to strengthen the Spleen, clear heat, and tonify Qi. The active molds and bacteria involved in fermentation are understood to increase digestibility and bioavailability of nutrients."
    },
    modern_scientific_research: "Fermented tofu contains isoflavones from soybeans in more bioavailable forms — fermentation hydrolyzes isoflavone glycosides into aglycones (genistein, daidzein), which are absorbed more readily. Research on fermented soy isoflavones shows potential benefits for bone density, cardiovascular health, and hormone-related conditions. The beneficial molds used (Mucor, Actinomucor) produce enzymes with probiotic-like effects.",
    culinary_uses: "Use white fermented tofu in the sauce for stir-fried water spinach. Use red fermented tofu as a marinade for roasted pork (char siu) and suckling pig. Braise pork belly with red fermented tofu and Shaoxing wine. Spread white fermented tofu on congee or steamed rice as a condiment.",
    preparation_methods: "Remove cubes from the jar with a clean spoon. Mash with a fork before using in sauces. For stir-fries, add to the hot wok and break up with a spatula. Start with one cube per dish and adjust — fermented tofu is intensely salty and pungent.",
    traditional_dishes: ["Stir-fried water spinach with white fermented tofu", "Char siu (red fermented tofu marinade)", "Braised pork belly with nan ru", "Congee with fermented tofu", "Hot pot dipping sauce"],
    tags: ["fermented", "chinese", "cantonese", "umami", "condiment", "probiotic", "tcm", "pantry-staple"],
    published: true
  },
  {
    name: "Salted Duck Eggs",
    slug: "salted-duck-eggs",
    alternative_names: ["Xian Ya Dan", "Salted Eggs", "Muoi Trung Vit", "Itlog na Maalat"],
    overview: "Salted duck eggs are duck eggs cured in a brine of salt and water for 30–60 days, resulting in a firm, salty white and a dramatically changed yolk — dense, grainy, deeply orange, intensely flavored, and rich with an oily quality. The yolk, not the white, is the prize: it appears in mooncakes, lotus paste buns, and is the star of the modern 'salted egg yolk' craze that swept Asian food culture. A properly cured salted duck egg yolk is one of the most concentrated and distinctive flavors in the Chinese pantry.",
    flavor_profile: ["salty", "rich", "yolk is intensely orange and grainy", "white is firm", "savory"],
    cultural_history: "Salted eggs have been produced in China for over two thousand years, with the technique spreading throughout Southeast Asia via Chinese diaspora communities. They are particularly associated with the Mid-Autumn Festival, where salted egg yolks embedded in lotus paste mooncakes symbolize the full moon. In the Philippines, red-dyed salted duck eggs (itlog na maalat) are a beloved condiment. The modern explosion of 'salted egg yolk' as a flavor in chips, pastries, and sauces reflects the universal appeal of the yolk's rich, sandy, umami-laden quality.",
    origin_regions: ["China", "Southeast Asia", "Cantonese cuisine", "Fujian"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Salted duck eggs are classified as cool and salty in TCM, associated with the Heart, Lung, and Kidney meridians. Duck eggs are considered cooler and more Yin-nourishing than chicken eggs. They are used to clear heat, nourish Yin, moisten the Lung, and calm the Heart. The salt content means they should be eaten in moderation."
    },
    modern_scientific_research: "Salted duck eggs retain the high nutritional value of fresh duck eggs — rich in protein, fat-soluble vitamins (A, D, E), choline, and minerals. Duck eggs have higher fat content than chicken eggs, which contributes to the yolk's characteristic richness. The vivid orange color of salted duck egg yolks reflects high carotenoid content (zeaxanthin and lutein), beneficial for eye health.",
    culinary_uses: "Use yolks in mooncake filling — steam them first for a crumbly, sandy result. Make salted egg yolk sauce by pan-frying mashed yolks in butter with curry leaves and chili until foamy. Use as a filling in Chinese steamed buns. Slice and serve alongside congee. Add crumbled yolk to fried rice.",
    preparation_methods: "Raw salted eggs should be boiled or steamed for 10–12 minutes before consuming the white, or the yolks can be separated raw for baking and sauce applications. For steaming: place in a steamer for 15–20 minutes.",
    traditional_dishes: ["Mooncakes with salted egg yolk", "Salted egg yolk bao", "Congee with salted egg", "Steamed pork patty with salted egg", "Salted egg yolk mantis shrimp"],
    tags: ["eggs", "preserved", "chinese", "cantonese", "festival", "new-year", "rich", "savory"],
    published: true
  },
  {
    name: "Century Eggs",
    slug: "century-eggs",
    alternative_names: ["Pi Dan", "Thousand-Year Eggs", "Preserved Eggs", "Pidan", "Black Eggs"],
    overview: "Century eggs are duck, chicken, or quail eggs preserved in a strongly alkaline medium for weeks to months, resulting in a complete transformation of the egg's color, texture, and flavor. The white becomes a dark, translucent, firm jelly; the yolk turns dark green to black and develops a creamy, almost custardy texture with a complex, sulfurous, and deeply savory flavor unlike any other food. They are one of the most uniquely and proudly Chinese preserved foods, beloved by those who grow up eating them.",
    flavor_profile: ["complex", "sulfurous", "creamy", "savory", "slightly alkaline", "aged", "dark"],
    cultural_history: "Century eggs have been produced in China for over five hundred years, with the earliest records from the Ming dynasty referencing a preparation from Hunan province. The alkaline preservation method was likely discovered accidentally — eggs falling into lime-rich soil would undergo the transformation. Pi dan is both a beloved everyday ingredient (in congee, with tofu) and a badge of cultural pride for Chinese food lovers worldwide.",
    origin_regions: ["China", "Hunan", "Cantonese cuisine"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Century eggs (Pi Dan) are classified as cool and salty in TCM, associated with the Stomach and Large Intestine meridians. They are used to clear heat, detoxify, cool the Blood, and calm the Liver. Prescribed for heat conditions, inflammation, hypertension associated with Liver Yang rising, and constipation. The alkaline processing is understood to increase heat-clearing potency. Should be eaten in moderation."
    },
    modern_scientific_research: "Modern century egg production uses sodium hydroxide rather than lime, eliminating lead contamination associated with traditional preparations. The alkaline environment denatures proteins and converts the liquid egg into a gel through protein cross-linking. The dark color of the yolk comes from iron sulfide (from reaction between iron and hydrogen sulfide). Century eggs retain significant protein and fat-soluble vitamins.",
    culinary_uses: "Serve halved or quartered alongside silken tofu dressed with soy sauce, sesame oil, and ginger for the classic pi dan tofu. Add to congee for extraordinary depth of flavor. Serve with pickled ginger as a palate-awakening starter. Use in cold salads with cucumber, garlic chili sauce, and sesame oil.",
    preparation_methods: "Century eggs are fully preserved and require no cooking. Peel the outer coating and remove the thin membrane before eating. For the cleanest cut, use a string or thin wire rather than a knife, or rinse the knife between cuts.",
    traditional_dishes: ["Pi dan tofu (century egg with tofu)", "Pi dan and lean pork congee (juk)", "Century egg with pickled ginger", "Cold century egg salad with cucumber", "Cantonese century egg starter"],
    tags: ["eggs", "preserved", "chinese", "cantonese", "iconic", "alkaline-preserved", "tcm"],
    published: true
  },
  {
    name: "Preserved Mustard Greens",
    slug: "preserved-mustard-greens",
    alternative_names: ["Mei Cai", "Zha Cai", "Xue Cai", "Suan Cai", "Ya Cai", "Tianjin Preserved Vegetable"],
    overview: "Preserved mustard greens are not one thing but a family of essential Chinese preserved vegetables — each regional variety distinct, yet all sharing the deep, fermented complexity that comes from salting and transforming Brassica juncea. Mei cai (Guangdong): dried, sweet-salty preserved greens that enrich Hakka braised pork belly. Zha cai (Sichuan): a spicy, crunchy preserved mustard stem for noodle soups. Xue cai (Ningbo/Shanghai): salty, tangy preserved greens for rice cakes and noodle dishes. Ya cai (Yibin, Sichuan): sweetly fermented preserved sprouts for dan dan noodles. Suan cai (Northeast/Sichuan): lactic-fermented sour pickled cabbage for fish soup.",
    flavor_profile: ["sour", "salty", "fermented", "umami", "complex", "savory"],
    cultural_history: "The preservation of mustard greens through salting and fermentation has been practiced in China for over two thousand years, with each major agricultural region developing its own distinctive style. Mei cai is inseparable from Hakka identity — mei cai kou rou is considered the heart of Hakka cuisine. Ya cai from Yibin became famous as the defining garnish of dan dan noodles. Suan cai provides the characteristic sour-spicy note to Sichuan suan cai fish — one of the most copied dishes in modern Chinese cooking.",
    origin_regions: ["China", "Sichuan", "Guangdong", "Zhejiang"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Preserved mustard greens are classified as warm and acrid-salty in TCM, reflecting both the properties of the original mustard and the fermentation process. Associated with the Lung, Liver, and Stomach meridians. Used to warm the Lung and dissolve phlegm, stimulate digestion, and move stagnant Qi. The fermentation adds digestive-supporting and detoxifying properties beyond those of the fresh vegetable."
    },
    modern_scientific_research: "Preserved mustard greens are lactic acid fermented foods containing beneficial Lactobacillus species, organic acids, and bioactive compounds. Research on Chinese pickled vegetables shows significant antioxidant activity and potential anti-tumor properties from isothiocyanate precursors. Zha cai consumption has been studied for potential blood pressure-reducing effects. All preserved mustard greens are high in sodium.",
    culinary_uses: "Mei cai: soak, squeeze dry, and layer with pork belly for the definitive Hakka braise. Zha cai: rinse, slice thinly, and add to noodle soups and cold dishes. Xue cai: use in stir-fried rice cakes and noodle soups. Ya cai: add as garnish for dan dan noodles. Suan cai: add to fish soups for the characteristic sour note.",
    preparation_methods: "Rinse all preserved mustard greens under cold water before use to remove excess surface salt. Taste before cooking and adjust seasoning accordingly. Mei cai requires soaking 30 minutes then squeezing. Store opened packages refrigerated.",
    traditional_dishes: ["Mei cai kou rou (Hakka braised pork)", "Suan cai fish (Sichuan)", "Dan dan mian with ya cai", "Zha cai noodles", "Xue cai and yellow croaker noodle soup"],
    tags: ["preserved", "fermented", "chinese", "cantonese", "hakka", "sichuan", "umami", "pantry-staple"],
    published: true
  },
  {
    name: "Pickled Vegetables",
    slug: "pickled-vegetables",
    alternative_names: ["Pao Cai", "Sichuan Paocai", "Jiachang Pao Cai", "Table Pickles"],
    overview: "Pickled vegetables in the Chinese pantry refers primarily to pao cai — a Sichuan tradition of quick-pickling fresh vegetables in a seasoned brine in a special ceramic pao cai jar. Unlike long-fermented preserved vegetables, pao cai can be ready in days, producing crisp, tangy, mildly sour pickled vegetables that serve as a digestive condiment, a palate cleanser, and a bright contrast to rich meat dishes. Napa cabbage, daikon, carrots, celery, green beans, and ginger are common pao cai vegetables.",
    flavor_profile: ["tangy", "sour", "crisp", "lightly spicy", "refreshing", "clean"],
    cultural_history: "Pao cai has been made in Sichuan for over two thousand years, with the ceramic pickling jars with water-seal lids representing one of the oldest food preservation technologies in the world. The water seal creates an anaerobic environment that allows lactic acid fermentation while preventing harmful bacteria — an ancient understanding of fermentation chemistry. In Sichuan homes, a pao cai jar is a constant presence, continuously refreshed with new vegetables. The cuisine of Sichuan developed with pao cai as a structural condiment — its bright sourness providing counterpoint to the numbing spice of Sichuan peppercorn.",
    origin_regions: ["Sichuan", "China", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Pickled vegetables (Pao Cai) are classified as sour and cool in TCM, associated with the Liver and Stomach meridians. The sour flavor enters the Liver, promotes smooth flow of Liver Qi, and stimulates digestive secretions. Pao cai is valued as a digestive aid — the organic acids stimulate gastric acid production and bile flow. The cooling nature makes it an appropriate condiment alongside rich, warm meats."
    },
    modern_scientific_research: "Lactic acid-fermented pickled vegetables contain Lactobacillus and other beneficial bacteria that contribute to gut microbiome health. Research on fermented vegetables shows associations with improved digestive health, enhanced immune function, and better bioavailability of vitamins and minerals. The organic acids in pickled vegetables have antimicrobial properties. Fermented vegetables are a significant source of vitamin K2 (from bacterial synthesis).",
    culinary_uses: "Serve as a table condiment alongside congee, rice, and noodle dishes. Stir-fry finely chopped pickled vegetables with minced pork. Add to cold noodle dishes for sourness. Use as a garnish on rich braised dishes to cut through fat.",
    preparation_methods: "For quick pao cai: dissolve salt in water (roughly 1 tablespoon per cup of water). Add Sichuan peppercorns, dried chili, ginger, and a little sugar. Submerge cut vegetables in the brine. Keep submerged with a weight. Ready in 1–3 days at room temperature; 3–7 days for more sourness. Refrigerate when flavor is right.",
    traditional_dishes: ["Sichuan pao cai as condiment", "Stir-fried pickled vegetables with pork", "Congee with pickled side dishes", "Cold sesame noodles with pickled vegetables", "Vietnamese banh mi do chua"],
    tags: ["pickled", "fermented", "chinese", "sichuan", "condiment", "probiotic", "refreshing", "digestive"],
    published: true
  },

  // --- Tofu Varieties ---
  {
    name: "Tofu",
    slug: "tofu",
    alternative_names: ["Doufu", "Bean Curd", "Dou Fu", "Toufu"],
    overview: "Tofu is one of the great achievements of East Asian food culture — a transformed product made by coagulating soy milk and pressing the resulting curds into blocks of varying firmness. Its flavor is mild and neutral; its value lies in its texture, its nutritional density, and its extraordinary ability to absorb the flavors of everything around it. Tofu is not a substitute for anything — it is its own ingredient, with its own textures and properties, capable of being silky or crispy, delicate or robust, mild or richly sauced.",
    flavor_profile: ["mild", "clean", "neutral", "slightly sweet", "absorptive"],
    cultural_history: "Tofu was invented in China, traditionally credited to Prince Liu An of the Han dynasty (around 164 BCE). From China, tofu spread to Japan, Korea, Vietnam, and throughout Southeast Asia, becoming central to the food culture of each country. In Japan, the tofu tradition developed extraordinary refinement — the silken tofu of Kyoto, eaten simply with ginger and soy sauce, represents austere perfection. In China, mapo tofu in a fiery, numbing sauce is one of the most famous dishes in the Chinese canon. Buddhism spread tofu culture throughout Asia as a protein source compatible with vegetarian dietary requirements.",
    origin_regions: ["China", "East Asia", "Japan", "Korea"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Tofu (Doufu) is classified as cool and sweet in TCM, associated with the Spleen, Stomach, and Large Intestine meridians. It is used to tonify Qi, clear heat, moisten dryness, and generate fluids. Considered one of the most balanced and universally appropriate protein sources in TCM dietary medicine — neither too warm nor too cold, making it appropriate for most constitutions. The cooling nature means it should be eaten with warming spices for people with cold-type constitutions.",
      "Ayurveda": "Tofu is considered a moderately sattvic food in Ayurveda — nourishing and grounding. Its white color and mild flavor associate it with purity. For Vata and Kapha constitutions it is best eaten cooked and warm; for Pitta, plain or lightly spiced tofu is cooling and nourishing. Tofu is not traditional to Ayurvedic food culture but is widely integrated into modern Ayurvedic practice."
    },
    modern_scientific_research: "Tofu is a complete protein source, containing all essential amino acids. Soy isoflavones (genistein, daidzein) have been extensively studied — meta-analyses show associations with reduced cardiovascular disease risk, improved bone density in postmenopausal women, and potential cancer-preventive effects. Tofu is an excellent source of calcium (particularly when coagulated with calcium sulfate), iron, magnesium, and manganese.",
    culinary_uses: "The right tofu for each application: firm or extra-firm for stir-frying and pressing; medium-firm for braising and mapo tofu; soft for scrambles and fillings; silken for dressings, desserts, and agedashi. Pan-fry firm tofu until golden before adding to any braised preparation. Press firm tofu between kitchen towels before frying to remove excess water.",
    preparation_methods: "Press firm tofu by wrapping in kitchen towels and placing under a weighted cutting board for 30–60 minutes. For pan-frying: dry the surface, use a well-oiled pan, and don't move it until a golden crust forms. For braising: press and pan-fry first. For mapo tofu: cut into cubes and simmer gently in sauce for 2–3 minutes only.",
    traditional_dishes: ["Mapo tofu (Sichuan)", "Agedashi tofu (Japanese)", "Dubu jjigae (Korean)", "Cantonese braised home-style tofu", "Stir-fried tofu with vegetables"],
    tags: ["tofu", "soy", "chinese", "japanese", "korean", "protein", "vegan", "tcm", "versatile", "pantry-staple"],
    published: true
  },
  {
    name: "Firm Tofu",
    slug: "firm-tofu",
    alternative_names: ["Lao Doufu", "Extra Firm Tofu", "Northern Tofu", "Cotton Tofu", "Old Tofu"],
    overview: "Firm tofu is pressed to remove a significant proportion of its water content, resulting in a denser, more cohesive block with a slightly spongy, porous texture ideal for high heat, pressure, or long braising. It holds its shape when cubed and stir-fried, develops a beautiful golden crust when pan-fried, and absorbs sauces and flavors through its porous structure more effectively than softer varieties. Firm tofu is the workhorse of the Chinese pantry — the everyday protein that appears in stir-fries, braises, hot pots, and simple home dishes across the country.",
    flavor_profile: ["mild", "clean", "slightly creamy", "absorptive", "substantial"],
    cultural_history: "Firm tofu (lao doufu or 'old tofu' in Cantonese) developed alongside the broader tofu tradition in northern and central China, where the firmer texture and higher protein density suited the heartier cooking of those regions. Northern Chinese tofu tends to be denser than southern styles. In Korean cooking, firm tofu is pan-fried until golden as banchan or simmered in soy-based braises. In Japanese cooking, firm cotton tofu (momen) is the standard type used in miso soup, hot pots, and dressed tofu dishes.",
    origin_regions: ["China", "Japan", "Korea", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Firm tofu shares the TCM profile of tofu generally — cool and sweet, tonifying Qi and Yin, clearing heat, and moistening dryness. The firmer form is considered more Qi-tonifying and substantive than silken tofu, appropriate for those who need more building and nourishment. Paired with warming ingredients like ginger, garlic, and soy sauce, the cooling nature is balanced, making it appropriate for all constitutions."
    },
    modern_scientific_research: "Firm tofu has a higher protein density than soft or silken tofu due to reduced water content — approximately 8–10g protein per 100g versus 4–6g for silken. The pressing process concentrates all nutrients proportionally: calcium, iron, isoflavones, and amino acids are all more concentrated per gram. Research supports firm tofu as an equivalent protein source to animal proteins in terms of bioavailability.",
    culinary_uses: "Pan-fry in oil until golden on both sides before adding to stir-fries, braises, and sauces — the golden crust prevents crumbling and adds flavor. Press before frying to remove excess water. Cube and add to hot pots. Marinate in soy sauce, sesame oil, and five spice, then pan-fry for a standalone dish.",
    preparation_methods: "Press between kitchen towels under a weighted cutting board for 30–60 minutes to remove water before frying. Pat surface completely dry before adding to a hot, oiled pan. Do not move until a crust forms. For braising: pan-fry first, then add to simmering sauce.",
    traditional_dishes: ["Pan-fried tofu with black bean sauce", "Korean dubu jorim (braised spicy tofu)", "Miso soup with firm tofu", "Clay pot braised tofu", "Stir-fried tofu with bok choy"],
    tags: ["tofu", "soy", "chinese", "japanese", "protein", "vegan", "stir-fry", "braising", "versatile"],
    published: true
  },
  {
    name: "Silken Tofu",
    slug: "silken-tofu",
    alternative_names: ["Nen Doufu", "Soft Tofu", "Kinugoshi Tofu", "Smooth Tofu", "Japanese Soft Tofu"],
    overview: "Silken tofu is the most delicate form of tofu — made without pressing, so the coagulated soy milk retains all its water content and sets into a custard-like block with a smooth, silky texture that trembles when moved. It cannot be stir-fried, pressed, or roughly handled without breaking apart. Instead, silken tofu's extraordinary texture — somewhere between a soft custard and a firm panna cotta — is the star of cold preparations, gently dressed dishes, smooth sauces, and preparations where its custardy quality is allowed to shine.",
    flavor_profile: ["delicate", "creamy", "custardy", "mild", "clean", "subtle"],
    cultural_history: "Silken tofu in its most refined form is associated with Japanese Kyoto cuisine, where the art of tofu-making achieved extraordinary delicacy — yudofu (tofu simmered in a clear kombu broth) is a celebrated preparation that showcases the texture of perfect silken tofu. In Chinese cooking, soft tofu topped with century egg, ginger, and scallion oil is a common cooling dish. In Korean cooking, soft tofu (sundubu) is simmered in a spicy broth to make sundubu jjigae — one of Korea's most beloved comfort dishes.",
    origin_regions: ["China", "Japan", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Silken tofu is considered the most cooling and Yin-nourishing form of tofu in TCM — its high water content and delicate nature make it particularly effective for clearing heat, generating fluids, and nourishing Yin. Prescribed for heat patterns, thirst, and Yin deficiency with heat signs. In summer, cold silken tofu dressed with light soy sauce and ginger is considered both delicious and medicinally appropriate for the season."
    },
    modern_scientific_research: "Silken tofu has lower protein density than firm tofu due to higher water content but retains all soy isoflavones and has particularly high bioavailability due to its soft texture. The smooth texture makes it appropriate for those with digestive difficulties. Its high water content contributes to hydration.",
    culinary_uses: "Serve cold, dressed with premium soy sauce, grated ginger, sesame oil, and scallion. Top with century egg and chili oil. Use in cold blended preparations and smoothies. Simmer very gently in broth for Korean-style preparations. Make agedashi tofu by dusting in starch and deep-frying.",
    preparation_methods: "Handle with extreme care — silken tofu breaks at the slightest pressure. For cold preparations: cut into cubes using a very sharp, thin knife. For agedashi tofu: drain in a colander for 30 minutes, dust with potato starch, and lower gently into hot oil. Never stir-fry silken tofu.",
    traditional_dishes: ["Cold silken tofu with soy and ginger", "Pi dan tofu (century egg and silken tofu)", "Agedashi tofu", "Korean sundubu jjigae", "Yudofu (Kyoto simmered tofu)"],
    tags: ["tofu", "soy", "japanese", "chinese", "delicate", "cooling", "tcm", "custard-like", "protein"],
    published: true
  },
  {
    name: "Bean Curd Sticks",
    slug: "bean-curd-sticks",
    alternative_names: ["Fu Zhu", "Yuba", "Tofu Skin Rolls", "Dried Tofu Skin", "Bean Curd Sheets", "Dried Yuba"],
    overview: "Bean curd sticks (fu zhu) are made from the thin film that forms on the surface of hot soy milk — lifted and dried into delicate sheets, rolls, or sticks. The result is a concentrated, protein-rich product with a mild, slightly nutty flavor and a complex texture: when rehydrated, fu zhu becomes silky and smooth with a pleasant chew; when fried first and then braised, it develops a golden crust that yields to tender interior. Fu zhu is one of the most beloved ingredients in Chinese Buddhist vegetarian cooking and appears prominently in lo han jai (Buddha's delight).",
    flavor_profile: ["mild", "slightly nutty", "absorptive", "silky when rehydrated", "firm when fried"],
    cultural_history: "Bean curd skin (fu pi or yuba) has been produced in China and Japan for centuries, the technique of lifting the film from heated soy milk representing elegant use of a by-product of the tofu-making process. In Japan, fresh yuba is a celebrated delicacy of Kyoto Buddhist temple cuisine — lifted from simmering soy milk and eaten immediately, its delicacy is extraordinary. In China, dried fu zhu is a pantry staple used in Chinese New Year and Buddhist vegetarian cuisine. Red-braised fu zhu absorbs the braising liquid magnificently.",
    origin_regions: ["China", "Japan", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Bean curd sticks share the TCM properties of tofu but in a more concentrated form — cool and sweet, associated with the Spleen, Stomach, and Lung meridians. Used to tonify Qi and Yin, clear heat, and nourish the Lung. In Buddhist temple food traditions, fu zhu is used as a key protein source for plant-based dietary practices."
    },
    modern_scientific_research: "Bean curd sticks are one of the highest-protein tofu products available — the concentration of the soy milk film means protein content can be 40–50% of dry weight. They contain high levels of soy isoflavones, all essential amino acids, and significant calcium, iron, and phosphorus. The high protein density makes them nutritionally equivalent to meat in many applications.",
    culinary_uses: "Add rehydrated fu zhu to Buddha's delight and other braised vegetarian preparations. Red-braise with soy sauce, Shaoxing wine, and sugar until deeply flavored. Add to hot pots. Deep-fry before braising for a richer, textured result. Add to congee for silky richness.",
    preparation_methods: "Soak dried bean curd sticks in cold water for 2–4 hours until fully softened and pliable. Squeeze gently. For hot pot: add directly without soaking. For frying: drain well and pat dry before adding to hot oil. Cut into bite-sized sections after soaking.",
    traditional_dishes: ["Buddha's delight (lo han jai)", "Red-braised bean curd sticks with mushrooms", "Bean curd stick hot pot", "Fresh yuba with wasabi and soy (Japanese)", "Congee with rehydrated fu zhu"],
    tags: ["tofu", "soy", "chinese", "japanese", "dried", "protein", "vegan", "braising", "buddhist", "pantry-staple"],
    published: true
  },
  {
    name: "Tofu Puffs",
    slug: "tofu-puffs",
    alternative_names: ["Dou Pao", "Abura-age", "Fried Tofu Puffs", "Bean Curd Puffs", "Taukwa Pok"],
    overview: "Tofu puffs are pillows of tofu that have been deep-fried until their exterior turns golden and their interior becomes a honeycomb of air pockets — hollow, spongy, and capable of absorbing extraordinary amounts of the liquid around them. They are not eaten for their flavor (which is mild and neutral) but for their texture and their function as a flavor sponge — submerged in a curry, laksa broth, or braise, they absorb the surrounding liquid and release it in concentrated bursts with each bite.",
    flavor_profile: ["mild", "slightly nutty", "spongy", "absorptive", "golden exterior"],
    cultural_history: "Fried tofu puffs developed across the tofu cultures of East and Southeast Asia as a natural consequence of deep-frying tofu. In Japan, abura-age is used in miso soup, inari sushi, and udon noodle soups. In Southeast Asian Chinese cooking, tau pok (tofu puffs in Hokkien) appears in laksa, satay, and curry preparations with a frequency that reflects their perfect compatibility with coconut milk-based broths. The ability to stuff tofu puffs created an entirely new class of preparations.",
    origin_regions: ["China", "Japan", "Southeast Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Tofu puffs, as a fried tofu product, are considered neutral to slightly warm in TCM — the frying process adds warmth that moderates the otherwise cooling nature of plain tofu. Associated with the Spleen and Stomach, they are considered more easily digestible for people with cold-type Spleen conditions who find plain tofu too cooling."
    },
    modern_scientific_research: "The deep-frying process significantly changes the nutritional profile compared to plain tofu — fat content increases substantially. They retain soy protein and isoflavones but in a higher-calorie package. Research on fried soy products shows they retain isoflavone content despite the frying process.",
    culinary_uses: "Add to curries and laksa broth — they absorb the flavorful liquid beautifully. Halve and add to hot pots and simmered soups. Stuff with seasoned minced pork, shrimp, or fish paste. Add to braised vegetable dishes. Make inari sushi by simmering in sweetened soy sauce and stuffing with seasoned rice.",
    preparation_methods: "Pour boiling water over tofu puffs and gently press to remove excess oil before using. Squeeze gently and pat dry. For stuffed preparations: cut a pocket into one side and fill. For soups and hot pots: add directly.",
    traditional_dishes: ["Laksa with tofu puffs", "Stuffed tofu puffs (yong tau foo)", "Japanese inari sushi", "Hot pot tofu puffs", "Malaysian curry with tofu puffs"],
    tags: ["tofu", "soy", "fried", "chinese", "japanese", "southeast-asian", "absorptive", "hot-pot", "curry"],
    published: true
  },

  // --- Noodles & Wrappers ---
  {
    name: "Egg Noodles",
    slug: "egg-noodles",
    alternative_names: ["Ji Dan Mian", "Cantonese Egg Noodles", "Wonton Noodles", "Mee", "Lo Mein Noodles"],
    overview: "Egg noodles are wheat noodles enriched with egg, giving them a characteristic golden color, a slightly richer flavor, and above all a springy, resilient texture (known in Cantonese as 'QQ') that sets them apart from plain flour noodles. They are the backbone of Cantonese noodle culture: the thin, springy strands that fill bowls of wonton soup, the crispy fried bed beneath beef and black bean sauce in pan-fried noodles, the slippery rich strands tossed with oyster sauce in lo mein. Cantonese egg noodles at their finest are made with fresh eggs in alkaline water, producing a characteristic texture and color.",
    flavor_profile: ["rich", "slightly eggy", "springy", "savory", "bouncy"],
    cultural_history: "Egg noodles have been made in China for over two thousand years. In Cantonese cooking, the egg noodle achieved a particular level of refinement — the fresh noodles of Hong Kong, made daily by noodle shops, are among the finest in the world. The bouncy texture that defines a great Hong Kong wonton noodle was traditionally achieved by using bamboo poles to knead the dough — the pole kneading incorporates air and develops gluten in a specific way. Egg noodles traveled with Cantonese migrants throughout Southeast Asia, becoming central to the noodle cultures of Malaysia, Singapore, and Vietnam.",
    origin_regions: ["China", "Cantonese cuisine", "Southeast Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Egg noodles are considered warming and sweet in TCM, associated with the Spleen and Stomach. The wheat provides Qi tonification; the egg adds Yin-nourishing and Blood-building properties. Long noodles have strong symbolic significance in Chinese culture — associated with longevity, they must never be cut and are essential at birthday celebrations."
    },
    modern_scientific_research: "Egg noodles are a significant source of complex carbohydrates and provide protein from both wheat and egg content. The eggs add fat-soluble vitamins (A, D, E, K), choline, and lutein. The glycemic index of egg noodles is lower than plain wheat noodles due to the fat and protein content of the egg.",
    culinary_uses: "Use thin Cantonese egg noodles in wonton soup — blanch separately and add to broth just before serving. Pan-fry until crispy on both sides for the classic Hong Kong preparation, then top with sauced beef, seafood, or vegetables. Toss with oyster sauce, sesame oil, and char siu for a simple lo mein. Match thickness to application: thin for soups, medium for tossed and pan-fried.",
    preparation_methods: "Fresh egg noodles: blanch in boiling water for 30–60 seconds (thin) to 2 minutes (thick), drain immediately, and toss with a little oil to prevent sticking. Dried egg noodles: follow package instructions, typically 3–5 minutes. For crispy pan-fried noodles: blanch, drain thoroughly, spread in an oiled pan, and cook without moving until a golden crust forms.",
    traditional_dishes: ["Wonton noodle soup", "Hong Kong pan-fried crispy noodles", "Lo mein with char siu", "Beef brisket noodle soup", "Malaysian curry mee"],
    tags: ["noodles", "chinese", "cantonese", "egg", "pantry-staple", "comfort", "quick-cooking"],
    published: true
  },
  {
    name: "Rice Noodles",
    slug: "rice-noodles",
    alternative_names: ["Mi Fen", "Rice Vermicelli", "Ho Fun", "Rice Stick Noodles", "Banh Pho", "Kway Teow"],
    overview: "Rice noodles are made from rice flour and water — the simplest of noodle formulas — and come in a remarkable range of widths and forms, each suited to different preparations. Thin rice vermicelli (mi fen) cook instantly and absorb sauces beautifully; wide flat rice noodles (ho fun) are silky and substantial, ideal for stir-frying; rice stick noodles (banh pho) are the medium between the two. Rice noodles are naturally gluten-free, with a mild, clean flavor that makes them a pure vehicle for the sauces and broths that surround them.",
    flavor_profile: ["mild", "clean", "neutral", "slightly sweet", "slippery"],
    cultural_history: "Rice noodles originated in southern China, where rice cultivation dominates and wheat is less available than in the north. The tradition is particularly associated with Guangdong, Guangxi, and Fujian — regions with close cultural ties to Southeast Asia. Vietnamese pho noodles (banh pho), Thai pad thai rice noodles, and Malaysian char kway teow all descend from this southern Chinese tradition. Wide fresh rice noodles (cheung fun) steamed in sheets and cut into rolls are a beloved dim sum item.",
    origin_regions: ["Southern China", "Guangdong", "Southeast Asia", "Vietnam"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Rice noodles share the TCM properties of rice — neutral and sweet, associated with the Spleen and Stomach. Used to tonify Qi, nourish the middle burner, and calm the Stomach. Being made from rice rather than wheat, they are considered more suitable for people with wheat sensitivities or digestive weaknesses. The neutral, easily digestible nature of rice makes rice noodles appropriate during illness and recovery."
    },
    modern_scientific_research: "Rice noodles are high in carbohydrates and low in protein and fat. They are naturally gluten-free, making them appropriate for those with celiac disease or gluten intolerance. The glycemic index varies by preparation: rice noodles eaten with fat, protein, and fiber have a lower glycemic impact than eaten alone. Research on rice consumption shows benefits for gut health from resistant starch formed during cooling and reheating.",
    culinary_uses: "Thin rice vermicelli: use in soups, salads, and spring rolls. Medium rice stick noodles: use in pad thai, stir-fries, and Vietnamese soups. Wide flat rice noodles: use in chow ho fun (stir-fried with beef, scallions, and soy); handle gently to prevent tearing.",
    preparation_methods: "Thin rice vermicelli: soak in cold water 10–15 minutes until pliable. Wide rice noodles: if dried, soak 30–45 minutes; if fresh, separate gently. For stir-frying: use a very hot wok and toss gently — rice noodles tear and break if handled aggressively.",
    traditional_dishes: ["Pho (Vietnamese rice noodle soup)", "Chow ho fun (stir-fried wide rice noodles)", "Pad thai", "Rice noodle salad rolls", "Char kway teow (Singapore)"],
    tags: ["noodles", "rice", "gluten-free", "chinese", "cantonese", "southeast-asian", "pantry-staple", "versatile"],
    published: true
  },
  {
    name: "Glass Noodles",
    slug: "glass-noodles",
    alternative_names: ["Fen Si", "Cellophane Noodles", "Bean Thread Noodles", "Dangmyeon (Korean)", "Harusame (Japanese)"],
    overview: "Glass noodles — also called cellophane noodles, bean thread noodles, or fen si — are thin, translucent noodles made from mung bean starch. They are almost completely flavorless on their own, which is their greatest culinary strength: they absorb the flavors of the sauce or broth around them with extraordinary thoroughness. When cooked, they are slippery, slightly gelatinous, and pleasantly chewy — a unique texture unlike wheat or rice noodles. They appear in hot pots, braised preparations, cold salads, and some of China's most famous dishes.",
    flavor_profile: ["neutral", "almost flavorless", "slippery", "gelatinous", "highly absorptive"],
    cultural_history: "Glass noodles made from mung bean starch have been produced in China for centuries, developed as a way to transform mung bean starch into a shelf-stable, versatile food. They became particularly central to Sichuan cooking — 'ants climbing a tree' (ma yi shang shu), where minced pork clings to the noodles, is one of Sichuan's most famous home dishes. Korean dangmyeon (made from sweet potato starch) became the foundation of japchae. In Thai cooking, woon sen appears in salads and spring rolls.",
    origin_regions: ["China", "East Asia", "Southeast Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Glass noodles (Fen Si) are classified as cool and sweet in TCM, associated with the Stomach and Large Intestine. Made from mung beans (strongly cooling in TCM), they are used to clear summer heat, quench thirst, and cool the Blood. Considered appropriate for hot weather consumption and for people with heat conditions."
    },
    modern_scientific_research: "Glass noodles are composed almost entirely of starch with very low protein and fat content. Mung bean starch noodles have a lower glycemic index than wheat noodles due to the resistant starch content. Korean sweet potato starch noodles (dangmyeon) contain anthocyanins from the purple sweet potato variety. Glass noodles are naturally gluten-free.",
    culinary_uses: "Add dried glass noodles directly to hot pots and soups without pre-soaking — they hydrate quickly. Soak briefly before stir-frying. Use in japchae with sesame oil, soy sauce, and vegetables. Make ants climbing a tree by cooking soaked glass noodles with spicy minced pork and doubanjiang. Use soaked and rinsed in cold salads dressed with lime juice, fish sauce, and chili.",
    preparation_methods: "Soak in cold water for 10–15 minutes until pliable. They will continue absorbing liquid during cooking — add them near the end of hot pot preparations. For stir-fries: soak, drain, and cut with scissors into manageable lengths. Glass noodles can go from pleasantly chewy to mushy quickly — watch carefully.",
    traditional_dishes: ["Ants climbing a tree (ma yi shang shu)", "Japchae (Korean)", "Hot pot", "Thai glass noodle salad (yum woon sen)", "Buddha's delight (lo han jai)"],
    tags: ["noodles", "gluten-free", "chinese", "korean", "southeast-asian", "absorptive", "pantry-staple", "hot-pot"],
    published: true
  },
  {
    name: "Wonton Wrappers",
    slug: "wonton-wrappers",
    alternative_names: ["Hun Tun Pi", "Wonton Skin", "Yun Tun Pi"],
    overview: "Wonton wrappers are thin, yellow squares of egg-and-wheat dough — typically about 3 inches square and paper-thin — designed to be filled, folded into their characteristic shape, and either simmered in soup or deep-fried. The egg in the dough gives them a characteristic golden-yellow color and a silky, slippery texture when cooked in broth that is one of the distinguishing pleasures of wonton soup. Thinner than dumpling wrappers and square rather than round, they are a distinct product suited to the delicate, soup-based preparations of Cantonese cooking.",
    flavor_profile: ["neutral", "wheaty", "thin", "silky when cooked", "delicate"],
    cultural_history: "Wontons have been eaten in China for over a thousand years, with the Cantonese version — filled with pork and shrimp, served in a clear broth, paired with springy egg noodles — representing one of the most refined expressions of the form. A perfectly made wonton is a point of craft pride in Cantonese food culture. The Sichuan version (chao shou) differs — served in chili oil rather than clear soup, folded differently. Wontons traveled with Chinese diaspora communities globally and became one of the first Chinese foods widely encountered by non-Chinese communities worldwide.",
    origin_regions: ["China", "Cantonese cuisine", "Guangdong"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Wonton wrappers, as a wheat and egg product, are classified as warm and sweet in TCM, associated with the Spleen and Stomach. They tonify Qi and support the middle burner. The combination of wheat (Qi-tonifying) and egg (Blood and Yin-nourishing) creates a balanced, fortifying food. Soup-cooked preparations are considered more digestible than fried versions."
    },
    modern_scientific_research: "Wonton wrappers provide primarily carbohydrates from wheat flour and some protein from egg content. The thin, delicate nature means they contribute relatively little nutritionally compared to the filling. The egg provides choline, B vitamins, and protein.",
    culinary_uses: "Fill with seasoned pork and shrimp (the classic Cantonese filling) and fold into the traditional wonton shape. Cook in boiling water for 3–4 minutes until the wrapper turns translucent. Serve in chicken or pork bone broth. Deep-fry filled wontons for crispy appetizers. Make Sichuan chao shou by folding differently and serving in chili oil.",
    preparation_methods: "Keep wonton wrappers covered with a damp cloth while working to prevent drying. Place filling in the center (about 1 teaspoon). Fold into desired shape and seal edges with a dab of water. Cook immediately or freeze on a tray before transferring to bags.",
    traditional_dishes: ["Wonton noodle soup (Cantonese)", "Sichuan chao shou in chili oil", "Deep-fried wontons", "Wonton soup", "Hong Kong shrimp and pork wontons"],
    tags: ["wrappers", "chinese", "cantonese", "sichuan", "dumpling", "pantry-staple", "egg-based"],
    published: true
  },
  {
    name: "Dumpling Wrappers",
    slug: "dumpling-wrappers",
    alternative_names: ["Jiao Zi Pi", "Gyoza Wrappers", "Potsticker Wrappers", "Dumpling Skin", "Shui Jiao Pi"],
    overview: "Dumpling wrappers are round discs of wheat dough — thicker than wonton wrappers, usually about 3–4 inches in diameter — designed to encase a filling and be cooked by boiling, steaming, or pan-frying. The dough is typically made with hot water (for softer wrappers ideal for pan-fried potstickers) or cold water (for boiled dumplings where a chewier bite is desired). Store-bought wrappers are a convenience staple; handmade wrappers, rolled to varying thickness, are the mark of a skilled dumpling maker and produce a superior result.",
    flavor_profile: ["neutral", "wheaty", "chewy", "tender when cooked in water", "slightly crispy when fried"],
    cultural_history: "Dumplings (jiaozi) are one of the most important foods in Chinese culture, their crescent shape representing gold ingots of prosperity, and their consumption at Lunar New Year as essential as the holiday itself. Northern China — particularly Shandong, Hebei, and Dongbei — is the heartland of Chinese dumpling culture, where families gather before New Year to make dumplings together. The Japanese adapted Chinese dumplings into gyoza, adapted for pan-frying. Korean mandu incorporates napa cabbage, tofu, and glass noodles. Each tradition evolved its own wrapper thickness, size, and cooking method.",
    origin_regions: ["Northern China", "China", "Japan", "Korea"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Dumpling wrappers, made from wheat flour, are classified as warm and sweet in TCM, associated with the Spleen and Stomach. Boiled dumplings (shui jiao) are considered the most digestible form; pan-fried and deep-fried versions are more warming and harder to digest. The filling typically provides the medicinal intent of the dumpling."
    },
    modern_scientific_research: "Dumpling wrappers contribute primarily carbohydrates from wheat flour, with some protein. Whole wheat dumpling wrappers significantly increase fiber content. The glycemic impact of dumplings is moderated by the filling's fat, protein, and fiber content. Dumplings as a complete food represent a balanced macronutrient combination.",
    culinary_uses: "Fill with seasoned pork and napa cabbage (the classic northern Chinese filling), pork and garlic chives, or shrimp and water chestnut. Fold with the pleated seal of handcraftsmanship. Boil in plenty of water until they float, then cook 1–2 minutes more. Pan-fry in oil, add water, cover to steam, then uncover to crisp for the potsticker method. Steam in a bamboo steamer.",
    preparation_methods: "To make from scratch: mix flour with boiling water (for pan-fried) or cold water (for boiled), knead until smooth, rest 30 minutes, roll into a log, cut into pieces, roll each thin. Store-bought: keep covered with a damp cloth while filling. To seal: place filling in center, fold into half-moon, and pleat the edge. Freeze uncooked dumplings in a single layer on a tray.",
    traditional_dishes: ["Chinese jiaozi (boiled)", "Guo tie (pan-fried potstickers)", "Japanese gyoza", "Korean mandu", "Northern Chinese New Year dumplings"],
    tags: ["wrappers", "chinese", "japanese", "korean", "dumpling", "northern-chinese", "pantry-staple", "versatile"],
    published: true
  }
]

async function seed() {
  console.log(`Seeding ${ingredients.length} Chinese pantry ingredients (Batch 4)...\n`)
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
  console.log('\nDone.')
}

seed()
