/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeCard } from '@/components/ThemeCard';
import { Palette, ArrowRight, Loader2 } from 'lucide-react';
import { GiftTheme } from '@/lib/themes';
import { validateAddressOrENS } from '@/lib/validate';
import debounce from 'lodash/debounce';
import { cn } from '@/lib/utils';

export interface GiftDetailsProps {
  // Amount related props
  amount: string;
  setAmount: (value: string) => void;
  isAmountTouched: boolean;
  setIsAmountTouched: (value: boolean) => void;

  // Currency related props
  currency: string;
  setCurrency: (value: string) => void;

  // Occasion related props
  occasion: string;
  setOccasion: (value: string) => void;

  // Theme related props
  selectedTheme: GiftTheme | null;
  setSelectedTheme: (theme: GiftTheme) => void;
  availableThemes: GiftTheme[];
  setPreviewTheme: (theme: GiftTheme) => void;
  setShowPreview: (value: boolean) => void;

  // Recipient related props
  recipient: string;
  setRecipient: (value: string) => void;
  recipientAddress: string | null;
  setRecipientAddress: (value: string | null) => void;
  isRecipientTouched: boolean;
  setIsRecipientTouched: (value: boolean) => void;
  isRecipientValid: boolean;
  recipientError?: string;
  setRecipientError: (error?: string) => void;

  // Form validation and navigation
  isValid: boolean;
  onNext: () => void;
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
  recipient,
  setRecipient,
  recipientAddress,
  setRecipientAddress,
  isRecipientTouched,
  setIsRecipientTouched,
  isRecipientValid,
  recipientError,
  setRecipientError,
}: GiftDetailsProps) {
  const [validating, setValidating] = useState(false);

  // Debounced validation function
  const debouncedValidation = useCallback(
    debounce(async (value: string) => {
      if (!value) {
        setRecipientAddress(null);
        setRecipientError('Address is required');
        setValidating(false);
        return;
      }

      try {
        const result = await validateAddressOrENS(value);
        setRecipientAddress(result.address);
        setRecipientError(result.error);
      } catch (error: any) {
        setRecipientAddress(null);
        setRecipientError('Error validating address');
        console.log('err: ', error);
      } finally {
        setValidating(false);
      }
    }, 500),
    [],
  );

  const handleRecipientChange = (value: string) => {
    setRecipient(value);
    setIsRecipientTouched(true);
    setValidating(true);
    debouncedValidation(value);
  };

  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      {/* Amount Input */}
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

      {/* Recipient Input */}
      <div className="space-y-2">
        <Label htmlFor="recipient">Recipient</Label>
        <div className="relative">
          <Input
            id="recipient"
            placeholder="0x... or ENS name (e.g., vitalik.eth)"
            value={recipient}
            onChange={e => handleRecipientChange(e.target.value)}
            className={cn(
              'pr-10 text-lg',
              isRecipientTouched && !isRecipientValid && 'border-destructive',
              isRecipientValid && 'border-primary',
            )}
          />
          {validating && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
        {isRecipientTouched && !isRecipientValid && recipientError && (
          <p className="mt-1 text-sm text-destructive">{recipientError}</p>
        )}
        {recipientAddress && (
          <p className="mt-1 text-sm text-muted-foreground">
            Resolved address: {recipientAddress}
          </p>
        )}
      </div>

      {/* Occasion Select */}
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

      {/* Theme Selection */}
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
                setPreviewTheme(theme);
                setShowPreview(true);
              }}
            />
          ))}
        </div>
      </div>

      <Button
        className={cn(
          'mt-4 w-full',
          isValid && isRecipientValid && 'animate-pulse',
        )}
        size="lg"
        onClick={onNext}
        disabled={!isValid || !isRecipientValid || validating}
      >
        Next
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}