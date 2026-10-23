const messages = {
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে আগে থেকেই অ্যাকাউন্ট আছে। সাইন ইন করুন।",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "এই ইমেইল দিয়ে আগে থেকেই অ্যাকাউন্ট আছে। সাইন ইন করুন।",
  INVALID_EMAIL: "সঠিক ইমেইল ঠিকানা দিন।",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
  PASSWORD_TOO_LONG: "পাসওয়ার্ডটি অনেক বড়।",
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।",
  INVALID_PASSWORD: "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।",
  INVALID_ORIGIN:
    "এই সাইটের ঠিকানা অনুমোদিত নয়। Vercel authentication configuration যাচাই করুন।",
  INVALID_CALLBACK_URL: "OAuth callback URL অনুমোদিত নয়।",
  PROVIDER_NOT_FOUND: "এই সামাজিক লগইনটি এখন কনফিগার করা হয়নি।",
  OAUTH_PROVIDER_NOT_FOUND: "এই সামাজিক লগইনটি এখন কনফিগার করা হয়নি।",
  SOCIAL_PROVIDER_NOT_FOUND: "এই সামাজিক লগইনটি এখন কনফিগার করা হয়নি।",
  ACCOUNT_NOT_LINKED:
    "এই ইমেইলের একটি অ্যাকাউন্ট আগে থেকেই আছে। সামাজিক লগইনটি এখন সংযুক্ত করা যায়নি।",
  ACCOUNT_NOT_LINKED_TO_USER:
    "এই ইমেইলের একটি অ্যাকাউন্ট আগে থেকেই আছে। সামাজিক লগইনটি এখন সংযুক্ত করা যায়নি।",
  FAILED_TO_CREATE_USER:
    "অ্যাকাউন্ট তৈরি করা যায়নি। MongoDB connection ও environment variables যাচাই করুন।",
  FAILED_TO_CREATE_SESSION:
    "সেশন তৈরি করা যায়নি। Better Auth configuration যাচাই করুন।",
  FAILED_TO_CREATE_ACCOUNT:
    "অ্যাকাউন্ট তৈরি করা যায়নি। MongoDB connection ও environment variables যাচাই করুন।",
};

export function getAuthErrorMessage(error, fallback) {
  const code = error?.code || error?.body?.code || error?.data?.code;
  return messages[code] || fallback;
}
