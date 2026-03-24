'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Ingredient } from '@/types/ingredient'

type CardIngredient = Pick<
  Ingredient,
  'slug' | 'name' | 'alternative_names' | 'image_url' | 'flavor_profile' | 'tags' | 'overview'
>

function IngredientCard({ ing }: { ing: CardIngredient }) {
  return (
    <Link
      href={`/ingredients/${ing.slug}`}
      className="group block bg-white border border-parchment-200 rounded-xl overflow-hidden shadow-[0_2px_12px_-2px_rgba(139,90,43,0.08)] hover:shadow-[0_6px_24px_-4px_rgba(139,90,43,0.16)] transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
    >
      {/* Image */}
      <div className="relative h-40 bg-parchment-100 overflow-hidden">
        {ing.image_url ? (
          <Image
            src={ing.image_url}
            alt={ing.name}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-parchment-300 text-3xl select-none" aria-hidden="true">🌿</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h2 className="font-display text-lg text-charcoal-900 leading-snug tracking-tight mb-0.5 group-hover:text-ochre-800 transition-colors">
          {ing.name}
        </h2>
        {ing.alternative_names?.length > 0 && (
          <p className="text-xs text-charcoal-400 italic mb-2">
            {ing.alternative_names.slice(0, 2).join(', ')}
          </p>
        )}
        {ing.flavor_profile?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {ing.flavor_profile.slice(0, 3).map(f => (
              <span
                key={f}
                className="text-[10px] text-charcoal-500 bg-parchment-50 border border-parchment-200 px-2 py-0.5 rounded-full"
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

interface Props {
  ingredients: CardIngredient[]
  allTags: string[]
}

export default function IngredientGrid({ ingredients, allTags }: Props) {
  const [query, setQuery] = useState('')
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())

  function toggleTag(tag: string) {
    setActiveTags(prev => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return ingredients.filter(i => {
      const matchesQuery =
        !q ||
        i.name.toLowerCase().includes(q) ||
        i.alternative_names?.some(n => n.toLowerCase().includes(q)) ||
        i.tags?.some(t => t.toLowerCase().includes(q))
      const matchesTags =
        activeTags.size === 0 ||
        Array.from(activeTags).every(t => i.tags?.includes(t))
      return matchesQuery && matchesTags
    })
  }, [ingredients, query, activeTags])

  return (
    <>
      {/* Search + Filter */}
      <div className="mb-8 space-y-4">
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search ingredients…"
          aria-label="Search ingredients"
          className="w-full max-w-md bg-white border border-parchment-200 rounded-lg px-4 py-2.5 text-sm text-charcoal-800 placeholder-charcoal-400 shadow-[0_1px_4px_-1px_rgba(139,90,43,0.06)] focus:outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
        />
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
            {allTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                aria-pressed={activeTags.has(tag)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-1 ${
                  activeTags.has(tag)
                    ? 'bg-ochre-600 text-white border-ochre-600'
                    : 'bg-white text-charcoal-600 border-parchment-200 hover:border-ochre-300 hover:text-ochre-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-charcoal-400 mb-6" aria-live="polite">
        {filtered.length === ingredients.length
          ? `${ingredients.length} ingredient${ingredients.length !== 1 ? 's' : ''}`
          : `${filtered.length} of ${ingredients.length} ingredients`}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(ing => (
            <IngredientCard key={ing.slug} ing={ing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-charcoal-400 text-sm">No ingredients match your filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setActiveTags(new Set())
            }}
            className="mt-3 text-sm text-ochre-600 hover:text-ochre-700 underline underline-offset-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 rounded"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  )
}
