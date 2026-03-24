import Link from 'next/link'
import type { Metadata } from 'next'
import ContactForm from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Send a Message — Ancient Pantry',
  description: 'Get in touch with the Ancient Pantry team.',
}

export default function ContactMessagePage() {
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
          Send Us a Message
        </h1>
        <p className="text-base text-charcoal-500 leading-relaxed">
          Questions, feedback, corrections, or just to say hello — we read
          everything.
        </p>
      </header>

      <ContactForm />
    </div>
  )
}
