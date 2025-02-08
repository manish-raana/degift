'use client';

import { AlertCircle, CheckCircle, Clock, Gift } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { formatEther } from 'ethers';
import GiftTransactions from './GiftTransaction';

interface GiftCard {
  id: string;
  amount: bigint;
  tokenAddress: string;
  sender: string;
  recipient: string;
  createdAt: string;
  metadataURI: string;
  redeemed: boolean;
  redeemedAt: string | null;
  refundedAt: string | null;
  expiration: string;
}

export default function GiftCardComponent({
  gift,
  type,
}: {
  gift: GiftCard;
  type: 'sent' | 'received';
}) {
  const [open, setOpen] = useState(false);

  const isExpired = new Date(Number(gift.expiration) * 1000) < new Date();
  const canRedeem = type === 'received' && !gift.redeemed && !isExpired;
  const canRefund = type === 'sent' && !gift.redeemed && !isExpired;

  console.log('gift: ', gift);
  const getStatusColor = () => {
    if (gift.redeemedAt) return 'text-green-500';
    if (gift.refundedAt) return 'text-gray-500';
    if (isExpired) return 'text-red-500';
    return 'text-yellow-500';
  };

  const getStatus = () => {
    if (gift.redeemedAt) return 'Redeemed';
    if (gift.refundedAt) return 'Refunded';
    if (isExpired) return 'Expired';
    return 'Pending';
  };

  const getStatusIcon = () => {
    if (gift.redeemedAt) return <CheckCircle className="h-4 w-4" />;
    if (gift.refundedAt) return <AlertCircle className="h-4 w-4" />;
    if (isExpired) return <AlertCircle className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  return (
    <>
      <Card
        className="cursor-pointer transition-all duration-200 hover:shadow-md"
        onClick={() => setOpen(true)}
      >
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Gift className="h-6 w-6 text-primary" />
            </div>
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
            <div className={cn('flex items-center gap-1', getStatusColor())}>
              {getStatusIcon()}
              <p className="text-sm font-medium">{getStatus()}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              {new Date(Number(gift.createdAt) * 1000).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Gift Details</DialogTitle>
            <DialogDescription>
              View and manage your crypto gift
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="font-medium">
                    {formatEther(gift.amount.toString())} ETH
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    {type === 'sent' ? 'Recipient' : 'Sender'}
                  </span>
                  <span className="font-medium">
                    {type === 'sent' ? gift.recipient : gift.sender}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className={cn('font-medium', getStatusColor())}>
                    {getStatus()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="font-medium">
                    {new Date(
                      Number(gift.createdAt) * 1000,
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expires</span>
                  <span className="font-medium">
                    {new Date(
                      Number(gift.expiration) * 1000,
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <GiftTransactions
              giftId={gift.id}
              canRedeem={canRedeem}
              canRefund={canRefund}
              onTransactionSuccess={() => setOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
