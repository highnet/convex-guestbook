// app/page.tsx
'use client'; // This component needs to be a client component to use hooks

import { SignInButton, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { MessageSquare, Users, LogIn } from 'lucide-react';

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
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
        {/* Header with theme toggle */}
        <div className="flex justify-end mb-8">
          <ThemeToggle />
        </div>

        {/* Main content */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <MessageSquare className="w-12 h-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">Guestbook</CardTitle>
              <CardDescription>
                Connect and share your thoughts with the community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>Join the conversation</span>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                  <strong>Registered Users Only</strong>
                  <br />
                  This guestbook is exclusively for registered members.
                </p>
              </div>

              <SignInButton mode="modal" fallbackRedirectUrl="/member">
                <Button className="w-full" size="lg">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In to Continue
                </Button>
              </SignInButton>

              <p className="text-center text-sm text-muted-foreground">
                Sign in to access the guestbook and leave your message
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
