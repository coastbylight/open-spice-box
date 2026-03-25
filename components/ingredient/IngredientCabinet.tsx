'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type CardIngredient = {
  slug: string
  name: string
  alternative_names: string[]
  image_url: string | null
  flavor_profile: string[]
  tags: string[]
  overview: string | null
}

interface Props {
  ingredients: CardIngredient[]
  allTags: string[]
}

// Rosewood / hongmu tones — reddish-brown with subtle variation per drawer
function woodParams(i: number) {
  const hue    = 8  + (i % 7) * 1.1   // 8–15 — red-brown, Chinese lacquer register
  const sat    = 62 + (i % 5) * 2     // 62–70 — vivid rosewood
  const light1 = 13 + (i % 6) * 1.2  // lighter face
  const light2 = 10 + (i % 7) * 0.9  // deeper shadow
  const angle  = 87 + (i % 8) * 0.4  // near-vertical grain
  return { hue, sat, light1, light2, angle }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
  }, [])
  return reduced
}

// Perfect circular brass ring — using the site's ochre palette
function BrassRing({ active }: { active: boolean }) {
  // Ring: center (19,26), radius 11 — gives ~38×44 viewBox
  return (
    <svg
      viewBox="0 0 38 44"
      width="38"
      height="44"
      aria-hidden="true"
      style={{
        display: 'block',
        transform: active ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 220ms cubic-bezier(0.34, 1.45, 0.64, 1)',
        filter: active
          ? 'drop-shadow(0 7px 9px rgba(0,0,0,0.72))'
          : 'drop-shadow(0 2px 4px rgba(0,0,0,0.58))',
      }}
    >
      <defs>
        {/* Boss plate — top-to-bottom brass */}
        <linearGradient id="bossG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#E8B840" /> {/* ochre-300 register */}
          <stop offset="45%"  stopColor="#C8871A" /> {/* ochre-500 */}
          <stop offset="100%" stopColor="#6A3E10" /> {/* ochre-800 */}
        </linearGradient>
        {/* Ring — diagonal highlight simulates round volume */}
        <linearGradient id="ringG" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%"   stopColor="#F2D89A" /> {/* ochre-200 */}
          <stop offset="22%"  stopColor="#DFA333" /> {/* ochre-400 */}
          <stop offset="50%"  stopColor="#A96A12" /> {/* ochre-600 */}
          <stop offset="78%"  stopColor="#6A3E10" /> {/* ochre-800 */}
          <stop offset="100%" stopColor="#C8871A" /> {/* ochre-500 — wrap back to light */}
        </linearGradient>
        {/* Horizontal counter-gradient for cross-sheen */}
        <linearGradient id="ringH" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%"   stopColor="#573411" /> {/* ochre-900 */}
          <stop offset="35%"  stopColor="#DFA333" /> {/* ochre-400 */}
          <stop offset="50%"  stopColor="#F2D89A" /> {/* ochre-200 highlight */}
          <stop offset="65%"  stopColor="#DFA333" />
          <stop offset="100%" stopColor="#573411" />
        </linearGradient>
      </defs>

      {/* Boss / pivot plate */}
      <rect x="14" y="1" width="10" height="7" rx="2.5" fill="url(#bossG)" />
      {/* Boss top sheen */}
      <rect x="15" y="2" width="8" height="2" rx="1" fill="rgba(255,230,120,0.35)" />
      {/* Rivet dots */}
      <circle cx="17" cy="4.5" r="1.1" fill="rgba(255,210,80,0.45)" />
      <circle cx="21" cy="4.5" r="1.1" fill="rgba(255,210,80,0.45)" />

      {/* Cast shadow (ring offset down) */}
      <circle cx="19" cy="27.5" r="11" stroke="rgba(0,0,0,0.45)" strokeWidth="6" fill="none" />

      {/* Ring outer edge (depth) */}
      <circle cx="19" cy="26" r="11" stroke="#3D1F0F" strokeWidth="6" fill="none" />

      {/* Ring main surface */}
      <circle cx="19" cy="26" r="11" stroke="url(#ringG)" strokeWidth="4.5" fill="none" />

      {/* Ring horizontal sheen overlay */}
      <circle cx="19" cy="26" r="11" stroke="url(#ringH)" strokeWidth="2" fill="none" opacity="0.55" />

      {/* Specular arc — top-left highlight */}
      <path
        d="M 12.8 16.5 A 11 11 0 0 1 25.2 16.5"
        stroke="rgba(242,216,154,0.5)"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Label plate — parchment background, ochre metal frame, Cormorant Garamond text
function LabelPlate({ name }: { name: string }) {
  return (
    <div
      style={{
        margin: '9px 10px 5px',
        /* Parchment face with a warm cream tint */
        background: 'linear-gradient(170deg, #fdfaf4 0%, #f9f3e3 50%, #f2e5c5 100%)',
        borderRadius: '2px',
        padding: '0',
        /* Ochre-toned metal frame: outer dark line → gold band → inner shadow */
        boxShadow: `
          0 0 0 1.5px #854f0e,
          0 0 0 3px #dfa333,
          0 0 0 4px #a96a12,
          inset 0 1px 0 rgba(255,255,255,0.7),
          inset 0 -1px 0 rgba(0,0,0,0.1),
          0 3px 7px rgba(0,0,0,0.65),
          0 1px 2px rgba(0,0,0,0.45)
        `,
      }}
    >
      {/* Inner engraved border — recessed effect */}
      <div
        style={{
          border: '1px solid #c8871a',
          borderRadius: '1px',
          margin: '4px',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.14), 0 0.5px 0 rgba(255,255,255,0.6)',
          padding: '4px 7px',
          minHeight: '26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '13px',
            fontWeight: '600',
            color: '#3d3834',        /* charcoal-900 */
            letterSpacing: '0.03em',
            textAlign: 'center',
            lineHeight: 1.3,
            textShadow: '0 0.5px 0 rgba(255,255,255,0.8)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
            wordBreak: 'break-word',
          }}
        >
          {name}
        </span>
      </div>
    </div>
  )
}

// Single medicine cabinet drawer
function Drawer({
  ing,
  index,
  onNavigate,
  navigating,
}: {
  ing: CardIngredient
  index: number
  onNavigate: (slug: string) => void
  navigating: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [exiting, setExiting] = useState(false)
  const reduced               = usePrefersReducedMotion()
  const wp                    = woodParams(index)

  function handleClick() {
    if (navigating || exiting) return
    setExiting(true)
    setTimeout(() => onNavigate(ing.slug), reduced ? 0 : 400)
  }

  const isActive = hovered || exiting
  const tz = reduced ? 0 : exiting ? 70 : hovered ? 18 : 0
  const rx = reduced ? 0 : exiting ? -2.5 : hovered ? -0.8 : 0

  const shadow = exiting
    ? '0 28px 55px rgba(0,0,0,0.9), 0 8px 16px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,200,80,0.06)'
    : hovered
    ? '0 10px 26px rgba(0,0,0,0.72), 0 3px 7px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,200,80,0.06)'
    : '0 1px 3px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,180,60,0.05), inset 0 -1px 0 rgba(0,0,0,0.3)'

  // Rosewood grain with reddish undertones
  const woodBg = `
    repeating-linear-gradient(
      ${wp.angle}deg,
      rgba(200,80,30,0.022) 0px, rgba(200,80,30,0.022) 1px,
      transparent 1px, transparent 5px,
      rgba(0,0,0,0.04) 5px, rgba(0,0,0,0.04) 6px,
      transparent 6px, transparent 11px
    ),
    repeating-linear-gradient(
      ${wp.angle + 0.3}deg,
      rgba(140,40,10,0.016) 0px, rgba(140,40,10,0.016) 2px,
      transparent 2px, transparent 18px
    ),
    linear-gradient(
      180deg,
      hsl(${wp.hue}, ${wp.sat}%, ${wp.light1 + 5}%) 0%,
      hsl(${wp.hue - 2}, ${wp.sat + 5}%, ${wp.light1}%) 30%,
      hsl(${wp.hue + 1}, ${wp.sat - 3}%, ${wp.light2 + 2}%) 65%,
      hsl(${wp.hue}, ${wp.sat + 2}%, ${wp.light1 + 3}%) 100%
    )
  `

  return (
    <div style={{ perspective: '700px', perspectiveOrigin: '50% 40%' }}>
      <button
        onMouseEnter={() => { if (!navigating && !exiting) setHovered(true) }}
        onMouseLeave={() => { if (!exiting) setHovered(false) }}
        onClick={handleClick}
        aria-label={`View ${ing.name}`}
        disabled={navigating && !exiting}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-400 focus-visible:ring-offset-1 focus-visible:ring-offset-lacquer-950"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          width: '100%',
          paddingBottom: '12px',
          cursor: navigating ? 'default' : 'pointer',
          background: woodBg,
          borderRadius: '2px',
          boxShadow: shadow,
          transform: `translateZ(${tz}px) rotateX(${rx}deg)`,
          transition: reduced
            ? 'none'
            : exiting
            ? 'transform 400ms cubic-bezier(0.22, 0, 0.55, 1), box-shadow 400ms ease'
            : 'transform 220ms cubic-bezier(0.34, 1.45, 0.64, 1), box-shadow 220ms ease',
          /* Lacquer-toned border — dark red-black edge */
          border: '1px solid rgba(0,0,0,0.75)',
          borderTop: '1px solid rgba(255,140,60,0.06)',
          outline: 'none',
          userSelect: 'none',
          backfaceVisibility: 'hidden',
          transformOrigin: '50% 50%',
        }}
      >
        {/* Top edge sheen */}
        <div style={{
          position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,160,60,0.12), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Inset panel — carved recess into drawer face */}
        <div style={{
          position: 'absolute',
          inset: '5px 8px 5px 8px',
          boxShadow:
            'inset 1px 1px 3px rgba(0,0,0,0.5), inset -1px -1px 1px rgba(255,140,40,0.04)',
          border: '1px solid rgba(0,0,0,0.35)',
          borderRadius: '1px',
          pointerEvents: 'none',
        }} />

        {/* Bottom edge shadow */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0, height: '4px',
          background: 'linear-gradient(0deg, rgba(0,0,0,0.5), transparent)',
          borderRadius: '0 0 2px 2px',
          pointerEvents: 'none',
        }} />

        {/* Hover ochre glow rim */}
        {isActive && (
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '2px',
            boxShadow: 'inset 0 0 0 1px rgba(223,163,51,0.4)',
            pointerEvents: 'none',
          }} />
        )}

        {/* Label plate — parchment + ochre metal frame */}
        <LabelPlate name={ing.name} />

        {/* Circular brass ring */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
          <BrassRing active={isActive} />
        </div>
      </button>
    </div>
  )
}

