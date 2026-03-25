'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import StarRating from './StarRating'

// ─── Types ──────────────────────────────────────────────────────────────────

interface RatingSummaryProps {
  recipeId: string
  averageRating: number
  ratingCount: number
  distribution: Record<number, number>
  onDistributionLoaded?: (data: {
    averageRating: number
    ratingCount: number
    distribution: Record<number, number>
  }) => void
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function RatingSummary({
  recipeId,
  averageRating: initialAvg,
  ratingCount: initialCount,
  distribution: initialDist,
  onDistributionLoaded,
}: RatingSummaryProps) {
  const [averageRating, setAverageRating] = useState(initialAvg)
  const [ratingCount, setRatingCount] = useState(initialCount)
  const [distribution, setDistribution] = useState<Record<number, number>>(initialDist)

  useEffect(() => {
    const supabase = createClient()

    async function fetchDistribution() {
      const { data, error } = await supabase
        .from('recipe_ratings')
        .select('rating')
        .eq('recipe_id', recipeId)

      if (error || !data) return

      const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      let sum = 0
      for (const row of data) {
        dist[row.rating] = (dist[row.rating] || 0) + 1
        sum += row.rating
      }

      const count = data.length
      const avg = count > 0 ? sum / count : 0

      setDistribution(dist)
      setRatingCount(count)
      setAverageRating(avg)

      onDistributionLoaded?.({ averageRating: avg, ratingCount: count, distribution: dist })
    }

    fetchDistribution()
  }, [recipeId, onDistributionLoaded])

  const maxCount = Math.max(...Object.values(distribution), 1)

  return (
    <div className="bg-white border border-parchment-200 rounded-xl p-6 shadow-[0_2px_12px_-2px_rgba(139,90,43,0.08)]">
      <h3 className="font-display text-lg text-charcoal-900 mb-4">Ratings</h3>

      <div className="flex items-center gap-4 mb-5">
        {/* Large average number */}
        <span className="font-display text-4xl text-charcoal-900 leading-none tabular-nums">
          {ratingCount > 0 ? averageRating.toFixed(1) : '—'}
        </span>

        <div className="flex flex-col gap-1">
          <StarRating rating={averageRating} size="md" />
          <span className="text-xs text-charcoal-400 font-body">
            {ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'}
          </span>
        </div>
      </div>

      {/* Histogram bars */}
      <div className="space-y-1.5">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = distribution[star] || 0
          const pct = ratingCount > 0 ? (count / maxCount) * 100 : 0

          return (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs text-charcoal-500 font-body w-3 text-right tabular-nums">
                {star}
              </span>
              <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill="#c8871a"
                  stroke="#c8871a"
                  strokeWidth="0.5"
                />
              </svg>
              <div className="flex-1 h-2 bg-parchment-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-ochre-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-charcoal-400 font-body w-6 text-right tabular-nums">
                {count}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
