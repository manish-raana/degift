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
