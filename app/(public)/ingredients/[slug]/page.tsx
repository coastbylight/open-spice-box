import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Ingredient } from '@/types/ingredient'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data } = await supabase
    .from('ingredients')
    .select('name, overview')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!data) return {}

  const description = data.overview
    ? data.overview.slice(0, 155)
    : `Learn about ${data.name} — traditional uses, modern research, and how to cook with it.`

  return {
    title: `${data.name} — Ancient Pantry`,
    description,
    openGraph: {
      title: `${data.name} — Ancient Pantry`,
      description,
      type: 'article',
    },
  }
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xl text-charcoal-900 mt-12 mb-4 tracking-tight pb-2 border-b border-parchment-200">
      {children}
    </h2>
  )
}

function TagPill({ label }: { label: string }) {
  return (
    <span className="text-xs bg-white text-charcoal-600 px-2.5 py-1 rounded-full border border-parchment-200 shadow-[0_1px_3px_rgba(139,90,43,0.06)]">
      {label}
    </span>
  )
}

export default async function IngredientDetailPage({ params }: Props) {
  const supabase = createClient()

  const [{ data: ingredient }, { data: recipesWithIngredients }] = await Promise.all([
    supabase
      .from('ingredients')
      .select('*')
      .eq('slug', params.slug)
      .eq('published', true)
      .single(),
    supabase
      .from('recipes')
      .select('title, slug, ingredients')
      .eq('published', true),
  ])

  if (!ingredient) notFound()

  const ing = ingredient as Ingredient

  const usedIn = (recipesWithIngredients ?? []).filter(r => {
    const ings = r.ingredients as Array<{ ingredient: string }> | null
    return ings?.some(
      i => i.ingredient.toLowerCase() === ing.name.toLowerCase()
    )
  })

  const traditions = ing.traditional_medicine_perspectives ?? {}

  return (
    <div className="min-h-screen bg-parchment-50">
      {/* Hero image */}
      {ing.image_url && (
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <Image
            src={ing.image_url}
            alt={ing.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 via-charcoal-950/10 to-transparent" />
        </div>
      )}

      <article className="max-w-2xl mx-auto px-4 sm:px-6 pb-24">
        {/* Header */}
        <header className="pt-10 pb-6">
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal-950 leading-tight tracking-[-0.02em] mb-2">
            {ing.name}
          </h1>

          {ing.alternative_names?.length > 0 && (
            <p className="text-sm text-charcoal-400 mb-4">
              Also known as:{' '}
              <span className="italic">{ing.alternative_names.join(', ')}</span>
            </p>
          )}

          {ing.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {ing.tags.map(tag => (
                <TagPill key={tag} label={tag} />
              ))}
            </div>
          )}
        </header>

        {/* Overview */}
        {ing.overview && (
          <div className="mb-8 text-charcoal-700 font-body leading-[1.8] text-base border-l-2 border-parchment-300 pl-5">
            <MarkdownRenderer content={ing.overview} />
          </div>
        )}

        {/* Quick facts */}
        {(ing.flavor_profile?.length > 0 || ing.origin_regions?.length > 0) && (
          <div className="bg-white border border-parchment-200 rounded-xl p-5 mb-10 shadow-[0_2px_16px_-2px_rgba(139,90,43,0.10),0_1px_4px_-1px_rgba(139,90,43,0.06)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {ing.flavor_profile?.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-charcoal-400 mb-2">
                    Flavor Profile
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {ing.flavor_profile.map(f => (
                      <span
                        key={f}
                        className="text-xs text-charcoal-700 bg-parchment-100 border border-parchment-200 px-2 py-0.5 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {ing.origin_regions?.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-charcoal-400 mb-2">
                    Origin Regions
                  </p>
                  <p className="text-sm text-charcoal-700">
                    {ing.origin_regions.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Traditional medicine perspectives */}
        {Object.keys(traditions).length > 0 && (
          <section id="traditional-medicine">
            <SectionHeading>Traditional Medicine Perspectives</SectionHeading>
            <div className="space-y-6">
              {Object.entries(traditions).map(([system, text]) => (
                <div
                  key={system}
                  className="bg-sage-50 border border-sage-100 rounded-xl p-5 shadow-[0_1px_6px_-1px_rgba(63,120,66,0.08)]"
                >
                  <h3 className="font-display text-sm uppercase tracking-widest text-sage-700 mb-3">
                    {system}
                  </h3>
                  <p className="text-sm text-charcoal-700 leading-[1.8]">{text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Modern scientific research */}
        {ing.modern_scientific_research && (
          <section id="modern-research">
            <SectionHeading>Modern Scientific Research</SectionHeading>
            <MarkdownRenderer content={ing.modern_scientific_research} />
          </section>
        )}

        {/* Cultural history */}
        {ing.cultural_history && (
          <section id="cultural-history">
            <SectionHeading>Cultural History</SectionHeading>
            <MarkdownRenderer content={ing.cultural_history} />
          </section>
        )}

        {/* Culinary uses */}
        {ing.culinary_uses && (
          <section id="culinary-uses">
            <SectionHeading>Culinary Uses</SectionHeading>
            <MarkdownRenderer content={ing.culinary_uses} />
          </section>
        )}

        {/* Preparation methods */}
        {ing.preparation_methods && (
          <section id="preparation">
            <SectionHeading>Preparation Methods</SectionHeading>
            <MarkdownRenderer content={ing.preparation_methods} />
          </section>
        )}

        {/* Traditional dishes */}
        {ing.traditional_dishes?.length > 0 && (
          <section id="traditional-dishes">
            <SectionHeading>Traditional Dishes</SectionHeading>
            <ul className="space-y-1.5">
              {ing.traditional_dishes.map(dish => (
                <li key={dish} className="text-sm text-charcoal-700 flex gap-2">
                  <span className="text-ochre-400 select-none" aria-hidden="true">—</span>
                  {dish}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Recipes on Ancient Pantry that use this ingredient */}
        {usedIn.length > 0 && (
          <section id="recipes">
            <SectionHeading>Recipes Using {ing.name}</SectionHeading>
            <ul className="space-y-2">
              {usedIn.map(r => (
                <li key={r.slug}>
                  <Link
                    href={`/recipes/${r.slug}`}
                    className="text-sm text-ochre-700 hover:text-ochre-600 underline underline-offset-2 decoration-ochre-300 hover:decoration-ochre-500 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ochre-500 rounded"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  )
}
