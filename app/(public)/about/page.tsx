import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Open Spice Box',
  description:
    'Open Spice Box is a curated recipe and ingredient knowledge platform built on the belief that food is medicine.',
  openGraph: {
    title: 'About — Open Spice Box',
    description:
      'Open Spice Box is a curated recipe and ingredient knowledge platform built on the belief that food is medicine.',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-parchment-50">
      <article className="max-w-2xl mx-auto px-4 sm:px-6 py-16 pb-24">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-ochre-600 mb-3">
            Our story
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal-950 leading-tight tracking-[-0.02em] mb-4">
            About Open Spice Box
          </h1>
        </header>

        <div className="space-y-6 text-charcoal-700 font-body leading-[1.8] text-base">
          <p>
            Open Spice Box is a curated recipe and ingredient knowledge platform
            built on one simple belief:{' '}
            <strong className="text-charcoal-900 font-semibold">
              food is medicine.
            </strong>
          </p>

          <p>
            Not in a prescriptive or clinical sense — in the older, truer sense
            that what we eat shapes how we feel, and that many traditional food
            cultures understood this long before modern research confirmed it.
          </p>

          <p>
            Every recipe and ingredient on Open Spice Box is understood through
            three lenses simultaneously: the traditional medicine knowledge of
            cultures that have used it for centuries, the modern scientific
            research that now studies its effects, and the culinary tradition
            that taught us how to cook with it.
          </p>

          <p>
            We sit at the intersection of food, history, and health — treating
            recipes as cultural artifacts, cooking guides, and ingredient
            education tools, not just instructions.
          </p>

          <div className="bg-white border border-parchment-200 rounded-xl p-6 shadow-[0_2px_12px_-2px_rgba(139,90,43,0.08)] my-8">
            <p className="font-display text-xl text-charcoal-900 leading-relaxed tracking-tight">
              &ldquo;What we eat shapes how we live. Ancient cultures knew this.
              Modern science is catching up. Open Spice Box is where those two
              worlds meet.&rdquo;
            </p>
          </div>

          <p>
            Our content is manually researched and written — no AI recipe
            generation, no algorithmic content. Every page represents a
            deliberate editorial choice to include something we believe is worth
            knowing.
          </p>
        </div>
      </article>
    </div>
  )
}
