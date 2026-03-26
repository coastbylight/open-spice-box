import Link from 'next/link'
import Image from 'next/image'

interface RelatedRecipe {
  slug: string
  title: string
  hero_image_url: string | null
  total_time: string | null
  difficulty: string | null
  cultural_origin: string | null
  tradition: string | null
}

interface Props {
  recipes: RelatedRecipe[]
}

export default function RelatedRecipes({ recipes }: Props) {
  if (recipes.length === 0) return null

  return (
    <section className="mt-16 pt-10 border-t border-parchment-200" data-no-print>
      <h2 className="font-display text-xl text-charcoal-900 tracking-tight mb-6">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recipes.map(recipe => (
          <Link
            key={recipe.slug}
            href={`/recipes/${recipe.slug}`}
            className="group block bg-white border border-parchment-200 rounded-xl overflow-hidden shadow-[0_2px_12px_-2px_rgba(139,90,43,0.08)] hover:shadow-[0_8px_28px_-4px_rgba(139,90,43,0.18)] hover:-translate-y-1 transition-[transform,box-shadow] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
          >
            <div className="relative h-36 bg-parchment-100 overflow-hidden">
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
                  <span className="text-parchment-300 text-3xl select-none" aria-hidden="true">🫙</span>
                </div>
              )}
              {recipe.difficulty && (
                <span className="absolute top-2 right-2 text-[9px] uppercase tracking-wider bg-white/90 text-charcoal-600 px-1.5 py-0.5 rounded-full">
                  {recipe.difficulty}
                </span>
              )}
            </div>
            <div className="p-3">
              {(recipe.tradition || recipe.cultural_origin) && (
                <p className="text-[9px] uppercase tracking-widest text-ochre-600 mb-1">
                  {[recipe.tradition, recipe.cultural_origin].filter(Boolean).join(' · ')}
                </p>
              )}
              <h3 className="font-display text-sm text-charcoal-900 leading-snug tracking-tight group-hover:text-ochre-800 transition-colors line-clamp-2">
                {recipe.title}
              </h3>
              {recipe.total_time && (
                <p className="text-[10px] text-charcoal-400 mt-1.5">{recipe.total_time}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
