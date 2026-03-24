import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import IngredientForm from '../../IngredientForm'
import type { Ingredient } from '@/types/ingredient'

export const dynamic = 'force-dynamic'

interface EditIngredientPageProps {
  params: { id: string }
}

export default async function EditIngredientPage({ params }: EditIngredientPageProps) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !data) notFound()

  return (
    <div>
      <h1 className="text-2xl font-display text-charcoal-100 mb-6">Edit Ingredient</h1>
      <IngredientForm mode="edit" initialData={data as Ingredient} />
    </div>
  )
}
