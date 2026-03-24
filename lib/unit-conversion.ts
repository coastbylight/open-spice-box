/**
 * Metric ↔ Imperial unit conversion for recipe ingredients.
 * Densities sourced from USDA FoodData Central and standard culinary references.
 */

export type UnitSystem = 'metric' | 'imperial'

// ─── Fraction display ────────────────────────────────────────────────────────

const FRACTIONS: { value: number; display: string }[] = [
  { value: 0,      display: ''  },
  { value: 1/8,    display: '⅛' },
  { value: 1/4,    display: '¼' },
  { value: 1/3,    display: '⅓' },
  { value: 1/2,    display: '½' },
  { value: 2/3,    display: '⅔' },
  { value: 3/4,    display: '¾' },
  { value: 7/8,    display: '⅞' },
  { value: 1,      display: ''  }, // sentinel — round up whole
]

/** Convert a decimal to the nearest cooking fraction, e.g. 2.8 → "2¾" */
function toFraction(decimal: number): string {
  if (decimal <= 0) return '0'
  const whole = Math.floor(decimal)
  const frac  = decimal - whole

  let best = FRACTIONS[0]
  let bestDiff = Math.abs(frac)
  for (const f of FRACTIONS) {
    const diff = Math.abs(frac - f.value)
    if (diff < bestDiff) { bestDiff = diff; best = f }
  }

  if (best.value === 1 || bestDiff < 0.04 && best.value === 1) {
    return String(whole + 1)
  }
  if (whole === 0) return best.display || '0'
  if (!best.display) return String(whole)
  return `${whole}${best.display}`
}

/** Round oz to clean display: ¼-steps for values < 4, nearest 0.5 above that */
function formatOz(oz: number): { amount: string; unit: string } {
  if (oz < 0.15) return { amount: '¼', unit: 'oz' }
  if (oz >= 16) {
    const lb = oz / 16
    const rounded = Math.round(lb * 4) / 4 // nearest ¼ lb
    return { amount: toFraction(rounded), unit: 'lb' }
  }
  // Round to nearest ¼ oz for small amounts, nearest 0.5 for larger
  const step = oz < 4 ? 0.25 : 0.5
  const rounded = Math.round(oz / step) * step
  return { amount: toFraction(rounded), unit: 'oz' }
}

// ─── Parse amount strings ─────────────────────────────────────────────────────

const UNICODE_FRACTIONS: Record<string, number> = {
  '¼': 1/4, '½': 1/2, '¾': 3/4,
  '⅓': 1/3, '⅔': 2/3,
  '⅛': 1/8, '⅜': 3/8, '⅝': 5/8, '⅞': 7/8,
}

/** Parse an amount string like "7", "1/2", "1 1/2", "2.5", "¾" → number */
export function parseAmount(amount: string): number {
  if (!amount) return 0
  amount = amount.trim()

  // Unicode fraction alone
  if (UNICODE_FRACTIONS[amount] !== undefined) return UNICODE_FRACTIONS[amount]

  // ASCII fraction alone: "3/4"
  if (/^\d+\/\d+$/.test(amount)) {
    const [n, d] = amount.split('/').map(Number)
    return n / d
  }

  // Whole + ASCII fraction: "1 3/4"
  const mixed = amount.match(/^(\d+)\s+(\d+)\/(\d+)$/)
  if (mixed) {
    return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3])
  }

  // Whole + unicode fraction: "1¾"
  for (const [sym, val] of Object.entries(UNICODE_FRACTIONS)) {
    if (amount.endsWith(sym)) {
      const whole = parseFloat(amount.slice(0, -sym.length)) || 0
      return whole + val
    }
  }

  return parseFloat(amount) || 0
}

// ─── Spice density table (g per level tsp) ───────────────────────────────────
// Sources: USDA FoodData Central, chefs-resources.com, traditionaloven.com

