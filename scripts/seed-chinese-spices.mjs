import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

// Note: black-pepper and cloves already exist and are not re-seeded here.

const ingredients = [
  {
    name: "Five-Spice Powder",
    slug: "five-spice-powder",
    alternative_names: ["Wu Xiang Fen", "Chinese Five Spice", "Five Fragrance Powder"],
    overview: "Five-spice powder is one of the defining spice blends of Chinese cooking — a fragrant, complex mixture of star anise, cloves, cassia cinnamon, Sichuan peppercorn, and fennel seeds. It captures the five fundamental flavors of Chinese cuisine (sweet, sour, bitter, salty, and pungent) in a single blend and corresponds to the five elements of Chinese philosophy. The aroma is warm, sweet, and slightly numbing, with a depth that transforms roasted meats, braises, and baked goods.",
    flavor_profile: ["warm", "sweet", "anise-forward", "complex", "slightly numbing", "fragrant"],
    cultural_history: "Five-spice powder reflects a distinctly Chinese approach to spice blending — one rooted not just in flavor but in cosmological philosophy. The five flavors and five elements (wood, fire, earth, metal, water) are fundamental to Chinese medical and culinary theory, and the blend embodies the principle of balance. Regional variations exist: some versions include white pepper or ginger, and Cantonese five-spice tends to be more delicate than northern versions. The blend has been used in Chinese cooking for centuries and is the seasoning that makes Cantonese roast duck, char siu, and red-braised pork instantly recognizable.",
    origin_regions: ["China", "Cantonese cuisine", "Chinese cuisine broadly"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Five-spice powder is understood in TCM as a warming, aromatic blend that activates Qi and Blood circulation, strengthens the Spleen and Stomach, and dispels cold-damp. Each component contributes specific medicinal properties: star anise warms the Kidney and Liver, Sichuan peppercorn warms the middle burner, cinnamon warms Yang and invigorates Blood, fennel regulates Qi, and cloves warm the Kidney. As a combined formula, the blend is considered strongly warming and carminative."
    },
    modern_scientific_research: "Each component of five-spice powder has been individually studied for bioactive compounds. Anethole (from star anise and fennel) shows antimicrobial and anti-inflammatory properties. Cinnamaldehyde from cassia shows insulin-sensitizing effects and antimicrobial activity. Hydroxy-alpha-sanshool from Sichuan peppercorn activates specific mechanoreceptors, creating the characteristic numbing sensation. Eugenol from cloves is a potent antioxidant and antimicrobial. As a blend, five-spice represents a concentrated source of diverse bioactive polyphenols.",
    culinary_uses: "Use in marinades for duck, pork, and beef. Essential in char siu pork, Cantonese roast duck, red-braised pork, and lu wei (master stock) preparations. Rub onto meats before roasting. Add a small amount to stir-fry sauces and noodle broths. Use sparingly — it is potent. Works unexpectedly well in baked goods: shortbread, spice cookies, and chocolate desserts.",
    preparation_methods: "Buy in small quantities and store in an airtight container away from light — five-spice loses potency quickly once ground. For best flavor, make your own: toast whole spices individually, then grind together. Use no more than half a teaspoon in most dishes; the blend is strong.",
    traditional_dishes: ["Char siu pork", "Cantonese roast duck", "Red-braised pork (hong shao rou)", "Lu wei (master stock)", "Five-spice tofu"],
    tags: ["spice-blend", "chinese", "cantonese", "aromatic", "warming", "five-elements", "pantry-staple"],
    published: true
  },
  {
    name: "Star Anise",
    slug: "star-anise",
    alternative_names: ["Ba Jiao", "Chinese Star Anise", "Illicium verum", "Eight Corners"],
    overview: "Star anise is a star-shaped spice from a small evergreen tree native to southern China and northern Vietnam. Its bold, sweet, licorice-like aroma comes from anethole — the same compound that gives anise seed and fennel their characteristic flavor, though star anise is more potent and more complex than either. It is one of the fundamental spices of Chinese cooking and a key component of five-spice powder.",
    flavor_profile: ["sweet", "licorice", "warm", "bold", "slightly spicy", "anise-forward"],
    cultural_history: "Star anise (ba jiao, meaning 'eight corners') has been used in Chinese cooking and medicine for over three thousand years. It is native to a small region of southern China and northern Vietnam and was unknown in the West until trade routes opened in the 17th century. It became essential to French and Spanish liqueur production (anisette, pastis) and was a key ingredient in the global production of Tamiflu (oseltamivir) in the early 2000s, when shikimic acid extracted from star anise was the primary precursor. In Chinese cooking, it is used whole in braises, red-cooked dishes, and master stocks.",
    origin_regions: ["Southern China", "Northern Vietnam", "Guangxi", "Yunnan"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Star anise (Ba Jiao Hui Xiang) is classified as warm and acrid in TCM, associated with the Kidney, Liver, and Spleen meridians. It is used to warm the Kidney Yang, regulate Qi, and relieve pain. It is prescribed for cold-type abdominal pain, hernia, and digestive complaints caused by cold patterns. As a carminative, it relieves gas, bloating, and nausea."
    },
    modern_scientific_research: "Anethole, the primary bioactive compound in star anise, shows antimicrobial, antifungal, and anti-inflammatory properties in research. Star anise is rich in shikimic acid, the precursor to the antiviral drug oseltamivir (Tamiflu), though therapeutic doses are far beyond culinary use. Research also suggests antioxidant activity and potential antispasmodic effects relevant to its traditional digestive use.",
    culinary_uses: "Add whole pods to braises, red-cooked meats, and master stocks. Essential in pho broth, where it contributes the characteristic warm sweetness. Use in spiced poaching liquids for chicken and eggs. Add to mulled wine and spiced desserts. Remove before serving — the texture is unpleasant to eat whole.",
    preparation_methods: "Use whole in long-cooked dishes and remove before serving. Lightly toast in a dry pan before adding to a dish to deepen flavor. For five-spice powder, grind after toasting. Store in an airtight container — star anise retains flavor well when kept whole.",
    traditional_dishes: ["Red-braised pork (hong shao rou)", "Vietnamese pho broth", "Master stock (lu shui)", "Soy sauce eggs", "Spiced duck"],
    tags: ["spice", "chinese", "vietnamese", "warming", "anise", "braising", "five-spice", "pantry-staple"],
    published: true
  },
  {
    name: "Cassia Cinnamon",
    slug: "cassia-cinnamon",
    alternative_names: ["Rou Gui", "Chinese Cinnamon", "Cinnamomum cassia", "Chinese Cassia", "Gui Pi"],
    overview: "Cassia cinnamon is the cinnamon of Chinese cooking — thicker, harder, and more assertively flavored than the Ceylon cinnamon common in Western baking. Its bark is used in braises, master stocks, and five-spice powder, contributing a deep, resinous warmth that Ceylon cinnamon cannot replicate. The two are botanically related but functionally distinct: cassia is bolder, spicier, and more savory in application.",
    flavor_profile: ["bold", "warm", "spicy", "resinous", "slightly bitter", "deeply sweet"],
    cultural_history: "Cassia has been used in Chinese cooking and medicine for over four thousand years, appearing in the earliest Chinese medical texts as a warming, Yang-tonifying herb. It is one of the fifty fundamental herbs in traditional Chinese medicine. In cooking, cassia bark (as opposed to ground cassia) is used whole in slow braises and master stocks, where it contributes warmth and complexity to the cooking liquid without overpowering. Most of the 'cinnamon' sold in the United States is actually cassia, though for Chinese culinary purposes, the bark form is essential.",
    origin_regions: ["Southern China", "Vietnam", "Guangdong", "Guangxi"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Cassia (Rou Gui) is one of TCM's most important warming herbs, classified as hot, acrid, and sweet. It is associated with the Heart, Liver, Kidney, and Spleen meridians. It is used to tonify Kidney Yang and Ming Men fire, warm the middle burner, dispel cold and dampness, and invigorate Blood. It is prescribed for cold limbs, low libido, frequent urination, and abdominal pain caused by cold patterns. In herbal formulas, it is often combined with prepared aconite (Fu Zi) for severe Yang deficiency."
    },
    modern_scientific_research: "Cinnamaldehyde, the primary bioactive compound in cassia, has been studied for insulin-sensitizing effects — multiple clinical trials show modest reductions in fasting blood sugar in people with type 2 diabetes, though results are mixed. Cassia contains higher levels of coumarin than Ceylon cinnamon, which in large doses may affect the liver; culinary use presents minimal risk. Research also shows antimicrobial, antioxidant, and anti-inflammatory properties.",
    culinary_uses: "Add bark pieces to braises, master stocks, red-cooked dishes, and spiced poaching liquids. Essential in five-spice powder. Use in spiced desserts and baked goods where bold cinnamon flavor is wanted. Pair with star anise, cloves, and Sichuan peppercorn in braising liquids for pork and beef.",
    preparation_methods: "Use the bark in pieces for long-cooked dishes and remove before serving. Lightly toast before adding to release aroma. For spice blends, grind after toasting. Do not substitute Ceylon cinnamon in Chinese recipes — the flavor and intensity are different.",
    traditional_dishes: ["Red-braised pork (hong shao rou)", "Master stock (lu shui)", "Spiced beef shank", "Five-spice preparations", "Braised lamb"],
    tags: ["spice", "chinese", "warming", "braising", "five-spice", "tcm", "bark", "pantry-staple"],
    published: true
  },
  {
    name: "Sichuan Peppercorn",
    slug: "sichuan-peppercorn",
    alternative_names: ["Hua Jiao", "Chinese Prickly Ash", "Zanthoxylum bungeanum", "Flower Pepper", "Ma Jiao"],
    overview: "Sichuan peppercorn is not a true pepper at all — it is the dried berry husk of the prickly ash tree, and its defining quality is the electric numbing sensation it creates on the tongue and lips. This sensation, caused by the compound hydroxy-alpha-sanshool, is unlike anything else in the spice world. Combined with chili heat, it produces the ma la (numbing-spicy) flavor that defines Sichuan cuisine — one of the most distinctive and sought-after flavor experiences in world cooking.",
    flavor_profile: ["numbing", "citrusy", "floral", "aromatic", "warm", "electric"],
    cultural_history: "Sichuan peppercorn has been cultivated and used in the Sichuan region of China for over two thousand years. It was the primary source of heat in Chinese cooking before chilies arrived from the Americas in the 16th century. When chilies arrived in Sichuan, they were combined with the native peppercorn to create the ma la flavor profile — an innovation that produced one of the world's great regional cuisines. Sichuan peppercorn was banned from import into the United States from 1968 to 2005 due to concerns about citrus canker (it has since been cleared). The ban contributed to a generation of Chinese-American restaurants developing without it.",
    origin_regions: ["Sichuan", "China", "Himalayan foothills"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Sichuan peppercorn (Hua Jiao) is classified as hot, acrid, and toxic in small amounts in TCM. It is associated with the Spleen, Stomach, and Kidney meridians. It is used to warm the middle burner, dispel cold-damp, kill parasites, and relieve pain. It is prescribed for abdominal cold pain, vomiting from cold patterns, diarrhea, and roundworm infections. Externally it is used for skin conditions and as an analgesic."
    },
    modern_scientific_research: "Hydroxy-alpha-sanshool, Sichuan peppercorn's primary bioactive compound, activates specific low-threshold mechanoreceptors (touch receptors) rather than pain receptors — which explains why the numbing sensation feels different from chili heat. Research suggests sanshool compounds have analgesic, anti-inflammatory, and antifungal properties. Studies also show antimicrobial activity against a range of food pathogens, which may explain its traditional role in food preservation.",
    culinary_uses: "Toast whole in a dry pan until fragrant, then grind for use in mapo tofu, dan dan noodles, and Sichuan cold dishes. Add whole to braising liquids and master stocks. Use ground in dry spice rubs for grilled meats. Combine with dried chilies for the essential ma la flavor base. Use the oil infused with Sichuan peppercorn as a finishing condiment.",
    preparation_methods: "Always toast before using — raw Sichuan peppercorn has less flavor and more bitterness. Toast in a dry pan over medium heat for 2–3 minutes until fragrant. Grind in a spice grinder and sift out the small black seeds, which are bitter. Use freshly ground for best effect.",
    traditional_dishes: ["Mapo tofu", "Dan dan noodles", "Kung pao chicken", "Sichuan hot pot", "Bang bang chicken"],
    tags: ["spice", "sichuan", "chinese", "numbing", "ma-la", "warming", "aromatic", "pantry-staple"],
    published: true
  },
  {
    name: "Fennel Seeds",
    slug: "fennel-seeds",
    alternative_names: ["Xiao Hui Xiang", "Chinese Fennel", "Foeniculum vulgare", "Small Fennel"],
    overview: "Fennel seeds used in Chinese cooking are the same species as Western fennel (Foeniculum vulgare), but the culinary application is entirely different. In China, fennel seeds (xiao hui xiang, meaning 'small fennel') are used primarily as a warm spice in braises, master stocks, and five-spice powder, rather than as a vegetable or fresh herb. Their sweet, anise-like flavor is milder than star anise and provides a gentler background note that rounds out spice blends without dominating.",
    flavor_profile: ["sweet", "anise-like", "warm", "mild", "herbaceous", "clean"],
    cultural_history: "Fennel has been cultivated in China for over a thousand years, arriving along ancient trade routes from the Mediterranean. In Chinese culinary tradition it is used almost exclusively as a dried seed spice rather than a fresh vegetable — the reverse of its use in Italian and French cooking. In TCM, fennel seed (Xiao Hui Xiang) is one of the most commonly prescribed digestive herbs. It is paired with other warm spices in the five-spice blend and used in braising liquids for pork and lamb across northern and Sichuan cooking.",
    origin_regions: ["Mediterranean (origin)", "China", "Sichuan", "Northern China"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Fennel seed (Xiao Hui Xiang) is classified as warm and acrid in TCM, associated with the Liver, Kidney, Spleen, and Stomach meridians. It is one of the primary herbs used to warm the Kidney, regulate Qi, and relieve pain. It is commonly prescribed for cold-type hernia, abdominal pain, dysmenorrhea, and digestive complaints including bloating, gas, and nausea from cold patterns. It is often combined with ginger and cinnamon for menstrual pain."
    },
    modern_scientific_research: "Anethole, the primary aromatic compound in fennel seeds, shows antimicrobial, antifungal, and anti-inflammatory properties in research. Studies support fennel's traditional use as a carminative — it reduces intestinal spasms and gas production. Research also shows potential estrogenic activity from anethole at high doses, relevant to its traditional use in women's health. Fennel seeds are a good source of dietary fiber, manganese, and antioxidants.",
    culinary_uses: "Add to braising liquids for pork, lamb, and duck. Use in five-spice powder and spice blends. Toast and grind for use in spice rubs. Add whole to master stock preparations. Pair naturally with star anise, cassia, and Sichuan peppercorn. In northern Chinese cooking, combine with lamb for dumplings and stir-fries.",
    preparation_methods: "Toast briefly in a dry pan before using to deepen flavor. Use whole in long-cooked dishes and remove before serving, or grind for spice blends. Store whole seeds in an airtight container — they retain flavor much longer than ground.",
    traditional_dishes: ["Five-spice preparations", "Braised pork hock", "Lamb dumplings (northern Chinese)", "Master stock", "Sichuan cold cuts"],
    tags: ["spice", "chinese", "sichuan", "northern-chinese", "warming", "digestive", "five-spice", "tcm"],
    published: true
  },
  {
    name: "White Pepper",
    slug: "white-pepper",
    alternative_names: ["Bai Hu Jiao", "White Peppercorn", "Piper nigrum (white processed)"],
    overview: "White pepper is black pepper with the outer hull removed, revealing the inner seed. It has a sharper, more purely hot flavor than black pepper — less aromatic but more penetrating, with a slightly fermented, earthy quality from the soaking process used to remove the hull. In Chinese cooking, white pepper is often preferred over black: its heat is cleaner and less herbal, and it does not create visible black flecks in pale soups and egg dishes.",
    flavor_profile: ["sharp", "hot", "clean", "slightly earthy", "pungent", "direct"],
    cultural_history: "White pepper has been used in Chinese cooking for centuries and is deeply embedded in specific regional preparations. The classic Cantonese pepper and salt seasoning uses white pepper. Hot and sour soup depends on white pepper for its characteristic heat. In Teochew, Hokkien, and Singaporean Chinese cooking, white pepper is so central that black pepper is rarely used at all. The most prized white pepper for Chinese cooking comes from Sarawak in Malaysian Borneo, though domestic Chinese production is also significant.",
    origin_regions: ["South India (origin)", "Sarawak, Malaysia", "Southern China", "Southeast Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "White pepper (Bai Hu Jiao) shares the TCM classification of black pepper — hot, acrid, and warming to the Stomach and large Intestine. It is used to dispel cold, warm the middle burner, and descend rebellious Qi. White pepper is considered slightly more penetrating than black pepper in some TCM traditions, making it appropriate for conditions of interior cold with more severe digestive symptoms."
    },
    modern_scientific_research: "White pepper contains piperine, the same bioavailability-enhancing compound found in black pepper. Research on piperine consistently shows its ability to inhibit the metabolic breakdown of various compounds, increasing their bioavailability. Like black pepper, white pepper shows antioxidant and anti-inflammatory properties. The processing to produce white pepper reduces some aromatic compounds while retaining the active piperine.",
    culinary_uses: "Use in soups, particularly where visible black flecks would be undesirable: hot and sour soup, egg drop soup, white-cooked chicken broth, congee, and fish preparations. Essential in Cantonese pepper salt seasoning for fried seafood and tofu. Use in dumpling fillings for clean heat without aromatic distraction. Sprinkle over congee just before eating.",
    preparation_methods: "Grind fresh from whole peppercorns for best flavor. White pepper loses its heat quickly once ground — buy whole and grind as needed. The flavor is most potent when added at the end of cooking rather than the beginning.",
    traditional_dishes: ["Hot and sour soup", "Cantonese pepper salt prawns", "Congee", "Wonton soup", "Hainanese chicken rice"],
    tags: ["spice", "chinese", "cantonese", "pepper", "warming", "pantry-staple", "heat"],
    published: true
  },
  {
    name: "Dried Chilies",
    slug: "dried-chilies",
    alternative_names: ["Gan La Jiao", "Dried Red Chilies", "Chinese Dried Chilies", "Er Jing Tiao (dried)", "Facing Heaven Chili"],
    overview: "Dried chilies are a pantry essential in Chinese cooking — whole dried red chilies that are toasted, rehydrated, or infused in oil to contribute heat, color, and a deep, earthy spice character. Unlike fresh chilies, dried chilies have a concentrated, slightly smoky flavor and less moisture, making them ideal for stir-fries, braising oils, and infused chili preparations. Varieties range from mild Erjing tiao (the elongated chili used for color and moderate heat) to the intensely hot Facing Heaven chili (chao tian jiao) that points upward on the plant.",
    flavor_profile: ["spicy", "earthy", "slightly smoky", "warm", "deep red", "concentrated"],
    cultural_history: "Chilies arrived in China via the Silk Road in the 16th century and transformed the cooking of Sichuan, Hunan, Guizhou, and Yunnan with remarkable speed. Within a century of their arrival, these regions had built entire cuisines around chili heat — a culinary revolution with few parallels in food history. Different regions cultivated different varieties for different culinary purposes: Erjing tiao in Sichuan for color and moderate heat in doubanjiang, Facing Heaven chilies for intense heat, and various varieties across Hunan for fresh and dried preparations.",
    origin_regions: ["Americas (origin)", "Sichuan", "Hunan", "China broadly"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Dried chilies (Gan La Jiao) are classified as hot and acrid in TCM, strongly warming and circulating. They are associated with the Heart and Spleen meridians. Used medicinally to warm the interior, activate Blood circulation, expel cold-damp, and stimulate digestion. Dried chilies are considered more intensely warming than fresh because the drying process concentrates their active compounds."
    },
    modern_scientific_research: "Dried chilies contain concentrated capsaicinoids, which show potent anti-inflammatory, analgesic, and antimicrobial properties in research. The drying process reduces water activity but concentrates the capsaicin. Studies suggest capsaicin activates TRPV1 receptors (heat and pain receptors), which may explain both the burning sensation and the endorphin release associated with spicy food consumption. Research also indicates potential metabolic benefits from regular capsaicin consumption.",
    culinary_uses: "Toast whole dried chilies in a dry wok until fragrant and slightly darkened before adding oil and other ingredients — this is the base of countless Sichuan stir-fries. Infuse in hot oil for chili oil. Add whole to braising liquids. Snip with scissors into pieces for stir-fries. Rehydrate in warm water for sauces and pastes.",
    preparation_methods: "For stir-fries: add whole to hot oil and fry for 30–60 seconds until darkened and fragrant before adding other ingredients. Do not burn — they become bitter. For chili oil: infuse in oil that has cooled slightly from smoking point. Remove seeds for less heat, keep them for more.",
    traditional_dishes: ["Kung pao chicken", "Mapo tofu base", "Sichuan dry-fried beef", "La zi ji (chili chicken)", "Chili oil"],
    tags: ["spice", "chili", "dried", "sichuan", "hunan", "chinese", "heat", "pantry-staple", "warming"],
    published: true
  },
  {
    name: "Sichuan Chili Flakes",
    slug: "sichuan-chili-flakes",
    alternative_names: ["La Jiao Mian", "Chili Powder (Chinese)", "Sichuan Red Pepper Flakes", "Er Jing Tiao Flakes"],
    overview: "Sichuan chili flakes are coarsely ground dried red chilies — a specific texture and heat level distinct from generic red pepper flakes. Made primarily from Erjing tiao chilies, they are prized for their vivid red color and moderate, fruity heat rather than pure burning intensity. They are the key ingredient poured over at the critical moment in homemade chili oil, and the correct texture for this application — coarse enough to crisp in hot oil but fine enough to bloom with color.",
    flavor_profile: ["moderately spicy", "fruity", "vivid red", "earthy", "slightly smoky", "warm"],
    cultural_history: "The specific chili flakes used in Sichuan cooking represent generations of refinement in selecting, drying, and grinding chilies for particular culinary outcomes. Erjing tiao chilies, the primary variety used for Sichuan chili flakes, were developed specifically for their combination of deep red color and moderate heat — both qualities important in a cuisine where visual presentation and layered flavor matter as much as pure spice level. The technique of pouring hot oil over chili flakes at precisely the right temperature to bloom their color and flavor without burning them is one of Sichuan cooking's most important skills.",
    origin_regions: ["Sichuan", "Chengdu", "China"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Ground chili (La Jiao Mian) shares the TCM profile of dried chilies: hot, acrid, warming, and circulatory. The finer grind means quicker flavor release and more even distribution of heat through a dish, which is relevant in TCM culinary applications where consistent warming is the goal."
    },
    modern_scientific_research: "Chili flakes retain the capsaicinoid content of dried whole chilies, with the increased surface area from grinding slightly accelerating the release of active compounds. Research on capsaicin shows consistent anti-inflammatory effects and potential metabolic benefits. The vivid red color of Erjing tiao flakes comes from carotenoid compounds, including capsanthin, which show antioxidant activity.",
    culinary_uses: "The essential ingredient for homemade chili oil — pour hot oil at precisely 180–200°C over the flakes to bloom their color and flavor. Use in dry spice rubs. Sprinkle over finished dishes. Add to dumpling dipping sauces. Use in Sichuan cold dishes and noodle sauces. Mix with Sichuan peppercorn for the ma la flavor base.",
    preparation_methods: "For chili oil: the oil temperature when it hits the flakes is critical. Too hot (above 210°C) burns and turns them dark and bitter. Too cool (below 160°C) produces pale, under-bloomed flakes. Aim for around 180–190°C for vivid red color and full flavor. A two-pour method (first at higher temp, second at lower) gives maximum color and flavor.",
    traditional_dishes: ["Homemade chili oil", "Dan dan noodles", "Sichuan cold dishes (liang ban)", "Chili wontons", "Kou shui ji (saliva chicken)"],
    tags: ["spice", "chili", "sichuan", "chinese", "chili-oil", "heat", "pantry-staple"],
    published: true
  },
  {
    name: "Chinese Rock Sugar",
    slug: "chinese-rock-sugar",
    alternative_names: ["Bing Tang", "Rock Candy", "Yellow Rock Sugar", "Crystal Sugar"],
    overview: "Chinese rock sugar (bing tang) consists of large, irregular crystals of partially refined cane sugar with a pale golden color and a slightly milder, more nuanced sweetness than white granulated sugar. It is used in braises, glazes, and sweet soups where its slower, gentler dissolution and subtle caramel notes contribute to a richer, glossier result than white sugar can produce. The classic red-braised pork is made with rock sugar for exactly this reason.",
    flavor_profile: ["sweet", "mild caramel", "clean", "subtle", "rich"],
    cultural_history: "Rock sugar has been produced in China for at least a thousand years, originating from traditional methods of crystallizing cane sugar syrup. Its distinctive appearance — large, gem-like crystals in shades of amber and white — made it a traditional gift and ceremonial ingredient. In Chinese medicine, rock sugar is considered gentler and more neutral than brown sugar and less cooling than white. It is used in longan and red date teas, bird's nest preparations, and festive dessert soups.",
    origin_regions: ["China", "Sichuan", "Southern China"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Rock sugar (Bing Tang) is classified as neutral and sweet in TCM, associated with the Lung and Stomach meridians. It is used to moisten the Lung, stop cough, and nourish Yin. It is considered gentler and less heating than brown sugar, and less cooling than white sugar. It is used in herbal preparations to harmonize other ingredients and in tonic drinks for chronic dry cough and Lung dryness."
    },
    modern_scientific_research: "Rock sugar is sucrose in crystalline form and carries the same nutritional profile as refined cane sugar. The pale golden color comes from residual molasses content, which contributes trace minerals not present in fully refined white sugar. No significant unique health benefits have been demonstrated compared to other sucrose sources, though its cultural and culinary applications are well-established.",
    culinary_uses: "Use in red-braised pork, chicken, and duck for a glossy, caramelized coating. Add to sweet soups (tong sui) and therapeutic teas. Use in glazes for char siu and roast duck. Dissolve in stock for a refined sweetness in braises. Use in traditional Chinese desserts: red bean soup, tremella fungus soup, and longan tea.",
    preparation_methods: "Break large pieces with a heavy knife or mortar before adding to dishes. Rock sugar dissolves more slowly than granulated sugar — add early in braises and stir occasionally. For glazes, melt in oil or water first before adding other ingredients.",
    traditional_dishes: ["Red-braised pork (hong shao rou)", "Rock sugar snow pear soup", "Longan and red date tea", "Char siu glaze", "Tremella fungus soup"],
    tags: ["sweetener", "chinese", "braising", "tong-sui", "pantry-staple", "caramel", "glazing"],
    published: true
  },
  {
    name: "Salt",
    slug: "salt",
    alternative_names: ["Yan", "Table Salt", "Sea Salt", "Kosher Salt", "Sodium Chloride"],
    overview: "Salt is the most fundamental seasoning in every cuisine in the world — the ingredient without which no dish is truly finished. In Chinese cooking, salt plays a specific role: it is used as a primary seasoning in dishes where soy sauce would overpower or color incorrectly, in dry brines and cures, in doughs and batters, and as a finishing seasoning at the table. The type of salt matters: fine salt for cooking and curing, coarse sea salt for finishing and for the pepper-salt dips that accompany fried seafood.",
    flavor_profile: ["salty", "clean", "mineral", "essential"],
    cultural_history: "Salt production and distribution in China has been one of the most economically significant and politically contentious industries throughout Chinese history. Salt monopolies funded empires and sparked rebellions. The major salt-producing regions — Sichuan's well salt (from underground brine), coastal sea salt operations, and inland lake salt — each developed distinct qualities valued in regional cooking. Sichuan well salt, evaporated from ancient underground brine, has a particularly clean mineral flavor prized in fine Sichuan cooking. The salt trade routes shaped the development of Chinese commerce for two thousand years.",
    origin_regions: ["China broadly", "Sichuan (well salt)", "Coastal China (sea salt)"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Salt (Yan) is classified as salty and cold in TCM, associated with the Kidney meridian. It is said to guide other medicinal substances to the Kidney, soften hardness, purge and detoxify, and nourish the Kidney. Salt is used as a processing medium for herbs intended to tonify the Kidney (yan zhi, or salt processing) and as a simple topical treatment. In culinary medicine, appropriate salt intake is considered essential to Kidney function, while excess is cautioned against for its taxing effect on the same organ."
    },
    modern_scientific_research: "Sodium chloride is essential to human physiology — it regulates fluid balance, nerve transmission, and muscle function. The relationship between dietary sodium and cardiovascular health is well-established: excessive sodium intake is associated with elevated blood pressure and increased cardiovascular risk. Current research suggests that the source and context of sodium intake (in whole foods versus processed foods) may matter as much as absolute quantity. Natural mineral salts contain trace amounts of other minerals not present in refined sodium chloride.",
    culinary_uses: "Use as the primary seasoning when soy sauce is inappropriate (egg white dishes, pale doughs, delicate fish preparations). Use in dry brines for duck and chicken. Season cooking water for blanching vegetables. Use in dipping salts: Sichuan pepper-salt (hua jiao yan) for fried seafood, and plain sea salt with sesame oil for white-cooked chicken.",
    preparation_methods: "For most Chinese cooking, fine table salt or fine sea salt is appropriate. For pepper-salt preparations, combine with toasted Sichuan peppercorn or white pepper. Salt early in braises for deep seasoning; add at the end for brighter impact. Taste throughout cooking — Chinese dishes are seasoned across many layers.",
    traditional_dishes: ["Salt and pepper squid", "Cantonese white-cooked chicken (with salt dip)", "Saltfish and chicken fried rice", "Sichuan pepper-salt prawns", "Dry-brined duck"],
    tags: ["seasoning", "essential", "chinese", "pantry-staple", "mineral", "universal"],
    published: true
  },
  {
    name: "MSG",
    slug: "msg",
    alternative_names: ["Monosodium Glutamate", "Wei Jing", "Taste Essence", "Umami Seasoning", "Ajinomoto"],
    overview: "MSG is the sodium salt of glutamic acid — one of the most abundant amino acids in nature and the compound responsible for the umami taste found in fermented foods, aged cheeses, tomatoes, mushrooms, and meat. It was isolated and commercialized in 1908 by Japanese chemist Kikunae Ikeda, who extracted it from kombu seaweed, but glutamate itself has been consumed in fermented foods for thousands of years. In Chinese and broader Asian cooking, MSG is used as a direct flavor enhancer — a way to add umami without changing the color, texture, or liquid content of a dish.",
    flavor_profile: ["umami", "savory-enhancing", "neutral", "mouth-coating", "depth-adding"],
    cultural_history: "MSG was rapidly adopted across East and Southeast Asian cooking after its commercialization in the early 20th century. In China, it is known as wei jing (taste essence) and has been a standard kitchen seasoning since the 1920s. The infamous 'Chinese Restaurant Syndrome' — reported in a 1968 letter to the New England Journal of Medicine — created lasting stigma around MSG in Western countries, despite the absence of rigorous scientific support. Decades of double-blind studies have failed to demonstrate a consistent adverse reaction to MSG at culinary doses. Today, MSG is experiencing renewed appreciation as its safety has been reaffirmed and its role in reducing overall sodium intake has been recognized.",
    origin_regions: ["Japan (isolated)", "China (widely adopted)", "East Asia"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "MSG as a modern isolated compound has no direct TCM classification. However, glutamates as naturally occurring compounds in fermented and aged foods have always been part of TCM culinary medicine. The umami taste itself aligns with TCM's understanding of nourishing, tonic foods — glutamate-rich fermented soybean products are considered supportive of the Spleen and Stomach in TCM tradition."
    },
    modern_scientific_research: "MSG has been extensively studied and is classified as Generally Recognized as Safe (GRAS) by the FDA and as safe by WHO, the EU Food Safety Authority, and equivalent bodies worldwide. Glutamic acid is a non-essential amino acid naturally produced by the body and consumed in all protein-containing foods. Double-blind studies have consistently failed to confirm the 'Chinese Restaurant Syndrome' symptoms at MSG doses found in food. Research also shows MSG can reduce overall sodium intake by 25–40% when used as a partial salt substitute, since it provides equivalent perceived seasoning at lower sodium levels.",
    culinary_uses: "Add a small pinch to soups, stir-fries, braises, and marinades to enhance and round out other flavors without making the dish taste specifically of MSG. Use in combination with salt rather than as a replacement. Add to vegetable dishes to compensate for the lack of meat-derived glutamates. Use in dumpling fillings for fuller, rounder flavor.",
    preparation_methods: "Use sparingly — a quarter teaspoon is typically sufficient for a dish serving four people. Dissolve in liquid or add directly to hot dishes. Unlike salt, more is not better with MSG: excessive amounts produce a cloying, artificial quality. The goal is enhanced depth, not a detectable MSG flavor.",
    traditional_dishes: ["Chinese restaurant-style fried rice", "Mapo tofu", "Cantonese stir-fries", "Ramen broth", "Taiwanese popcorn chicken"],
    tags: ["seasoning", "umami", "chinese", "japanese", "pantry-staple", "flavor-enhancer", "modern"],
    published: true
  },
  {
    name: "Chicken Bouillon Powder",
    slug: "chicken-bouillon-powder",
    alternative_names: ["Ji Jing", "Chicken Powder", "Chicken Stock Powder", "Ji Tang Fen"],
    overview: "Chicken bouillon powder is one of the most widely used seasoning shortcuts in Chinese home and restaurant cooking — a concentrated blend of dried chicken extract, salt, MSG, and flavor compounds that adds a rounded, savory depth to dishes in seconds. In Chinese kitchens it functions less as a stock substitute and more as a layer of seasoning added alongside soy sauce, oyster sauce, and white pepper to create a complete flavor profile. A small amount added to stir-fries, soups, and rice provides the background umami that might otherwise require hours of stock-making.",
    flavor_profile: ["savory", "chicken-forward", "umami", "salty", "rounded", "concentrated"],
    cultural_history: "Chicken powder (ji jing) became standard in Chinese restaurant kitchens in the mid-20th century and spread rapidly into home cooking. In Chinese culinary culture, it is not viewed as a compromise or a shortcut in the pejorative sense — it is simply a modern seasoning ingredient with a specific function, like fish sauce or soy sauce. The brand most associated with Chinese cooking is Lee Kum Kee's chicken powder, though many brands exist. In Cantonese home cooking in particular, a pinch of chicken powder is as automatic as reaching for salt.",
    origin_regions: ["China", "Cantonese cuisine", "Chinese cuisine broadly"],
    traditional_medicine_perspectives: {
      "Traditional Chinese Medicine": "Chicken (Ji Rou) is classified as warm and sweet in TCM, associated with the Spleen and Stomach. It is considered nourishing to Qi and Blood, strengthening to sinews and bones. Chicken-based broths and preparations are prescribed for Qi and Blood deficiency, weakness after illness, and general tonification. Chicken bouillon powder captures some of these associations as a concentrated chicken flavoring, though it is understood as a modern processed ingredient rather than a traditional medicinal food."
    },
    modern_scientific_research: "Chicken bouillon powder's primary flavor contributions come from hydrolyzed chicken protein (which releases free glutamates and amino acids), MSG, and salt. The free glutamates from hydrolyzed protein and added MSG contribute to umami perception through the same mechanisms as naturally occurring glutamates in aged and fermented foods. Sodium content is high — a teaspoon typically contains 400–600mg of sodium — so it should be factored into overall seasoning.",
    culinary_uses: "Add a small amount to stir-fry sauces, soups, braises, and fried rice for background depth. Use in dipping sauces and salad dressings. Add to the water when cooking noodles for subtle flavor. Use in combination with salt and MSG rather than instead of them — each contributes differently. A pinch added to congee or vegetable dishes compensates for the absence of a proper stock.",
    preparation_methods: "Dissolve in liquid before adding to a dish, or add directly to sauces and stir-fries where moisture is present. Taste carefully before adding salt — bouillon powder is already salty. A quarter to half teaspoon is typically sufficient for a dish serving four.",
    traditional_dishes: ["Cantonese stir-fries", "Fried rice", "Wonton soup base", "Congee", "Clay pot dishes"],
    tags: ["seasoning", "chinese", "cantonese", "umami", "pantry-staple", "chicken", "bouillon", "modern"],
    published: true
  }
]

async function seed() {
  console.log(`Seeding ${ingredients.length} Chinese spices and seasonings...\n`)
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
