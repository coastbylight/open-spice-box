import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Traditional Medicine Systems — Open Spice Box',
  description:
    'Explore traditional medicine systems — TCM, Ayurveda, and more — and understand how ancient cultures used food to support health.',
  openGraph: {
    title: 'Traditional Medicine Systems — Open Spice Box',
    description:
      'Explore traditional medicine systems — TCM, Ayurveda, and more — and understand how ancient cultures used food to support health.',
    type: 'website',
  },
}

export default async function TraditionsPage() {
  const supabase = createClient()
  const { data: traditions } = await supabase
    .from('traditions')
    .select('slug, name, region, philosophy')
    .eq('published', true)
    .order('name', { ascending: true })

  const all = traditions ?? []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl text-charcoal-950 tracking-tight mb-3">
          Traditional Medicine Systems
        </h1>
        <p className="text-base text-charcoal-500 leading-relaxed max-w-xl">
          Ancient cultures understood food as medicine long before modern
          science. Explore the traditions that shaped how we eat.
        </p>
      </header>

      {all.length > 0 ? (
        <div className="space-y-4">
          {all.map(t => (
            <Link
              key={t.slug}
              href={`/traditions/${t.slug}`}
              className="group block bg-white border border-parchment-200 rounded-xl p-6 shadow-[0_2px_12px_-2px_rgba(139,90,43,0.08)] hover:shadow-[0_6px_24px_-4px_rgba(139,90,43,0.14)] transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
            >
              {t.region && (
                <p className="text-[10px] uppercase tracking-widest text-ochre-600 mb-1.5">
                  {t.region}
                </p>
              )}
              <h2 className="font-display text-xl text-charcoal-900 tracking-tight mb-2 group-hover:text-ochre-800 transition-colors">
                {t.name}
              </h2>
              {t.philosophy && (
                <p className="text-sm text-charcoal-500 leading-relaxed line-clamp-2">
                  {t.philosophy}
                </p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-charcoal-400 text-sm">
          Tradition pages are being prepared. Check back soon.
        </p>
      )}
    </div>
  )
}
