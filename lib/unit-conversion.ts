/**
 * Metric ↔ Imperial unit conversion for recipe ingredients.
 *
 * Rules (imperial mode):
 *  - Spices / herbs / powders   → tsp / tbsp  (USDA density table)
 *  - Liquids (ml / L)           → tsp / tbsp / cup
 *  - Proteins (meat/fish/dairy) → oz / lb
 *  - Vegetables                 → oz / lb + "(about N items)" count note
 *  - Everything else            → stored imperial hint → or oz / lb
 */

export type UnitSystem = 'metric' | 'imperial'

// ─── Fraction rendering ───────────────────────────────────────────────────────

const FRACS = [
  { v: 0,   d: ''  },
  { v: 1/8, d: '⅛' },
  { v: 1/4, d: '¼' },
  { v: 1/3, d: '⅓' },
  { v: 1/2, d: '½' },
  { v: 2/3, d: '⅔' },
  { v: 3/4, d: '¾' },
  { v: 7/8, d: '⅞' },
  { v: 1,   d: ''  },
]

function toFraction(x: number): string {
  if (x <= 0) return '0'
  const whole = Math.floor(x)
  const frac  = x - whole
  let best = FRACS[0], bestDiff = Infinity
  for (const f of FRACS) {
    const d = Math.abs(frac - f.v)
    if (d < bestDiff) { bestDiff = d; best = f }
  }
  if (best.v === 1) return String(whole + 1)
  if (whole === 0)  return best.d || '0'
  if (!best.d)      return String(whole)
  return `${whole}${best.d}`
}

function formatOz(oz: number): { amount: string; unit: string } {
  if (oz < 0.15) return { amount: '¼', unit: 'oz' }
  // Prefer lb for anything over 8 oz (½ lb)
  if (oz >= 8)   return { amount: toFraction(Math.max(0.25, Math.round((oz / 16) * 4) / 4)), unit: 'lb' }
  const step = oz < 4 ? 0.25 : 0.5
  return { amount: toFraction(Math.round(oz / step) * step), unit: 'oz' }
}

// ─── Parse amount strings ("1/2", "1½", "2–3", "200") ────────────────────────

const UF: Record<string, number> = {
  '¼':1/4,'½':1/2,'¾':3/4,'⅓':1/3,'⅔':2/3,'⅛':1/8,'⅜':3/8,'⅝':5/8,'⅞':7/8,
}

export function parseAmount(s: string): number {
  if (!s) return 0
  s = s.trim()
  if (UF[s] !== undefined) return UF[s]
  if (/^\d+\/\d+$/.test(s)) { const [n,d]=s.split('/').map(Number); return n/d }
  const mx = s.match(/^(\d+)\s+(\d+)\/(\d+)$/)
  if (mx) return +mx[1] + +mx[2] / +mx[3]
  for (const [sym,val] of Object.entries(UF)) {
    if (s.endsWith(sym)) return (parseFloat(s.slice(0,-sym.length))||0) + val
  }
  const rx = s.match(/^([\d.]+)\s*[–-]\s*([\d.]+)$/)
  if (rx) return (parseFloat(rx[1]) + parseFloat(rx[2])) / 2
  return parseFloat(s) || 0
}

// ─── Spice density table (g per level tsp, USDA FoodData Central) ────────────

