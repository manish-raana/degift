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
  sender: string;
  recipient: string;
  amount: string;
  tokenAddress: string;
  status: string;
  createdAt: string;
  redeemed: boolean;
  redeemedAt: string | null;
  refundedAt: string | null;
  metadataURI: string;
}

export interface UserGiftsResponse {
  sentGifts: GiftCard[];
  receivedGifts: GiftCard[];
}
