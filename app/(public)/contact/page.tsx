import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Open Spice Box',
  description: 'Get in touch with Open Spice Box — partnerships, press, or just to say hello.',
}

const OPTIONS = [
  {
    href: '/contact/work-with-us',
    label: 'Work With Us',
    description: 'Collaborations, partnerships, and brand opportunities.',
  },
  {
    href: '/contact/press',
    label: 'Press',
    description: 'Media inquiries, interview requests, and press kit.',
  },
  {
    href: '/contact/message',
    label: 'Send Us a Message',
    description: 'General questions, feedback, or just to say hello.',
  },
]

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl text-charcoal-950 tracking-tight mb-3">
          Contact
        </h1>
        <p className="text-base text-charcoal-500 leading-relaxed">
          We&apos;d love to hear from you.
        </p>
      </header>

      <div className="space-y-4">
        {OPTIONS.map(opt => (
          <Link
            key={opt.href}
            href={opt.href}
            className="group flex items-center justify-between bg-white border border-parchment-200 rounded-xl p-6 shadow-[0_2px_12px_-2px_rgba(139,90,43,0.08)] hover:shadow-[0_6px_24px_-4px_rgba(139,90,43,0.14)] transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
          >
            <div>
              <h2 className="font-display text-xl text-charcoal-900 tracking-tight mb-1 group-hover:text-ochre-800 transition-colors">
                {opt.label}
              </h2>
              <p className="text-sm text-charcoal-500">{opt.description}</p>
            </div>
            <span className="text-charcoal-300 group-hover:text-ochre-400 transition-colors text-lg ml-4" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
