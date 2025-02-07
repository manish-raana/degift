import {
  GiftCreated as GiftCreatedEvent,
  GiftRedeemed as GiftRedeemedEvent,
  GiftRefunded as GiftRefundedEvent,
} from '../generated/DeGift/DeGift';
import { GiftCard } from '../generated/schema';
import { BigInt, Bytes } from '@graphprotocol/graph-ts';

export function handleGiftCreated(event: GiftCreatedEvent): void {
  const giftCard = new GiftCard(event.params.giftId.toString());

  giftCard.sender = event.params.sender;
  giftCard.recipient = event.params.recipient;
  giftCard.amount = event.params.amount;
  giftCard.tokenAddress = event.params.tokenAddress;
  giftCard.metadataURI = event.params.metadataURI;
  giftCard.redeemed = false;
  giftCard.expiration = event.params.expiration;

  // Additional fields
  giftCard.createdAt = event.block.timestamp;
  giftCard.status = 'ACTIVE';
  giftCard.tokenType = event.params.tokenAddress.equals(
    Bytes.fromHexString('0x0000000000000000000000000000000000000000'),
  )
    ? 0
    : 1;

  giftCard.save();
}

export function handleGiftRedeemed(event: GiftRedeemedEvent): void {
  const giftCard = GiftCard.load(event.params.giftId.toString());

  if (giftCard) {
    giftCard.redeemed = true;
    giftCard.status = 'REDEEMED';
    giftCard.redeemedAt = event.block.timestamp;
    giftCard.save();
  }
}

export function handleGiftRefunded(event: GiftRefundedEvent): void {
  const giftCard = GiftCard.load(event.params.giftId.toString());

  if (giftCard) {
    giftCard.amount = BigInt.fromI32(0);
    giftCard.status = 'REFUNDED';
    giftCard.refundedAt = event.block.timestamp;
    giftCard.save();
  }
}
