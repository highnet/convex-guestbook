import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';

interface Message {
  _id: string;
  body: string;
  author: string;
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground text-lg">No messages yet</p>
          <p className="text-muted-foreground text-sm mt-2">
            Be the first to leave a message!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Messages</h2>
        <Badge variant="secondary">
          {messages.length}
        </Badge>
      </div>

      {messages.map((message) => (
        <Card
          key={message._id}
          className="hover:bg-accent/50 transition-colors"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-sm">
                  {message.author.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {message.author}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="leading-relaxed">{message.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
