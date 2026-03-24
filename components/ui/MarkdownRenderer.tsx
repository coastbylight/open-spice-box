'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className }: Props) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="font-display text-lg text-charcoal-900 mt-6 mb-2 tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-display text-base font-semibold text-charcoal-800 mt-4 mb-1">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-sm text-charcoal-700 leading-[1.8] mb-3 last:mb-0">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-5 space-y-1 mb-3 text-sm text-charcoal-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-5 space-y-1 mb-3 text-sm text-charcoal-700">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-charcoal-900">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-charcoal-600">{children}</em>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-ochre-700 underline underline-offset-2 hover:text-ochre-600 transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-ochre-300 pl-4 text-charcoal-500 italic my-4">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-parchment-300 my-6" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
