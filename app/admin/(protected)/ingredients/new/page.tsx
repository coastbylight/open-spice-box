import IngredientForm from '../IngredientForm'

export default function NewIngredientPage() {
  return (
    <div>
      <h1 className="text-2xl font-display text-charcoal-100 mb-6">New Ingredient</h1>
      <IngredientForm mode="create" />
    </div>
  )
}
