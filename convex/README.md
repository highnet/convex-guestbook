# Convex Guestbook

A full-stack, real-time guestbook application built with Next.js, Convex, Clerk, Tailwind CSS, PostHog, and deployed on Vercel.

## Stack Overview

- **Next.js**: React framework for the frontend (App Router)
- **Convex**: Backend-as-a-service for real-time database and serverless functions
- **Clerk**: User authentication and session management
- **Tailwind CSS**: Utility-first CSS framework for styling
- **PostHog**: Product analytics and event tracking
- **Vercel**: Hosting and deployment platform

## Features

- Sign in/sign up with Clerk
- Post messages and view them in real time
- Responsive, modern UI with Tailwind CSS
- Analytics for user actions (sign in, message sent) via PostHog

## Prerequisites

- Node.js v18 or later
- Accounts for Convex, Clerk, PostHog, and Vercel

## Getting Started

### 1. Install dependencies

```sh
npm install
# or
yarn install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in:

- Convex deployment URL
- Clerk API keys
- PostHog API key and host

### 3. Start Convex backend

```sh
npx convex dev
```

### 4. Start Next.js frontend

```sh
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Usage

- Sign in with Clerk
- Post messages and see them update instantly
- View analytics in your PostHog dashboard

## Analytics with PostHog

- **Activity**: Live feed of all events (e.g., `message_sent`)
- **Data Management**: Catalog of all event types
- **Insights**: Visualize event trends
- **People**: See individual user activity

## Deployment

1. Push your code to GitHub
2. Deploy Convex backend for production:
   ```sh
   npx convex deploy
   ```
3. Create a Vercel project and import your repo
4. Add all environment variables in Vercel settings
5. Deploy and get your live URL

## Folder Structure

```

## License
MIT
```
