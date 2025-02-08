import { GiftTheme } from '@/lib/themes';

export interface GiftDetails {
  amount: string;
  currency: string;
  occasion: string;
  selectedTheme: GiftTheme | null;
}

export interface GiftMessage {
  message: string;
  messageScore: number;
}

export interface GiftCard {
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

export interface UserGiftsResponse {
  sentGifts: GiftCard[];
  receivedGifts: GiftCard[];
}
