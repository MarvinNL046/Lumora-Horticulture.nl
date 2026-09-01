import 'server-only'

import { api } from '@/../convex/_generated/api'
import { convex, convexServerAuth } from '@/lib/convex'
import {
  getTrustedClientAddress,
  hashRateLimitIdentity,
} from '@/lib/rate-limit-identity'

export type DistributedRateLimitResult =
  | {
      kind: 'allowed'
      limit: number
      remaining: number
      retryAfterSeconds: number
    }
  | {
      kind: 'limited'
      limit: number
      remaining: 0
      retryAfterSeconds: number
    }
  | { kind: 'unavailable'; retryAfterSeconds: number }

/**
 * Consume an atomic Convex-backed request quota. Only a route-bound HMAC of
 * the client address leaves the Next.js process; raw addresses are never
 * persisted in Convex.
 */
export async function consumeDistributedRateLimit(
  headers: Headers,
  route: string,
  limit: number,
  windowMs: number,
): Promise<DistributedRateLimitResult> {
  const clientAddress = getTrustedClientAddress(headers)
  if (!clientAddress) return { kind: 'unavailable', retryAfterSeconds: 60 }

  try {
    const auth = convexServerAuth()
    const result = await convex.mutation(api.requestRateLimits.consume, {
      ...auth,
      route,
      key_hash: hashRateLimitIdentity(route, clientAddress, auth.server_secret),
      limit,
      window_ms: windowMs,
    })

    return result.allowed
      ? {
          kind: 'allowed',
          limit: result.limit,
          remaining: result.remaining,
          retryAfterSeconds: result.retry_after_seconds,
        }
      : {
          kind: 'limited',
          limit: result.limit,
          remaining: 0,
          retryAfterSeconds: result.retry_after_seconds,
        }
  } catch (error) {
    console.error(`Distributed rate limit failed for ${route}:`, error)
    return { kind: 'unavailable', retryAfterSeconds: 60 }
  }
}

