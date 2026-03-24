import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

// Fuzzy match: does dish name appear in recipe title or vice versa?
function matchScore(dish, recipeTitle) {
  const d = dish.toLowerCase().trim()
  const r = recipeTitle.toLowerCase().trim()
  if (r === d) return 100
  if (r.includes(d) || d.includes(r)) return 80
  // word overlap
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

console.log(`\n=== AUDIT: ${ingredients?.length ?? 0} ingredients, ${recipes?.length ?? 0} recipes ===\n`)

for (const ing of ingredients ?? []) {
  if (!ing.traditional_dishes?.length) continue

  console.log(`\n── ${ing.name} (${ing.traditional_dishes.length} dishes) ──`)

  // Recipes that use this ingredient
  const recipesWithIng = (recipes ?? []).filter(r => {
    const ings = r.ingredients ?? []
    return ings.some(i => i.ingredient?.toLowerCase().includes(ing.name.toLowerCase()) ||
                         ing.name.toLowerCase().includes(i.ingredient?.toLowerCase() ?? ''))
  })

  for (const dish of ing.traditional_dishes) {
    // Try to match dish to recipe title
    let bestMatch = null
    let bestScore = 0
    for (const r of recipes ?? []) {
      const score = matchScore(dish, r.title)
      if (score > bestScore) { bestScore = score; bestMatch = r }
    }

    if (bestScore >= 60) {
      console.log(`  ✓ "${dish}" → MATCHES /recipes/${bestMatch.slug} (score: ${bestScore})`)
    } else {
      console.log(`  ✗ "${dish}" → NO MATCH`)
      if (recipesWithIng.length > 0) {
        console.log(`    → Could link to: ${recipesWithIng.map(r => `"${r.title}" (/recipes/${r.slug})`).join(', ')}`)
      } else {
        console.log(`    → No recipes found using ${ing.name}`)
      }
    }
  }
}

console.log('\n=== RECIPE SLUGS AVAILABLE ===')
for (const r of recipes ?? []) {
  console.log(`  ${r.slug} — "${r.title}"`)
}
