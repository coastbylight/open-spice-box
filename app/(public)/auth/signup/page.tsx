'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'

export default function SignupPage() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/'

  const supabase = createClient()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSignup(e: React.FormEvent) {
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

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  async function handleGoogleSignup() {
    setGoogleLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    })

    if (error) {
      setError(error.message)
      setGoogleLoading(false)
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
              alt="Ancient Pantry"
              width={64}
              height={64}
              className="rounded-full"
            />
          </Link>
        </div>

        <h1 className="text-3xl font-display font-bold text-charcoal-900 text-center mb-2 tracking-tight">
          Create Your Account
        </h1>
        <p className="text-center text-charcoal-500 font-body text-sm mb-8">
          Join the Ancient Pantry community
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
                We&apos;ve sent a confirmation link to <span className="font-medium text-charcoal-700">{email}</span>.
                Click the link in the email to activate your account.
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

              {/* Google OAuth */}
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={googleLoading || loading}
                className="w-full flex items-center justify-center gap-3 rounded-lg border border-parchment-200 bg-white px-4 py-3 text-sm font-body font-medium text-charcoal-800 transition-colors duration-200 hover:bg-parchment-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-400 focus-visible:ring-offset-2 active:bg-parchment-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {googleLoading ? (
                  <svg className="h-5 w-5 animate-spin text-charcoal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                )}
                {googleLoading ? 'Connecting...' : 'Continue with Google'}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-parchment-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-charcoal-400 font-body">or sign up with email</span>
                </div>
              </div>

              {/* Signup form */}
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-body font-medium text-charcoal-700 mb-1.5">
                    Display Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="w-full rounded-lg border border-parchment-200 bg-white px-4 py-2.5 text-sm font-body text-charcoal-900 placeholder:text-charcoal-300 transition-colors duration-200 focus:outline-none focus:border-ochre-400 focus:ring-2 focus:ring-ochre-400/20"
                  />
                </div>
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
                <div>
                  <label htmlFor="password" className="block text-sm font-body font-medium text-charcoal-700 mb-1.5">
                    Password
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
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                    className="w-full rounded-lg border border-parchment-200 bg-white px-4 py-2.5 text-sm font-body text-charcoal-900 placeholder:text-charcoal-300 transition-colors duration-200 focus:outline-none focus:border-ochre-400 focus:ring-2 focus:ring-ochre-400/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="w-full rounded-lg bg-ochre-600 px-4 py-2.5 text-sm font-body font-semibold text-white transition-colors duration-200 hover:bg-ochre-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-400 focus-visible:ring-offset-2 active:bg-ochre-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    'Create account'
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Login link */}
        {!success && (
          <p className="text-center text-sm font-body text-charcoal-500 mt-6">
            Already have an account?{' '}
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
