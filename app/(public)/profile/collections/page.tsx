'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

interface Collection {
  id: string
  name: string
  is_default: boolean
  is_public: boolean
}

interface RecipeCard {
  id: string
  title: string
  slug: string
  subtitle: string | null
  cultural_origin: string | null
  tradition: string | null
  difficulty: string | null
  total_time: string | null
  hero_image_url: string | null
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null)
  const [recipes, setRecipes] = useState<RecipeCard[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingRecipes, setLoadingRecipes] = useState(false)
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const router = useRouter()
  const supabase = createClient()

  // Fetch collections
  useEffect(() => {
    let cancelled = false

    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login?redirectTo=/profile/collections')
        return
      }

      const { data } = await supabase
        .from('user_collections')
        .select('id, name, is_default, is_public')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at')

      if (cancelled) return

      if (data && data.length > 0) {
        setCollections(data)
        setActiveCollectionId(data[0].id)
      }
      setLoading(false)
    }

    load()
    return () => { cancelled = true }
  }, [supabase, router])

  // Fetch recipes for active collection
  useEffect(() => {
    if (!activeCollectionId) return
    let cancelled = false

    async function loadRecipes() {
      setLoadingRecipes(true)
      const { data } = await supabase
        .from('collection_recipes')
        .select('recipe_id, recipes(id, title, slug, subtitle, cultural_origin, tradition, difficulty, total_time, hero_image_url)')
        .eq('collection_id', activeCollectionId)
        .order('added_at', { ascending: false })

      if (cancelled) return

      const recipeList = (data || [])
        .map((cr: { recipes: RecipeCard | null }) => cr.recipes)
        .filter(Boolean) as RecipeCard[]

      setRecipes(recipeList)
      setLoadingRecipes(false)
    }

    loadRecipes()
    return () => { cancelled = true }
  }, [activeCollectionId, supabase])

  const handleCreateCollection = useCallback(async () => {
    const trimmed = newName.trim()
    if (!trimmed) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('user_collections')
      .insert({ user_id: user.id, name: trimmed })
      .select('id, name, is_default, is_public')
      .single()

    if (error || !data) return

    setCollections(prev => [...prev, data])
    setNewName('')
    setCreating(false)
    setActiveCollectionId(data.id)
  }, [newName, supabase])

  const handleRename = useCallback(async (collectionId: string) => {
    const trimmed = editName.trim()
    if (!trimmed) return

    const { error } = await supabase
      .from('user_collections')
      .update({ name: trimmed })
      .eq('id', collectionId)

    if (!error) {
      setCollections(prev =>
        prev.map(c => c.id === collectionId ? { ...c, name: trimmed } : c)
      )
    }
    setEditingId(null)
    setEditName('')
  }, [editName, supabase])

  const handleDelete = useCallback(async (collectionId: string) => {
    if (!confirm('Delete this collection? Recipes will not be deleted, only removed from this collection.')) return

    const { error } = await supabase
      .from('user_collections')
      .delete()
      .eq('id', collectionId)

    if (!error) {
      setCollections(prev => prev.filter(c => c.id !== collectionId))
      if (activeCollectionId === collectionId) {
        const remaining = collections.filter(c => c.id !== collectionId)
        setActiveCollectionId(remaining.length > 0 ? remaining[0].id : null)
      }
    }
  }, [supabase, activeCollectionId, collections])

  const handleTogglePublic = useCallback(async (collectionId: string, currentlyPublic: boolean) => {
    // Optimistic
    setCollections(prev =>
      prev.map(c => c.id === collectionId ? { ...c, is_public: !currentlyPublic } : c)
    )

    const { error } = await supabase
      .from('user_collections')
      .update({ is_public: !currentlyPublic })
      .eq('id', collectionId)

    if (error) {
      // Revert
      setCollections(prev =>
        prev.map(c => c.id === collectionId ? { ...c, is_public: currentlyPublic } : c)
      )
    }
  }, [supabase])

  const handleRemoveRecipe = useCallback(async (recipeId: string) => {
    if (!activeCollectionId) return

    setRecipes(prev => prev.filter(r => r.id !== recipeId))

    const { error } = await supabase
      .from('collection_recipes')
      .delete()
      .eq('collection_id', activeCollectionId)
      .eq('recipe_id', recipeId)

    if (error) {
      // Reload
      const { data } = await supabase
        .from('collection_recipes')
        .select('recipe_id, recipes(id, title, slug, subtitle, cultural_origin, tradition, difficulty, total_time, hero_image_url)')
        .eq('collection_id', activeCollectionId)
        .order('added_at', { ascending: false })

      setRecipes(
        (data || []).map((cr: { recipes: RecipeCard | null }) => cr.recipes).filter(Boolean) as RecipeCard[]
      )
    }
  }, [activeCollectionId, supabase])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-parchment-100 rounded w-48" />
          <div className="flex gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-10 bg-parchment-100 rounded-lg w-28" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-parchment-100 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const activeCollection = collections.find(c => c.id === activeCollectionId)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-charcoal-900 tracking-tight">
          My Collections
        </h1>
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="text-sm font-body text-ochre-700 hover:text-ochre-800 border border-ochre-200 hover:border-ochre-300 rounded-lg px-4 py-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2 active:bg-ochre-50"
        >
          Create Collection
        </button>
      </div>

      {/* Create new collection inline */}
      {creating && (
        <div className="mb-6 flex items-center gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateCollection()
              if (e.key === 'Escape') { setCreating(false); setNewName('') }
            }}
            placeholder="Collection name"
            autoFocus
            className="text-sm bg-white border border-parchment-200 rounded-lg px-3 py-2 text-charcoal-800 placeholder-charcoal-400 focus:outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
          />
          <button
            type="button"
            onClick={handleCreateCollection}
            disabled={!newName.trim()}
            className="text-sm px-3 py-2 rounded-lg bg-ochre-600 text-white hover:bg-ochre-700 disabled:opacity-50 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => { setCreating(false); setNewName('') }}
            className="text-sm px-3 py-2 text-charcoal-400 hover:text-charcoal-600 transition-colors focus:outline-none"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Collection tabs */}
      {collections.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {collections.map(collection => (
            <button
              key={collection.id}
              type="button"
              onClick={() => setActiveCollectionId(collection.id)}
              className={`text-sm px-4 py-2 rounded-lg border transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-1 ${
                activeCollectionId === collection.id
                  ? 'bg-ochre-600 text-white border-ochre-600'
                  : 'bg-white text-charcoal-600 border-parchment-200 hover:border-ochre-300 hover:text-ochre-700'
              }`}
            >
              {collection.name}
              {collection.is_default && (
                <span className="ml-1 text-[10px] opacity-70">*</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Collection actions */}
      {activeCollection && !activeCollection.is_default && (
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-parchment-100">
          {editingId === activeCollection.id ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRename(activeCollection.id)
                  if (e.key === 'Escape') { setEditingId(null); setEditName('') }
                }}
                autoFocus
                className="text-sm bg-white border border-parchment-200 rounded-lg px-3 py-1.5 text-charcoal-800 focus:outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => handleRename(activeCollection.id)}
                className="text-xs text-ochre-600 hover:text-ochre-700 transition-colors focus:outline-none"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => { setEditingId(null); setEditName('') }}
                className="text-xs text-charcoal-400 hover:text-charcoal-600 transition-colors focus:outline-none"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => { setEditingId(activeCollection.id); setEditName(activeCollection.name) }}
                className="text-xs text-charcoal-500 hover:text-charcoal-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 rounded"
              >
                Rename
              </button>
              <button
                type="button"
                onClick={() => handleTogglePublic(activeCollection.id, activeCollection.is_public)}
                className="text-xs text-charcoal-500 hover:text-charcoal-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 rounded"
              >
                {activeCollection.is_public ? 'Make Private' : 'Make Public'}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(activeCollection.id)}
                className="text-xs text-terra-500 hover:text-terra-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-terra-500 rounded"
              >
                Delete
              </button>
            </>
          )}
          {!activeCollection.is_public && (
            <span className="text-[10px] uppercase tracking-wider text-charcoal-400 bg-parchment-100 px-2 py-0.5 rounded-full ml-auto">
              Private
            </span>
          )}
        </div>
      )}

      {/* Recipes grid */}
      {loadingRecipes ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-parchment-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <div
              key={recipe.id}
              className="group relative bg-white border border-parchment-200 rounded-xl overflow-hidden shadow-[0_2px_12px_-2px_rgba(139,90,43,0.08)] hover:shadow-[0_8px_28px_-4px_rgba(139,90,43,0.18)] hover:-translate-y-1 transition-[transform,box-shadow] duration-300"
            >
              <Link
                href={`/recipes/${recipe.slug}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2 rounded-xl"
              >
                {/* Image */}
                <div className="relative h-48 bg-parchment-100 overflow-hidden">
                  {recipe.hero_image_url ? (
                    <>
                      <Image
                        src={recipe.hero_image_url}
                        alt={recipe.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/30 to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-parchment-300 text-4xl select-none" aria-hidden="true">&#x1FAD9;</span>
                    </div>
                  )}
                  {recipe.difficulty && (
                    <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider bg-white/90 text-charcoal-600 px-2 py-0.5 rounded-full">
                      {recipe.difficulty}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-4">
                  {(recipe.tradition || recipe.cultural_origin) && (
                    <p className="text-[10px] uppercase tracking-widest text-ochre-600 mb-1.5">
                      {[recipe.tradition, recipe.cultural_origin].filter(Boolean).join(' \u00b7 ')}
                    </p>
                  )}
                  <h2 className="font-display text-lg text-charcoal-900 leading-snug tracking-tight mb-1 group-hover:text-ochre-800 transition-colors">
                    {recipe.title}
                  </h2>
                  {recipe.subtitle && (
                    <p className="text-xs text-charcoal-500 leading-relaxed line-clamp-2 mb-3">
                      {recipe.subtitle}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-charcoal-400">
                    {recipe.total_time && <span>{recipe.total_time}</span>}
                  </div>
                </div>
              </Link>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemoveRecipe(recipe.id)}
                className="absolute top-3 left-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 text-charcoal-400 hover:text-lacquer-500 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:outline-none focus:opacity-100 focus-visible:ring-2 focus-visible:ring-lacquer-500"
                aria-label={`Remove ${recipe.title} from collection`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-4xl mb-4 text-parchment-300" aria-hidden="true">
            <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className="text-charcoal-500 text-sm font-body mb-2">
            {activeCollection?.is_default
              ? 'No saved recipes yet.'
              : 'This collection is empty.'}
          </p>
          <Link
            href="/recipes"
            className="text-sm text-ochre-600 hover:text-ochre-700 underline underline-offset-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 rounded"
          >
            Browse recipes
          </Link>
        </div>
      )}
    </div>
  )
}
