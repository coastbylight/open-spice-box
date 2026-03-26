import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href && { item: `https://ancientpantry.com${item.href}` }),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6" data-no-print>
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-charcoal-400 font-body">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden="true" className="text-parchment-300 select-none">/</span>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-ochre-600 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ochre-500 rounded"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-charcoal-600 truncate max-w-[200px] sm:max-w-xs">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
