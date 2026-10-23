# BazarDor (বাজার দর)

BazarDor is a responsive Next.js application for checking everyday grocery
prices in Bangladesh. It displays live product data, price changes, category
views, market-wise price ranges, and authenticated account features.

## Technologies

- Next.js 16 App Router
- React 19 and JavaScript/JSX
- Tailwind CSS
- MongoDB Atlas
- Better Auth
- Programming Hero BazarDor API
- `react-hot-toast`

## Features

- Responsive Bangla navbar with categories and animated price ticker
- Hero section with smooth navigation to the complete product list
- Rising, falling, unchanged, and all-product price sections
- Category pages with Bengali-digit price sorting and loading skeletons
- Protected product details with market-wise minimum and maximum prices
- Email/password authentication with session-aware navigation
- Protected account page with authenticated name updates
- Toast feedback for authentication and account actions

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local `.env.local` file using [`.env.example`](./.env.example) as a
name-only template. Keep `.env.local` private and provide these variables:

```text
MONGODB_URI=your-mongodb-atlas-connection-string
MONGODB_DB=your-database-name
BETTER_AUTH_SECRET=your-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

`BETTER_AUTH_URL` is the server-side Better Auth base URL. The browser auth
client uses `NEXT_PUBLIC_BETTER_AUTH_URL`, which is intentionally public and
must point to the same application origin. Do not include a trailing slash in
these values; Better Auth appends the callback path automatically. The code uses `http://localhost:3000` only during development. Production
requests fail with a configuration error if either URL is missing, invalid,
non-HTTPS, or points to a different origin.

### OAuth configuration

Google and GitHub OAuth are supported through Better Auth 1.7.12, but remain
disabled until their credentials are configured. Add the following
server-only variables to `.env.local` or the deployment secret store:

```text
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

Set the matching browser-visible enablement flag to `true` only after that
provider's two server-side credentials are present:

```text
NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=false
NEXT_PUBLIC_GITHUB_AUTH_ENABLED=false
```

These flags do not contain credentials. They only control whether the
corresponding sign-in button is enabled. The Better Auth callback URL pattern
for the current production deployment is:

```text
https://bazar-dor-ahmedjubayertamim.vercel.app/api/auth/callback/google
https://bazar-dor-ahmedjubayertamim.vercel.app/api/auth/callback/github
```

For local development, use:

```text
http://localhost:3000/api/auth/callback/google
http://localhost:3000/api/auth/callback/github
```

Register the matching callback URL in the Google Cloud OAuth client and GitHub
OAuth App settings. Do not add callback URLs for a domain that has not
actually been assigned to the deployment.

For production, set both URL variables explicitly to the deployed HTTPS
origin. Do not use a localhost URL in deployment settings. Keep
`BETTER_AUTH_SECRET` server-only and use a cryptographically secure value of at
least 32 random bytes. For example, generate one locally with:

```bash
openssl rand -base64 32
```

On PowerShell, use the platform cryptographic generator:

```powershell
$bytes = [byte[]]::new(32)
[System.Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
[Convert]::ToBase64String($bytes)
```

Copy the generated value directly into your local or deployment secret store;
do not commit it or place it in client-exposed variables. Never commit
`.env.local` or expose the MongoDB URI or authentication secret.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npm run build
```

The MongoDB connectivity check is available at
`/api/test-db` and returns success only after a database ping succeeds.

## Deployment

For Vercel or another supported Next.js platform, configure the MongoDB and
Better Auth environment variables in the deployment settings:
`MONGODB_URI`, `MONGODB_DB`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`,
`NEXT_PUBLIC_BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`,
`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED`,
and `NEXT_PUBLIC_GITHUB_AUTH_ENABLED`. Set both Better Auth URL variables to
the same deployed HTTPS origin, add the deployment URL to the MongoDB Atlas
IP/network policy, and keep TLS certificate validation enabled. OAuth buttons
are enabled only when the public flag and its matching server credentials are
present.
