import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs'
import { join, relative } from 'path'

const ROOT = join(import.meta.dirname, '..')
const RECIPES_DIR = join(ROOT, 'full_recipes')
const OUTPUT = join(RECIPES_DIR, 'RECIPE-INDEX.md')

function getRecipeFiles(dir) {
  const results = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory() && entry.name !== 'ingredients') {
      results.push(...getRecipeFiles(full))
    } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'RECIPE-INDEX.md') {
      results.push(full)
    }
  }
  return results
}

function parseMeta(filepath) {
  const content = readFileSync(filepath, 'utf-8')
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (!fmMatch) return null
  const fm = fmMatch[1]

  const get = (key) => {
    const m = fm.match(new RegExp(`^${key}:\\s*"?(.+?)"?\\s*$`, 'm'))
    return m ? m[1].trim().replace(/^"|"$/g, '') : null
  }

  return {
    title: get('title'),
    slug: get('slug'),
    subtitle: get('subtitle'),
    yield: get('yield'),
    prep_time: get('prep_time'),
    cook_time: get('cook_time'),
    cultural_origin: get('cultural_origin'),
    tradition: get('tradition'),
  }
}

function categorizePath(filepath) {
  const rel = relative(RECIPES_DIR, filepath)
  const parts = rel.split('/')
  // First directory is the cuisine folder
  return parts.slice(0, -1).join(' > ')
}

function prettifyCategory(cat) {
  return cat
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/ recipes/gi, '')
    .replace(/ > /g, ' > ')
}

function main() {
  const files = getRecipeFiles(RECIPES_DIR)
  console.log(`Found ${files.length} recipe files`)

  // Group by category
  const grouped = {}
  for (const f of files) {
    const cat = categorizePath(f)
    const meta = parseMeta(f)
    if (!meta || !meta.title) continue
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(meta)
  }

  // Sort categories and recipes within
  const sortedCats = Object.keys(grouped).sort()
  for (const cat of sortedCats) {
    grouped[cat].sort((a, b) => (a.title || '').localeCompare(b.title || ''))
  }

  // Count
  let total = 0
  for (const cat of sortedCats) total += grouped[cat].length

  // Build markdown
  const lines = []
  lines.push('# Ancient Pantry Recipe Index')
  lines.push('')
  lines.push(`**Total recipes: ${total}**`)
  lines.push(`**Last updated: ${new Date().toISOString().split('T')[0]}**`)
  lines.push('')
  lines.push('---')
  lines.push('')

  // Table of contents
  lines.push('## Contents')
  lines.push('')
  for (const cat of sortedCats) {
    const pretty = prettifyCategory(cat)
    const anchor = pretty.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ +/g, '-')
    lines.push(`- [${pretty}](#${anchor}) (${grouped[cat].length})`)
  }
  lines.push('')
  lines.push('---')
  lines.push('')

  // Each category
  for (const cat of sortedCats) {
    const pretty = prettifyCategory(cat)
    lines.push(`## ${pretty}`)
    lines.push('')
    lines.push('| Recipe | Slug | Servings | Time |')
    lines.push('|--------|------|----------|------|')

    for (const r of grouped[cat]) {
      const time = [r.prep_time, r.cook_time].filter(Boolean).join(' + ')
      lines.push(`| ${r.title} | \`${r.slug}\` | ${r.yield || '-'} | ${time || '-'} |`)
    }

    lines.push('')
  }

  writeFileSync(OUTPUT, lines.join('\n'))
  console.log(`Written to ${relative(ROOT, OUTPUT)} (${total} recipes)`)
}

main()
