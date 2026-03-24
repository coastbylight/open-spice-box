/**
 * link-traditional-dishes.mjs
 *
 * For each ingredient with traditional_dishes:
 *   - Checks which dish names match an actual recipe title (fuzzy)
 *   - If NONE match: finds a recipe that uses this ingredient and appends
 *     that recipe's title to traditional_dishes so it becomes linkable
 *
 * Run: node scripts/link-traditional-dishes.mjs [--dry-run]
 */
import { createClient } from '@supabase/supabase-js'

const DRY_RUN = process.argv.includes('--dry-run')

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

function matchScore(dish, recipeTitle) {
  const d = dish.toLowerCase().trim()
  const r = recipeTitle.toLowerCase().trim()
  if (r === d) return 100
  if (r.includes(d) || d.includes(r)) return 80
  const dWords = d.split(/\s+/).filter(w => w.length > 3)
  const rWords = r.split(/\s+/).filter(w => w.length > 3)
  const overlap = dWords.filter(w => rWords.includes(w)).length
  if (overlap >= 2) return 60
  if (overlap === 1 && dWords.length <= 3) return 40
  return 0
}

const [{ data: ingredients }, { data: recipes }] = await Promise.all([
  supabase
    .from('ingredients')
    .select('id, name, slug, traditional_dishes')
    .eq('published', true)
    .not('traditional_dishes', 'is', null),
  supabase
    .from('recipes')
    .select('id, title, slug, ingredients')
    .eq('published', true),
])

if (!ingredients || !recipes) {
  console.error('Failed to fetch data')
  process.exit(1)
}

const updates = []

for (const ing of ingredients) {
  if (!ing.traditional_dishes?.length) continue

  // Check if ANY existing dish matches a recipe
  let hasAnyMatch = false
  for (const dish of ing.traditional_dishes) {
    for (const r of recipes) {
      if (matchScore(dish, r.title) >= 60) {
        hasAnyMatch = true
        break
      }
    }
    if (hasAnyMatch) break
  }

  if (hasAnyMatch) continue // Already has at least one linkable dish

  // Find recipes that use this ingredient (by ingredient list) — phrase-boundary matching
  const needle = ing.name.toLowerCase().trim()

  function recipeUsesIngredient(recipeIngredients) {
    return recipeIngredients.some(ri => {
      const haystack = (ri.ingredient ?? '').toLowerCase().trim()
      if (!haystack) return false
      // Exact
      if (haystack === needle) return true
      // Haystack contains needle as complete phrase
      if (haystack.startsWith(needle + ' ') ||
          haystack.endsWith(' ' + needle) ||
          haystack.includes(' ' + needle + ' ')) return true
      // Needle contains haystack as complete phrase (only for multi-word haystacks)
      const haystackWords = haystack.split(/\s+/)
      if (haystackWords.length >= 2) {
        if (needle === haystack ||
            needle.startsWith(haystack + ' ') ||
            needle.endsWith(' ' + haystack) ||
            needle.includes(' ' + haystack + ' ')) return true
      }
      return false
    })
  }

  const matchingRecipes = recipes.filter(r => recipeUsesIngredient(r.ingredients ?? []))

  if (matchingRecipes.length === 0) {
    console.log(`  SKIP ${ing.name} — no recipes found that use this ingredient`)
    continue
  }

  // Pick the best recipe: prefer one whose title isn't already in traditional_dishes
  const existingLower = ing.traditional_dishes.map(d => d.toLowerCase())
  const candidate = matchingRecipes.find(r => !existingLower.includes(r.title.toLowerCase()))
    ?? matchingRecipes[0]

  // Append the recipe title to traditional_dishes
  const newDishes = [...ing.traditional_dishes, candidate.title]

  console.log(`  ADD to ${ing.name}: "${candidate.title}" (/recipes/${candidate.slug})`)
  updates.push({ id: ing.id, name: ing.name, traditional_dishes: newDishes })
}

console.log(`\n${updates.length} ingredients to update`)

if (DRY_RUN) {
  console.log('\n[DRY RUN] No changes written.')
  process.exit(0)
}

let successCount = 0
for (const u of updates) {
  const { error } = await supabase
    .from('ingredients')
    .update({ traditional_dishes: u.traditional_dishes, updated_at: new Date().toISOString() })
    .eq('id', u.id)

  if (error) {
    console.error(`  ERROR updating ${u.name}:`, error.message)
  } else {
    successCount++
  }
}

console.log(`\nDone. ${successCount}/${updates.length} ingredients updated.`)
