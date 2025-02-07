import { getAddress } from '@coinbase/onchainkit/identity';
import { isAddress } from 'viem';

export async function validateAddressOrENS(value: string): Promise<{
  isValid: boolean;
  address: string | null;
  error?: string;
}> {
  if (!value)
    return { isValid: false, address: null, error: 'Address is required' };

  // Check if it's a valid Ethereum address
  if (isAddress(value)) {
    return { isValid: true, address: value };
  }

  // Check if it's an ENS name
  if (value.endsWith('.eth')) {
    try {
      const resolvedAddress = await getAddress({ name: value });

      if (resolvedAddress && isAddress(resolvedAddress)) {
        return { isValid: true, address: resolvedAddress };
      }
      return {
        isValid: false,
        address: null,
        error: 'Could not resolve ENS name',
      };
    } catch (error: any) {
      return { isValid: false, address: null, error: 'Invalid ENS name' };
    }
  }

  return {
    isValid: false,
    address: null,
    error: 'Invalid address or ENS name',
  };
}
