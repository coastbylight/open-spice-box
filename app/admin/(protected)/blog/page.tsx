import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import DeleteButton from './DeleteButton'

export default async function BlogPage() {
  const supabase = createClient()
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, published, created_at')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display text-charcoal-100">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="bg-ochre-600 hover:bg-ochre-500 text-white rounded px-4 py-2 text-sm font-medium transition-colors"
        >
          + New Post
        </Link>
      </div>

      {error && (
        <p className="text-terra-400 text-sm mb-4">{error.message}</p>
      )}

      <div className="bg-charcoal-900 rounded-lg overflow-hidden">
        {!posts || posts.length === 0 ? (
          <p className="text-charcoal-400 text-sm p-6">No posts yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-charcoal-800">
                <th className="text-left text-charcoal-400 font-medium px-4 py-3">Title</th>
                <th className="text-left text-charcoal-400 font-medium px-4 py-3">Date</th>
                <th className="text-left text-charcoal-400 font-medium px-4 py-3">Status</th>
                <th className="text-right text-charcoal-400 font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-charcoal-800 last:border-0 hover:bg-charcoal-800/40 transition-colors">
                  <td className="px-4 py-3 text-charcoal-100">{p.title}</td>
                  <td className="px-4 py-3 text-charcoal-400">
                    {new Date(p.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    {p.published ? (
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-ochre-600/20 text-ochre-400">Published</span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-charcoal-800 text-charcoal-500">Draft</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/blog/${p.id}/edit`}
                      className="text-charcoal-400 hover:text-charcoal-100 transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={p.id} title={p.title} />
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
