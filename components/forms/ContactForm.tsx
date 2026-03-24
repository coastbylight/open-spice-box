'use client'

import { useState, useRef, useEffect } from 'react'

const inputClass =
  'w-full bg-white border border-parchment-200 rounded-lg px-4 py-2.5 text-sm text-charcoal-800 placeholder-charcoal-400 shadow-[0_1px_4px_-1px_rgba(139,90,43,0.06)] focus:outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors'
const labelClass = 'block text-xs uppercase tracking-wider text-charcoal-500 mb-1.5'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'success') {
      successRef.current?.focus()
    }
  }, [status])

  function set(field: keyof typeof form, val: string) {
    setForm(prev => ({ ...prev, [field]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(json.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
      } else {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="bg-sage-50 border border-sage-100 rounded-xl p-6 text-center focus:outline-none"
      >
        <p className="font-display text-lg text-sage-800 mb-1">Message received.</p>
        <p className="text-sm text-charcoal-500">We&apos;ll get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className={labelClass}>Name</label>
        <input
          id="name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={e => set('name', e.target.value)}
          className={inputClass}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email</label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={e => set('email', e.target.value)}
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={e => set('message', e.target.value)}
          className={inputClass}
          placeholder="What's on your mind?"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-terra-600" role="alert">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center bg-ochre-600 hover:bg-ochre-500 active:bg-ochre-700 text-white font-medium px-7 py-3 rounded-lg text-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
