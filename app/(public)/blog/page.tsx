import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Blog — Open Spice Box',
  description:
    'Reflections on food, tradition, and the science of eating well. From the Open Spice Box kitchen.',
  openGraph: {
    title: 'Blog — Open Spice Box',
    description:
      'Reflections on food, tradition, and the science of eating well. From the Open Spice Box kitchen.',
    type: 'website',
  },
}

export default async function BlogPage() {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, title, tags, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const all = posts ?? []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl text-charcoal-950 tracking-tight mb-3">
          Blog
        </h1>
        <p className="text-base text-charcoal-500 leading-relaxed max-w-xl">
          Reflections on traditional food wisdom, modern nutrition science, and
          the art of cooking with intention.
        </p>
      </header>

      {all.length > 0 ? (
        <div className="space-y-4">
          {all.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white border border-parchment-200 rounded-xl p-6 shadow-[0_2px_12px_-2px_rgba(139,90,43,0.08)] hover:shadow-[0_6px_24px_-4px_rgba(139,90,43,0.14)] transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl text-charcoal-900 tracking-tight mb-2 group-hover:text-ochre-800 transition-colors">
                    {post.title}
                  </h2>
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[10px] text-charcoal-500 bg-parchment-50 border border-parchment-200 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <time
                  dateTime={post.created_at}
                  className="text-xs text-charcoal-400 shrink-0 mt-0.5"
                >
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-charcoal-400 text-sm">
          Blog posts are coming soon.
        </p>
      )}
    </div>
  )
}
