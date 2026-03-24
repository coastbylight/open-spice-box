/**
 * Migration: parse ingredient strings → structured metric/imperial fields
 * Run: node scripts/migrate-ingredients.mjs [--dry-run]
 */

import { readFileSync } from 'fs'

try {
  const env = readFileSync('.env.local', 'utf8')
  for (const line of env.split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m) process.env[m[1].trim()] = m[2].trim()
  }
} catch {}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY
const DRY_RUN      = process.argv.includes('--dry-run')

// ─── Number patterns ──────────────────────────────────────────────────────────

const UNICODE_FRACS = '[\u00BC\u00BD\u00BE\u2153\u2154\u215B\u215C\u215D\u215E]'
const ASCII_FRAC    = '\\d+\\/\\d+'
const DECIMAL       = '\\d+(?:[,.]\\d+)?'
const SINGLE_NUM    = `(?:${DECIMAL}\\s*${UNICODE_FRACS}|${DECIMAL}\\s+${ASCII_FRAC}|${DECIMAL}${UNICODE_FRACS}|${DECIMAL}|${UNICODE_FRACS}|${ASCII_FRAC})`
const RANGE_NUM     = `${SINGLE_NUM}(?:\\s*[–\\-]\\s*${SINGLE_NUM})?`

// ─── Unit normalisation ───────────────────────────────────────────────────────

function normalizeUnit(u) {
  u = u.trim()
  if (/^(g|gram|grams)$/i.test(u))                             return 'g'
  if (/^(ml|milliliters?|millilitres?)$/i.test(u))             return 'ml'
  if (/^(kg|kilograms?)$/i.test(u))                            return 'kg'
  if (/^(l|L|liters?|litres?)$/i.test(u))                     return 'L'
  if (/^(mg|milligrams?)$/i.test(u))                           return 'mg'
  if (/^(tablespoons?|tbsp)$/i.test(u))                        return 'tbsp'
  if (/^(teaspoons?|tsp)$/i.test(u))                           return 'tsp'
  if (/^cups?$/i.test(u))                                      return 'cup'
  if (/^(fl\s*oz|fluid\s*ounces?)$/i.test(u))                  return 'fl oz'
  if (/^(oz|ounces?)$/i.test(u))                               return 'oz'
  if (/^(lbs?|pounds?)$/i.test(u))                             return 'lb'
  if (/^pinch(es)?$/i.test(u))                                 return 'pinch'
  if (/^handfuls?$/i.test(u))                                  return 'handful'
  return u.toLowerCase()
}

