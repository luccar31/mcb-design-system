export type ClassValue = string | number | boolean | null | undefined

export function cx(...values: ClassValue[]): string {
  return values.filter((value): value is string => typeof value === 'string' && value !== '').join(' ')
}
