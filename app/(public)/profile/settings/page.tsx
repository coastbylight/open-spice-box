'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const COOKING_SKILLS = ['beginner', 'intermediate', 'advanced'] as const

const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Gluten-Free',
  'Dairy-Free',
  'Paleo',
  'Keto',
  'Halal',
  'Kosher',
  'Low-Sodium',
  'Nut-Free',
]

const CUISINE_OPTIONS = [
  'Chinese',
  'Japanese',
  'Korean',
  'Thai',
  'Vietnamese',
  'Indian',
  'Middle Eastern',
  'Mediterranean',
  'Mexican',
  'Italian',
  'French',
  'African',
  'Caribbean',
  'South American',
  'Ayurvedic',
  'Traditional Chinese Medicine',
]

interface ProfileData {
  display_name: string
  bio: string
  cooking_skill: string
  dietary_preferences: string[]
  cuisine_interests: string[]
  favorite_ingredients: string[]
  public_collections: boolean
}

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState<ProfileData>({
    display_name: '',
    bio: '',
    cooking_skill: '',
    dietary_preferences: [],
    cuisine_interests: [],
    favorite_ingredients: [],
    public_collections: true,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [ingredientInput, setIngredientInput] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    let cancelled = false

    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login?redirectTo=/profile/settings')
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('display_name, bio, cooking_skill, dietary_preferences, cuisine_interests, favorite_ingredients, public_collections')
        .eq('id', user.id)
        .single()

      if (cancelled) return

      if (data) {
        setProfile({
          display_name: data.display_name || '',
          bio: data.bio || '',
          cooking_skill: data.cooking_skill || '',
          dietary_preferences: data.dietary_preferences || [],
          cuisine_interests: data.cuisine_interests || [],
          favorite_ingredients: data.favorite_ingredients || [],
          public_collections: data.public_collections ?? true,
        })
      }
      setLoading(false)
    }

    load()
    return () => { cancelled = true }
  }, [supabase, router])

  const toggleArrayItem = useCallback((field: 'dietary_preferences' | 'cuisine_interests', value: string) => {
    setProfile(prev => {
      const arr = prev[field]
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter(v => v !== value)
          : [...arr, value],
      }
    })
  }, [])

  const addIngredient = useCallback(() => {
    const trimmed = ingredientInput.trim()
    if (!trimmed) return
    if (profile.favorite_ingredients.includes(trimmed)) {
      setIngredientInput('')
      return
    }
    setProfile(prev => ({
      ...prev,
      favorite_ingredients: [...prev.favorite_ingredients, trimmed],
    }))
    setIngredientInput('')
  }, [ingredientInput, profile.favorite_ingredients])

  const removeIngredient = useCallback((ingredient: string) => {
    setProfile(prev => ({
      ...prev,
      favorite_ingredients: prev.favorite_ingredients.filter(i => i !== ingredient),
    }))
  }, [])

  const handleSave = useCallback(async () => {
    setSaving(true)
    setFeedback(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not signed in')

      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: profile.display_name.trim(),
          bio: profile.bio.trim() || null,
          cooking_skill: profile.cooking_skill || null,
          dietary_preferences: profile.dietary_preferences,
          cuisine_interests: profile.cuisine_interests,
          favorite_ingredients: profile.favorite_ingredients,
          public_collections: profile.public_collections,
        })
        .eq('id', user.id)

      if (error) throw error

      setFeedback({ type: 'success', message: 'Profile updated successfully.' })
      setTimeout(() => setFeedback(null), 4000)
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to save profile.',
      })
    } finally {
      setSaving(false)
    }
  }, [profile, supabase])

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-parchment-100 rounded w-48" />
          <div className="h-10 bg-parchment-100 rounded" />
          <div className="h-24 bg-parchment-100 rounded" />
          <div className="h-10 bg-parchment-100 rounded w-32" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl text-charcoal-900 tracking-tight mb-8">
        Profile Settings
      </h1>

      {/* Feedback */}
      {feedback && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg text-sm font-body ${
            feedback.type === 'success'
              ? 'bg-sage-50 text-sage-700 border border-sage-200'
              : 'bg-lacquer-50 text-lacquer-700 border border-lacquer-200'
          }`}
          role="alert"
        >
          {feedback.message}
        </div>
      )}

      <div className="space-y-8">
        {/* Display Name */}
        <div>
          <label htmlFor="display_name" className="block text-sm font-body text-charcoal-700 mb-1.5">
            Display Name
          </label>
          <input
            id="display_name"
            type="text"
            value={profile.display_name}
            onChange={(e) => setProfile(prev => ({ ...prev, display_name: e.target.value }))}
            className="w-full bg-white border border-parchment-200 rounded-lg px-4 py-2.5 text-sm text-charcoal-800 placeholder-charcoal-400 shadow-[0_1px_4px_-1px_rgba(139,90,43,0.06)] focus:outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
          />
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-body text-charcoal-700 mb-1.5">
            Bio
          </label>
          <textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
            rows={3}
            placeholder="Tell us about your cooking journey..."
            className="w-full bg-white border border-parchment-200 rounded-lg px-4 py-2.5 text-sm text-charcoal-800 placeholder-charcoal-400 shadow-[0_1px_4px_-1px_rgba(139,90,43,0.06)] focus:outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors resize-none"
          />
        </div>

        {/* Cooking Skill */}
        <div>
          <label htmlFor="cooking_skill" className="block text-sm font-body text-charcoal-700 mb-1.5">
            Cooking Skill
          </label>
          <select
            id="cooking_skill"
            value={profile.cooking_skill}
            onChange={(e) => setProfile(prev => ({ ...prev, cooking_skill: e.target.value }))}
            className="w-full bg-white border border-parchment-200 rounded-lg px-4 py-2.5 text-sm text-charcoal-800 shadow-[0_1px_4px_-1px_rgba(139,90,43,0.06)] focus:outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
          >
            <option value="">Select your level</option>
            {COOKING_SKILLS.map(skill => (
              <option key={skill} value={skill} className="capitalize">
                {skill.charAt(0).toUpperCase() + skill.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Dietary Preferences */}
        <fieldset>
          <legend className="text-sm font-body text-charcoal-700 mb-3">Dietary Preferences</legend>
          <div className="flex flex-wrap gap-2">
            {DIETARY_OPTIONS.map(option => (
              <label
                key={option}
                className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer transition-colors duration-150 focus-within:ring-2 focus-within:ring-ochre-500 focus-within:ring-offset-1 ${
                  profile.dietary_preferences.includes(option)
                    ? 'bg-sage-600 text-white border-sage-600'
                    : 'bg-white text-charcoal-600 border-parchment-200 hover:border-sage-300 hover:text-sage-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={profile.dietary_preferences.includes(option)}
                  onChange={() => toggleArrayItem('dietary_preferences', option)}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Cuisine Interests */}
        <fieldset>
          <legend className="text-sm font-body text-charcoal-700 mb-3">Cuisine Interests</legend>
          <div className="flex flex-wrap gap-2">
            {CUISINE_OPTIONS.map(option => (
              <label
                key={option}
                className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer transition-colors duration-150 focus-within:ring-2 focus-within:ring-ochre-500 focus-within:ring-offset-1 ${
                  profile.cuisine_interests.includes(option)
                    ? 'bg-ochre-600 text-white border-ochre-600'
                    : 'bg-white text-charcoal-600 border-parchment-200 hover:border-ochre-300 hover:text-ochre-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={profile.cuisine_interests.includes(option)}
                  onChange={() => toggleArrayItem('cuisine_interests', option)}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Favorite Ingredients */}
        <div>
          <label htmlFor="ingredient_input" className="block text-sm font-body text-charcoal-700 mb-1.5">
            Favorite Ingredients
          </label>
          <div className="flex gap-2 mb-3">
            <input
              id="ingredient_input"
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addIngredient() } }}
              placeholder="Type an ingredient and press Enter"
              className="flex-1 bg-white border border-parchment-200 rounded-lg px-4 py-2.5 text-sm text-charcoal-800 placeholder-charcoal-400 shadow-[0_1px_4px_-1px_rgba(139,90,43,0.06)] focus:outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
            />
            <button
              type="button"
              onClick={addIngredient}
              className="text-sm px-4 py-2.5 bg-parchment-100 text-charcoal-600 hover:bg-parchment-200 rounded-lg border border-parchment-200 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
            >
              Add
            </button>
          </div>
          {profile.favorite_ingredients.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {profile.favorite_ingredients.map(ing => (
                <span
                  key={ing}
                  className="inline-flex items-center gap-1 text-xs bg-terra-50 text-terra-700 border border-terra-200 rounded-full px-3 py-1"
                >
                  {ing}
                  <button
                    type="button"
                    onClick={() => removeIngredient(ing)}
                    className="ml-0.5 text-terra-400 hover:text-terra-600 transition-colors focus:outline-none"
                    aria-label={`Remove ${ing}`}
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Public Collections Toggle */}
        <div className="flex items-center justify-between py-4 border-t border-parchment-100">
          <div>
            <p className="text-sm font-body text-charcoal-700">Make my collections public</p>
            <p className="text-xs text-charcoal-400 mt-0.5">Others can view your saved recipe collections</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={profile.public_collections}
            onClick={() => setProfile(prev => ({ ...prev, public_collections: !prev.public_collections }))}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2 ${
              profile.public_collections ? 'bg-sage-500' : 'bg-charcoal-200'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                profile.public_collections ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Save */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !profile.display_name.trim()}
            className="text-sm font-body px-6 py-2.5 bg-ochre-600 text-white rounded-lg hover:bg-ochre-700 active:bg-ochre-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2 shadow-[0_2px_8px_-2px_rgba(139,90,43,0.2)]"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
