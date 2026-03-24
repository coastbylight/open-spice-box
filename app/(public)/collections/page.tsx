import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import type { Collection } from '@/types/collection'

export const metadata: Metadata = {
  title: 'Collections — Ancient Pantry',
  description:
    'Curated recipe collections organized by theme, tradition, and occasion.',
  openGraph: {
    title: 'Collections — Ancient Pantry',
    description:
      'Curated recipe collections organized by theme, tradition, and occasion.',
    type: 'website',
  },
}

export default async function CollectionsPage() {
  const supabase = createClient()

  const { data } = await supabase
    .from('collections')
    .select('slug, name, description, cover_image_url, recipe_slugs')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const collections = (data ?? []) as Pick<
    Collection,
    'slug' | 'name' | 'description' | 'cover_image_url' | 'recipe_slugs'
  >[]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl text-charcoal-950 tracking-tight mb-3">
          Collections
        </h1>
        <p className="text-base text-charcoal-500 leading-relaxed max-w-xl">
          Recipes grouped by theme, tradition, and occasion — a curated way to
          explore the pantry.
        </p>
      </header>

      {collections.length === 0 ? (
        <p className="text-charcoal-400 text-sm py-20 text-center">
          No collections yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map(col => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group block bg-white border border-parchment-200 rounded-xl overflow-hidden shadow-[0_2px_12px_-2px_rgba(139,90,43,0.08)] hover:shadow-[0_6px_24px_-4px_rgba(139,90,43,0.16)] transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
            >
              <div className="relative h-48 bg-parchment-100 overflow-hidden">
                {col.cover_image_url ? (
                  <Image
                    src={col.cover_image_url}
                    alt={col.name}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-parchment-300 text-4xl select-none" aria-hidden="true">🍲</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h2 className="font-display text-xl text-charcoal-900 leading-snug tracking-tight mb-1 group-hover:text-ochre-800 transition-colors">
                  {col.name}
                </h2>
                {col.description && (
                  <p className="text-sm text-charcoal-500 leading-relaxed line-clamp-2 mb-3">
                    {col.description}
                  </p>
                )}
                <p className="text-xs text-charcoal-400">
                  {col.recipe_slugs.length} recipe{col.recipe_slugs.length !== 1 ? 's' : ''}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
