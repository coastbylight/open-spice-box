'use client'

import { useState, useCallback, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import StarRating from './StarRating'

// ─── Types ──────────────────────────────────────────────────────────────────

interface Profile {
  display_name: string | null
  avatar_url: string | null
}

interface Comment {
  id: string
  recipe_id: string
  user_id: string
  parent_id: string | null
  body: string
  rating: number | null
  created_at: string
  flagged: boolean
  flag_count: number
  profiles: Profile
  replies?: Comment[]
}

type SortOption = 'newest' | 'oldest' | 'highest'

interface CommentListProps {
  recipeId: string
  user: User | null
  refreshKey: number
}

const PAGE_SIZE = 10

// ─── Helpers ────────────────────────────────────────────────────────────────

const avatarColors = ['bg-sage-500', 'bg-terra-500', 'bg-ochre-600'] as const

function getAvatarColor(name: string): string {
  const code = name.charCodeAt(0) || 0
  return avatarColors[code % avatarColors.length]
}

function getInitial(name: string | null): string {
  return name ? name.charAt(0).toUpperCase() : '?'
}

function relativeTime(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffMs = now - then
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)
  const diffWeek = Math.floor(diffDay / 7)
  const diffMonth = Math.floor(diffDay / 30)

  if (diffSec < 60) return 'just now'
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHr < 24) return `${diffHr}h ago`
  if (diffDay < 7) return `${diffDay}d ago`
  if (diffWeek < 5) return `${diffWeek}w ago`
  return `${diffMonth}mo ago`
}

function sortOrderColumn(sort: SortOption): { column: string; ascending: boolean } {
  switch (sort) {
    case 'newest':
      return { column: 'created_at', ascending: false }
    case 'oldest':
      return { column: 'created_at', ascending: true }
    case 'highest':
      return { column: 'rating', ascending: false }
  }
}

// ─── Inline Reply Form ─────────────────────────────────────────────────────

function ReplyForm({
  recipeId,
  parentId,
  user,
  onSubmitted,
  onCancel,
}: {
  recipeId: string
  parentId: string
  user: User
  onSubmitted: () => void
  onCancel: () => void
}) {
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return

    setSubmitting(true)
    const supabase = createClient()

    const { error } = await supabase
      .from('recipe_comments')
      .insert({
        recipe_id: recipeId,
        user_id: user.id,
        parent_id: parentId,
        body: body.trim(),
        rating: null,
      })

    setSubmitting(false)
    if (!error) {
      setBody('')
      onSubmitted()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 ml-10 flex gap-2">
      <input
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write a reply..."
        maxLength={1000}
        className="flex-1 rounded-lg border border-parchment-200 bg-parchment-50 px-3 py-2
          text-sm text-charcoal-800 font-body placeholder:text-charcoal-400
          focus:outline-none focus:ring-2 focus:ring-ochre-500 focus:border-ochre-500
          transition-colors duration-150"
      />
      <button
        type="submit"
        disabled={submitting || !body.trim()}
        className="px-3 py-2 rounded-lg text-xs font-medium
          bg-terra-600 text-white
          hover:bg-terra-700 active:bg-terra-800
          focus:outline-none focus-visible:ring-2 focus-visible:ring-terra-500 focus-visible:ring-offset-2
          transition-colors duration-150
          disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Reply
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="px-3 py-2 rounded-lg text-xs font-medium
          text-charcoal-500 hover:text-charcoal-700 hover:bg-parchment-100
          focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2
          transition-colors duration-150"
      >
        Cancel
      </button>
    </form>
  )
}

// ─── Single Comment ─────────────────────────────────────────────────────────

