
import { useAccount } from 'wagmi';
import { LifecycleStatus, Transaction, TransactionButton, TransactionSponsor, TransactionStatus, TransactionStatusAction, TransactionStatusLabel } from '@coinbase/onchainkit/transaction';
import { WalletDefault } from '@coinbase/onchainkit/wallet';
import { baseSepolia } from 'viem/chains';
import { useCallback } from 'react';

export default function TransactionDemo() {
  const { address } = useAccount();
  
  const clickContractAddress = '0x67c97D1FB8184F038592b2109F854dfb09C77C75';
    const clickContractAbi = [
    {
        type: 'function',
        name: 'click',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    ] as const;
    
    const calls = [
    {   to:clickContractAddress as `0x${string}`,
        address: clickContractAddress,
        abi: clickContractAbi,
        functionName: 'click',
        args: [],
    }
    ];
    const handleOnStatus = useCallback((status: LifecycleStatus) => {
        console.log('LifecycleStatus', status);
      }, []);
  return (
    <>
      {address ? (
        <Transaction
        chainId={baseSepolia.id}
        calls={calls}
        onStatus={handleOnStatus}
      >
        <TransactionButton />
        <TransactionSponsor />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>  
      ) : (
        <WalletDefault />
      )}
    </>
  );
}
