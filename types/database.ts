// Generated from Supabase schema (supabase/migrations/)
// Regenerate with: npx supabase gen types typescript --project-id cttehkkjlcyfovsxbpcz --schema public

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      recipes: {
        Row: {
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
          ingredients: Json
          instructions: Json
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
        Insert: {
          id?: string
          title: string
          slug: string
          subtitle?: string | null
          cultural_origin?: string | null
          tradition?: string | null
          headnote?: string | null
          yield?: string | null
          prep_time?: string | null
          cook_time?: string | null
          total_time?: string | null
          difficulty?: 'Easy' | 'Medium' | 'Involved' | null
          ingredients?: Json
          instructions?: Json
          key_ingredient_benefits?: string | null
          why_this_works?: string | null
          substitutions?: string | null
          serving_suggestions?: string | null
          storage_reheating?: string | null
          cultural_notes?: string | null
          source_name?: string | null
          source_url?: string | null
          source_author?: string | null
          tags?: string[]
          hero_image_url?: string | null
          seo_title?: string | null
          meta_description?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['recipes']['Insert']>
      }
      ingredients: {
        Row: {
          id: string
          name: string
          slug: string
          alternative_names: string[]
          image_url: string | null
          overview: string | null
          flavor_profile: string[]
          cultural_history: string | null
          origin_regions: string[]
          traditional_medicine_perspectives: Json
          modern_scientific_research: string | null
          culinary_uses: string | null
          preparation_methods: string | null
          traditional_dishes: string[]
          tags: string[]
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          alternative_names?: string[]
          image_url?: string | null
          overview?: string | null
          flavor_profile?: string[]
          cultural_history?: string | null
          origin_regions?: string[]
          traditional_medicine_perspectives?: Json
          modern_scientific_research?: string | null
          culinary_uses?: string | null
          preparation_methods?: string | null
          traditional_dishes?: string[]
          tags?: string[]
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['ingredients']['Insert']>
      }
      traditions: {
        Row: {
          id: string
          name: string
          slug: string
          region: string | null
          philosophy: string | null
          food_principles: string | null
          common_ingredients: string[]
          cooking_techniques: string[]
          representative_dishes: string[]
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          region?: string | null
          philosophy?: string | null
          food_principles?: string | null
          common_ingredients?: string[]
          cooking_techniques?: string[]
          representative_dishes?: string[]
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['traditions']['Insert']>
      }
      howto_articles: {
        Row: {
          id: string
          title: string
          slug: string
          category: string | null
          body: string | null
          tags: string[]
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          category?: string | null
          body?: string | null
          tags?: string[]
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['howto_articles']['Insert']>
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          body: string | null
          tags: string[]
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          body?: string | null
          tags?: string[]
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          created_at?: string
        }
        Update: never
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
