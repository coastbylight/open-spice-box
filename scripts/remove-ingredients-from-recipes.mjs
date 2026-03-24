/**
 * remove-ingredients-from-recipes.mjs
 * Deletes any recipe records whose slug also exists in the ingredients table.
 * These were accidentally seeded when load-full-recipes.mjs picked up
 * files from full_recipes/ingredients/.
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

async function main() {
  // Fetch all ingredient slugs
  const { data: ingredients, error: ingErr } = await supabase
    .from('ingredients')
    .select('slug, name')

  if (ingErr) {
    console.error('Failed to fetch ingredients:', ingErr.message)
    process.exit(1)
  }

  const ingredientSlugs = ingredients.map(i => i.slug)
  console.log(`Found ${ingredientSlugs.length} ingredient slugs`)

  // Fetch all recipe slugs so we can see which ones overlap
  const { data: recipes, error: recErr } = await supabase
    .from('recipes')
    .select('slug, title')

  if (recErr) {
    console.error('Failed to fetch recipes:', recErr.message)
    process.exit(1)
  }

  const overlapping = recipes.filter(r => ingredientSlugs.includes(r.slug))
  console.log(`Found ${overlapping.length} recipes that are actually ingredients:`)
  overlapping.forEach(r => console.log(`  - ${r.slug} ("${r.title}")`))

  if (overlapping.length === 0) {
    console.log('Nothing to delete.')
    return
  }

  // Delete them
  const slugsToDelete = overlapping.map(r => r.slug)
  const { error: delErr } = await supabase
    .from('recipes')
    .delete()
    .in('slug', slugsToDelete)

  if (delErr) {
    console.error('Delete failed:', delErr.message)
    process.exit(1)
  }

  console.log(`\nDeleted ${overlapping.length} ingredient entries from recipes table.`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
