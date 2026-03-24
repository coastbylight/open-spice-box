import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

// Note: ginger already exists and is not re-seeded here.
// Scallions and green onions are the same plant — covered in one entry.

const ingredients = [
  {
    name: "Garlic",
    slug: "garlic",
    alternative_names: ["Da Suan", "Allium sativum", "Suan"],
    overview: "Garlic is one of the most fundamental aromatics in Chinese cooking and across virtually every world cuisine. Pungent raw, sweet when roasted, and transformatively fragrant when cooked in hot oil, it appears in some form in nearly every savory dish in the Chinese kitchen. In Chinese cooking the standard preparation is thin-sliced, minced, or smashed — rarely whole. Its flavor anchors stir-fries, sauces, marinades, and condiments from Cantonese to Sichuan to northern Chinese traditions.",
    flavor_profile: ["pungent", "sharp", "savory", "sweet when cooked", "aromatic"],
    cultural_history: "Garlic has been cultivated in China for over four thousand years and appears in early Chinese medical texts as a broad-spectrum medicinal plant. It spread from Central Asia along trade routes and became foundational to cooking across Asia, the Middle East, and Europe. In Chinese culinary tradition, garlic is one of the three essential aromatics alongside ginger and scallion — the flavor base on which a vast proportion of Chinese dishes is built. Specific regional preparations — the black garlic of Shandong, the pickled garlic of northern cuisine, the crispy garlic of Cantonese sauces — reflect centuries of culinary refinement.",
    origin_regions: ["Central Asia (origin)", "China", "Shandong"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Garlic (Da Suan) is classified as warm, acrid, and strongly detoxifying in TCM. Associated with the Spleen, Stomach, and Lung meridians, it is used to resolve toxicity, kill parasites, stop dysentery, and reduce swelling. It is prescribed for food poisoning, intestinal parasites, respiratory infections, and abscesses. Raw garlic is considered more medicinally potent than cooked.",
      "Ayurveda": "Garlic (Lahsun) is classified as hot, pungent, and oily in Ayurveda. It is considered a rasayana — a rejuvenating tonic — particularly for Vata conditions. It is used to kindle digestive fire, warm the channels, and support the nervous system. Cooked garlic is preferred over raw in Ayurvedic tradition for people with sensitive digestion."
    },
    modern_scientific_research: "Garlic is among the best-researched functional foods. Allicin, formed when raw garlic is crushed or chopped, has documented antimicrobial, antiviral, and antifungal activity. Meta-analyses show regular consumption is associated with modest reductions in blood pressure (3–8 mmHg systolic) and LDL cholesterol. Research also suggests immune-supportive effects and potential cancer-preventive properties from organo-sulfur compounds. Cooking reduces allicin content — allowing crushed garlic to sit for 10 minutes before heating preserves more bioactive compounds.",
    culinary_uses: "Use minced in stir-fry sauces, marinades, and dumpling fillings. Slice thinly for Cantonese preparations. Smash with the flat of a knife for braises and master stocks. Fry in oil until golden for crispy garlic toppings. Use raw in cold sauces, vinaigrettes, and chili preparations. Pair with ginger and scallion as the foundational aromatic base for most Chinese cooking.",
    preparation_methods: "Smash cloves with the flat of a cleaver to loosen the skin before peeling. Mince finely for sauces, slice for stir-fries, keep whole for braises. For maximum medicinal benefit, crush and let sit 10 minutes before cooking. Store at room temperature in a cool, dry place — not the refrigerator.",
    traditional_dishes: ["Mapo tofu", "Kung pao chicken", "Garlic fried rice", "Cantonese steamed prawns with garlic", "Sichuan cold cucumber salad"],
    tags: ["aromatic", "chinese", "universal", "anti-inflammatory", "antimicrobial", "tcm", "ayurveda", "pantry-staple"],
    published: true
  },
  {
    name: "Scallions",
    slug: "scallions",
    alternative_names: ["Green Onions", "Cong", "Spring Onions", "Allium fistulosum", "Welsh Onion"],
    overview: "Scallions — also called green onions or spring onions — are the most universally used aromatic in Chinese cooking. The white base delivers sharp, onion-like pungency; the green tops contribute mild, grassy freshness. They appear raw as a garnish, cooked as an aromatic base, and deep-fried as a crispy condiment. No Chinese kitchen is without them. In Chinese culinary tradition, scallion, garlic, and ginger form the essential aromatic trinity on which the flavor of most dishes is built.",
    flavor_profile: ["sharp", "onion-like", "fresh", "mild", "grassy"],
    cultural_history: "Scallions have been cultivated in China for over three thousand years and are deeply embedded in Chinese food culture at every level from home cooking to banquet cuisine. The Welsh onion (Allium fistulosum), the variety most commonly used in Chinese cooking, was cultivated in East Asia long before its name acquired any connection to Wales. In northern Chinese cuisine, scallions are used raw in substantial quantities — rolled into pancakes, layered into flatbreads, and eaten alongside rich meats as a palate cleanser. In Shandong province, the large, thick scallions known as da cong are a defining regional ingredient.",
    origin_regions: ["China", "East Asia", "Shandong"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Scallion (Cong Bai — specifically the white base) is classified as warm and acrid in TCM, associated with the Lung and Stomach meridians. It is used to release the exterior, dispel wind-cold, and unblock Yang Qi. It is a common home remedy for early-stage colds — simmered with ginger in a warming broth. The green tops (Cong Ye) are considered more cooling and are used differently in some formulas."
    },
    modern_scientific_research: "Scallions contain flavonoids, vitamin K, vitamin C, and organosulfur compounds. Research suggests the quercetin and kaempferol content may have anti-inflammatory and antioxidant effects. Like other alliums, scallions contain fructooligosaccharides that function as prebiotics, supporting gut microbiome health. The green tops are particularly rich in chlorophyll and carotenoids.",
    culinary_uses: "Use white parts as an aromatic base in stir-fries, soups, and braises. Add green tops as a raw garnish at the end of cooking. Use both parts in dumpling fillings. Make scallion oil (cong you) by frying scallions in oil until golden — a foundational flavoring in Shanghainese and Cantonese cooking. Roll into pancakes and flatbreads in northern Chinese cooking.",
    preparation_methods: "Separate white and green parts — they are used differently. Slice on the diagonal for garnishes. Mince finely for fillings and sauces. Bruise the white part before adding to stocks and braises to release flavor. Keep the green tops for finishing.",
    traditional_dishes: ["Scallion pancakes (cong you bing)", "Red-braised pork garnish", "Wonton soup garnish", "Peking duck (as a condiment)", "Shanghainese scallion oil noodles"],
    tags: ["aromatic", "chinese", "universal", "garnish", "tcm", "pantry-staple", "allium"],
    published: true
  },
  {
    name: "Shallots",
    slug: "shallots",
    alternative_names: ["Xiao Cong", "Asian Shallots", "Allium cepa var. aggregatum", "French Shallots"],
    overview: "Shallots occupy a specific niche in Chinese cooking — sweeter and more delicate than onions, more complex than scallions, they are used both as a fresh aromatic and, when fried until crispy, as one of the great condiments of Southeast Asian and southern Chinese cooking. Crispy fried shallots (zha cong su) scattered over noodle soups, congee, and braised dishes add texture, sweetness, and a deep, caramelized onion flavor that transforms even the simplest preparation.",
    flavor_profile: ["sweet", "mild", "complex", "slightly sharp", "caramelizes beautifully"],
    cultural_history: "Shallots have been cultivated across Asia for millennia and are particularly important in the cooking of southern China, Vietnam, Thailand, Malaysia, and Indonesia. In Cantonese and Teochew cooking, fried shallots are a finishing condiment used with the same casual confidence as black pepper in a Western kitchen. In Shanghainese cooking, shallot-infused oil is a foundational flavoring. The small, elongated Asian shallot — more pungent and less watery than European varieties — is the preferred type across Chinese and Southeast Asian cuisines.",
    origin_regions: ["Central Asia (origin)", "Southern China", "Southeast Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Shallots share the TCM profile of other alliums — warm, acrid, and associated with the Lung and Stomach meridians. They are used to release the exterior, warm the middle, and move Qi. Shallots are considered gentler and more tonifying than garlic, making them suitable for people with more sensitive constitutions who need warming without excessive stimulation."
    },
    modern_scientific_research: "Shallots contain high concentrations of quercetin and other flavonoids — research indicates shallots have among the highest antioxidant content of any allium. They contain allicin precursors similar to garlic and onions, with associated antimicrobial and anti-inflammatory properties. The caramelization that occurs during frying creates additional antioxidant Maillard reaction products.",
    culinary_uses: "Use raw in dressings and cold preparations where a milder onion flavor is wanted. Slice thinly and fry until crispy for a finishing garnish over noodles, congee, and braised dishes. Use in aromatics bases for Cantonese and Shanghainese preparations. Infuse in oil for shallot oil. Use in Vietnamese and Southeast Asian preparations.",
    preparation_methods: "For crispy fried shallots: slice thinly and evenly (a mandoline helps). Start in cold oil, bring to medium heat, and fry slowly until deep golden — this produces crispy results without burning. Drain on paper towels; they crisp further as they cool. Store in an airtight container for up to a week.",
    traditional_dishes: ["Cantonese congee (as garnish)", "Shanghainese scallion oil noodles", "Hainanese chicken rice", "Vietnamese pho (as garnish)", "Braised duck"],
    tags: ["aromatic", "chinese", "cantonese", "southeast-asian", "allium", "garnish", "fried"],
    published: true
  },
  {
    name: "Fresh Chilies",
    slug: "fresh-chilies",
    alternative_names: ["Xian La Jiao", "Fresh Red Chilies", "Fresh Green Chilies", "Er Jing Tiao (fresh)", "Finger Chilies"],
    overview: "Fresh chilies in Chinese cooking provide heat with brightness and fresh vegetable flavor that dried chilies cannot replicate. They appear in stir-fries, cold dishes, pickles, and as a table condiment across Sichuan, Hunan, Guizhou, and Yunnan cuisines. Green chilies are harvested young and have more vegetal flavor and less heat; red chilies are fully ripe with more sweetness and concentrated spice. Both are used in Chinese cooking, often together for color contrast.",
    flavor_profile: ["spicy", "fresh", "bright", "vegetal", "clean heat"],
    cultural_history: "Fresh chilies arrived in China from the Americas in the 16th century and transformed the cooking of inland southern and western China within generations. Hunan cooking in particular developed an obsession with fresh chilies distinct from Sichuan's focus on the dried and fermented — the Hunanese use fresh chilies in extraordinary quantities, raw and cooked, contributing a brightness that defines the cuisine. The saying in Hunan is that they are 'bu pa la' (not afraid of spicy) — in contrast to Sichuan's ma la and Guizhou's suan la (sour-spicy), Hunan's relationship with fresh chili heat is direct and unapologetic.",
    origin_regions: ["Americas (origin)", "Hunan", "Sichuan", "Guizhou", "China broadly"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Fresh chilies (Xian La Jiao) are classified as hot and acrid in TCM, warming the interior and activating circulation. They are considered less intensely warming than dried chilies because the fresh form contains more moisture, which tempers the heat. Used to expel cold-damp, stimulate digestion, and promote sweating in early-stage cold conditions."
    },
    modern_scientific_research: "Fresh chilies contain capsaicin, vitamin C (red chilies are exceptionally rich — a single red chili can contain more vitamin C than an orange), vitamin A from carotenoids, and flavonoids. Research on capsaicin shows anti-inflammatory and analgesic properties. The vitamin C content degrades with cooking, making fresh or lightly cooked preparations preferable for nutritional value.",
    culinary_uses: "Slice and stir-fry with vegetables and meat for Hunanese-style preparations. Use raw in cold dishes and dipping sauces. Add whole to oil for a milder infused heat. Pickle in rice vinegar for a bright condiment. Use in combination with black bean sauce, doubanjiang, or fermented vegetables. Pair with garlic and ginger as an aromatic base.",
    preparation_methods: "For less heat, remove seeds and white membrane — the capsaicin is concentrated there. For stir-fries, slice on the diagonal. For table condiments, chop finely and combine with vinegar and soy sauce. Fresh chilies last about a week refrigerated; whole is longer than cut.",
    traditional_dishes: ["Hunan stir-fried pork with peppers (xiao chao rou)", "Pickled chili condiment", "Tiger skin chilies (hu pi jian jiao)", "Steamed fish with fresh chili", "Cold tofu with fresh chili"],
    tags: ["chili", "aromatic", "hunan", "sichuan", "chinese", "fresh", "spicy", "vegetable"],
    published: true
  },
  {
    name: "Garlic Chives",
    slug: "garlic-chives",
    alternative_names: ["Jiu Cai", "Chinese Chives", "Allium tuberosum", "Oriental Chives"],
    overview: "Garlic chives are a distinct species from Western chives — flat-leaved rather than hollow, with a pronounced garlic flavor alongside their onion-like green freshness. They are a fundamental ingredient in Chinese cooking, used in dumpling fillings, stir-fries, and as a featured vegetable in their own right. Their assertive, garlic-forward aroma fills a kitchen when they hit a hot wok. Blanched briefly or barely cooked, they retain their vivid green color and a satisfying bite.",
    flavor_profile: ["garlicky", "fresh", "pungent", "green", "slightly sweet"],
    cultural_history: "Garlic chives have been cultivated in China for over two thousand years and are deeply woven into Chinese food culture. The classic combination of garlic chives and egg is one of the most fundamental dumpling fillings in northern Chinese cooking. In Cantonese cuisine, stir-fried garlic chives with bean sprouts and pork is a everyday home dish. Yellow chives (huang jiu cai) — blanched in darkness to prevent chlorophyll development — are a delicacy in Shanghainese cooking, milder and more tender than the green. The flower stalks, when they bolt in spring, are themselves a seasonal delicacy.",
    origin_regions: ["China", "East Asia", "Southeast Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Garlic chives (Jiu Cai) are classified as warm and acrid in TCM, associated with the Kidney, Liver, and Stomach meridians. They are used to warm and invigorate Kidney Yang, stop bleeding (particularly in the lower burner), regulate Qi and Blood, and detoxify. They are prescribed for deficiency cold conditions, seminal emission, and as a warming tonic for men's reproductive health. Jiu Cai is one of TCM's vegetables most strongly associated with Yang tonification."
    },
    modern_scientific_research: "Garlic chives contain organosulfur compounds similar to garlic, with associated antimicrobial and antioxidant properties. They are rich in vitamin K, vitamin C, folate, and beta-carotene. Research on similar alliums supports anti-inflammatory and cardiovascular-protective effects. The distinctive flat-leaf structure has a higher surface area than round chives, contributing to more pronounced flavor and potentially higher polyphenol exposure when eaten.",
    culinary_uses: "Use in dumpling fillings — combine with pork, egg, or shrimp for classic northern Chinese dumplings. Stir-fry with bean sprouts, scrambled eggs, or pork for simple, fast dishes. Use as a garnish over noodles and soups. Add to spring rolls and pancakes. The flower stalks are delicious stir-fried whole with a little oyster sauce.",
    preparation_methods: "Cut into 1–2 inch sections for stir-fries and fillings. Do not overcook — a minute or two in a hot wok is sufficient to soften while retaining color and bite. For dumpling fillings, salt cut chives and let sit for 10 minutes, then squeeze out excess water before mixing.",
    traditional_dishes: ["Jiu cai shui jiao (garlic chive dumplings)", "Stir-fried garlic chives with eggs", "Garlic chive and bean sprout stir-fry", "Cantonese rice noodle rolls (chee cheong fun)", "Korean jeon pancakes"],
    tags: ["vegetable", "aromatic", "chinese", "dumpling", "allium", "tcm", "warming"],
    published: true
  },
  {
    name: "Chinese Celery",
    slug: "chinese-celery",
    alternative_names: ["Qin Cai", "Asian Celery", "Smallage", "Apium graveolens var. secalinum"],
    overview: "Chinese celery is a slender, hollow-stemmed variety of celery with an intensely herbal, almost medicinal flavor far more assertive than the thick, mild Western celery most cooks know. Both the stems and leaves are used — the leaves are not discarded as they often are in Western cooking but are prized for their concentrated flavor. Used in stir-fries, cold dishes, soups, and as an aromatic base, Chinese celery adds a distinctive herbal sharpness that is unmistakably its own.",
    flavor_profile: ["intensely herbal", "sharp", "aromatic", "slightly bitter", "fresh"],
    cultural_history: "Celery has been cultivated in China for over a thousand years, arriving from the Mediterranean via trade routes and quickly adapting to Chinese culinary use. The Chinese preference for the thin, intensely flavored form developed independently of Western selections for large, mild stalks. In Sichuan cooking, Chinese celery is paired with preserved meats and dried tofu for a classic cold dish. In northern China, it appears in dumpling fillings and stir-fries. The leaves are used as a fresh herb in soups and broths across Chinese regional cuisines.",
    origin_regions: ["Mediterranean (origin)", "China", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Chinese celery (Qin Cai) is classified as cool and acrid in TCM, associated with the Liver and Stomach meridians. It is used to calm Liver Yang, clear heat, and cool the Blood. It is prescribed for hypertension associated with Liver Yang rising, headache, and dizziness. In TCM dietary therapy, celery is one of the recommended vegetables for people with conditions caused by excess Liver Yang."
    },
    modern_scientific_research: "Chinese celery contains phthalides (particularly 3-n-butylphthalide), compounds that have been studied for potential blood pressure-lowering effects — research suggests they may relax arterial smooth muscle. It is rich in apigenin, a flavonoid with documented anti-inflammatory and potential anti-anxiety properties. Chinese celery contains more concentrated levels of these compounds than Western celery due to its smaller, more intense form.",
    culinary_uses: "Stir-fry with preserved meat, dried tofu, and chili for a classic Sichuan cold dish. Use in soups and hot pots as a fresh herbal addition. Add to dumpling and bun fillings for herbal complexity. Use as a garnish over congee and noodle soups. Combine with beef or lamb in northern Chinese stir-fries.",
    preparation_methods: "Use both stems and leaves — do not discard the leaves. Cut stems into thin diagonal slices for stir-fries. Blanch briefly and dress for cold dishes. Add leaves to soups at the last moment. If substituting Western celery, use much less — the flavor is far more intense.",
    traditional_dishes: ["Celery and dried tofu stir-fry", "Celery and pork stir-fry", "Sichuan cold celery salad", "Celery beef stir-fry", "Hot pot accompaniment"],
    tags: ["vegetable", "aromatic", "chinese", "sichuan", "northern-chinese", "herbal", "liver"],
    published: true
  },
  {
    name: "Bok Choy",
    slug: "bok-choy",
    alternative_names: ["Pak Choi", "Bai Cai", "Chinese White Cabbage", "Brassica rapa subsp. chinensis"],
    overview: "Bok choy is one of the most recognizable Chinese vegetables — a compact brassica with crisp, juicy white stalks and dark, tender green leaves. The two parts cook at different rates and have distinct textures and flavors: the stalks are mild and slightly sweet, the leaves more tender and slightly bitter. It is one of the most widely consumed vegetables in Chinese cooking, appearing in stir-fries, soups, braises, and as a simple side dish blanched and dressed with oyster sauce.",
    flavor_profile: ["mild", "slightly sweet", "fresh", "slightly bitter (leaves)", "crisp"],
    cultural_history: "Bok choy has been cultivated in China for over five thousand years and is one of the oldest domesticated brassicas. It spread across East and Southeast Asia and is now grown globally. In Cantonese cooking, quickly blanched bok choy dressed with oyster sauce and sesame oil is a ubiquitous restaurant preparation that serves as a palate-cleansing vegetable course. Different sizes are used for different purposes: large bok choy for braising, medium for stir-fries, baby bok choy for steaming and presentation.",
    origin_regions: ["China", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Bok choy (Bai Cai) is classified as cool and sweet in TCM, associated with the Stomach, Large Intestine, and Lung meridians. It is used to clear heat, moisten dryness, detoxify, and support the Large Intestine. It is considered a gentle, safe vegetable appropriate for most constitutions, particularly those with heat conditions, dry cough, or constipation from heat and dryness."
    },
    modern_scientific_research: "Bok choy is exceptionally nutritious — it is rich in vitamins A, C, and K, folate, calcium, and glucosinolates. Glucosinolates in brassicas are precursors to isothiocyanates and indoles, compounds that have been studied for cancer-preventive properties in epidemiological research. Bok choy has among the highest calcium content of any common leafy vegetable. Research on brassica consumption consistently shows associations with reduced cancer risk.",
    culinary_uses: "Blanch and dress with oyster sauce and sesame oil for a classic Cantonese side. Stir-fry quickly in a very hot wok. Add to soups and hot pots. Braise whole small heads in stock. Quarter and grill or roast. The leaves can be added to fried rice as a last-minute green. Separating stalks and leaves and adding them at different times preserves the best texture of each.",
    preparation_methods: "Cut off the base, separate stalks, and wash well — grit hides at the base. For stir-fries, add stalks first, then leaves 30 seconds later. Blanch in boiling salted water for 60–90 seconds for a side dish. Baby bok choy can be halved or quartered and cooked whole.",
    traditional_dishes: ["Oyster sauce bok choy", "Cantonese stir-fried greens", "Hot pot vegetable", "Braised bok choy with mushrooms", "Congee accompaniment"],
    tags: ["vegetable", "brassica", "chinese", "cantonese", "healthy", "quick-cooking", "pantry-staple"],
    published: true
  },
  {
    name: "Shanghai Baby Bok Choy",
    slug: "shanghai-baby-bok-choy",
    alternative_names: ["Shanghai Bok Choy", "Xiao Bai Cai", "Spoon Cabbage", "Small White Cabbage"],
    overview: "Shanghai baby bok choy is a smaller, more delicate variety of bok choy with pale green stalks (rather than the stark white of regular bok choy) and a spoon-shaped leaf base that gives it a neat, self-contained appearance when halved or quartered. It is milder and more tender than regular bok choy with a subtly sweet, clean flavor. Its visual appeal — compact, bright green, and uniform — makes it a preferred choice for presentation-conscious cooking.",
    flavor_profile: ["mild", "sweet", "tender", "clean", "delicate"],
    cultural_history: "Shanghai baby bok choy developed as a distinct type in the Yangtze Delta region around Shanghai, where the mild climate and fertile soil produced a smaller, more tender brassica. It became associated with Shanghainese home cooking and restaurant cuisine, where its neat form made it appropriate for more refined presentations. As Chinese cuisine spread globally, Shanghai bok choy became widely available and is now among the most commonly found Chinese vegetables in Western supermarkets.",
    origin_regions: ["Shanghai", "Yangtze Delta", "China"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Shanghai baby bok choy shares the TCM properties of bok choy generally: cool and sweet, clearing heat, moistening dryness, and supporting the Large Intestine. Its smaller, more tender form is considered gentler and more appropriate for people with delicate constitutions or those recovering from illness."
    },
    modern_scientific_research: "Shanghai baby bok choy has the same nutritional profile as standard bok choy — rich in vitamins A, C, and K, calcium, and glucosinolates. The smaller size means a higher leaf-to-stalk ratio, providing proportionally more of the leafy nutrients. Research on brassica glucosinolates and their metabolites shows consistent cancer-preventive associations in epidemiological studies.",
    culinary_uses: "Halve or quarter and blanch for simple preparations dressed with sauce. Steam whole over boiling water. Stir-fry at high heat briefly. Add to clear soups and hot pots. The compact size makes it ideal for individual servings or as an elegant side dish. Use in clay pot preparations and noodle soups.",
    preparation_methods: "Halve or quarter through the base to keep leaves attached. Wash carefully between leaves. Blanch in boiling salted water for 60–90 seconds. For stir-fries, the small size means it cooks quickly — 2–3 minutes total over high heat.",
    traditional_dishes: ["Shanghainese clear broth with Shanghai bok choy", "Oyster sauce baby bok choy", "Hot pot vegetable", "Noodle soup accompaniment", "Steamed fish garnish"],
    tags: ["vegetable", "brassica", "chinese", "shanghainese", "delicate", "quick-cooking", "presentation"],
    published: true
  },
  {
    name: "Chinese Broccoli",
    slug: "chinese-broccoli",
    alternative_names: ["Kai Lan", "Gai Lan", "Chinese Kale", "Brassica oleracea var. alboglabra"],
    overview: "Chinese broccoli (kai lan) is a leafy brassica with thick, firm stems, dark green waxy leaves, and small florets. Its flavor is more robust and slightly more bitter than regular broccoli, with a satisfying crunch in the stems that holds up to high-heat cooking. It is one of the most beloved vegetables in Cantonese cooking, typically prepared very simply — blanched and dressed with oyster sauce, or stir-fried with garlic — where its quality speaks for itself.",
    flavor_profile: ["robust", "slightly bitter", "fresh", "waxy", "firm"],
    cultural_history: "Kai lan is deeply associated with Cantonese cuisine and is one of the signature vegetables of southern Chinese cooking. In Cantonese restaurants, stir-fried kai lan with oyster sauce is a standard item on virtually every menu — a measure of a kitchen's ability to handle vegetables at high heat. In Hong Kong, beef with kai lan in oyster sauce is a classic Cantonese combination. The vegetable is also beloved in Malaysian and Singaporean Chinese cooking, where it appears in char kway teow and other hawker preparations.",
    origin_regions: ["Southern China", "Cantonese cuisine", "Southeast Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Chinese broccoli (Kai Lan) is classified as cool and sweet-bitter in TCM, associated with the Lung, Stomach, and Large Intestine meridians. It is used to clear heat, detoxify, relieve cough, and support the Lung. The slightly bitter quality is associated with Heart-clearing and heat-resolving properties. It is considered particularly beneficial for dry cough and heat patterns in the upper burner."
    },
    modern_scientific_research: "Chinese broccoli is exceptionally rich in glucosinolates, vitamins A, C, and K, and calcium. Research on glucosinolate metabolites (isothiocyanates and indoles) from brassicas shows consistent cancer-preventive effects in epidemiological studies and plausible mechanisms in laboratory research. Chinese broccoli contains sulforaphane precursors, studied for anti-cancer, antioxidant, and anti-inflammatory properties.",
    culinary_uses: "Blanch and dress with oyster sauce for the classic Cantonese preparation. Stir-fry with garlic and a splash of Shaoxing wine. Add to beef stir-fries and noodle dishes. Use in hot pots. The thick stems benefit from being cut smaller or blanched slightly before stir-frying so they cook at the same rate as the leaves.",
    preparation_methods: "Trim the bottom inch from stems. If stems are thick, split lengthwise or score the base for even cooking. Blanch 2–3 minutes in boiling salted water for tender-crisp results. For stir-frying, add a splash of water to the wok and cover briefly to steam the stems through.",
    traditional_dishes: ["Kai lan with oyster sauce", "Beef with kai lan", "Char kway teow (Malaysian)", "Cantonese stir-fried greens", "Dim sum side vegetable"],
    tags: ["vegetable", "brassica", "chinese", "cantonese", "oyster-sauce", "healthy", "stir-fry"],
    published: true
  },
  {
    name: "Water Spinach",
    slug: "water-spinach",
    alternative_names: ["Kong Xin Cai", "Morning Glory", "Ong Choy", "Ipomoea aquatica", "Hollow Vegetable", "Kangkong"],
    overview: "Water spinach is a semi-aquatic leafy vegetable with hollow stems and arrow-shaped leaves that is beloved across Chinese and Southeast Asian cooking for its light, clean flavor and satisfying crunch. Its name in Chinese — kong xin cai (hollow-stemmed vegetable) — refers to the characteristic hollow stems that stay crisp even after cooking. It wilts instantly in a screaming hot wok and is one of the few vegetables that genuinely benefits from extremely high heat.",
    flavor_profile: ["mild", "clean", "slightly sweet", "fresh", "tender"],
    cultural_history: "Water spinach has been cultivated across tropical and subtropical Asia for over two thousand years. It is particularly central to Cantonese, Teochew, Vietnamese, Thai, and Malay cuisines. The Cantonese preparation — stir-fried in fermented tofu (jiang doufu) with garlic — is one of the classic street food and restaurant preparations of southern China and Hong Kong. In Singapore and Malaysia, sambal kangkong (water spinach with shrimp paste and chili) is a hawker staple. Its rapid growth in water makes it an important food crop in flooded paddy fields.",
    origin_regions: ["Tropical Asia", "Southern China", "Guangdong", "Southeast Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Water spinach (Kong Xin Cai) is classified as cool and sweet in TCM, associated with the Stomach, Small Intestine, and Large Intestine meridians. It is used to clear heat, cool the Blood, detoxify, promote urination, and moisten the intestines. It is prescribed for heat conditions affecting the intestines and is considered particularly useful for constipation from heat and dryness. It is also used topically for snake bites and skin inflammations in folk medicine."
    },
    modern_scientific_research: "Water spinach is rich in iron, vitamins A and C, and beta-carotene — making it nutritionally significant in the diets of communities that rely on it as a primary leafy green. Research shows antioxidant properties from its polyphenol content and potential blood sugar-modulating effects from compounds that inhibit alpha-glucosidase. The iron content, while high, is non-heme iron (less bioavailable than heme iron), and vitamin C in the same dish enhances absorption.",
    culinary_uses: "Stir-fry at the highest heat possible with fermented tofu and garlic for the classic Cantonese preparation. Stir-fry with shrimp paste for the Southeast Asian version. Blanch briefly and dress with sauce. Add to hot pots. Water spinach wilts dramatically — use much more than you think you need.",
    preparation_methods: "Separate stems from leaves — stems take longer to cook. Snap or cut into 2–3 inch sections. Heat the wok until smoking before adding oil and aromatics — water spinach needs high heat to stir-fry rather than steam. Add stems first, then leaves.",
    traditional_dishes: ["Cantonese stir-fried water spinach with fermented tofu", "Sambal kangkong (Southeast Asian)", "Ong choy with garlic", "Vietnamese morning glory stir-fry", "Hot pot vegetable"],
    tags: ["vegetable", "chinese", "cantonese", "southeast-asian", "stir-fry", "cooling", "iron"],
    published: true
  },
  {
    name: "Snow Peas",
    slug: "snow-peas",
    alternative_names: ["He Lan Dou", "Mangetout", "Sugar Peas", "Pisum sativum var. saccharatum"],
    overview: "Snow peas are flat, edible-podded peas harvested before the seeds develop, eaten whole pod and all. Their texture — crisp and satisfying, never starchy — and delicate sweetness make them one of the most pleasant vegetables to eat. In Chinese cooking, they are used almost exclusively in stir-fries where their color, crunch, and fresh flavor contribute to a dish's overall balance. A well-cooked snow pea remains brilliantly green and snaps; an overcooked one turns dull and limp.",
    flavor_profile: ["sweet", "fresh", "crisp", "delicate", "green"],
    cultural_history: "Snow peas have been cultivated in China for centuries, and the name he lan dou (Holland pea) reflects their journey back to East Asia via Dutch traders, even though the pea's origins are in the Middle East and Central Asia. They became particularly central to Cantonese and Hong Kong-style cooking, where their appearance in stir-fries with beef, scallops, and prawns represents the Cantonese aesthetic of fresh, quickly cooked vegetables that retain their vitality.",
    origin_regions: ["Central Asia (origin)", "China", "Cantonese cuisine"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Snow peas (He Lan Dou) are classified as neutral and sweet in TCM, associated with the Spleen and Stomach meridians. They are used to strengthen the Spleen, harmonize the Stomach, and promote diuresis. They are considered a gentle, tonifying vegetable appropriate for most constitutions, particularly those with Spleen Qi deficiency."
    },
    modern_scientific_research: "Snow peas contain vitamins C and K, iron, and flavonoids. The edible pod contains dietary fiber from the cell walls of both the pod and the developing seeds. Research on pea consumption shows benefits for blood sugar management and digestive health from the fiber content. The chlorophyll content and bright green color indicate high levels of carotenoids and phytonutrients.",
    culinary_uses: "Stir-fry briefly — no more than 2 minutes — with garlic, oyster sauce, and a splash of water. Add to beef and chicken stir-fries near the end of cooking. Use in spring rolls and dumplings for crunch. Blanch quickly and add to cold noodle dishes. Use raw in salads.",
    preparation_methods: "String both sides — there is a tough string along each edge seam that should be removed. Snap off the stem end and pull toward the opposite end to remove both strings in one motion. Cook very briefly to preserve crunch and bright green color.",
    traditional_dishes: ["Stir-fried beef with snow peas", "Cantonese combination stir-fry", "Spring rolls", "Shrimp with snow peas", "Cold sesame noodles with vegetables"],
    tags: ["vegetable", "chinese", "cantonese", "stir-fry", "quick-cooking", "sweet", "crisp"],
    published: true
  },
  {
    name: "Bean Sprouts",
    slug: "bean-sprouts",
    alternative_names: ["Dou Ya", "Mung Bean Sprouts", "Soybean Sprouts (Kong Namul)", "Green Bean Sprouts"],
    overview: "Bean sprouts are the germinated seeds of mung beans or soybeans — white, crunchy, and mild, with a fresh, slightly grassy flavor. They add texture and bulk to stir-fries, noodle dishes, and soups without asserting a strong flavor of their own. Mung bean sprouts (the common variety in most Chinese cooking) are delicate and quick-cooking; soybean sprouts are larger and more robust. Both contribute crunch, freshness, and a clean nutritional profile.",
    flavor_profile: ["mild", "fresh", "crunchy", "slightly grassy", "neutral"],
    cultural_history: "Sprouting beans is a technique as ancient as agriculture in China — a way to produce fresh vegetables year-round without access to farmland, and a method for increasing the nutritional availability of legumes. Bean sprouts appear in Chinese cooking texts dating back over a thousand years. In the 19th and early 20th centuries, Chinese immigrants in North America and Australia grew mung bean sprouts as a way to maintain access to Chinese vegetables in environments where they were unavailable, making sprouts one of the most culturally significant vegetables of the Chinese diaspora.",
    origin_regions: ["China", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Bean sprouts (Dou Ya) are classified as cool and sweet in TCM, associated with the Stomach and Small Intestine. Mung bean sprouts in particular are used to clear summer heat, promote urination, detoxify, and soothe the Stomach. The sprouting process is understood in TCM as activating the vital essence (jing) of the seed, making the nutrients more available and the food more vitalizing than the unsprouted bean."
    },
    modern_scientific_research: "Sprouting significantly increases the bioavailability of nutrients in legumes by reducing phytic acid (an antinutrient) and activating enzymes that break down complex sugars. Research shows sprouted mung beans have increased levels of vitamin C, folate, and antioxidants compared to unsprouted beans. The reduced phytic acid content means minerals like iron and zinc are more readily absorbed. Bean sprouts are low in calories and high in water content.",
    culinary_uses: "Stir-fry at very high heat for just 1–2 minutes to preserve crunch. Add to noodle dishes — pad thai, chow mein, and rice noodle soups use bean sprouts as a key textural element. Use in spring rolls and egg rolls. Add raw to pho and Vietnamese noodle soups as a table condiment. Combine with garlic chives for a classic simple stir-fry.",
    preparation_methods: "Rinse well before using. For best texture, cook very briefly in a screaming hot wok — they release a lot of water and go limp quickly. Tail the brown tips if appearance matters for the dish. Bean sprouts deteriorate quickly — use within 2 days of purchase.",
    traditional_dishes: ["Pad thai", "Chow mein", "Bean sprout and garlic chive stir-fry", "Pho (raw, as table condiment)", "Spring rolls"],
    tags: ["vegetable", "sprouts", "chinese", "stir-fry", "neutral", "quick-cooking", "mung-bean"],
    published: true
  },
  {
    name: "Lotus Root",
    slug: "lotus-root",
    alternative_names: ["Lian Ou", "He Ou", "Nelumbo nucifera root", "Lotus Rhizome"],
    overview: "Lotus root is the rhizome of the sacred lotus plant — a starchy, crunchy vegetable with a distinctive cross-section of hollow channels that creates a lace-like pattern when sliced. It has a mild, slightly sweet flavor and a satisfying crunch that holds up well to cooking. Lotus root is used across Chinese cooking in stir-fries, braises, soups, and as a snack both fresh and dried. Its visual beauty — the elegant pattern of its cross-section — makes it one of the most striking vegetables in Chinese cuisine.",
    flavor_profile: ["mild", "slightly sweet", "starchy", "crunchy", "clean"],
    cultural_history: "The lotus plant has profound significance in Chinese culture, Buddhism, and Taoism — representing purity, spiritual awakening, and the ability to emerge unstained from muddy conditions. Every part of the lotus is used: the root as food, the seeds as medicine and dessert ingredient, the leaves as wrappers and tea, the flowers as ornament and symbol. Lotus root has been eaten in China for over three thousand years. It appears in both rustic peasant cooking (slow-braised with pork ribs) and in the elaborate preparations of imperial banquets. In Hubei province, where the Yangtze basin produces exceptional lotus root, it is a defining regional ingredient.",
    origin_regions: ["China", "South Asia", "Hubei", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Lotus root (Lian Ou) is classified as cool when raw and warm when cooked in TCM — one of the few foods with different thermal properties depending on preparation. Raw lotus root juice clears heat, cools the Blood, and stops bleeding. Cooked lotus root nourishes the Spleen and Stomach, benefits Blood, and calms the mind. It is associated with the Heart, Spleen, and Stomach meridians and is used for both acute heat conditions (raw) and chronic deficiency patterns (cooked)."
    },
    modern_scientific_research: "Lotus root contains polyphenols, particularly flavonoids and tannins, with documented antioxidant and anti-inflammatory properties. Research suggests lotus root extract may have hepatoprotective effects and blood sugar-moderating properties. It is a good source of vitamin C, potassium, and dietary fiber. The tannin content contributes its blood-stopping properties in traditional medicine.",
    culinary_uses: "Slice thinly and stir-fry for a crisp, lacy preparation. Braise with pork ribs and soy sauce for the classic Hubei home dish. Add to hot pots. Slice and pickle in rice vinegar for a refreshing cold dish. Fill the hollow channels with sticky rice for a festive steamed preparation. Use slices in clear soups for visual appeal.",
    preparation_methods: "Peel the skin with a vegetable peeler. Submerge sliced lotus root in acidulated water immediately after cutting to prevent browning. For stir-fries, slice thinly and cook in a hot wok. For soups and braises, cut into thicker pieces that will hold their shape during long cooking.",
    traditional_dishes: ["Lotus root and pork rib soup", "Stir-fried lotus root with black vinegar", "Stuffed lotus root with sticky rice", "Hot pot vegetable", "Pickled lotus root"],
    tags: ["vegetable", "chinese", "hubei", "symbolic", "starchy", "buddhist", "braising", "stir-fry"],
    published: true
  },
  {
    name: "Bamboo Shoots",
    slug: "bamboo-shoots",
    alternative_names: ["Zhu Sun", "Bamboo Tips", "Winter Bamboo Shoots", "Spring Bamboo Shoots"],
    overview: "Bamboo shoots are the edible young shoots of bamboo plants, harvested before they harden into woody stalks. With a mild, slightly earthy flavor and a pleasantly firm, fibrous texture, they add substance and complexity to stir-fries, braises, soups, and hot pots. Fresh shoots require parboiling to remove bitterness; canned and vacuum-packed versions are convenient pantry staples. Winter shoots are considered a delicacy — denser and more tender than spring varieties.",
    flavor_profile: ["mild", "earthy", "slightly bitter (fresh)", "firm", "fibrous", "neutral"],
    cultural_history: "Bamboo shoots have been eaten in China for over two thousand years and hold cultural significance beyond their culinary use — bamboo itself symbolizes resilience, integrity, and flexibility in Chinese philosophy. Winter bamboo shoots (dong sun), harvested before emerging from the earth, are considered a luxury ingredient in Chinese cooking, valued for their dense texture and clean flavor. Spring shoots are more widely available and affordable. Bamboo shoot preparation for the imperial court was documented in the Song Dynasty as an elaborate process involving multiple cookings.",
    origin_regions: ["China", "East Asia", "Southeast Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Bamboo shoots (Zhu Sun) are classified as cool and sweet in TCM, associated with the Stomach and Large Intestine meridians. They are used to clear heat, dissolve phlegm, support digestion, and promote urination. They are prescribed for heat conditions, phlegm accumulation, and for their diuretic and digestive-supporting effects. Bamboo shoots are considered appropriate for people with heat or damp-heat patterns."
    },
    modern_scientific_research: "Bamboo shoots are low in calories and high in dietary fiber — making them a nutritionally valuable addition to dishes that adds bulk without calories. Research shows they contain phytosterols, lignans, and phenolic compounds with antioxidant and cholesterol-modulating properties. Bamboo shoots also contain tyrosine and good amounts of B vitamins. Fresh shoots contain small amounts of cyanogenic glycosides that are removed by parboiling.",
    culinary_uses: "Add to stir-fries for texture and bulk. Braise with pork belly and soy sauce. Add to hot pots and soups. Use in dumpling and wonton fillings for textural contrast. Combine with mushrooms for a classic vegetarian preparation. Stir-fry with pork and wood ear mushrooms for a northern Chinese classic.",
    preparation_methods: "Fresh shoots must be peeled and parboiled for 20–30 minutes in several changes of water to remove bitterness and cyanogenic compounds. Canned shoots should be rinsed well and blanched briefly before using. Vacuum-packed shoots have the best texture of convenience options.",
    traditional_dishes: ["Braised pork with bamboo shoots", "Stir-fried bamboo shoots with wood ear", "Hot and sour soup", "Shanghai-style bamboo shoot soup", "Spring roll filling"],
    tags: ["vegetable", "chinese", "braising", "stir-fry", "hot-pot", "symbolic", "seasonal"],
    published: true
  },
  {
    name: "Baby Corn",
    slug: "baby-corn",
    alternative_names: ["Xiao Yu Mi", "Young Corn", "Miniature Corn", "Zea mays"],
    overview: "Baby corn is immature corn harvested before the silks emerge and the kernels develop. Eaten whole — cob and all — it has a mild, slightly sweet flavor with a satisfying tender-crisp texture. Baby corn contributes visual appeal, color contrast, and gentle sweetness to stir-fries without dominating the dish. It is one of the most widely recognized Chinese-restaurant vegetables outside China, particularly in the Chinese-American and Cantonese-influenced global diaspora.",
    flavor_profile: ["mild", "slightly sweet", "tender-crisp", "gentle", "fresh"],
    cultural_history: "Baby corn has been grown in East and Southeast Asia for centuries, particularly in Thailand, which is the world's largest exporter. In Chinese cuisine, baby corn became particularly prominent in the Cantonese stir-fry tradition and in Chinese-American cooking, where its appealing appearance and easy preparation made it a fixture of combination stir-fries. In Thailand, where it is cultivated specifically for the baby corn market, it is a major agricultural export.",
    origin_regions: ["Thailand", "Southeast Asia", "China", "Cantonese cuisine"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Baby corn shares some properties of mature corn (Yu Mi) in TCM — neutral to slightly cool, sweet, and associated with the Stomach and Large Intestine. It is used to harmonize the middle burner and has mild diuretic properties. As an immature grain, it is considered more easily digestible than mature corn and gentler for sensitive digestion."
    },
    modern_scientific_research: "Baby corn is low in calories and contains dietary fiber, folate, and small amounts of vitamins A and C. Research on young corn shows similar phytochemical content to mature corn, including ferulic acid (an antioxidant) and lutein. The tender texture reflects the absence of developed starch granules, making it easily digestible.",
    culinary_uses: "Add to stir-fries as a visual and textural element. Use in combination stir-fries with other vegetables, meat, and seafood. Add to hot pots and soups. Use in spring rolls and fried rice. Cut diagonally for stir-fries, leave whole for soups and presentations.",
    preparation_methods: "Canned baby corn should be rinsed before use. Fresh baby corn should be blanched briefly. Cut diagonally for stir-fries to expose more surface area and improve sauce adherence. Cook briefly — 2–3 minutes maximum in a stir-fry.",
    traditional_dishes: ["Combination stir-fry", "Cantonese mixed vegetable stir-fry", "Hot and sour soup", "Thai basil stir-fry", "Chinese-American takeout classics"],
    tags: ["vegetable", "chinese", "cantonese", "stir-fry", "mild", "sweet", "presentation"],
    published: true
  },
  {
    name: "Chinese Eggplant",
    slug: "chinese-eggplant",
    alternative_names: ["Qie Zi", "Asian Eggplant", "Japanese Eggplant", "Solanum melongena"],
    overview: "Chinese eggplant is a slender, elongated variety of eggplant with thin, tender skin that does not need peeling and a mild, creamy flesh with far fewer seeds and less bitterness than its globe-shaped Western counterpart. Its narrow shape means it cooks quickly and evenly, absorbing sauces and flavors with an almost sponge-like thoroughness. In Chinese cooking, eggplant is one of the great receptacles for bold flavors — it absorbs doubanjiang, oyster sauce, and garlic equally well.",
    flavor_profile: ["mild", "creamy", "slightly sweet", "absorptive", "silky when cooked"],
    cultural_history: "Eggplant has been cultivated in China for over a thousand years, arriving from India via trade routes and quickly becoming central to Chinese cooking. The Sichuan preparation — yu xiang qie zi (fish-fragrant eggplant) — is one of the most famous preparations in all of Chinese regional cuisine, notable because it contains no fish at all: the name refers to the cooking technique traditionally used for fish. Eggplant is also central to Hunanese cooking and appears in countless regional variations across China. The preference for the long, slender Asian variety reflects an aesthetic and culinary preference for tenderness and mild flavor.",
    origin_regions: ["India (origin)", "China", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Eggplant (Qie Zi) is classified as cool and sweet in TCM, associated with the Spleen, Stomach, and Large Intestine meridians. It is used to clear heat, cool the Blood, activate Blood circulation, relieve pain, and reduce swelling. It is prescribed for heat conditions, bruising, and swelling. The cool nature means it should be eaten in moderation by people with cold-type conditions."
    },
    modern_scientific_research: "Chinese eggplant contains nasunin, a powerful antioxidant anthocyanin in the skin that has been studied for brain-protective and anti-inflammatory effects. It also contains chlorogenic acid, one of the most potent antioxidants found in plant foods. Research suggests eggplant consumption may have cholesterol-lowering effects. The thin skin of Asian eggplant means more nasunin is consumed per serving than with peeled globe varieties.",
    culinary_uses: "Stir-fry for yu xiang qie zi (fish-fragrant eggplant with doubanjiang, garlic, and ginger). Steam and dress with garlic soy sauce. Deep-fry until golden then braise in sauce. Roast until charred and creamy for a smoky preparation. Add to red-braised preparations with pork.",
    preparation_methods: "No need to peel Chinese eggplant. Salt and let sit for 20–30 minutes to draw out moisture before frying (reduces oil absorption). Or soak salted pieces in water, then squeeze dry. Cut into long strips for stir-fries, chunks for braises. Eggplant browns quickly — work fast after cutting or keep in water with a little vinegar.",
    traditional_dishes: ["Yu xiang qie zi (fish-fragrant eggplant)", "Sichuan braised eggplant with doubanjiang", "Steamed eggplant with garlic sauce", "Eggplant and pork stir-fry", "Cantonese stuffed eggplant"],
    tags: ["vegetable", "chinese", "sichuan", "cantonese", "braising", "stir-fry", "absorptive"],
    published: true
  },
  {
    name: "Napa Cabbage",
    slug: "napa-cabbage",
    alternative_names: ["Da Bai Cai", "Chinese Cabbage", "Celery Cabbage", "Brassica rapa subsp. pekinensis", "Wong Bok"],
    overview: "Napa cabbage is the large, pale green, barrel-shaped cabbage with crinkled leaves and a mild, slightly sweet flavor that is one of the most consumed vegetables in all of East Asian cooking. Unlike round Western cabbage, napa cabbage is tender enough to eat raw in salads, quick enough to stir-fry at high heat, and sturdy enough to survive long braises and fermentation. It is the vegetable that becomes kimchi, that fills the best dumplings, and that makes the simplest braised pork extraordinary.",
    flavor_profile: ["mild", "slightly sweet", "tender", "clean", "versatile"],
    cultural_history: "Napa cabbage has been cultivated in northern China for over a thousand years and became the dominant winter vegetable across northern and northeastern China before modern refrigeration. In the northeast (Dongbei), where winters are severe, napa cabbage was pickled in enormous quantities in autumn — suan cai (sour cabbage) — to provide vegetables through the long winter. The same preservation tradition in Korea produced kimchi. In northern Chinese cooking, napa cabbage appears in dumplings, stir-fries, braises, and soups with an everyday familiarity that reflects its status as a fundamental staple.",
    origin_regions: ["Northern China", "China", "Korea"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Napa cabbage (Da Bai Cai) is classified as neutral to cool and sweet in TCM, associated with the Stomach and Large Intestine. It is used to moisten dryness, clear heat, and support the Large Intestine. It is considered a gentle, nourishing vegetable appropriate for most constitutions. In winter, when fresh vegetables are scarce in northern China, napa cabbage has been the primary source of both nutrition and medicinal food for generations."
    },
    modern_scientific_research: "Napa cabbage is rich in vitamins C and K, folate, and glucosinolates. Research on brassica glucosinolates and their metabolites shows consistent cancer-preventive associations. Fermented napa cabbage (sauerkraut, kimchi) has been studied for its probiotic content and associated gut health benefits, including improved microbiome diversity and immune function. The fermentation process increases bioavailability of certain nutrients.",
    culinary_uses: "Use in dumpling fillings — salt, squeeze dry, and combine with pork and aromatics. Braise whole with stock, oyster sauce, and mushrooms for a classic winter preparation. Stir-fry quickly with garlic at high heat. Ferment for suan cai or kimchi. Add to hot pots and soups. Use raw in slaws and salads.",
    preparation_methods: "For dumpling fillings: salt shredded cabbage generously, let sit 20 minutes, then squeeze out all liquid — this is critical for a non-soggy filling. For stir-fries: separate leaves, cut into bite-sized pieces, and cook in batches if necessary to avoid steaming. The white stem parts take longer than the leafy parts.",
    traditional_dishes: ["Pork and cabbage dumplings (shui jiao)", "Braised napa cabbage with mushrooms", "Dongbei suan cai hot pot", "Kimchi (Korean)", "Napa cabbage and vermicelli soup"],
    tags: ["vegetable", "brassica", "chinese", "northern-chinese", "dumpling", "fermented", "winter", "pantry-staple"],
    published: true
  },
  {
    name: "Mustard Greens",
    slug: "mustard-greens",
    alternative_names: ["Jie Cai", "Chinese Mustard", "Brassica juncea", "Gai Choy", "Xue Li Hong"],
    overview: "Mustard greens are a peppery, slightly bitter brassica used fresh, pickled, and preserved across Chinese regional cuisines. The flavor is assertive — a sharp, pungent heat and bitterness that plays against rich meats and becomes mellow and complex through pickling and fermentation. Fresh mustard greens are stir-fried quickly; preserved versions (suan cai in Sichuan, mei cai in Guangdong, xue cai in Shanghai) are some of the most important condiments in Chinese cooking.",
    flavor_profile: ["peppery", "bitter", "pungent", "sharp", "becomes mellow when pickled"],
    cultural_history: "Mustard greens have been cultivated in China for over four thousand years and have been used both as a food crop and as a source of mustard seeds for oil and condiments. The preserved forms — perhaps more important than the fresh — represent some of China's oldest food preservation traditions. Sichuan suan cai (pickled mustard greens) are fundamental to Sichuan fish dishes. Mei cai (dried preserved mustard greens from Guangdong) enriches the braised pork that is synonymous with Hakka cooking. Xue cai (Ningbo preserved mustard) flavors Shanghai-style stir-fries and noodle soups.",
    origin_regions: ["China", "South Asia (origin)", "Sichuan", "Guangdong", "Shanghai"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Mustard greens (Jie Cai) are classified as warm and acrid in TCM, associated with the Lung, Liver, and Kidney meridians. They are used to warm the Lung, transform phlegm, regulate Qi, and stimulate circulation. They are prescribed for cold-phlegm conditions, cough, and digestive stagnation. The pungent quality is considered activating and dispersing — cutting through accumulation and promoting movement."
    },
    modern_scientific_research: "Mustard greens contain glucosinolates including sinigrin, which converts to allyl isothiocyanate — the compound responsible for mustard's characteristic heat. Research on mustard compounds shows antimicrobial, anti-inflammatory, and potential cancer-preventive properties. Mustard greens are rich in vitamins A, C, and K, folate, and calcium. The fermentation of preserved mustard greens produces beneficial organic acids, probiotics, and increased bioavailability of nutrients.",
    culinary_uses: "Fresh: stir-fry with garlic, preserved meats, or chili. Pickle in salt and rice vinegar for suan cai. Use preserved mei cai in braised pork belly (mei cai kou rou). Add xue cai to stir-fried rice cakes and noodle soups. Use pickled mustard greens in Sichuan fish soup for its characteristic sour-spicy note.",
    preparation_methods: "Fresh mustard greens: wash well, cut into bite-sized pieces, and stir-fry over high heat. Blanch briefly to reduce bitterness before using in mild preparations. For quick pickling: salt, let sit 30 minutes, press out liquid, and dress with rice vinegar, sugar, and sesame oil.",
    traditional_dishes: ["Mei cai kou rou (braised pork with preserved mustard)", "Sichuan pickled fish with suan cai", "Stir-fried mustard greens with garlic", "Xue cai and pork rice cake stir-fry", "Hakka braised pork"],
    tags: ["vegetable", "brassica", "chinese", "sichuan", "cantonese", "preserved", "fermented", "pungent"],
    published: true
  },
  {
    name: "Choy Sum",
    slug: "choy-sum",
    alternative_names: ["Cai Xin", "Choi Sum", "Chinese Flowering Cabbage", "Brassica rapa var. parachinensis"],
    overview: "Choy sum — literally 'vegetable heart' — is a tender, slightly sweet flowering brassica harvested while still in early flower, with small yellow blossoms, slender stems, and tender leaves. It is one of the most popular vegetables in Cantonese cooking, prized for its mild flavor and the fact that the stems, leaves, and flowers are all tender enough to eat together without any tough parts to discard. Quickly blanched and dressed, it is one of the finest simple vegetable preparations in Chinese cooking.",
    flavor_profile: ["mild", "slightly sweet", "tender", "clean", "fresh"],
    cultural_history: "Choy sum is a staple of Cantonese home cooking and restaurant menus, its mild, sweet flavor and visual appeal — the tiny yellow flowers against vivid green stems — making it one of the most requested vegetables in southern Chinese dining. In Hong Kong and Cantonese diaspora communities, it is considered everyday food of the highest quality: unpretentious, seasonal, and deeply satisfying when perfectly prepared. It is closely related to but distinct from yu choy (another flowering brassica).",
    origin_regions: ["Southern China", "Cantonese cuisine", "Guangdong"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Choy sum (Cai Xin) is classified as neutral to cool and sweet in TCM, associated with the Spleen, Stomach, and Large Intestine. It is used to clear heat, moisturise dryness, and detoxify. The tender, flowering stage of the plant is considered to carry more Qi and nutritive essence than older, more fibrous vegetables. It is considered appropriate for all constitutions."
    },
    modern_scientific_research: "Choy sum is rich in vitamins A, C, and K, calcium, folate, and glucosinolates. As a flowering brassica harvested at its peak, it contains high levels of phytonutrients. Research on brassica consumption consistently shows associations with reduced cancer risk from glucosinolate metabolites. The calcium content is notably high for a leafy green.",
    culinary_uses: "Blanch and dress with oyster sauce for the classic Cantonese preparation. Stir-fry at high heat with garlic. Add to noodle soups. Use in hot pots. Steam over boiling water. The tender stems and leaves cook together in the same time.",
    preparation_methods: "Trim the base and any tough outer stems. Wash carefully — sand collects at the base. Blanch in well-salted boiling water for 60–90 seconds until bright green and just tender. Drain and dress immediately. For stir-fries, 2–3 minutes in a hot wok is sufficient.",
    traditional_dishes: ["Cantonese blanched choy sum with oyster sauce", "Stir-fried choy sum with garlic", "Wonton noodle soup accompaniment", "Dim sum vegetable", "Hot pot vegetable"],
    tags: ["vegetable", "brassica", "chinese", "cantonese", "mild", "quick-cooking", "flowering"],
    published: true
  },
  {
    name: "Yu Choy",
    slug: "yu-choy",
    alternative_names: ["You Cai", "Chinese Rapeseed", "Oilseed Rape Greens", "Brassica napus", "Canola Greens"],
    overview: "Yu choy (you cai) is a flowering brassica grown for both its tender greens and its oil-rich seeds. As a vegetable, it resembles choy sum in appearance but has a slightly more robust flavor with a pleasant mild bitterness and earthy note. Used in Cantonese and southern Chinese cooking in the same ways as choy sum, it is a everyday staple vegetable prepared quickly and simply to let its fresh character shine.",
    flavor_profile: ["mild", "slightly bitter", "earthy", "fresh", "tender"],
    cultural_history: "Yu choy represents the vegetable form of one of China's most economically important crops — rapeseed, the plant also cultivated for canola oil. The dual-use cultivation of rapeseed as both a vegetable and an oil crop reflects the comprehensive utilization of plant resources characteristic of Chinese agriculture. In Cantonese cooking, yu choy and choy sum are used interchangeably in many preparations, though yu choy's slightly more robust flavor is preferred in dishes with stronger-flavored sauces.",
    origin_regions: ["China", "Southern China", "Cantonese cuisine"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Yu choy (You Cai) is classified as cool and sweet-bitter in TCM, associated with the Liver and Large Intestine. It is used to clear heat, activate Blood circulation, reduce swelling, and support the Large Intestine. The mild bitterness is associated with Heart-clearing properties in TCM food therapy."
    },
    modern_scientific_research: "Yu choy has a similar nutritional profile to other brassicas — rich in glucosinolates, vitamins A, C, and K, folate, and calcium. Rapeseed greens have been studied in Chinese nutritional research and show comparable antioxidant and cancer-preventive phytochemical content to other brassica vegetables. The seeds of the same plant are the source of canola oil, one of the most heart-healthy cooking oils studied.",
    culinary_uses: "Blanch and dress with oyster sauce for the classic Cantonese preparation. Stir-fry with garlic. Add to noodle soups and hot pots. Use interchangeably with choy sum in most preparations. The slightly more assertive flavor pairs well with fermented black bean sauce and stronger seasonings.",
    preparation_methods: "Trim the base and wash well. Blanch 60–90 seconds in boiling salted water until bright green. Dress immediately. For stir-fries, cook 2–3 minutes in a very hot wok.",
    traditional_dishes: ["Stir-fried yu choy with garlic", "Blanched yu choy with oyster sauce", "Noodle soup accompaniment", "Hot pot vegetable", "Cantonese mixed vegetable stir-fry"],
    tags: ["vegetable", "brassica", "chinese", "cantonese", "mild", "quick-cooking", "everyday"],
    published: true
  },
  {
    name: "Enoki Mushrooms",
    slug: "enoki-mushrooms",
    alternative_names: ["Jin Zhen Gu", "Golden Needle Mushrooms", "Flammulina velutipes", "Winter Mushrooms"],
    overview: "Enoki mushrooms are clusters of slender, white, needle-like mushrooms with tiny caps grown in the dark to produce their characteristic pale color and delicate texture. Their flavor is mild and slightly fruity; their primary contribution to dishes is textural — a tender crunch and visual elegance that makes them one of the most beautiful mushrooms in Chinese and Japanese cooking. They are an essential hot pot ingredient and a ubiquitous garnish in Asian cuisine.",
    flavor_profile: ["mild", "slightly fruity", "delicate", "tender-crunchy", "clean"],
    cultural_history: "Enoki mushrooms in their cultivated white form have been grown commercially in East Asia since the 1940s, though the wild form (which is brown and different in appearance) has been used in Chinese cooking for much longer. The cultivated form, grown in darkness on bottled substrate, is a modern agricultural product that has achieved remarkable cultural integration — enoki are now inseparable from hot pot culture, Japanese and Korean cooking, and increasingly global Asian cuisine. Wild enoki — found growing on rotting elm wood in autumn and winter — are prized by foragers in China and Japan.",
    origin_regions: ["East Asia", "China", "Japan"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Enoki mushrooms (Jin Zhen Gu) are classified as cool and sweet in TCM, associated with the Liver and Stomach meridians. They are used to tonify the Spleen and Stomach, nourish Liver Blood, promote digestion, and improve memory. They are considered particularly nourishing for children and people with Liver Blood deficiency. TCM attributes enoki's slender form to their affinity with the Liver, which governs the sinews."
    },
    modern_scientific_research: "Enoki mushrooms contain beta-glucans — polysaccharides with well-studied immunomodulatory properties. Research shows enoki beta-glucans may enhance NK cell activity and macrophage function. Flammulina velutipes extracts have been studied for potential anti-tumor properties in laboratory research. Enoki also contain ergosterol (a vitamin D precursor when exposed to UV), B vitamins, and amino acids including arginine, which supports immune function.",
    culinary_uses: "Add to hot pots — they cook in seconds and are best eaten barely warm. Use raw or very lightly cooked in cold preparations. Bundle and wrap with thinly sliced beef or pork for a classic hot pot preparation. Add to soups at the very last moment. Use as a garnish over noodle dishes. Grill briefly for a lightly caramelized preparation.",
    preparation_methods: "Trim the root base (the compressed end where they join) and separate into smaller clusters. Do not overcook — enoki go from pleasantly tender to mushy very quickly. They can be eaten raw in salads with a light dressing.",
    traditional_dishes: ["Hot pot vegetable", "Beef-wrapped enoki (yakiniku style)", "Japanese enoki miso soup", "Cold enoki salad", "Stir-fried enoki with oyster sauce"],
    tags: ["mushroom", "chinese", "japanese", "hot-pot", "delicate", "beta-glucan", "immune"],
    published: true
  },
  {
    name: "Shiitake Mushrooms",
    slug: "shiitake-mushrooms",
    alternative_names: ["Xiang Gu", "Fragrant Mushroom", "Lentinula edodes", "Dong Gu (dried winter mushroom)"],
    overview: "Shiitake are the most important mushroom in Chinese and Japanese cooking — rich, savory, and deeply umami, with a meaty, satisfying texture and a woody, earthy fragrance that perfumes everything around them. Fresh shiitake are excellent; dried shiitake are even more intensely flavored and produce a soaking liquid that is one of the great natural stocks in Chinese cooking. In Chinese cuisine, dried shiitake (particularly the prized thick-capped 'dong gu' or winter mushrooms) are a luxury ingredient used in the most refined preparations.",
    flavor_profile: ["rich", "earthy", "deeply umami", "woody", "meaty", "savory"],
    cultural_history: "Shiitake have been cultivated in China for over a thousand years, making them one of the first intentionally cultivated mushrooms in history. The technique of inoculating oak logs with shiitake spores was developed in China centuries before it was recorded in Japan. Dried winter shiitake (dong gu), with their thick caps and characteristic cracked pattern, are among the most expensive dried vegetables in Chinese cooking and feature prominently in Chinese New Year and celebration dishes. The soaking liquid from reconstituted dried shiitake is treated as a prized stock in Shanghainese and Cantonese cooking.",
    origin_regions: ["China", "Japan", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Shiitake (Xiang Gu) are classified as neutral and sweet in TCM, associated with the Spleen and Stomach meridians. They are used to tonify Qi, nourish Blood, support immune function, and benefit the Stomach. In TCM dietary medicine, shiitake are considered among the most tonifying and nourishing of vegetables — frequently prescribed for Qi and Blood deficiency, weakness, and general tonification."
    },
    modern_scientific_research: "Shiitake are among the best-researched medicinal mushrooms. Lentinan, a beta-glucan extracted from shiitake, has been studied extensively as an immune modulator and is used as a cancer adjunct therapy in Japan. Research shows shiitake consumption supports immune function, lowers LDL cholesterol (from eritadenine content), and provides cardiovascular benefits. Shiitake contain ergothioneine — a potent antioxidant also found in reishi — and are among the few plant sources of vitamin D when sun-dried.",
    culinary_uses: "Fresh: slice and stir-fry, add to soups, use in dumpling fillings and hot pots. Dried: rehydrate in warm water for 30 minutes, squeeze gently, slice, and cook. Keep the soaking liquid — strain and use as a stock. Use in red-braised preparations, stuffed preparations, and as a vegetarian substitute for meat umami.",
    preparation_methods: "Fresh: wipe clean with a damp cloth, remove stems (save for stock). The stems are woody — never eat them, but they make excellent stock. Dried: soak in warm water 30–60 minutes until fully rehydrated. Squeeze liquid back into the bowl. Strain and reserve the soaking liquid.",
    traditional_dishes: ["Buddha's delight (lo han jai)", "Braised whole shiitake", "Dumpling fillings", "Red-braised chicken with shiitake", "Steamed egg with shiitake"],
    tags: ["mushroom", "chinese", "japanese", "umami", "dried", "beta-glucan", "immune", "pantry-staple"],
    published: true
  },
  {
    name: "Wood Ear Mushrooms",
    slug: "wood-ear-mushrooms",
    alternative_names: ["Mu Er", "Black Fungus", "Cloud Ear", "Auricularia auricula-judae", "Tree Ear", "Silver Ear (white variety)"],
    overview: "Wood ear mushrooms are thin, ruffled, ear-shaped fungi that grow on wood — dark brown to black, with an almost translucent quality when rehydrated. Their flavor is mild and neutral; their contribution to dishes is entirely textural — a slippery, gelatinous crunch unlike any other ingredient in Chinese cooking. This unusual texture is prized in Chinese culinary tradition for its contrast value in cold dishes, stir-fries, and hot and sour soups.",
    flavor_profile: ["neutral", "mild", "gelatinous", "crunchy", "slightly earthy"],
    cultural_history: "Wood ear mushrooms have been used in Chinese cooking and medicine for over two thousand years. They grow wild on dead and dying trees across China and were among the first fungi to be deliberately cultivated. In Chinese cooking, they are one of the defining textural ingredients — prized not for their flavor but for the unique gelatinous crunch they contribute, a quality that aligns with Chinese culinary philosophy's emphasis on texture as a distinct element of enjoyment. Silver ear mushroom (bai mu er, Tremella fuciformis), a white, more delicate relative, is used primarily in sweet dessert soups as a beauty tonic.",
    origin_regions: ["China", "East Asia", "Southeast Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Wood ear (Mu Er) is classified as neutral and sweet in TCM, associated with the Lung, Stomach, and Large Intestine meridians. It is used to nourish Yin, moisten the Lung and intestines, cool the Blood, stop bleeding, and benefit the complexion. It is prescribed for Lung dryness, dry cough, hemorrhoids, and anemia. Silver ear (Bai Mu Er) is more strongly Yin-nourishing and is used as a beauty tonic to nourish the skin and Lung Yin."
    },
    modern_scientific_research: "Wood ear mushrooms contain acidic polysaccharides and anticoagulant compounds that research suggests may reduce blood platelet aggregation — providing a possible mechanism for their traditional use in supporting cardiovascular health. They are rich in dietary fiber, iron, and beta-glucans with immunomodulatory properties. Research also suggests anti-inflammatory and prebiotic effects. The high iron content makes wood ear particularly valued in TCM for Blood tonification.",
    culinary_uses: "Rehydrate dried wood ear in warm water for 20–30 minutes until plump and ruffled. Remove and discard the hard central stem. Use in hot and sour soup, stir-fries, cold dressed preparations, and dumpling fillings for textural contrast. Combine with lily buds and tofu in the classic 'mu shu' preparation. Add to noodle dishes for texture.",
    preparation_methods: "Soak dried wood ear in warm water until fully rehydrated (they expand 4–5 times in volume). Trim away the tough, woody base. Tear or cut into bite-sized pieces. Blanch briefly before using in cold dishes to ensure food safety.",
    traditional_dishes: ["Hot and sour soup", "Mu shu pork", "Stir-fried wood ear with garlic", "Cold wood ear salad", "Buddha's delight"],
    tags: ["mushroom", "chinese", "texture", "gelatinous", "dried", "neutral", "yin-nourishing", "iron"],
    published: true
  },
  {
    name: "Straw Mushrooms",
    slug: "straw-mushrooms",
    alternative_names: ["Cao Gu", "Paddy Straw Mushrooms", "Volvariella volvacea", "Rice Straw Mushrooms"],
    overview: "Straw mushrooms are small, round, smooth-capped mushrooms with a mild, earthy flavor and a slippery, velvety texture. Grown traditionally on beds of rice straw (hence the name), they are more common in canned or preserved form outside of Asia, where fresh straw mushrooms are difficult to find due to their extremely short shelf life. In Cantonese and Thai cooking, straw mushrooms add a distinctive meaty texture and subtle earthiness to stir-fries, soups, and curry preparations.",
    flavor_profile: ["mild", "earthy", "slightly slippery", "meaty", "subtle"],
    cultural_history: "Straw mushrooms have been cultivated in China for over three hundred years, originally grown on rice straw in the fields of the Pearl River Delta in Guangdong. They spread to Southeast Asia through Chinese diaspora communities and became central to Thai, Vietnamese, and Malay cooking. Their cultivation is closely tied to rice agriculture — the straw left after harvest provides the growing substrate. In Cantonese cooking, straw mushrooms are used in stir-fries, soups, and braised preparations where their mild, meaty quality adds body without dominating other flavors.",
    origin_regions: ["Guangdong", "Southern China", "Southeast Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Straw mushrooms (Cao Gu) are classified as cool and sweet in TCM, associated with the Spleen and Stomach. They are used to clear heat, tonify Qi, support the Spleen and Stomach, and benefit the digestion. Like other mushrooms in TCM, they are considered nourishing, tonifying foods appropriate for most constitutions."
    },
    modern_scientific_research: "Straw mushrooms contain beta-glucans and immunomodulatory polysaccharides, similar to other culinary mushrooms. Research shows antioxidant properties and potential anti-tumor activity from Volvariella volvacea polysaccharides in laboratory studies. They are a good source of B vitamins, copper, and selenium. The high water content (typical of fresh mushrooms) means they are low in calories.",
    culinary_uses: "Add to Cantonese stir-fries with oyster sauce, garlic, and other vegetables. Use in clear soups and hot pots. Add to Thai curries and stir-fries. Combine with tofu and leafy greens for simple, clean preparations. Canned straw mushrooms should be rinsed and blanched before use to remove any tinned flavor.",
    preparation_methods: "Fresh straw mushrooms (if available): use within 1–2 days, wipe clean, trim bases. Canned: drain, rinse thoroughly under cold water, and blanch briefly. If whole, they can be halved for stir-fries. Cook briefly — they are already fully edible from the can and need only to be heated through.",
    traditional_dishes: ["Cantonese stir-fried straw mushrooms with oyster sauce", "Hot and sour soup", "Thai green curry", "Braised tofu with straw mushrooms", "Fried rice"],
    tags: ["mushroom", "chinese", "cantonese", "thai", "mild", "stir-fry", "soup"],
    published: true
  }
]

async function seed() {
  console.log(`Seeding ${ingredients.length} Chinese aromatics and vegetables...\n`)
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
