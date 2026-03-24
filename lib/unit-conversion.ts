/**
 * Metric ↔ Imperial unit conversion for recipe ingredients.
 * Spice densities sourced from USDA FoodData Central.
 *
 * Strategy:
 *  - Known spices (density table match): always use dynamic tsp/tbsp math
 *  - Other g/kg ingredients: use pre-stored imperial hint if available, else oz/lb
 *  - ml/L: dynamic tsp/tbsp/cup conversion
 *  - Pass-through units (tsp, tbsp, cup, piece, clove…): unchanged in both modes
 */

export type UnitSystem = 'metric' | 'imperial'

// ─── Fraction display ─────────────────────────────────────────────────────────

const FRACTIONS = [
  { v: 0,    d: ''  },
  { v: 1/8,  d: '⅛' },
  { v: 1/4,  d: '¼' },
  { v: 1/3,  d: '⅓' },
  { v: 1/2,  d: '½' },
  { v: 2/3,  d: '⅔' },
  { v: 3/4,  d: '¾' },
  { v: 7/8,  d: '⅞' },
  { v: 1,    d: ''  },   // sentinel — bump whole
]

function toFraction(x: number): string {
  if (x <= 0) return '0'
  const whole = Math.floor(x)
  const frac  = x - whole
  let best = FRACTIONS[0], bestDiff = Infinity
  for (const f of FRACTIONS) {
    const d = Math.abs(frac - f.v)
    if (d < bestDiff) { bestDiff = d; best = f }
  }
  if (best.v === 1) return String(whole + 1)
  if (whole === 0) return best.d || '0'
  if (!best.d) return String(whole)
  return `${whole}${best.d}`
}

function formatOz(oz: number): { amount: string; unit: string } {
  if (oz < 0.15) return { amount: '¼', unit: 'oz' }
  if (oz >= 16)  {
    const lb = Math.round((oz / 16) * 4) / 4
    return { amount: toFraction(lb), unit: 'lb' }
  }
  const step   = oz < 4 ? 0.25 : 0.5
  const rounded = Math.round(oz / step) * step
  return { amount: toFraction(rounded), unit: 'oz' }
}

// ─── Parse amount strings ─────────────────────────────────────────────────────

const UNICODE_FRACS: Record<string, number> = {
  '¼': 1/4, '½': 1/2, '¾': 3/4,
  '⅓': 1/3, '⅔': 2/3,
  '⅛': 1/8, '⅜': 3/8, '⅝': 5/8, '⅞': 7/8,
}

export function parseAmount(s: string): number {
  if (!s) return 0
  s = s.trim()
  if (UNICODE_FRACS[s] !== undefined) return UNICODE_FRACS[s]
  if (/^\d+\/\d+$/.test(s)) {
    const [n, d] = s.split('/').map(Number)
    return n / d
  }
  const mixed = s.match(/^(\d+)\s+(\d+)\/(\d+)$/)
  if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3])
  for (const [sym, val] of Object.entries(UNICODE_FRACS)) {
    if (s.endsWith(sym)) {
      const whole = parseFloat(s.slice(0, -sym.length)) || 0
      return whole + val
    }
  }
  // Range (e.g. "2–3"): use the midpoint
  const range = s.match(/^([\d.]+)\s*[–-]\s*([\d.]+)$/)
  if (range) return (parseFloat(range[1]) + parseFloat(range[2])) / 2
  return parseFloat(s) || 0
}

// ─── Spice density table (g per level tsp, USDA-sourced) ─────────────────────

