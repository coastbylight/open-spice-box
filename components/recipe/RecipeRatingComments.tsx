'use client'

import { useState, useEffect, useCallback } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import RatingSummary from './RatingSummary'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

// ─── Types ──────────────────────────────────────────────────────────────────

interface RecipeRatingCommentsProps {
  recipeId: string
  recipeSlug: string
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function RecipeRatingComments({
  recipeId,
  recipeSlug,
}: RecipeRatingCommentsProps) {
  const [user, setUser] = useState<User | null>(null)
  const [existingRating, setExistingRating] = useState<number | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [ratingData, setRatingData] = useState({
    averageRating: 0,
    ratingCount: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>,
  })

  // Fetch user session on mount
  useEffect(() => {
    const supabase = createClient()

    async function getSession() {
      const { data: { user: sessionUser } } = await supabase.auth.getUser()
      setUser(sessionUser)

      // Fetch existing rating if user is signed in
      if (sessionUser) {
        const { data } = await supabase
          .from('recipe_ratings')
          .select('rating')
          .eq('recipe_id', recipeId)
          .eq('user_id', sessionUser.id)
          .maybeSingle()

        if (data) setExistingRating(data.rating)
      }
    }

    getSession()
  }, [recipeId])

  const handleDistributionLoaded = useCallback((data: {
    averageRating: number
    ratingCount: number
    distribution: Record<number, number>
  }) => {
    setRatingData(data)
  }, [])

  function handleSubmitted() {
    // Increment refresh key to trigger re-fetches in both RatingSummary and CommentList
    setRefreshKey((k) => k + 1)
  }

  return (
    <section
      id="ratings-comments"
      className="mt-16 pt-10 border-t border-parchment-200"
      aria-labelledby="ratings-comments-heading"
    >
      <h2
        id="ratings-comments-heading"
        className="font-display text-xl text-charcoal-900 tracking-tight mb-6"
      >
        Ratings &amp; Comments
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column: Summary + Form */}
        <div className="w-full lg:w-[340px] shrink-0 space-y-5">
          <RatingSummary
            key={`summary-${refreshKey}`}
            recipeId={recipeId}
            averageRating={ratingData.averageRating}
            ratingCount={ratingData.ratingCount}
            distribution={ratingData.distribution}
            onDistributionLoaded={handleDistributionLoaded}
          />
          <CommentForm
            recipeId={recipeId}
            recipeSlug={recipeSlug}
            user={user}
            onSubmitted={handleSubmitted}
            existingRating={existingRating}
          />
        </div>

        {/* Right column: Comments */}
        <div className="flex-1 min-w-0">
          <CommentList
            recipeId={recipeId}
            user={user}
            refreshKey={refreshKey}
          />
        </div>
      </div>
    </section>
  )
}
