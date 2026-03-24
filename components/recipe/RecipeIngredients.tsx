'use client'

import { useState } from 'react'
import type { RecipeIngredient } from '@/types/recipe'
import { convertIngredient, type UnitSystem } from '@/lib/unit-conversion'

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

// ─── Single ingredient row ────────────────────────────────────────────────────

function IngredientLine({
  item,
  system,
  slugs,
}: {
  item:   RecipeIngredient
  system: UnitSystem
  slugs:  Record<string, string>
}) {
  const converted = convertIngredient(
    item.amount,
    item.unit,
    item.ingredient,
    system,
    item.imperial_amount,
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
}: {
  items:           RecipeIngredient[]
  ingredientSlugs: Record<string, string>
}) {
  const [system, setSystem] = useState<UnitSystem>('imperial')

  return (
    <section id="ingredients">
      <SectionHeading action={<UnitToggle system={system} onChange={setSystem} />}>
        Ingredients
      </SectionHeading>
      <ul>
        {items.map((item, i) => (
          <IngredientLine
            key={i}
            item={item}
            system={system}
            slugs={ingredientSlugs}
          />
        ))}
      </ul>
    </section>
  )
}
