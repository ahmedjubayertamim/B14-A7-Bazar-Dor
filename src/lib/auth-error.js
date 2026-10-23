const messages = {
  USER_ALREADY_EXISTS:
    "An account with this email already exists. Please sign in.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "An account with this email already exists. Please sign in.",
  INVALID_EMAIL: "Please enter a valid email address.",
  PASSWORD_TOO_SHORT: "The password must be at least 8 characters long.",
  PASSWORD_TOO_LONG: "The password is too long.",
  INVALID_EMAIL_OR_PASSWORD: "The email or password is incorrect.",
  INVALID_PASSWORD: "The email or password is incorrect.",
  INVALID_ORIGIN:
    "This site origin is not authorized. Check the Vercel authentication configuration.",
  INVALID_CALLBACK_URL: "The OAuth callback URL is not authorized.",
  PROVIDER_NOT_FOUND: "This social login provider is not configured.",
  OAUTH_PROVIDER_NOT_FOUND: "This social login provider is not configured.",
  SOCIAL_PROVIDER_NOT_FOUND: "This social login provider is not configured.",
  ACCOUNT_NOT_LINKED:
    "An account with this email already exists, but the social login could not be linked.",
  ACCOUNT_NOT_LINKED_TO_USER:
    "An account with this email already exists, but the social login could not be linked.",
  FAILED_TO_CREATE_USER:
    "The account could not be created. Check the MongoDB connection and environment variables.",
  FAILED_TO_CREATE_SESSION:
    "The session could not be created. Check the Better Auth configuration.",
  FAILED_TO_CREATE_ACCOUNT:
    "The account could not be created. Check the MongoDB connection and environment variables.",
};

export function getAuthErrorMessage(error, fallback) {
  const code = error?.code || error?.body?.code || error?.data?.code;
  return messages[code] || fallback;
}
