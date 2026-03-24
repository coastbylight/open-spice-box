'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface RecipeRow {
  id: string
  title: string
  slug: string
  published: boolean
  created_at: string
  difficulty: string | null
  cultural_origin: string | null
}

export default function RecipeActions({ recipe }: { recipe: RecipeRow }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    if (!confirm(`Delete "${recipe.title}"? This cannot be undone.`)) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/recipes/${recipe.id}`, { method: 'DELETE' })
      if (!res.ok) {
        const json = await res.json()
        setError(json.error ?? 'Delete failed')
      } else {
        router.refresh()
      }
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  async function handleTogglePublish() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/recipes/${recipe.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !recipe.published }),
      })
      if (!res.ok) {
        const json = await res.json()
        setError(json.error ?? 'Update failed')
      } else {
        router.refresh()
      }
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {error && <span className="text-terra-400 text-xs mr-2">{error}</span>}
      <button
        onClick={handleTogglePublish}
        disabled={loading}
        className="text-xs px-2 py-1 rounded border border-charcoal-700 text-charcoal-300 hover:border-ochre-600 hover:text-ochre-400 transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-1 focus-visible:ring-ochre-500"
      >
        {recipe.published ? 'Unpublish' : 'Publish'}
      </button>
      <Link
        href={`/admin/recipes/${recipe.id}/edit`}
        className="text-xs px-2 py-1 rounded border border-charcoal-700 text-charcoal-300 hover:border-ochre-600 hover:text-ochre-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ochre-500"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-xs px-2 py-1 rounded border border-charcoal-700 text-charcoal-300 hover:border-terra-500 hover:text-terra-400 transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-1 focus-visible:ring-terra-500"
      >
        Delete
      </button>
    </div>
  )
}
