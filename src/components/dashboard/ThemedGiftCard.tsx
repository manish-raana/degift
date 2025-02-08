'use client';

import { GiftTheme, defaultTheme } from '@/lib/themes';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { formatEther } from 'ethers';
import { useState, useEffect } from 'react';
import { ScratchToReveal } from '@/components/magicui/scratch-to-reveal';

interface ThemedGiftCardProps {
  amount: string;
  sender: string;
  message: string;
  theme: GiftTheme;
  showScratch?: boolean;
}

export function ThemedGiftCard({
  amount,
  sender,
  message,
  theme = defaultTheme,
  showScratch = false,
}: ThemedGiftCardProps) {
  const [revealed, setRevealed] = useState(!showScratch);

  const GiftContent = () => (
    <CardContent className={cn('space-y-4 p-6 text-center', theme.textColor)}>
      <div className="text-3xl font-bold">{amount} ETH</div>
      <div className="space-y-2">
        <p className="text-sm opacity-80">From</p>
        <p className="font-medium">{sender}</p>
      </div>
      <div className="space-y-2">
        <p className="text-sm opacity-80">Message</p>
        <p className="text-lg">{message}</p>
      </div>
      <div className="text-2xl">{theme.icon}</div>
    </CardContent>
  );

  return showScratch ? (
    <div className="relative h-[400px] w-full">
      <ScratchToReveal
        width={400}
        height={400}
        minScratchPercentage={70}
        className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl"
        gradientColors={['#A97CF8', '#F38CB8', '#FDCC92']}
      >
        <Card
          className={cn(
            'w-full transition-all duration-500',
            theme.background,
            theme.borderColor,
            'border-2',
          )}
        >
          <GiftContent />
        </Card>
      </ScratchToReveal>
    </div>
  ) : (
    <Card
      className={cn(
        'w-full transition-all duration-500',
        theme.background,
        theme.borderColor,
        'border-2',
      )}
    >
      <GiftContent />
    </Card>
  );
}
