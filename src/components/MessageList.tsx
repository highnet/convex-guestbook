interface Message {
  _id: string;
  body: string;
  author: string;
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message._id} className="p-4 bg-gray-800 rounded-lg shadow-md">
          <p className="text-lg">{message.body}</p>
          <p className="text-sm text-gray-500 mt-2">- {message.author}</p>
        </div>
      ))}
    </div>
  );
}
