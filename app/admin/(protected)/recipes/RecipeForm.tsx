'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Recipe } from '@/types/recipe'

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
}

type RecipeFormData = Omit<Recipe, 'id' | 'created_at' | 'updated_at'>

const defaultFormData: RecipeFormData = {
  title: '',
  slug: '',
  subtitle: null,
  cultural_origin: null,
  tradition: null,
  headnote: null,
  yield: null,
  prep_time: null,
  cook_time: null,
  total_time: null,
  difficulty: null,
  ingredients: [],
  instructions: [],
  key_ingredient_benefits: null,
  why_this_works: null,
  substitutions: null,
  serving_suggestions: null,
  storage_reheating: null,
  cultural_notes: null,
  hero_image_url: null,
  source_name: null,
  source_url: null,
  source_author: null,
  tags: [],
  seo_title: null,
  meta_description: null,
  published: false,
}

interface RecipeFormProps {
  initialData?: Recipe
  mode: 'create' | 'edit'
}

const inputClass = 'w-full bg-charcoal-800 border border-charcoal-700 text-charcoal-100 rounded px-3 py-2 text-sm focus:outline-none focus:border-ochre-500'
const labelClass = 'block text-sm text-charcoal-400 mb-1'
const sectionClass = 'text-xs text-charcoal-500 uppercase tracking-widest mt-6 mb-2'

