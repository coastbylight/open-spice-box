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
      {/* Static: parchment background circle */}
      <div className="absolute inset-0 rounded-full bg-parchment-50" />

      {/* ── OUTER BEZEL GROUP: slow CW rotation ── */}
      {/* Contains lattice grid, outer rings, cardinal tick marks */}
      <div className="absolute inset-0 animate-seal-orbit-cw">
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

        {/* Cardinal tick marks — move with the outer bezel */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[5px] h-[14px] rounded-sm bg-lacquer-500/55" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[5px] h-[14px] rounded-sm bg-lacquer-500/55" />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 h-[5px] w-[14px] rounded-sm bg-lacquer-500/55" />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 h-[5px] w-[14px] rounded-sm bg-lacquer-500/55" />
      </div>

      {/* ── INNER MECHANISM GROUP: slow CCW counter-rotation ── */}
      {/* Contains inner rings and crosshair lines */}
      <div className="absolute inset-0 animate-seal-orbit-ccw">
        {/* Inner ring around center */}
        <div
          className="absolute rounded-full border-2 border-lacquer-500/45"
          style={{ inset: 'calc(50% - 68px)' }}
        />
        <div
          className="absolute rounded-full border border-lacquer-400/20"
          style={{ inset: 'calc(50% - 60px)' }}
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
      </div>

      {/* ── STATIC CENTER ── */}
      {/* Cash coin center square — subtle pulse */}
      <div
        className="absolute border border-lacquer-500/45 animate-seal-center-pulse"
        style={{ inset: 'calc(50% - 22px)' }}
      />

      {/* Diagonal corner accent dots — staggered pulse */}
      <div className="absolute top-[16%] left-[16%] w-2 h-2 rounded-full bg-lacquer-500/38 animate-seal-dot-pulse" />
      <div className="absolute top-[16%] right-[16%] w-2 h-2 rounded-full bg-lacquer-500/38 animate-seal-dot-pulse" style={{ animationDelay: '0.9s' }} />
      <div className="absolute bottom-[16%] left-[16%] w-2 h-2 rounded-full bg-lacquer-500/38 animate-seal-dot-pulse" style={{ animationDelay: '1.8s' }} />
      <div className="absolute bottom-[16%] right-[16%] w-2 h-2 rounded-full bg-lacquer-500/38 animate-seal-dot-pulse" style={{ animationDelay: '2.7s' }} />
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
        {/* Ruled parchment lines — very faint aged-paper texture */}
        <div
          className="absolute inset-0 opacity-[0.018] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 31px, rgba(100,60,40,0.6) 32px)',
          }}
          aria-hidden="true"
        />
        {/* Warm glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 30% 60%, rgba(201,57,43,0.05) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(200,135,26,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(74,63,53,0.04) 0%, transparent 50%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">

            {/* Left: Editorial content */}
            <div className="animate-fade-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 mb-8 font-body" aria-label="Traditional Wisdom · Modern Science">
                <span className="block w-5 h-px bg-lacquer-400/55" aria-hidden="true" />
                <span className="text-[10px] tracking-[0.24em] uppercase text-lacquer-600 font-medium">
                  Traditional Wisdom · Modern Science
                </span>
                <span className="block w-5 h-px bg-lacquer-400/55" aria-hidden="true" />
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
              <div className="flex items-center gap-2 my-7" aria-hidden="true">
                <div className="w-14 h-px bg-gradient-to-r from-transparent to-lacquer-400/55" />
                <div className="flex items-center gap-1.5">
                  <div className="w-[3px] h-3 rounded-sm bg-lacquer-300/55" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-lacquer-500" />
                  <div className="w-[3px] h-3 rounded-sm bg-lacquer-300/55" />
                </div>
                <div className="w-20 h-px bg-gradient-to-r from-lacquer-400/55 to-transparent" />
              </div>

              <p className="text-base sm:text-lg text-stone-600 leading-[1.85] max-w-lg mb-10 font-body">
                Curated recipes and ingredient knowledge rooted in traditional
                medicine systems — TCM, Ayurveda, and beyond — confirmed by
                modern nutrition science.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/recipes" className="btn-primary">
                  Browse Recipes
                </Link>
                <Link href="/ingredients" className="btn-secondary">
                  Explore Ingredients
                </Link>
              </div>
            </div>

            {/* Right: Chinese coin decorative seal */}
            <div className="hidden lg:flex justify-center items-center">
              <div
                className="w-[360px] h-[360px] xl:w-[400px] xl:h-[400px]"
                style={{
                  animation:
                    'seal-enter 1.1s cubic-bezier(0.16, 1, 0.3, 1) both 0.3s, seal-breathe 8s ease-in-out infinite 1.4s',
                }}
              >
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
              <div className="flex items-center gap-2 mb-2">
                <span className="block w-4 h-px bg-lacquer-400/60" aria-hidden="true" />
                <p className="text-[10px] uppercase tracking-[0.22em] text-lacquer-500 font-body font-medium">
                  From the kitchen
                </p>
              </div>
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
                className="group block bg-white rounded-xl overflow-hidden shadow-[0_2px_16px_-4px_rgba(100,50,30,0.10)] hover:shadow-[0_10px_36px_-6px_rgba(100,50,30,0.22)] hover:-translate-y-1 transition-[transform,box-shadow] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500 focus-visible:ring-offset-2"
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
                      <span className="inline-block bg-lacquer-500 text-white text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 rounded font-body font-medium shadow-[0_1px_4px_rgba(0,0,0,0.22)]">
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
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: '200px 200px',
          }}
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
          <div className="flex items-center justify-center gap-2.5 mb-4" aria-hidden="true">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-lacquer-600/55" />
            <div className="flex items-center gap-1.5">
              <div className="w-[2px] h-2.5 rounded-sm bg-lacquer-700/60" />
              <div className="w-1.5 h-1.5 rotate-45 bg-lacquer-500" />
              <div className="w-[2px] h-2.5 rounded-sm bg-lacquer-700/60" />
            </div>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-lacquer-600/55" />
          </div>
          <p className="text-sm text-charcoal-400 font-body tracking-[0.04em]">
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
              <div className="flex items-center gap-2 mb-2">
                <span className="block w-4 h-px bg-lacquer-400/60" aria-hidden="true" />
                <p className="text-[10px] uppercase tracking-[0.22em] text-lacquer-500 font-body font-medium">
                  In the pantry
                </p>
              </div>
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
            <Link href="/recipes" className="btn-primary">
              Browse Recipes
            </Link>
            <Link href="/traditions" className="btn-secondary">
              Explore Traditions
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
