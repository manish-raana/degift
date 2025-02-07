import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeCard } from '@/components/ThemeCard';
import { Palette, ArrowRight } from 'lucide-react';
import { GiftTheme } from '@/lib/themes';
import { cn } from '@/lib/utils';

interface GiftDetailsProps {
  amount: string;
  setAmount: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
  occasion: string;
  setOccasion: (value: string) => void;
  selectedTheme: GiftTheme | null;
  setSelectedTheme: (theme: GiftTheme) => void;
  availableThemes: GiftTheme[];
  onPreview: (value: boolean) => void;
  onNext: () => void;
  isValid: boolean;
  isAmountTouched: boolean;
  setIsAmountTouched: (value: boolean) => void;
  setPreviewTheme: (value: GiftTheme) => void;
  setShowPreview: (value: boolean) => void;
}

export default function GiftDetails({
  amount,
  setAmount,
  currency,
  setCurrency,
  occasion,
  setOccasion,
  selectedTheme,
  setSelectedTheme,
  availableThemes,
  setPreviewTheme,
  setShowPreview,
  onNext,
  isValid,
  isAmountTouched,
}: GiftDetailsProps) {
  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <div className="flex gap-2">
          <Input
            id="amount"
            placeholder="0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            type="number"
            step="0.01"
            min="0"
            className={cn(
              'text-lg',
              isAmountTouched && !isValid && 'border-destructive',
              isValid && 'border-primary',
            )}
          />
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            className="w-32 rounded-md border bg-background px-3"
          >
            <option value="eth">ETH</option>
            <option value="usdc">USDC</option>
            <option value="usdt">USDT</option>
          </select>
        </div>
        {isAmountTouched && !isValid && (
          <p className="mt-1 text-sm text-destructive">
            Please enter a valid amount
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="occasion">Occasion</Label>
        <select
          id="occasion"
          value={occasion}
          onChange={e => setOccasion(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2"
        >
          <option value="birthday">🎂 Birthday</option>
          <option value="valentine">❤️ Valentine&apos;s Day</option>
          <option value="christmas">🎄 Christmas</option>
          <option value="graduation">🎓 Graduation</option>
          <option value="wedding">💒 Wedding</option>
          <option value="other">🎁 Other</option>
        </select>
      </div>

      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-base font-medium text-muted-foreground">
          <Palette className="h-4 w-4" />
          Choose Your Perfect Theme
        </Label>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {availableThemes.map(theme => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              isSelected={selectedTheme?.id === theme.id}
              onSelect={setSelectedTheme}
              onPreview={theme => {
                setPreviewTheme(theme); // Set the theme to preview
                setShowPreview(true);
              }}
            />
          ))}
        </div>
      </div>

      <Button
        className={cn('mt-4 w-full', isValid && 'animate-pulse')}
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
