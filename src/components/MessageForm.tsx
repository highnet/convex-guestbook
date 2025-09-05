import { FormEvent } from 'react';

interface MessageFormProps {
  newMessageText: string;
  setNewMessageText: (text: string) => void;
  onSubmit: (event: FormEvent) => void;
}

export default function MessageForm({
  newMessageText,
  setNewMessageText,
  onSubmit,
}: MessageFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-4 mb-8">
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
  );
}
