'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

type IndicatorStyle = { left: number; width: number; opacity: number }

const NAV_LINKS = [
  { href: '/recipes', label: 'Recipes' },
  { href: '/collections', label: 'Collections' },
  { href: '/ingredients', label: 'Ingredients' },
  { href: '/how-to', label: 'How-To' },
  { href: '/traditions', label: 'Traditional Medicine' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

function useActiveLink(href: string) {
  const pathname = usePathname()
  if (href === '/') return pathname === '/'
  return pathname.startsWith(href)
}

function NavLink({ href, label }: { href: string; label: string }) {
  const active = useActiveLink(href)
  return (
    <Link
      href={href}
      className={`relative z-10 text-sm tracking-wide transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-terra-500 focus-visible:ring-offset-2 rounded px-3 py-1.5 font-body hover:text-white ${
        active
          ? 'text-terra-600 font-semibold'
          : 'text-charcoal-600'
      }`}
    >
      {label}
    </Link>
  )
}

export default function SiteNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const navBarRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState<IndicatorStyle>({ left: 0, width: 0, opacity: 0 })

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on Escape key; trap focus inside the dialog
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!open) return
    if (e.key === 'Escape') {
      setOpen(false)
      hamburgerRef.current?.focus()
      return
    }
    if (e.key === 'Tab' && menuRef.current) {
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => !el.hasAttribute('disabled'))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
  }, [open])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Move focus into the menu when it opens
  useEffect(() => {
    if (open && menuRef.current) {
      const first = menuRef.current.querySelector<HTMLElement>('a[href]')
      first?.focus()
    }
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/97 backdrop-blur-sm border-b border-stone-200/60 shadow-[0_1px_8px_-2px_rgba(100,60,40,0.06)] border-t-[3px] border-t-lacquer-500">
        <nav
          className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500 focus-visible:ring-offset-2 rounded"
            aria-label="Ancient Pantry — home"
          >
            <div className="overflow-hidden relative" style={{ height: '64px', width: '260px' }}>
              <Image
                src="/logo.png"
                alt=""
                fill
                className="object-contain scale-[2.2] object-center"
                priority
              />
            </div>
          </Link>

          {/* Desktop links */}
          <div
            ref={navBarRef}
            className="hidden lg:flex items-center gap-1 relative"
            role="list"
            onMouseLeave={() => setIndicator(s => ({ ...s, opacity: 0 }))}
          >
            {/* Sliding indicator */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-1 rounded"
              style={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.opacity,
                backgroundColor: '#d4521e',
                transition: 'left 200ms cubic-bezier(0.4,0,0.2,1), width 200ms cubic-bezier(0.4,0,0.2,1), opacity 150ms ease',
              }}
            />
            {NAV_LINKS.map(link => (
              <div
                key={link.href}
                role="listitem"
                onMouseEnter={e => {
                  const container = navBarRef.current
                  const el = e.currentTarget as HTMLElement
                  if (!container) return
                  const containerRect = container.getBoundingClientRect()
                  const elRect = el.getBoundingClientRect()
                  setIndicator({
                    left: elRect.left - containerRect.left,
                    width: elRect.width,
                    opacity: 1,
                  })
                }}
              >
                <NavLink href={link.href} label={link.label} />
              </div>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            type="button"
            className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500 focus-visible:ring-offset-2 text-charcoal-700 hover:text-charcoal-900 transition-colors"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(prev => !prev)}
          >
            <span
              className={`block h-px w-5 bg-current transition-transform duration-200 origin-center ${
                open ? 'translate-y-[4.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-5 bg-current transition-opacity duration-200 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-px w-5 bg-current transition-transform duration-200 origin-center ${
                open ? '-translate-y-[4.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-30 lg:hidden transition-opacity duration-200 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-charcoal-950/40 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          className={`absolute top-16 inset-x-0 bg-white border-b border-stone-200 shadow-[0_8px_32px_-4px_rgba(74,63,53,0.16)] transition-transform duration-200 ${
            open ? 'translate-y-0' : '-translate-y-2'
          }`}
        >
          <nav className="px-4 py-5 space-y-1" aria-label="Mobile navigation">
            {NAV_LINKS.map(link => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                label={link.label}
              />
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

function MobileNavLink({ href, label }: { href: string; label: string }) {
  const active = useActiveLink(href)
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-3 rounded-lg text-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500 font-body tracking-wide ${
        active
          ? 'bg-lacquer-50 text-lacquer-700 font-semibold'
          : 'text-charcoal-700 hover:bg-parchment-100 hover:text-charcoal-900'
      }`}
    >
      {label}
    </Link>
  )
}
