import RecipeForm from '../RecipeForm'

export default function NewRecipePage() {
  return (
    <div>
      <h1 className="text-2xl font-display text-charcoal-100 mb-6">New Recipe</h1>
      <RecipeForm mode="create" />
    </div>
  )
}
