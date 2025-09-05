// convex/schema.ts
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { authTables } from '@convex-dev/auth/server';

export default defineSchema({
  ...authTables,
  // The 'messages' table will store our guestbook entries.
  messages: defineTable({
    author: v.string(), // The name of the user who wrote the message
    body: v.string(), // The content of the message
    authorId: v.string(), // The Clerk user ID for associating messages with users
  }).index('by_authorId', ['authorId']), // Index for querying messages by user
});
