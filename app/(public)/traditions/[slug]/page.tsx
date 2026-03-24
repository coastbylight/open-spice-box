import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data } = await supabase
    .from('traditions')
    .select('name, philosophy')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()
  if (!data) return {}
  const description = data.philosophy
    ? data.philosophy.slice(0, 155)
    : `Explore ${data.name} — its food philosophy, key ingredients, and culinary traditions.`
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

export default async function TraditionDetailPage({ params }: Props) {
  const supabase = createClient()

  const [{ data: tradition }, { data: relatedRecipes }] = await Promise.all([
    supabase
      .from('traditions')
      .select('*')
      .eq('slug', params.slug)
      .eq('published', true)
      .single(),
    supabase
      .from('recipes')
      .select('title, slug')
      .eq('published', true)
      .ilike('tradition', params.slug.replace(/-/g, '%')),
  ])

  if (!tradition) notFound()

  const t = tradition

  return (
    <div className="min-h-screen bg-parchment-50">
      <article className="max-w-2xl mx-auto px-4 sm:px-6 pb-24 pt-10">
        <header className="pb-6">
          {t.region && (
            <p className="text-xs uppercase tracking-widest text-ochre-600 mb-3">
              {t.region}
            </p>
          )}
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal-950 leading-tight tracking-[-0.02em] mb-3">
            {t.name}
          </h1>
        </header>

        {t.philosophy && (
          <div className="mb-8 text-charcoal-700 font-body leading-[1.8] border-l-2 border-parchment-300 pl-5">
            <MarkdownRenderer content={t.philosophy} />
          </div>
        )}

        {t.food_principles && (
          <section>
            <SectionHeading>Food &amp; Cooking Principles</SectionHeading>
            <MarkdownRenderer content={t.food_principles} />
          </section>
        )}

        {t.common_ingredients?.length > 0 && (
          <section>
            <SectionHeading>Common Ingredients</SectionHeading>
            <ul className="flex flex-wrap gap-2">
              {t.common_ingredients.map((ing: string) => (
                <li
                  key={ing}
                  className="text-sm bg-white text-charcoal-700 border border-parchment-200 px-3 py-1.5 rounded-full shadow-[0_1px_3px_rgba(139,90,43,0.06)]"
                >
                  {ing}
                </li>
              ))}
            </ul>
          </section>
        )}

        {t.cooking_techniques?.length > 0 && (
          <section>
            <SectionHeading>Cooking Techniques</SectionHeading>
            <ul className="space-y-2">
              {t.cooking_techniques.map((tech: string) => (
                <li key={tech} className="flex gap-2 text-sm text-charcoal-700">
                  <span className="text-ochre-400 select-none" aria-hidden="true">—</span>
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        )}

        {t.representative_dishes?.length > 0 && (
          <section>
            <SectionHeading>Representative Dishes</SectionHeading>
            <ul className="space-y-2">
              {t.representative_dishes.map((dish: string) => (
                <li key={dish} className="flex gap-2 text-sm text-charcoal-700">
                  <span className="text-ochre-400 select-none" aria-hidden="true">—</span>
                  {dish}
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedRecipes && relatedRecipes.length > 0 && (
          <section>
            <SectionHeading>Recipes in This Tradition</SectionHeading>
            <ul className="space-y-2">
              {relatedRecipes.map(r => (
                <li key={r.slug}>
                  <Link
                    href={`/recipes/${r.slug}`}
                    className="text-sm text-ochre-700 hover:text-ochre-600 underline underline-offset-2 decoration-ochre-300 hover:decoration-ochre-500 transition-colors"
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
