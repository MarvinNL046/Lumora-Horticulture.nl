import assert from "node:assert/strict";
import test from "node:test";

import { stackUrls } from "./urls";

test("account authentication returns customers to their dashboard", () => {
  assert.equal(stackUrls.afterSignIn, "/account");
  assert.equal(stackUrls.afterSignUp, "/account");
  assert.equal(stackUrls.afterSignOut, "/");
});
