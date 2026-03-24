export interface Recipe {
  id: string
  title: string
  slug: string
  subtitle: string | null
  cultural_origin: string | null
  tradition: string | null
  headnote: string | null
  yield: string | null
  prep_time: string | null
  cook_time: string | null
  total_time: string | null
  difficulty: 'Easy' | 'Medium' | 'Involved' | null
  ingredients: RecipeIngredient[]
  instructions: RecipeStep[]
  key_ingredient_benefits: string | null
  why_this_works: string | null
  substitutions: string | null
  serving_suggestions: string | null
  storage_reheating: string | null
  cultural_notes: string | null
  source_name: string | null
  source_url: string | null
  source_author: string | null
  tags: string[]
  hero_image_url: string | null
  seo_title: string | null
  meta_description: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export interface RecipeIngredient {
  amount: string
  unit: string | null
  ingredient: string
  prep_note: string | null
  optional: boolean
}

export interface RecipeStep {
  step: number
  text: string
}
