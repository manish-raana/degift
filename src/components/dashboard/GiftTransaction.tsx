'use client';

import { DeGift_ABI } from '@/abi/DeGiftContract';
import { ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import { baseSepolia } from 'viem/chains';

interface GiftTransactionsProps {
  giftId: string;
  cid: string;
  redeemed: boolean;
  canRedeem: boolean;
  canRefund: boolean;
  onTransactionSuccess: () => void;
}

export default function GiftTransactions({
  giftId,
  cid,
  redeemed,
  canRedeem,
  canRefund,
  onTransactionSuccess,
}: GiftTransactionsProps) {
  const getRedeemCalls = async (): Promise<any[]> => {
    const degiftContractAddress =
      process.env.NEXT_PUBLIC_DEGIFT_CONTRACT_ADDRESS!;
    return [
      {
        address: degiftContractAddress as `0x${string}`,
        abi: DeGift_ABI,
        functionName: 'redeemGift',
        args: [BigInt(giftId)],
      },
    ];
  };

  const getRefundCalls = async (): Promise<any[]> => {
    const degiftContractAddress =
      process.env.NEXT_PUBLIC_DEGIFT_CONTRACT_ADDRESS!;
    return [
      {
        address: degiftContractAddress as `0x${string}`,
        abi: DeGift_ABI,
        functionName: 'refundGift',
        args: [BigInt(giftId)],
      },
    ];
  };

  const handleTransactionStatus = (status: { statusName: string }) => {
    console.log('Transaction status:', status);
    if (status.statusName === 'success') {
      onTransactionSuccess();
      window.dispatchEvent(new Event('transaction-success'));
    }
  };

  return (
    <div className="flex gap-2">
      {canRedeem && (
        <Transaction
          chainId={baseSepolia.id}
          calls={getRedeemCalls}
          onStatus={handleTransactionStatus}
        >
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
        <Transaction
          chainId={baseSepolia.id}
          calls={getRefundCalls}
          onStatus={handleTransactionStatus}
        >
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
        className="h-12 w-full rounded-xl"
        onClick={() => window.open(`/gift/${cid}`, '_blank')}
        disabled={!redeemed}
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        {!redeemed ? 'Redeem first to view this card' : 'View Gift'}
      </Button>
    </div>
  );
}
