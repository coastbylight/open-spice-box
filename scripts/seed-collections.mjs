/**
 * Seed collections.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-collections.mjs
 *
 * Each collection has:
 *   name            — display name
 *   slug            — URL-safe identifier (must be unique)
 *   description     — short blurb shown on the card and detail page
 *   cover_image_url — optional hero image URL
 *   recipe_slugs    — ordered list of recipe slugs to include
 *   published       — set true to make it live
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const collections = [
  {
    name: 'Edible Skincare',
    slug: 'edible-skincare',
    description: 'Recipes built around ingredients known to support skin health from the inside out.',
    cover_image_url: null,
    recipe_slugs: [],
    published: true,
  },
]

if (collections.length === 0) {
  console.log('No collections defined. Edit seed-collections.mjs to add some.')
  process.exit(0)
}

const { error } = await supabase
  .from('collections')
  .upsert(collections, { onConflict: 'slug' })

if (error) {
  console.error('Error seeding collections:', error.message)
  process.exit(1)
}

console.log(`Seeded ${collections.length} collection(s).`)
