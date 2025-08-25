export function calculateReadingTime(text: string, wpm = 200): string {
  if (!text) return '0 min'

  // remove markdown simples e quebras
  const clean = text
    .replace(/[#_*>\-[\]()`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  const words = clean.split(' ').filter(Boolean).length
  const minutes = Math.ceil(words / wpm)

  return `${minutes} min de leitura`
}
