import type { HandlerUrlOptions } from "@stackframe/stack";

export const stackUrls = {
  afterSignIn: "/handler/account-redirect",
  afterSignUp: "/handler/account-redirect",
  afterSignOut: "/",
} satisfies HandlerUrlOptions;
