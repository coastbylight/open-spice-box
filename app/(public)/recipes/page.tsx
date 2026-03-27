import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import RecipeGrid from '@/components/recipe/RecipeGrid'

export const metadata: Metadata = {
  title: 'Recipes — Open Spice Box',
  description:
    'Curated recipes rooted in traditional medicine systems and modern nutrition science. Anti-inflammatory, gut health, adaptogenic, and more.',
  openGraph: {
    title: 'Recipes — Open Spice Box',
    description:
      'Curated recipes rooted in traditional medicine systems and modern nutrition science. Anti-inflammatory, gut health, adaptogenic, and more.',
    type: 'website',
  },
}

interface PageProps {
  searchParams: { tag?: string; origin?: string }
}

export default async function RecipesPage({ searchParams }: PageProps) {
  const supabase = createClient()

  const { data: recipes } = await supabase
    .from('recipes')
    .select(
      'slug, title, subtitle, cultural_origin, tradition, difficulty, total_time, hero_image_url, tags'
    )
    .eq('published', true)
    .order('created_at', { ascending: false })

  const all = recipes ?? []

  // Collect all unique tags across all recipes (sorted alphabetically)
  const allTags = Array.from(
    new Set(all.flatMap(r => r.tags ?? []))
  ).sort()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl text-charcoal-950 tracking-tight mb-3">
          Recipes
        </h1>
        <p className="text-base text-charcoal-500 leading-relaxed max-w-xl">
          Curated dishes rooted in traditional food wisdom and modern nutrition
          science. Every recipe tells a story.
        </p>
      </header>

      <RecipeGrid
        recipes={all}
        allTags={allTags}
        initialTag={searchParams.tag}
        initialOrigin={searchParams.origin}
      />
    </div>
  )
}
