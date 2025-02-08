'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GET_GIFT_DETAILS, GET_USER_GIFTS } from '@/lib/queries';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GiftTheme, defaultTheme } from '@/lib/themes';

import { formatEther } from 'ethers';

import { Skeleton } from '@/components/ui/skeleton';
import { useAccount } from 'wagmi';
import { graphqlClient } from '@/lib/graphql';

interface GiftMetadata {
  giftId: string;
  message: string;
  occasion: string;
  theme: GiftTheme;
  amount: string;
  sender: string;
  recipient: string;
}

export default function GiftPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState<GiftMetadata | null>(null);
  const [giftData, setGiftData] = useState<any | null>(null);
  const [theme, setTheme] = useState<GiftTheme>(defaultTheme);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  const fetchGiftMetadata = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/pinata/?cid=${(await params)?.id}`);
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch gift metadata');
      }
      const content = data.data.data.content;
      fetchGifts();
      console.log('content: ', content);
      setMetadata(content);
      setTheme(content.theme);
    } catch (error) {
      console.error('Error fetching gift metadata:', error);
      setError('Failed to load gift details');
    } finally {
      //setLoading(false);
    }
  };
  const fetchGifts = async () => {
    if (!address) return;
    try {
      setLoading(true);
      const data = await graphqlClient.request<any>(GET_GIFT_DETAILS, {
        cid: (await params)?.id,
      });
      console.log('gift-data: ', data.gift[0]);
      setGiftData(data.gift[0]);
    } catch (error) {
      console.error('Error fetching gifts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGiftMetadata();
  }, [params]);

  const getStatusDetails = () => {
    if (giftData?.redeemedAt) {
      return {
        icon: <CheckCircle className="h-6 w-6 text-green-500" />,
        title: 'Gift Redeemed',
        description: `This gift was redeemed on ${new Date(
          Number(giftData.redeemedAt) * 1000,
        ).toLocaleDateString()}`,
        color: 'text-green-500',
      };
    }
    if (giftData?.refundedAt) {
      return {
        icon: <AlertCircle className="h-6 w-6 text-gray-500" />,
        title: 'Gift Refunded',
        description: `This gift was refunded on ${new Date(
          Number(giftData.refundedAt) * 1000,
        ).toLocaleDateString()}`,
        color: 'text-gray-500',
      };
    }

    return {
      icon: <Clock className="h-6 w-6 text-yellow-500" />,
      title: 'Gift Available',
      description: 'This gift is available to be redeemed',
      color: 'text-yellow-500',
    };
  };

  if (loading) {
    return (
      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Skeleton className="mx-auto h-8 w-48" />
            <Skeleton className="mx-auto mt-2 h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!loading && (error || !metadata || !giftData)) {
    return (
      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Error Loading Gift</CardTitle>
            <CardDescription>
              {error || "This gift doesn't exist or has been removed."}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const status = getStatusDetails();

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-8">
      <Card
        style={{
          background: theme.background,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          border: theme.borderColor,
          color: theme.textColor,
        }}
        className={cn(
          'w-full max-w-md transition-all duration-500',
          'border-2',
        )}
      >
        <CardHeader className={cn('text-center', theme.textColor)}>
          <div className="mb-4 flex items-center justify-center gap-2">
            {status.icon}
            <CardTitle>{status.title}</CardTitle>
          </div>
          <CardDescription className={cn('text-white')}>
            {status.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={cn(
              'rounded-lg border p-6',
              theme.borderColor,
              'bg-black/10',
            )}
          >
            <div
              className={cn(
                'mb-4 flex items-center justify-center gap-2',
                theme.textColor,
              )}
            >
              <span className="text-2xl">{theme.icon}</span>
              <span className="font-semibold">{metadata?.occasion}</span>
            </div>
            <div className={cn('space-y-4', theme.textColor)}>
              <div className="text-center">
                <div className="text-sm opacity-80">Amount</div>
                <div className="text-3xl font-bold">
                  {formatEther(giftData.amount)} ETH
                </div>
              </div>
              <div>
                <div className="text-center text-sm opacity-80">From</div>
                <div className="text-center text-sm">{metadata?.sender}</div>
              </div>
              <div>
                <div className="text-center text-sm opacity-80">To</div>
                <div className="text-center text-sm">{metadata?.recipient}</div>
              </div>
              <div>
                <div className="text-center text-sm opacity-80">Message</div>
                <div className="text-center text-lg leading-relaxed">
                  {metadata?.message}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
