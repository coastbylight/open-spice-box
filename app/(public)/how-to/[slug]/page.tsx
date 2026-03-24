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
    .from('howto_articles')
    .select('title, body')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()
  if (!data) return {}
  const description = data.body ? data.body.slice(0, 155) : undefined
  return {
    title: `${data.title} — How-To — Ancient Pantry`,
    description,
    openGraph: {
      title: `${data.title} — How-To — Ancient Pantry`,
      description,
      type: 'article',
    },
  }
}

export default async function HowToDetailPage({ params }: Props) {
  const supabase = createClient()
  const { data: article } = await supabase
    .from('howto_articles')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!article) notFound()

  return (
    <div className="min-h-screen bg-parchment-50">
      <article className="max-w-2xl mx-auto px-4 sm:px-6 pb-24 pt-10">
        <header className="pb-6 border-b border-parchment-200 mb-8">
          {article.category && (
            <p className="text-xs uppercase tracking-widest text-ochre-600 mb-3">
              {article.category}
            </p>
          )}
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal-950 leading-tight tracking-[-0.02em]">
            {article.title}
          </h1>
          {article.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs bg-white text-charcoal-600 px-2.5 py-1 rounded-full border border-parchment-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {article.body && <MarkdownRenderer content={article.body} />}
      </article>
    </div>
  )
}
