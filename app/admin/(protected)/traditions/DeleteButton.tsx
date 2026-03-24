'use client'

import { useRouter } from 'next/navigation'

export default function DeleteButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    const res = await fetch(`/api/admin/traditions/${id}`, { method: 'DELETE' })
    if (res.ok) {
      router.refresh()
    } else {
      const json = await res.json()
      alert(json.error ?? 'Delete failed')
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-terra-600 hover:bg-terra-500 text-white rounded px-3 py-1.5 text-sm transition-colors"
    >
      Delete
    </button>
  )
}
