/**
 * seed-ingredients-batch2.mjs
 * Uploads legumes, dairy, sweeteners, and vegetables to Supabase.
 * Safe to re-run — uses upsert on slug.
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const supabase = createClient(
  'https://cttehkkjlcyfovsxbpcz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGVoa2tqbGN5Zm92c3hicGN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg4NTIyMSwiZXhwIjoyMDg5NDYxMjIxfQ.qgTVdkeEcqWKZrVaz_uQJCHfj4ReZI4t8Lg6xoFFcOI'
)

const SLUGS = [
  'chickpeas',
  'lentils',
  'toor-dal',
  'chana-dal',
  'urad-dal',
  'moong-dal',
  'masoor-dal',
  'rajma',
  'black-chickpeas',
  'split-chickpeas',
  'paneer',
  'yogurt',
  'cream',
  'jaggery',
  'palm-sugar',
  'brown-sugar',
  'okra',
  'drumsticks',
  'pumpkin',
  'bottle-gourd',
  'ridge-gourd',
  'snake-gourd',
]

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
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean)
    }
    frontmatter[key] = value
  }

  return { frontmatter, body }
}

function parseSections(body) {
  const blocks = body.split(/\n---\n/)
  const sections = {}
  for (const block of blocks) {
    const trimmed = block.trim()
    const headingMatch = trimmed.match(/^##\s+(.+?)(?:\s*\{[^}]*\})?\s*$/m)
    if (headingMatch) {
      const heading = headingMatch[1].trim()
      const headingEnd = trimmed.indexOf(headingMatch[0]) + headingMatch[0].length
      sections[heading] = trimmed.slice(headingEnd).trim()
    }
  }
  return sections
}

function parseTradMedicine(raw) {
  if (!raw) return {}
  const result = {}
  const sections = raw.split(/\n(?=\*\*)/)
  for (const section of sections) {
    const m = section.match(/^\*\*([^*]+)\*\*[:\s]*([\s\S]*)/)
    if (m) {
      result[m[1].trim()] = m[2].trim()
    }
  }
  return result
}

function parseTraditionalDishes(raw) {
  if (!raw) return []
  return raw.split(',').map(s => s.trim()).filter(Boolean)
}

async function main() {
  console.log('================================================')
  console.log(' Ancient Pantry — Ingredients Batch 2 Upload')
  console.log('================================================\n')

  const ingredientsDir = join(__dirname, '..', 'full_recipes', 'ingredients')
  let successCount = 0
  let errorCount = 0

  for (const slug of SLUGS) {
    const filePath = join(ingredientsDir, `${slug}.md`)
    let content
    try {
      content = readFileSync(filePath, 'utf8')
    } catch (err) {
      console.error(`  SKIP ${slug}: file not found`)
      errorCount++
      continue
    }

    const { frontmatter, body } = parseFrontmatter(content)
    const sections = parseSections(body)

    const tradMedRaw = sections['Traditional Medicine Perspectives'] || null
    const traditional_medicine_perspectives = tradMedRaw ? parseTradMedicine(tradMedRaw) : {}
    const traditional_dishes = parseTraditionalDishes(sections['Traditional Dishes'] || '')

    const ingredient = {
      name: frontmatter.name || slug,
      slug,
      alternative_names: Array.isArray(frontmatter.alternative_names) ? frontmatter.alternative_names : [],
      overview: sections['Overview'] || null,
      flavor_profile: Array.isArray(frontmatter.flavor_profile) ? frontmatter.flavor_profile : [],
      cultural_history: sections['Cultural History'] || null,
      origin_regions: Array.isArray(frontmatter.origin_regions) ? frontmatter.origin_regions : [],
      traditional_medicine_perspectives,
      modern_scientific_research: sections['Modern Scientific Research'] || null,
      culinary_uses: sections['Culinary Uses'] || null,
      preparation_methods: sections['Preparation Methods'] || null,
      traditional_dishes,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      published: true,
    }

    const { error } = await supabase
      .from('ingredients')
      .upsert(ingredient, { onConflict: 'slug' })

    if (error) {
      console.error(`  FAIL ${ingredient.name}: ${error.message}`)
      errorCount++
    } else {
      console.log(`  OK   ${ingredient.name}`)
      successCount++
    }
  }

  console.log('\n================================================')
  console.log(` Done: ${successCount} uploaded, ${errorCount} failed`)
  console.log('================================================')
}

main()
