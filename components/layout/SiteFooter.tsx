import Link from 'next/link'
import Image from 'next/image'

const FOOTER_LINKS = [
  {
    heading: 'Explore',
    links: [
      { href: '/recipes', label: 'Recipes' },
      { href: '/ingredients', label: 'Ingredients' },
      { href: '/how-to', label: 'How-To' },
      { href: '/traditions', label: 'Traditional Medicine' },
      { href: '/blog', label: 'Blog' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/contact/work-with-us', label: 'Work With Us' },
      { href: '/contact/press', label: 'Press' },
    ],
  },
]

export default function SiteFooter() {
  return (
    <footer className="bg-charcoal-950 text-charcoal-300 mt-24 border-t-[3px] border-t-lacquer-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 mb-12">
          {/* Brand column */}
          <div>
            <Link href="/" aria-label="Ancient Pantry — home">
              <Image
                src="/logo.png"
                alt=""
                width={130}
                height={36}
                className="h-8 w-auto object-contain brightness-90 mb-4"
              />
            </Link>
            <p className="text-sm text-charcoal-400 leading-relaxed max-w-xs font-body">
              Food is medicine. Curated recipes and ingredient knowledge from
              traditional medicine systems and modern nutrition science.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map(col => (
            <div key={col.heading}>
              <h2 className="text-[10px] uppercase tracking-[0.18em] text-lacquer-500/70 mb-4 font-body">
                {col.heading}
              </h2>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-charcoal-400 hover:text-parchment-100 hover:translate-x-0.5 transition-[color,transform] duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-lacquer-500 rounded font-body inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Decorative divider */}
        <div className="flex items-center gap-2.5 mb-6" aria-hidden="true">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-charcoal-800" />
          <div className="flex items-center gap-1.5">
            <div className="w-[2px] h-3 rounded-sm bg-charcoal-700" />
            <div className="w-1 h-1 rotate-45 bg-lacquer-700/60" />
            <div className="w-1.5 h-1.5 rotate-45 bg-lacquer-600" />
            <div className="w-1 h-1 rotate-45 bg-lacquer-700/60" />
            <div className="w-[2px] h-3 rounded-sm bg-charcoal-700" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-charcoal-800" />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-charcoal-600 font-body">
            © {new Date().getFullYear()} Ancient Pantry. All rights reserved.
          </p>
          <p className="text-xs text-lacquer-600/90 italic font-display tracking-[0.06em]">
            Food is medicine.
          </p>
        </div>
      </div>
    </footer>
  )
}
