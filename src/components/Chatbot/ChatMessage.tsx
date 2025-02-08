import { cn } from '@/lib/utils';
import { Bot, User, Gift } from 'lucide-react';
import { formatEther } from 'ethers';

interface GiftCard {
  id: string;
  amount: string;
  tokenAddress: string;
  sender: string;
  status: string;
  createdAt: string;
  redeemed: boolean;
  redeemedAt?: string;
  metadataURI: string;
  expiration: string;
  recipient: string;
}

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
    data?: {
      balance?: string;
      receivedGifts?: GiftCard[];
      sentGifts?: GiftCard[];
    };
    suggestions?: string[];
  };
  onSuggestionClick?: (suggestion: string) => void;
}

export function ChatMessage({ message, onSuggestionClick }: ChatMessageProps) {
  const isUser = message.role === 'user';

  const formatDate = (timestamp: string) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  const formatAddress = (address: string | null | undefined) => {
    //console.log('address: ', address)
    if (!address) return 'Unknown';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  const formatAmount = (amount: string | number): string => {
    try {
      // If the amount is a very large number (in Wei)
      if (amount.toString().length > 10) {
        return `${Number(formatEther(amount.toString())).toFixed(4)} ETH`;
      }
      // If the amount is already in ETH
      return `${Number(amount).toFixed(4)} ETH`;
    } catch (error) {
      console.error('Error formatting amount:', error);
      return '0 ETH';
    }
  };
  const renderGiftCards = (gifts: GiftCard[]) => {
    return gifts.map(gift => (
      <div
        key={gift.id}
        className="mb-2 rounded-lg border bg-background p-3 text-xs shadow-sm"
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            <span className="font-medium">Gift #{gift.id}</span>
          </div>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-xs',
              gift.status === 'REDEEMED'
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
            )}
          >
            {gift.status}
          </span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount:</span>
            <span className="font-medium">{formatAmount(gift.amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">From:</span>
            <span className="font-medium">{formatAddress(gift?.sender)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">To:</span>
            <span className="font-medium">
              {formatAddress(gift?.recipient)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Created:</span>
            <span>{gift.createdAt ? formatDate(gift.createdAt) : 'N/A'}</span>
          </div>
          {gift.redeemedAt && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Redeemed:</span>
              <span>{formatDate(gift.redeemedAt)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Expires:</span>
            <span>{gift.expiration ? formatDate(gift.expiration) : 'N/A'}</span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div
      className={cn(
        'flex gap-3 text-sm',
        isUser ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted',
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className="flex max-w-[85%] flex-col gap-2">
        <div
          className={cn(
            'rounded-lg px-3 py-2',
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground',
          )}
        >
          {message.content}
        </div>

        {/* Render gift cards if available */}
        {message.data?.receivedGifts &&
          message.data.receivedGifts.length > 0 && (
            <div className="mt-2 space-y-2">
              <div className="text-xs font-medium text-muted-foreground">
                Received Gifts
              </div>
              {renderGiftCards(message.data.receivedGifts)}
            </div>
          )}

        {message.data?.sentGifts && message.data.sentGifts.length > 0 && (
          <div className="mt-2 space-y-2">
            <div className="text-xs font-medium text-muted-foreground">
              Sent Gifts
            </div>
            {renderGiftCards(message.data.sentGifts)}
          </div>
        )}

        {/* Render balance if available */}
        {message.data?.balance && (
          <div className="rounded-lg border bg-muted/50 p-2 text-xs">
            <div className="mb-1">
              <span className="font-medium">Balance:</span>{' '}
              {message.data.balance} ETH
            </div>
          </div>
        )}

        {/* Render suggestions if available */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => onSuggestionClick?.(suggestion)}
                className="rounded-full border bg-muted px-3 py-1 text-xs hover:bg-muted/80"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
