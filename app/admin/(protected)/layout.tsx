import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/layout/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-charcoal-950 flex">
      <AdminSidebar />
      <main className="flex-1 p-8 text-charcoal-100 overflow-auto">
        {children}
      </main>
    </div>
  )
}
