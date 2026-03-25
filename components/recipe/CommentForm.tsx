'use client'

import { useState, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import StarRating from './StarRating'

// ─── Types ──────────────────────────────────────────────────────────────────

interface CommentFormProps {
  recipeId: string
  recipeSlug: string
  user: User | null
  onSubmitted: () => void
  /** Pre-fill rating if user already rated standalone */
  existingRating?: number | null
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function CommentForm({
  recipeId,
  recipeSlug,
  user,
  onSubmitted,
  existingRating,
}: CommentFormProps) {
  const [rating, setRating] = useState(existingRating ?? 0)
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Sync if existingRating changes
  useEffect(() => {
    if (existingRating != null && existingRating > 0) {
      setRating(existingRating)
    }
  }, [existingRating])

  // ── Not signed in ──
  if (!user) {
    return (
      <div className="bg-white border border-parchment-200 rounded-xl p-6 shadow-[0_2px_12px_-2px_rgba(139,90,43,0.08)]">
        <p className="font-body text-sm text-charcoal-600 mb-4">
          Share your thoughts on this recipe.
        </p>
        <a
          href={`/auth/login?redirectTo=/recipes/${recipeSlug}`}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium
            bg-terra-600 text-white
            hover:bg-terra-700 active:bg-terra-800
            focus:outline-none focus-visible:ring-2 focus-visible:ring-terra-500 focus-visible:ring-offset-2
            transition-colors duration-150
            shadow-[0_1px_4px_rgba(180,63,22,0.25)]"
        >
          Sign in to rate and comment
        </a>
      </div>
    )
  }

  // ── Submit handler ──
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    if (rating === 0 && body.trim() === '') {
      setError('Please add a rating or a comment.')
      return
    }

    setSubmitting(true)
    setError(null)

    const supabase = createClient()

    try {
      // Upsert rating if provided
      if (rating > 0) {
        const { error: ratingErr } = await supabase
          .from('recipe_ratings')
          .upsert(
            { recipe_id: recipeId, user_id: user.id, rating },
            { onConflict: 'recipe_id,user_id' }
          )
        if (ratingErr) throw ratingErr
      }

      // Insert comment if body provided
      if (body.trim()) {
        const { error: commentErr } = await supabase
          .from('recipe_comments')
          .insert({
            recipe_id: recipeId,
            user_id: user.id,
            body: body.trim(),
            rating: rating > 0 ? rating : null,
          })
        if (commentErr) throw commentErr
      }

      // Reset form
      setBody('')
      setRating(0)
      onSubmitted()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white border border-parchment-200 rounded-xl p-6 shadow-[0_2px_12px_-2px_rgba(139,90,43,0.08)]">
      <h3 className="font-display text-lg text-charcoal-900 mb-4">Rate &amp; Comment</h3>

      <form onSubmit={handleSubmit}>
        {/* Star rating */}
        <div className="mb-4">
          <label className="block text-xs text-charcoal-500 font-body mb-2">
            Your rating <span className="text-charcoal-400">(optional)</span>
          </label>
          <StarRating
            rating={rating}
            size="lg"
            interactive
            onRate={setRating}
            label="Select your rating"
          />
        </div>

        {/* Comment textarea */}
        <div className="mb-4">
          <label
            htmlFor="comment-body"
            className="block text-xs text-charcoal-500 font-body mb-2"
          >
            Your comment <span className="text-charcoal-400">(optional)</span>
          </label>
          <textarea
            id="comment-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share your experience with this recipe..."
            rows={3}
            maxLength={2000}
            className="w-full rounded-lg border border-parchment-200 bg-parchment-50 px-3 py-2
              text-sm text-charcoal-800 font-body placeholder:text-charcoal-400
              focus:outline-none focus:ring-2 focus:ring-ochre-500 focus:border-ochre-500
              transition-colors duration-150 resize-y"
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="text-sm text-lacquer-600 font-body mb-3">{error}</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium
            bg-terra-600 text-white
            hover:bg-terra-700 active:bg-terra-800
            focus:outline-none focus-visible:ring-2 focus-visible:ring-terra-500 focus-visible:ring-offset-2
            transition-colors duration-150
            shadow-[0_1px_4px_rgba(180,63,22,0.25)]
            disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <svg
                className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  )
}
