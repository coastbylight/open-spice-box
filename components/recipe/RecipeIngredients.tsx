'use client'

import { useState } from 'react'
import type { RecipeIngredient } from '@/types/recipe'
import { convertIngredient, parseAmount, type UnitSystem } from '@/lib/unit-conversion'

// ─── Unit Toggle ─────────────────────────────────────────────────────────────

function UnitToggle({
  system,
  onChange,
}: {
  system: UnitSystem
  onChange: (s: UnitSystem) => void
}) {
  return (
    <div
      role="group"
      aria-label="Unit system"
      className="inline-flex items-center rounded-full border border-parchment-200 bg-parchment-50 p-0.5 shadow-[0_1px_3px_rgba(139,90,43,0.08)] select-none"
    >
      {(['imperial', 'metric'] as const).map(s => {
        const label  = s === 'metric' ? 'g' : 'oz'
        const active = system === s
        return (
          <button
            key={s}
            onClick={() => onChange(s)}
            aria-pressed={active}
            className={[
              'relative px-3.5 py-1 rounded-full text-xs font-medium transition-all duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-1',
              active
                ? 'bg-ochre-600 text-white shadow-[0_1px_4px_rgba(139,90,43,0.35)]'
                : 'text-charcoal-500 hover:text-charcoal-700',
            ].join(' ')}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

// ─── Ingredient name link helper ──────────────────────────────────────────────

function findIngredientMatch(
  text: string,
  slugs: Record<string, string>
): { before: string; match: string; after: string; slug: string } | null {
  const names = Object.keys(slugs).sort((a, b) => b.length - a.length)
  for (const name of names) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const m = text.match(new RegExp(`\\b${escaped}\\b`, 'i'))
    if (m && m.index !== undefined) {
      return {
        before: text.slice(0, m.index),
        match:  m[0],
        after:  text.slice(m.index + m[0].length),
        slug:   slugs[name],
      }
    }
  }
  return null
}

// ─── Serving Scaler ───────────────────────────────────────────────────────────

const SCALE_STEPS = [0.5, 1, 1.5, 2, 3, 4]

function ServingScaler({
  scale,
  onChange,
  recipeYield,
}: {
  scale: number
  onChange: (s: number) => void
  recipeYield?: string | null
}) {
  const stepIdx = SCALE_STEPS.indexOf(scale)
  const canDecrease = stepIdx > 0
  const canIncrease = stepIdx < SCALE_STEPS.length - 1

  const scaledYield = (() => {
    if (!recipeYield) return null
    const m = recipeYield.match(/(\d+)/)
    if (!m) return recipeYield
    const base = parseInt(m[1], 10)
    const scaled = Math.round(base * scale)
    return recipeYield.replace(/\d+/, String(scaled))
  })()

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Adjust servings">
      <button
        type="button"
        onClick={() => canDecrease && onChange(SCALE_STEPS[stepIdx - 1])}
        disabled={!canDecrease}
        className="w-7 h-7 rounded-full border border-parchment-200 bg-white text-charcoal-600 hover:bg-parchment-50 hover:border-ochre-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-1"
        aria-label="Decrease servings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
          <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
        </svg>
      </button>
      <span className="text-xs font-medium text-charcoal-700 min-w-[3rem] text-center select-none">
        {scale === 1 ? (scaledYield ?? '1×') : (scaledYield ?? `${scale}×`)}
      </span>
      <button
        type="button"
        onClick={() => canIncrease && onChange(SCALE_STEPS[stepIdx + 1])}
        disabled={!canIncrease}
        className="w-7 h-7 rounded-full border border-parchment-200 bg-white text-charcoal-600 hover:bg-parchment-50 hover:border-ochre-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-1"
        aria-label="Increase servings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </button>
      {scale !== 1 && (
        <button
          type="button"
          onClick={() => onChange(1)}
          className="text-[10px] text-ochre-600 hover:text-ochre-700 ml-1 underline underline-offset-2 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ochre-500 rounded"
        >
          Reset
        </button>
      )}
    </div>
  )
}

// ─── Single ingredient row ────────────────────────────────────────────────────

function IngredientLine({
  item,
  system,
  scale,
  slugs,
}: {
  item:   RecipeIngredient
  system: UnitSystem
  scale:  number
  slugs:  Record<string, string>
}) {
  const scaledAmount = (() => {
    if (scale === 1 || !item.amount) return item.amount
    const parsed = parseAmount(item.amount)
    if (parsed === 0) return item.amount
    return String(Math.round(parsed * scale * 100) / 100)
  })()

  const scaledImperialAmount = (() => {
    if (scale === 1 || !item.imperial_amount) return item.imperial_amount
    const parsed = parseAmount(item.imperial_amount)
    if (parsed === 0) return item.imperial_amount
    return String(Math.round(parsed * scale * 100) / 100)
  })()

  const converted = convertIngredient(
    scaledAmount,
    item.unit,
    item.ingredient,
    system,
    scaledImperialAmount,
    item.imperial_unit,
  )

  const hit = findIngredientMatch(item.ingredient, slugs)

  // Amount + unit cell
  const amountText = converted.amount
    ? `${converted.amount}${converted.unit ? ' ' + converted.unit : ''}`
    : ''

  return (
    <li className="flex gap-4 py-2.5 border-b border-parchment-100 last:border-0">
      <span className="text-sm text-charcoal-400 w-24 shrink-0 text-right leading-snug pt-0.5">
        {amountText || <span className="italic">—</span>}
      </span>
      <span className="text-sm text-charcoal-800 leading-snug">
        {hit ? (
          <>
            {hit.before}
            <a
              href={`/ingredients/${hit.slug}`}
              className="underline decoration-dotted underline-offset-2 decoration-ochre-400 hover:text-ochre-700 hover:decoration-ochre-600 transition-colors"
            >
              {hit.match}
            </a>
            {hit.after}
          </>
        ) : (
          item.ingredient
        )}
        {converted.countNote && (
          <span className="text-charcoal-400"> ({converted.countNote})</span>
        )}
        {item.prep_note && (
          <span className="text-charcoal-400">, {item.prep_note}</span>
        )}
        {item.optional && (
          <span className="text-charcoal-400 italic"> (optional)</span>
        )}
      </span>
    </li>
  )
}

// ─── Section heading with action slot ────────────────────────────────────────

function SectionHeading({
  children,
  action,
}: {
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between mt-12 mb-4 pb-2 border-b border-parchment-200">
      <h2 className="font-display text-xl text-charcoal-900 tracking-tight">
        {children}
      </h2>
      {action}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function RecipeIngredients({
  items,
  ingredientSlugs,
  recipeYield,
}: {
  items:           RecipeIngredient[]
  ingredientSlugs: Record<string, string>
  recipeYield?:    string | null
}) {
  const [system, setSystem] = useState<UnitSystem>('imperial')
  const [scale, setScale] = useState(1)

  return (
    <section id="ingredients">
      <SectionHeading
        action={
          <div className="flex items-center gap-3">
            <ServingScaler scale={scale} onChange={setScale} recipeYield={recipeYield} />
            <div className="w-px h-5 bg-parchment-200" aria-hidden="true" />
            <UnitToggle system={system} onChange={setSystem} />
          </div>
        }
      >
        Ingredients
      </SectionHeading>
      <ul>
        {items.map((item, i) => (
          <IngredientLine
            key={i}
            item={item}
            system={system}
            scale={scale}
            slugs={ingredientSlugs}
          />
        ))}
      </ul>
    </section>
  )
}