const DENSITY_TABLE: { keywords: string[]; gPerTsp: number }[] = [
  // Ground coriander
  { keywords: ['coriander powder', 'ground coriander', 'dhania powder', 'dhania pd'], gPerTsp: 1.8 },
  // Ground cumin
  { keywords: ['cumin powder', 'ground cumin', 'jeera powder'], gPerTsp: 2.1 },
  // Whole cumin seeds
  { keywords: ['cumin seed', 'jeera', 'whole cumin', 'cumin'], gPerTsp: 2.1 },
  // Turmeric
  { keywords: ['turmeric', 'haldi'], gPerTsp: 2.6 },
  // Kashmiri chili (lighter, coarser)
  { keywords: ['kashmiri chili', 'kashmiri chilli', 'kashmiri red', 'kashmiri mirch'], gPerTsp: 2.0 },
  // Red chili / cayenne
  { keywords: ['red chili powder', 'red chilli powder', 'chili powder', 'chilli powder', 'lal mirch', 'cayenne', 'red pepper powder', 'red pepper flakes'], gPerTsp: 1.8 },
  // Garam masala
  { keywords: ['garam masala'], gPerTsp: 3.0 },
  // Cardamom
  { keywords: ['cardamom powder', 'ground cardamom', 'elaichi powder', 'cardamom'], gPerTsp: 2.0 },
  // Cinnamon
  { keywords: ['cinnamon powder', 'ground cinnamon', 'cinnamon', 'dalchini'], gPerTsp: 2.3 },
  // Black pepper
  { keywords: ['black pepper', 'ground pepper', 'pepper powder', 'kali mirch'], gPerTsp: 2.3 },
  // White pepper
  { keywords: ['white pepper'], gPerTsp: 2.4 },
  // Ginger powder
  { keywords: ['ginger powder', 'ground ginger', 'dry ginger', 'dried ginger', 'sonth', 'saunth', 'adrak powder'], gPerTsp: 2.8 },
  // Ground fenugreek
  { keywords: ['fenugreek powder', 'ground fenugreek', 'methi powder'], gPerTsp: 3.0 },
  // Fenugreek seeds
  { keywords: ['fenugreek seed', 'methi seed', 'methi dana'], gPerTsp: 3.7 },
  // Cloves
  { keywords: ['clove powder', 'ground clove', 'cloves', 'laung'], gPerTsp: 2.1 },
  // Nutmeg
  { keywords: ['nutmeg', 'jaiphal'], gPerTsp: 2.2 },
  // Paprika
  { keywords: ['paprika', 'smoked paprika'], gPerTsp: 2.3 },
  // Amchur
  { keywords: ['amchur', 'dry mango powder', 'aamchur'], gPerTsp: 2.5 },
  // Chaat masala
  { keywords: ['chaat masala', 'chat masala'], gPerTsp: 3.0 },
  // Coriander seeds (whole)
  { keywords: ['coriander seed', 'whole coriander', 'sabut dhania'], gPerTsp: 1.8 },
  // Mustard seeds
  { keywords: ['mustard seed', 'rai', 'sarson'], gPerTsp: 3.0 },
  // Fennel seeds
  { keywords: ['fennel seed', 'saunf', 'fennel'], gPerTsp: 2.0 },
  // Poppy seeds
  { keywords: ['poppy seed', 'khus khus', 'posto'], gPerTsp: 2.8 },
  // Carom seeds
  { keywords: ['carom seed', 'ajwain', 'carom'], gPerTsp: 2.5 },
  // Nigella seeds
  { keywords: ['nigella seed', 'kalonji', 'nigella'], gPerTsp: 3.3 },
  // Sesame seeds
  { keywords: ['sesame seed', 'til', 'sesame'], gPerTsp: 3.0 },
  // Black peppercorns
  { keywords: ['peppercorn', 'black peppercorn', 'whole pepper'], gPerTsp: 3.0 },
  // Salt
  { keywords: ['salt'], gPerTsp: 6.0 },
  // Sugar
  { keywords: ['sugar'], gPerTsp: 4.2 },
  // Flour
  { keywords: ['maida', 'all-purpose flour', 'plain flour', 'wheat flour', 'flour'], gPerTsp: 2.6 },
  // Besan
  { keywords: ['besan', 'gram flour', 'chickpea flour'], gPerTsp: 1.9 },
  // Cornstarch
  { keywords: ['cornstarch', 'corn starch', 'cornflour', 'arrowroot'], gPerTsp: 2.7 },
  // Baking powder
  { keywords: ['baking powder'], gPerTsp: 4.0 },
  // Baking soda
  { keywords: ['baking soda', 'bicarbonate'], gPerTsp: 4.6 },
]

/** Look up g-per-tsp density for an ingredient name, or null if not found */
function lookupDensity(ingredientName: string): number | null {
  const lower = ingredientName.toLowerCase()
  for (const entry of DENSITY_TABLE) {
    if (entry.keywords.some(kw => lower.includes(kw))) {
      return entry.gPerTsp
    }
  }
  return null
}

// ─── Volume (ml) → imperial ───────────────────────────────────────────────────

const ML_PER_TSP  = 4.92892
const ML_PER_TBSP = 14.7868
const ML_PER_CUP  = 236.588
const ML_PER_FLOZ = 29.5735

