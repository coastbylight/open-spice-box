import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'How-To — Open Spice Box',
  description:
    'Technique guides and culinary how-tos — fermentation, spice blending, broth-making, and more from traditional food cultures.',
  openGraph: {
    title: 'How-To — Open Spice Box',
    description:
      'Technique guides and culinary how-tos — fermentation, spice blending, broth-making, and more from traditional food cultures.',
    type: 'website',
  },
}

export default async function HowToPage() {
  const supabase = createClient()
  const { data: articles } = await supabase
    .from('howto_articles')
    .select('slug, title, category, tags')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const all = articles ?? []

  // Group by category
  const byCategory = all.reduce<Record<string, typeof all>>((acc, a) => {
    const cat = a.category ?? 'General'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(a)
    return acc
  }, {})

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl text-charcoal-950 tracking-tight mb-3">
          How-To
        </h1>
        <p className="text-base text-charcoal-500 leading-relaxed max-w-xl">
          Techniques, methods, and culinary skills rooted in traditional food
          cultures from around the world.
        </p>
      </header>

      {all.length > 0 ? (
        <div className="space-y-10">
          {Object.entries(byCategory).map(([category, items]) => (
            <div key={category}>
              <h2 className="font-display text-xl text-charcoal-700 mb-4 tracking-tight border-b border-parchment-200 pb-2">
                {category}
              </h2>
              <ul className="space-y-3">
                {items.map(a => (
                  <li key={a.slug}>
                    <Link
                      href={`/how-to/${a.slug}`}
                      className="group flex items-center justify-between bg-white border border-parchment-200 rounded-xl px-5 py-4 shadow-[0_1px_6px_-1px_rgba(139,90,43,0.06)] hover:shadow-[0_4px_16px_-2px_rgba(139,90,43,0.12)] transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
                    >
                      <span className="font-body text-sm text-charcoal-800 group-hover:text-ochre-800 transition-colors">
                        {a.title}
                      </span>
                      <span className="text-charcoal-300 group-hover:text-ochre-400 transition-colors text-sm" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-charcoal-400 text-sm">
          How-to guides are being prepared. Check back soon.
        </p>
      )}
    </div>
  )
}
