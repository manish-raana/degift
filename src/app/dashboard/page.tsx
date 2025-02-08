'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { graphqlClient } from '@/lib/graphql';
import { GET_USER_GIFTS } from '@/lib/queries';
import { Download, Send } from 'lucide-react';
import GiftCardComponent from '@/components/dashboard/GiftCard';
import { UserGiftsResponse } from '@/types/gift';

export default function Dashboard() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const [gifts, setGifts] = useState<UserGiftsResponse>({
    sentGifts: [],
    receivedGifts: [],
  });

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

  useEffect(() => {
    fetchGifts();
  }, [address]);

  useEffect(() => {
    const handleTransactionSuccess = () => {
      fetchGifts();
    };

    window.addEventListener('transaction-success', handleTransactionSuccess);
    return () => {
      window.removeEventListener(
        'transaction-success',
        handleTransactionSuccess,
      );
    };
  }, []);

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
          <CardContent className="p-6">
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
                ) : gifts.sentGifts.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    No sent gifts yet
                  </div>
                ) : (
                  <div className="space-y-4">
                    {gifts.sentGifts.map(gift => (
                      <GiftCardComponent
                        key={gift.id}
                        gift={gift}
                        type="sent"
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="received">
                {loading ? (
                  renderSkeleton()
                ) : gifts.receivedGifts.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    No received gifts yet
                  </div>
                ) : (
                  <div className="space-y-4">
                    {gifts.receivedGifts.map(gift => (
                      <GiftCardComponent
                        key={gift.id}
                        gift={gift}
                        type="received"
                      />
                    ))}
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
