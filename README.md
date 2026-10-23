# BazarDor

BazarDor is a responsive Bengali market-price application for browsing daily
grocery prices in Bangladesh. It retrieves product data from the BazarDor API,
groups products by price movement and category, and provides protected user
account features through Better Auth and MongoDB Atlas.

## Live Demo

- **Production:** <https://bazar-dor-six-chi.vercel.app>
- **Sign in:** <https://bazar-dor-six-chi.vercel.app/signin>
- **Sign up:** <https://bazar-dor-six-chi.vercel.app/signup>

## Features

- Bengali responsive navigation with category filtering
- Animated market-price ticker
- Product sections for rising, falling, unchanged, and all prices
- Category pages with Bengali price sorting
- Product detail pages with market-wise price ranges
- Loading states and friendly empty/error states
- Email/password registration and sign-in
- Google and GitHub OAuth sign-in
- MongoDB-backed users, accounts, and sessions
- Protected account page with editable display name
- Session-aware navigation and sign-out
- Toast notifications for user feedback
- MongoDB health-check endpoint for deployment diagnostics

## Tech Stack

- Next.js 16 App Router
- React 19
- JavaScript and JSX
- Tailwind CSS 4
- Better Auth 1.7
- MongoDB Atlas
- `@better-auth/mongo-adapter`
- Programming Hero BazarDor API
- `react-hot-toast`
- Vercel

## Project Structure

```text
src/
├── app/
│   ├── account/              Protected account page
│   ├── api/auth/             Better Auth handlers and provider status
│   ├── api/test-db/          MongoDB health check
│   ├── category/[slug]/      Category product pages
│   ├── product/[slug]/       Product detail pages
│   ├── signin/               Email and social sign-in
│   ├── signup/               Account registration
│   └── page.js               Home page
├── components/               Reusable UI components
└── lib/
    ├── api.js                Product API client
    ├── auth.js               Server-side Better Auth configuration
    ├── auth-client.js        Browser-side auth client
    └── mongodb.js            MongoDB client and database connection
```

## Requirements

- Node.js 20 or newer
- npm
- A MongoDB Atlas cluster
- OAuth credentials if Google or GitHub sign-in is required

## Local Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/ahmedjubayertamim/B14-A7-Bazar-Dor.git
cd B14-A7-Bazar-Dor
npm install
```

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Open <http://localhost:3000>.

## Environment Variables

### Required server and auth variables

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=bazardor-auth
BETTER_AUTH_SECRET=<long-random-secret>
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

`BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` must use the same origin
and must not include a trailing slash. In production, both must use the
deployed HTTPS origin.

### OAuth variables

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=false
NEXT_PUBLIC_GITHUB_AUTH_ENABLED=false
```

The browser-visible enablement flag should be `true` only when the matching
server-side client ID and client secret are configured.

Never commit `.env.local`, MongoDB credentials, OAuth client secrets, or
`BETTER_AUTH_SECRET`.

## OAuth Callback URLs

For the current production deployment:

```text
Google:
https://bazar-dor-six-chi.vercel.app/api/auth/callback/google

GitHub:
https://bazar-dor-six-chi.vercel.app/api/auth/callback/github
```

For local development:

```text
Google:
http://localhost:3000/api/auth/callback/google

GitHub:
http://localhost:3000/api/auth/callback/github
```

The callback URLs configured in Google Cloud Console and the GitHub OAuth App
must exactly match the URL used by the deployment.

## MongoDB Atlas Configuration

1. Create a database user in **Security → Database Access**.
2. Set `MONGODB_DB` to `bazardor-auth`.
3. Add the Vercel deployment to **Security → Network Access**.
4. For initial testing, `0.0.0.0/0` can be used; replace it with a more
   restrictive production networking strategy when possible.
5. Add the variables to the Vercel **Production** environment.
6. Redeploy after changing environment variables.

Check the connection with:

```text
https://bazar-dor-six-chi.vercel.app/api/test-db
```

A successful response is:

```json
{
  "success": true,
  "message": "MongoDB connected successfully!"
}
```

## Authentication Endpoints

Better Auth handles authentication under:

```text
/api/auth/*
```

The provider diagnostic endpoint is:

```text
/api/auth/providers
```

It reports whether Google and GitHub are enabled based on their deployment
configuration. The account-linking configuration allows a verified social
provider to link to an existing account with the same email address.

## Scripts

```bash
npm run dev          # Start the development server
npm run build        # Create a production build
npm run start        # Start the production server
npm run lint         # Run ESLint
npm run auth:check   # Inspect required auth environment variables
```

Run the main validation commands before deployment:

```bash
npm run lint
npm run build
```

## Vercel Deployment

1. Import the GitHub repository into Vercel.
2. Add all required environment variables under the **Production** environment.
3. Set both Better Auth URL variables to the same HTTPS production origin.
4. Configure MongoDB Atlas Network Access.
5. Configure the exact Google and GitHub callback URLs.
6. Deploy or redeploy the project.
7. Verify `/api/test-db`, sign-up, email sign-in, and OAuth sign-in.

If Vercel Deployment Protection is enabled, it can intercept OAuth callback
requests. Make the production deployment publicly reachable or configure the
protection rules so Better Auth callback requests are not blocked.

## Security Notes

- Keep all secrets in local or deployment environment variables.
- Rotate any credential that has been exposed.
- Do not paste MongoDB URIs, passwords, OAuth secrets, or auth secrets into
  issues, screenshots, commits, or chat.
- Use HTTPS in production.
- Prefer a restricted MongoDB network policy for production.