function CommentItem({
  comment,
  user,
  recipeId,
  isReply,
  onRefresh,
}: {
  comment: Comment
  user: User | null
  recipeId: string
  isReply?: boolean
  onRefresh: () => void
}) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editBody, setEditBody] = useState(comment.body)
  const [editSubmitting, setEditSubmitting] = useState(false)
  const [flagging, setFlagging] = useState(false)

  const displayName = comment.profiles?.display_name ?? 'Anonymous'
  const isOwner = user?.id === comment.user_id

  // ── Edit handler ──
  async function handleEdit(e: React.FormEvent) {
    e.preventDefault()
    if (!editBody.trim()) return

    setEditSubmitting(true)
    const supabase = createClient()

    const { error } = await supabase
      .from('recipe_comments')
      .update({ body: editBody.trim() })
      .eq('id', comment.id)
      .eq('user_id', user!.id)

    setEditSubmitting(false)
    if (!error) {
      setEditing(false)
      onRefresh()
    }
  }

  // ── Delete handler ──
  async function handleDelete() {
    if (!confirm('Delete this comment?')) return

    const supabase = createClient()
    await supabase
      .from('recipe_comments')
      .delete()
      .eq('id', comment.id)
      .eq('user_id', user!.id)

    onRefresh()
  }

  // ── Flag handler ──
  async function handleFlag() {
    if (!user) return
    setFlagging(true)

    const supabase = createClient()
    await supabase
      .from('comment_flags')
      .upsert(
        { comment_id: comment.id, user_id: user.id, reason: 'inappropriate' },
        { onConflict: 'comment_id,user_id' }
      )

    setFlagging(false)
  }

  return (
    <div className={isReply ? 'ml-10 pl-4 border-l-2 border-parchment-200' : ''}>
      <div className="flex gap-3">
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0 ${getAvatarColor(displayName)}`}
          aria-hidden="true"
        >
          {getInitial(displayName)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + time */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-charcoal-800 font-body">
              {displayName}
            </span>
            <span className="text-xs text-charcoal-400 font-body">
              {relativeTime(comment.created_at)}
            </span>
          </div>

          {/* Stars (if rated) */}
          {comment.rating && !isReply && (
            <div className="mt-1">
              <StarRating rating={comment.rating} size="sm" />
            </div>
          )}

          {/* Body or edit form */}
          {editing ? (
            <form onSubmit={handleEdit} className="mt-2">
              <textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                rows={2}
                maxLength={2000}
                className="w-full rounded-lg border border-parchment-200 bg-parchment-50 px-3 py-2
                  text-sm text-charcoal-800 font-body
                  focus:outline-none focus:ring-2 focus:ring-ochre-500 focus:border-ochre-500
                  transition-colors duration-150 resize-y"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  disabled={editSubmitting || !editBody.trim()}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium
                    bg-terra-600 text-white hover:bg-terra-700 active:bg-terra-800
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-terra-500 focus-visible:ring-offset-2
                    transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => { setEditing(false); setEditBody(comment.body) }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium
                    text-charcoal-500 hover:text-charcoal-700 hover:bg-parchment-100
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2
                    transition-colors duration-150"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className="mt-1.5 text-sm text-charcoal-700 font-body leading-relaxed whitespace-pre-wrap">
              {comment.body}
            </p>
          )}

          {/* Action buttons */}
          {!editing && (
            <div className="flex items-center gap-3 mt-2">
              {/* Reply button (only top-level) */}
              {!isReply && user && (
                <button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="text-xs text-charcoal-400 hover:text-charcoal-600
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2 rounded
                    transition-colors duration-150"
                >
                  Reply
                </button>
              )}

              {/* Owner actions */}
              {isOwner && (
                <>
                  <button
                    onClick={() => setEditing(true)}
                    className="text-xs text-charcoal-400 hover:text-charcoal-600
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2 rounded
                      transition-colors duration-150"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-xs text-charcoal-400 hover:text-lacquer-600
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-lacquer-500 focus-visible:ring-offset-2 rounded
                      transition-colors duration-150"
                  >
                    Delete
                  </button>
                </>
              )}

              {/* Flag button */}
              {user && !isOwner && (
                <button
                  onClick={handleFlag}
                  disabled={flagging}
                  className="text-xs text-charcoal-300 hover:text-charcoal-500
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2 rounded
                    transition-colors duration-150 disabled:opacity-50"
                  aria-label="Flag comment"
                >
                  Flag
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Inline reply form */}
      {showReplyForm && user && (
        <ReplyForm
          recipeId={recipeId}
          parentId={comment.id}
          user={user}
          onSubmitted={() => {
            setShowReplyForm(false)
            onRefresh()
          }}
          onCancel={() => setShowReplyForm(false)}
        />
      )}

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              user={user}
              recipeId={recipeId}
              isReply
              onRefresh={onRefresh}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function CommentList({ recipeId, user, refreshKey }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [sort, setSort] = useState<SortOption>('newest')
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchComments = useCallback(async (pageNum: number, append: boolean) => {
    if (pageNum === 0) setLoading(true)
    else setLoadingMore(true)

    const supabase = createClient()
    const { column, ascending } = sortOrderColumn(sort)
    const from = pageNum * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    // Fetch top-level comments
    const { data, count, error } = await supabase
      .from('recipe_comments')
      .select('*, profiles!recipe_comments_user_id_fkey(display_name, avatar_url)', { count: 'exact' })
      .eq('recipe_id', recipeId)
      .is('parent_id', null)
      .order(column, { ascending })
      .range(from, to)

    if (error || !data) {
      setLoading(false)
      setLoadingMore(false)
      return
    }

    // Fetch all replies for these top-level comments
    const parentIds = data.map((c: Comment) => c.id)

    let repliesData: Comment[] = []
    if (parentIds.length > 0) {
      const { data: replies } = await supabase
        .from('recipe_comments')
        .select('*, profiles!recipe_comments_user_id_fkey(display_name, avatar_url)')
        .in('parent_id', parentIds)
        .order('created_at', { ascending: true })

      repliesData = (replies as Comment[]) ?? []
    }

    // Group replies by parent_id
    const replyMap = new Map<string, Comment[]>()
    for (const reply of repliesData) {
      const existing = replyMap.get(reply.parent_id!) ?? []
      existing.push(reply)
      replyMap.set(reply.parent_id!, existing)
    }

    const withReplies = (data as Comment[]).map((c) => ({
      ...c,
      replies: replyMap.get(c.id) ?? [],
    }))

    if (append) {
      setComments((prev) => [...prev, ...withReplies])
    } else {
      setComments(withReplies)
    }

    setTotalCount(count ?? 0)
    setLoading(false)
    setLoadingMore(false)
  }, [recipeId, sort])

  // Re-fetch when sort changes or refreshKey changes
  useEffect(() => {
    setPage(0)
    fetchComments(0, false)
  }, [sort, refreshKey, fetchComments])

  function handleLoadMore() {
    const nextPage = page + 1
    setPage(nextPage)
    fetchComments(nextPage, true)
  }

  const hasMore = comments.length < totalCount

  return (
    <div className="bg-white border border-parchment-200 rounded-xl p-6 shadow-[0_2px_12px_-2px_rgba(139,90,43,0.08)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg text-charcoal-900">
          {totalCount} {totalCount === 1 ? 'Comment' : 'Comments'}
        </h3>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="text-xs border border-parchment-200 rounded-lg px-2.5 py-1.5
            text-charcoal-600 font-body bg-parchment-50
            focus:outline-none focus:ring-2 focus:ring-ochre-500 focus:border-ochre-500
            transition-colors duration-150 cursor-pointer"
          aria-label="Sort comments"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest rated</option>
        </select>
      </div>

      {/* Comments */}
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <svg
            className="animate-spin h-5 w-5 text-ochre-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-charcoal-400 font-body text-center py-8">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="space-y-5">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              user={user}
              recipeId={recipeId}
              onRefresh={() => fetchComments(0, false)}
            />
          ))}
        </div>
      )}

      {/* Load more */}
      {hasMore && !loading && (
        <div className="mt-6 text-center">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="inline-flex items-center justify-center px-5 py-2 rounded-lg text-sm font-medium
              text-ochre-700 border border-ochre-300 bg-white
              hover:bg-ochre-50 active:bg-ochre-100
              focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2
              transition-colors duration-150
              disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loadingMore ? (
              <>
                <svg
                  className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-ochre-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading...
              </>
            ) : (
              'Load more comments'
            )}
          </button>
        </div>
      )}
    </div>
  )
}
