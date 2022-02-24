import { randomInt } from 'crypto'

const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-'

export function genBase64UID(length: number): string {
  return Array.from({ length }, () => CHARS[randomInt(CHARS.length)]).join('')
}

export function isBase64UID(str: string): boolean {
  const validationRE = new RegExp(`^[A-Za-z0-9_-]{${str.length}}$`)

  return validationRE.test(str)
}
