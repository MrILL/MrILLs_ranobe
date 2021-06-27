import { randomInt } from 'crypto';

const CHARS =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';

export function genBase64UID(length): string {
  return Array.from({ length }, () => CHARS[randomInt(CHARS.length)]).join('');
}
