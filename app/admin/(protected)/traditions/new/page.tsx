'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
}

const fieldClass = 'bg-charcoal-800 border border-charcoal-700 text-charcoal-100 rounded px-3 py-2 text-sm focus:outline-none focus:border-ochre-500 w-full'
const labelClass = 'block text-sm text-charcoal-400 mb-1'

export default function NewTraditionPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [region, setRegion] = useState('')
  const [philosophy, setPhilosophy] = useState('')
  const [foodPrinciples, setFoodPrinciples] = useState('')
  const [commonIngredients, setCommonIngredients] = useState('')
  const [cookingTechniques, setCookingTechniques] = useState('')
  const [representativeDishes, setRepresentativeDishes] = useState('')
  const [published, setPublished] = useState(false)

  function handleNameChange(value: string) {
    setName(value)
    setSlug(slugify(value))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      name,
      slug,
      region: region || null,
      philosophy: philosophy || null,
      food_principles: foodPrinciples || null,
      common_ingredients: commonIngredients.split(',').map(s => s.trim()).filter(Boolean),
      cooking_techniques: cookingTechniques.split(',').map(s => s.trim()).filter(Boolean),
      representative_dishes: representativeDishes.split(',').map(s => s.trim()).filter(Boolean),
      published,
    }

    const res = await fetch('/api/admin/traditions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push('/admin/traditions')
    } else {
      const json = await res.json()
      setError(json.error ?? 'Save failed')
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/traditions" className="text-charcoal-400 hover:text-charcoal-100 text-sm transition-colors">
          ← Traditions
        </Link>
        <h1 className="text-2xl font-display text-charcoal-100">New Tradition</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-charcoal-900 rounded-lg p-6 space-y-5">
        <div>
          <label className={labelClass}>Name *</label>
          <input type="text" required value={name} onChange={e => handleNameChange(e.target.value)} className={fieldClass} />
        </div>

        <div>
          <label className={labelClass}>Slug *</label>
          <input type="text" required value={slug} onChange={e => setSlug(e.target.value)} className={fieldClass} />
        </div>

        <div>
          <label className={labelClass}>Region</label>
          <input type="text" value={region} onChange={e => setRegion(e.target.value)} className={fieldClass} />
        </div>

        <div>
          <label className={labelClass}>Philosophy</label>
          <textarea value={philosophy} onChange={e => setPhilosophy(e.target.value)} rows={4} className={fieldClass} />
        </div>

        <div>
          <label className={labelClass}>Food Principles</label>
          <textarea value={foodPrinciples} onChange={e => setFoodPrinciples(e.target.value)} rows={4} className={fieldClass} />
        </div>

        <div>
          <label className={labelClass}>Common Ingredients (comma-separated)</label>
          <input type="text" value={commonIngredients} onChange={e => setCommonIngredients(e.target.value)} className={fieldClass} />
        </div>

        <div>
          <label className={labelClass}>Cooking Techniques (comma-separated)</label>
          <input type="text" value={cookingTechniques} onChange={e => setCookingTechniques(e.target.value)} className={fieldClass} />
        </div>

        <div>
          <label className={labelClass}>Representative Dishes (comma-separated)</label>
          <input type="text" value={representativeDishes} onChange={e => setRepresentativeDishes(e.target.value)} className={fieldClass} />
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
            {saving ? 'Saving…' : 'Save Tradition'}
          </button>
          <Link href="/admin/traditions" className="text-charcoal-400 hover:text-charcoal-100 text-sm px-4 py-2 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