const METRIC_RE = /^(g|ml|kg|l|L|litre|liter|litres|liters|gram|grams|milliliters?|millilitres?|mg|milligrams?)\b/
const IMPERIAL_WORDS = [
  'tablespoons','tablespoon','tbsp',
  'teaspoons','teaspoon','tsp',
  'cups','cup',
  'fluid ounces','fluid ounce','fl oz',
  'ounces','ounce','oz',
  'pounds','pound','lbs','lb',
  'pinches','pinch',
  'handfuls','handful',
].sort((a, b) => b.length - a.length)
const IMPERIAL_RE = new RegExp(
  `^(${IMPERIAL_WORDS.map(u => u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
  'i'
)

// ─── Find first comma not inside parentheses ──────────────────────────────────

function firstCommaOutside(s) {
  let depth = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') depth++
    else if (s[i] === ')') depth--
    else if (s[i] === ',' && depth === 0) return i
  }
  return -1
}

// ─── Parse one ingredient string ──────────────────────────────────────────────

function parseIngredientString(raw) {
  const original = raw.trim()
  let rest = original

  let amount          = null
  let unit            = null
  let imperial_amount = null
  let imperial_unit   = null

  // 1. Leading number (including ranges "2–3")
  const numRe = new RegExp(`^(${RANGE_NUM})\\s*`)
  const numM  = rest.match(numRe)

  if (numM) {
    amount = numM[1].trim()
    rest   = rest.slice(numM[0].length)

    // 2. Metric unit immediately after number?
    const mU = rest.match(METRIC_RE)
    if (mU) {
      unit = normalizeUnit(mU[1])
      rest = rest.slice(mU[0].length).trimStart()
    } else {
      // Imperial unit?
      const iU = rest.match(IMPERIAL_RE)
      if (iU) {
        unit = normalizeUnit(iU[1])
        rest = rest.slice(iU[0].length).trimStart()
      }
      // else: pure count ("3 potatoes") — unit stays null
    }
  }

  const isMetric = unit && /^(g|ml|kg|L|mg)$/.test(unit)

  // 3. Extract parentheticals, capturing imperial hints
  rest = rest.replace(/\(([^)]*)\)/g, (_match, inner) => {
    inner = inner.trim()

    if (isMetric && !imperial_amount) {
      // (a) Volume hint: "about ¾ teaspoon", "⅔ cup", "about 3 tablespoons", "3½ tablespoons"
      const volRe = new RegExp(
        `^(?:about\\s+)?(${RANGE_NUM})\\s+(tablespoons?|tbsp|teaspoons?|tsp|cups?|fl\\s*oz|fluid\\s*ounces?|ounces?|oz|pounds?|lbs?)s?$`,
        'i'
      )
      const vM = inner.match(volRe)
      if (vM) {
        imperial_amount = vM[1].trim()
        imperial_unit   = normalizeUnit(vM[2])
        return ''  // remove from rest
      }

      // (b) Count hint: "about 3 medium onions", "2–3 chillies", "1 leaf", "3–4 pods"
      //     Must start with a number, unit must NOT be metric
      const countRe = new RegExp(`^(?:about\\s+)?(${RANGE_NUM})\\s+(.+)$`)
      const cM = inner.match(countRe)
      if (cM) {
        const possibleUnit = cM[2].trim()
        // Skip if this is a metric count (like "about 200 g")
        if (!/^(g|ml|kg|l|L)$/i.test(possibleUnit.split(/\s/)[0])) {
          imperial_amount = cM[1].trim()
          imperial_unit   = possibleUnit
          return ''
        }
      }
    }

    // Keep: *markdown*, descriptive notes, etc.
    return `(${inner})`
  })

  rest = rest.trim()

  // 4. Split name + prep_note on first comma NOT inside parens
  let ingredient = rest
  let prep_note  = null

  const ci = firstCommaOutside(rest)
  if (ci > 0) {
    ingredient = rest.slice(0, ci).trim()
    prep_note  = rest.slice(ci + 1).trim() || null
  }

  ingredient = ingredient.replace(/[.;]+$/, '').trim()

  // Edge case: if no leading number found, keep whole string as ingredient
  if (amount === null) {
    return { amount: null, unit: null, ingredient: original, prep_note: null, imperial_amount: null, imperial_unit: null }
  }

  return { amount, unit, ingredient, prep_note, imperial_amount, imperial_unit }
}

// ─── DB helpers ───────────────────────────────────────────────────────────────

async function fetchAll() {
  const url = `${SUPABASE_URL}/rest/v1/recipes?select=id,title,ingredients&order=title`
  const res = await fetch(url, {
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
  })
  if (!res.ok) throw new Error(`Fetch: ${res.status} ${await res.text()}`)
  return res.json()
}

async function updateRecipe(id, ingredients) {
  const url = `${SUPABASE_URL}/rest/v1/recipes?id=eq.${id}`
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json', Prefer: 'return=minimal',
    },
    body: JSON.stringify({ ingredients }),
  })
  if (!res.ok) throw new Error(`Update ${id}: ${res.status} ${await res.text()}`)
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const recipes = await fetchAll()
const totalIng = recipes.reduce((n, r) => n + r.ingredients.length, 0)
console.log(`Fetched ${recipes.length} recipes, ${totalIng} ingredients`)

let changed = 0

for (const recipe of recipes) {
  const newIngredients = recipe.ingredients.map(ing => {
    const p = parseIngredientString(ing.ingredient)
    return {
      amount:          p.amount,
      unit:            p.unit,
      ingredient:      p.ingredient,
      prep_note:       p.prep_note,
      optional:        ing.optional ?? false,
      imperial_amount: p.imperial_amount ?? null,
      imperial_unit:   p.imperial_unit   ?? null,
    }
  })

  if (DRY_RUN) {
    console.log(`\n=== ${recipe.title} ===`)
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const a = newIngredients[i]
      console.log(`  ${recipe.ingredients[i].ingredient}`)
      console.log(`  → [${a.amount ?? ''}] [${a.unit ?? ''}] "${a.ingredient}" | prep: ${a.prep_note ?? '—'} | imp: ${a.imperial_amount ?? '—'} ${a.imperial_unit ?? ''}`)
    }
  } else {
    await updateRecipe(recipe.id, newIngredients)
    process.stdout.write('.')
    changed++
  }
}

if (!DRY_RUN) console.log(`\n\nDone. ${changed} recipes migrated.`)
