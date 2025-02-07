'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { MagicCard } from '@/components/magic-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Send, Download } from 'lucide-react';
import { graphqlClient } from '@/lib/graphql';
import { GET_USER_GIFTS } from '@/lib/queries';
import { UserGiftsResponse, GiftCard } from '@/types/gift';
import { formatEther } from 'ethers';
import { formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const [gifts, setGifts] = useState<UserGiftsResponse>({
    sentGifts: [],
    receivedGifts: [],
  });

  useEffect(() => {
    const fetchGifts = async () => {
      if (!address) return;

      try {
        setLoading(true);
        const data = await graphqlClient.request<UserGiftsResponse>(
          GET_USER_GIFTS,
          {
            address: address.toLowerCase(),
          },
        );
        setGifts(data);
      } catch (error) {
        console.error('Error fetching gifts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGifts();
  }, [address]);

  const getGiftStatus = (gift: GiftCard) => {
    if (gift.refundedAt) return 'refunded';
    if (gift.redeemedAt) return 'claimed';
    if (gift.redeemed) return 'redeemed';
    return 'pending';
  };

  const renderGiftCard = (gift: GiftCard, type: 'sent' | 'received') => (
    <MagicCard key={gift.id} className="cursor-pointer">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <Gift className="h-8 w-8 text-muted-foreground" />
          <div>
            <p className="font-semibold">
              {formatEther(gift.amount.toString())} ETH
            </p>
            <p className="text-sm text-muted-foreground">
              {type === 'sent' ? 'To: ' : 'From: '}
              {type === 'sent' ? gift.recipient : gift.sender}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium capitalize">
            {getGiftStatus(gift)}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatDate(Number(gift.createdAt))}
          </p>
        </div>
      </CardContent>
    </MagicCard>
  );

  const renderSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <Card key={i}>
          <CardContent className="flex items-center justify-between p-6">
            <Skeleton className="h-16 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container flex justify-center py-8">
      <div className="max-w-8xl w-full">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Gift Dashboard</CardTitle>
            <CardDescription>
              Manage your sent and received crypto gifts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sent" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sent">
                  <Send className="mr-2 h-4 w-4" />
                  Sent ({gifts.sentGifts.length})
                </TabsTrigger>
                <TabsTrigger value="received">
                  <Download className="mr-2 h-4 w-4" />
                  Received ({gifts.receivedGifts.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sent">
                {loading ? (
                  renderSkeleton()
                ) : (
                  <div className="space-y-4">
                    {gifts.sentGifts.map(gift => renderGiftCard(gift, 'sent'))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="received">
                {loading ? (
                  renderSkeleton()
                ) : (
                  <div className="space-y-4">
                    {gifts.receivedGifts.map(gift =>
                      renderGiftCard(gift, 'received'),
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
