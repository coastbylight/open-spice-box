import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const ingredients = [
  {
    name: "Soy Sauce",
    slug: "soy-sauce",
    alternative_names: ["Shoyu", "Jiang You", "Gan Jiang You", "Naturally Brewed Soy Sauce"],
    overview: "Soy sauce is one of the oldest fermented condiments in the world, produced from a carefully managed fermentation of soybeans, wheat, salt, and water. It is the backbone of East and Southeast Asian cooking — a source of deep umami, color, and salt that no other ingredient quite replicates. The best soy sauces are brewed for months or years; their complexity comes from time and microbial activity, not shortcuts.",
    flavor_profile: ["salty", "deeply savory", "umami", "slightly sweet", "fermented", "complex"],
    cultural_history: "Soy sauce evolved from jiang, an ancient Chinese fermented paste made from grain and meat. By the Han Dynasty (206 BCE–220 CE), a purely plant-based version made from soybeans had emerged. It spread via trade and cultural exchange to Japan (where it became shoyu), Korea (ganjang), and Southeast Asia. Each culture developed its own traditions around it, and today soy sauce production spans a vast range from mass-produced industrial versions to small-batch artisanal brews aged for years in cedar barrels.",
    origin_regions: ["China", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "In TCM, soy sauce is considered cooling and salty in nature. It is associated with the Stomach and Kidney meridians and is said to clear heat, harmonize the middle burner, and aid digestion. As a fermented food, it is understood to support the transformation and transportation functions of the Spleen and Stomach."
    },
    modern_scientific_research: "Soy sauce contains compounds formed during fermentation including isoflavones, free amino acids, and peptides. Research suggests it has antioxidant properties and contains compounds with potential anti-hypertensive effects. Naturally brewed soy sauce contains beneficial organic acids and Maillard reaction products associated with antioxidant activity. Sodium content is significant, so those managing hypertension should use low-sodium versions.",
    culinary_uses: "Soy sauce is used as a seasoning, marinade base, dipping sauce, and cooking liquid across Chinese, Japanese, Korean, Thai, Vietnamese, and Indonesian cuisines. It builds flavor in braises, stir-fries, noodle dishes, and soups. A small amount added to Western dishes — stews, pasta sauces, roasted vegetables — adds depth without tasting explicitly Asian.",
    preparation_methods: "Use directly from the bottle as a condiment. Add to marinades and sauces. For cooking, add early in the process for deeper integration or late for brighter, saltier flavor. Never substitute table salt for soy sauce — they contribute different flavor profiles entirely.",
    traditional_dishes: ["Red-braised pork (hong shao rou)", "Soy sauce chicken", "Japanese ramen", "Shoyu tare", "Fried rice"],
    tags: ["fermented", "umami", "chinese", "japanese", "korean", "condiment", "pantry-staple", "soy"],
    published: true
  },
  {
    name: "Light Soy Sauce",
    slug: "light-soy-sauce",
    alternative_names: ["Sheng Chou", "Thin Soy Sauce", "Regular Soy Sauce (Chinese)"],
    overview: "Light soy sauce is the everyday workhorse of Chinese cooking — thinner in consistency and lighter in color than dark soy sauce, but higher in salt and more intensely flavored. Despite its name, it is not a low-sodium product. The word 'light' refers to color and body, not salt content. It is the default soy sauce used for seasoning, marinating, and dipping in most Chinese kitchens.",
    flavor_profile: ["salty", "bright", "savory", "clean umami", "sharp"],
    cultural_history: "In Chinese culinary tradition, soy sauces are categorized by color, age, and process. Light soy sauce (sheng chou, meaning 'raw extracted' or 'fresh soy sauce') is the first-pressed extract from fermentation, giving it a lighter color and sharper, more direct flavor than the longer-aged dark versions. It has been the standard soy sauce in Cantonese, Hokkien, and Shanghainese cooking for centuries.",
    origin_regions: ["China", "Guangdong", "Fujian"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Light soy sauce shares the general TCM profile of soy sauce: cooling, salty, and supportive of the Stomach and Kidney meridians. Its fresh, first-pressed nature is considered slightly less concentrated in its medicinal qualities than dark soy sauce, but functionally similar as a digestive condiment."
    },
    modern_scientific_research: "Light soy sauce contains high levels of glutamates and free amino acids that create its characteristic umami flavor. Research on fermented soy products consistently shows antioxidant activity from isoflavone compounds and Maillard products. Sodium content is high (approximately 900–1000mg per tablespoon) — a meaningful consideration for regular heavy use.",
    culinary_uses: "Use light soy sauce wherever you want soy flavor without darkening the color of a dish. It is ideal for marinades, stir-fry sauces, white-cooked chicken, fish preparations, and any dish where the original colors of ingredients should remain visible. It is typically used in combination with dark soy sauce in braised dishes for balanced salt, color, and sweetness.",
    preparation_methods: "Use straight from the bottle. When seasoning dishes, add in small increments and taste — light soy sauce is saltier than it appears. Pair with dark soy sauce in braising liquids for a more complex, layered result.",
    traditional_dishes: ["Cantonese steamed fish", "White-cooked chicken", "Wonton soup", "Chow mein", "Hainanese chicken rice"],
    tags: ["fermented", "umami", "chinese", "cantonese", "condiment", "pantry-staple", "soy"],
    published: true
  },
  {
    name: "Dark Soy Sauce",
    slug: "dark-soy-sauce",
    alternative_names: ["Lao Chou", "Black Soy Sauce", "Thick Soy Sauce"],
    overview: "Dark soy sauce is the richly colored, molasses-thickened counterpart to light soy sauce. It is aged longer and often has caramel or molasses added, giving it a deep mahogany color, a thicker consistency, and a subtly sweet, less salty flavor than its lighter counterpart. In Chinese cooking, dark soy sauce is used primarily for color and as a background note of sweetness — rarely as a seasoning agent on its own.",
    flavor_profile: ["rich", "slightly sweet", "caramel", "deeply savory", "mild salt", "thick"],
    cultural_history: "The distinction between light and dark soy sauce reflects centuries of refined Chinese culinary thinking about how ingredients contribute to a dish. Dark soy sauce (lao chou, meaning 'aged soy sauce') was developed for the specific purpose of adding color to braises and red-cooked dishes — a technique central to Chinese cuisine where long-cooked meats take on a deep red-brown color and glossy sheen that visually signals richness and care.",
    origin_regions: ["China", "Guangdong", "Shanghai"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Dark soy sauce is considered warming in TCM due to its longer fermentation and added sweetness. The molasses or caramel additions contribute to its nourishing quality. It is associated with strengthening the Spleen and Stomach and supporting Qi transformation."
    },
    modern_scientific_research: "Dark soy sauce's extended aging and caramelization process produces additional Maillard reaction products and melanoidins, which show significant antioxidant activity in research. The molasses content adds small amounts of iron and potassium. Like all soy sauces, it contains glutamates and bioactive peptides from soy protein fermentation.",
    culinary_uses: "Use dark soy sauce to add color and a note of sweetness to braised dishes, red-cooked meats, and fried rice. It is rarely used alone as a dipping sauce — always in combination with light soy sauce. A small amount added to noodle dishes or congee provides depth without strong saltiness.",
    preparation_methods: "Add to braising liquids early for color development. Use sparingly — a tablespoon or two goes a long way in terms of color. When substituting, note that it is less salty than light soy sauce and contributes sweetness.",
    traditional_dishes: ["Red-braised pork (hong shao rou)", "Soy sauce eggs", "Clay pot rice", "Char siu", "Master stock chicken"],
    tags: ["fermented", "umami", "chinese", "braising", "condiment", "pantry-staple", "soy"],
    published: true
  },
  {
    name: "Sesame Oil",
    slug: "sesame-oil",
    alternative_names: ["Zhi Ma You", "Toasted Sesame Oil", "Asian Sesame Oil"],
    overview: "Toasted sesame oil is one of the most aromatic fats in any pantry — a dark amber oil pressed from roasted sesame seeds with an intense, nutty fragrance that changes a dish the moment it hits the bowl. Unlike neutral cooking oils, it is used almost exclusively as a finishing oil and flavoring agent. Heat destroys its delicate aroma, so it is added at the end of cooking or used in dressings and dips.",
    flavor_profile: ["intensely nutty", "toasty", "rich", "aromatic", "warm"],
    cultural_history: "Sesame is one of the oldest oilseed crops, cultivated for over five thousand years across Africa and Asia. Sesame oil has been used in Chinese cooking since at least the Han Dynasty and features prominently in Korean, Japanese, and Southeast Asian cuisines. In China, the Shandong province is particularly associated with the production of high-quality roasted sesame oil. Cold-pressed light sesame oil (untoasted) has been used in South Asian and Middle Eastern cooking for even longer.",
    origin_regions: ["China", "Korea", "Japan", "South Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "In TCM, sesame (Zhi Ma) is considered neutral to slightly warm, and sweet in flavor. It is associated with the Liver, Kidney, and Large Intestine meridians. Sesame is said to nourish Blood, moisten dryness, tonify the Liver and Kidneys, and lubricate the intestines. Sesame oil in particular is used for its lubricating, moistening properties.",
      "Ayurveda": "Sesame oil (Tila Taila) occupies an unusually important place in Ayurveda — it is considered the supreme oil for abhyanga (self-massage) and is said to penetrate the skin deeply, nourishing the tissues. Internally, it is warming and nourishing, used to counter Vata excess and strengthen the nervous system."
    },
    modern_scientific_research: "Toasted sesame oil contains sesamin and sesamolin — lignans with antioxidant properties. Research suggests these compounds may have anti-inflammatory effects and potential cardiovascular benefits, including modest effects on blood pressure. Sesame oil is rich in polyunsaturated and monounsaturated fatty acids. Studies on sesaminol, a compound formed during sesame oil processing, show potent antioxidant activity.",
    culinary_uses: "Used as a finishing oil in Chinese, Japanese, and Korean dishes. Drizzle over noodles, dumplings, soups, and stir-fries just before serving. Essential in cold sesame noodle dressings, bibimbap sauce, and Japanese sesame dressings. Combine with soy sauce, vinegar, and ginger for a universal dipping sauce for dumplings.",
    preparation_methods: "Add at the very end of cooking to preserve aroma. Store in a cool, dark place — toasted sesame oil goes rancid relatively quickly due to its high polyunsaturated fat content. Buy small bottles and use within a few months of opening.",
    traditional_dishes: ["Dan dan noodles", "Cold sesame noodles", "Bibimbap", "Japanese sesame dressing", "Wontons in chili oil"],
    tags: ["oil", "finishing", "chinese", "korean", "japanese", "nutty", "aromatic", "pantry-staple"],
    published: true
  },
  {
    name: "Shaoxing Wine",
    slug: "shaoxing-wine",
    alternative_names: ["Shao Hsing Wine", "Chinese Rice Wine", "Huangjiu"],
    overview: "Shaoxing wine is a fermented rice wine from Shaoxing, Zhejiang province — one of the most important flavoring agents in Chinese cooking. Amber-colored with a complex, slightly sweet and nutty flavor, it is used in marinades, braises, stir-fries, and red-cooked dishes to add depth and round out sharp or fishy notes. There is no perfect substitute: dry sherry comes closest in a pinch, but Shaoxing wine has a character of its own.",
    flavor_profile: ["nutty", "slightly sweet", "complex", "mellow", "fermented", "amber"],
    cultural_history: "Shaoxing wine has been produced in Zhejiang province for over two thousand years. The city of Shaoxing has a history intertwined with wine — its water, drawn from ancient Jian Lake, was considered essential to the wine's character. Traditional Shaoxing wine is aged in earthenware urns, sometimes for decades. 'Nu er hong' (daughter's red wine) is a tradition where wine is buried at a daughter's birth and opened at her wedding.",
    origin_regions: ["Shaoxing", "Zhejiang", "China"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "In TCM, Shaoxing wine (Huang Jiu) is considered warm and sweet. It is used as a menstruum to carry medicinal herbs into the body and to activate their effects. Many TCM herbal formulas specify wine-processed (jiu zhi) herbs, where herbs are stir-fried with wine to enhance their warming and activating properties. Externally, rice wine is used to treat cold-damp conditions and improve circulation."
    },
    modern_scientific_research: "Shaoxing wine contains organic acids, esters, and amino acids produced during fermentation. The alcohol content (typically 14–18%) contributes to flavor extraction and preservation in cooking. Fermented grain beverages have been studied for their prebiotic compounds and organic acids, though the health effects of cooking wine as a culinary ingredient are less researched than those of fermented foods consumed directly.",
    culinary_uses: "Add to marinades for meat and seafood to tenderize and reduce gamey or fishy flavors. Use in stir-fry sauces, braising liquids, and red-cooked dishes. Deglaze a hot wok with it for an aromatic burst. Use in clay pot dishes and dim sum preparations. Pair naturally with soy sauce, ginger, star anise, and fermented black beans.",
    preparation_methods: "Use at room temperature. Add to hot woks or pans — the alcohol cooks off quickly and leaves the flavor behind. For marinades, combine with soy sauce and aromatics. The culinary grade (often labeled 'cooking wine') is saltier than drinking-grade Shaoxing — adjust salt in the dish accordingly.",
    traditional_dishes: ["Drunken chicken", "Red-braised pork (hong shao rou)", "Lion's head meatballs", "Dongpo pork", "Steamed crab"],
    tags: ["wine", "fermented", "chinese", "zhejiang", "marinade", "braising", "pantry-staple", "cooking-wine"],
    published: true
  },
  {
    name: "Oyster Sauce",
    slug: "oyster-sauce",
    alternative_names: ["Hao You", "Oyster-Flavored Sauce"],
    overview: "Oyster sauce is a thick, dark brown condiment made from oyster extracts, sugar, and salt — cooked down and caramelized into a glossy, intensely savory sauce with a sweetness and depth unlike anything else in the pantry. It was invented in Guangdong in the late 19th century and has become indispensable in Cantonese cooking and broadly across Chinese, Thai, and Vietnamese cuisines.",
    flavor_profile: ["sweet", "deeply savory", "umami", "slightly caramel", "rich", "briny"],
    cultural_history: "Oyster sauce was reportedly invented by accident around 1888 by Lee Kum Sheung of Guangdong, who left oysters simmering too long and discovered the rich, concentrated liquid that resulted. He went on to found the Lee Kum Kee company, which became one of the most recognized condiment brands in Asia. Oyster sauce spread rapidly through Cantonese cooking and then throughout Chinese diaspora communities worldwide.",
    origin_regions: ["Guangdong", "China", "Cantonese cuisine"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Oysters (Mu Li) have a significant place in TCM as both food and medicine. The shell is used medicinally to anchor Yang, calm the mind, and soften hardness. Oyster meat is considered sweet and salty, nourishing Yin and supporting the Kidney. Oyster sauce, as a concentrated essence of oyster, carries some of these nourishing associations in a culinary context."
    },
    modern_scientific_research: "Oyster sauce contains glutamates and natural flavor compounds from oyster extract that contribute to its umami depth. Oysters themselves are among the richest dietary sources of zinc and contain high levels of vitamin B12, iron, and omega-3 fatty acids. Commercially processed oyster sauce retains some of these micronutrients, though concentrations vary by brand and processing method. Sugar and salt content are significant.",
    culinary_uses: "Used as a sauce base for stir-fried vegetables and meats, a marinade component, and a finishing glaze. Essential in Chinese-American stir-fries, beef with broccoli, and Cantonese vegetable preparations. Pair with soy sauce and sesame oil for a classic Chinese sauce base. A small amount added to fried rice or noodles adds immediate depth.",
    preparation_methods: "Use straight from the bottle. Thin with water or stock to make a pourable sauce. Heat gently — high direct heat can make it bitter. Combine with soy sauce, garlic, and cornstarch dissolved in water for a reliable stir-fry sauce.",
    traditional_dishes: ["Beef and broccoli", "Cantonese-style kai lan", "Oyster sauce chicken", "Congee toppings", "Chow fun"],
    tags: ["condiment", "umami", "cantonese", "chinese", "stir-fry", "pantry-staple", "sweet-savory"],
    published: true
  },
  {
    name: "Hoisin Sauce",
    slug: "hoisin-sauce",
    alternative_names: ["Haixian Jiang", "Chinese Barbecue Sauce", "Peking Sauce"],
    overview: "Hoisin sauce is a thick, fragrant, sweet-savory sauce made from fermented soybean paste, sugar, vinegar, garlic, and spices. Its name means 'seafood' in Cantonese, though it contains no seafood — the name may refer to its original use as a dipping sauce for seafood dishes. Today it is most widely known as the sauce brushed onto Peking duck pancakes, but it is used in a wide range of dishes across Chinese and Vietnamese cuisine.",
    flavor_profile: ["sweet", "savory", "tangy", "spiced", "thick", "complex"],
    cultural_history: "Hoisin sauce developed in Cantonese cuisine and has been a commercial condiment product for over a century. Its role in Peking duck service made it famous internationally as China's food culture spread globally. In Vietnamese cuisine, hoisin sauce (tuong den) became a table condiment for pho and other dishes — an example of how Chinese ingredients were adopted and adapted across Southeast Asia through centuries of cultural exchange.",
    origin_regions: ["Guangdong", "China", "Cantonese cuisine"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Hoisin sauce's fermented soybean base aligns with TCM's understanding of fermented soy foods as supportive to the Spleen and Stomach. The combination of sweet and savory is considered harmonizing to the digestive system."
    },
    modern_scientific_research: "The fermented soybean base of hoisin sauce contributes bioactive peptides and isoflavones associated with antioxidant activity. The vinegar component provides acetic acid, which research suggests may aid blood sugar management. Hoisin sauce is high in sugar and sodium, so it is best used as a flavoring agent rather than consumed in large quantities.",
    culinary_uses: "Use as a glaze for roasted meats, a dipping sauce for spring rolls and Peking duck, a flavoring agent in stir-fries, and a marinade base for char siu pork. Thin with water for a lighter glaze. Pair with sesame oil and soy sauce for a versatile sauce. In Vietnamese cuisine, serve alongside pho as a condiment.",
    preparation_methods: "Use straight from the jar. For glazing, brush on during the last 10–15 minutes of roasting to caramelize without burning. Thin with rice vinegar to balance the sweetness for dressings.",
    traditional_dishes: ["Peking duck", "Char siu pork", "Mu shu pork", "Vietnamese pho (condiment)", "Spring roll dipping sauce"],
    tags: ["condiment", "fermented", "sweet-savory", "cantonese", "chinese", "vietnamese", "glaze", "pantry-staple"],
    published: true
  },
  {
    name: "Black Vinegar",
    slug: "black-vinegar",
    alternative_names: ["Zhenjiang Vinegar", "Chinkiang Vinegar", "Chen Cu", "Aromatic Rice Vinegar"],
    overview: "Chinese black vinegar is a complex, aged vinegar made from glutinous rice, wheat bran, and other grains. The most famous variety comes from Zhenjiang in Jiangsu province and has a deep, dark color, a mellow acidity, and a layered flavor profile with notes of smoke, malt, and sweetness that distinguish it entirely from Western vinegars. It is as important to certain Chinese dishes as balsamic is to Italian cooking.",
    flavor_profile: ["mellow", "complex", "slightly sweet", "smoky", "malty", "acidic", "deep"],
    cultural_history: "Black vinegar has been produced in China for over three thousand years. Zhenjiang vinegar (Zhenjiang xiang cu) is considered the finest and carries a geographical indication protection. It is produced through a double fermentation process — first alcoholic fermentation, then acetic fermentation — followed by aging. In Shanxi province, a different tradition produces aged sorghum vinegar with comparable complexity. Black vinegar is used medicinally in Chinese tradition as well as culinarily.",
    origin_regions: ["Zhenjiang", "Jiangsu", "Shanxi", "China"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Vinegar (Cu) is well-established in TCM as a medicinal substance. It is considered sour and warm, associated with the Liver and Stomach meridians. It is used to move Blood, resolve stasis, stop pain, and detoxify. Vinegar is prescribed for abdominal pain, food poisoning, and as a preservative. Black vinegar in particular is considered warming and is given to new mothers in postpartum recovery (as in the Cantonese dish pigs' trotters in ginger and black vinegar).",
      "Traditional Postpartum Care": "Black vinegar is central to the traditional Chinese postpartum dish 'pig's trotters with ginger and black vinegar' — a preparation given to new mothers to restore warmth, expel cold, and support Blood recovery. The vinegar is believed to soften bones and aid mineral absorption while warming the uterus."
    },
    modern_scientific_research: "Black vinegar contains acetic acid, citric acid, and other organic acids along with amino acids, vitamins, and mineral compounds. Research on traditional Chinese vinegar suggests antioxidant properties, potential blood sugar-moderating effects similar to other vinegars, and antimicrobial activity. The amino acid profile of aged black vinegar is richer than standard distilled vinegar due to the grain-based fermentation.",
    culinary_uses: "Essential in dipping sauces for dumplings (especially crab and pork dumplings), hot and sour soup, cold noodle dishes, and braised preparations. Drizzle over fried rice and stir-fried greens for brightness. Use in marinades and sauces where you want depth and acidity without harshness. Combine with ginger for a classic dumpling dipping sauce.",
    preparation_methods: "Use straight from the bottle. Reduce gently to concentrate for glazes. Combine with soy sauce and ginger for dumpling dipping sauce. Splash into hot and sour soups at the end of cooking. Do not substitute white or rice vinegar — the flavor profiles are completely different.",
    traditional_dishes: ["Hot and sour soup", "Crab and pork soup dumplings (xiaolongbao)", "Pigs' trotters in ginger and black vinegar", "Cold noodles", "Braised pork"],
    tags: ["vinegar", "fermented", "chinese", "zhenjiang", "shanxi", "condiment", "pantry-staple", "postpartum"],
    published: true
  },
  {
    name: "Rice Vinegar",
    slug: "rice-vinegar",
    alternative_names: ["Rice Wine Vinegar", "Mi Cu", "White Rice Vinegar"],
    overview: "Rice vinegar is the mildest, most delicate of the Asian vinegars — a pale golden liquid with a clean, gently sour flavor and none of the sharpness of distilled white vinegar. Made from fermented rice wine, it is gentler and slightly sweeter than Western vinegars, which makes it ideal for dressings, pickles, dipping sauces, and dishes where acidic brightness is wanted without aggressiveness.",
    flavor_profile: ["mild", "clean", "slightly sweet", "gently sour", "delicate"],
    cultural_history: "Rice vinegar has been produced across China, Japan, and Korea for thousands of years wherever rice agriculture took hold. In Japan, rice vinegar (komezu) is essential to sushi rice preparation, where its precise balance of acidity and sweetness seasons the rice. In China, it is used more broadly as a general cooking vinegar. Korean rice vinegar (ssal-sikcho) has similar applications across Korean cuisine.",
    origin_regions: ["China", "Japan", "Korea", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Like all vinegars in TCM, rice vinegar is sour, bitter, and warm in nature. It is associated with the Liver and is said to move Blood, resolve stasis, and aid digestion. The milder, sweeter quality of rice vinegar makes it one of the gentler medicinal vinegars in Chinese tradition."
    },
    modern_scientific_research: "Rice vinegar contains acetic acid, organic acids produced during fermentation, and small amounts of amino acids. Research on vinegar in general suggests potential benefits for blood sugar management — acetic acid appears to improve insulin sensitivity and slow gastric emptying. Rice vinegar is lower in acetic acid concentration than apple cider or distilled vinegars, which may reduce these effects but also makes it gentler on digestion.",
    culinary_uses: "Use in sushi rice preparation, cucumber pickles, ponzu sauce, salad dressings, stir-fry sauces, and cold noodle dishes. Pair with soy sauce, ginger, and sesame oil for a versatile Asian dressing. Use seasoned rice vinegar (which contains added sugar and salt) as a convenient shortcut for sushi rice.",
    preparation_methods: "Use at room temperature. Season with sugar and salt when using for sushi rice. Combine with sugar and salt in hot water to make a quick pickling brine for cucumbers, daikon, or vegetables.",
    traditional_dishes: ["Sushi rice", "Sunomono (Japanese pickled cucumber)", "Agrodolce variations", "Sweet and sour sauce", "Korean cucumber salad"],
    tags: ["vinegar", "fermented", "chinese", "japanese", "korean", "sushi", "pickling", "pantry-staple"],
    published: true
  },
  {
    name: "Chili Oil",
    slug: "chili-oil",
    alternative_names: ["La You", "Hong You", "Chili Crisp Oil", "Sichuan Chili Oil"],
    overview: "Chinese chili oil is a deeply flavored, brick-red condiment made by infusing hot oil with dried chilies, Sichuan peppercorns, and aromatics. Unlike plain chili flakes or hot sauce, good chili oil has depth — layers of toasted spice, numbing heat, and a fragrance that transforms any dish it touches. It is one of the most widely used condiments in Chinese cuisine and the base of many Sichuan and Shanxi preparations.",
    flavor_profile: ["spicy", "numbing", "toasty", "aromatic", "deep red", "complex"],
    cultural_history: "Chili oil is intrinsic to Sichuan cooking, where it combines with Sichuan peppercorn to create the region's signature ma la (numbing-spicy) flavor profile. Chilies arrived in China via the Silk Road in the 16th century and were adopted with extraordinary enthusiasm by Sichuan and Hunan cooks. The combination of chili heat and Sichuan peppercorn numbing represents one of the most distinctive flavor innovations in culinary history.",
    origin_regions: ["Sichuan", "Shaanxi", "China"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Dried chilies (La Jiao) are considered hot and acrid in TCM, associated with the Heart and Spleen meridians. They are said to warm the interior, dispel cold, and activate circulation. Sichuan peppercorn (Hua Jiao), commonly paired in chili oil, warms the middle burner and is used for cold-damp conditions. The combined heat of the two is considered strongly warming and is used cautiously in people with excess heat constitutions."
    },
    modern_scientific_research: "Capsaicin, the active compound in chilies, has been extensively studied. It shows analgesic properties (used topically for pain relief), potential metabolism-boosting effects, and anti-inflammatory activity. Research suggests capsaicin may trigger the release of endorphins, which partly explains the pleasurable sensation of eating spicy food. Hydroxy-alpha-sanshool, the compound in Sichuan peppercorn responsible for numbing, has been shown to activate specific tactile receptors rather than pain receptors.",
    culinary_uses: "Drizzle over dumplings, noodles, and rice as a condiment. Use as a base for cold sesame noodles, mapo tofu sauce, and dan dan noodles. Stir into soups and congee. Use to dress vegetables. Mix with vinegar and soy sauce for a quick dipping sauce.",
    preparation_methods: "To make homemade chili oil: heat neutral oil to 200°C (400°F), add Sichuan peppercorn and aromatics, remove from heat, cool slightly, then pour over chili flakes and let steep. The temperature of the oil when it hits the chili flakes determines the color and depth — too hot burns, too cool doesn't bloom properly.",
    traditional_dishes: ["Dan dan noodles", "Mapo tofu", "Cold sesame noodles", "Wontons in chili oil", "Liangpi (cold skin noodles)"],
    tags: ["spicy", "condiment", "sichuan", "chinese", "chili", "fermented-adjacent", "pantry-staple", "numbing"],
    published: true
  },
  {
    name: "Chili Garlic Sauce",
    slug: "chili-garlic-sauce",
    alternative_names: ["Tuong Ot Toi", "Sambal Bawang Putih", "La Suan Jiang"],
    overview: "Chili garlic sauce is a rough-textured, bright-red condiment made from coarsely ground fresh red chilies and garlic. Vivid, sharp, and intensely aromatic, it sits somewhere between a fresh sauce and a condiment — it has the brightness of fresh chilies with enough preservation to live in the fridge for months. The most widely known version in the West is Huy Fong's chili garlic sauce, though similar preparations exist across Chinese, Vietnamese, and Southeast Asian cooking.",
    flavor_profile: ["fresh", "pungent", "bright", "spicy", "garlicky", "sharp"],
    cultural_history: "Chili garlic preparations are found across southern Chinese cuisine, Vietnam, Thailand, Malaysia, and Indonesia — wherever both chilies and garlic are central to cooking. The chunky, barely-processed style reflects a preference for texture and fresh heat over the smooth, cooked qualities of more processed chili sauces. The rise of Huy Fong Foods (founded by Vietnamese-Chinese immigrant David Tran) brought this style to global prominence through the restaurant trade.",
    origin_regions: ["Vietnam", "Southern China", "Southeast Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Garlic (Da Suan) is considered warm, acrid, and strongly detoxifying in TCM. It is associated with the Spleen, Stomach, and Lung meridians and is prescribed for food poisoning, intestinal parasites, and respiratory infections. Combined with chili's warming, circulation-activating properties, chili garlic sauce represents a strongly warming, detoxifying condiment."
    },
    modern_scientific_research: "Garlic is one of the best-researched culinary plants. Allicin, formed when raw garlic is crushed, shows significant antimicrobial, antiviral, and antifungal activity. Meta-analyses suggest regular garlic consumption is associated with modest reductions in blood pressure and LDL cholesterol. Capsaicin from chilies adds anti-inflammatory and metabolic effects. The raw preparation preserves more allicin than cooked garlic.",
    culinary_uses: "Use as a condiment for noodles, dumplings, rice porridge, and any dish that needs a boost of heat and garlic flavor. Stir into sauces, marinades, and dressings. Add to stir-fry sauces. Spread on toast as an aggressive condiment. Particularly well-suited as a table condiment for Vietnamese and Chinese noodle soups.",
    preparation_methods: "Keep refrigerated after opening. The sauce is already seasoned — taste before adding extra salt. Stir before use as the solids may settle. A spoonful into any sauce or dressing adds instant garlic-chili complexity.",
    traditional_dishes: ["Pho (condiment)", "Cantonese noodle soups", "Spring rolls", "Congee", "Fried rice"],
    tags: ["condiment", "spicy", "garlic", "vietnamese", "chinese", "southeast-asian", "pantry-staple", "fresh-style"],
    published: true
  },
  {
    name: "Doubanjiang",
    slug: "doubanjiang",
    alternative_names: ["Toban Djan", "Pixian Douban", "Spicy Bean Paste", "Broad Bean Chili Paste", "La Doubanjiang"],
    overview: "Doubanjiang is the 'soul of Sichuan cuisine' — a fermented paste of broad beans, chilies, salt, and wheat that is aged for months or years into a complex, deeply savory, intensely spicy condiment. The finest comes from Pixian county in Chengdu, where it is aged in outdoor vats and turned daily. There is no substitute for it in Sichuan cooking: it is the foundation of mapo tofu, twice-cooked pork, and countless other dishes.",
    flavor_profile: ["intensely savory", "spicy", "fermented", "deep umami", "complex", "salty"],
    cultural_history: "Doubanjiang production in Pixian dates to at least the 17th century, after chilies were introduced to Sichuan via the Silk Road. The combination of broad beans (a pre-existing fermented paste ingredient) with the newly arrived chili created a condiment of extraordinary depth. Pixian doubanjiang is now a protected geographical indication product. Premium versions aged three years or more (san nian chen) are considered Sichuan's equivalent of aged balsamic vinegar.",
    origin_regions: ["Pixian", "Chengdu", "Sichuan", "China"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "The fermented broad bean base of doubanjiang (Cang Dou) is considered cooling and beneficial to the Spleen and Stomach in TCM. The chili component adds warming properties, creating a balanced condiment that is neither purely heating nor cooling. Fermentation is understood to make foods more digestible and to support the Spleen's transforming and transporting functions."
    },
    modern_scientific_research: "Doubanjiang's double fermentation (broad beans and chili together) produces a complex array of amino acids, organic acids, and bioactive peptides. Research on similar fermented chili and bean pastes shows significant antioxidant activity, antimicrobial properties from the chili compounds, and beneficial changes to the food's amino acid profile during aging. The long fermentation produces glutamates naturally, contributing to its intense umami character.",
    culinary_uses: "Always stir-fry doubanjiang in hot oil first to bloom its flavor and reduce raw fermented edge — this step is non-negotiable in Sichuan cooking. Use as the flavor base for mapo tofu, twice-cooked pork, Sichuan eggplant, and spicy braises. Dissolve into broths for a numbing-spicy hot pot base. A small amount added to stir-fry sauces adds instant depth.",
    preparation_methods: "Heat oil in a wok until shimmering. Add doubanjiang and stir-fry over medium heat for 1–3 minutes until the oil turns deep red and the paste becomes fragrant. This blooming step is essential. Refrigerate after opening — it keeps for months.",
    traditional_dishes: ["Mapo tofu", "Twice-cooked pork (hui guo rou)", "Sichuan eggplant", "Dan dan noodles", "Water-boiled beef (shui zhu niu rou)"],
    tags: ["fermented", "spicy", "sichuan", "chinese", "paste", "chili", "bean", "pantry-staple", "umami"],
    published: true
  },
  {
    name: "Ground Bean Sauce",
    slug: "ground-bean-sauce",
    alternative_names: ["Mian Jiang", "Yellow Soybean Paste", "Huangdou Jiang", "Soybean Paste"],
    overview: "Ground bean sauce (mian jiang) is a thick, salty, deeply savory paste made from fermented yellow soybeans and wheat flour. Less spicy than doubanjiang and less sweet than hoisin, it occupies a middle ground as a general-purpose fermented soybean paste used across northern and central Chinese cooking. It is the base for the classic noodle dish zha jiang mian and adds depth to stir-fries and braises wherever a fermented, umami-rich paste is needed.",
    flavor_profile: ["salty", "savory", "fermented", "earthy", "umami", "robust"],
    cultural_history: "Fermented soybean pastes are among the oldest condiments in Chinese cooking, predating the development of soy sauce. Ground bean sauce represents the tradition of soybean fermentation as practiced in Beijing and northern China, where it forms the basis of dishes eaten since at least the Song Dynasty. The northern Chinese tradition of pairing fermented bean paste with pork and fresh vegetables over noodles — zha jiang mian — is one of China's most beloved comfort foods.",
    origin_regions: ["Beijing", "Northern China", "China"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Fermented soybeans and soybean pastes are understood in TCM as supporting the Spleen and Stomach's digestive functions. The fermentation process is considered to make soy more digestible and to produce warming, nourishing qualities. Soybean paste is used in TCM culinary medicine for its fortifying, umami-rich properties."
    },
    modern_scientific_research: "Like other fermented soybean products, ground bean sauce contains isoflavones, bioactive peptides, and free amino acids produced during fermentation. Research on miso and other soybean pastes (functionally similar products) suggests beneficial effects on gut microbiome diversity, antioxidant activity, and potential cardiovascular benefits. The wheat component contributes additional Maillard reaction products during fermentation and processing.",
    culinary_uses: "The essential ingredient in zha jiang mian (Beijing-style sauce for noodles). Use in stir-fries with pork, eggplant, and green beans. Add to marinades for lamb and duck. Combine with sesame paste for noodle dressings. Use as a cooking paste wherever you want fermented soy depth without chili heat.",
    preparation_methods: "Always cook the paste in oil before adding other ingredients — like doubanjiang, this blooms the flavor. Dilute with water or stock if the paste is very thick. Taste before adding more salt, as the paste is already well-seasoned.",
    traditional_dishes: ["Zha jiang mian", "Beijing duck (as a dipping sauce)", "Stir-fried pork with eggplant", "Braised pork belly", "Ants on a tree"],
    tags: ["fermented", "paste", "soybean", "chinese", "northern-chinese", "beijing", "umami", "pantry-staple"],
    published: true
  },
  {
    name: "Sweet Bean Sauce",
    slug: "sweet-bean-sauce",
    alternative_names: ["Tian Mian Jiang", "Sweet Flour Paste", "Sweet Wheat Paste", "Beijing Sauce"],
    overview: "Sweet bean sauce (tian mian jiang, meaning 'sweet wheat sauce') is a thick, dark, glossy paste made from fermented wheat flour and salt with a characteristic sweetness. Richer and sweeter than ground bean sauce, it is the authentic sauce served with Peking duck and mu shu pork, and one of the most distinctive condiments of northern Chinese cuisine. Its sweetness comes not from added sugar but from the natural sugars produced during the fermentation of wheat starch.",
    flavor_profile: ["sweet", "rich", "savory", "thick", "slightly fermented", "mellow"],
    cultural_history: "Sweet bean sauce is deeply tied to the imperial food culture of Beijing. Its use in Peking duck — brushed onto thin pancakes along with scallions and cucumber — is one of the most recognizable food rituals in Chinese cuisine. The sauce was a standard pantry ingredient in traditional Beijing households and features prominently in older Chinese cookbooks as a base condiment for savory dishes.",
    origin_regions: ["Beijing", "Northern China", "China"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "The wheat base of sweet bean sauce is considered slightly cooling and nourishing to the Heart in TCM. The fermented nature and sweetness make it digestive and harmonizing. It is considered appropriate for most constitutions and used in culinary medicine for its mild, centering qualities."
    },
    modern_scientific_research: "Sweet bean sauce, like ground bean sauce and other fermented wheat and soy products, contains organic acids, free amino acids, and Maillard reaction products from its fermentation and processing. Research on similar fermented grain products suggests antioxidant properties and benefits for digestive health from prebiotic compounds produced during fermentation.",
    culinary_uses: "Use as the sauce for Peking duck pancakes — brush onto the pancake, top with duck, cucumber, and scallion. Use in mu shu pork. Dilute with stock for a dipping sauce. Add to stir-fries for sweetness and body. Combine with sesame oil and a little water for a sauce for cold noodles. Stir-fry briefly in oil to develop flavor before adding other ingredients.",
    preparation_methods: "For Peking duck service: heat in a small pan with a little oil, sesame oil, and sugar until fragrant and slightly thinned. Thin with warm water for a brushable consistency. Can be used cold as a spread or condiment.",
    traditional_dishes: ["Peking duck (Běijīng kǎoyā)", "Mu shu pork", "Zha jiang mian (sweet version)", "Beijing lamb skewers (as marinade)", "Jing jiang rou si (shredded pork in sweet bean sauce)"],
    tags: ["fermented", "sweet", "paste", "chinese", "beijing", "northern-chinese", "peking-duck", "condiment"],
    published: true
  },
  {
    name: "Yellow Lantern Chili Sauce",
    slug: "yellow-lantern-chili-sauce",
    alternative_names: ["Huang Deng Long La Jiao Jiang", "Hainan Yellow Pepper Sauce", "Yi Deng Feng Yellow Lantern Sauce"],
    overview: "Yellow lantern chili sauce is a specialty condiment from Hainan island made from the Huang Deng Long (yellow lantern) chili — one of China's most intensely hot peppers — combined with mango, garlic, and vinegar. Its vivid yellow-orange color and distinctly fruity, tropical heat set it apart from all other Chinese chili sauces. It is fiercely spicy, intensely aromatic, and completely unlike any mainland Chinese condiment.",
    flavor_profile: ["intensely hot", "fruity", "tropical", "pungent", "bright", "complex"],
    cultural_history: "The yellow lantern chili (Huang Deng Long Jiao) is a distinctive cultivar grown primarily in Hainan, classified among the hottest peppers in China and comparable to habanero in heat level. Hainan's geographic isolation as an island led to a culinary culture quite distinct from mainland China, with stronger influences from local Li and Miao ethnic traditions. Yellow lantern chili sauce is the defining condiment of Hainanese cooking and a point of fierce local pride.",
    origin_regions: ["Hainan", "China"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "The yellow lantern chili is classified as extremely hot and acrid in TCM — among the most strongly warming foods in the tradition. Used in small quantities, it strongly activates circulation, warms the interior, and expels cold-damp. Its intensity means it is used cautiously in people with heat constitutions or inflammatory conditions."
    },
    modern_scientific_research: "Yellow lantern chilies contain very high concentrations of capsaicin and capsaicinoid compounds. Research on high-capsaicin peppers shows potent analgesic, anti-inflammatory, and antimicrobial activity. Studies on extreme-heat peppers suggest capsaicin may have cancer-preventive properties in vitro, though the mechanisms are not fully understood. The fruity mango base adds vitamins A and C and natural antioxidants.",
    culinary_uses: "Use sparingly — this is an extremely hot condiment. A small amount goes a long way. Add to seafood dishes, particularly crab, fish, and shrimp. Use as a table condiment for rice and noodle dishes in Hainanese cooking. Mix a tiny amount into dipping sauces for dumplings and spring rolls. Pairs particularly well with pork and seafood.",
    preparation_methods: "Refrigerate after opening. Use with a small spoon — a little bit is genuinely a lot. Taste carefully before using. Do not touch eyes or face after handling.",
    traditional_dishes: ["Hainanese crab with yellow lantern sauce", "Hainanese noodle soup", "Grilled seafood condiment", "Hainan-style pork dishes"],
    tags: ["spicy", "hot", "condiment", "hainan", "chinese", "fruity", "chili", "tropical"],
    published: true
  },
  {
    name: "Lao Gan Ma Chili Sauce",
    slug: "lao-gan-ma-chili-sauce",
    alternative_names: ["Old Godmother", "Lao Gan Ma", "Crispy Chili Oil", "Tao Huabi's Sauce"],
    overview: "Lao Gan Ma is China's most famous chili sauce — a jar of crunchy, oily, deeply savory fermented black bean and chili crisp that has achieved something close to cult status both in China and internationally. Founded by Tao Huabi in Guizhou in 1997, the brand has become synonymous with a particular style of chili crisp: textured with crispy bits of chili, fermented black bean, and aromatics suspended in flavorful oil. There are several varieties; the black bean version is the classic.",
    flavor_profile: ["savory", "spicy", "crunchy", "umami", "fermented", "complex", "oily"],
    cultural_history: "Tao Huabi, known as 'the old godmother' (lao gan ma), began selling chili sauce from her roadside restaurant in Guizhou in the 1980s before founding the company. Guizhou cuisine, less known internationally than Sichuan but equally complex, has a deep tradition of fermented and preserved chili preparations. Lao Gan Ma captured a specific style of chili crisp — textured, oil-rich, deeply fermented — and made it available at mass scale. The brand is now one of the most recognized Chinese food brands globally.",
    origin_regions: ["Guizhou", "China"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "The fermented black bean component (Dou Chi) is well-established in TCM as a medicinal food that dispels exterior conditions, clears irritability from the Heart, and harmonizes the Stomach. Combined with the warming chili and garlic, Lao Gan Ma represents a warming, moving, digestively supportive condiment."
    },
    modern_scientific_research: "The fermented black beans in Lao Gan Ma contain nattokinase-related enzymes and isoflavones associated with cardiovascular health in research on similar fermented soy products. Capsaicin from the chili shows the well-documented effects of anti-inflammation and potential metabolic benefits. The combination of fermented soy, chili, and garlic creates a condiment rich in bioactive compounds from multiple fermentation pathways.",
    culinary_uses: "Use as a condiment for virtually anything — rice, noodles, dumplings, congee, eggs, toast. Stir into instant noodles. Use as a cooking ingredient: fry briefly in oil then add vegetables or protein. Mix into mayonnaise or sour cream for a quick dip. Add to marinades. A spoonful into any soup or sauce adds immediate depth.",
    preparation_methods: "Use straight from the jar — spoon out both the solids and the oil together for full flavor. Stir well before serving as the oil and solids separate. Keep refrigerated after opening for longer shelf life.",
    traditional_dishes: ["Guizhou-style noodles (Huajiang dog meat noodles historically, now broadly used)", "Rice and condiment (bai fan)", "Stir-fried eggs", "Instant noodles", "Fried rice"],
    tags: ["condiment", "fermented", "spicy", "guizhou", "chinese", "black-bean", "chili-crisp", "pantry-staple"],
    published: true
  },
  {
    name: "Chinese Sesame Paste",
    slug: "chinese-sesame-paste",
    alternative_names: ["Zhi Ma Jiang", "Chinese Tahini", "Roasted Sesame Paste"],
    overview: "Chinese sesame paste is a thick, intensely flavored paste ground from roasted sesame seeds — similar in concept to Middle Eastern tahini but distinctly different in flavor due to the degree of roasting. Where tahini is made from raw or lightly toasted sesame, Chinese sesame paste uses deeply roasted seeds that produce a rich, dark, almost peanut-buttery paste with a pronounced toasty, bitter-edged depth. The two are not interchangeable.",
    flavor_profile: ["deeply nutty", "toasty", "rich", "slightly bitter", "dense", "aromatic"],
    cultural_history: "Sesame paste has been used in Chinese cooking for centuries, appearing in cold noodle preparations, dipping sauces, and sweet desserts. The technique of deep-roasting before grinding is characteristic of Chinese and Japanese sesame paste traditions, while the lighter roast of Middle Eastern tahini reflects a different culinary preference. In Beijing, sesame paste thinned with sesame oil and seasoned with vinegar and soy sauce is the classic sauce for cold sesame noodles. In Sichuan, it appears in dan dan noodles alongside chili oil.",
    origin_regions: ["China", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Sesame (Zhi Ma) is classified as neutral to slightly warm in TCM, associated with the Liver, Kidney, and Large Intestine meridians. It is considered nourishing to Blood, tonifying to the Liver and Kidneys, and moistening to dryness. Sesame paste retains these properties in a concentrated, highly bioavailable form. It is prescribed in TCM culinary medicine for people with Yin deficiency, Blood deficiency, and intestinal dryness."
    },
    modern_scientific_research: "Chinese sesame paste is rich in lignans (sesamin and sesamolin), calcium, zinc, iron, and B vitamins. Research on sesame lignans shows significant antioxidant activity and potential cardiovascular benefits. The deep roasting increases certain antioxidant compounds through Maillard reactions while reducing others — the nutritional tradeoffs of roasting are nuanced. Sesame is one of the more complete plant sources of amino acids.",
    culinary_uses: "Thin with sesame oil, soy sauce, vinegar, and chili oil for cold noodle sauce. Use in hot pot dipping sauces. Add to salad dressings and cold vegetable preparations. Use in sweet preparations: sesame balls (tang yuan), sesame biscuits, and pastry fillings. Pairs with ginger, garlic, black vinegar, and chili oil.",
    preparation_methods: "Thin with warm water or sesame oil before using — the paste is very thick and needs to be loosened to a pourable consistency for most applications. Stir well before using as oil separates to the top. Store in the refrigerator after opening.",
    traditional_dishes: ["Dan dan noodles", "Cold sesame noodles (ma jiang mian)", "Hot pot dipping sauce", "Sesame-dressed spinach", "Tang yuan filling"],
    tags: ["paste", "sesame", "chinese", "nutty", "toasty", "noodles", "pantry-staple"],
    published: true
  },
  {
    name: "Baijiu",
    slug: "baijiu",
    alternative_names: ["Bai Jiu", "Chinese Liquor", "Maotai", "Er Guo Tou", "Chinese White Spirits"],
    overview: "Baijiu is China's national spirit — a clear, potent distilled grain liquor produced through a process unlike any Western spirits tradition. Made from fermented sorghum (or sometimes wheat, rice, or maize) using a solid-state fermentation with a starter called qu, baijiu ranges from 40% to 65% alcohol by volume and encompasses an enormous range of styles and flavor profiles. It is the most consumed spirit by volume in the world, yet one of the least understood outside China.",
    flavor_profile: ["fiery", "complex", "funky", "savory", "ester-rich", "grain-forward", "lingering"],
    cultural_history: "Baijiu has been produced in China for at least eight hundred years, with the technology of distillation arriving from the Islamic world via the Silk Road. Different regional styles developed based on local grains, water, and qu fermentation cultures. Moutai (Maotai) from Guizhou became the prestige baijiu after being declared the national banquet spirit in the early People's Republic period — it is served at state dinners and is one of the world's most valuable spirit brands. The four major flavor categories — sauce (jiang xiang), strong (nong xiang), light (qing xiang), and rice (mi xiang) — represent distinct regional traditions with hundreds of years of development.",
    origin_regions: ["Guizhou", "Sichuan", "Shanxi", "China"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Distilled spirits (lie jiu) are used in TCM as a medium for herbal preparations (yao jiu, or medicinal wine/liquor). High-proof spirits are used to extract and preserve the medicinal compounds of herbs. Baijiu is considered extremely warming and acrid. Medicinally, it is used in small amounts to warm the meridians, expel cold, and activate Blood circulation. Traditional medicinal baijiu preparations (like the snake wines and herbal-infused spirits seen in rural China) represent a specific pharmacological application, not general drinking."
    },
    modern_scientific_research: "Moderate alcohol consumption research is highly contested, and Chinese-language studies on baijiu specifically show mixed results. Baijiu contains a uniquely complex array of trace compounds — esters, organic acids, terpenes, and polyphenols — that arise from the solid-state qu fermentation process. Some researchers have investigated these compounds for potential bioactive properties, though research is preliminary. The health effects of moderate versus heavy consumption follow the general patterns documented in alcohol research globally.",
    culinary_uses: "Baijiu is primarily drunk as a beverage at formal meals, where toasting (gan bei) is a central social ritual. As a cooking ingredient, it can substitute for Shaoxing wine in dishes where a stronger, drier note is desired. It is used in some marinades for game and offal, where its intensity works to mask strong flavors. Baijiu-cured meats and baijiu-infused desserts represent a growing area of creative Chinese cooking.",
    preparation_methods: "Serve at room temperature in small cups (about 30–50ml per pour). The traditional serving is 'dry cup' (gan bei), meaning the cup is drained completely. Pair with oily, heavily seasoned food — the high alcohol cuts through richness effectively.",
    traditional_dishes: ["Drunken shrimp (prepared tableside)", "Baijiu-cured sausage (la chang)", "Flame-finish banquet dishes", "Medicinal spirit infusions"],
    tags: ["spirits", "alcohol", "chinese", "grain", "fermented", "guizhou", "sichuan", "shanxi", "banquet", "traditional"],
    published: true
  }
]

async function seed() {
  console.log(`Seeding ${ingredients.length} Chinese pantry ingredients...\n`)
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
