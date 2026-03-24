'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-display text-charcoal-100 text-center mb-8">
          Ancient Pantry Admin
        </h1>
        <form onSubmit={handleLogin} className="bg-charcoal-900 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm text-charcoal-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-charcoal-800 text-charcoal-100 rounded px-3 py-2 text-sm border border-charcoal-700 focus:outline-none focus:border-ochre-500"
            />
          </div>
          <div>
            <label className="block text-sm text-charcoal-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-charcoal-800 text-charcoal-100 rounded px-3 py-2 text-sm border border-charcoal-700 focus:outline-none focus:border-ochre-500"
            />
          </div>
          {error && (
            <p className="text-terra-400 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ochre-600 hover:bg-ochre-500 disabled:opacity-50 text-white rounded px-4 py-2 text-sm font-medium transition-colors"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
