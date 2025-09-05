// app/member/page.tsx
'use client'; // This component needs to be a client component to use hooks

import { useQuery, useMutation } from 'convex/react';
import { FormEvent, useState, useEffect } from 'react';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { api } from '../../../convex/_generated/api';
import posthog from 'posthog-js';
import { useRouter } from 'next/navigation';
import MessageForm from '../../components/MessageForm';
import MessageList from '../../components/MessageList';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ThemeToggle } from '@/components/theme-toggle';
import { LogOut, User } from 'lucide-react';

export default function MemberPage() {
  const router = useRouter();
  const { user } = useUser();

  // Convex hooks for data fetching and mutation
  const messages = useQuery(api.messages.list) || [];
  const sendMessage = useMutation(api.messages.send);

  // React state for the form input
  const [newMessageText, setNewMessageText] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto p-6">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Skeleton className="h-9 w-20" />
                </div>
              </div>
            </CardHeader>
          </Card>
          <Separator className="mb-8" />
          <Card className="mb-8">
            <div className="p-6">
              <Skeleton className="h-24 w-full mb-4" />
              <Skeleton className="h-10 w-20" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    if (newMessageText.trim() === '') return;

    console.log('Attempting to send message:', newMessageText);
    console.log('User state before sending:', user);

    try {
      await sendMessage({ body: newMessageText });
      console.log('Message sent successfully!');

      // Track the message_sent event
      posthog.capture('message_sent', {
        message_length: newMessageText.length,
        user_id: user?.id,
        timestamp: new Date().toISOString(),
      });

      setNewMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
        {/* Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>
                    {user.firstName?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {user.firstName}!
                  </CardTitle>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <div className="flex items-center gap-2">
                  <LogOut className="w-4 h-4 text-muted-foreground" />
                  <SignOutButton />
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Separator className="mb-8" />

        {/* Message Form */}
        <MessageForm
          newMessageText={newMessageText}
          setNewMessageText={setNewMessageText}
          onSubmit={handleSendMessage}
        />

        {/* Messages List */}
        <MessageList messages={messages} />
      </div>
    </div>
  );
}
