import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press — Ancient Pantry',
  description: 'Media inquiries and press information for Ancient Pantry.',
}

export default function PressPage() {
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
          Press
        </h1>
        <p className="text-base text-charcoal-500 leading-relaxed">
          Media inquiries, interview requests, and press information.
        </p>
      </header>

      <div className="space-y-6 text-charcoal-700 font-body leading-[1.8] text-base">
        <p>
          Ancient Pantry covers the intersection of traditional food wisdom and
          modern nutrition science. We&apos;re happy to connect with journalists,
          podcasters, and media outlets working on related stories.
        </p>
        <p>
          For interview requests, fact-checking, or press kit inquiries, use the
          form below and include your outlet and publication date in the message.
        </p>
        <div className="pt-4">
          <Link
            href="/contact/message"
            className="inline-flex items-center gap-2 bg-ochre-600 hover:bg-ochre-500 active:bg-ochre-700 text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
          >
            Send a Press Inquiry
          </Link>
        </div>
      </div>
    </div>
  )
}
