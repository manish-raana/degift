import {
  GiftCreated as GiftCreatedEvent,
  GiftRedeemed as GiftRedeemedEvent,
  GiftRefunded as GiftRefundedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/Contract/Contract"
import {
  GiftCreated,
  GiftRedeemed,
  GiftRefunded,
  OwnershipTransferred,
} from "../generated/schema"

export function handleGiftCreated(event: GiftCreatedEvent): void {
  let entity = new GiftCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.giftId = event.params.giftId
  entity.sender = event.params.sender
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount
  entity.tokenAddress = event.params.tokenAddress
  entity.metadataURI = event.params.metadataURI
  entity.expiration = event.params.expiration

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGiftRedeemed(event: GiftRedeemedEvent): void {
  let entity = new GiftRedeemed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.giftId = event.params.giftId
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount
  entity.tokenAddress = event.params.tokenAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGiftRefunded(event: GiftRefundedEvent): void {
  let entity = new GiftRefunded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.giftId = event.params.giftId
  entity.sender = event.params.sender
  entity.amount = event.params.amount
  entity.tokenAddress = event.params.tokenAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
