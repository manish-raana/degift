import { useState } from 'react';
import { DeGift_ABI } from '@/abi/DeGiftContract';
import { useContractWrite } from 'wagmi';

export function useGiftActions() {
  const [error, setError] = useState<string>();

  const { writeAsync: redeem, isLoading: isRedeeming } = useContractWrite({
    address: process.env.NEXT_PUBLIC_DEGIFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: DeGift_ABI,
    functionName: 'redeemGift',
  });

  const { writeAsync: refund, isLoading: isRefunding } = useContractWrite({
    address: process.env.NEXT_PUBLIC_DEGIFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: DeGift_ABI,
    functionName: 'refundGift',
  });

  const redeemGift = async (giftId: string) => {
    try {
      setError(undefined);
      await redeem({ args: [BigInt(giftId)] });
    } catch (err) {
      setError('Failed to redeem gift');
      console.error(err);
    }
  };

  const refundGift = async (giftId: string) => {
    try {
      setError(undefined);
      await refund({ args: [BigInt(giftId)] });
    } catch (err) {
      setError('Failed to refund gift');
      console.error(err);
    }
  };

  return {
    redeemGift,
    refundGift,
    isLoading: isRedeeming || isRefunding,
    error,
  };
}