const DENSITY: { kw: string[]; gpt: number }[] = [
  { kw:['coriander powder','ground coriander','dhania powder','dhania pd','coriander pd'], gpt:1.8 },
  { kw:['cumin powder','ground cumin','jeera powder'], gpt:2.1 },
  { kw:['cumin seed','whole cumin'], gpt:2.1 },
  { kw:['turmeric','haldi'], gpt:2.6 },
  { kw:['kashmiri chili','kashmiri chilli','kashmiri red','kashmiri mirch'], gpt:2.0 },
  { kw:['red chili powder','red chilli powder','chili powder','chilli powder','lal mirch','cayenne'], gpt:1.8 },
  { kw:['garam masala'], gpt:3.0 },
  { kw:['cardamom powder','ground cardamom','elaichi powder','green cardamom powder'], gpt:2.0 },
  { kw:['cinnamon powder','ground cinnamon','cinnamon','dalchini'], gpt:2.3 },
  { kw:['black pepper','ground pepper','pepper powder','kali mirch'], gpt:2.3 },
  { kw:['white pepper'], gpt:2.4 },
  { kw:['ginger powder','ground ginger','dry ginger','dried ginger','sonth','saunth'], gpt:2.8 },
  { kw:['fenugreek powder','ground fenugreek','methi powder'], gpt:3.0 },
  { kw:['fenugreek seed','methi seed','methi dana','methi seeds'], gpt:3.7 },
  { kw:['clove powder','ground clove','cloves','laung'], gpt:2.1 },
  { kw:['nutmeg','jaiphal'], gpt:2.2 },
  { kw:['paprika','smoked paprika'], gpt:2.3 },
  { kw:['amchur','dry mango powder','aamchur','amchoor'], gpt:2.5 },
  { kw:['chaat masala','chat masala'], gpt:3.0 },
  { kw:['coriander seed','whole coriander','sabut dhania','coriander seeds'], gpt:1.8 },
  { kw:['mustard seed','rai','sarson','mustard seeds'], gpt:3.0 },
  { kw:['fennel seed','saunf','fennel seeds'], gpt:2.0 },
  { kw:['poppy seed','khus khus','posto','poppy seeds'], gpt:2.8 },
  { kw:['carom seed','ajwain','carom seeds'], gpt:2.5 },
  { kw:['nigella seed','kalonji','nigella seeds'], gpt:3.3 },
  { kw:['sesame seed','til','sesame seeds'], gpt:3.0 },
  { kw:['peppercorn','black peppercorn','whole pepper','peppercorns'], gpt:3.0 },
  { kw:['salt'], gpt:6.0 },
  { kw:['sugar'], gpt:4.2 },
  { kw:['maida','all-purpose flour','plain flour','wheat flour'], gpt:2.6 },
  { kw:['besan','gram flour','chickpea flour'], gpt:1.9 },
  { kw:['cornstarch','corn starch','cornflour','arrowroot'], gpt:2.7 },
  { kw:['baking powder'], gpt:4.0 },
  { kw:['baking soda','bicarbonate'], gpt:4.6 },
  { kw:['star anise'], gpt:1.9 },
  { kw:['asafoetida','hing'], gpt:2.8 },
  { kw:['mace','javitri'], gpt:1.8 },

  // ── Fresh aromatics & pastes ─────────────────────────────────────────────
  // Pastes are dense (~5 g/tsp); chopped fresh is lighter
  { kw:['ginger-garlic paste','ginger garlic paste'], gpt:5.0 },
  { kw:['ginger paste','adrak paste'],                gpt:5.0 },
  { kw:['garlic paste','lehsun paste'],                gpt:5.0 },
  { kw:['chilli paste','chili paste','green chilli paste','green chili paste'], gpt:5.0 },
  { kw:['tamarind paste','imli paste'],               gpt:6.0 },
  { kw:['tomato paste'],                              gpt:6.5 },

  // Fresh ginger & garlic (chopped/minced/julienned)
  { kw:['fresh ginger','ginger','adrak'],             gpt:2.0 },
  { kw:['fresh garlic','garlic','lehsun'],             gpt:2.0 },

  // Green chillies / fresh chillies (sliced or chopped)
  { kw:['green chilli','green chili','fresh chilli','fresh chili','hari mirch'], gpt:2.0 },
  { kw:['red chilli','fresh red chilli','red chili'],  gpt:2.0 },

  // Fresh herbs (loosely packed, roughly chopped — very low density)
  { kw:['fresh coriander','fresh cilantro','coriander leaves','cilantro','dhania'],   gpt:0.4 },
  { kw:['fresh mint','pudina','mint leaves'],          gpt:0.35 },
  { kw:['fresh curry leaves','curry leaves','kadi patta'], gpt:0.3 },
  { kw:['fresh dill','suwa'],                          gpt:0.35 },
  { kw:['fresh parsley','parsley'],                    gpt:0.4 },
  { kw:['fresh basil','basil'],                        gpt:0.35 },
  { kw:['spring onion','green onion','scallion','hara pyaz'], gpt:1.0 },
]

function spiceDensity(name: string): number | null {
  const l = name.toLowerCase()
  for (const e of DENSITY) if (e.kw.some(k => l.includes(k))) return e.gpt
  return null
}

function gramsToSpice(g: number, density: number): { amount: string; unit: string } {
  const tsp  = g / density
  const tbsp = tsp / 3    // 3 tsp = 1 tbsp
  const cups = tbsp / 16  // 16 tbsp = 1 cup

  if (cups >= 0.25) {
    // Round to nearest ⅛ cup (2 tbsp)
    return { amount: toFraction(Math.round(cups / 0.125) * 0.125), unit: 'cup' }
  }
  if (tbsp >= 1) {
    return { amount: toFraction(Math.round(tbsp / 0.25) * 0.25), unit: 'tbsp' }
  }
  return { amount: toFraction(Math.max(0.125, Math.round(tsp / 0.125) * 0.125)), unit: 'tsp' }
}

// ─── Protein keywords (always oz / lb) ───────────────────────────────────────

