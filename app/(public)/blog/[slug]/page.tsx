import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('title, body')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()
  if (!data) return {}
  const description = data.body ? data.body.slice(0, 155) : undefined
  return {
    title: `${data.title} — Ancient Pantry`,
    description,
    openGraph: {
      title: `${data.title} — Ancient Pantry`,
      description,
      type: 'article',
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const supabase = createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!post) notFound()

  return (
    <div className="min-h-screen bg-parchment-50">
      <article className="max-w-2xl mx-auto px-4 sm:px-6 pb-24 pt-10">
        <header className="pb-6 border-b border-parchment-200 mb-8">
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal-950 leading-tight tracking-[-0.02em] mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4">
            <time
              dateTime={post.created_at}
              className="text-xs text-charcoal-400"
            >
              {new Date(post.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs text-charcoal-500 bg-white border border-parchment-200 px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {post.body && <MarkdownRenderer content={post.body} />}
      </article>
    </div>
  )
}
