// convex/messages.ts
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// Query to get all messages, ordered by creation time.
// This is a reactive function. The frontend will automatically update
// when the result of this query changes.
export const list = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query('messages').order('desc').collect();
    return messages;
  },
});

// Mutation to send a new message.
export const send = mutation({
  args: {
    body: v.string(),
  },
  handler: async (ctx, args) => {
    console.log('Send message mutation called');
    console.log(
      'Environment CLERK_JWT_ISSUER_DOMAIN:',
      process.env.CLERK_JWT_ISSUER_DOMAIN
    );

    // We need to get the user's identity to associate the message with them.
    const identity = await ctx.auth.getUserIdentity();
    console.log('Identity from ctx.auth.getUserIdentity():', identity);

    if (!identity) {
      console.log('No identity found, throwing error');
      throw new Error('You must be logged in to send a message.');
    }

    // The 'name' from the JWT token is often the user's name or email.
    const user = identity.name ?? 'Anonymous';
    const userId = identity.subject; // This is the Clerk User ID

    console.log('User authenticated successfully:', { user, userId });

    // Insert the new message into the database.
    await ctx.db.insert('messages', {
      body: args.body,
      author: user,
      authorId: userId,
    });
  },
});
