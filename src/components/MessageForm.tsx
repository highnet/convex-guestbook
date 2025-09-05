import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Send } from 'lucide-react';

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
    <Card className="mb-8">
      <CardContent className="p-6">
        <form onSubmit={onSubmit} className="flex gap-4">
          <Textarea
            value={newMessageText}
            onChange={(event) => setNewMessageText(event.target.value)}
            className="flex-grow resize-none"
            placeholder="Write your message..."
            rows={3}
          />
          <Button
            type="submit"
            disabled={!newMessageText.trim()}
            size="lg"
            className="px-6"
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
