import assert from "node:assert/strict";
import test from "node:test";

import { stackUrls } from "./urls";

test("account authentication returns customers to their dashboard", () => {
  assert.equal(stackUrls.afterSignIn, "/handler/account-redirect");
  assert.equal(stackUrls.afterSignUp, "/handler/account-redirect");
  assert.equal(stackUrls.afterSignOut, "/");
});
