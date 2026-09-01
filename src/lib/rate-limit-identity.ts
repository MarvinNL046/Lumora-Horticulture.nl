import { createHmac } from 'node:crypto'
import { isIP } from 'node:net'

function normaliseAddress(rawValue: string | null): string | null {
  const candidate = rawValue?.split(',', 1)[0]?.trim()
  if (!candidate || candidate.length > 64) return null

  if (isIP(candidate)) return candidate.toLowerCase()

  const bracketed = candidate.match(/^\[([^\]]+)](?::\d{1,5})?$/)
  if (bracketed && isIP(bracketed[1])) return bracketed[1].toLowerCase()

  const ipv4WithPort = candidate.match(/^([^:]+):\d{1,5}$/)
  if (ipv4WithPort && isIP(ipv4WithPort[1]) === 4) return ipv4WithPort[1]

  return null
}

export function getTrustedClientAddress(headers: Headers): string | null {
  return normaliseAddress(headers.get('x-vercel-forwarded-for'))
    ?? normaliseAddress(headers.get('x-real-ip'))
    ?? normaliseAddress(headers.get('x-forwarded-for'))
}

export function hashRateLimitIdentity(
  route: string,
  clientAddress: string,
  serverSecret: string,
): string {
  return createHmac('sha256', serverSecret)
    .update(`${route}\0${clientAddress}`)
    .digest('hex')
}
