import { createClient } from '@/lib/supabase/server'

export default async function ContactPage() {
  const supabase = createClient()
  const { data: submissions, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display text-charcoal-100">Contact Submissions</h1>
        <p className="text-charcoal-400 text-sm mt-1">Read-only. Most recent first.</p>
      </div>

      {error && (
        <p className="text-terra-400 text-sm mb-4">{error.message}</p>
      )}

      <div className="space-y-3">
        {!submissions || submissions.length === 0 ? (
          <p className="text-charcoal-400 text-sm">No submissions yet.</p>
        ) : (
          submissions.map((s) => (
            <div key={s.id} className="bg-charcoal-900 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-charcoal-100 text-sm font-medium">{s.name}</span>
                  <a
                    href={`mailto:${s.email}`}
                    className="text-ochre-400 text-sm hover:text-ochre-300 transition-colors"
                  >
                    {s.email}
                  </a>
                </div>
                <span className="text-charcoal-500 text-xs shrink-0">
                  {new Date(s.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <p className="text-charcoal-400 text-sm leading-relaxed">
                {s.message.length > 100 ? `${s.message.slice(0, 100)}…` : s.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
