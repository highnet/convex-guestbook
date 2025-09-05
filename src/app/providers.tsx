'use client';

import { ReactNode } from 'react';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { useAuth } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
console.log(
  'Convex client initialized with URL:',
  process.env.NEXT_PUBLIC_CONVEX_URL
);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  console.log('ConvexClientProvider rendering');
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ThemeProvider>
  );
}
