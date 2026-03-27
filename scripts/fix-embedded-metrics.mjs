/**
 * Fix ingredients where metric amounts are embedded in the ingredient name
 * instead of the structured amount/unit fields.
 *
 * Examples:
 *   "1.5 kg beef brisket" → amount: "1.5", unit: "kg", ingredient: "beef brisket"
 *   "3.5 litres water" → amount: "3.5", unit: "L", ingredient: "water"
 *   "400g potatoes" → amount: "400", unit: "g", ingredient: "potatoes"
 *   "30ml oil" → amount: "30", unit: "ml", ingredient: "oil"
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

// Normalize unit names
function normalizeUnit(raw) {
  const u = raw.toLowerCase().trim()
  if (u === 'kg' || u === 'kilogram' || u === 'kilograms') return 'kg'
  if (u === 'g' || u === 'gram' || u === 'grams') return 'g'
  if (u === 'ml' || u === 'milliliter' || u === 'milliliters' || u === 'millilitre' || u === 'millilitres') return 'ml'
  if (u === 'l' || u === 'liter' || u === 'liters' || u === 'litre' || u === 'litres') return 'L'
  return u
}

// Pattern: starts with number + metric unit (e.g., "1.5 kg beef brisket")
const LEADING_METRIC = /^(\d+\.?\d*)\s*(kg|g|ml|L|litres?|liters?|millilitres?|milliliters?)\s+/i

// Pattern: number+unit without space (e.g., "400g potatoes", "30ml oil")
const LEADING_METRIC_NOSPACE = /^(\d+\.?\d*)(kg|g|ml|L)\s*/i

// Pattern: metric embedded mid-string (e.g., "Water as needed, approximately 150–170 ml")
// We skip these as they're too complex to parse reliably

async function run() {
  const { data: recipes, error } = await supabase.from('recipes').select('slug, ingredients')
  if (error) { console.error('Fetch error:', error.message); process.exit(1) }

  let fixedCount = 0
  let recipeCount = 0

  for (const recipe of recipes) {
    if (!recipe.ingredients) continue

    let changed = false
    const updated = recipe.ingredients.map(ing => {
      // Only fix if amount is null (not already structured)
      if (ing.amount) return ing

      const text = ing.ingredient
      if (!text) return ing

      // Try leading metric with space: "1.5 kg beef brisket"
      let match = text.match(LEADING_METRIC)
      if (!match) {
        // Try leading metric without space: "400g potatoes"
        match = text.match(LEADING_METRIC_NOSPACE)
      }

      if (match) {
        const amount = match[1]
        const unit = normalizeUnit(match[2])
        const rest = text.slice(match[0].length).trim()

        if (rest.length > 0) {
          changed = true
          fixedCount++
          return { ...ing, amount, unit, ingredient: rest }
        }
      }

      return ing
    })

    if (changed) {
      recipeCount++
      const { error: updateError } = await supabase
        .from('recipes')
        .update({ ingredients: updated })
        .eq('slug', recipe.slug)

      if (updateError) {
        console.error(`  ❌ ${recipe.slug}: ${updateError.message}`)
      } else {
        const fixes = updated.filter((u, i) => u.amount !== recipe.ingredients[i].amount)
        for (const f of fixes) {
          console.log(`  ✅ ${recipe.slug}: "${f.amount} ${f.unit} ${f.ingredient}"`)
        }
      }
    }
  }

  console.log(`\nDone. Fixed ${fixedCount} ingredients across ${recipeCount} recipes.`)
}

run()
