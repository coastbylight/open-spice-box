import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import type { Collection } from '@/types/collection'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data } = await supabase
    .from('collections')
    .select('name, description')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!data) return {}

  return {
    title: `${data.name} — Open Spice Box`,
    description: data.description ?? undefined,
    openGraph: {
      title: `${data.name} — Open Spice Box`,
      description: data.description ?? undefined,
      type: 'website',
    },
  }
}

export default async function CollectionPage({ params }: Props) {
  const supabase = createClient()

  const { data: collection } = await supabase
    .from('collections')
    .select('name, description, cover_image_url, recipe_slugs')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!collection) notFound()

  const col = collection as Pick<
    Collection,
    'name' | 'description' | 'cover_image_url' | 'recipe_slugs'
  >

  // Fetch only the recipes that belong to this collection, preserving order
  let recipes: { slug: string; title: string; subtitle: string | null; hero_image_url: string | null; total_time: string | null; difficulty: string | null }[] = []

  if (col.recipe_slugs.length > 0) {
    const { data } = await supabase
      .from('recipes')
      .select('slug, title, subtitle, hero_image_url, total_time, difficulty')
      .in('slug', col.recipe_slugs)
      .eq('published', true)

    if (data) {
      // Preserve the manual ordering from recipe_slugs
      const bySlug = Object.fromEntries(data.map(r => [r.slug, r]))
      recipes = col.recipe_slugs.flatMap(s => (bySlug[s] ? [bySlug[s]] : []))
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-xs text-charcoal-400" aria-label="Breadcrumb">
        <Link href="/collections" className="hover:text-ochre-600 transition-colors">
          Collections
        </Link>
        <span className="mx-1.5" aria-hidden="true">/</span>
        <span className="text-charcoal-600">{col.name}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        {col.cover_image_url && (
          <div className="relative h-56 sm:h-72 rounded-xl overflow-hidden mb-8 bg-parchment-100">
            <Image
              src={col.cover_image_url}
              alt={col.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}
        <h1 className="font-display text-4xl sm:text-5xl text-charcoal-950 tracking-tight mb-3">
          {col.name}
        </h1>
        {col.description && (
          <p className="text-base text-charcoal-500 leading-relaxed max-w-xl">
            {col.description}
          </p>
        )}
        <p className="mt-3 text-xs text-charcoal-400">
          {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
        </p>
      </header>

      {/* Recipe list */}
      {recipes.length === 0 ? (
        <p className="text-charcoal-400 text-sm py-10 text-center">
          No recipes in this collection yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recipes.map(recipe => (
            <Link
              key={recipe.slug}
              href={`/recipes/${recipe.slug}`}
              className="group block bg-white border border-parchment-200 rounded-xl overflow-hidden shadow-[0_2px_12px_-2px_rgba(139,90,43,0.08)] hover:shadow-[0_6px_24px_-4px_rgba(139,90,43,0.16)] transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
            >
              <div className="relative h-40 bg-parchment-100 overflow-hidden">
                {recipe.hero_image_url ? (
                  <Image
                    src={recipe.hero_image_url}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-parchment-300 text-3xl select-none" aria-hidden="true">🍳</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="font-display text-lg text-charcoal-900 leading-snug tracking-tight mb-0.5 group-hover:text-ochre-800 transition-colors">
                  {recipe.title}
                </h2>
                {recipe.subtitle && (
                  <p className="text-xs text-charcoal-400 italic mb-2 line-clamp-1">
                    {recipe.subtitle}
                  </p>
                )}
                {(recipe.total_time || recipe.difficulty) && (
                  <div className="flex gap-2 mt-2">
                    {recipe.total_time && (
                      <span className="text-[10px] text-charcoal-500 bg-parchment-50 border border-parchment-200 px-2 py-0.5 rounded-full">
                        {recipe.total_time}
                      </span>
                    )}
                    {recipe.difficulty && (
                      <span className="text-[10px] text-charcoal-500 bg-parchment-50 border border-parchment-200 px-2 py-0.5 rounded-full">
                        {recipe.difficulty}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
