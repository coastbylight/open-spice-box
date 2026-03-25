'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface UserProfile {
  id: string
  display_name: string
  avatar_url: string | null
}

// Deterministic avatar color from first character of name
function getAvatarColor(name: string): { bg: string; text: string } {
  const first = (name || '?')[0].toLowerCase()
  const code = first.charCodeAt(0)
  const palette = [
    { bg: 'bg-sage-600', text: 'text-sage-50' },
    { bg: 'bg-terra-500', text: 'text-terra-50' },
    { bg: 'bg-ochre-600', text: 'text-ochre-50' },
    { bg: 'bg-lacquer-600', text: 'text-lacquer-50' },
    { bg: 'bg-charcoal-600', text: 'text-charcoal-50' },
  ]
  return palette[code % palette.length]
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
}

export default function UserMenu() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    let cancelled = false

    async function loadUser() {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (cancelled) return

      if (!authUser) {
        setUser(null)
        setLoading(false)
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_url')
        .eq('id', authUser.id)
        .single()

      if (!cancelled) {
        setUser(profile || {
          id: authUser.id,
          display_name: authUser.email?.split('@')[0] || 'User',
          avatar_url: null,
        })
        setLoading(false)
      }
    }

    loadUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadUser()
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [supabase])

  // Close on click outside
  useEffect(() => {
    if (!open) return

    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const handleSignOut = useCallback(async () => {
    setOpen(false)
    await supabase.auth.signOut()
    router.refresh()
  }, [supabase, router])

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-parchment-100 animate-pulse" />
  }

  // Not signed in
  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="text-[13px] font-body font-medium text-white bg-terra-500 hover:bg-terra-600 active:bg-terra-700 rounded-lg px-3.5 py-1.5 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-terra-500 focus-visible:ring-offset-2 whitespace-nowrap"
      >
        Sign In
      </Link>
    )
  }

  const colors = getAvatarColor(user.display_name)
  const initials = getInitials(user.display_name)

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="User menu"
        className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-xs font-semibold transition-shadow duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2 hover:shadow-[0_0_0_2px_rgba(139,90,43,0.2)] active:scale-95"
        style={{ transition: 'transform 100ms ease, box-shadow 150ms ease' }}
      >
        {user.avatar_url ? (
          <Image
            src={user.avatar_url}
            alt={user.display_name}
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className={`w-full h-full flex items-center justify-center ${colors.bg} ${colors.text}`}>
            {initials}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-2 w-56 bg-white border border-parchment-200 rounded-xl shadow-[0_8px_32px_-4px_rgba(74,63,53,0.18)] z-50 overflow-hidden"
          role="menu"
          aria-label="User menu"
        >
          {/* Arrow */}
          <div
            className="absolute -top-1.5 right-3 w-3 h-3 bg-white border-l border-t border-parchment-200 rotate-45"
            aria-hidden="true"
          />

          {/* Name */}
          <div className="px-4 pt-4 pb-3 border-b border-parchment-100">
            <p className="text-sm font-semibold text-charcoal-900 font-body truncate">
              {user.display_name}
            </p>
          </div>

          {/* Links */}
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal-700 hover:bg-parchment-50 transition-colors duration-150 focus:outline-none focus-visible:bg-parchment-50"
              role="menuitem"
            >
              <svg className="w-4 h-4 text-charcoal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              My Profile
            </Link>
            <Link
              href="/profile/collections"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal-700 hover:bg-parchment-50 transition-colors duration-150 focus:outline-none focus-visible:bg-parchment-50"
              role="menuitem"
            >
              <svg className="w-4 h-4 text-charcoal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              Saved Recipes
            </Link>
            <Link
              href="/profile/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal-700 hover:bg-parchment-50 transition-colors duration-150 focus:outline-none focus-visible:bg-parchment-50"
              role="menuitem"
            >
              <svg className="w-4 h-4 text-charcoal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Settings
            </Link>
          </div>

          {/* Divider + Sign Out */}
          <div className="border-t border-parchment-100 py-1">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-terra-600 hover:bg-terra-50 transition-colors duration-150 focus:outline-none focus-visible:bg-terra-50"
              role="menuitem"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Mobile-friendly version of user menu items for the mobile nav drawer.
 * Renders inline links instead of a dropdown.
 */
export function MobileUserMenu() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    let cancelled = false

    async function loadUser() {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (cancelled) return

      if (!authUser) {
        setUser(null)
        setLoading(false)
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_url')
        .eq('id', authUser.id)
        .single()

      if (!cancelled) {
        setUser(profile || {
          id: authUser.id,
          display_name: authUser.email?.split('@')[0] || 'User',
          avatar_url: null,
        })
        setLoading(false)
      }
    }

    loadUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadUser()
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [supabase])

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut()
    router.refresh()
  }, [supabase, router])

  if (loading) return null

  if (!user) {
    return (
      <div className="border-t border-parchment-100 pt-3 mt-3">
        <Link
          href="/auth/login"
          className="flex items-center px-3 py-3 rounded-lg text-sm font-body tracking-wide text-ochre-700 hover:bg-ochre-50 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500"
        >
          Sign In
        </Link>
        <Link
          href="/auth/signup"
          className="flex items-center px-3 py-3 rounded-lg text-sm font-body tracking-wide text-charcoal-700 hover:bg-parchment-100 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500"
        >
          Create Account
        </Link>
      </div>
    )
  }

  return (
    <div className="border-t border-parchment-100 pt-3 mt-3">
      <div className="px-3 py-2 mb-1">
        <p className="text-xs uppercase tracking-wider text-charcoal-400 font-body">Account</p>
      </div>
      <Link
        href="/profile"
        className="flex items-center px-3 py-3 rounded-lg text-sm font-body tracking-wide text-charcoal-700 hover:bg-parchment-100 hover:text-charcoal-900 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500"
      >
        My Profile
      </Link>
      <Link
        href="/profile/collections"
        className="flex items-center px-3 py-3 rounded-lg text-sm font-body tracking-wide text-charcoal-700 hover:bg-parchment-100 hover:text-charcoal-900 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500"
      >
        Saved Recipes
      </Link>
      <Link
        href="/profile/settings"
        className="flex items-center px-3 py-3 rounded-lg text-sm font-body tracking-wide text-charcoal-700 hover:bg-parchment-100 hover:text-charcoal-900 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500"
      >
        Settings
      </Link>
      <button
        type="button"
        onClick={handleSignOut}
        className="flex items-center w-full px-3 py-3 rounded-lg text-sm font-body tracking-wide text-terra-600 hover:bg-terra-50 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500"
      >
        Sign Out
      </button>
    </div>
  )
}
