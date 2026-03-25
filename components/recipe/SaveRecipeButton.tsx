'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AddToCollectionModal from './AddToCollectionModal'

interface SaveRecipeButtonProps {
  recipeId: string
  size?: 'sm' | 'md'
}

export default function SaveRecipeButton({ recipeId, size = 'md' }: SaveRecipeButtonProps) {
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [animating, setAnimating] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const didLongPress = useRef(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  // Check auth and saved state on mount
  useEffect(() => {
    let cancelled = false

    async function checkState() {
      const { data: { user } } = await supabase.auth.getUser()
      if (cancelled) return

      if (!user) {
        setUserId(null)
        setLoading(false)
        return
      }

      setUserId(user.id)

      // Check if recipe is in any of user's collections
      const { data } = await supabase
        .from('collection_recipes')
        .select('collection_id, user_collections!inner(user_id)')
        .eq('recipe_id', recipeId)
        .eq('user_collections.user_id', user.id)
        .limit(1)

      if (!cancelled) {
        setSaved(data !== null && data.length > 0)
        setLoading(false)
      }
    }

    checkState()
    return () => { cancelled = true }
  }, [recipeId, supabase])

  const handleToggleSave = useCallback(async () => {
    if (!userId) {
      router.push(`/auth/login?redirectTo=${encodeURIComponent(pathname)}`)
      return
    }

    const previousSaved = saved
    setSaved(!saved)
    setAnimating(true)
    setTimeout(() => setAnimating(false), 300)

    try {
      // Get default collection
      const { data: defaultCollection } = await supabase
        .from('user_collections')
        .select('id')
        .eq('user_id', userId)
        .eq('is_default', true)
        .single()

      if (!defaultCollection) throw new Error('No default collection found')

      if (previousSaved) {
        // Remove from default collection
        const { error } = await supabase
          .from('collection_recipes')
          .delete()
          .eq('collection_id', defaultCollection.id)
          .eq('recipe_id', recipeId)

        if (error) throw error
      } else {
        // Add to default collection
        const { error } = await supabase
          .from('collection_recipes')
          .insert({
            collection_id: defaultCollection.id,
            recipe_id: recipeId,
          })

        if (error) throw error
      }
    } catch {
      // Revert on error
      setSaved(previousSaved)
    }
  }, [userId, saved, recipeId, supabase, router, pathname])

  const handleMouseDown = useCallback(() => {
    didLongPress.current = false
    longPressTimer.current = setTimeout(() => {
      didLongPress.current = true
      if (userId) {
        setShowModal(true)
      } else {
        router.push(`/auth/login?redirectTo=${encodeURIComponent(pathname)}`)
      }
    }, 500)
  }, [userId, router, pathname])

  const handleMouseUp = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }, [])

  const handleClick = useCallback(() => {
    if (didLongPress.current) return
    handleToggleSave()
  }, [handleToggleSave])

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
    if (userId) {
      setShowModal(true)
    } else {
      router.push(`/auth/login?redirectTo=${encodeURIComponent(pathname)}`)
    }
  }, [userId, router, pathname])

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  const buttonSize = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onContextMenu={handleContextMenu}
        disabled={loading}
        aria-label={saved ? 'Remove from saved recipes' : 'Save recipe'}
        aria-pressed={saved}
        className={`${buttonSize} inline-flex items-center justify-center rounded-full transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2 ${
          saved
            ? 'text-lacquer-500 hover:text-lacquer-600 bg-lacquer-50 hover:bg-lacquer-100'
            : 'text-charcoal-400 hover:text-lacquer-500 bg-white/80 hover:bg-white'
        } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${
          animating ? 'scale-125' : 'scale-100'
        }`}
        style={{
          transition: 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), color 150ms ease, background-color 150ms ease',
        }}
      >
        {saved ? (
          <svg className={iconSize} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
          <svg className={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {showModal && userId && (
        <AddToCollectionModal
          recipeId={recipeId}
          userId={userId}
          onClose={() => setShowModal(false)}
          onSaveChange={(isSaved) => setSaved(isSaved)}
        />
      )}
    </>
  )
}
