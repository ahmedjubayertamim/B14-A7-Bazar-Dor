import { auth, validateAuthEnvironment } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const { GET: betterAuthGET, POST: betterAuthPOST } = toNextJsHandler(auth);

export async function GET(request) {
  validateAuthEnvironment();
  return betterAuthGET(request);
}

export async function POST(request) {
  validateAuthEnvironment();
  return betterAuthPOST(request);
}
