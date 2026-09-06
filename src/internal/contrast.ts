/** WCAG 2.1 relative luminance and contrast. Used by the Fundamentos stories. */

function channels(hex: string): [number, number, number] {
  let value = hex.replace('#', '')
  if (value.length === 3) value = value.split('').map((c) => c + c).join('')
  const parse = (index: number) => parseInt(value.slice(index, index + 2), 16)
  return [parse(0), parse(2), parse(4)]
}

export function luminance(hex: string): number {
  const [r, g, b] = channels(hex).map((v) => {
    const channel = v / 255
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  }) as [number, number, number]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: string, b: string): number {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

export type ContrastGrade = 'AAA' | 'AA' | 'AA grande' | 'UI 3:1' | 'insuficiente'

export function grade(ratio: number): ContrastGrade {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'AA grande'
  return 'insuficiente'
}
