import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  GiftCreated,
  GiftRedeemed,
  GiftRefunded,
  OwnershipTransferred
} from "../generated/Contract/Contract"

export function createGiftCreatedEvent(
  giftId: BigInt,
  sender: Address,
  recipient: Address,
  amount: BigInt,
  tokenAddress: Address,
  metadataURI: string,
  expiration: BigInt
): GiftCreated {
  let giftCreatedEvent = changetype<GiftCreated>(newMockEvent())

  giftCreatedEvent.parameters = new Array()

  giftCreatedEvent.parameters.push(
    new ethereum.EventParam("giftId", ethereum.Value.fromUnsignedBigInt(giftId))
  )
  giftCreatedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  giftCreatedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  giftCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  giftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  giftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "metadataURI",
      ethereum.Value.fromString(metadataURI)
    )
  )
  giftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "expiration",
      ethereum.Value.fromUnsignedBigInt(expiration)
    )
  )

  return giftCreatedEvent
}

export function createGiftRedeemedEvent(
  giftId: BigInt,
  recipient: Address,
  amount: BigInt,
  tokenAddress: Address
): GiftRedeemed {
  let giftRedeemedEvent = changetype<GiftRedeemed>(newMockEvent())

  giftRedeemedEvent.parameters = new Array()

  giftRedeemedEvent.parameters.push(
    new ethereum.EventParam("giftId", ethereum.Value.fromUnsignedBigInt(giftId))
  )
  giftRedeemedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  giftRedeemedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  giftRedeemedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )

  return giftRedeemedEvent
}

export function createGiftRefundedEvent(
  giftId: BigInt,
  sender: Address,
  amount: BigInt,
  tokenAddress: Address
): GiftRefunded {
  let giftRefundedEvent = changetype<GiftRefunded>(newMockEvent())

  giftRefundedEvent.parameters = new Array()

  giftRefundedEvent.parameters.push(
    new ethereum.EventParam("giftId", ethereum.Value.fromUnsignedBigInt(giftId))
  )
  giftRefundedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  giftRefundedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  giftRefundedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )

  return giftRefundedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
