'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/recipes', label: 'Recipes' },
  { href: '/admin/ingredients', label: 'Ingredients' },
  { href: '/admin/traditions', label: 'Traditions' },
  { href: '/admin/howto', label: 'How-To' },
  { href: '/admin/blog', label: 'Blog' },
  { href: '/admin/contact', label: 'Contact' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-56 bg-charcoal-900 border-r border-charcoal-800 flex flex-col min-h-screen">
      <div className="p-4 border-b border-charcoal-800">
        <span className="text-charcoal-400 text-xs font-medium uppercase tracking-widest">Admin</span>
      </div>
      <nav className="flex-1 p-2 space-y-0.5">
        {NAV_ITEMS.map(item => {
          const isActive = item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded text-sm transition-colors ${
                isActive
                  ? 'bg-ochre-600/20 text-ochre-400'
                  : 'text-charcoal-400 hover:text-charcoal-100 hover:bg-charcoal-800'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-charcoal-800">
        <button
          onClick={handleLogout}
          className="w-full text-left text-sm text-charcoal-500 hover:text-charcoal-300 transition-colors px-3 py-2 rounded hover:bg-charcoal-800"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
