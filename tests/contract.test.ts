import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { GiftCreated } from "../generated/schema"
import { GiftCreated as GiftCreatedEvent } from "../generated/Contract/Contract"
import { handleGiftCreated } from "../src/contract"
import { createGiftCreatedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let giftId = BigInt.fromI32(234)
    let sender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let recipient = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let tokenAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let metadataURI = "Example string value"
    let expiration = BigInt.fromI32(234)
    let newGiftCreatedEvent = createGiftCreatedEvent(
      giftId,
      sender,
      recipient,
      amount,
      tokenAddress,
      metadataURI,
      expiration
    )
    handleGiftCreated(newGiftCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("GiftCreated created and stored", () => {
    assert.entityCount("GiftCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "GiftCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "giftId",
      "234"
    )
    assert.fieldEquals(
      "GiftCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sender",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "GiftCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "recipient",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "GiftCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "GiftCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "GiftCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "metadataURI",
      "Example string value"
    )
    assert.fieldEquals(
      "GiftCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "expiration",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
