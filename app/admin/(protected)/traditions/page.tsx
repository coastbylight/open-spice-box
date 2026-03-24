import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import DeleteButton from './DeleteButton'

export default async function TraditionsPage() {
  const supabase = createClient()
  const { data: traditions, error } = await supabase
    .from('traditions')
    .select('id, name, slug, published, region')
    .order('name', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display text-charcoal-100">Traditions</h1>
        <Link
          href="/admin/traditions/new"
          className="bg-ochre-600 hover:bg-ochre-500 text-white rounded px-4 py-2 text-sm font-medium transition-colors"
        >
          + New Tradition
        </Link>
      </div>

      {error && (
        <p className="text-terra-400 text-sm mb-4">{error.message}</p>
      )}

      <div className="bg-charcoal-900 rounded-lg overflow-hidden">
        {!traditions || traditions.length === 0 ? (
          <p className="text-charcoal-400 text-sm p-6">No traditions yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-charcoal-800">
                <th className="text-left text-charcoal-400 font-medium px-4 py-3">Name</th>
                <th className="text-left text-charcoal-400 font-medium px-4 py-3">Region</th>
                <th className="text-left text-charcoal-400 font-medium px-4 py-3">Status</th>
                <th className="text-right text-charcoal-400 font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {traditions.map((t) => (
                <tr key={t.id} className="border-b border-charcoal-800 last:border-0 hover:bg-charcoal-800/40 transition-colors">
                  <td className="px-4 py-3 text-charcoal-100">{t.name}</td>
                  <td className="px-4 py-3 text-charcoal-400">{t.region ?? '—'}</td>
                  <td className="px-4 py-3">
                    {t.published ? (
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-ochre-600/20 text-ochre-400">Published</span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-charcoal-800 text-charcoal-500">Draft</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/traditions/${t.id}/edit`}
                      className="text-charcoal-400 hover:text-charcoal-100 transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={t.id} name={t.name} />
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
