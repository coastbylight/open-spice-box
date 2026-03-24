/**
 * Full content seed — Phase 6.5
 * Adds 15 ingredients, 8 recipes, 2 traditions
 * Safe to re-run: uses upsert on slug
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

// ─── INGREDIENTS ──────────────────────────────────────────────────────────────

const ingredients = [
  {
    name: 'Cinnamon',
    slug: 'cinnamon',
    alternative_names: ['Ceylon Cinnamon', 'Dalchini', 'Cinnamomum verum', 'True Cinnamon'],
    overview:
      'Cinnamon is one of the oldest spices in recorded history — mentioned in ancient Chinese manuscripts dating to 2700 BCE and in Egyptian papyri. The bark of a tropical evergreen tree, it carries a sweet, warm, complex aroma that has made it invaluable in sweet and savory cooking across the world. Ceylon cinnamon (true cinnamon from Sri Lanka) is milder and more complex than the more widely sold cassia variety.',
    flavor_profile: ['warm', 'sweet', 'woody', 'slightly citrusy', 'complex'],
    cultural_history:
      'Cinnamon was among the most prized commodities in ancient trade. Egyptian import records list it alongside gold and ivory. Arab traders long controlled its source, telling mythologized stories about harvesting it from giant birds\' nests to maintain their monopoly. The Portuguese seized Sri Lanka specifically to control the cinnamon trade in the 16th century. In Ayurvedic medicine, cinnamon has been prescribed for digestion, circulation, and respiratory health for over two thousand years.',
    origin_regions: ['Sri Lanka', 'South India', 'Southeast Asia'],
    traditional_medicine_perspectives: {
      Ayurveda:
        'Cinnamon (Tvak) is considered warming, sweet, and pungent in Ayurveda. It is used to stimulate digestive fire (agni), improve circulation, and treat respiratory conditions. It is classified as a deepana and pachana herb — stimulating digestion and helping the body process what it consumes. Ayurvedic texts prescribe it for cold-damp digestive sluggishness, cough, and impaired circulation.',
      'Traditional Chinese Medicine':
        'In TCM, cinnamon bark (Rou Gui) is among the most warming herbs in the pharmacopoeia. It enters the Heart, Kidney, Liver, and Spleen meridians. Used to warm and tonify Kidney Yang, dispel cold, and relieve pain. Prescribed for coldness of the limbs, frequent urination, impotence, and abdominal pain caused by cold. Cinnamon twig (Gui Zhi) is a separate preparation — warming but less extreme — used to promote circulation and relieve exterior cold.',
    },
    modern_scientific_research:
      'Cinnamon has been extensively studied for its effects on blood sugar regulation. Several clinical trials show that cinnamon supplementation can reduce fasting blood glucose and improve insulin sensitivity in type 2 diabetics. The compound cinnamaldehyde is responsible for much of its biological activity and shows anti-inflammatory, antimicrobial, and antifungal properties in laboratory research. Note that cassia cinnamon contains coumarin, which in large amounts can be hepatotoxic — Ceylon cinnamon is significantly lower in coumarin and preferable for regular medicinal use.',
    culinary_uses:
      'Cinnamon is used in virtually every global cuisine, in both sweet and savory preparations. Essential to Moroccan tagines, Indian biryanis and chai, Mexican mole, and baked goods worldwide. Cinnamon bark is used whole in slow-cooked dishes; ground cinnamon for baking and spice blends. Pairs naturally with cardamom, ginger, nutmeg, clove, and chocolate.',
    preparation_methods:
      'Use cinnamon sticks whole in rice dishes, braises, and spiced drinks — remove before serving. Toast sticks lightly in a dry pan before adding to oil to deepen flavor. Ground cinnamon loses potency quickly — buy in small quantities. For medicinal preparations, simmer a whole stick in water or milk for 10 to 15 minutes.',
    traditional_dishes: ['Chai masala', 'Biryani', 'Moroccan tagine', 'Mexican mole', 'Cinnamon rolls', 'Apple pie'],
    tags: ['blood-sugar', 'anti-inflammatory', 'digestive', 'warming', 'ayurveda', 'tcm', 'spice', 'aromatic'],
    published: true,
  },
  {
    name: 'Cumin',
    slug: 'cumin',
    alternative_names: ['Jeera', 'Cuminum cyminum', 'Roman Caraway'],
    overview:
      'Cumin is one of the most widely consumed spices in the world after pepper. Native to a region spanning the eastern Mediterranean to South Asia, its warm, earthy, slightly bitter flavor forms the aromatic backbone of South Asian, Middle Eastern, Mexican, and North African cooking. Cumin seeds are used whole or ground, and their character transforms dramatically depending on whether they are raw, toasted, or bloomed in hot oil.',
    flavor_profile: ['earthy', 'warm', 'slightly bitter', 'nutty', 'pungent'],
    cultural_history:
      'Cumin has been cultivated for at least five thousand years — seeds have been found in ancient Egyptian tombs, and it appears in records of ancient Mesopotamia. It was used medicinally in ancient Rome and Greece. In South Asia, cumin is foundational to Ayurvedic medicine and daily cooking. Mexican and Latin American cuisines absorbed it through Spanish colonialism, which had itself inherited it from Moorish Andalusia.',
    origin_regions: ['Eastern Mediterranean', 'Iran', 'South Asia', 'North Africa'],
    traditional_medicine_perspectives: {
      Ayurveda:
        'Cumin (Jeeraka) is considered one of Ayurveda\'s most important digestive herbs. It is tridoshic when used in appropriate amounts and is classified as a deepana (digestive stimulant) and carminative. Ayurvedic texts prescribe jeera water — whole seeds boiled in water and strained — as a daily digestive tonic for improving agni, reducing bloating, and enhancing nutrient absorption.',
      'Traditional Chinese Medicine':
        'Cumin (Ziran) is used in regional Chinese medicine and is classified as warming, entering the Kidney and Spleen meridians. It is used to warm the interior, relieve pain, and treat cold-damp digestive conditions including nausea, diarrhea, and abdominal pain. Its use is more common in the cuisine and medicine of western China (Xinjiang and Sichuan).',
    },
    modern_scientific_research:
      'Cumin has been studied for effects on digestion, blood sugar, and fat metabolism. Research suggests that cumin can stimulate the secretion of bile, aiding fat digestion. Clinical trials have found that cumin supplementation reduces fasting blood glucose and improves lipid profiles in overweight subjects. Its essential oil shows significant antimicrobial activity. The compound thymoquinone, found in cumin, shows anti-cancer properties in preclinical research.',
    culinary_uses:
      'Cumin is used whole or ground. Whole seeds are commonly bloomed in hot ghee or oil as the first step in South Asian cooking, releasing aromatic compounds before other ingredients are added. Ground cumin is used in spice blends including garam masala, chili powder, and ras el hanout. It pairs naturally with coriander, turmeric, chili, and garlic.',
    preparation_methods:
      'Toast whole cumin seeds in a dry pan until fragrant and slightly darkened — 60 to 90 seconds — before grinding or adding to dishes. Bloom whole seeds in hot oil before adding other ingredients for maximum flavor release. Freshly ground cumin from toasted seeds has dramatically more flavor than pre-ground.',
    traditional_dishes: ['Dal tadka', 'Hummus', 'Chili', 'Cumin rice', 'Falafel', 'Moroccan lamb'],
    tags: ['digestive', 'carminative', 'blood-sugar', 'anti-inflammatory', 'ayurveda', 'spice', 'south-asian', 'middle-eastern'],
    published: true,
  },
  {
    name: 'Coriander',
    slug: 'coriander',
    alternative_names: ['Dhania', 'Cilantro (leaves)', 'Coriandrum sativum', 'Chinese Parsley'],
    overview:
      'Coriander is unusual among culinary plants in that both its seeds and its leaves are used as distinct ingredients with quite different flavor profiles. The seeds are warm, citrusy, and slightly sweet — a foundational spice in South Asian, Middle Eastern, and Latin American cooking. The fresh leaves (cilantro) are bright, herbaceous, and polarizing — a phenomenon linked to a specific genetic variant that makes the compound 2E-alkenal smell soapy to some people.',
    flavor_profile: ['citrusy', 'warm', 'slightly sweet', 'floral', 'herbal'],
    cultural_history:
      'Coriander seeds have been found in ancient Egyptian burial sites and are referenced in the Ebers Papyrus (1550 BCE) as a medicinal plant. Sanskrit texts include it in early Ayurvedic formulations. The spice traveled from its origins in the eastern Mediterranean and South Asia outward to all major culinary traditions. In South Asia, coriander and cumin are treated as a paired duo (dhania-jeera), rarely used apart.',
    origin_regions: ['Eastern Mediterranean', 'Middle East', 'South Asia'],
    traditional_medicine_perspectives: {
      Ayurveda:
        'Coriander (Dhania) is classified in Ayurveda as cooling, sweet, and pungent. It is used to balance Pitta — the fiery constitution prone to inflammation and excess heat. The seeds are used as a digestive and diuretic, and to reduce excessive thirst. Coriander water (seeds boiled and strained) is a common Ayurvedic home remedy for heat-related digestive complaints.',
      'Traditional Chinese Medicine':
        'In TCM, coriander is classified as acrid, warm, and aromatic. It promotes the release of measles rash to the surface (helping the body complete an immune response), warms the Stomach and Spleen, and promotes Qi movement. Fresh coriander leaf is used to treat indigestion, nausea, and as a carminative in mild digestive formulas.',
    },
    modern_scientific_research:
      'Coriander seeds and leaves contain linalool, a terpene with documented anxiolytic, sedative, and anti-inflammatory properties. Research shows coriander may help lower blood sugar by stimulating insulin secretion and improving glycogen storage. Animal studies suggest potential benefits for heavy metal chelation — particularly lead. Coriander leaf extract shows significant antibacterial activity against food-borne pathogens including Salmonella.',
    culinary_uses:
      'Ground coriander is essential to curry powders, garam masala, ras el hanout, and chili blends. Whole seeds are used in pickling, brines, and some bread recipes. Fresh cilantro is used as a finishing herb in South Asian, Southeast Asian, Mexican, and Latin American dishes. Coriander pairs naturally with cumin, chili, garlic, lime, and ginger.',
    preparation_methods:
      'Toast whole coriander seeds before grinding for significantly deeper flavor. Coriander releases its aromatic compounds quickly after grinding — buy whole and grind as needed. For coriander water, toast 1 tablespoon of seeds, boil in 2 cups of water for 5 minutes, strain, and drink warm.',
    traditional_dishes: ['Curry powder', 'Falafel', 'Guacamole', 'Rasam', 'Pho', 'Ceviche'],
    tags: ['digestive', 'cooling', 'anti-inflammatory', 'ayurveda', 'spice', 'herb', 'south-asian'],
    published: true,
  },
  {
    name: 'Fennel',
    slug: 'fennel',
    alternative_names: ['Saunf', 'Foeniculum vulgare', 'Sweet Fennel', 'Florence Fennel'],
    overview:
      'Fennel is a Mediterranean plant in which every part is edible and useful — the seeds, fronds, bulb, pollen, and stalks each bring distinct flavors and applications. The seeds, used in cooking and medicine for thousands of years, carry a mild anise-like warmth that makes them one of the most effective digestive herbs in any tradition. In India, roasted fennel seeds are offered after meals as a digestive — the practice is older than Ayurvedic texts themselves.',
    flavor_profile: ['sweet', 'anise-like', 'warm', 'slightly grassy', 'cooling'],
    cultural_history:
      'Fennel appears in ancient Greek mythology (Prometheus carried fire to humanity in a stalk of fennel), in Roman agricultural writing, and in some of the oldest Ayurvedic texts. The ancient Greeks called it marathon — the town of Marathon is named for the fennel that grew there. In medieval European herbalism, fennel was one of nine sacred herbs. It traveled with colonizers to the Americas, where it naturalized so aggressively it is now considered invasive in California.',
    origin_regions: ['Mediterranean', 'Middle East', 'South Asia'],
    traditional_medicine_perspectives: {
      Ayurveda:
        'Fennel (Shatapushpa) is classified as sweet, cooling, and slightly oily in Ayurveda — properties that make it one of the few digestive herbs safe for Pitta constitutions prone to heat and inflammation. It is used to reduce bloating and gas, promote healthy lactation, and soothe colic in infants. Roasted fennel seeds (saunf) served after meals function simultaneously as a breath freshener and a digestive aid.',
      'Traditional Chinese Medicine':
        'In TCM, fennel seeds (Xiao Hui Xiang) are warm and acrid, warming the Kidney, Liver, Spleen, and Stomach meridians. They are used to dispel cold, relieve pain, and harmonize the Stomach. Specifically prescribed for cold-induced hernial pain, abdominal pain, vomiting, and nausea. TCM uses fennel seed more frequently than the bulb.',
    },
    modern_scientific_research:
      'Fennel seeds contain trans-anethole, the compound responsible for the anise flavor and many of its medicinal properties. Clinical research shows fennel reduces symptoms of irritable bowel syndrome and infantile colic. Studies on fennel tea show anti-spasmodic effects on intestinal smooth muscle, explaining its traditional use for bloating and cramping. Fennel also shows phytoestrogenic activity, supporting traditional uses in promoting lactation and relieving menstrual discomfort.',
    culinary_uses:
      'Fennel seeds are used in sausages, Italian cooking, fish preparations, and South Asian spice blends (panch phoron, the Bengali five-spice). The bulb is eaten raw in salads, braised, or roasted. Fronds are used like dill as a finishing herb. Fennel pairs beautifully with fish, pork, citrus, and tomatoes.',
    preparation_methods:
      'Toast fennel seeds before adding to dishes for more depth. Crack lightly in a mortar before using whole, or grind. For after-meal saunf, lightly dry-roast seeds in a pan until they turn slightly golden and smell toasty.',
    traditional_dishes: ['Fennel sausage', 'Indian pickle', 'Bouillabaisse', 'Pork belly braise', 'Saunf (after-meal digestive)'],
    tags: ['digestive', 'carminative', 'anti-spasmodic', 'ayurveda', 'tcm', 'mediterranean', 'spice', 'cooling'],
    published: true,
  },
  {
    name: 'Fenugreek',
    slug: 'fenugreek',
    alternative_names: ['Methi', 'Trigonella foenum-graecum', 'Greek Hay'],
    overview:
      'Fenugreek is a plant with a history in cooking and medicine that stretches back to ancient Egypt, where seeds have been found in Tutankhamun\'s tomb. The seeds carry a distinctive bitter, maple-like aroma — one of the few naturally occurring sources of sotolone, the compound responsible for the smell of maple syrup. The fresh and dried leaves are used extensively in South Asian cooking, particularly in Indian flatbreads, leafy vegetable dishes, and dried herb blends.',
    flavor_profile: ['bitter', 'slightly sweet', 'maple-like', 'nutty', 'pungent'],
    cultural_history:
      'Fenugreek appears in ancient Egyptian medical papyri, in Greek and Roman texts, and throughout early Ayurvedic literature. Arabic traders spread it through North Africa and the Mediterranean. In South Asia, both the seeds and leaves are considered medicinal foods rather than mere flavorings — new mothers are traditionally given fenugreek-based preparations to promote milk production and aid postpartum recovery.',
    origin_regions: ['Middle East', 'South Asia', 'Mediterranean', 'Ethiopia'],
    traditional_medicine_perspectives: {
      Ayurveda:
        'Fenugreek (Methi) is classified as heating, bitter, and pungent in Ayurveda. It is used to stimulate digestive fire, reduce Kapha conditions like mucus accumulation and sluggish digestion, and support women\'s health — particularly lactation. Methi seeds are a key ingredient in traditional postpartum recovery formulas. Daily consumption is considered beneficial for blood sugar management and joint health.',
      'Traditional Chinese Medicine':
        'In TCM, fenugreek seeds (Hu Lu Ba) are warm and bitter, entering the Kidney and Liver meridians. They are prescribed to warm the Kidney Yang, disperse cold, and relieve pain — specifically for cold-induced hernial pain and cold bi syndrome (painful obstruction). They are also used for impotence attributed to Kidney Yang deficiency.',
    },
    modern_scientific_research:
      'Fenugreek is one of the most clinically studied plants for blood sugar management. Multiple randomized controlled trials show it reduces fasting glucose, postprandial glucose, and HbA1c in type 2 diabetic patients. The mechanism is partly attributed to its high soluble fiber content (galactomannan) which slows carbohydrate absorption, and 4-hydroxyisoleucine, an unusual amino acid that may stimulate insulin secretion. Research also supports its traditional use for lactation promotion and shows anti-inflammatory properties.',
    culinary_uses:
      'Fenugreek seeds are used in curry powders, spice blends, and pickling spices. They are bloomed in hot oil (carefully — they burn quickly and become intensely bitter) before other spices. Dried leaves (kasuri methi) are a finishing herb used in North Indian cooking, scattered over dals, gravies, and breads. Fresh leaves are used in saag, parathas, and salads.',
    preparation_methods:
      'Soak fenugreek seeds overnight before cooking to reduce bitterness and aid digestion. When blooming in oil, add last among dry spices and cook only 30 to 45 seconds — they turn bitter very quickly. Toast seeds lightly before grinding. Kasuri methi (dried leaves) should be crushed between palms to release flavor before adding to dishes.',
    traditional_dishes: ['Methi thepla', 'Saag', 'Kasuri methi dal', 'Aloo methi', 'Panch phoron'],
    tags: ['blood-sugar', 'digestive', 'anti-inflammatory', 'ayurveda', 'tcm', 'lactation', 'spice'],
    published: true,
  },
  {
    name: 'Ashwagandha',
    slug: 'ashwagandha',
    alternative_names: ['Withania somnifera', 'Indian Winter Cherry', 'Indian Ginseng'],
    overview:
      'Ashwagandha is one of the most important herbs in Ayurvedic medicine — classified as a rasayana, a rejuvenating agent meant to restore vitality and slow the effects of aging. The name means "smell of horse" in Sanskrit, referencing both its distinctive odor and the traditional belief that consuming it confers the strength and virility of a horse. Its root, when dried and powdered, is incorporated into tonics, warm milks, and medicinal preparations.',
    flavor_profile: ['bitter', 'earthy', 'slightly sweet', 'warm', 'pungent'],
    cultural_history:
      'Ashwagandha has been used in Ayurvedic medicine for over three thousand years, referenced in the Charaka Samhita and Sushruta Samhita — two of Ayurveda\'s foundational texts. It has been prescribed across the centuries as a tonic for children, the elderly, athletes, and anyone experiencing exhaustion or stress. Traditional preparations involve combining the powder with warm milk, honey, and ghee, a formulation called ashwagandha ksheerpaka.',
    origin_regions: ['South Asia', 'North Africa', 'Mediterranean', 'India'],
    traditional_medicine_perspectives: {
      Ayurveda:
        'Ashwagandha is classified as one of Ayurveda\'s premier rasayanas — rejuvenating herbs that rebuild the body\'s tissues (dhatus) and restore vitality. It is used to build Ojas (the essence of immunity and vitality), strengthen muscles and joints, calm the nervous system, and support reproductive health in both men and women. It is considered simultaneously energizing and grounding — a rare balance that Ayurveda describes as nourishing without stimulating.',
    },
    modern_scientific_research:
      'Ashwagandha is classified as an adaptogen — a class of substances that help the body maintain homeostasis under stress. Multiple randomized controlled trials demonstrate significant reductions in cortisol levels, perceived stress, and anxiety in subjects taking standardized ashwagandha root extract. Research also shows improvements in sleep quality, physical performance, and testosterone levels in men. Its active compounds, withanolides, show anti-inflammatory and potential anti-cancer properties in preclinical research.',
    culinary_uses:
      'Ashwagandha root powder is incorporated into warm tonics, smoothies, and oatmeal. It has a distinctive bitter, earthy flavor that benefits from pairing with strongly flavored ingredients like chocolate, honey, or warming spices. In traditional Ayurvedic preparation, it is always mixed with warm milk and fat (ghee or coconut oil) to enhance absorption of the fat-soluble withanolides.',
    preparation_methods:
      'Simmer ½ teaspoon of ashwagandha powder in 1 cup of warm milk with a pinch of cinnamon and cardamom for 10 minutes. Add honey after cooling slightly. Alternatively, blend into smoothies or mix into warm oatmeal. The fat in milk is important for absorbing the active compounds — use full-fat milk or add coconut oil or ghee.',
    traditional_dishes: ['Ashwagandha ksheerpaka (milk tonic)', 'Ojas building milk', 'Herbal churna blends'],
    tags: ['adaptogen', 'stress', 'energy', 'sleep', 'ayurveda', 'tonic', 'anti-inflammatory', 'immune'],
    published: true,
  },
  {
    name: 'Holy Basil',
    slug: 'holy-basil',
    alternative_names: ['Tulsi', 'Ocimum tenuiflorum', 'Sacred Basil', 'Queen of Herbs'],
    overview:
      'Holy basil — known as tulsi throughout South Asia — holds a sacred position that goes far beyond its culinary uses. Found growing in most Hindu households, often in a dedicated pot or garden shrine, it is both a religious plant and one of Ayurveda\'s most revered medicinal herbs. Its flavor is distinct from Italian sweet basil — more complex, with notes of clove, pepper, and mint woven through a bright herbaceous base.',
    flavor_profile: ['clove-like', 'peppery', 'slightly minty', 'herbal', 'bright'],
    cultural_history:
      'Tulsi is one of the most sacred plants in Hinduism, associated with the goddess Lakshmi. In millions of Indian households, tending the tulsi plant is a daily ritual — watering it, offering prayers, and harvesting leaves with reverence. The tradition of consuming tulsi daily predates Ayurvedic texts and represents one of the oldest examples of a functional food woven into religious practice.',
    origin_regions: ['South Asia', 'Southeast Asia', 'India'],
    traditional_medicine_perspectives: {
      Ayurveda:
        'Tulsi is classified in Ayurveda as a rasayana — a rejuvenating herb that promotes longevity and vitality. It is considered kapha and vata reducing, making it valuable for respiratory conditions, colds, and stress. It is used to support immunity, clear the mind, and balance the nervous system. Daily consumption of tulsi tea is recommended in Ayurvedic practice as a general health tonic.',
    },
    modern_scientific_research:
      'Holy basil has been studied extensively as an adaptogen. Clinical trials show it reduces cortisol, anxiety, and stress markers comparably to some pharmaceutical interventions, without side effects. Research demonstrates antibacterial activity against a wide range of pathogens including antibiotic-resistant strains. Tulsi\'s eugenol content (also found in cloves) is responsible for anti-inflammatory effects comparable to ibuprofen in some studies. Research also shows benefits for blood sugar regulation and cognitive function.',
    culinary_uses:
      'In South Asian cooking, holy basil leaves are added to curries and stir-fries toward the end of cooking. In Thai cuisine, the closely related Thai basil (and occasionally holy basil) is used in stir-fries and curries. The leaves are commonly brewed as tea, steeped alone or with ginger and honey. Unlike Italian basil, holy basil holds its flavor better under heat.',
    preparation_methods:
      'For tulsi tea: steep 4 to 6 fresh leaves (or 1 teaspoon dried) in hot water for 5 to 7 minutes. Add ginger and honey. Drink daily for adaptogenic benefits. When cooking, add at the end of cooking to preserve delicate volatile compounds.',
    traditional_dishes: ['Tulsi chai', 'Tulsi honey tea', 'Thai stir-fries', 'Rasam'],
    tags: ['adaptogen', 'immune', 'stress', 'anti-inflammatory', 'ayurveda', 'antimicrobial', 'herb', 'sacred'],
    published: true,
  },
  {
    name: 'Miso',
    slug: 'miso',
    alternative_names: ['Fermented Soybean Paste', 'Shinshu Miso', 'Hatcho Miso'],
    overview:
      'Miso is a fermented paste made from soybeans, salt, and a mold culture (koji), with optional additions of rice or barley. It has been produced in Japan for over a thousand years and exists in dozens of regional varieties — from the pale, sweet white misos (shiro) aged for weeks, to the intensely funky, almost black hatcho miso aged for three years or more. At its core, miso is one of the oldest and most sophisticated fermented foods in human history.',
    flavor_profile: ['savory', 'umami', 'salty', 'slightly sweet', 'complex'],
    cultural_history:
      'Miso arrived in Japan from China via Korea sometime between the 7th and 10th centuries CE, where it became central to Buddhist monastic cooking and then to the broader Japanese diet. The Edo period (1603–1868) saw miso production industrialize, with distinct regional varieties developing. Miso soup has been a morning staple in Japan for centuries — consumed at breakfast alongside rice and pickles as part of the standard traditional meal.',
    origin_regions: ['Japan', 'China', 'Korea'],
    traditional_medicine_perspectives: {
      'Traditional Chinese Medicine':
        'Fermented soy products are valued in TCM for their ability to harmonize the Middle Jiao (digestive system), reduce food stagnation, and support the Spleen and Stomach. The fermentation process is understood to make nutrients more bioavailable and the proteins easier to digest. Fermented foods are generally considered beneficial for the digestive Qi.',
    },
    modern_scientific_research:
      'Miso is rich in probiotics (live beneficial bacteria) that survive in the gut and influence the microbiome. Epidemiological data from Japan suggests that regular miso consumption is associated with lower rates of breast cancer, stomach cancer, and cardiovascular disease, even after accounting for sodium intake. Research shows miso contains antioxidants and isoflavones that may protect against hormone-related cancers. The fermentation process significantly reduces antinutrients in soybeans while increasing bioavailability of minerals and B vitamins including B12.',
    culinary_uses:
      'Miso is used as a seasoning rather than an ingredient — a spoonful transforms the depth of soups, marinades, dressings, and sauces. Never boil miso after adding it to soups — high heat destroys probiotics and volatile flavor compounds. Stir miso into a small amount of warm liquid first to dissolve before adding to a dish. Pairs with ginger, sesame, citrus, butter, and mushrooms.',
    preparation_methods:
      'Dissolve miso in a small amount of warm (not boiling) liquid before adding to dishes. For miso soup, turn off heat, ladle broth into a small bowl with miso, whisk to dissolve, then pour back into the pot. Store miso covered in the refrigerator indefinitely — it improves with age.',
    traditional_dishes: ['Miso soup', 'Miso-glazed fish', 'Ramen', 'Miso noodles', 'Dengaku tofu'],
    tags: ['fermented', 'probiotic', 'gut-health', 'umami', 'tcm', 'japanese', 'anti-inflammatory', 'microbiome'],
    published: true,
  },
  {
    name: 'Moringa',
    slug: 'moringa',
    alternative_names: ['Drumstick Tree', 'Moringa oleifera', 'Miracle Tree', 'Sahjan'],
    overview:
      'Moringa is a fast-growing tropical tree native to South Asia whose leaves, pods, seeds, and roots are all used as food and medicine. It holds an unusual position in nutrition: gram for gram, the dried leaves contain more vitamin C than oranges, more calcium than milk, more iron than spinach, and more protein than yogurt. For this reason, it has been used as a nutritional intervention in food-insecure regions and is now widely studied as a functional food.',
    flavor_profile: ['earthy', 'slightly bitter', 'grassy', 'spinach-like'],
    cultural_history:
      'Moringa has been used in South Asian cooking and medicine for over two thousand years. Ancient Ayurvedic texts reference it as a remedy for over 300 conditions. Its drumstick pods are a staple in Tamil Nadu and throughout South India, used in sambar and other dishes. The tree\'s ability to grow in poor soil with minimal water made it a survival food across dry tropical regions. Modern nutritional science has confirmed what traditional cultures intuited: moringa is exceptionally nutrient-dense.',
    origin_regions: ['South Asia', 'Sub-Saharan Africa', 'India', 'Sri Lanka'],
    traditional_medicine_perspectives: {
      Ayurveda:
        'Moringa (Shigru) is classified as pungent, hot, and light in Ayurveda. It is used to pacify Kapha and Vata doshas. The leaves are prescribed for nutritional deficiencies, anemia, and inflammatory conditions. It is considered particularly beneficial for joint health — traditionally used for arthritis and swelling. Moringa seeds are used as a water purifier in some traditional practices.',
    },
    modern_scientific_research:
      'Moringa leaves are exceptionally nutrient-dense and contain over 90 nutrients and 46 antioxidants. Clinical studies show moringa supplementation significantly increases blood hemoglobin and ferritin in iron-deficient women. Research demonstrates anti-hyperglycemic effects — moringa leaf powder reduces postprandial blood sugar comparable to some pharmaceutical interventions. Animal studies show potent anti-inflammatory and hepatoprotective effects. The isothiocyanates in moringa are under investigation for anti-cancer properties.',
    culinary_uses:
      'Moringa leaf powder is stirred into smoothies, soups, and sauces. Fresh leaves are used like spinach in South Indian cooking — wilted into dals, curries, and rice dishes. Drumstick pods are cooked in sambar and South Indian curries. Moringa seeds can be roasted and eaten like peanuts. The powder has a strong flavor — start with a small amount.',
    preparation_methods:
      'Stir moringa powder into warm (not hot) liquids to preserve vitamins. Use 1 teaspoon per serving. Fresh leaves can be added to any cooked green preparation. Drumstick pods are added to liquid dishes and the flesh is scraped from the fibrous outer skin when eating.',
    traditional_dishes: ['Sambar', 'Moringa dal', 'Drumstick curry', 'South Indian rice dishes'],
    tags: ['superfood', 'iron', 'anti-inflammatory', 'ayurveda', 'nutrient-dense', 'blood-sugar', 'green', 'south-asian'],
    published: true,
  },
  {
    name: 'Reishi Mushroom',
    slug: 'reishi-mushroom',
    alternative_names: ['Lingzhi', 'Ganoderma lucidum', 'Mushroom of Immortality', 'Spirit Mushroom'],
    overview:
      'Reishi mushroom has occupied the apex of Traditional Chinese Medicine\'s pharmacopoeia for over two thousand years. In ancient texts, it was classified as a superior tonic — herbs that extend life without toxicity, even at high doses. It is bitter and woody when consumed directly, which is why it is typically prepared as a tea, broth, or extract rather than eaten. In modern wellness contexts it is widely sold as a supplement and added to coffee, hot chocolate, and functional foods.',
    flavor_profile: ['bitter', 'woody', 'earthy', 'umami', 'slightly mushroomy'],
    cultural_history:
      'Reishi appears extensively in Chinese art and literature — it is depicted in ancient paintings, embroidered onto imperial robes, and carved into decorative objects as a symbol of longevity and spiritual power. The Taoists considered it a plant of immortality. Its rarity in the wild (it grows on the base of specific hardwood trees and was difficult to find) gave it mystical status — emperors sought it and poets wrote about it. Modern cultivation techniques have made it widely available.',
    origin_regions: ['China', 'Japan', 'Korea', 'East Asia'],
    traditional_medicine_perspectives: {
      'Traditional Chinese Medicine':
        'Reishi (Lingzhi) is classified in TCM as sweet, neutral, and non-toxic — a superior tonic herb that can be taken indefinitely without harm. It enters the Heart, Lung, and Liver meridians. It is prescribed to calm the Shen (spirit/mind), tonify Qi, nourish Blood, and support the immune system. It is one of the most widely prescribed herbs in TCM for cancer support, chronic fatigue, and anxiety.',
    },
    modern_scientific_research:
      'Reishi is one of the most extensively researched medicinal mushrooms. Its polysaccharides (particularly beta-glucans) show immunomodulatory effects — they neither simply stimulate nor suppress the immune system but help it self-regulate. Clinical studies demonstrate improvements in fatigue and quality of life in cancer patients undergoing treatment. Triterpenes in reishi show anti-inflammatory, anti-hypertensive, and liver-protective properties. Research suggests potential benefits for sleep quality, anxiety, and blood sugar regulation.',
    culinary_uses:
      'Reishi is too bitter and tough to eat directly as a cooked mushroom. It is prepared as a decoction (simmered in water for 30 to 60 minutes), as part of a long-cooked broth or congee, or consumed as a powder extract. The bitter flavor is significant — it signals the presence of triterpenes, which are among its most bioactive compounds.',
    preparation_methods:
      'For reishi tea: simmer 3 to 5 grams of dried sliced reishi in 4 cups of water for 45 to 60 minutes. Strain and drink. For broth: add dried reishi pieces to a bone broth or vegetable stock and simmer for at least 2 hours before straining. Start with small amounts — the bitterness can be intense.',
    traditional_dishes: ['Reishi tea', 'Medicinal bone broth', 'Congee', 'Herbal soups'],
    tags: ['immune', 'adaptogen', 'anti-inflammatory', 'tcm', 'longevity', 'gut-health', 'sleep', 'mushroom'],
    published: true,
  },
  {
    name: 'Licorice Root',
    slug: 'licorice-root',
    alternative_names: ['Mulethi', 'Yashtimadhu', 'Glycyrrhiza glabra', 'Sweet Root'],
    overview:
      'Licorice root is one of the most widely used medicinal herbs in both Eastern and Western herbal traditions, and among the oldest documented. The root contains glycyrrhizin, a compound 30 to 50 times sweeter than sucrose, responsible for its distinctive flavor — simultaneously sweet, slightly bitter, and warm. It has been found in the tombs of Egyptian pharaohs and appears in both ancient Chinese and Ayurvedic medical texts as a foundational medicine.',
    flavor_profile: ['sweet', 'slightly bitter', 'warm', 'anise-like', 'aromatic'],
    cultural_history:
      'Licorice root appears in Chinese medical texts over 2,000 years old, where it is called Gan Cao (sweet herb) and used in the majority of multi-herb formulas as a harmonizing agent. In Ayurveda, Yashtimadhu has been used for sore throats, coughs, and digestive complaints for millennia. In the Western herbal tradition, it was used extensively in Greek and Roman medicine. During the Crusades, European soldiers carried licorice root as a thirst-quencher.',
    origin_regions: ['Central Asia', 'Mediterranean', 'Middle East', 'China'],
    traditional_medicine_perspectives: {
      'Traditional Chinese Medicine':
        'Gan Cao (licorice root) is one of TCM\'s most important herbs — used in an estimated 60% of all herbal formulas as a harmonizing agent that moderates the properties of other herbs and reduces toxicity. It tonifies the Spleen and Stomach Qi, moistens the Lungs, clears heat, and detoxifies. It is prescribed for cough, sore throat, fatigue, and digestive weakness.',
      Ayurveda:
        'Yashtimadhu is classified as sweet, slightly bitter, and cooling — one of the few sweet-tasting herbs considered medicinal in Ayurveda. It is used to soothe inflamed mucous membranes in the throat, lungs, and digestive tract. Particularly prescribed for Pitta conditions: inflammation, ulcers, acid reflux, and heat-related respiratory conditions.',
    },
    modern_scientific_research:
      'Glycyrrhizin and glycyrrhizic acid from licorice root show potent anti-inflammatory and antiviral properties in research. Clinical studies demonstrate efficacy for viral infections, peptic ulcer disease, and chronic hepatitis. DGL (deglycyrrhizinated licorice) is a processed form used to treat peptic ulcers without blood pressure side effects — multiple trials confirm its effectiveness. Important caution: whole licorice root in large amounts raises blood pressure and can cause fluid retention due to glycyrrhizin\'s effects on cortisol metabolism. Therapeutic doses in consultation with a practitioner are recommended.',
    culinary_uses:
      'Licorice root is used primarily as a tea, broth additive, or in spice blends. Chinese five-spice powder includes star anise (not licorice, but with a similar flavor). Licorice root tea is commonly combined with ginger, cinnamon, and fennel. It is used as a natural sweetener in herbal preparations and some commercial foods.',
    preparation_methods:
      'Simmer 1 to 3 grams of dried licorice root in 2 cups of water for 15 to 20 minutes for tea. Combine with ginger and fennel for a digestive formula. Use sparingly — the sweetness and active compounds are potent.',
    traditional_dishes: ['Herbal tea blends', 'Chinese medicinal soups', 'Five-spice preparations'],
    tags: ['anti-inflammatory', 'immune', 'digestive', 'ayurveda', 'tcm', 'soothing', 'respiratory', 'herb'],
    published: true,
  },
  {
    name: 'Amla',
    slug: 'amla',
    alternative_names: ['Indian Gooseberry', 'Amalaki', 'Emblica officinalis', 'Phyllanthus emblica'],
    overview:
      'Amla is a small, pale green fruit native to India that occupies a central place in Ayurvedic medicine considered second only to ghee as a rasayana — a rejuvenating food that rebuilds the body\'s tissues. It is intensely sour, slightly astringent, and strongly bitter when raw, making it unusual as a functional food. Despite its challenging flavor, it is consumed daily across South Asia in powders, pickles, chutneys, and candies, often because people have been told its benefits since childhood.',
    flavor_profile: ['intensely sour', 'astringent', 'bitter', 'slightly sweet', 'complex'],
    cultural_history:
      'Amla appears throughout Ayurvedic literature as a foundational medicine — it is one of the three fruits in Triphala, perhaps Ayurveda\'s most prescribed compound formula, and is central to the classical rejuvenating preparation chyawanprash. Ancient texts describe amla as containing all five tastes except salty. In Indian culture, the amla tree itself is considered sacred — associated with the god Vishnu and worshipped during the festival of Akshay Navami.',
    origin_regions: ['South Asia', 'India', 'Sri Lanka', 'Southeast Asia'],
    traditional_medicine_perspectives: {
      Ayurveda:
        'Amla (Amalaki) is considered tridoshic — balancing all three doshas — and is one of Ayurveda\'s premier rasayanas. It is described as a potent rejuvenator of the blood, liver, and eyes. It is central to Triphala, the most widely prescribed Ayurvedic formula for digestive health and gentle detoxification. Chyawanprash, an ancient jam made with amla and over 40 herbal ingredients, is prescribed as a daily tonic for immunity and vitality.',
    },
    modern_scientific_research:
      'Amla contains one of the highest concentrations of vitamin C in any food — approximately 450 to 900 mg per 100g, compared to 50 mg in an orange. Uniquely, amla\'s vitamin C is bound to tannins that protect it from degradation by heat and oxygen, unlike synthetic ascorbic acid. Research demonstrates powerful antioxidant activity. Clinical trials show amla reduces total cholesterol, LDL cholesterol, and triglycerides significantly. Studies also document anti-diabetic effects, liver protection, and anti-cancer properties in preclinical research.',
    culinary_uses:
      'Amla is consumed as a fresh fruit (when in season), dried powder, pickle, murabba (sweet preserve), juice, or churna (dried powder blend). Amla powder is added to smoothies, warm water, or herbal preparations. The fresh fruit is eaten with salt and chili in South Asian food culture. Amla candy (coated in sugar or salt) is a common street food.',
    preparation_methods:
      'Mix 1 teaspoon of amla powder in warm water with honey first thing in the morning — a classical Ayurvedic practice. Amla can be juiced with ginger and honey. Fresh amla should be grated or processed quickly as it oxidizes rapidly (though the tannins help slow this).',
    traditional_dishes: ['Triphala tea', 'Chyawanprash', 'Amla pickle', 'Amla murabba', 'Amla juice'],
    tags: ['vitamin-c', 'antioxidant', 'ayurveda', 'immune', 'longevity', 'liver', 'digestive', 'cholesterol'],
    published: true,
  },
  {
    name: 'Ghee',
    slug: 'ghee',
    alternative_names: ['Clarified Butter', 'Smen', 'Samna', 'Butter Oil'],
    overview:
      'Ghee is butter that has been slowly heated until all water evaporates and the milk solids are separated and removed, leaving pure butterfat. The process of clarification concentrates flavors while removing the components — lactose and casein — that most people with dairy sensitivities react to. The result is a golden, shelf-stable fat with a high smoke point, a rich nutty flavor, and a medicinal history that spans thousands of years across multiple civilizations.',
    flavor_profile: ['rich', 'nutty', 'buttery', 'slightly caramel', 'clean'],
    cultural_history:
      'Ghee appears in the Rigveda (one of Hinduism\'s oldest texts) as a sacred substance used in fire rituals. It has been central to Ayurvedic medicine since the system\'s earliest texts, used both as a cooking fat and as a vehicle for medicinal herbs. Throughout South Asia, ghee prepared at home from cultured butter is considered fundamentally different from commercially produced ghee — the process of making it is considered an act of care for the household.',
    origin_regions: ['South Asia', 'India', 'Middle East', 'North Africa'],
    traditional_medicine_perspectives: {
      Ayurveda:
        'Ghee (Ghrita) holds the highest position among all fats in Ayurvedic medicine. It is considered the finest carrier (anupana) for medicinal herbs — capable of carrying active compounds across the gut lining and into the body\'s deeper tissues. Unlike heavy fats that suppress digestive fire, ghee is said to kindle agni while simultaneously nourishing. It is used to lubricate joints, nourish the nervous system, support memory, and build Ojas (vital essence).',
    },
    modern_scientific_research:
      'Ghee is high in butyric acid, a short-chain fatty acid that serves as the primary energy source for colonocytes (gut lining cells) and shows anti-inflammatory effects in the gut. Research indicates that ghee\'s saturated fat content is predominantly shorter-chain fats that are metabolized differently from the long-chain saturates in most animal fats. Some studies suggest that ghee, consumed in traditional quantities as part of a varied diet, does not raise cardiovascular risk the way industrially processed fats do. Its lactose and casein removal makes it suitable for many with dairy sensitivities.',
    culinary_uses:
      'Ghee is used everywhere butter would be used, with the added advantage of a higher smoke point (485°F / 250°C) that makes it suitable for high-heat cooking. It forms the foundation of South Asian cooking — tadkas (spice blooms) begin with ghee. It is stirred into khichdi, dal, and rice. In French cooking, clarified butter serves the same function in sautéing delicate proteins.',
    preparation_methods:
      'To make ghee: melt unsalted butter in a heavy saucepan over medium-low heat. Simmer until foam rises, then subsides, and the milk solids at the bottom turn golden and the fat runs clear — about 20 to 30 minutes. Strain through cheesecloth into a jar. Store at room temperature for months.',
    traditional_dishes: ['Dal tadka', 'Khichdi', 'Biryani', 'Chapati', 'Ayurvedic tonics'],
    tags: ['fat', 'ayurveda', 'gut-health', 'anti-inflammatory', 'digestive', 'dairy-free option', 'south-asian', 'cooking-fat'],
    published: true,
  },
  {
    name: 'Cloves',
    slug: 'cloves',
    alternative_names: ['Laung', 'Syzygium aromaticum', 'Clou de girofle'],
    overview:
      'Cloves are the dried flower buds of a tropical tree native to the Maluku Islands in eastern Indonesia. One of the most intensely aromatic spices in the world, their flavor is dominated by eugenol — a phenolic compound with analgesic, antiseptic, and anti-inflammatory properties that forms the basis of many traditional dental preparations worldwide. Cloves have been prized in trade for over two millennia and were among the spices that motivated European exploration in the 15th and 16th centuries.',
    flavor_profile: ['intensely aromatic', 'warm', 'slightly sweet', 'bitter', 'medicinal'],
    cultural_history:
      'Cloves have been found on the Indonesian islands of the Maluku archipelago — their only native habitat — for over four thousand years. Archaeological evidence suggests clove use in Syria around 1700 BCE, indicating ancient spice trade routes. The clove islands were so valuable that wars were fought over them — the Banda Islands massacre of 1621 by the Dutch East India Company was driven entirely by the desire to monopolize nutmeg and clove production.',
    origin_regions: ['Maluku Islands (Indonesia)', 'Zanzibar', 'Madagascar', 'Sri Lanka'],
    traditional_medicine_perspectives: {
      Ayurveda:
        'Cloves (Lavanga) are classified as pungent, bitter, and warming in Ayurveda. They are used to stimulate digestive fire, treat nausea and vomiting, relieve tooth pain, and as an expectorant for respiratory conditions. They are considered anti-Kapha and stimulating — Ayurvedic texts warn against excessive use in Pitta-dominant constitutions due to their strong heating nature.',
      'Traditional Chinese Medicine':
        'Cloves (Ding Xiang) are classified as acrid and warm in TCM, entering the Kidney, Spleen, and Stomach meridians. They are used to warm the middle burner, descend rebellious Qi (stopping hiccups and vomiting), and warm the Kidney to treat cold patterns including impotence and frequent urination. Clove oil is widely used for toothache.',
    },
    modern_scientific_research:
      'Eugenol, cloves\' primary compound (comprising 72-90% of the essential oil), is well-documented as an analgesic, antiseptic, and anti-inflammatory agent. It works as a COX-2 inhibitor — the same mechanism as ibuprofen. Clinical research confirms clove\'s efficacy as a topical anesthetic for dental pain. Research also shows strong antimicrobial activity against a broad range of bacteria and fungi. Clove extract shows blood sugar lowering effects in animal models.',
    culinary_uses:
      'Cloves are used whole or ground. Whole cloves are used in long-cooked dishes — biryanis, braises, mulled wine — and removed before serving. Ground clove is used in garam masala, pumpkin spice, Worcestershire sauce, and baked goods. Its intensity means a little goes very far — one or two cloves is often sufficient for an entire dish.',
    preparation_methods:
      'Use whole cloves in spiced rice and braises, removing before serving. For ground clove, use sparingly — it overwhelms easily. Toast whole cloves briefly before grinding to develop flavor. Clove-infused oil (add 2 to 3 cloves to warm oil, remove when fragrant) can be used as a finishing touch.',
    traditional_dishes: ['Biryani', 'Garam masala', 'Mulled wine', 'Pumpkin pie spice', 'Indonesian rendang'],
    tags: ['anti-inflammatory', 'antimicrobial', 'ayurveda', 'tcm', 'digestive', 'spice', 'aromatic', 'analgesic'],
    published: true,
  },
  {
    name: 'Rose',
    slug: 'rose',
    alternative_names: ['Gulab', 'Rosa damascena', 'Damask Rose', 'Persian Rose'],
    overview:
      'The rose is the only major culinary flower that has been consistently used as a medicinal herb, flavoring agent, and sacred symbol across multiple unrelated civilizations simultaneously. Rose petals, rose water, and rose hip (the fruit left after flowering) each have distinct culinary and therapeutic applications. Rosa damascena — the Damascus rose — is the variety most prized in perfumery and medicine, requiring approximately 60,000 flowers to produce a single ounce of pure rose oil.',
    flavor_profile: ['floral', 'slightly sweet', 'delicate', 'honeyed', 'fragrant'],
    cultural_history:
      'Roses have been cultivated for food, medicine, and ceremony for over five thousand years. Persian rose water — distilled from Rosa damascena — became a foundational flavor in Persian, Mughal, and Ottoman cuisine. The Mughal emperor Akbar\'s court reportedly consumed rose water in enormous quantities. The Ottoman Empire maintained dedicated rose gardens for medicine and cosmetics. In Ayurveda, rose petals are used in Gulkand (rose jam), a traditional cooling preparation.',
    origin_regions: ['Persia (Iran)', 'Turkey', 'Bulgaria', 'India', 'Morocco'],
    traditional_medicine_perspectives: {
      Ayurveda:
        'Rose (Gulab) is classified as cooling, sweet, and astringent in Ayurveda — properties that make it specifically useful for Pitta conditions involving excess heat, inflammation, and emotional agitation. Gulkand (rose petal jam) is a classical preparation used to cool the body, soothe irritated mucous membranes, and calm the mind. Rose water is used both internally and topically to treat inflamed skin, eye irritation, and excess Pitta states.',
      'Traditional Chinese Medicine':
        'Rose bud (Mei Gui Hua) is classified as sweet, slightly bitter, and warm in TCM. It regulates Liver Qi, promotes Blood circulation, and lifts depression. It is prescribed for liver Qi stagnation causing emotional constraint, breast tenderness, and irregular menstruation. It is used in tea form as a gentle daily support for emotional wellbeing.',
    },
    modern_scientific_research:
      'Rose petals and rose hips contain significant concentrations of antioxidants, including vitamin C (rose hips are one of the richest plant sources), flavonoids, and polyphenols. Research shows rose petal extract has anxiolytic effects in animal models. Clinical studies demonstrate anti-inflammatory and pain-relieving properties. Rose hip extract has been studied in randomized controlled trials for osteoarthritis, showing significant reductions in pain and improvements in joint function.',
    culinary_uses:
      'Dried rose petals are used in Persian rice dishes, Moroccan ras el hanout, Indian desserts (gulab jamun), and Turkish delight. Rose water flavors Persian sweets, Indian kheer and rasgulla, and Middle Eastern pastries. Rose hip syrup and tea are consumed for immune support. Gulkand (rose petal jam) is consumed as a digestive and cooling agent in South Asia.',
    preparation_methods:
      'Use only food-grade, unsprayed rose petals. Steep dried petals in warm water for 10 minutes to make a gentle tea. Add rose water to dishes sparingly — 1 to 2 teaspoons is typically sufficient. Gulkand is made by layering fresh rose petals with raw sugar in a glass jar and setting in sunlight for 4 to 6 weeks.',
    traditional_dishes: ['Kheer with rose water', 'Gulab jamun', 'Persian saffron rice', 'Moroccan lamb tagine', 'Turkish delight', 'Gulkand'],
    tags: ['cooling', 'anti-inflammatory', 'ayurveda', 'tcm', 'mood', 'aromatic', 'floral', 'antioxidant'],
    published: true,
  },
]

// ─── RECIPES ──────────────────────────────────────────────────────────────────

const recipes = [
  {
    title: 'Spiced Bone Broth',
    slug: 'spiced-bone-broth',
    subtitle: 'A deeply healing broth built on anti-inflammatory spices',
    cultural_origin: 'Traditional',
    tradition: 'Cross-Cultural',
    headnote:
      'Every traditional food culture that had access to animals and fire made some version of this: bones, water, and time. The knowledge that long-cooked bones yielded a restorative, rich liquid appears independently in Chinese medicine, European folk tradition, South American cuisine, and across the indigenous cultures of the world.\n\nThis version layers Ayurvedic and TCM principles onto the universal foundation. Turmeric and black pepper — the anti-inflammatory pairing central to Ayurveda — are added alongside ginger and cinnamon to warm the digestive system. The long cook time (12 to 24 hours) extracts collagen, glycine, and minerals from the bones in ways that shorter cooking cannot achieve.\n\nDrink this slowly, as a warm morning ritual or as the base for soups and grains. The bones do most of the work. Time does the rest.',
    yield: '3 to 4 quarts',
    prep_time: '15 minutes',
    cook_time: '12 to 24 hours',
    total_time: '12 to 24 hours',
    difficulty: 'Easy',
    ingredients: [
      { amount: '3', unit: 'lbs', ingredient: 'mixed bones', prep_note: 'beef knuckle, marrow bones, chicken carcass, or a combination; roasted if possible', optional: false },
      { amount: '4', unit: 'quarts', ingredient: 'cold water', prep_note: null, optional: false },
      { amount: '2', unit: 'tbsp', ingredient: 'apple cider vinegar', prep_note: 'to help extract minerals from bones', optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'turmeric', prep_note: 'ground', optional: false },
      { amount: '¼', unit: 'tsp', ingredient: 'black pepper', prep_note: 'freshly ground', optional: false },
      { amount: '2', unit: 'inch', ingredient: 'ginger', prep_note: 'sliced into coins, no need to peel', optional: false },
      { amount: '1', unit: 'stick', ingredient: 'cinnamon', prep_note: null, optional: false },
      { amount: '4', unit: null, ingredient: 'cloves', prep_note: 'whole', optional: true },
      { amount: '1', unit: 'tsp', ingredient: 'salt', prep_note: 'add more at the end to taste', optional: false },
    ],
    instructions: [
      { step: 1, text: 'If your bones are not pre-roasted, roast them at 450°F (230°C) for 30 minutes until browned. This step greatly deepens flavor but can be skipped.' },
      { step: 2, text: 'Place bones in a large stockpot or slow cooker. Cover with cold water. Add the apple cider vinegar and let sit for 30 minutes before turning on heat — the acid helps draw minerals from the bones.' },
      { step: 3, text: 'Add the turmeric, black pepper, ginger, cinnamon stick, and cloves. Bring to a gentle boil over medium-high heat, skimming any foam that rises in the first 20 to 30 minutes.' },
      { step: 4, text: 'Reduce heat to the lowest possible simmer — the surface should barely tremble. Cook for a minimum of 12 hours, up to 24. Add water as needed to keep bones submerged. A slow cooker on low is ideal.' },
      { step: 5, text: 'Strain through a fine-mesh strainer. Season with salt. Drink immediately or let cool, refrigerate, and skim the solidified fat from the top before using.' },
    ],
    key_ingredient_benefits:
      '**Turmeric and Black Pepper:** The pairing that defines Ayurvedic anti-inflammatory cooking. Piperine in black pepper increases curcumin absorption by up to 2000%. Both are added here not for flavor primarily, but for their synergistic medicinal effect.\n\n**Ginger:** Adds warmth and digestive stimulation. Ginger\'s gingerols and shogaols complement curcumin\'s anti-inflammatory activity and contribute independent anti-nausea and gut-protective effects.\n\n**Cinnamon:** Warms the broth, supports blood sugar regulation, and adds depth. In both Ayurveda and TCM, cinnamon is considered a warming herb that supports circulation and metabolic function.',
    why_this_works:
      'The long simmer time extracts collagen (which converts to gelatin), glycine, proline, and minerals that cannot be obtained from short-cooked stocks. The anti-inflammatory spice profile is not incidental — it is chosen to compound the broth\'s healing properties. Drinking the broth warm, as a beverage rather than a sauce, allows these benefits to be absorbed directly.',
    substitutions: 'Use a whole chicken carcass for a lighter broth. Vegetarians can make a spiced vegetable broth by simmering dried shiitake mushrooms, kombu seaweed, ginger, turmeric, and vegetables for 2 to 3 hours.',
    serving_suggestions: 'Drink from a mug as a morning ritual. Use as the base for soups, congee, or cooked grains. Add miso paste (off heat) to a cup of broth for a probiotic-rich warming drink.',
    storage_reheating: 'Refrigerate for up to 5 days. A good broth will gel when cold — this indicates high gelatin content. Freeze in portions for up to 6 months. Reheat gently over medium-low heat.',
    cultural_notes:
      'The global convergence on slow-cooked bone broth — from Chinese congee bases to French pot-au-feu to Jewish chicken soup — reflects a near-universal nutritional intuition. Modern broth culture in the West is largely a rediscovery of what traditional cooks everywhere already knew.',
    tags: ['bone-broth', 'anti-inflammatory', 'gut-health', 'collagen', 'turmeric', 'ginger', 'healing', 'gluten-free', 'paleo', 'warming'],
    seo_title: 'Spiced Bone Broth — Anti-Inflammatory Traditional Recipe',
    meta_description: 'A deeply healing bone broth with turmeric, ginger, black pepper, and cinnamon — built on Ayurvedic and TCM anti-inflammatory principles.',
    published: true,
  },
  {
    title: 'Miso Soup with Ginger and Reishi',
    slug: 'miso-soup-ginger-reishi',
    subtitle: 'A three-ingredient Japanese immune tonic, elevated',
    cultural_origin: 'Japan',
    tradition: 'Traditional Chinese Medicine',
    headnote:
      'In Japan, miso soup is not a starter. It is a foundational part of the daily meal, consumed at breakfast alongside rice and pickled vegetables — a warm, mineral-rich, probiotic-rich broth that has been the morning ritual of Japanese households for centuries.\n\nThis version takes the classic form and adds two ingredients from the TCM pharmacy: ginger, to warm the digestive system and dispel cold, and reishi mushroom, to tonify Qi and support the immune system. The result is not dramatically different from traditional miso soup in appearance or flavor, but its medicinal depth is significantly greater.\n\nThe rule with miso: never boil it. High heat destroys both the probiotic cultures and the volatile flavor compounds. Turn off the heat first. Stir in the miso second. Always.',
    yield: '2 servings',
    prep_time: '5 minutes',
    cook_time: '20 minutes',
    total_time: '25 minutes',
    difficulty: 'Easy',
    ingredients: [
      { amount: '3', unit: 'cups', ingredient: 'water', prep_note: null, optional: false },
      { amount: '5', unit: 'grams', ingredient: 'dried reishi mushroom slices', prep_note: 'or 1 tsp reishi powder', optional: false },
      { amount: '1', unit: 'inch', ingredient: 'ginger', prep_note: 'peeled and sliced into coins', optional: false },
      { amount: '2', unit: 'tbsp', ingredient: 'miso', prep_note: 'white (shiro) or mixed; adjust to taste', optional: false },
      { amount: '½', unit: 'block', ingredient: 'soft tofu', prep_note: 'cut into small cubes', optional: true },
      { amount: '2', unit: null, ingredient: 'scallions', prep_note: 'thinly sliced, for garnish', optional: false },
    ],
    instructions: [
      { step: 1, text: 'Combine the water, reishi mushroom slices (or powder), and ginger in a small saucepan. Bring to a gentle boil over medium heat, then reduce to a low simmer.' },
      { step: 2, text: 'Simmer for 15 minutes to extract the reishi\'s compounds and infuse the ginger flavor. Strain out the reishi slices and ginger coins (or leave ginger if you prefer — it will continue to infuse).' },
      { step: 3, text: 'If using tofu, add the cubes to the hot broth and gently warm through for 2 minutes.' },
      { step: 4, text: 'Remove the pot from heat completely. In a small bowl, whisk the miso with a ladleful of warm broth until fully dissolved and smooth. Pour the miso mixture back into the pot and stir gently.' },
      { step: 5, text: 'Divide between two bowls. Top with sliced scallions. Serve immediately.' },
    ],
    key_ingredient_benefits:
      '**Miso:** A fermented food rich in probiotic cultures, B vitamins, and bioavailable minerals. Epidemiological research from Japan links regular miso consumption to lower rates of several cancers and cardiovascular disease. Its glutamate content contributes umami depth that satisfies without heaviness.\n\n**Reishi Mushroom:** The primary immunomodulatory herb in TCM\'s arsenal. Its beta-glucan polysaccharides help the immune system self-regulate rather than simply stimulating or suppressing it. Regular consumption is associated with improved fatigue, immune function, and sleep quality in clinical research.\n\n**Ginger:** Warms the digestive system and promotes the secretion of digestive enzymes. In TCM, ginger is considered essential for cold-morning constitutions — it warms the interior and prepares the digestive system for the day.',
    why_this_works:
      'The 15-minute reishi simmer extracts beta-glucans and triterpenes that require sustained heat to release. The ginger flavor deepens the broth while adding warming medicinal properties. Miso — added off-heat — preserves its living cultures while its glutamates round and deepen the entire preparation.',
    substitutions: 'Reishi powder can replace dried slices — whisk directly into the broth with the miso at the end. Wakame seaweed can be added (soak in water for 5 minutes first) for iodine and minerals. Any miso works — white is mildest, red is most intense.',
    serving_suggestions: 'Serve as a morning ritual alongside rice. Can be accompanied by a soft-boiled egg, sliced avocado, or pickled vegetables.',
    storage_reheating: 'Make fresh daily for maximum probiotic benefit. If making ahead, store without the miso added. Reheat the broth, then stir in miso off-heat each time.',
    cultural_notes: 'The tradition of ichiju sansai — one soup, three sides — has structured the Japanese meal for centuries. Miso soup is the ichiju (one soup). This version extends that tradition through TCM\'s complementary pharmacopoeia.',
    tags: ['miso', 'japanese', 'tcm', 'fermented', 'probiotic', 'immune', 'gut-health', 'reishi', 'easy', 'morning', 'vegan', 'gluten-free'],
    seo_title: 'Miso Soup with Reishi and Ginger — Traditional Japanese Immune Tonic',
    meta_description: 'A deeply healing miso soup with reishi mushroom and ginger. Traditional Japanese technique with TCM immune-supporting herbs.',
    published: true,
  },
  {
    title: 'Ashwagandha Moon Milk',
    slug: 'ashwagandha-moon-milk',
    subtitle: 'An Ayurvedic sleep tonic for the end of the day',
    cultural_origin: 'India',
    tradition: 'Ayurveda',
    headnote:
      'Moon milk is the evening counterpart to golden milk — where golden milk energizes and anti-inflames, moon milk calms and prepares the body for sleep. Its name references the Ayurvedic understanding of night as a time of lunar energy: cooling, introspective, restorative.\n\nAshwagandha is the central herb here. Classified in Ayurveda as a rasayana — a rejuvenating tonic — it is one of the few herbs that modern clinical research has confirmed as an adaptogen: it reduces cortisol, supports sleep quality, and helps the body recover from stress. It is paired with cardamom for digestive support, nutmeg (a mild sedative in traditional medicine), and the optional saffron, which in Ayurvedic tradition is considered both a mood regulator and an ojas-builder.\n\nDrink this 30 to 60 minutes before sleep as a replacement for evening scrolling.',
    yield: '1 serving',
    prep_time: '2 minutes',
    cook_time: '10 minutes',
    total_time: '12 minutes',
    difficulty: 'Easy',
    ingredients: [
      { amount: '1', unit: 'cup', ingredient: 'whole milk', prep_note: 'or oat milk for dairy-free', optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'ashwagandha', prep_note: 'root powder', optional: false },
      { amount: '¼', unit: 'tsp', ingredient: 'cardamom', prep_note: 'ground', optional: false },
      { amount: '¼', unit: 'tsp', ingredient: 'cinnamon', prep_note: 'ground', optional: false },
      { amount: '1', unit: 'pinch', ingredient: 'nutmeg', prep_note: 'freshly grated', optional: false },
      { amount: '5', unit: null, ingredient: 'saffron', prep_note: 'threads, steeped in 1 tbsp warm milk for 5 minutes', optional: true },
      { amount: '1', unit: 'tsp', ingredient: 'raw honey', prep_note: 'or maple syrup; added after cooling', optional: true },
    ],
    instructions: [
      { step: 1, text: 'If using saffron, begin by steeping the threads in 1 tablespoon of warm milk in a small cup for at least 5 minutes.' },
      { step: 2, text: 'Combine the milk, ashwagandha powder, cardamom, cinnamon, and nutmeg in a small saucepan. Whisk to blend the powders into the milk before heating.' },
      { step: 3, text: 'Warm over medium-low heat, whisking occasionally, until hot and steaming — about 8 to 10 minutes. Do not boil.' },
      { step: 4, text: 'Remove from heat. Add the saffron milk (threads and all) if using. Pour into a mug and allow to cool for 2 minutes.' },
      { step: 5, text: 'Stir in honey if using — after the milk has cooled to warm rather than hot, as Ayurveda recommends against heating honey. Drink slowly, 30 minutes before sleep.' },
    ],
    key_ingredient_benefits:
      '**Ashwagandha:** Multiple randomized controlled trials confirm ashwagandha root extract reduces cortisol levels, perceived stress, and anxiety. Research also shows improvements in sleep quality and onset latency. Its withanolides are fat-soluble — the fat in milk helps absorb them.\n\n**Nutmeg:** Used as a mild sleep-inducing agent in Ayurveda and folk medicine across cultures. Nutmeg contains myristicin and elemicin, compounds with sedative effects at very small doses. The key word is small — a pinch is medicinal; large amounts are toxic.\n\n**Cardamom and Cinnamon:** Both spices support evening digestion and add aromatic warmth that makes the drink feel grounding. Cardamom in Ayurveda is considered a nervine — calming to the nervous system.',
    why_this_works:
      'This preparation works on multiple levels simultaneously: the fat in the milk carries fat-soluble compounds like ashwagandha\'s withanolides. The warmth of the drink and the time to prepare it function as a wind-down ritual that signals the nervous system to shift out of activity. The spice combination is chosen to support digestion and calm the mind — precisely what the body needs in the hours before sleep.',
    substitutions: 'Oat milk or coconut milk work well as dairy substitutes. Maple syrup can replace honey (add at any temperature). Ashwagandha KSM-66 is a standardized extract with the most clinical evidence — it can be used at the dose specified on the packaging.',
    serving_suggestions: 'Drink in a quiet environment, away from screens. A small square of dark chocolate alongside does not conflict with the preparation\'s intent.',
    storage_reheating: 'Best made fresh. Can be prepared in larger batches and refrigerated — reheat gently over low heat without boiling.',
    cultural_notes: 'The practice of consuming medicinal milk tonics before sleep is documented in Ayurvedic texts over 2,000 years old. The preparation has evolved — saffron availability, for example, has varied enormously with geography and era — but the core principle is consistent: warm fat infused with adaptogenic herbs, consumed at the transition between day and rest.',
    tags: ['ayurveda', 'sleep', 'adaptogen', 'ashwagandha', 'stress', 'tonic', 'vegetarian', 'drinks', 'warming', 'easy'],
    seo_title: 'Ashwagandha Moon Milk — Ayurvedic Sleep Tonic Recipe',
    meta_description: 'A calming Ayurvedic moon milk with ashwagandha, cardamom, cinnamon, and saffron. A traditional sleep and stress-support tonic.',
    published: true,
  },
  {
    title: 'Fennel, Cumin & Coriander Digestive Tea',
    slug: 'fennel-cumin-coriander-digestive-tea',
    subtitle: 'The three-seed Ayurvedic digestive formula',
    cultural_origin: 'India',
    tradition: 'Ayurveda',
    headnote:
      'This is one of Ayurveda\'s most enduring and practical prescriptions: equal parts fennel seed, cumin seed, and coriander seed, simmered in water and strained. In Ayurvedic terms, this combination is tridoshic — balancing to all three constitutions — and addresses nearly every form of digestive complaint: bloating, gas, sluggish digestion, cramping, nausea, and excess heat in the gut.\n\nEach seed brings something distinct. Cumin is a digestive stimulant that kindles agni (digestive fire). Coriander cools and soothes — it balances cumin\'s heating quality. Fennel is carminative and anti-spasmodic, relieving gas and cramping without stimulation. Together they cover the full spectrum of digestive support without being too heating or too cooling for any constitution.\n\nThis tea is not dramatic. It tastes like the seeds it is made from — warm, slightly complex, and genuinely pleasant. Its value is cumulative and consistent: drink it after meals, or whenever digestion is troubled.',
    yield: '2 servings',
    prep_time: '2 minutes',
    cook_time: '8 minutes',
    total_time: '10 minutes',
    difficulty: 'Easy',
    ingredients: [
      { amount: '1', unit: 'tsp', ingredient: 'fennel', prep_note: 'whole seeds', optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'cumin', prep_note: 'whole seeds', optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'coriander', prep_note: 'whole seeds', optional: false },
      { amount: '2', unit: 'cups', ingredient: 'water', prep_note: null, optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'raw honey', prep_note: 'added after cooling; optional', optional: true },
    ],
    instructions: [
      { step: 1, text: 'Combine the fennel, cumin, and coriander seeds in a small saucepan with the water.' },
      { step: 2, text: 'Bring to a boil, then reduce to a gentle simmer. Cook for 5 to 8 minutes — the water will turn faintly golden and the seeds will release their aromatic oils.' },
      { step: 3, text: 'Strain into two cups, pressing the seeds lightly against the strainer to extract maximum flavor.' },
      { step: 4, text: 'Allow to cool slightly before adding honey if using. Drink warm after meals or at the first sign of digestive discomfort.' },
    ],
    key_ingredient_benefits:
      '**Fennel:** Contains trans-anethole and fenchone, compounds with documented anti-spasmodic effects on intestinal smooth muscle. Clinical trials show fennel reduces IBS symptoms and infant colic. Its cooling quality in Ayurveda makes it appropriate even for heat-sensitive constitutions.\n\n**Cumin:** Stimulates bile production and pancreatic enzyme secretion — directly supporting the mechanical process of digestion. Cumin seeds contain thymol, which stimulates salivary and gastric secretions. The seed acts as a digestive fire-kindler (deepana) in Ayurvedic terms.\n\n**Coriander:** Acts as a cooling counterbalance to cumin\'s heat. Contains linalool, which shows anxiolytic and sedative properties — relevant because stress and digestive discomfort are closely linked. Coriander also shows anti-hyperglycemic effects.',
    why_this_works:
      'This formula uses three seeds with complementary actions: one stimulates, one soothes, one relieves spasm. The Ayurvedic principle of tridoshic formulation — ensuring no single energetic quality dominates — is practically demonstrated here. Hot water extraction draws out volatile oils and water-soluble compounds that would not extract in cold water.',
    substitutions: 'Any of the three seeds can be used alone in a larger quantity if only one is available. Cardamom can be added for additional digestive benefit and pleasant flavor. Fresh ginger added during cooking provides more warming support for cold constitutions.',
    serving_suggestions: 'Drink after meals, particularly heavy or complex meals. Can also be taken in the morning on an empty stomach in Ayurvedic practice, though after meals is more traditional for digestive support.',
    storage_reheating: 'Best consumed fresh and warm. Can be made in larger batches and stored in a thermos for up to 8 hours. Reheat gently if needed.',
    cultural_notes: 'This three-seed combination appears across multiple Ayurvedic texts under various names — CCF tea (cumin-coriander-fennel) is one of the most commonly prescribed formulas in contemporary Ayurvedic practice. Its simplicity belies its effectiveness.',
    tags: ['ayurveda', 'digestive', 'tea', 'vegan', 'gluten-free', 'tridoshic', 'carminative', 'easy', 'bloating', 'drinks'],
    seo_title: 'CCF Tea Recipe — Ayurvedic Cumin Coriander Fennel Digestive Tea',
    meta_description: 'The traditional Ayurvedic CCF digestive tea with fennel, cumin, and coriander seeds. Tridoshic and balancing for all constitutions.',
    published: true,
  },
  {
    title: 'Reishi Mushroom Congee',
    slug: 'reishi-mushroom-congee',
    subtitle: 'The restorative Chinese rice porridge, made medicinal',
    cultural_origin: 'China',
    tradition: 'Traditional Chinese Medicine',
    headnote:
      'Congee is rice cooked in a much larger volume of water than usual — so much water, and for so long, that the grains break down entirely into a silky, comforting porridge. It is the oldest and most universal comfort food in East Asian cuisine, eaten for breakfast, consumed during illness, given to new mothers, and prepared for the very young and the very old.\n\nIn TCM, congee holds a specific therapeutic position: it is considered supremely easy to digest, allowing the body to absorb nutrients with minimal digestive effort. The long cook time breaks down the rice starches into a form that is immediately accessible. Adding reishi mushroom — the TCM mushroom of longevity — extends congee from comfort food into medicine.\n\nThis congee can be made plain, with just rice and water, and it will still be excellent. Everything added to it should be considered a tonal choice: more ginger for warmth, a soft egg for protein, scallion for brightness, sesame oil for richness.',
    yield: '4 servings',
    prep_time: '5 minutes',
    cook_time: '90 minutes',
    total_time: '1 hour 35 minutes',
    difficulty: 'Easy',
    ingredients: [
      { amount: '1', unit: 'cup', ingredient: 'white jasmine rice', prep_note: 'rinsed', optional: false },
      { amount: '8', unit: 'cups', ingredient: 'water', prep_note: 'or light chicken broth for more richness', optional: false },
      { amount: '8', unit: 'grams', ingredient: 'dried reishi mushroom slices', prep_note: 'or 1 tsp reishi mushroom powder', optional: false },
      { amount: '1', unit: 'inch', ingredient: 'ginger', prep_note: 'peeled and sliced into coins', optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'salt', prep_note: null, optional: false },
      { amount: '2', unit: null, ingredient: 'scallions', prep_note: 'thinly sliced, for serving', optional: false },
      { amount: '1', unit: 'tbsp', ingredient: 'sesame oil', prep_note: 'toasted, for serving', optional: true },
      { amount: '2', unit: null, ingredient: 'eggs', prep_note: 'soft-boiled and halved, for serving', optional: true },
    ],
    instructions: [
      { step: 1, text: 'Place the rinsed rice, water (or broth), reishi slices, ginger, and salt in a large, heavy-bottomed pot. Bring to a boil over high heat.' },
      { step: 2, text: 'Reduce heat to the lowest possible simmer. Cook uncovered, stirring occasionally, for 60 to 90 minutes. The congee is done when the rice has completely broken down and the mixture has the consistency of loose porridge. Add more water if it becomes too thick.' },
      { step: 3, text: 'Remove and discard the reishi mushroom slices and ginger coins (or leave the ginger — it will continue to infuse and can be eaten).' },
      { step: 4, text: 'Taste and adjust salt. The congee should be savory, silky, and very mild in flavor — it is a canvas for the toppings.' },
      { step: 5, text: 'Serve in deep bowls. Top with sliced scallions, a drizzle of sesame oil, and a soft-boiled egg if using. Eat with small amounts of pickled vegetables or a side of miso soup.' },
    ],
    key_ingredient_benefits:
      '**Reishi Mushroom:** Beta-glucan polysaccharides extracted during the long simmer modulate immune function and reduce inflammation. The extended cook time is important — reishi requires sustained heat to release its bioactive compounds.\n\n**Ginger:** Warms the digestive system, reduces nausea, and improves blood circulation. In TCM, adding ginger to congee transforms it from a neutral food into a warming, Qi-building medicine appropriate for cold constitutions or recovery from illness.\n\n**White Rice (long-cooked):** Highly broken-down rice starch is easy for the gut to process, allowing the body to receive nutrition with minimal digestive expenditure. This is why congee has been prescribed for illness and recovery across East Asian medicine for millennia.',
    why_this_works:
      'The 8:1 water-to-rice ratio and extended cooking time converts rice starch to a highly bioavailable, easily digestible form. The reishi simmer releases polysaccharides over time — a preparation that would be ineffective with shorter cooking. The resulting broth carries both the medicinal compounds of the reishi and the gentle nutrition of the congee base.',
    substitutions: 'Any long-grain white rice works. Brown rice can be used but requires an additional 30 to 60 minutes and more water. Reishi powder can replace the sliced mushroom — stir in at the end. Chicken or pork bones can be added at the start of cooking and removed before serving for additional depth.',
    serving_suggestions: 'Serve with any combination of: soft-boiled or poached egg, sliced scallion, fried shallots, sesame oil, soy sauce or tamari, white pepper, pickled ginger, or tofu. Congee is a blank canvas.',
    storage_reheating: 'Store in the refrigerator for up to 4 days. Congee thickens dramatically when cold. Reheat with a generous amount of water or broth over medium-low heat, stirring frequently, until loosened and hot.',
    cultural_notes: 'Congee exists in some form in nearly every East and Southeast Asian culture — jook in Cantonese, zhou in Mandarin, kayu in Japanese, cháo in Vietnamese. The Cantonese tradition of serving congee with a range of accompaniments is now widespread — it is the classic Hong Kong breakfast.',
    tags: ['tcm', 'congee', 'chinese', 'rice', 'reishi', 'immune', 'healing', 'gluten-free', 'vegan', 'digestive', 'easy', 'breakfast'],
    seo_title: 'Reishi Mushroom Congee — Traditional Chinese Medicine Healing Porridge',
    meta_description: 'A deeply healing reishi mushroom congee with ginger — the classic TCM restorative rice porridge made medicinal.',
    published: true,
  },
  {
    title: 'Tulsi Holy Basil Tea',
    slug: 'tulsi-holy-basil-tea',
    subtitle: 'The daily Ayurvedic tonic that fits in a cup',
    cultural_origin: 'India',
    tradition: 'Ayurveda',
    headnote:
      'In the courtyard of millions of Indian homes, a small tulsi plant grows in a clay pot, often elevated on a wooden platform or stone plinth. It is watered every morning. Prayers are offered. And then, some of the leaves are picked and placed in a small pot of water to boil.\n\nThis daily ritual has been practiced for over two thousand years. It requires no recipe, no sophistication, and almost no time. Tulsi leaves, water, and heat — that is the foundation. What is added beyond that (ginger for warmth, honey for sweetness, a stick of cinnamon for depth) is individual choice.\n\nTulsi is classified in Ayurveda as a rasayana: a rejuvenating herb that builds vitality, clears the mind, and supports immunity. Modern research has confirmed it as an adaptogen — reducing cortisol, improving stress response, and showing antimicrobial activity against a wide range of pathogens. Drink this daily. Not occasionally.',
    yield: '2 servings',
    prep_time: '2 minutes',
    cook_time: '7 minutes',
    total_time: '10 minutes',
    difficulty: 'Easy',
    ingredients: [
      { amount: '10', unit: null, ingredient: 'fresh tulsi leaves', prep_note: 'or 1 tbsp dried; or 1 tulsi tea bag', optional: false },
      { amount: '2', unit: 'cups', ingredient: 'water', prep_note: null, optional: false },
      { amount: '½', unit: 'inch', ingredient: 'ginger', prep_note: 'sliced or grated', optional: true },
      { amount: '1', unit: 'tsp', ingredient: 'raw honey', prep_note: 'added when warm, not hot', optional: true },
      { amount: '1', unit: 'squeeze', ingredient: 'lemon', prep_note: null, optional: true },
    ],
    instructions: [
      { step: 1, text: 'Bring the water to a boil. Add the tulsi leaves and ginger (if using).' },
      { step: 2, text: 'Reduce heat and simmer gently for 5 minutes. The water will turn faintly green and fragrant.' },
      { step: 3, text: 'Strain into two cups. Add a squeeze of lemon if desired.' },
      { step: 4, text: 'Allow to cool to warm (not hot). Stir in honey if using — Ayurveda recommends not heating honey.' },
      { step: 5, text: 'Drink once or twice daily. Morning and early evening are traditional times in Ayurvedic practice.' },
    ],
    key_ingredient_benefits:
      '**Holy Basil (Tulsi):** Contains eugenol (anti-inflammatory), ursolic acid (anti-cancer in preclinical research), and multiple volatile oils with antimicrobial properties. Clinical trials confirm adaptogenic effects — reduced cortisol, anxiety, and stress markers. Research also shows blood sugar lowering effects and cognitive improvements with regular consumption.\n\n**Ginger:** Adds warming, anti-nausea, and additional anti-inflammatory compounds. In Ayurveda, ginger transforms tulsi from a cooling herb (tulsi alone is slightly cooling) into a more balanced preparation appropriate for all constitutions and seasons.',
    why_this_works:
      'Simmering releases the volatile oils from tulsi leaves — the compounds responsible for both the flavor and the medicinal activity — into the water. The combination of tulsi and ginger creates a slightly warming, broadly balancing tea that addresses both physical and mental stress simultaneously.',
    substitutions: 'Dried tulsi leaves work well — use 1 tablespoon per 2 cups of water. Several quality tulsi tea bag brands (Organic India is widely available) can be used for convenience. The fresh plant can often be found in Indian grocery stores.',
    serving_suggestions: 'Drink in the morning before or with breakfast. A second cup in the mid-afternoon provides an alternative to caffeine-based stimulants. Add cardamom for a spiced variation.',
    storage_reheating: 'Best consumed fresh. Can be made in larger batches and stored in the refrigerator for up to 2 days — drink cold or reheat gently.',
    cultural_notes: 'The daily tending and consuming of tulsi in Hindu households represents one of the oldest documented examples of a functional food integrated into religious and domestic practice. The spiritual and medicinal dimensions are not separate in this tradition — the plant is considered sacred precisely because of what it does for the body and mind.',
    tags: ['ayurveda', 'tulsi', 'tea', 'adaptogen', 'immune', 'stress', 'vegan', 'gluten-free', 'easy', 'daily-ritual', 'drinks', 'anti-inflammatory'],
    seo_title: 'Tulsi Holy Basil Tea — Daily Ayurvedic Adaptogen Tea',
    meta_description: 'The traditional Ayurvedic tulsi (holy basil) tea recipe with ginger. A daily adaptogen for stress, immunity, and clarity.',
    published: true,
  },
  {
    title: 'Cinnamon Cardamom Oats',
    slug: 'cinnamon-cardamom-oats',
    subtitle: 'A warming Ayurvedic breakfast that earns its place in the morning',
    cultural_origin: 'Cross-Cultural',
    tradition: 'Ayurveda',
    headnote:
      'Oatmeal is the most universal of warm grain breakfasts. Its medicinal properties — beta-glucan fiber that feeds beneficial gut bacteria and supports heart health — are well-established. The question is never whether to eat it, but how to eat it in a way that is genuinely nourishing and genuinely worth making.\n\nThis version takes inspiration from Ayurvedic spice pairings. Cinnamon and cardamom are the foundational warm spices in Ayurvedic breakfast cooking: both support digestion, both warm the body, both are tridoshic. Ginger adds further warmth. A small amount of ghee or coconut oil, stirred in at the end, carries the fat-soluble aromatic compounds deeper into the body and significantly improves satiety.\n\nThis is not a complicated recipe. It takes ten minutes. What distinguishes it from basic oatmeal is intentionality: every ingredient has a reason.',
    yield: '1 serving',
    prep_time: '2 minutes',
    cook_time: '8 minutes',
    total_time: '10 minutes',
    difficulty: 'Easy',
    ingredients: [
      { amount: '½', unit: 'cup', ingredient: 'rolled oats', prep_note: null, optional: false },
      { amount: '1', unit: 'cup', ingredient: 'water', prep_note: 'or milk for richer oats', optional: false },
      { amount: '½', unit: 'tsp', ingredient: 'cinnamon', prep_note: 'ground', optional: false },
      { amount: '¼', unit: 'tsp', ingredient: 'cardamom', prep_note: 'ground', optional: false },
      { amount: '¼', unit: 'tsp', ingredient: 'ginger', prep_note: 'ground, or ½ tsp freshly grated', optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'ghee', prep_note: 'or coconut oil', optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'raw honey', prep_note: 'or maple syrup', optional: true },
      { amount: '1', unit: 'small', ingredient: 'banana', prep_note: 'sliced, or ¼ cup stewed fruit', optional: true },
    ],
    instructions: [
      { step: 1, text: 'Combine the oats, water (or milk), cinnamon, cardamom, and ginger in a small saucepan. Stir to combine.' },
      { step: 2, text: 'Bring to a gentle boil over medium heat, then reduce to low. Cook, stirring frequently, until the oats have absorbed the liquid and reached your preferred consistency — about 5 to 7 minutes.' },
      { step: 3, text: 'Remove from heat. Stir in the ghee or coconut oil — this is important. The fat carries the spice compounds and adds satiety that extends the feeling of fullness significantly.' },
      { step: 4, text: 'Transfer to a bowl. Top with banana or stewed fruit if using. Drizzle with honey or maple syrup. Eat warm.' },
    ],
    key_ingredient_benefits:
      '**Cinnamon:** Multiple clinical trials show cinnamon supplementation reduces fasting blood glucose and improves insulin sensitivity — particularly relevant when eating a carbohydrate-rich breakfast. Cinnamon\'s glycemic support means that adding it to oats modulates the very blood sugar response that oats alone might cause.\n\n**Cardamom:** Classified as a nervine in Ayurveda — calming to the nervous system. Adding it to a morning preparation transitions the meal from simple nutrition to a grounding ritual. Its digestive support (deepana) primes the gut for the day.\n\n**Ghee:** Provides butyric acid (fuel for gut lining cells) and carries the fat-soluble aromatic compounds from the spices into the body. The fat also slows gastric emptying, extending satiety and flattening the blood glucose curve from the oats.',
    why_this_works:
      'Cinnamon\'s glycemic-modulating effect is most active when consumed with carbohydrates — adding it to oats is therefore strategically sound. The ghee extends satiety beyond what carbohydrate alone can achieve. The warming spice combination supports digestive fire in the morning, when Ayurveda considers agni to be at its lowest.',
    substitutions: 'Any oats work — quick oats are fine, steel-cut need more time and liquid. Coconut oil replaces ghee for dairy-free. Stewed apple or pear can replace banana. Any warming spice can be added: nutmeg, cloves, or black pepper for a more assertive version.',
    serving_suggestions: 'Eat within 5 minutes of making — oats continue to absorb liquid and thicken. A cup of ginger tea alongside extends the warming, digestive-supportive theme of the meal.',
    storage_reheating: 'Not recommended for make-ahead — oats lose their texture. If necessary, store in the refrigerator and reheat with a splash of water, stirring frequently.',
    cultural_notes: 'The Ayurvedic principle of dinacharya — daily routine — places breakfast as a critical opportunity to set the tone for digestion throughout the day. A warm, spiced grain with fat represents ideal dinacharya breakfast practice: nourishing, warming, and digestively supportive.',
    tags: ['ayurveda', 'breakfast', 'oats', 'cinnamon', 'cardamom', 'blood-sugar', 'vegan', 'vegetarian', 'easy', 'morning', 'gut-health', 'warming'],
    seo_title: 'Cinnamon Cardamom Oats — Ayurvedic Spiced Breakfast Porridge',
    meta_description: 'A warming Ayurvedic oatmeal with cinnamon, cardamom, ginger, and ghee. A spiced breakfast that supports digestion and blood sugar balance.',
    published: true,
  },
  {
    title: 'Licorice Root & Ginger Throat Soother',
    slug: 'licorice-root-ginger-throat',
    subtitle: 'An ancient two-herb formula for sore throats and respiratory health',
    cultural_origin: 'Cross-Cultural',
    tradition: 'Cross-Cultural',
    headnote:
      'Every major traditional medicine system has a formula for sore throat and respiratory irritation that involves licorice root. In TCM, Gan Cao (licorice) moistens and soothes the throat. In Ayurveda, Yashtimadhu does the same. In European herbal medicine, licorice has been prescribed for bronchial complaints since the earliest medieval texts. The Greeks, Romans, Arabs, Chinese, and Ayurvedic physicians all arrived at the same conclusion through different intellectual paths.\n\nGinger accompanies it here because the two herbs are complementary: licorice cools and soothes inflamed mucous membranes; ginger warms and moves stagnant respiratory fluid. Together they address both the inflammation and the congestion that often accompany throat and upper respiratory complaints.\n\nThis preparation takes ten minutes and requires two readily available ingredients. It tastes genuinely pleasant — the sweetness of licorice balancing the bite of ginger — and has been produced in some form for at least two thousand years.',
    yield: '2 servings',
    prep_time: '2 minutes',
    cook_time: '15 minutes',
    total_time: '17 minutes',
    difficulty: 'Easy',
    ingredients: [
      { amount: '5', unit: 'grams', ingredient: 'dried licorice root', prep_note: 'sliced or broken into pieces; about 1 tablespoon', optional: false },
      { amount: '1', unit: 'inch', ingredient: 'ginger', prep_note: 'peeled and sliced into coins', optional: false },
      { amount: '2½', unit: 'cups', ingredient: 'water', prep_note: null, optional: false },
      { amount: '1', unit: 'tsp', ingredient: 'raw honey', prep_note: 'added after cooling; optional', optional: true },
      { amount: '1', unit: 'squeeze', ingredient: 'lemon', prep_note: 'optional', optional: true },
    ],
    instructions: [
      { step: 1, text: 'Combine the licorice root pieces, ginger slices, and water in a small saucepan.' },
      { step: 2, text: 'Bring to a boil, then reduce to a low simmer. Cook for 12 to 15 minutes — the water will reduce and turn a warm amber color as the licorice releases its compounds.' },
      { step: 3, text: 'Strain into two cups. The tea will be naturally sweet from the glycyrrhizin in licorice.' },
      { step: 4, text: 'Allow to cool slightly. Add honey and a squeeze of lemon if using. Drink warm, sipping slowly.' },
    ],
    key_ingredient_benefits:
      '**Licorice Root:** Glycyrrhizin, the primary bioactive compound, is demonstrably anti-inflammatory and antiviral in clinical research. DGL (deglycyrrhizinated licorice) is used in multiple clinical trials to treat peptic ulcers. Licorice root forms the coating base for many commercial throat syrups and lozenges — because it works.\n\n**Ginger:** The anti-inflammatory gingerols and shogaols in ginger complement licorice\'s soothing action by reducing prostaglandin synthesis — the same mechanism as NSAIDs, without the side effects at normal culinary doses. Ginger also warms respiratory tissues and promotes the movement of phlegm.',
    why_this_works:
      'Licorice soothes by coating and reducing inflammation in the mucous membranes of the throat. Ginger acts simultaneously to warm, improve circulation to the area, and provide independent anti-inflammatory support. The 15-minute simmer is necessary to extract glycyrrhizin and ginger\'s shogaols from their respective root structures — a shorter steep would produce a less effective preparation.',
    substitutions: 'Licorice root can be replaced with licorice tea bags (look for pure licorice, not anise-flavored). Fresh turmeric root can be added alongside ginger for additional anti-inflammatory support. Adding a cinnamon stick would complement both flavors and add circulatory support.',
    serving_suggestions: 'Drink 2 to 3 cups per day during acute throat irritation. Add to a thermos and sip throughout the day. Can be cooled and used as a base for popsicles when throat pain is severe.',
    storage_reheating: 'Store prepared tea in the refrigerator for up to 2 days. Reheat gently. Note: consult a healthcare provider if using regularly or in large amounts, as large doses of licorice root can affect blood pressure.',
    cultural_notes: 'Licorice root tea or decoction appears in traditional medicine from China to Persia to ancient Egypt. The convergence of independent cultures on the same plant for the same condition over thousands of years is one of the strongest forms of traditional medical evidence we have.',
    tags: ['ayurveda', 'tcm', 'tea', 'throat', 'respiratory', 'immune', 'anti-inflammatory', 'vegan', 'gluten-free', 'easy', 'healing', 'drinks'],
    seo_title: 'Licorice Root & Ginger Tea — Ancient Throat Soother Recipe',
    meta_description: 'A traditional licorice root and ginger tea for sore throats and respiratory health. Used across TCM, Ayurveda, and European herbalism.',
    published: true,
  },
]

// ─── TRADITIONS ───────────────────────────────────────────────────────────────

const traditions = [
  {
    name: 'Ayurveda',
    slug: 'ayurveda',
    region: 'South Asia — India, Sri Lanka, Nepal',
    philosophy:
      'Ayurveda — Sanskrit for "science of life" — is one of the world\'s oldest living medical systems, with a history spanning more than five thousand years. It originated in the Indian subcontinent and is documented in the Vedas, the oldest texts of the Hindu tradition, with its primary medical texts — the Charaka Samhita and Sushruta Samhita — compiled between 600 BCE and 200 CE.\n\nAt the heart of Ayurveda is a simple but profound principle: health is not the absence of disease, but a state of dynamic balance. The system describes three fundamental biological energies called doshas — Vata (air and ether), Pitta (fire and water), and Kapha (earth and water). Each person has a unique combination of these energies, called their prakriti or constitution. Disease occurs when this balance is disturbed; healing is the process of restoration.\n\nFood, in Ayurveda, is medicine. Not metaphorically — literally. Every food and herb is classified by its taste (rasa), energetic quality (virya), post-digestive effect (vipaka), and specific action (prabhava). A skilled Ayurvedic practitioner prescribes food as specifically as a pharmacist prescribes drugs.',
    food_principles:
      'Ayurvedic nutrition is built around several foundational principles that differ substantially from modern nutritional science:\n\n**Agni (Digestive Fire):** The concept of agni — digestive fire — is central. All health in Ayurveda flows from strong, well-functioning digestion. Foods that kindle agni (deepana) include ginger, black pepper, cumin, and long pepper. Foods that suppress agni — cold, heavy, processed foods — are considered the root of many diseases.\n\n**The Six Tastes:** Ayurveda recognizes six tastes — sweet, sour, salty, pungent, bitter, and astringent — and specifies how each affects the doshas. A balanced meal includes all six tastes. Sweet, sour, and salty increase Kapha and Pitta; pungent, bitter, and astringent reduce them.\n\n**Seasonal and Constitutional Eating:** Ayurveda adapts dietary recommendations to the season and the individual\'s constitution. What is nourishing for a cold-dry Vata constitution may be aggravating for a hot-sharp Pitta constitution. Eating with the seasons is considered essential for maintaining balance.\n\n**Food Combining:** Ayurveda specifies incompatible food combinations — milk and fish, for example, or fruit mixed with other foods — based on their different digestive rates and energetic properties.',
    common_ingredients: ['Turmeric', 'Ginger', 'Cardamom', 'Black Pepper', 'Cumin', 'Coriander', 'Fennel', 'Fenugreek', 'Ghee', 'Ashwagandha', 'Holy Basil', 'Licorice Root', 'Amla', 'Cinnamon', 'Saffron'],
    cooking_techniques: [
      'Tadka — tempering whole spices in ghee or oil at the start of cooking',
      'Slow simmering of dal, khichdi, and medicinal soups',
      'Dry roasting and grinding of spice blends',
      'Preparing rasayanas (herbal tonics in fat or honey)',
      'Making herbal ghee (medicated clarified butter)',
      'Sun-processing of preserves like gulkand and chyawanprash',
    ],
    representative_dishes: ['Khichdi', 'Golden milk (haldi doodh)', 'Chyawanprash', 'Triphala tea', 'CCF digestive tea', 'Ashwagandha moon milk', 'Tulsi tea', 'Rasam'],
    published: true,
  },
  {
    name: 'Traditional Chinese Medicine',
    slug: 'traditional-chinese-medicine',
    region: 'East Asia — China, Japan, Korea, Vietnam',
    philosophy:
      'Traditional Chinese Medicine (TCM) is a comprehensive system of medicine that has evolved over more than two thousand five hundred years in China, with documented evidence of its foundational texts — including the Huangdi Neijing (Yellow Emperor\'s Classic of Internal Medicine) — dating to between 300 and 100 BCE. It spread throughout East Asia and continues to be practiced alongside modern medicine in China, Japan, Korea, and increasingly worldwide.\n\nTCM understands the body as a dynamic system of energetic relationships rather than a collection of mechanical parts. At its center is the concept of Qi — often translated as vital energy or life force — which flows through the body along pathways called meridians. Health is the state of Qi flowing freely and in appropriate balance. Disease is Qi deficiency, stagnation, excess, or misdirection.\n\nFood in TCM is understood in terms of its energetic properties — warm, cool, neutral, hot, or cold — and its specific effects on the body\'s Qi, Blood, Yin, and Yang. This is not about temperature in the mouth but about how the food influences the body\'s internal climate after digestion.',
    food_principles:
      'TCM dietary therapy (shizhi) applies the system\'s principles of energetics to food:\n\n**Five Flavors:** TCM recognizes five flavors — sour, bitter, sweet, acrid (pungent), and salty — each of which enters and tonifies a specific organ system. Sour enters the Liver, bitter enters the Heart, sweet enters the Spleen, acrid enters the Lung, salty enters the Kidney.\n\n**Thermal Nature:** Every food has a thermal nature — warm, hot, neutral, cool, or cold — that reflects its energetic effect on the body\'s internal temperature and constitution. Someone with Yang deficiency (cold constitution) benefits from warming foods; someone with excess Heat benefits from cooling foods.\n\n**Eating for the Seasons:** TCM dietary practice follows seasonal rhythms closely. Spring calls for sour, upward-moving foods that support the Liver. Summer calls for bitter foods that clear heat and support the Heart. Autumn calls for pungent foods to open the Lung. Winter calls for salty, warming foods to build Kidney Yang.\n\n**Congee as Medicine:** Congee — long-cooked rice porridge — holds a unique therapeutic position in TCM as the most digestively accessible food, prescribed for illness, convalescence, and anyone whose digestive Qi is compromised.',
    common_ingredients: ['Ginger', 'Reishi Mushroom', 'Licorice Root', 'Cinnamon', 'Miso', 'Cloves', 'Cardamom', 'Cumin', 'Scallion', 'Sesame', 'Jujube Dates', 'Astragalus', 'Goji Berry', 'Black Sesame'],
    cooking_techniques: [
      'Long simmering of medicinal soups and bone broths (4 to 8 hours)',
      'Congee preparation (rice cooked in 8:1 water ratio for 90 minutes)',
      'Herbal decoctions (boiling herbs to extract medicinal compounds)',
      'Wok-based stir-frying over high heat',
      'Steaming — considered the healthiest cooking method for preserving Qi',
      'Fermentation (miso, soy sauce, vinegar, kimchi)',
    ],
    representative_dishes: ['Congee', 'Miso soup', 'Reishi mushroom broth', 'Ginger scallion soup', 'Eight treasure porridge', 'Bone broth with Chinese herbs', 'Five-spice braised dishes'],
    published: true,
  },
]

// ─── SEED ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('═══════════════════════════════════════')
  console.log(' Ancient Pantry — Full Content Seed')
  console.log('═══════════════════════════════════════\n')

  console.log('Seeding ingredients...')
  for (const ingredient of ingredients) {
    const { error } = await supabase
      .from('ingredients')
      .upsert(ingredient, { onConflict: 'slug' })
    if (error) {
      console.error(`  ❌ ${ingredient.name}: ${error.message}`)
      process.exit(1)
    }
    console.log(`  ✅ ${ingredient.name}`)
  }

  console.log('\nSeeding recipes...')
  for (const recipe of recipes) {
    const { error } = await supabase
      .from('recipes')
      .upsert(recipe, { onConflict: 'slug' })
    if (error) {
      console.error(`  ❌ ${recipe.title}: ${error.message}`)
      process.exit(1)
    }
    console.log(`  ✅ ${recipe.title}`)
  }

  console.log('\nSeeding traditions...')
  for (const tradition of traditions) {
    const { error } = await supabase
      .from('traditions')
      .upsert(tradition, { onConflict: 'slug' })
    if (error) {
      console.error(`  ❌ ${tradition.name}: ${error.message}`)
      process.exit(1)
    }
    console.log(`  ✅ ${tradition.name}`)
  }

  console.log('\n═══════════════════════════════════════')
  console.log(' Done.')
  console.log(' • 15 ingredients seeded')
  console.log(' • 8 recipes seeded')
  console.log(' • 2 traditions seeded')
  console.log('═══════════════════════════════════════')
}

seed()
