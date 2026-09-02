import "server-only";

import { StackServerApp } from "@stackframe/stack";

import { stackUrls } from "./urls";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: stackUrls,
});