export default function IngredientCabinet({ ingredients, allTags }: Props) {
  const router       = useRouter()
  const [query, setQuery]           = useState('')
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())
  const [navigating, setNavigating] = useState(false)

  const toggleTag = useCallback((tag: string) => {
    setActiveTags(prev => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return ingredients.filter(i => {
      const matchesQuery =
        !q ||
        i.name.toLowerCase().includes(q) ||
        i.alternative_names?.some(n => n.toLowerCase().includes(q)) ||
        i.tags?.some(t => t.toLowerCase().includes(q))
      const matchesTags =
        activeTags.size === 0 ||
        Array.from(activeTags).every(t => i.tags?.includes(t))
      return matchesQuery && matchesTags
    })
  }, [ingredients, query, activeTags])

  const navigate = useCallback((slug: string) => {
    setNavigating(true)
    router.push(`/ingredients/${slug}`)
  }, [router])

  return (
    <>
      {/* Search + Filter */}
      <div className="mb-8 space-y-4">
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search ingredients…"
          aria-label="Search ingredients"
          className="w-full max-w-md bg-white border border-parchment-200 rounded-lg px-4 py-2.5 text-sm text-charcoal-800 placeholder-charcoal-400 shadow-[0_1px_4px_-1px_rgba(139,90,43,0.06)] focus:outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
        />
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
            {allTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                aria-pressed={activeTags.has(tag)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-1 ${
                  activeTags.has(tag)
                    ? 'bg-ochre-600 text-white border-ochre-600'
                    : 'bg-white text-charcoal-600 border-parchment-200 hover:border-ochre-300 hover:text-ochre-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-charcoal-400 mb-5" aria-live="polite">
        {filtered.length === ingredients.length
          ? `${ingredients.length} ingredient${ingredients.length !== 1 ? 's' : ''}`
          : `${filtered.length} of ${ingredients.length} ingredients`}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-charcoal-400 text-sm">No ingredients match your filters.</p>
          <button
            type="button"
            onClick={() => { setQuery(''); setActiveTags(new Set()) }}
            className="mt-3 text-sm text-ochre-600 hover:text-ochre-700 underline underline-offset-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 rounded"
          >
            Clear filters
          </button>
        </div>
      ) : (
        /* ── Medicine Cabinet ── */
        <div
          role="region"
          aria-label="Ingredient medicine cabinet"
          style={{
            /*
             * Chinese lacquerware body — deep red-black (lacquer-950 register)
             * with subtle vertical grain suggesting aged hongmu/rosewood
             */
            background: `
              repeating-linear-gradient(
                90deg,
                rgba(180,40,10,0.018) 0px, rgba(180,40,10,0.018) 1px,
                transparent 1px, transparent 8px
              ),
              linear-gradient(180deg, #1C0504 0%, #110302 45%, #160403 100%)
            `,
            borderRadius: '6px 6px 8px 8px',
            padding: '0 10px 14px',
            boxShadow: `
              0 0 0 1px rgba(200,80,30,0.06),
              3px 3px 0 #080200,
              7px 7px 0 rgba(0,0,0,0.3),
              0 28px 70px rgba(0,0,0,0.55),
              0 6px 18px rgba(0,0,0,0.4),
              inset 0 1px 0 rgba(220,100,40,0.06),
              inset 3px 0 10px rgba(0,0,0,0.35),
              inset -3px 0 10px rgba(0,0,0,0.35)
            `,
          }}
        >
          {/* Top crown rail — ochre inlay line */}
          <div style={{
            height: '20px',
            margin: '0 -10px 10px',
            borderRadius: '6px 6px 0 0',
            background: `
              linear-gradient(180deg, #2A0806 0%, #1C0504 55%, #110302 100%)
            `,
            boxShadow:
              'inset 0 1px 0 rgba(220,120,40,0.07), 0 3px 6px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(0,0,0,0.45)',
            borderBottom: '2px solid rgba(0,0,0,0.65)',
          }}>
            {/* Decorative gold inlay strip */}
            <div style={{
              margin: '6px 24px 0',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(223,163,51,0.18), rgba(223,163,51,0.38), rgba(223,163,51,0.18), transparent)',
            }} />
            <div style={{
              margin: '3px 40px 0',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(200,135,26,0.12), rgba(200,135,26,0.25), rgba(200,135,26,0.12), transparent)',
            }} />
          </div>

          {/* Drawer grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(152px, 1fr))',
              gap: '5px',
            }}
          >
            {filtered.map((ing, i) => (
              <Drawer
                key={ing.slug}
                ing={ing}
                index={i}
                onNavigate={navigate}
                navigating={navigating}
              />
            ))}
          </div>

          {/* Bottom base rail */}
          <div style={{
            height: '18px',
            margin: '10px -10px 0',
            borderRadius: '0 0 8px 8px',
            background: 'linear-gradient(180deg, #110302 0%, #1C0504 50%, #2A0806 100%)',
            boxShadow:
              'inset 0 2px 5px rgba(0,0,0,0.55), inset 0 1px 0 rgba(0,0,0,0.65)',
            borderTop: '2px solid rgba(0,0,0,0.7)',
          }}>
            <div style={{
              margin: '5px 24px 0',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(200,135,26,0.12), rgba(200,135,26,0.25), rgba(200,135,26,0.12), transparent)',
            }} />
            <div style={{
              margin: '3px 40px 0',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(223,163,51,0.16), rgba(223,163,51,0.32), rgba(223,163,51,0.16), transparent)',
            }} />
          </div>
        </div>
      )}
    </>
  )
}
