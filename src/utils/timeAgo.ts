const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 24 * 60 * 60],
  ['month', 30 * 24 * 60 * 60],
  ['day', 24 * 60 * 60],
  ['hour', 60 * 60],
  ['minute', 60],
]

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

export function timeAgo(iso: string): string {
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000

  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) {
      return rtf.format(Math.round(seconds / size), unit)
    }
  }
  return 'just now'
}
