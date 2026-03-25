'use client'

import { useState, useCallback } from 'react'

// ─── Types ──────────────────────────────────────────────────────────────────

interface StarRatingProps {
  rating: number
  maxStars?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onRate?: (rating: number) => void
  label?: string
}

// ─── Size map ───────────────────────────────────────────────────────────────

const sizeMap = {
  sm: { star: 'w-4 h-4', gap: 'gap-0.5' },
  md: { star: 'w-5 h-5', gap: 'gap-1' },
  lg: { star: 'w-7 h-7', gap: 'gap-1' },
} as const

// ─── Star SVG ───────────────────────────────────────────────────────────────

function StarIcon({
  filled,
  half,
  className,
}: {
  filled: boolean
  half: boolean
  className: string
}) {
  if (half) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <defs>
          <linearGradient id="halfStar">
            <stop offset="50%" stopColor="#c8871a" />
            <stop offset="50%" stopColor="#f2e5c5" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="url(#halfStar)"
          stroke="#c8871a"
          strokeWidth="0.5"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={filled ? '#c8871a' : '#f2e5c5'}
        stroke={filled ? '#c8871a' : '#e8d09e'}
        strokeWidth="0.5"
      />
    </svg>
  )
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function StarRating({
  rating,
  maxStars = 5,
  size = 'md',
  interactive = false,
  onRate,
  label,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const handleMouseEnter = useCallback((star: number) => {
    if (interactive) setHoverRating(star)
  }, [interactive])

  const handleMouseLeave = useCallback(() => {
    if (interactive) setHoverRating(0)
  }, [interactive])

  const handleClick = useCallback((star: number) => {
    if (interactive && onRate) onRate(star)
  }, [interactive, onRate])

  const handleKeyDown = useCallback((e: React.KeyboardEvent, star: number) => {
    if (!interactive || !onRate) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onRate(star)
    }
  }, [interactive, onRate])

  const displayRating = hoverRating || rating
  const { star: starSize, gap } = sizeMap[size]

  // For non-interactive, support half-star display
  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= maxStars; i++) {
      const filled = i <= Math.floor(displayRating)
      const isHalf = !filled && i === Math.ceil(displayRating) && displayRating % 1 >= 0.25

      const starEl = (
        <StarIcon
          key={i}
          filled={filled}
          half={isHalf && !interactive}
          className={[
            starSize,
            interactive ? 'cursor-pointer transition-transform duration-150' : '',
            interactive && hoverRating >= i ? 'scale-110' : '',
          ].join(' ')}
        />
      )

      if (interactive) {
        stars.push(
          <button
            key={i}
            type="button"
            onClick={() => handleClick(i)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="p-0 bg-transparent border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-1 rounded-sm"
            aria-label={`Rate ${i} out of ${maxStars} stars`}
            role="radio"
            aria-checked={rating === i}
          >
            {starEl}
          </button>
        )
      } else {
        stars.push(starEl)
      }
    }
    return stars
  }

  return (
    <div
      className={`inline-flex items-center ${gap}`}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={label ?? `Rating: ${rating} out of ${maxStars} stars`}
    >
      {renderStars()}
    </div>
  )
}
