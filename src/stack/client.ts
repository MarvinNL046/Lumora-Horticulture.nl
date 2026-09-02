"use client";
import { StackClientApp } from "@stackframe/stack";

import { stackUrls } from "./urls";

export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
  urls: stackUrls,
});
