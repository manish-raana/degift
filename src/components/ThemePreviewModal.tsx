import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { GiftTheme } from '@/lib/themes';

interface ThemePreviewModalProps {
  theme: GiftTheme;
  onClose: () => void;
}

export function ThemePreviewModal({ theme, onClose }: ThemePreviewModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-background p-6">
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
                  <span className="font-semibold">Preview Gift Card</span>
                </div>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-sm opacity-80">Amount</div>
                    <div className="text-3xl font-bold">0.1 ETH</div>
                  </div>
                  <div>
                    <div className="text-center text-sm opacity-80">
                      Message
                    </div>
                    <div className="text-center text-lg leading-relaxed">
                      Sample gift message...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button className="mt-4 w-full" onClick={onClose}>
          Close Preview
        </Button>
      </div>
    </div>
  );
}
