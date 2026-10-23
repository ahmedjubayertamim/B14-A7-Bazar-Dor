
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { mongoClient, db } from "@/lib/mongodb";

const normalizeBaseURL = (value) => {
  if (!value) return value;
  return value.replace(/\/+$/, "");
};

const getConfiguredBaseURL = () =>
  normalizeBaseURL(
    process.env.BETTER_AUTH_URL ||
      (process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : undefined)
  );

const socialProviders = {};

if (
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET
) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

if (
  process.env.GITHUB_CLIENT_ID &&
  process.env.GITHUB_CLIENT_SECRET
) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: mongoClient,
  }),

  baseURL: getConfiguredBaseURL(),

  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: getConfiguredBaseURL()
    ? [getConfiguredBaseURL()]
    : undefined,

  emailAndPassword: {
    enabled: true,
  },

  socialProviders,
});

function requireEnvironmentVariable(name) {
  if (!process.env[name]?.trim()) {
    throw new Error(`Missing required authentication environment variable: ${name}`);
  }
}

function validateURL(name, value, { requireHttps = false } = {}) {
  let url;

  try {
    url = new URL(value);
  } catch {
    throw new Error(`Invalid authentication URL in ${name}`);
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error(`Authentication URL in ${name} must use HTTP or HTTPS`);
  }

  if (requireHttps && url.protocol !== "https:") {
    throw new Error(`${name} must use HTTPS in production`);
  }

  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error(`${name} must contain only the application origin`);
  }

  return normalizeBaseURL(url.origin);
}

export function validateAuthEnvironment() {
  [
    "MONGODB_URI",
    "MONGODB_DB",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "NEXT_PUBLIC_BETTER_AUTH_URL",
  ].forEach(requireEnvironmentVariable);

  const isProduction = process.env.NODE_ENV === "production";
  const serverURL = validateURL("BETTER_AUTH_URL", process.env.BETTER_AUTH_URL, {
    requireHttps: isProduction,
  });
  const publicURL = validateURL(
    "NEXT_PUBLIC_BETTER_AUTH_URL",
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    { requireHttps: isProduction }
  );

  if (serverURL !== publicURL) {
    throw new Error(
      "BETTER_AUTH_URL and NEXT_PUBLIC_BETTER_AUTH_URL must use the same origin"
    );
  }

  if (isProduction && process.env.BETTER_AUTH_SECRET.length < 32) {
    throw new Error(
      "BETTER_AUTH_SECRET must contain at least 32 characters in production"
    );
  }
}
