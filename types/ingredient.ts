export interface Ingredient {
  id: string
  name: string
  slug: string
  alternative_names: string[]
  image_url: string | null
  overview: string | null
  flavor_profile: string[]
  cultural_history: string | null
  origin_regions: string[]
  traditional_medicine_perspectives: Record<string, string>
  modern_scientific_research: string | null
  culinary_uses: string | null
  preparation_methods: string | null
  traditional_dishes: string[]
  tags: string[]
  published: boolean
  created_at: string
  updated_at: string
}
