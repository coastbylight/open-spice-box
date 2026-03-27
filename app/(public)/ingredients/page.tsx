import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import IngredientGrid from '@/components/ingredient/IngredientGrid'

export const metadata: Metadata = {
  title: 'Ingredients — Open Spice Box',
  description:
    'Explore ingredients through the lens of traditional medicine systems and modern nutrition science. Understand what you eat and why it matters.',
  openGraph: {
    title: 'Ingredients — Open Spice Box',
    description:
      'Explore ingredients through the lens of traditional medicine systems and modern nutrition science. Understand what you eat and why it matters.',
    type: 'website',
  },
}

export default async function IngredientsPage() {
  const supabase = createClient()

  const { data: ingredients } = await supabase
    .from('ingredients')
    .select('slug, name, alternative_names, image_url, flavor_profile, tags, overview')
    .eq('published', true)
    .order('name', { ascending: true })

  const all = ingredients ?? []

  const MEDICAL_TAGS = new Set([
    'absorptive',
    'adaptogenic',
    'anti-inflammatory',
    'anti-nausea',
    'antimicrobial',
    'antioxidant',
    'beta-glucan',
    'bioavailability-enhancer',
    'cooling',
    'digestive',
    'healing',
    'immune',
    'liver',
    'medicinal',
    'mood',
    'postpartum',
    'probiotic',
    'spleen',
    'tonic',
    'warming',
    'yin-nourishing',
  ])

  const allTags = Array.from(
    new Set(all.flatMap(i => i.tags ?? []))
  ).filter(t => MEDICAL_TAGS.has(t)).sort()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl text-charcoal-950 tracking-tight mb-3">
          Ingredients
        </h1>
        <p className="text-base text-charcoal-500 leading-relaxed max-w-xl">
          Every ingredient carries a history. Explore traditional uses, modern
          research, and how to work with each one in the kitchen.
        </p>
      </header>

      <IngredientGrid ingredients={all} allTags={allTags} />
    </div>
  )
}
