import 'server-only';

import { ConvexHttpClient } from 'convex/browser';

let _client: ConvexHttpClient | null = null;

function getClient(): ConvexHttpClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!url) {
      throw new Error('NEXT_PUBLIC_CONVEX_URL is not set');
    }
    _client = new ConvexHttpClient(url);
  }
  return _client;
}

export const convex = new Proxy({} as ConvexHttpClient, {
  get(_target, prop) {
    const client = getClient() as unknown as Record<string | symbol, unknown>;
    const value = client[prop];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

/**
 * Shared secret for server-to-server Convex calls.
 *
 * Sensitive Convex functions are still public HTTP endpoints by platform
 * design, so every server caller must prove it is part of this application.
 * Fail closed when rollout configuration is missing or accidentally weak.
 */
export function requireConvexServerSecret(): string {
  const secret = process.env.CONVEX_SERVER_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error('CONVEX_SERVER_SECRET must be configured with at least 32 characters');
  }

  return secret;
}

export function convexServerAuth(): { server_secret: string } {
  return { server_secret: requireConvexServerSecret() };
}