function mlToImperial(ml: number): { amount: string; unit: string } {
  if (ml <= 0) return { amount: '0', unit: 'tsp' }

  if (ml < 5) {
    const tsp = ml / ML_PER_TSP
    return { amount: toFraction(Math.max(0.125, Math.round(tsp / 0.125) * 0.125)), unit: 'tsp' }
  }
  if (ml < 15) {
    const tbsp = ml / ML_PER_TBSP
    const rounded = Math.round(tbsp / 0.25) * 0.25
    return { amount: toFraction(rounded), unit: 'tbsp' }
  }
  if (ml < 60) {
    const floz = ml / ML_PER_FLOZ
    const rounded = Math.round(floz * 4) / 4
    return { amount: toFraction(rounded), unit: 'fl oz' }
  }
  if (ml < 960) {
    const cups = ml / ML_PER_CUP
    const rounded = Math.round(cups / 0.125) * 0.125
    return { amount: toFraction(rounded), unit: 'cup' }
  }
  const quarts = ml / (ML_PER_CUP * 4)
  const rounded = Math.round(quarts * 4) / 4
  return { amount: toFraction(rounded), unit: 'qt' }
}

// ─── g → imperial ─────────────────────────────────────────────────────────────

function gramsToImperial(
  grams: number,
  ingredientName: string
): { amount: string; unit: string } {
  if (grams <= 0) return { amount: '0', unit: 'oz' }

  const density = lookupDensity(ingredientName)

  if (density !== null) {
    // Convert via density: g / (g/tsp) = tsp
    const tsp = grams / density

    if (tsp < 3) {
      // Round to nearest ⅛ tsp
      const rounded = Math.max(0.125, Math.round(tsp / 0.125) * 0.125)
      return { amount: toFraction(rounded), unit: 'tsp' }
    }
    // Convert to tbsp (3 tsp = 1 tbsp)
    const tbsp = tsp / 3
    if (tbsp < 12) {
      // Round to nearest ¼ tbsp
      const rounded = Math.round(tbsp / 0.25) * 0.25
      if (rounded < 1) {
        // Very small tbsp — keep as tsp
        const tspRounded = Math.round(tsp / 0.25) * 0.25
        return { amount: toFraction(tspRounded), unit: 'tsp' }
      }
      return { amount: toFraction(rounded), unit: 'tbsp' }
    }
    // Large spice amounts → cups
    const cups = tsp / 48 // 48 tsp per cup
    return { amount: toFraction(Math.round(cups / 0.125) * 0.125), unit: 'cup' }
  }

  // No density → weight-based oz/lb
  const oz = grams * 0.035274
  return formatOz(oz)
}

// ─── Main conversion entry point ──────────────────────────────────────────────

/** Units that are already volume/count and need no conversion */
const PASS_THROUGH_UNITS = new Set([
  'tsp', 'tbsp', 'cup', 'cups', 'oz', 'fl oz', 'floz', 'lb', 'lbs',
  'piece', 'pieces', 'pcs', 'slice', 'slices',
  'clove', 'cloves', 'sprig', 'sprigs', 'leaf', 'leaves',
  'pinch', 'pinches', 'handful', 'handfuls',
  'pod', 'pods', 'stalk', 'stalks', 'bunch', 'bunches',
  'whole', 'half', 'halves', 'inch', 'cm',
])

export interface ConvertedIngredient {
  amount: string
  unit: string | null
}

/**
 * Convert a recipe ingredient amount/unit to the target unit system.
 * Pass-through units (tsp, tbsp, piece, etc.) are returned unchanged.
 */
export function convertIngredient(
  rawAmount: string,
  rawUnit: string | null,
  ingredientName: string,
  system: UnitSystem
): ConvertedIngredient {
  // If already metric and metric requested, or already imperial and imperial requested
  // → return as-is for pass-through units
  const unit = (rawUnit ?? '').toLowerCase().trim()

  if (PASS_THROUGH_UNITS.has(unit) || !rawUnit) {
    return { amount: rawAmount, unit: rawUnit }
  }

  if (system === 'metric') {
    // Already metric or pass-through
    return { amount: rawAmount, unit: rawUnit }
  }

  // Imperial conversion
  const value = parseAmount(rawAmount)
  if (value === 0) return { amount: rawAmount, unit: rawUnit }

  if (unit === 'g' || unit === 'gram' || unit === 'grams') {
    const result = gramsToImperial(value, ingredientName)
    return result
  }

  if (unit === 'ml' || unit === 'milliliter' || unit === 'milliliters' || unit === 'millilitre' || unit === 'millilitres') {
    const result = mlToImperial(value)
    return result
  }

  if (unit === 'kg' || unit === 'kilogram' || unit === 'kilograms') {
    const oz = value * 1000 * 0.035274
    const result = formatOz(oz)
    return result
  }

  if (unit === 'l' || unit === 'liter' || unit === 'liters' || unit === 'litre' || unit === 'litres') {
    const result = mlToImperial(value * 1000)
    return result
  }

  // Unknown unit — pass through unchanged
  return { amount: rawAmount, unit: rawUnit }
}
