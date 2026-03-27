/**
 * load-full-recipes.mjs
 * Parses all markdown files in full_recipes/ and upserts them to Supabase.
 * Safe to re-run — uses upsert on slug.
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

// ─── Frontmatter Parser ───────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { frontmatter: {}, body: content }

  const fmLines = match[1].split('\n')
  const body = match[2]
  const frontmatter = {}

  for (const line of fmLines) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    let value = line.slice(colonIdx + 1).trim()

    if (!value) continue

    // YAML array: [a, b, c]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
    }

    frontmatter[key] = value
  }

  return { frontmatter, body }
}

// ─── Section Extraction ───────────────────────────────────────────────────────

/**
 * Split the body on HR lines (---) and return a map of heading → content.
 */
function parseSections(body) {
  const blocks = body.split(/\n---\n/)
  const sections = {}

  for (const block of blocks) {
    const trimmed = block.trim()
    // Find the first ## heading in the block
    const headingMatch = trimmed.match(/^##\s+(.+?)(?:\s*\{[^}]*\})?\s*$/m)
    if (headingMatch) {
      const heading = headingMatch[1].trim()
      // Content is everything after the heading line
      const headingEnd = trimmed.indexOf(headingMatch[0]) + headingMatch[0].length
      const content = trimmed.slice(headingEnd).trim()
      sections[heading] = content
    }
  }

  return sections
}

// ─── At a Glance Parser ───────────────────────────────────────────────────────

function parseAtAGlance(sections) {
  const raw = sections['At a Glance'] || ''
  const result = {}

  const rows = raw.split('\n').filter(l => l.startsWith('|') && !l.includes('---'))
  for (const row of rows) {
    const cells = row.split('|').map(c => c.trim()).filter(Boolean)
    if (cells.length < 2) continue
    const key = cells[0].toLowerCase()
    const value = cells[1]
    if (key === 'yield') result.yield = value
    else if (key === 'prep') result.prep_time = value
    else if (key === 'cook') result.cook_time = value
    else if (key === 'total') result.total_time = value
    else if (key === 'difficulty') result.difficulty_glance = value
  }

  return result
}

// ─── Ingredients Parser ───────────────────────────────────────────────────────

const KNOWN_UNITS = new Set([
  'g','kg','ml','l','L',
  'tsp','tbsp','cup','cups','oz','fl oz','lb','lbs',
  'pinch','pinches','handful','handfuls',
  'piece','pieces','pcs','slice','slices',
  'clove','cloves','sprig','sprigs','leaf','leaves',
  'pod','pods','stalk','stalks','bunch','bunches',
  'whole','half','halves','inch','cm','stick','sticks',
  'gram','grams','kilogram','kilograms',
  'milliliter','milliliters','millilitre','millilitres',
  'liter','liters','litre','litres',
  'teaspoon','teaspoons','tablespoon','tablespoons',
  'ounce','ounces','pound','pounds',
  'pint','quart','qt',
])

// Normalize long-form units to abbreviations for consistent DB storage
const UNIT_NORMALIZE = {
  'gram':'g','grams':'g','kilogram':'kg','kilograms':'kg',
  'milliliter':'ml','milliliters':'ml','millilitre':'ml','millilitres':'ml',
  'liter':'L','liters':'L','litre':'L','litres':'L','l':'L',
  'teaspoon':'tsp','teaspoons':'tsp',
  'tablespoon':'tbsp','tablespoons':'tbsp',
  'ounce':'oz','ounces':'oz',
  'pound':'lb','pounds':'lb','lbs':'lb',
  'cups':'cup',
}

function parseIngredientLine(text) {
  const optional = /\(optional\)/i.test(text)
  let cleaned = text.replace(/\(optional\)/gi, '').trim()

  // Split prep note at last comma (e.g. "chicken thighs, boneless and skinned")
  let prep_note = null
  const commaIdx = cleaned.lastIndexOf(',')
  if (commaIdx > 0) {
    const afterComma = cleaned.slice(commaIdx + 1).trim()
    // Only treat as prep note if it's descriptive (not a unit or number)
    if (afterComma && !/^\d/.test(afterComma) && !KNOWN_UNITS.has(afterComma.toLowerCase())) {
      prep_note = afterComma
      cleaned = cleaned.slice(0, commaIdx).trim()
    }
  }

  // Match amount + unit at the start of the line
  // Patterns: "150 g", "1/2 cup", "1½ tbsp", "2-3", "1 1/2 tsp"
  const amountPattern = /^([\d]+[\d\/½¼¾⅓⅔⅛⅜⅝⅞\s]*(?:\/\d+)?(?:\s*[–-]\s*\d+(?:\/\d+)?)?)\s+/
  const match = cleaned.match(amountPattern)

  if (match) {
    const amount = match[1].trim()
    const rest = cleaned.slice(match[0].length)

    // Check if the next word is a known unit
    const unitMatch = rest.match(/^(fl\s+oz|[a-zA-Z]+)\b\s*/)
    if (unitMatch) {
      const rawUnit = unitMatch[1].trim().toLowerCase()
      const normalizedRaw = rawUnit.replace(/\s+/g, ' ')
      if (KNOWN_UNITS.has(normalizedRaw)) {
        const unit = UNIT_NORMALIZE[normalizedRaw] || normalizedRaw
        const ingredient = rest.slice(unitMatch[0].length).trim()
        // If ingredient is empty, the "unit" was actually part of the ingredient name
        if (ingredient) {
          return { amount, unit, ingredient, prep_note, optional }
        }
      }
    }

    // No unit found — it's a count (e.g. "3 green chillies")
    return { amount, unit: null, ingredient: rest.trim(), prep_note, optional }
  }

  // No amount found — entire line is the ingredient
  return { amount: null, unit: null, ingredient: cleaned, prep_note, optional }
}

function parseIngredients(sections) {
  const raw = sections['Ingredients'] || ''
  const lines = raw.split('\n')
  const ingredients = []

  for (const line of lines) {
    if (!line.startsWith('- ')) continue
    const text = line.slice(2).trim()
    if (!text) continue

    ingredients.push(parseIngredientLine(text))
  }

  return ingredients
}

// ─── Instructions Parser ──────────────────────────────────────────────────────

function parseInstructions(sections) {
  const raw = sections['Method'] || ''
  const lines = raw.split('\n')
  const instructions = []

  let currentStep = null
  let currentText = []

  const flush = () => {
    if (currentStep !== null && currentText.length > 0) {
      instructions.push({ step: currentStep, text: currentText.join(' ').trim() })
    }
    currentStep = null
    currentText = []
  }

  for (const line of lines) {
    const match = line.match(/^(\d+)\.\s+(.*)/)
    if (match) {
      flush()
      currentStep = parseInt(match[1])
      currentText = [match[2].trim()]
    } else if (currentStep !== null && line.trim()) {
      currentText.push(line.trim())
    }
  }
  flush()

  return instructions
}

// ─── Normalise difficulty ─────────────────────────────────────────────────────

function normalizeDifficulty(raw) {
  if (!raw) return null
  const d = raw.trim()
  if (d === 'Easy') return 'Easy'
  if (d === 'Medium' || d === 'Moderate' || d === 'Intermediate') return 'Medium'
  if (d === 'Involved' || d === 'Hard' || d === 'Difficult' || d === 'Complex' || d === 'Advanced') return 'Involved'
  return 'Medium'
}

// ─── Tags Parser ─────────────────────────────────────────────────────────────

function parseTags(raw) {
  if (!raw) return []
  if (Array.isArray(raw)) return raw.map(t => t.trim()).filter(Boolean)
  return String(raw).split(',').map(t => t.trim()).filter(Boolean)
}

// ─── Cuisine from top-level directory ────────────────────────────────────────

const CUISINE_MAP = {
  'chinese': 'Chinese Cuisine',
  'indian': 'Indian Cuisine',
  'indonesian': 'Indonesian Cuisine',
  'japanese': 'Japanese Cuisine',
  'korean': 'Korean Cuisine',
  'malaysian': 'Malaysian Cuisine',
  'thai': 'Thai Cuisine',
  'vietnamese': 'Vietnamese Cuisine',
  'wellness': 'Wellness',
}

function getCuisine(filePath) {
  const parts = filePath.replace(/\\/g, '/').split('/')
  const fullRecipesIdx = parts.indexOf('full_recipes')
  if (fullRecipesIdx === -1 || fullRecipesIdx + 1 >= parts.length) return 'Indian Cuisine'
  const topDir = parts[fullRecipesIdx + 1].toLowerCase().replace(/\s+recipes?$/, '').trim()
  return CUISINE_MAP[topDir] || 'Indian Cuisine'
}

// ─── Tradition (only for meaningful sub-traditions) ─────────────────────────

const MEANINGFUL_TRADITIONS = [
  'Ayurveda', 'TCM', 'Cross-Cultural',
  'Punjabi', 'Bengali', 'Kerala', 'Tamil Nadu', 'Kashmiri', 'Goan',
  'Rajasthani', 'Maharashtrian', 'Parsi', 'Awadhi', 'Andhra', 'Dum',
]

function getTradition(filePath, cuisine) {
  const parts = filePath.replace(/\\/g, '/').split('/')
  const parentDir = parts[parts.length - 2]
  const raw = parentDir
    .replace(/\s+[Rr]ecipes?$/, '')
    .trim()

  // Don't repeat the top-level cuisine as tradition
  // e.g. if cuisine is "Chinese Cuisine", don't set tradition to "chinese"
  const cuisineBase = cuisine.replace(' Cuisine', '').toLowerCase()
  if (raw.toLowerCase() === cuisineBase) return null

  // Only return tradition if it's a meaningful sub-tradition
  const matched = MEANINGFUL_TRADITIONS.find(t => t.toLowerCase() === raw.toLowerCase())
  if (matched) return matched

  // For Indian sub-categories like "Comfort Food North India", "Sweets East Indian", etc.
  // don't show them as tradition, they're just folder organization
  return null
}

// ─── Section key lookup (case-insensitive partial) ────────────────────────────

function getSection(sections, ...candidates) {
  for (const [key, value] of Object.entries(sections)) {
    for (const candidate of candidates) {
      if (key.toLowerCase().includes(candidate.toLowerCase())) {
        return value || null
      }
    }
  }
  return null
}

// ─── File walker ──────────────────────────────────────────────────────────────

function findMdFiles(dir) {
  const results = []
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.')) continue
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      // Skip the ingredients folder — those are ingredient pages, not recipes
      if (entry === 'ingredients') continue
      results.push(...findMdFiles(full))
    } else if (entry.endsWith('.md')) {
      results.push(full)
    }
  }
  return results
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const recipesDir = join(__dirname, '..', 'full_recipes')
  const files = findMdFiles(recipesDir)
  console.log(`Found ${files.length} recipe files\n`)

  const recipes = []
  const parseErrors = []

  for (const file of files) {
    try {
      const content = readFileSync(file, 'utf8')
      const { frontmatter, body } = parseFrontmatter(content)
      const sections = parseSections(body)
      const glance = parseAtAGlance(sections)

      const title = frontmatter.title || basename(file, '.md')
      const slug = frontmatter.slug || basename(file, '.md')

      const recipe = {
        title,
        slug,
        subtitle: frontmatter.subtitle || null,
        cultural_origin: getCuisine(file),
        tradition: getTradition(file, getCuisine(file)),
        headnote: getSection(sections, 'headnote') || null,
        yield: glance.yield || null,
        prep_time: glance.prep_time || null,
        cook_time: glance.cook_time || null,
        total_time: glance.total_time || null,
        difficulty: normalizeDifficulty(glance.difficulty_glance || frontmatter.difficulty),
        ingredients: parseIngredients(sections),
        instructions: parseInstructions(sections),
        key_ingredient_benefits: getSection(sections, 'health notes', 'ingredient notes') || null,
        why_this_works: getSection(sections, 'why this works') || null,
        substitutions: getSection(sections, 'substitutions') || null,
        serving_suggestions: getSection(sections, 'serving') || null,
        storage_reheating: getSection(sections, 'storage') || null,
        cultural_notes: getSection(sections, 'cultural', 'tradition', 'background') || null,
        source_name: frontmatter.source_name || null,
        tags: parseTags(frontmatter.tags),
        seo_title: frontmatter.seo_title || null,
        meta_description: frontmatter.meta_description || null,
        published: true,
      }

      // Sanity check
      if (!recipe.slug) {
        parseErrors.push({ file, error: 'No slug found' })
        continue
      }

      recipes.push(recipe)
    } catch (err) {
      parseErrors.push({ file, error: err.message })
    }
  }

  console.log(`Parsed: ${recipes.length} recipes, ${parseErrors.length} errors`)
  if (parseErrors.length > 0) {
    console.log('Parse errors:')
    parseErrors.forEach(e => console.log(`  ${e.file}: ${e.error}`))
  }
  console.log()

  // Upsert in batches of 10
  const BATCH_SIZE = 10
  let succeeded = 0
  let failed = 0

  for (let i = 0; i < recipes.length; i += BATCH_SIZE) {
    const batch = recipes.slice(i, i + BATCH_SIZE)
    const { error } = await supabase
      .from('recipes')
      .upsert(batch, { onConflict: 'slug' })

    if (error) {
      console.error(`Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error.message)
      // Try individually to identify which record fails
      for (const r of batch) {
        const { error: e2 } = await supabase
          .from('recipes')
          .upsert(r, { onConflict: 'slug' })
        if (e2) {
          console.error(`  ✗ ${r.slug}: ${e2.message}`)
          failed++
        } else {
          console.log(`  ✓ ${r.slug}`)
          succeeded++
        }
      }
    } else {
      const slugs = batch.map(r => r.slug).join(', ')
      console.log(`Batch ${Math.floor(i / BATCH_SIZE) + 1} ✓  [${i + 1}–${i + batch.length}/${recipes.length}]`)
      succeeded += batch.length
    }
  }

  console.log(`\n${'─'.repeat(50)}`)
  console.log(`Done: ${succeeded} succeeded, ${failed} failed`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