export default function RecipeForm({ initialData, mode }: RecipeFormProps) {
  const router = useRouter()

  const [form, setForm] = useState<RecipeFormData>(() => {
    if (!initialData) return defaultFormData
    return {
      title: initialData.title,
      slug: initialData.slug,
      subtitle: initialData.subtitle,
      cultural_origin: initialData.cultural_origin,
      tradition: initialData.tradition,
      headnote: initialData.headnote,
      yield: initialData.yield,
      prep_time: initialData.prep_time,
      cook_time: initialData.cook_time,
      total_time: initialData.total_time,
      difficulty: initialData.difficulty,
      ingredients: initialData.ingredients,
      instructions: initialData.instructions,
      key_ingredient_benefits: initialData.key_ingredient_benefits,
      why_this_works: initialData.why_this_works,
      substitutions: initialData.substitutions,
      serving_suggestions: initialData.serving_suggestions,
      storage_reheating: initialData.storage_reheating,
      cultural_notes: initialData.cultural_notes,
      hero_image_url: initialData.hero_image_url,
      source_name: initialData.source_name,
      source_url: initialData.source_url,
      source_author: initialData.source_author,
      tags: initialData.tags ?? [],
      seo_title: initialData.seo_title,
      meta_description: initialData.meta_description,
      published: initialData.published,
    }
  })

  const [ingredientsJson, setIngredientsJson] = useState(() =>
    initialData?.ingredients ? JSON.stringify(initialData.ingredients, null, 2) : ''
  )
  const [instructionsJson, setInstructionsJson] = useState(() =>
    initialData?.instructions ? JSON.stringify(initialData.instructions, null, 2) : ''
  )

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [jsonErrors, setJsonErrors] = useState<{ ingredients?: string; instructions?: string }>({})

  function set(field: keyof RecipeFormData, value: RecipeFormData[keyof RecipeFormData]) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleTitleChange(val: string) {
    set('title', val)
    if (!form.slug || form.slug === slugify(form.title ?? '')) {
      set('slug', slugify(val))
    }
  }

  function validateJson(field: 'ingredients' | 'instructions', value: string): boolean {
    if (!value.trim()) {
      setJsonErrors(prev => ({ ...prev, [field]: undefined }))
      return true
    }
    try {
      JSON.parse(value)
      setJsonErrors(prev => ({ ...prev, [field]: undefined }))
      return true
    } catch {
      setJsonErrors(prev => ({ ...prev, [field]: 'Invalid JSON' }))
      return false
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    // Validate JSON fields
    const ingValid = validateJson('ingredients', ingredientsJson)
    const instValid = validateJson('instructions', instructionsJson)
    if (!ingValid || !instValid) return

    const payload = {
      ...form,
      ingredients: ingredientsJson.trim() ? JSON.parse(ingredientsJson) : [],
      instructions: instructionsJson.trim() ? JSON.parse(instructionsJson) : [],
      subtitle: form.subtitle || null,
      cultural_origin: form.cultural_origin || null,
      tradition: form.tradition || null,
      headnote: form.headnote || null,
      yield: form.yield || null,
      prep_time: form.prep_time || null,
      cook_time: form.cook_time || null,
      total_time: form.total_time || null,
      key_ingredient_benefits: form.key_ingredient_benefits || null,
      why_this_works: form.why_this_works || null,
      substitutions: form.substitutions || null,
      serving_suggestions: form.serving_suggestions || null,
      storage_reheating: form.storage_reheating || null,
      cultural_notes: form.cultural_notes || null,
      hero_image_url: form.hero_image_url || null,
      source_name: form.source_name || null,
      source_url: form.source_url || null,
      source_author: form.source_author || null,
      seo_title: form.seo_title || null,
      meta_description: form.meta_description || null,
    }

    setSubmitting(true)
    try {
      const url = mode === 'create' ? '/api/admin/recipes' : `/api/admin/recipes/${initialData!.id}`
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
        router.push('/admin/recipes')
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
        <label className={labelClass}>Title *</label>
        <input
          type="text"
          required
          value={form.title}
          onChange={e => handleTitleChange(e.target.value)}
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
        <label className={labelClass}>Subtitle</label>
        <input
          type="text"
          value={form.subtitle ?? ''}
          onChange={e => set('subtitle', e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Cultural Origin</label>
          <input
            type="text"
            value={form.cultural_origin ?? ''}
            onChange={e => set('cultural_origin', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Tradition</label>
          <input
            type="text"
            value={form.tradition ?? ''}
            onChange={e => set('tradition', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Difficulty</label>
        <select
          value={form.difficulty ?? ''}
          onChange={e => set('difficulty', (e.target.value as Recipe['difficulty']) || null)}
          className={inputClass}
        >
          <option value="">— Select —</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Involved">Involved</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Headnote</label>
        <textarea
          rows={3}
          value={form.headnote ?? ''}
          onChange={e => set('headnote', e.target.value)}
          className={inputClass}
        />
      </div>

      <p className={sectionClass}>At a Glance</p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <label className={labelClass}>Yield</label>
          <input
            type="text"
            value={form.yield ?? ''}
            onChange={e => set('yield', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Prep Time</label>
          <input
            type="text"
            value={form.prep_time ?? ''}
            onChange={e => set('prep_time', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Cook Time</label>
          <input
            type="text"
            value={form.cook_time ?? ''}
            onChange={e => set('cook_time', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Total Time</label>
          <input
            type="text"
            value={form.total_time ?? ''}
            onChange={e => set('total_time', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <p className={sectionClass}>Content</p>

      <div>
        <label className={labelClass}>Ingredients JSON</label>
        <p className="text-xs text-charcoal-500 mb-1">Enter as JSON array</p>
        <textarea
          rows={6}
          value={ingredientsJson}
          onChange={e => {
            setIngredientsJson(e.target.value)
            validateJson('ingredients', e.target.value)
          }}
          className={`${inputClass} font-mono text-xs ${jsonErrors.ingredients ? 'border-terra-500' : ''}`}
          placeholder='[{"amount": "1", "unit": "cup", "ingredient": "flour", "prep_note": null, "optional": false}]'
        />
        {jsonErrors.ingredients && <p className="text-terra-400 text-xs mt-1">{jsonErrors.ingredients}</p>}
      </div>

      <div>
        <label className={labelClass}>Instructions JSON</label>
        <p className="text-xs text-charcoal-500 mb-1">Enter as JSON array</p>
        <textarea
          rows={6}
          value={instructionsJson}
          onChange={e => {
            setInstructionsJson(e.target.value)
            validateJson('instructions', e.target.value)
          }}
          className={`${inputClass} font-mono text-xs ${jsonErrors.instructions ? 'border-terra-500' : ''}`}
          placeholder='[{"step": 1, "text": "Mix ingredients together."}]'
        />
        {jsonErrors.instructions && <p className="text-terra-400 text-xs mt-1">{jsonErrors.instructions}</p>}
      </div>

      <div>
        <label className={labelClass}>Key Ingredient Benefits</label>
        <textarea
          rows={3}
          value={form.key_ingredient_benefits ?? ''}
          onChange={e => set('key_ingredient_benefits', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Why This Works</label>
        <textarea
          rows={3}
          value={form.why_this_works ?? ''}
          onChange={e => set('why_this_works', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Substitutions</label>
        <textarea
          rows={3}
          value={form.substitutions ?? ''}
          onChange={e => set('substitutions', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Serving Suggestions</label>
        <textarea
          rows={3}
          value={form.serving_suggestions ?? ''}
          onChange={e => set('serving_suggestions', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Storage & Reheating</label>
        <textarea
          rows={3}
          value={form.storage_reheating ?? ''}
          onChange={e => set('storage_reheating', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Cultural Notes</label>
        <textarea
          rows={3}
          value={form.cultural_notes ?? ''}
          onChange={e => set('cultural_notes', e.target.value)}
          className={inputClass}
        />
      </div>

      <p className={sectionClass}>Media & Source</p>

      <div>
        <label className={labelClass}>Hero Image URL</label>
        <input
          type="text"
          value={form.hero_image_url ?? ''}
          onChange={e => set('hero_image_url', e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Source Name</label>
          <input
            type="text"
            value={form.source_name ?? ''}
            onChange={e => set('source_name', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Source URL</label>
          <input
            type="text"
            value={form.source_url ?? ''}
            onChange={e => set('source_url', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Source Author</label>
          <input
            type="text"
            value={form.source_author ?? ''}
            onChange={e => set('source_author', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Tags (comma-separated)</label>
        <input
          type="text"
          value={form.tags.join(', ')}
          onChange={e => set('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
          className={inputClass}
          placeholder="fermented, grain-free, healing"
        />
      </div>

      <p className={sectionClass}>SEO</p>

      <div>
        <label className={labelClass}>SEO Title</label>
        <input
          type="text"
          value={form.seo_title ?? ''}
          onChange={e => set('seo_title', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Meta Description (max 160 chars)</label>
        <textarea
          rows={2}
          maxLength={160}
          value={form.meta_description ?? ''}
          onChange={e => set('meta_description', e.target.value)}
          className={inputClass}
        />
        <p className="text-xs text-charcoal-500 mt-1">{(form.meta_description ?? '').length}/160</p>
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
          {submitting ? 'Saving…' : mode === 'create' ? 'Create Recipe' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/recipes')}
          className="text-sm text-charcoal-400 hover:text-charcoal-200 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-charcoal-500 px-3 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
