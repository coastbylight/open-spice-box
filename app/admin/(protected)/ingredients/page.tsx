import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import IngredientActions from './IngredientActions'

export const dynamic = 'force-dynamic'

interface IngredientRow {
  id: string
  name: string
  slug: string
  published: boolean
  created_at: string
  origin_regions: string[] | null
}

export default async function AdminIngredientsPage() {
  const supabase = createClient()
  const { data: ingredients, error } = await supabase
    .from('ingredients')
    .select('id, name, slug, published, created_at, origin_regions')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display text-charcoal-100">Ingredients</h1>
        <Link
          href="/admin/ingredients/new"
          className="bg-ochre-600 hover:bg-ochre-500 text-white text-sm font-medium px-4 py-2 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-400"
        >
          + New Ingredient
        </Link>
      </div>

      {error && (
        <p className="text-terra-400 text-sm mb-4">{error.message}</p>
      )}

      {!ingredients || ingredients.length === 0 ? (
        <p className="text-charcoal-400 text-sm">No ingredients yet.</p>
      ) : (
        <div className="bg-charcoal-900 border border-charcoal-700 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-charcoal-700">
                <th className="text-left px-4 py-3 text-charcoal-400 font-medium">Name</th>
                <th className="text-left px-4 py-3 text-charcoal-400 font-medium">Origin Regions</th>
                <th className="text-left px-4 py-3 text-charcoal-400 font-medium">Status</th>
                <th className="text-right px-4 py-3 text-charcoal-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(ingredients as IngredientRow[]).map((ingredient, i) => (
                <tr
                  key={ingredient.id}
                  className={`border-b border-charcoal-800 last:border-0 ${i % 2 === 0 ? '' : 'bg-charcoal-800/30'}`}
                >
                  <td className="px-4 py-3 text-charcoal-100 font-medium">{ingredient.name}</td>
                  <td className="px-4 py-3 text-charcoal-400">
                    {ingredient.origin_regions && ingredient.origin_regions.length > 0
                      ? ingredient.origin_regions.join(', ')
                      : '—'}
                  </td>
                  <td className="px-4 py-3">
                    {ingredient.published ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-sage-800/60 text-sage-300">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-charcoal-700 text-charcoal-400">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <IngredientActions ingredient={ingredient} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
