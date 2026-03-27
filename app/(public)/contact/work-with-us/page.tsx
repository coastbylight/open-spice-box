import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work With Us — Open Spice Box',
  description: 'Collaboration and partnership opportunities with Open Spice Box.',
}

export default function WorkWithUsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 pb-24">
      <Link
        href="/contact"
        className="text-xs text-charcoal-400 hover:text-charcoal-700 transition-colors mb-8 inline-block"
      >
        ← Contact
      </Link>

      <header className="mb-8">
        <h1 className="font-display text-4xl text-charcoal-950 tracking-tight mb-3">
          Work With Us
        </h1>
        <p className="text-base text-charcoal-500 leading-relaxed">
          We welcome partnerships that align with our philosophy: food as
          medicine, tradition as wisdom, quality over volume.
        </p>
      </header>

      <div className="space-y-6 text-charcoal-700 font-body leading-[1.8] text-base">
        <p>
          We collaborate with brands, practitioners, writers, and organizations
          who share our commitment to honest, educational food content. If that
          sounds like you, we&apos;d love to talk.
        </p>
        <p>
          Current opportunities include content partnerships, ingredient
          spotlights, sponsored editorial (clearly disclosed), and consulting
          engagements.
        </p>
        <div className="pt-4">
          <Link
            href="/contact/message"
            className="inline-flex items-center gap-2 bg-ochre-600 hover:bg-ochre-500 active:bg-ochre-700 text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  )
}
