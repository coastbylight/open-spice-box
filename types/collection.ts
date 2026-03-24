export interface Collection {
  id: string
  name: string
  slug: string
  description: string | null
  cover_image_url: string | null
  recipe_slugs: string[]
  published: boolean
  created_at: string
  updated_at: string
}
