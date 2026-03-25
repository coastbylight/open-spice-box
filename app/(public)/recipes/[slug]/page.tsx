import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Recipe } from '@/types/recipe'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer'
import RecipeIngredients from '@/components/recipe/RecipeIngredients'
import RecipeRatingComments from '@/components/recipe/RecipeRatingComments'
import SaveRecipeButton from '@/components/recipe/SaveRecipeButton'

interface Props {
  params: { slug: string }
}

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data } = await supabase
    .from('recipes')
    .select('title, seo_title, meta_description, hero_image_url')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!data) return {}

  const title = data.seo_title ?? data.title
  const description = data.meta_description ?? undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: data.hero_image_url ? [data.hero_image_url] : [],
    },
  }
}

// ─── JSON-LD ─────────────────────────────────────────────────────────────────

function buildJsonLd(recipe: Recipe): string {
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    ...(recipe.meta_description != null && { description: recipe.meta_description }),
    ...(recipe.meta_description == null && recipe.headnote != null && { description: recipe.headnote }),
    ...(recipe.hero_image_url != null && { image: [recipe.hero_image_url] }),
    ...(recipe.yield != null && { recipeYield: recipe.yield }),
    ...(recipe.prep_time != null && { prepTime: recipe.prep_time }),
    ...(recipe.cook_time != null && { cookTime: recipe.cook_time }),
    ...(recipe.total_time != null && { totalTime: recipe.total_time }),
    ...(recipe.cultural_origin != null && { recipeCategory: recipe.cultural_origin }),
    ...(recipe.tags?.length && { keywords: recipe.tags.join(', ') }),
    recipeIngredient: (recipe.ingredients ?? []).map(
      i =>
        `${i.amount}${i.unit ? ' ' + i.unit : ''} ${i.ingredient}${i.prep_note ? ', ' + i.prep_note : ''}`
    ),
    recipeInstructions: (recipe.instructions ?? []).map(s => ({
      '@type': 'HowToStep',
      text: s.text,
    })),
  }

  return JSON.stringify(ld)
}

// ─── Sub-components (server-renderable) ──────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xl text-charcoal-900 mt-12 mb-4 tracking-tight pb-2 border-b border-parchment-200">
      {children}
    </h2>
  )
}


// ─── Page ────────────────────────────────────────────────────────────────────

