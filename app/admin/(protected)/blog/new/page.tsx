'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
}

const fieldClass = 'bg-charcoal-800 border border-charcoal-700 text-charcoal-100 rounded px-3 py-2 text-sm focus:outline-none focus:border-ochre-500 w-full'
const labelClass = 'block text-sm text-charcoal-400 mb-1'

export default function NewBlogPostPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState('')
  const [published, setPublished] = useState(false)

  function handleTitleChange(value: string) {
    setTitle(value)
    setSlug(slugify(value))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      title,
      slug,
      body: body || null,
      tags: tags.split(',').map(s => s.trim()).filter(Boolean),
      published,
    }

    const res = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push('/admin/blog')
    } else {
      const json = await res.json()
      setError(json.error ?? 'Save failed')
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blog" className="text-charcoal-400 hover:text-charcoal-100 text-sm transition-colors">
          ← Blog Posts
        </Link>
        <h1 className="text-2xl font-display text-charcoal-100">New Blog Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-charcoal-900 rounded-lg p-6 space-y-5">
        <div>
          <label className={labelClass}>Title *</label>
          <input type="text" required value={title} onChange={e => handleTitleChange(e.target.value)} className={fieldClass} />
        </div>

        <div>
          <label className={labelClass}>Slug *</label>
          <input type="text" required value={slug} onChange={e => setSlug(e.target.value)} className={fieldClass} />
        </div>

        <div>
          <label className={labelClass}>Body (Markdown)</label>
          <textarea value={body} onChange={e => setBody(e.target.value)} rows={16} className={fieldClass} />
        </div>

        <div>
          <label className={labelClass}>Tags (comma-separated)</label>
          <input type="text" value={tags} onChange={e => setTags(e.target.value)} className={fieldClass} />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={e => setPublished(e.target.checked)}
            className="rounded border-charcoal-700 bg-charcoal-800 text-ochre-600 focus:ring-ochre-500"
          />
          <label htmlFor="published" className="text-sm text-charcoal-400">Published</label>
        </div>

        {error && <p className="text-terra-400 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-ochre-600 hover:bg-ochre-500 disabled:opacity-50 text-white rounded px-4 py-2 text-sm font-medium transition-colors"
          >
            {saving ? 'Saving…' : 'Save Post'}
          </button>
          <Link href="/admin/blog" className="text-charcoal-400 hover:text-charcoal-100 text-sm px-4 py-2 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
