import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2, ArrowRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GiftMessageProps {
  message: string;
  setMessage: (value: string) => void;
  generating: boolean;
  messageScore: number;
  onGenerate: () => void;
  onNext: () => void;
  isValid: boolean;
  isMessageTouched: boolean;
  setIsMessageTouched: (value: boolean) => void;
}

export default function GiftMessage({
  message,
  setMessage,
  generating,
  messageScore,
  onGenerate,
  onNext,
  isValid,
  isMessageTouched,
}: GiftMessageProps) {
  const getMessageFeedback = () => {
    if (!message) return null;
    if (message.length < 10) return 'Keep going! Add more personal touch';
    if (message.length < 50) return 'Good! Your message is clear and concise';
    return 'Excellent! Your message is thoughtful and personal';
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex justify-center">
        <Button
          onClick={onGenerate}
          disabled={generating}
          size="lg"
          className="w-full sm:w-auto"
        >
          {generating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {generating ? 'Generating...' : 'Generate AI Message'}
        </Button>
      </div>

      {messageScore > 0 && (
        <div className="flex items-center justify-center gap-2">
          <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
          <span className="text-sm font-medium">
            AI Message Quality Score: {messageScore}%
          </span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Enter your message or generate one with AI"
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={4}
          className={cn(
            'resize-none text-lg',
            isMessageTouched && !isValid && 'border-destructive',
            isValid && 'border-primary',
          )}
        />
        <div className="flex items-center justify-between">
          <p
            className={cn(
              'text-sm',
              message
                ? isValid
                  ? 'text-primary'
                  : 'text-destructive'
                : 'text-muted-foreground',
            )}
          >
            {getMessageFeedback()}
          </p>
          <p className="text-sm text-muted-foreground">
            {message.length} characters
          </p>
        </div>
      </div>

      <Button
        className={cn('w-full', isValid && 'animate-pulse')}
        size="lg"
        onClick={onNext}
        disabled={!isValid}
      >
        Next
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