const PROTEIN_KW = [
  'mutton','lamb','chicken','beef','pork','veal','duck','goat','turkey',
  'quail','rabbit','bateyr','venison','boar',
  'fish','salmon','tuna','cod','bhetki','tilapia','mackerel','pomfret',
  'kingfish','rohu','catla','hilsa','herring','sardine','anchovy',
  'prawn','shrimp','crab','lobster','scallop','squid','octopus',
  'mussel','clam','oyster','calamari','jhinga',
  'kidney','liver','heart','tripe','offal','kaleji','gurda',
  'tongue','bone','brisket','oxtail','tendon',
  'paneer','cheese','ricotta','halloumi','cottage cheese',
  'mince','keema','kheema','sausage','tofu',
]

function isProtein(name: string): boolean {
  const l = name.toLowerCase()
  return PROTEIN_KW.some(k => l.includes(k))
}

// ─── Vegetable count table (g per average item) ───────────────────────────────

const VEG_COUNTS: { kw: string[]; gEach: number; singular: string; plural: string }[] = [
  { kw:['potato','potatoes','aloo'],          gEach:150,  singular:'potato',       plural:'potatoes'       },
  { kw:['onion','onions','pyaaz','pyaz'],      gEach:150,  singular:'onion',        plural:'onions'         },
  { kw:['tomato','tomatoes'],                 gEach:120,  singular:'tomato',        plural:'tomatoes'       },
  { kw:['carrot','carrots','gajar'],          gEach:65,   singular:'carrot',        plural:'carrots'        },
  { kw:['cauliflower'],                       gEach:550,  singular:'head',          plural:'heads'          },
  { kw:['cabbage'],                           gEach:700,  singular:'head',          plural:'heads'          },
  { kw:['aubergine','eggplant','brinjal','baingan'], gEach:280, singular:'eggplant', plural:'eggplants'    },
  { kw:['bell pepper','capsicum','shimla mirch'],    gEach:150, singular:'pepper',  plural:'peppers'        },
  { kw:['zucchini','courgette'],              gEach:170,  singular:'zucchini',      plural:'zucchinis'      },
  { kw:['lemon'],                             gEach:60,   singular:'lemon',         plural:'lemons'         },
  { kw:['lime'],                              gEach:45,   singular:'lime',          plural:'limes'          },
  { kw:['pumpkin','kaddu'],                   gEach:800,  singular:'small pumpkin', plural:'small pumpkins' },
  { kw:['bottle gourd','lauki'],              gEach:500,  singular:'gourd',         plural:'gourds'         },
  { kw:['bitter gourd','karela'],             gEach:80,   singular:'bitter gourd',  plural:'bitter gourds'  },
  { kw:['radish','mooli'],                    gEach:80,   singular:'radish',        plural:'radishes'       },
  { kw:['apple'],                              gEach:180,  singular:'apple',         plural:'apples'         },
]

// ─── Dry goods / uncategorized → oz / lb (no count note) ──────────────────────

const DRY_GOODS_KW = [
  'noodle','noodles','vermicelli','soba','udon','ramen','rice stick',
  'bean sprout','sprouts','mung bean','beansprout',
  'flour','cornstarch','corn starch','cornflour','rice flour',
  'sugar','rock sugar','palm sugar','brown sugar','white sugar',
  'coconut','desiccated coconut','shredded coconut',
  'tamarind','cashew','peanut butter','sesame paste',
  'ghee','butter','lard','yogurt','yoghurt','curd','cream','hung yogurt',
  'dashi','miso','laksa paste',
]

function isDryGood(name: string): boolean {
  const l = name.toLowerCase()
  return DRY_GOODS_KW.some(k => l.includes(k))
}

function vegCountNote(name: string, grams: number): string | null {
  const l = name.toLowerCase()
  for (const v of VEG_COUNTS) {
    if (v.kw.some(k => l.includes(k))) {
      const count = grams / v.gEach
      if (count < 0.5) return null
      // Round to a ½-step range like "2–3" or single "1"
      const lo = Math.floor(count * 2) / 2
      const hi = Math.ceil(count * 2) / 2
      const word = hi <= 1 ? v.singular : v.plural
      if (lo === hi || Math.abs(lo - hi) < 0.01) {
        return `about ${toFraction(lo)} ${word}`
      }
      return `about ${toFraction(lo)}–${toFraction(hi)} ${word}`
    }
  }
  return null
}

function isVegetable(name: string): boolean {
  const l = name.toLowerCase()
  return VEG_COUNTS.some(v => v.kw.some(k => l.includes(k)))
}

// ─── Volume (ml) → imperial ───────────────────────────────────────────────────

const ML_TSP=4.92892, ML_TBSP=14.7868, ML_CUP=236.588, ML_FLOZ=29.5735

