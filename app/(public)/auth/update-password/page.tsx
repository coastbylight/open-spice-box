'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const supabase = createClient()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/auth/login?success=' + encodeURIComponent('Password updated successfully. Please sign in with your new password.'))
    }
  }

  return (
    <div className="min-h-[80vh] bg-parchment-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Open Spice Box"
              width={64}
              height={64}
              className="rounded-full"
            />
          </Link>
        </div>

        <h1 className="text-3xl font-display font-bold text-charcoal-900 text-center mb-2 tracking-tight">
          Set New Password
        </h1>
        <p className="text-center text-charcoal-500 font-body text-sm mb-8">
          Choose a new password for your account
        </p>

        {/* Card */}
        <div className="bg-white rounded-xl border border-parchment-200 p-8 shadow-sm">
          {/* Error message */}
          {error && (
            <div className="mb-6 rounded-lg bg-terra-50 border border-terra-200 px-4 py-3 text-terra-600 text-sm font-body">
              {error}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-body font-medium text-charcoal-700 mb-1.5">
                New Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="At least 6 characters"
                className="w-full rounded-lg border border-parchment-200 bg-white px-4 py-2.5 text-sm font-body text-charcoal-900 placeholder:text-charcoal-300 transition-colors duration-200 focus:outline-none focus:border-ochre-400 focus:ring-2 focus:ring-ochre-400/20"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-body font-medium text-charcoal-700 mb-1.5">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="Repeat your new password"
                className="w-full rounded-lg border border-parchment-200 bg-white px-4 py-2.5 text-sm font-body text-charcoal-900 placeholder:text-charcoal-300 transition-colors duration-200 focus:outline-none focus:border-ochre-400 focus:ring-2 focus:ring-ochre-400/20"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-ochre-600 px-4 py-2.5 text-sm font-body font-semibold text-white transition-colors duration-200 hover:bg-ochre-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-400 focus-visible:ring-offset-2 active:bg-ochre-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Updating...
                </span>
              ) : (
                'Update password'
              )}
            </button>
          </form>
        </div>

        {/* Back to login */}
        <p className="text-center text-sm font-body text-charcoal-500 mt-6">
          <Link
            href="/auth/login"
            className="font-medium text-ochre-600 hover:text-ochre-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-400 focus-visible:ring-offset-2 rounded"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
