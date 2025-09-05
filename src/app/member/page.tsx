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
    return <div>Loading...</div>;
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
    <main className="container mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Convex Guestbook</h1>
        <div>
          <div className="flex items-center gap-4">
            <p>Welcome, {user.firstName}!</p>
            <SignOutButton />
          </div>
        </div>
      </div>

      <p className="mb-6 text-lg text-gray-400">
        Leave a message. New messages will appear in real-time.
      </p>

      <MessageForm
        newMessageText={newMessageText}
        setNewMessageText={setNewMessageText}
        onSubmit={handleSendMessage}
      />

      <MessageList messages={messages} />
    </main>
  );
}
