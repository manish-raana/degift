'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Gift,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { formatEther } from 'ethers';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DeGift_ABI } from '@/abi/DeGiftContract';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction,
} from '@coinbase/onchainkit/transaction';
import { baseSepolia } from 'viem/chains';
import { GiftCard as GiftCardType } from '@/types/gift';

interface GiftCardProps {
  gift: GiftCardType;
  type: 'sent' | 'received';
  onSuccess?: () => void;
}

export function GiftCardDetails({ gift, type }: GiftCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const isExpired = new Date(Number(gift.expiration) * 1000) < new Date();
  const canRedeem = type === 'received' && !gift.redeemed && !isExpired;
  const canRefund = type === 'sent' && !gift.redeemed && !isExpired;

  const getRedeemCalls = async () => {
    const degiftContractAddress =
      process.env.NEXT_PUBLIC_DEGIFT_CONTRACT_ADDRESS!;

    return [
      {
        address: degiftContractAddress as `0x${string}`,
        abi: DeGift_ABI,
        functionName: 'redeemGift',
        args: [BigInt(gift.id)],
      },
    ];
  };
  const getRefundCalls = async () => {
    const degiftContractAddress =
      process.env.NEXT_PUBLIC_DEGIFT_CONTRACT_ADDRESS!;

    return Promise.resolve([
      {
        address: degiftContractAddress as `0x${string}`,
        abi: DeGift_ABI,
        functionName: 'refundGift',
        args: [BigInt(gift.id)],
      },
    ]);
  };

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
        onClick={() => setShowDetails(true)}
      >
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

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[425px]">
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
                  <span className="text-sm text-muted-foreground">Expires</span>
                  <span className="font-medium">
                    {new Date(
                      Number(gift.expiration) * 1000,
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {canRedeem && (
                <Transaction chainId={baseSepolia.id} calls={getRedeemCalls}>
                  <TransactionButton
                    text="Redeem Gift"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  />
                  <TransactionStatus>
                    <TransactionStatusLabel />
                    <TransactionStatusAction />
                  </TransactionStatus>
                </Transaction>
              )}
              {canRefund && (
                <Transaction chainId={baseSepolia.id} calls={getRefundCalls}>
                  <TransactionButton
                    text="Refund Gift"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  />
                  <TransactionStatus>
                    <TransactionStatusLabel />
                    <TransactionStatusAction />
                  </TransactionStatus>
                </Transaction>
              )}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(`/gift/${gift.id}`, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Gift
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
