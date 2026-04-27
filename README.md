# Convex Guestbook

A small member-only guestbook built with Next.js, Convex, Clerk, and PostHog.

Authenticated users can sign in, post messages, and see the message list update in real time. The frontend lives in the Next.js App Router, Convex handles the reactive backend and database, Clerk provides auth, and PostHog captures product analytics.

## Features

- Clerk-based sign-in flow
- Protected member area at `/member`
- Real-time guestbook messages powered by Convex
- Tailwind-based UI with light and dark theme support
- PostHog user identification and `message_sent` event tracking

## Tech Stack

- Next.js 15
- React 19
- Convex
- Clerk
- Tailwind CSS 4
- PostHog
- Radix UI

## How It Works

1. Unauthenticated users land on the home page and are prompted to sign in.
2. After authentication, users are redirected to `/member`.
3. The member page subscribes to the Convex `messages.list` query.
4. Sending a message calls the Convex `messages.send` mutation.
5. Convex updates the database and the UI refreshes reactively.
6. PostHog identifies signed-in users and records message events.

## Project Structure

```text
.
|-- convex/
|   |-- auth.config.ts      # Convex auth provider configuration
|   |-- messages.ts         # Guestbook query and mutation
|   |-- schema.ts           # Convex tables and indexes
|   `-- _generated/         # Convex generated types and helpers
|-- src/
|   |-- app/
|   |   |-- page.tsx        # Public landing page
|   |   |-- member/page.tsx # Protected guestbook page
|   |   |-- providers.tsx   # Convex + Clerk + theme providers
|   |   `-- PostHogProvider.tsx
|   `-- components/
|       |-- MessageForm.tsx
|       `-- MessageList.tsx
|-- instrumentation-client.js
`-- middleware.ts           # Auth middleware for Next.js routes
```

## Prerequisites

- Node.js 18 or newer
- An npm-compatible package manager
- A Convex project
- A Clerk application
- A PostHog project

## Environment Variables

Create a `.env.local` file for the Next.js app and provide these values:

```bash
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

Convex auth also needs the Clerk issuer domain. Provide it where your Convex environment variables are configured:

```bash
CLERK_JWT_ISSUER_DOMAIN=
```

Notes:

- `NEXT_PUBLIC_CONVEX_URL` is used by the Convex React client in the frontend.
- `CLERK_JWT_ISSUER_DOMAIN` is read by `convex/auth.config.ts` to validate Clerk tokens.
- `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` enable analytics in the browser.
- Depending on your Convex setup, `npx convex dev` may also generate local values such as `CONVEX_DEPLOYMENT`.

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Start Convex

In one terminal, run:

```bash
npx convex dev
```

This starts the Convex backend locally and regenerates the files in `convex/_generated` when needed.

### 3. Start Next.js

In a second terminal, run:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Available Scripts

```bash
npm run dev    # Start Next.js in development mode with Turbopack
npm run build  # Create a production build
npm run start  # Start the production server
npm run lint   # Run ESLint
```

## Convex Data Model

The guestbook stores messages in the `messages` table with:

- `author`
- `body`
- `authorId`

An index on `authorId` is defined for user-based lookups.

## Authentication Flow

- Next.js middleware wires Convex auth into the app request pipeline.
- Clerk manages sign-in and session state in the frontend.
- Convex verifies the authenticated identity before allowing writes.
- Unauthenticated users cannot send messages.

## Analytics

PostHog is initialized on the client and used for:

- user identification after sign-in
- analytics reset on sign-out
- `message_sent` event capture when a guestbook entry is submitted

## Deployment Notes

For production deployment:

1. Deploy the Convex backend with `npx convex deploy`.
2. Deploy the Next.js app to your hosting platform, such as Vercel.
3. Add the same environment variables for both the frontend and Convex production environments.
4. Confirm your Clerk production domain and redirect settings match the deployed app URL.

## Repo Purpose

This repository is a compact example of a real-time, authenticated guestbook using a modern React stack. It is a good starting point if you want to prototype a private community wall, internal shoutbox, or lightweight member feed.
