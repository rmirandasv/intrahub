import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Send } from 'lucide-react';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function CommentForm({ onSubmit, isLoading = false, placeholder = "Write your comment..." }: CommentFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim());
      setContent('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Add comment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder={placeholder}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none"
            disabled={isLoading}
          />
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={!content.trim() || isLoading}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              {isLoading ? 'Sending...' : 'Send comment'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 