export default async function RecipeDetailPage({ params }: Props) {
  const supabase = createClient()

  const [{ data: recipe }, { data: ingredientRows }] = await Promise.all([
    supabase
      .from('recipes')
      .select('*')
      .eq('slug', params.slug)
      .eq('published', true)
      .single(),
    supabase
      .from('ingredients')
      .select('slug, name')
      .eq('published', true),
  ])

  if (!recipe) notFound()

  const r = recipe as Recipe

  // Build a lowercase-name → slug map for fast ingredient linking
  const ingredientSlugs: Record<string, string> = {}
  for (const ing of ingredientRows ?? []) {
    ingredientSlugs[ing.name.toLowerCase()] = ing.slug
  }

  const jsonLd = buildJsonLd(r)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Accessibility: skip nav */}
      <a
        href="#ingredients"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ochre-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg"
      >
        Skip to recipe
      </a>

      <div className="min-h-screen bg-parchment-50">

        {/* Hero image */}
        {r.hero_image_url && (
          <div className="relative h-72 sm:h-[26rem] w-full overflow-hidden">
            <Image
              src={r.hero_image_url}
              alt={r.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-charcoal-950/10 to-transparent" />
          </div>
        )}

        <article className="max-w-2xl mx-auto px-4 sm:px-6 pb-24">

          {/* ── Header ── */}
          <header className="pt-10 pb-6">
            {(r.tradition || r.cultural_origin) && (
              <p className="text-xs uppercase tracking-widest text-ochre-600 font-body mb-3">
                {[r.tradition, r.cultural_origin].filter(Boolean).join(' · ')}
              </p>
            )}

            <h1 className="font-display text-4xl sm:text-5xl text-charcoal-950 leading-tight tracking-[-0.02em] mb-3">
              {r.title}
            </h1>

            {r.subtitle && (
              <p className="font-body text-lg text-charcoal-500 leading-relaxed">
                {r.subtitle}
              </p>
            )}

            {r.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {r.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-white text-charcoal-600 px-2.5 py-1 rounded-full border border-parchment-200 shadow-[0_1px_3px_rgba(139,90,43,0.06)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Save + Skip to recipe */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#ingredients"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ochre-700 hover:text-ochre-600 active:text-ochre-800 underline underline-offset-2 decoration-ochre-300 hover:decoration-ochre-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2 rounded"
              >
                <span aria-hidden="true">↓</span> Skip to recipe
              </a>
              <SaveRecipeButton recipeId={r.id} size="sm" />
            </div>
          </header>

          {/* ── Headnote / Cultural story ── */}
          {r.headnote && (
            <div className="mb-10 text-charcoal-700 font-body leading-[1.8] text-base border-l-2 border-parchment-300 pl-5">
              <MarkdownRenderer content={r.headnote} />
            </div>
          )}

          {/* ── At a Glance ── */}
          {(r.yield || r.prep_time || r.cook_time || r.total_time || r.difficulty) && (
            <div className="bg-white border border-parchment-200 rounded-xl p-5 mb-12 shadow-[0_2px_16px_-2px_rgba(139,90,43,0.10),0_1px_4px_-1px_rgba(139,90,43,0.06)]">
              <p className="text-xs uppercase tracking-widest text-charcoal-400 mb-4 font-body">
                At a Glance
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-4">
                {r.yield && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-charcoal-400 mb-1">Yield</p>
                    <p className="text-sm font-medium text-charcoal-800">{r.yield}</p>
                  </div>
                )}
                {r.prep_time && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-charcoal-400 mb-1">Prep</p>
                    <p className="text-sm font-medium text-charcoal-800">{r.prep_time}</p>
                  </div>
                )}
                {r.cook_time && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-charcoal-400 mb-1">Cook</p>
                    <p className="text-sm font-medium text-charcoal-800">{r.cook_time}</p>
                  </div>
                )}
                {r.total_time && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-charcoal-400 mb-1">Total</p>
                    <p className="text-sm font-medium text-charcoal-800">{r.total_time}</p>
                  </div>
                )}
                {r.difficulty && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-charcoal-400 mb-1">Difficulty</p>
                    <p className="text-sm font-medium text-charcoal-800">{r.difficulty}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Ingredients ── */}
          <RecipeIngredients
            items={r.ingredients ?? []}
            ingredientSlugs={ingredientSlugs}
          />

          {/* ── Method ── */}
          {r.instructions?.length > 0 && (
            <section id="method">
              <SectionHeading>Method</SectionHeading>
              <ol className="space-y-6">
                {r.instructions.map(step => (
                  <li key={step.step} className="flex gap-5">
                    <span className="font-display text-3xl text-charcoal-800 leading-none shrink-0 w-8 text-right select-none">
                      {step.step}
                    </span>
                    <p className="text-sm text-charcoal-700 leading-[1.8] pt-1">
                      {step.text}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* ── Key Ingredient Benefits ── */}
          {r.key_ingredient_benefits && (
            <section id="key-ingredient-benefits">
              <SectionHeading>Key Ingredient Benefits</SectionHeading>
              <div className="bg-sage-50 border border-sage-100 rounded-xl p-5 shadow-[0_1px_6px_-1px_rgba(63,120,66,0.08)]">
                <MarkdownRenderer content={r.key_ingredient_benefits} />
              </div>
            </section>
          )}

          {/* ── Why This Works ── */}
          {r.why_this_works && (
            <section id="why-this-works">
              <SectionHeading>Why This Works</SectionHeading>
              <MarkdownRenderer content={r.why_this_works} />
            </section>
          )}

          {/* ── Substitutions & Variations ── */}
          {r.substitutions && (
            <section id="substitutions">
              <SectionHeading>Substitutions &amp; Variations</SectionHeading>
              <MarkdownRenderer content={r.substitutions} />
            </section>
          )}

          {/* ── Serving Suggestions ── */}
          {r.serving_suggestions && (
            <section id="serving-suggestions">
              <SectionHeading>Serving Suggestions</SectionHeading>
              <MarkdownRenderer content={r.serving_suggestions} />
            </section>
          )}

          {/* ── Storage & Reheating ── */}
          {r.storage_reheating && (
            <section id="storage-reheating">
              <SectionHeading>Storage &amp; Reheating</SectionHeading>
              <MarkdownRenderer content={r.storage_reheating} />
            </section>
          )}

          {/* ── Cultural Notes ── */}
          {r.cultural_notes && (
            <section id="cultural-notes">
              <SectionHeading>Cultural Notes</SectionHeading>
              <MarkdownRenderer content={r.cultural_notes} />
            </section>
          )}

          {/* ── Source Acknowledgment ── */}
          {r.source_name && (
            <div className="mt-12 pt-6 border-t border-parchment-200">
              <p className="text-[10px] uppercase tracking-widest text-charcoal-400 mb-1.5">
                Source
              </p>
              {r.source_url ? (
                <a
                  href={r.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ochre-700 hover:text-ochre-600 underline underline-offset-2 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ochre-500 rounded"
                >
                  {r.source_name}
                  {r.source_author ? ` — ${r.source_author}` : ''}
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              ) : (
                <p className="text-sm text-charcoal-600">
                  {r.source_name}
                  {r.source_author ? ` — ${r.source_author}` : ''}
                </p>
              )}
            </div>
          )}

          {/* ── Ratings & Comments ── */}
          <div className="mt-16 pt-10 border-t border-parchment-200">
            <h2 className="font-display text-xl text-charcoal-900 tracking-tight mb-6">
              Ratings &amp; Comments
            </h2>
            <RecipeRatingComments recipeId={r.id} recipeSlug={r.slug} />
          </div>

        </article>
      </div>
    </>
  )
}
