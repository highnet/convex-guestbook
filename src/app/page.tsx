// app/page.tsx
'use client'; // This component needs to be a client component to use hooks

import { SignInButton, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  // Clerk hook to get user information
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.push('/member');
    }
  }, [user, router]);

  return (
    <main className="container mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Convex Guestbook</h1>
        <SignInButton mode="modal" fallbackRedirectUrl="/member" />
      </div>
      <p className="mb-6 text-lg text-gray-400">
        Please sign in to access the guestbook.
      </p>
    </main>
  );
}
