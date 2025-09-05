// app/page.tsx
'use client'; // This component needs to be a client component to use hooks

import { useQuery, useMutation } from 'convex/react';
import { FormEvent, useState } from 'react';
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { api } from '../../convex/_generated/api';

export default function Home() {
  // Convex hooks for data fetching and mutation
  const messages = useQuery(api.messages.list) || [];
  const sendMessage = useMutation(api.messages.send);

  // Clerk hook to get user information
  const { user } = useUser();
  console.log('User from Clerk useUser():', user);

  // React state for the form input
  const [newMessageText, setNewMessageText] = useState('');

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    if (newMessageText.trim() === '') return;

    console.log('Attempting to send message:', newMessageText);
    console.log('User state before sending:', user);

    try {
      await sendMessage({ body: newMessageText });
      console.log('Message sent successfully');
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
          {/* Conditional rendering for Sign In/Out */}
          {!user && <SignInButton mode="modal" />}
          {user && (
            <div className="flex items-center gap-4">
              <p>Welcome, {user.firstName}!</p>
              <SignOutButton />
            </div>
          )}
        </div>
      </div>

      <p className="mb-6 text-lg text-gray-400">
        Sign in to leave a message. New messages will appear in real-time.
      </p>

      {user && (
        <form onSubmit={handleSendMessage} className="flex gap-4 mb-8">
          <input
            value={newMessageText}
            onChange={(event) => setNewMessageText(event.target.value)}
            className="flex-grow p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your message..."
          />
          <button
            type="submit"
            disabled={!newMessageText}
            className="px-6 py-3 bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-600 transition-colors"
          >
            Send
          </button>
        </form>
      )}

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className="p-4 bg-gray-800 rounded-lg shadow-md"
          >
            <p className="text-lg">{message.body}</p>
            <p className="text-sm text-gray-500 mt-2">- {message.author}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
