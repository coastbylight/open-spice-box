import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import DeleteButton from './DeleteButton'

export default async function HowToPage() {
  const supabase = createClient()
  const { data: articles, error } = await supabase
    .from('howto_articles')
    .select('id, title, slug, category, published')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display text-charcoal-100">How-To Articles</h1>
        <Link
          href="/admin/howto/new"
          className="bg-ochre-600 hover:bg-ochre-500 text-white rounded px-4 py-2 text-sm font-medium transition-colors"
        >
          + New Article
        </Link>
      </div>

      {error && (
        <p className="text-terra-400 text-sm mb-4">{error.message}</p>
      )}

      <div className="bg-charcoal-900 rounded-lg overflow-hidden">
        {!articles || articles.length === 0 ? (
          <p className="text-charcoal-400 text-sm p-6">No articles yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-charcoal-800">
                <th className="text-left text-charcoal-400 font-medium px-4 py-3">Title</th>
                <th className="text-left text-charcoal-400 font-medium px-4 py-3">Category</th>
                <th className="text-left text-charcoal-400 font-medium px-4 py-3">Status</th>
                <th className="text-right text-charcoal-400 font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="border-b border-charcoal-800 last:border-0 hover:bg-charcoal-800/40 transition-colors">
                  <td className="px-4 py-3 text-charcoal-100">{a.title}</td>
                  <td className="px-4 py-3 text-charcoal-400">{a.category ?? '—'}</td>
                  <td className="px-4 py-3">
                    {a.published ? (
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-ochre-600/20 text-ochre-400">Published</span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-charcoal-800 text-charcoal-500">Draft</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/howto/${a.id}/edit`}
                      className="text-charcoal-400 hover:text-charcoal-100 transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={a.id} title={a.title} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
