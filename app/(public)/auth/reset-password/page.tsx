'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/'

  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
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
          Reset Password
        </h1>
        <p className="text-center text-charcoal-500 font-body text-sm mb-8">
          Enter your email and we&apos;ll send you a reset link
        </p>

        {/* Card */}
        <div className="bg-white rounded-xl border border-parchment-200 p-8 shadow-sm">
          {success ? (
            /* Success state */
            <div className="text-center py-4">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-50">
                <svg className="h-7 w-7 text-sage-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className="text-xl font-display font-bold text-charcoal-900 mb-2">
                Check Your Email
              </h2>
              <p className="text-sm font-body text-charcoal-500 mb-6 leading-relaxed">
                If an account exists for <span className="font-medium text-charcoal-700">{email}</span>,
                you&apos;ll receive a password reset link shortly.
              </p>
              <Link
                href={`/auth/login${redirectTo !== '/' ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
                className="inline-flex items-center text-sm font-body font-medium text-ochre-600 hover:text-ochre-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-400 focus-visible:ring-offset-2 rounded"
              >
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
              {/* Error message */}
              {error && (
                <div className="mb-6 rounded-lg bg-terra-50 border border-terra-200 px-4 py-3 text-terra-600 text-sm font-body">
                  {error}
                </div>
              )}

              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-body font-medium text-charcoal-700 mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
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
                      Sending...
                    </span>
                  ) : (
                    'Send reset link'
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Back to login */}
        {!success && (
          <p className="text-center text-sm font-body text-charcoal-500 mt-6">
            Remember your password?{' '}
            <Link
              href={`/auth/login${redirectTo !== '/' ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
              className="font-medium text-ochre-600 hover:text-ochre-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-400 focus-visible:ring-offset-2 rounded"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
