'use client'

import { cn } from '@/lib/utils'
import { remark } from 'remark'
import html from 'remark-html'

// Regex para detectar URLs
const URL_REGEX =
  /(?<!href=["']|">)(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}(?:[^\s]*))/g

// Função para converter URLs em texto para links, evitando HTML existente
function autoLinkUrls(htmlContent: string): string {
  // Divide o HTML em partes: tags e texto
  const parts = htmlContent.split(/(<[^>]*>)/g)

  return parts
    .map((part, index) => {
      // Se for uma tag HTML (índice ímpar), não processa
      if (index % 2 === 1) {
        return part
      }

      // Se for texto, processa URLs
      return part.replace(URL_REGEX, (url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
      })
    })
    .join('')
}

export function Markdown({
  content,
  className,
}: {
  content: string
  className?: string
}) {
  const processedContent = remark().use(html).processSync(content)
  let htmlContent = processedContent.toString()

  // Primeiro: adiciona target="_blank" aos links markdown existentes
  htmlContent = htmlContent.replace(
    /<a href="(https?:\/\/[^"]*)"([^>]*)>/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer"$2>',
  )

  // Segundo: converte URLs soltas em links
  htmlContent = autoLinkUrls(htmlContent)

  return (
    <div
      className={cn(
        // Container base
        'max-w-none text-muted-foreground text-xl',

        // Headings
        '[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-8 [&_h1]:border-b [&_h1]:pb-2',
        '[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-6 [&_h2]:border-b [&_h2]:pb-2',
        '[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_h3]:mt-4 [&_h3]:border-b [&_h3]:pb-2',
        '[&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mb-2 [&_h4]:mt-3 ',
        '[&_h5]:text-base [&_h5]:font-semibold [&_h5]:mb-2 [&_h5]:mt-3 ',
        '[&_h6]:text-sm [&_h6]:font-semibold [&_h6]:mb-2 [&_h6]:mt-3 ',

        // Paragraphs
        '[&_p]:mb-4 [&_p]:leading-relaxed',

        // Lists
        '[&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2',
        '[&_ol]:mb-4 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-2',
        '[&_li]:leading-relaxed',

        // Links - Adicionado break-all para URLs longas
        '[&_a]:text-primary [&_a]:font-bold hover:[&_a]:text-primary/80 [&_a]:break-all',

        // Code
        '[&_code]:bg-muted [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono ',
        '[&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-4',
        '[&_pre_code]:bg-transparent [&_pre_code]:p-0 ',

        // Blockquotes
        '[&_blockquote]:border-l-4 [&_blockquote]:border-muted-foreground [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:mb-4',

        // Tables
        '[&_table]:w-full [&_table]:mb-4 [&_table]:border-collapse',
        '[&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:bg-muted [&_th]:font-semibold [&_th]:text-left',
        '[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2',

        // Images
        '[&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:mb-4',

        // Horizontal Rule
        '[&_hr]:border-border [&_hr]:my-8',

        // Strong and emphasis
        '[&_strong]:font-semibold ',
        '[&_em]:italic ',

        className,
      )}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
