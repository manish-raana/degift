import { useAccount } from 'wagmi';
import {
  LifecycleStatus,
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import { WalletDefault } from '@coinbase/onchainkit/wallet';
import { baseSepolia } from 'viem/chains';
import { useCallback } from 'react';
import confetti from 'canvas-confetti';

export default function TransactionDemo({
  callsCallback,
}: {
  callsCallback: any;
}) {
  const { address } = useAccount();

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log('LifecycleStatus', status);
    if (status.statusName === 'success') {
      handleSuccess();
    }
  }, []);

  const handleSuccess = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };
  return (
    <div className="relative mt-5">
      {address ? (
        <Transaction
          chainId={baseSepolia.id}
          calls={callsCallback}
          onStatus={handleOnStatus}
        >
          <TransactionButton
            text=" Create Gift Card"
            className="mt-5 cursor-pointer border-2 bg-transparent hover:bg-gray-200"
          />
          <TransactionSponsor />
          <TransactionStatus>
            <TransactionStatusLabel />
            <TransactionStatusAction />
          </TransactionStatus>
        </Transaction>
      ) : (
        <WalletDefault />
      )}
    </div>
  );
}
