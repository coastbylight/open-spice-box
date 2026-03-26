'use client'

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-600 hover:text-charcoal-800 active:text-charcoal-900 bg-white border border-parchment-200 px-3.5 py-2 rounded-lg shadow-[0_1px_3px_-1px_rgba(74,63,53,0.1)] hover:shadow-[0_2px_6px_-2px_rgba(74,63,53,0.13)] hover:-translate-y-[0.5px] transition-[transform,box-shadow,color] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
      aria-label="Print this recipe"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path fillRule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.06.734.179 1.06.348a3.75 3.75 0 011.94 3.289V14a1 1 0 01-1 1h-2v1.25A1.75 1.75 0 0113.25 18h-6.5A1.75 1.75 0 015 16.25V15H3a1 1 0 01-1-1V9.939a3.75 3.75 0 011.94-3.289A3.69 3.69 0 015 6.302V2.75zm8.5 0v3.5h-7v-3.5a.25.25 0 01.25-.25h6.5a.25.25 0 01.25.25zM6.5 15v1.25c0 .138.112.25.25.25h6.5a.25.25 0 00.25-.25V15h-7z" clipRule="evenodd" />
      </svg>
      Print
    </button>
  )
}
