'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Ingredient } from '@/types/ingredient'

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
}

type IngredientFormData = Omit<Ingredient, 'id' | 'created_at' | 'updated_at'>

const defaultFormData: IngredientFormData = {
  name: '',
  slug: '',
  alternative_names: [],
  image_url: null,
  overview: null,
  flavor_profile: [],
  cultural_history: null,
  origin_regions: [],
  traditional_medicine_perspectives: {},
  modern_scientific_research: null,
  culinary_uses: null,
  preparation_methods: null,
  traditional_dishes: [],
  tags: [],
  published: false,
}

interface IngredientFormProps {
  initialData?: Ingredient
  mode: 'create' | 'edit'
}

const inputClass = 'w-full bg-charcoal-800 border border-charcoal-700 text-charcoal-100 rounded px-3 py-2 text-sm focus:outline-none focus:border-ochre-500'
const labelClass = 'block text-sm text-charcoal-400 mb-1'
const sectionClass = 'text-xs text-charcoal-500 uppercase tracking-widest mt-6 mb-2'

export default function IngredientForm({ initialData, mode }: IngredientFormProps) {
  const router = useRouter()

  const [form, setForm] = useState<IngredientFormData>(() => {
    if (!initialData) return defaultFormData
    return {
      name: initialData.name,
      slug: initialData.slug,
      alternative_names: initialData.alternative_names ?? [],
      image_url: initialData.image_url,
      overview: initialData.overview,
      flavor_profile: initialData.flavor_profile ?? [],
      cultural_history: initialData.cultural_history,
      origin_regions: initialData.origin_regions ?? [],
      traditional_medicine_perspectives: initialData.traditional_medicine_perspectives ?? {},
      modern_scientific_research: initialData.modern_scientific_research,
      culinary_uses: initialData.culinary_uses,
      preparation_methods: initialData.preparation_methods,
      traditional_dishes: initialData.traditional_dishes ?? [],
      tags: initialData.tags ?? [],
      published: initialData.published,
    }
  })

  const [tmpJson, setTmpJson] = useState<string>(() =>
    initialData?.traditional_medicine_perspectives
      ? JSON.stringify(initialData.traditional_medicine_perspectives, null, 2)
      : ''
  )

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [jsonError, setJsonError] = useState<string | undefined>()

  function set(field: keyof IngredientFormData, value: IngredientFormData[keyof IngredientFormData]) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleNameChange(val: string) {
    set('name', val)
    if (!form.slug || form.slug === slugify(form.name ?? '')) {
      set('slug', slugify(val))
    }
  }

  function splitComma(val: string): string[] {
    return val.split(',').map(s => s.trim()).filter(Boolean)
  }

  function validateTmpJson(value: string): boolean {
    if (!value.trim()) {
      setJsonError(undefined)
      return true
    }
    try {
      JSON.parse(value)
      setJsonError(undefined)
      return true
    } catch {
      setJsonError('Invalid JSON')
      return false
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!validateTmpJson(tmpJson)) return

    const payload = {
      ...form,
      traditional_medicine_perspectives: tmpJson.trim() ? JSON.parse(tmpJson) : {},
      image_url: form.image_url || null,
      overview: form.overview || null,
      cultural_history: form.cultural_history || null,
      modern_scientific_research: form.modern_scientific_research || null,
      culinary_uses: form.culinary_uses || null,
      preparation_methods: form.preparation_methods || null,
    }

    setSubmitting(true)
    try {
      const url = mode === 'create' ? '/api/admin/ingredients' : `/api/admin/ingredients/${initialData!.id}`
      const method = mode === 'create' ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const json = await res.json()
        setError(json.error ?? 'Save failed')
      } else {
        router.push('/admin/ingredients')
        router.refresh()
      }
    } catch {
      setError('Network error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-4">
      <p className={sectionClass}>Basic Info</p>

      <div>
        <label className={labelClass}>Name *</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={e => handleNameChange(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Slug *</label>
        <input
          type="text"
          required
          value={form.slug}
          onChange={e => set('slug', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Alternative Names (comma-separated)</label>
        <input
          type="text"
          value={form.alternative_names.join(', ')}
          onChange={e => set('alternative_names', splitComma(e.target.value))}
          className={inputClass}
          placeholder="turmeric, Indian saffron, jiang huang"
        />
      </div>

      <div>
        <label className={labelClass}>Image URL</label>
        <input
          type="text"
          value={form.image_url ?? ''}
          onChange={e => set('image_url', e.target.value)}
          className={inputClass}
        />
      </div>

      <p className={sectionClass}>Content</p>

      <div>
        <label className={labelClass}>Overview</label>
        <textarea
          rows={4}
          value={form.overview ?? ''}
          onChange={e => set('overview', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Flavor Profile (comma-separated)</label>
        <input
          type="text"
          value={form.flavor_profile.join(', ')}
          onChange={e => set('flavor_profile', splitComma(e.target.value))}
          className={inputClass}
          placeholder="earthy, bitter, pungent"
        />
      </div>

      <div>
        <label className={labelClass}>Cultural History</label>
        <textarea
          rows={4}
          value={form.cultural_history ?? ''}
          onChange={e => set('cultural_history', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Origin Regions (comma-separated)</label>
        <input
          type="text"
          value={form.origin_regions.join(', ')}
          onChange={e => set('origin_regions', splitComma(e.target.value))}
          className={inputClass}
          placeholder="South Asia, Southeast Asia"
        />
      </div>

      <div>
        <label className={labelClass}>Traditional Medicine Perspectives JSON</label>
        <p className="text-xs text-charcoal-500 mb-1">{"Enter as JSON object, e.g. {\"TCM\": \"...\", \"Ayurveda\": \"...\"}"}</p>
        <textarea
          rows={5}
          value={tmpJson}
          onChange={e => {
            setTmpJson(e.target.value)
            validateTmpJson(e.target.value)
          }}
          className={`${inputClass} font-mono text-xs ${jsonError ? 'border-terra-500' : ''}`}
          placeholder='{"TCM": "Used to move qi...", "Ayurveda": "Considered tridoshic..."}'
        />
        {jsonError && <p className="text-terra-400 text-xs mt-1">{jsonError}</p>}
      </div>

      <div>
        <label className={labelClass}>Modern Scientific Research</label>
        <textarea
          rows={4}
          value={form.modern_scientific_research ?? ''}
          onChange={e => set('modern_scientific_research', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Culinary Uses</label>
        <textarea
          rows={3}
          value={form.culinary_uses ?? ''}
          onChange={e => set('culinary_uses', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Preparation Methods</label>
        <textarea
          rows={3}
          value={form.preparation_methods ?? ''}
          onChange={e => set('preparation_methods', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Traditional Dishes (comma-separated)</label>
        <input
          type="text"
          value={form.traditional_dishes.join(', ')}
          onChange={e => set('traditional_dishes', splitComma(e.target.value))}
          className={inputClass}
          placeholder="Golden milk, Dal tadka, Haldi doodh"
        />
      </div>

      <div>
        <label className={labelClass}>Tags (comma-separated)</label>
        <input
          type="text"
          value={form.tags.join(', ')}
          onChange={e => set('tags', splitComma(e.target.value))}
          className={inputClass}
          placeholder="anti-inflammatory, root, spice"
        />
      </div>

      <p className={sectionClass}>Publish</p>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.published}
          onChange={e => set('published', e.target.checked)}
          className="w-4 h-4 rounded accent-ochre-600"
        />
        <span className="text-sm text-charcoal-300">Published</span>
      </label>

      {error && <p className="text-terra-400 text-sm">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-ochre-600 hover:bg-ochre-500 active:bg-ochre-700 text-white text-sm font-medium px-5 py-2 rounded transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-400"
        >
          {submitting ? 'Saving…' : mode === 'create' ? 'Create Ingredient' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/ingredients')}
          className="text-sm text-charcoal-400 hover:text-charcoal-200 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-charcoal-500 px-3 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