const DENSITY_TABLE: { keywords: string[]; gPerTsp: number }[] = [
  { keywords: ['coriander powder','ground coriander','dhania powder','dhania pd','coriander pd'], gPerTsp: 1.8 },
  { keywords: ['cumin powder','ground cumin','jeera powder'], gPerTsp: 2.1 },
  { keywords: ['cumin seed','jeera','whole cumin'], gPerTsp: 2.1 },
  { keywords: ['turmeric','haldi'], gPerTsp: 2.6 },
  { keywords: ['kashmiri chili','kashmiri chilli','kashmiri red','kashmiri mirch'], gPerTsp: 2.0 },
  { keywords: ['red chili powder','red chilli powder','chili powder','chilli powder','lal mirch','cayenne','red pepper powder'], gPerTsp: 1.8 },
  { keywords: ['garam masala'], gPerTsp: 3.0 },
  { keywords: ['cardamom powder','ground cardamom','elaichi powder','green cardamom powder'], gPerTsp: 2.0 },
  { keywords: ['cinnamon powder','ground cinnamon','cinnamon','dalchini'], gPerTsp: 2.3 },
  { keywords: ['black pepper','ground pepper','pepper powder','kali mirch'], gPerTsp: 2.3 },
  { keywords: ['white pepper'], gPerTsp: 2.4 },
  { keywords: ['ginger powder','ground ginger','dry ginger','dried ginger','sonth','saunth'], gPerTsp: 2.8 },
  { keywords: ['fenugreek powder','ground fenugreek','methi powder'], gPerTsp: 3.0 },
  { keywords: ['fenugreek seed','methi seed','methi dana','methi seeds'], gPerTsp: 3.7 },
  { keywords: ['clove powder','ground clove','cloves','laung'], gPerTsp: 2.1 },
  { keywords: ['nutmeg','jaiphal'], gPerTsp: 2.2 },
  { keywords: ['paprika','smoked paprika'], gPerTsp: 2.3 },
  { keywords: ['amchur','dry mango powder','aamchur'], gPerTsp: 2.5 },
  { keywords: ['chaat masala','chat masala'], gPerTsp: 3.0 },
  { keywords: ['coriander seed','whole coriander','sabut dhania','coriander seeds'], gPerTsp: 1.8 },
  { keywords: ['mustard seed','rai','sarson','mustard seeds'], gPerTsp: 3.0 },
  { keywords: ['fennel seed','saunf','fennel seeds'], gPerTsp: 2.0 },
  { keywords: ['poppy seed','khus khus','posto','poppy seeds'], gPerTsp: 2.8 },
  { keywords: ['carom seed','ajwain','carom seeds'], gPerTsp: 2.5 },
  { keywords: ['nigella seed','kalonji','nigella seeds'], gPerTsp: 3.3 },
  { keywords: ['sesame seed','til','sesame seeds'], gPerTsp: 3.0 },
  { keywords: ['peppercorn','black peppercorn','whole pepper','peppercorns'], gPerTsp: 3.0 },
  { keywords: ['salt'], gPerTsp: 6.0 },
  { keywords: ['sugar'], gPerTsp: 4.2 },
  { keywords: ['maida','all-purpose flour','plain flour','wheat flour'], gPerTsp: 2.6 },
  { keywords: ['besan','gram flour','chickpea flour'], gPerTsp: 1.9 },
  { keywords: ['cornstarch','corn starch','cornflour','arrowroot'], gPerTsp: 2.7 },
  { keywords: ['baking powder'], gPerTsp: 4.0 },
  { keywords: ['baking soda','bicarbonate'], gPerTsp: 4.6 },
  { keywords: ['star anise'], gPerTsp: 1.9 },
  { keywords: ['asafoetida','hing'], gPerTsp: 2.8 },
  { keywords: ['dried mango','amchoor'], gPerTsp: 2.5 },
  { keywords: ['mace','javitri'], gPerTsp: 1.8 },
]

function lookupDensity(name: string): number | null {
  const lower = name.toLowerCase()
  for (const entry of DENSITY_TABLE) {
    if (entry.keywords.some(kw => lower.includes(kw))) return entry.gPerTsp
  }
  return null
}

// ─── Volume → imperial ────────────────────────────────────────────────────────

const ML_PER_TSP  = 4.92892
const ML_PER_TBSP = 14.7868
const ML_PER_CUP  = 236.588
const ML_PER_FLOZ = 29.5735

