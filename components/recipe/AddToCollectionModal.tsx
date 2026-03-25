'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Collection {
  id: string
  name: string
  is_default: boolean
  hasRecipe: boolean
}

interface AddToCollectionModalProps {
  recipeId: string
  userId: string
  onClose: () => void
  onSaveChange: (isSaved: boolean) => void
}

export default function AddToCollectionModal({
  recipeId,
  userId,
  onClose,
  onSaveChange,
}: AddToCollectionModalProps) {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [savingNew, setSavingNew] = useState(false)
  const backdropRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  // Fetch collections and which ones contain this recipe
  useEffect(() => {
    let cancelled = false

    async function fetch() {
      const { data: userCollections } = await supabase
        .from('user_collections')
        .select('id, name, is_default')
        .eq('user_id', userId)
        .order('is_default', { ascending: false })
        .order('name')

      if (cancelled || !userCollections) return

      const { data: savedIn } = await supabase
        .from('collection_recipes')
        .select('collection_id')
        .eq('recipe_id', recipeId)
        .in('collection_id', userCollections.map(c => c.id))

      if (cancelled) return

      const savedSet = new Set((savedIn || []).map(r => r.collection_id))

      setCollections(
        userCollections.map(c => ({
          ...c,
          hasRecipe: savedSet.has(c.id),
        }))
      )
      setLoading(false)
    }

    fetch()
    return () => { cancelled = true }
  }, [recipeId, userId, supabase])

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Focus input when creating
  useEffect(() => {
    if (creating && inputRef.current) {
      inputRef.current.focus()
    }
  }, [creating])

  const handleToggle = useCallback(async (collectionId: string, currentlyIn: boolean) => {
    // Optimistic update
    setCollections(prev =>
      prev.map(c =>
        c.id === collectionId ? { ...c, hasRecipe: !currentlyIn } : c
      )
    )

    try {
      if (currentlyIn) {
        const { error } = await supabase
          .from('collection_recipes')
          .delete()
          .eq('collection_id', collectionId)
          .eq('recipe_id', recipeId)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('collection_recipes')
          .insert({ collection_id: collectionId, recipe_id: recipeId })
        if (error) throw error
      }
    } catch {
      // Revert
      setCollections(prev =>
        prev.map(c =>
          c.id === collectionId ? { ...c, hasRecipe: currentlyIn } : c
        )
      )
      return
    }

    // Update parent saved state (saved = in any collection)
    const updatedCollections = collections.map(c =>
      c.id === collectionId ? { ...c, hasRecipe: !currentlyIn } : c
    )
    onSaveChange(updatedCollections.some(c => c.hasRecipe))
  }, [collections, recipeId, supabase, onSaveChange])

  const handleCreateCollection = useCallback(async () => {
    const trimmed = newName.trim()
    if (!trimmed || savingNew) return

    setSavingNew(true)
    try {
      const { data, error } = await supabase
        .from('user_collections')
        .insert({ user_id: userId, name: trimmed })
        .select('id, name, is_default')
        .single()

      if (error) throw error

      // Add recipe to the new collection
      await supabase
        .from('collection_recipes')
        .insert({ collection_id: data.id, recipe_id: recipeId })

      setCollections(prev => [
        ...prev,
        { ...data, hasRecipe: true },
      ])
      setNewName('')
      setCreating(false)
      onSaveChange(true)
    } catch {
      // Silent fail
    } finally {
      setSavingNew(false)
    }
  }, [newName, savingNew, userId, recipeId, supabase, onSaveChange])

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === backdropRef.current) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal-950/40 backdrop-blur-[2px]" aria-hidden="true" />

      {/* Modal */}
      <div
        className="relative w-full max-w-sm bg-white rounded-xl border border-parchment-200 shadow-[0_12px_40px_-8px_rgba(74,63,53,0.2)] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Add to collection"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-parchment-100">
          <h3 className="font-display text-lg text-charcoal-900 tracking-tight">
            Save to Collection
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-charcoal-400 hover:text-charcoal-600 hover:bg-parchment-50 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500"
            aria-label="Close"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Collections list */}
        <div className="px-5 py-3 max-h-64 overflow-y-auto">
          {loading ? (
            <div className="py-6 text-center text-sm text-charcoal-400">Loading...</div>
          ) : (
            <ul className="space-y-1">
              {collections.map(collection => (
                <li key={collection.id}>
                  <label className="flex items-center gap-3 px-2 py-2.5 rounded-lg cursor-pointer hover:bg-parchment-50 transition-colors duration-150">
                    <input
                      type="checkbox"
                      checked={collection.hasRecipe}
                      onChange={() => handleToggle(collection.id, collection.hasRecipe)}
                      className="w-4 h-4 rounded border-parchment-300 text-ochre-600 focus:ring-ochre-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-sm text-charcoal-700 font-body">
                      {collection.name}
                      {collection.is_default && (
                        <span className="ml-1.5 text-[10px] uppercase tracking-wider text-charcoal-400">
                          Default
                        </span>
                      )}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Create new collection */}
        <div className="px-5 py-3 border-t border-parchment-100">
          {creating ? (
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateCollection()
                  if (e.key === 'Escape') { setCreating(false); setNewName('') }
                }}
                placeholder="Collection name"
                className="flex-1 text-sm bg-parchment-50 border border-parchment-200 rounded-lg px-3 py-2 text-charcoal-800 placeholder-charcoal-400 focus:outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
              />
              <button
                type="button"
                onClick={handleCreateCollection}
                disabled={!newName.trim() || savingNew}
                className="text-sm px-3 py-2 rounded-lg bg-ochre-600 text-white hover:bg-ochre-700 active:bg-ochre-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
              >
                {savingNew ? 'Saving...' : 'Add'}
              </button>
              <button
                type="button"
                onClick={() => { setCreating(false); setNewName('') }}
                className="text-sm px-2 py-2 rounded-lg text-charcoal-400 hover:text-charcoal-600 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500"
                aria-label="Cancel"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setCreating(true)}
              className="flex items-center gap-2 w-full px-2 py-2.5 rounded-lg text-sm text-ochre-700 hover:bg-ochre-50 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create new collection
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
