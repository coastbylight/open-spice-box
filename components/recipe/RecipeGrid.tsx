'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Recipe } from '@/types/recipe'

interface RecipeCardProps {
  recipe: Pick<
    Recipe,
    | 'slug'
    | 'title'
    | 'subtitle'
    | 'cultural_origin'
    | 'tradition'
    | 'difficulty'
    | 'total_time'
    | 'hero_image_url'
    | 'tags'
  >
}

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group block bg-white border border-parchment-200 rounded-xl overflow-hidden shadow-[0_2px_12px_-2px_rgba(139,90,43,0.08)] hover:shadow-[0_8px_28px_-4px_rgba(139,90,43,0.18)] hover:-translate-y-1 transition-[transform,box-shadow] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
    >
      {/* Image */}
      <div className="relative h-48 bg-parchment-100 overflow-hidden">
        {recipe.hero_image_url ? (
          <>
            <Image
              src={recipe.hero_image_url}
              alt={recipe.title}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/30 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-parchment-300 text-4xl select-none" aria-hidden="true">🫙</span>
          </div>
        )}
        {recipe.difficulty && (
          <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider bg-white/90 text-charcoal-600 px-2 py-0.5 rounded-full">
            {recipe.difficulty}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        {(recipe.tradition || recipe.cultural_origin) && (
          <p className="text-[10px] uppercase tracking-widest text-ochre-600 mb-1.5">
            {[recipe.tradition, recipe.cultural_origin].filter(Boolean).join(' · ')}
          </p>
        )}
        <h2 className="font-display text-lg text-charcoal-900 leading-snug tracking-tight mb-1 group-hover:text-ochre-800 transition-colors">
          {recipe.title}
        </h2>
        {recipe.subtitle && (
          <p className="text-xs text-charcoal-500 leading-relaxed line-clamp-2 mb-3">
            {recipe.subtitle}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs text-charcoal-400">
          {recipe.total_time && <span>{recipe.total_time}</span>}
        </div>
      </div>
    </Link>
  )
}

const MEDICINAL_TAGS = new Set([
  'ayurveda',
  'ayurvedic',
  'tcm',
  'anti-inflammatory',
  'gut-health',
  'digestive',
  'digestion',
  'immune',
  'healing',
  'adaptogen',
  'tonic',
  'warming',
  'stress',
  'blood-sugar',
  'tridoshic',
  'carminative',
  'bloating',
  'probiotic',
  'respiratory',
  'throat',
  'sleep',
  'bedtime',
  'daily-ritual',
])

interface Props {
  recipes: RecipeCardProps['recipe'][]
  allTags: string[]
  initialTag?: string
  initialOrigin?: string
}

export default function RecipeGrid({ recipes, allTags, initialTag, initialOrigin }: Props) {
  const medicinalTags = allTags.filter(t => MEDICINAL_TAGS.has(t.toLowerCase()))
  const [query, setQuery] = useState(initialOrigin ?? '')
  const [activeTags, setActiveTags] = useState<Set<string>>(
    initialTag ? new Set([initialTag]) : new Set()
  )

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
    return recipes.filter(r => {
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        (r.cultural_origin ?? '').toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q))
      const matchesTags =
        activeTags.size === 0 || Array.from(activeTags).every(t => r.tags.includes(t))
      return matchesQuery && matchesTags
    })
  }, [recipes, query, activeTags])

  return (
    <>
      {/* Search + Filter bar */}
      <div className="mb-8 space-y-4">
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search recipes…"
          aria-label="Search recipes"
          className="w-full max-w-md bg-white border border-parchment-200 rounded-lg px-4 py-2.5 text-sm text-charcoal-800 placeholder-charcoal-400 shadow-[0_1px_4px_-1px_rgba(139,90,43,0.06)] focus:outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
        />
        {medicinalTags.length > 0 && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
            {medicinalTags.map(tag => (
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

      {/* Results count */}
      <p className="text-xs text-charcoal-400 mb-6" aria-live="polite">
        {filtered.length === recipes.length
          ? `${recipes.length} recipe${recipes.length !== 1 ? 's' : ''}`
          : `${filtered.length} of ${recipes.length} recipes`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(recipe => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-charcoal-400 text-sm">No recipes match your filters.</p>
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