function mlToImperial(ml: number): { amount: string; unit: string } {
  if (ml <= 0) return { amount: '0', unit: 'tsp' }
  if (ml < 5) {
    const tsp = Math.max(0.125, Math.round((ml / ML_PER_TSP) / 0.125) * 0.125)
    return { amount: toFraction(tsp), unit: 'tsp' }
  }
  if (ml < 15) {
    const tbsp = Math.round((ml / ML_PER_TBSP) / 0.25) * 0.25
    return { amount: toFraction(tbsp), unit: 'tbsp' }
  }
  if (ml < 60) {
    const floz = Math.round((ml / ML_PER_FLOZ) * 4) / 4
    return { amount: toFraction(floz), unit: 'fl oz' }
  }
  if (ml < 960) {
    const cups = Math.round((ml / ML_PER_CUP) / 0.125) * 0.125
    return { amount: toFraction(cups), unit: 'cup' }
  }
  const qt = Math.round((ml / (ML_PER_CUP * 4)) * 4) / 4
  return { amount: toFraction(qt), unit: 'qt' }
}

// ─── Grams → imperial (spice path) ───────────────────────────────────────────

function gramsToSpice(grams: number, density: number): { amount: string; unit: string } {
  const tsp = grams / density
  if (tsp < 3) {
    const r = Math.max(0.125, Math.round(tsp / 0.125) * 0.125)
    return { amount: toFraction(r), unit: 'tsp' }
  }
  const tbsp = tsp / 3
  if (tbsp >= 1) {
    const r = Math.round(tbsp / 0.25) * 0.25
    return { amount: toFraction(r), unit: 'tbsp' }
  }
  const r = Math.round(tsp / 0.25) * 0.25
  return { amount: toFraction(r), unit: 'tsp' }
}

// ─── Pass-through units (never converted) ────────────────────────────────────

const PASS_THROUGH = new Set([
  'tsp','tbsp','cup','cups','oz','fl oz','floz','lb','lbs',
  'pinch','pinches','handful','handfuls',
  'piece','pieces','pcs','slice','slices',
  'clove','cloves','sprig','sprigs','leaf','leaves',
  'pod','pods','stalk','stalks','bunch','bunches',
  'whole','half','halves','inch','cm','stick','sticks',
])

export interface ConvertedIngredient {
  amount: string
  unit: string | null
}

// ─── Main entry point ─────────────────────────────────────────────────────────

export function convertIngredient(
  rawAmount: string | null,
  rawUnit:   string | null,
  ingredientName: string,
  system: UnitSystem,
  imperialAmount?: string | null,
  imperialUnit?:   string | null,
): ConvertedIngredient {
  const amount = rawAmount ?? ''
  const unit   = (rawUnit ?? '').toLowerCase().trim()

  // No unit or pass-through unit — show as-is in both modes
  if (!rawUnit || PASS_THROUGH.has(unit)) {
    return { amount, unit: rawUnit }
  }

  if (system === 'metric') {
    return { amount, unit: rawUnit }
  }

  // ── Imperial conversion ──────────────────────────────────────────────────

  if (unit === 'g' || unit === 'gram' || unit === 'grams') {
    const grams   = parseAmount(amount)
    const density = lookupDensity(ingredientName)

    // Known spice: always use dynamic density-based conversion (accurate)
    if (density !== null) {
      return gramsToSpice(grams, density)
    }

    // Non-spice solid: use stored imperial hint if available
    if (imperialAmount && imperialUnit) {
      return { amount: imperialAmount, unit: imperialUnit }
    }

    // Fallback: weight in oz/lb
    return formatOz(grams * 0.035274)
  }

  if (unit === 'ml' || unit === 'milliliter' || unit === 'milliliters' ||
      unit === 'millilitre' || unit === 'millilitres') {
    // Use stored hint if available (e.g. "⅔ cup" specified in original recipe)
    if (imperialAmount && imperialUnit) {
      return { amount: imperialAmount, unit: imperialUnit }
    }
    return mlToImperial(parseAmount(amount))
  }

  if (unit === 'kg' || unit === 'kilogram' || unit === 'kilograms') {
    if (imperialAmount && imperialUnit) {
      return { amount: imperialAmount, unit: imperialUnit }
    }
    return formatOz(parseAmount(amount) * 1000 * 0.035274)
  }

  if (unit === 'l' || unit === 'liter' || unit === 'liters' ||
      unit === 'litre' || unit === 'litres') {
    if (imperialAmount && imperialUnit) {
      return { amount: imperialAmount, unit: imperialUnit }
    }
    return mlToImperial(parseAmount(amount) * 1000)
  }

  // Unknown unit — pass through
  return { amount, unit: rawUnit }
}
