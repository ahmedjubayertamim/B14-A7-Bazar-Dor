
"use client";

import { createAuthClient } from "better-auth/react";

const normalizeBaseURL = (value) => {
  if (!value) return value;
  return value.replace(/\/+$/, "");
};

export const authClient = createAuthClient({
  baseURL: normalizeBaseURL(
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
      (process.env.NODE_ENV === "development" ? "http://localhost:3000" : undefined)
  ),
});
