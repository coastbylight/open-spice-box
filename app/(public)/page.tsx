import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Ancient Pantry — Food Is Medicine',
  description:
    'Curated recipes and ingredient knowledge from traditional medicine systems and modern nutrition science. Every dish tells a story.',
  openGraph: {
    title: 'Ancient Pantry — Food Is Medicine',
    description:
      'Curated recipes and ingredient knowledge from traditional medicine systems and modern nutrition science. Every dish tells a story.',
    type: 'website',
  },
}

// Chinese coin/seal decorative element (CSS-based for reliability)
function ChineseSeal() {
  return (
    <div className="relative w-full h-full" aria-hidden="true">
      {/* Parchment background circle */}
      <div className="absolute inset-0 rounded-full bg-parchment-50" />

      {/* Lattice grid — clipped to the ring between outer and inner circles */}
      <div
        className="absolute inset-[11px] rounded-full overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,57,43,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,57,43,0.22) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      >
        {/* Parchment inner circle — masks out the grid in the center zone */}
        <div
          className="absolute rounded-full bg-parchment-50"
          style={{ inset: 'calc(50% - 68px)' }}
        />
      </div>

      {/* Outer decorative rings */}
      <div className="absolute inset-0 rounded-full border-[3px] border-lacquer-500/55" />
      <div className="absolute inset-[9px] rounded-full border border-lacquer-400/22" />

      {/* Inner ring around center */}
      <div
        className="absolute rounded-full border-2 border-lacquer-500/45"
        style={{ inset: 'calc(50% - 68px)' }}
      />
      <div
        className="absolute rounded-full border border-lacquer-400/20"
        style={{ inset: 'calc(50% - 60px)' }}
      />

      {/* Cash coin center square */}
      <div
        className="absolute border border-lacquer-500/45"
        style={{ inset: 'calc(50% - 22px)' }}
      />

      {/* Crosshair lines from square edges to inner ring */}
      <div className="absolute left-1/2 -translate-x-px bg-lacquer-500/40"
        style={{ top: 'calc(50% - 68px)', height: '46px', width: '1px' }} />
      <div className="absolute left-1/2 -translate-x-px bg-lacquer-500/40"
        style={{ top: 'calc(50% + 22px)', height: '46px', width: '1px' }} />
      <div className="absolute top-1/2 -translate-y-px bg-lacquer-500/40"
        style={{ left: 'calc(50% - 68px)', width: '46px', height: '1px' }} />
      <div className="absolute top-1/2 -translate-y-px bg-lacquer-500/40"
        style={{ left: 'calc(50% + 22px)', width: '46px', height: '1px' }} />

      {/* Cardinal tick marks */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[5px] h-[14px] rounded-sm bg-lacquer-500/55" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[5px] h-[14px] rounded-sm bg-lacquer-500/55" />
      <div className="absolute left-2 top-1/2 -translate-y-1/2 h-[5px] w-[14px] rounded-sm bg-lacquer-500/55" />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 h-[5px] w-[14px] rounded-sm bg-lacquer-500/55" />

      {/* Diagonal corner accent dots */}
      <div className="absolute top-[16%] left-[16%] w-2 h-2 rounded-full bg-lacquer-500/38" />
      <div className="absolute top-[16%] right-[16%] w-2 h-2 rounded-full bg-lacquer-500/38" />
      <div className="absolute bottom-[16%] left-[16%] w-2 h-2 rounded-full bg-lacquer-500/38" />
      <div className="absolute bottom-[16%] right-[16%] w-2 h-2 rounded-full bg-lacquer-500/38" />
    </div>
  )
}

export default async function HomePage() {
  const supabase = createClient()

  const [{ data: recipes }, { data: ingredients }] = await Promise.all([
    supabase
      .from('recipes')
      .select('slug, title, subtitle, cultural_origin, tradition, hero_image_url, total_time')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3),
    supabase
      .from('ingredients')
      .select('slug, name, image_url, flavor_profile, overview')
      .eq('published', true)
      .order('name', { ascending: true })
      .limit(6),
  ])

  const featuredRecipes = recipes ?? []
  const featuredIngredients = ingredients ?? []

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-parchment-50 min-h-[82vh] flex items-center">
        {/* Background: subtle crosshatch pattern */}
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'28\' height=\'28\' viewBox=\'0 0 28 28\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h28v28H0z\' fill=\'none\'/%3E%3Cpath d=\'M0 0 L28 28 M28 0 L0 28\' stroke=\'%23c9392b\' stroke-width=\'0.5\'/%3E%3C/svg%3E")',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Warm glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 30% 60%, rgba(201,57,43,0.04) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(200,135,26,0.05) 0%, transparent 50%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">

            {/* Left: Editorial content */}
            <div className="animate-fade-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 border border-lacquer-200 bg-lacquer-50 text-lacquer-700 text-[11px] tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-8 font-body">
                <span className="w-1 h-1 rounded-full bg-lacquer-500 inline-block" aria-hidden="true" />
                Traditional Wisdom · Modern Science
              </div>

              {/* Headline */}
              <h1 className="font-display leading-[0.95] tracking-[-0.02em] mb-3">
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-charcoal-950 font-medium">
                  Food is
                </span>
                <span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-[6.5rem] text-lacquer-500 italic font-semibold">
                  Medicine.
                </span>
              </h1>

              {/* Decorative rule */}
              <div className="flex items-center gap-3 my-7" aria-hidden="true">
                <div className="w-16 h-px bg-lacquer-400/50" />
                <div className="w-1.5 h-1.5 rotate-45 bg-lacquer-500" />
                <div className="w-6 h-px bg-lacquer-400/50" />
              </div>

              <p className="text-base sm:text-lg text-stone-600 leading-[1.85] max-w-lg mb-10 font-body">
                Curated recipes and ingredient knowledge rooted in traditional
                medicine systems — TCM, Ayurveda, and beyond — confirmed by
                modern nutrition science.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/recipes"
                  className="inline-flex items-center justify-center gap-2 bg-lacquer-500 hover:bg-lacquer-600 active:bg-lacquer-700 text-white font-medium px-8 py-3.5 rounded-lg text-sm font-body tracking-wide transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-400 focus-visible:ring-offset-2"
                >
                  Browse Recipes
                </Link>
                <Link
                  href="/ingredients"
                  className="inline-flex items-center justify-center gap-2 border border-charcoal-300 hover:border-charcoal-500 text-charcoal-700 hover:text-charcoal-900 font-medium px-8 py-3.5 rounded-lg text-sm font-body tracking-wide transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-400 focus-visible:ring-offset-2"
                >
                  Explore Ingredients
                </Link>
              </div>
            </div>

            {/* Right: Chinese coin decorative seal */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="w-[360px] h-[360px] xl:w-[400px] xl:h-[400px] drop-shadow-[0_8px_40px_rgba(201,57,43,0.08)]">
                <ChineseSeal />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Featured Recipes ── */}
      {featuredRecipes.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-lacquer-500 mb-2 font-body">
                From the kitchen
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-charcoal-950 tracking-tight font-semibold">
                Featured Recipes
              </h2>
            </div>
            <Link
              href="/recipes"
              className="text-sm text-charcoal-500 hover:text-lacquer-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500 rounded hidden sm:block font-body"
            >
              View all <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredRecipes.map(recipe => (
              <Link
                key={recipe.slug}
                href={`/recipes/${recipe.slug}`}
                className="group block bg-white rounded-xl overflow-hidden shadow-[0_2px_16px_-4px_rgba(100,50,30,0.10)] hover:shadow-[0_8px_32px_-6px_rgba(100,50,30,0.22)] transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500 focus-visible:ring-offset-2"
              >
                {/* Image */}
                <div className="relative h-56 bg-parchment-100 overflow-hidden">
                  {recipe.hero_image_url ? (
                    <>
                      <Image
                        src={recipe.hero_image_url}
                        alt={recipe.title}
                        fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      />
                      {/* Gradient overlay — only on real images */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/55 via-charcoal-950/10 to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-parchment-100 via-parchment-200 to-stone-200">
                      <span className="text-stone-300 text-5xl select-none" aria-hidden="true">🫙</span>
                    </div>
                  )}
                  {/* Category tag overlaid — always shown */}
                  {(recipe.tradition || recipe.cultural_origin) && (
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-block bg-lacquer-500 text-white text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 rounded font-body">
                        {[recipe.tradition, recipe.cultural_origin].filter(Boolean).join(' · ')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-display text-xl text-charcoal-900 leading-snug tracking-tight group-hover:text-lacquer-700 transition-colors mb-1.5 font-semibold">
                    {recipe.title}
                  </h3>
                  {recipe.subtitle && (
                    <p className="text-sm text-charcoal-500 line-clamp-2 leading-relaxed font-body">
                      {recipe.subtitle}
                    </p>
                  )}
                  {recipe.total_time && (
                    <p className="text-xs text-stone-400 mt-3 font-body">{recipe.total_time}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link
              href="/recipes"
              className="text-sm text-lacquer-600 hover:text-lacquer-700 underline underline-offset-2 transition-colors font-body"
            >
              View all recipes <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      )}

      {/* ── Philosophy strip ── */}
      <section className="bg-charcoal-950 text-white relative overflow-hidden">
        {/* Subtle warm red glow at top */}
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lacquer-600/40 to-transparent"
          aria-hidden="true"
        />
        {/* Big decorative quote mark */}
        <div
          className="absolute top-6 left-1/2 -translate-x-1/2 font-display text-[18rem] leading-none text-lacquer-500/[0.06] select-none pointer-events-none"
          aria-hidden="true"
        >
          &ldquo;
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-parchment-100 leading-[1.5] tracking-tight italic mb-6">
            &ldquo;Every culture that has ever cooked has known, instinctively,
            that food shapes how we feel.&rdquo;
          </p>
          {/* Red decorative rule */}
          <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
            <div className="w-10 h-px bg-lacquer-600/60" />
            <div className="w-1.5 h-1.5 rotate-45 bg-lacquer-500" />
            <div className="w-10 h-px bg-lacquer-600/60" />
          </div>
          <p className="text-sm text-charcoal-400 font-body tracking-wide">
            Ancient Pantry exists to preserve and share that knowledge.
          </p>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-lacquer-600/40 to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* ── Featured Ingredients ── */}
      {featuredIngredients.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-lacquer-500 mb-2 font-body">
                In the pantry
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-charcoal-950 tracking-tight font-semibold">
                Ingredient Stories
              </h2>
            </div>
            <Link
              href="/ingredients"
              className="text-sm text-charcoal-500 hover:text-lacquer-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500 rounded hidden sm:block font-body"
            >
              View all <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredIngredients.map(ing => (
              <Link
                key={ing.slug}
                href={`/ingredients/${ing.slug}`}
                className="group block text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500 focus-visible:ring-offset-2 rounded-full"
              >
                {/* Circular image */}
                <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-br from-parchment-100 to-parchment-200 shadow-[0_2px_12px_-3px_rgba(100,50,30,0.12)] group-hover:shadow-[0_4px_20px_-4px_rgba(201,57,43,0.22)] group-hover:ring-2 group-hover:ring-lacquer-400/60 transition-all duration-300">
                  {ing.image_url ? (
                    <Image
                      src={ing.image_url}
                      alt={ing.name}
                      fill
                      className="object-cover group-hover:scale-[1.06] transition-transform duration-400"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-parchment-300 text-2xl select-none" aria-hidden="true">🌿</span>
                    </div>
                  )}
                </div>
                <p className="font-display text-sm text-charcoal-800 group-hover:text-lacquer-700 transition-colors leading-snug font-medium">
                  {ing.name}
                </p>
                {ing.flavor_profile?.length > 0 && (
                  <p className="text-[10px] text-charcoal-400 mt-0.5 font-body">
                    {ing.flavor_profile.slice(0, 2).join(', ')}
                  </p>
                )}
              </Link>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link
              href="/ingredients"
              className="text-sm text-lacquer-600 hover:text-lacquer-700 underline underline-offset-2 transition-colors font-body"
            >
              View all ingredients <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-parchment-100 border-t border-parchment-200">
        {/* Subtle diagonal stripe texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #c9392b 0px, #c9392b 1px, transparent 1px, transparent 14px)',
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal-950 tracking-tight mb-3 font-semibold">
            Start with what you eat.
          </h2>
          {/* Decorative rule */}
          <div className="flex items-center justify-center gap-3 my-5" aria-hidden="true">
            <div className="w-12 h-px bg-lacquer-400/50" />
            <div className="w-1.5 h-1.5 rotate-45 bg-lacquer-500/70" />
            <div className="w-12 h-px bg-lacquer-400/50" />
          </div>
          <p className="text-base text-charcoal-500 leading-relaxed max-w-xl mx-auto mb-10 font-body">
            Explore our curated collection of recipes and learn the story behind
            every ingredient — from ancient traditions to modern science.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/recipes"
              className="inline-flex items-center justify-center bg-lacquer-500 hover:bg-lacquer-600 active:bg-lacquer-700 text-white font-medium px-8 py-3.5 rounded-lg text-sm font-body tracking-wide transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500 focus-visible:ring-offset-2"
            >
              Browse Recipes
            </Link>
            <Link
              href="/traditions"
              className="inline-flex items-center justify-center bg-white hover:bg-parchment-50 text-charcoal-700 font-medium px-8 py-3.5 rounded-lg text-sm font-body tracking-wide border border-parchment-300 hover:border-parchment-400 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500 focus-visible:ring-offset-2"
            >
              Explore Traditions
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
