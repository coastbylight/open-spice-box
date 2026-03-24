import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import RecipeActions from './RecipeActions'

export const dynamic = 'force-dynamic'

interface RecipeRow {
  id: string
  title: string
  slug: string
  published: boolean
  created_at: string
  difficulty: string | null
  cultural_origin: string | null
}

export default async function AdminRecipesPage() {
  const supabase = createClient()
  const { data: recipes, error } = await supabase
    .from('recipes')
    .select('id, title, slug, published, created_at, difficulty, cultural_origin')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display text-charcoal-100">Recipes</h1>
        <Link
          href="/admin/recipes/new"
          className="bg-ochre-600 hover:bg-ochre-500 text-white text-sm font-medium px-4 py-2 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-400"
        >
          + New Recipe
        </Link>
      </div>

      {error && (
        <p className="text-terra-400 text-sm mb-4">{error.message}</p>
      )}

      {!recipes || recipes.length === 0 ? (
        <p className="text-charcoal-400 text-sm">No recipes yet.</p>
      ) : (
        <div className="bg-charcoal-900 border border-charcoal-700 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-charcoal-700">
                <th className="text-left px-4 py-3 text-charcoal-400 font-medium">Title</th>
                <th className="text-left px-4 py-3 text-charcoal-400 font-medium">Origin</th>
                <th className="text-left px-4 py-3 text-charcoal-400 font-medium">Difficulty</th>
                <th className="text-left px-4 py-3 text-charcoal-400 font-medium">Status</th>
                <th className="text-right px-4 py-3 text-charcoal-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(recipes as RecipeRow[]).map((recipe, i) => (
                <tr
                  key={recipe.id}
                  className={`border-b border-charcoal-800 last:border-0 ${i % 2 === 0 ? '' : 'bg-charcoal-800/30'}`}
                >
                  <td className="px-4 py-3 text-charcoal-100 font-medium">{recipe.title}</td>
                  <td className="px-4 py-3 text-charcoal-400">{recipe.cultural_origin ?? '—'}</td>
                  <td className="px-4 py-3 text-charcoal-400">{recipe.difficulty ?? '—'}</td>
                  <td className="px-4 py-3">
                    {recipe.published ? (
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
                    <RecipeActions recipe={recipe} />
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
