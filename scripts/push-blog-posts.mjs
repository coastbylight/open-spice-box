import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

const BLOG_DIR = join(import.meta.dirname, '..', 'blog_posts')

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { meta: {}, body: content }

  const frontmatter = match[1]
  const body = match[2].trim()
  const meta = {}

  // Parse title
  const titleMatch = frontmatter.match(/^title:\s*"(.+)"$/m)
  if (titleMatch) meta.title = titleMatch[1]

  // Parse slug
  const slugMatch = frontmatter.match(/^slug:\s*(.+)$/m)
  if (slugMatch) meta.slug = slugMatch[1].trim()

  // Parse tags
  const tagsMatch = frontmatter.match(/^tags:\s*\[(.+)\]$/m)
  if (tagsMatch) {
    meta.tags = tagsMatch[1].split(',').map(t => t.trim().replace(/"/g, ''))
  }

  // Parse meta_description
  const descMatch = frontmatter.match(/^meta_description:\s*"(.+)"$/m)
  if (descMatch) meta.meta_description = descMatch[1]

  return { meta, body }
}

async function main() {
  const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
  console.log(`Found ${files.length} blog post files\n`)

  for (const file of files) {
    const content = readFileSync(join(BLOG_DIR, file), 'utf-8')
    const { meta, body } = parseFrontmatter(content)

    if (!meta.slug || !meta.title) {
      console.log(`⚠ Skipping ${file} — missing slug or title`)
      continue
    }

    // Check if post already exists
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', meta.slug)
      .single()

    const record = {
      title: meta.title,
      slug: meta.slug,
      body: body,
      tags: meta.tags || [],
      published: true,
    }

    if (existing) {
      // Update existing
      const { error } = await supabase
        .from('blog_posts')
        .update(record)
        .eq('id', existing.id)

      if (error) {
        console.log(`✗ Failed to update "${meta.title}": ${error.message}`)
      } else {
        console.log(`↻ Updated: "${meta.title}"`)
      }
    } else {
      // Insert new
      const { error } = await supabase
        .from('blog_posts')
        .insert(record)

      if (error) {
        console.log(`✗ Failed to insert "${meta.title}": ${error.message}`)
      } else {
        console.log(`✓ Inserted: "${meta.title}"`)
      }
    }
  }

  console.log('\nDone. Posts are now available at /blog on localhost.')
}

main()
