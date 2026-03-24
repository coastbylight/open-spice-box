import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import RecipeForm from '../../RecipeForm'
import type { Recipe } from '@/types/recipe'

export const dynamic = 'force-dynamic'

interface EditRecipePageProps {
  params: { id: string }
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !data) notFound()

  return (
    <div>
      <h1 className="text-2xl font-display text-charcoal-100 mb-6">Edit Recipe</h1>
      <RecipeForm mode="edit" initialData={data as Recipe} />
    </div>
  )
}
