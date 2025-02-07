import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Gift } from 'lucide-react';
import { GiftTheme } from '@/lib/themes';
import { cn } from '@/lib/utils';

interface GiftPreviewProps {
  amount: string;
  currency: string;
  message: string;
  theme: GiftTheme | null;
  onCreateCard: () => void;
}

export default function GiftPreview({
  amount,
  currency,
  message,
  theme,
  onCreateCard,
}: GiftPreviewProps) {
  if (!theme) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <Card className={cn('overflow-hidden border-2', theme.borderColor)}>
        <CardContent className="p-6">
          <div
            style={{
              background: theme.background,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            className={cn(
              'relative rounded-lg border p-6',
              theme.borderColor,
              'before:absolute before:inset-0 before:rounded-lg before:bg-black/20',
            )}
          >
            <div
              className={cn(
                'relative z-10 space-y-6',
                theme.textColor,
                'drop-shadow-md',
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">{theme.icon}</span>
                <span className="font-semibold">Crypto Gift Card</span>
              </div>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-sm opacity-80">Amount</div>
                  <div className="text-3xl font-bold">
                    {amount} {currency.toUpperCase()}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-center text-sm opacity-80">Message</div>
                  <div className="text-center text-lg leading-relaxed">
                    {message}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button className="mt-6 w-full" size="lg" onClick={onCreateCard}>
        <Gift className="mr-2 h-5 w-5" />
        Create Gift Card
      </Button>
    </div>
  );
}