function mlToImperial(ml: number): { amount: string; unit: string } {
  if (ml <= 0) return { amount:'0', unit:'tsp' }
  if (ml < 5)   return { amount: toFraction(Math.max(0.125, Math.round((ml/ML_TSP)/0.125)*0.125)),  unit:'tsp'  }
  if (ml < 15)  return { amount: toFraction(Math.round((ml/ML_TBSP)/0.25)*0.25), unit:'tbsp' }
  if (ml < 60)  return { amount: toFraction(Math.round((ml/ML_FLOZ)*4)/4),       unit:'fl oz' }
  if (ml < 960) return { amount: toFraction(Math.round((ml/ML_CUP)/0.125)*0.125), unit:'cup' }
  return { amount: toFraction(Math.round((ml/(ML_CUP*4))*4)/4), unit:'qt' }
}

// ─── Pass-through units ───────────────────────────────────────────────────────

const PASS_THROUGH = new Set([
  'tsp','tbsp','cup','cups','oz','fl oz','floz','lb','lbs',
  'pinch','pinches','handful','handfuls',
  'piece','pieces','pcs','slice','slices',
  'clove','cloves','sprig','sprigs','leaf','leaves',
  'pod','pods','stalk','stalks','bunch','bunches',
  'whole','half','halves','inch','cm','stick','sticks',
])

// Imperial units stored in the DB hint — if the stored unit is one of these it's
// a volume/weight hint, not a count hint
const VOLUME_HINT_UNITS = new Set([
  'tsp','tbsp','cup','cups','oz','fl oz','lb','pint','quart','qt',
])

// ─── Public interface ─────────────────────────────────────────────────────────

export interface ConvertedIngredient {
  amount: string
  unit: string | null
  /** "(about 3 potatoes)" count note shown after ingredient name in imperial mode */
  countNote?: string
}

export function convertIngredient(
  rawAmount:      string | null,
  rawUnit:        string | null,
  ingredientName: string,
  system:         UnitSystem,
  imperialAmount?: string | null,
  imperialUnit?:   string | null,
): ConvertedIngredient {
  const amount = rawAmount ?? ''
  const unit   = (rawUnit ?? '').toLowerCase().trim()

  // No unit or pass-through unit — identical in both modes
  if (!rawUnit || PASS_THROUGH.has(unit)) {
    return { amount, unit: rawUnit }
  }

  // Metric mode — return raw stored values
  if (system === 'metric') {
    return { amount, unit: rawUnit }
  }

  // ── Imperial conversion ─────────────────────────────────────────────────

  const isGrams = unit === 'g' || unit === 'gram' || unit === 'grams'
  const isKg    = unit === 'kg' || unit === 'kilogram' || unit === 'kilograms'
  const isMl    = unit === 'ml' || unit === 'milliliter' || unit === 'milliliters' ||
                  unit === 'millilitre' || unit === 'millilitres'
  const isL     = unit === 'l' || unit === 'liter' || unit === 'liters' ||
                  unit === 'litre' || unit === 'litres'

  // ── Liquids: always tsp / tbsp / cup ───────────────────────────────────
  if (isMl) return mlToImperial(parseAmount(amount))
  if (isL)  return mlToImperial(parseAmount(amount) * 1000)

  // ── Weight conversions (g / kg) ─────────────────────────────────────────
  if (isGrams || isKg) {
    const grams = isKg
      ? parseAmount(amount) * 1000
      : parseAmount(amount)

    // 1. Spices / herbs / powders → tsp / tbsp
    const density = spiceDensity(ingredientName)
    if (density !== null) return gramsToSpice(grams, density)

    // 2. Proteins → oz / lb (no count note)
    if (isProtein(ingredientName)) return formatOz(grams * 0.035274)

    // 3. Vegetables → oz / lb + count note
    if (isVegetable(ingredientName)) {
      const ozLb = formatOz(grams * 0.035274)
      // Prefer stored count hint (e.g. "3 medium onions") over calculated guess
      const storedIsCount = imperialUnit && !VOLUME_HINT_UNITS.has(imperialUnit.toLowerCase())
      const countNote = storedIsCount && imperialAmount
        ? `about ${imperialAmount} ${imperialUnit}`
        : vegCountNote(ingredientName, grams) ?? undefined
      return { ...ozLb, countNote }
    }

    // 4. Dry goods / uncategorized bulk items → oz / lb
    if (isDryGood(ingredientName)) return formatOz(grams * 0.035274)

    // 5. Everything else:
    //    — if stored hint is a volume/weight unit → use it (e.g. "⅔ cup yogurt")
    //    — else → oz / lb
    if (imperialAmount && imperialUnit && VOLUME_HINT_UNITS.has(imperialUnit.toLowerCase())) {
      return { amount: imperialAmount, unit: imperialUnit }
    }
    return formatOz(grams * 0.035274)
  }

  // Unknown unit — pass through unchanged
  return { amount, unit: rawUnit }
}
