import { gql } from 'graphql-request';

export const GET_USER_GIFTS = gql`
  query GetUserGifts($address: String!) {
    sentGifts: giftCards(
      where: { sender: $address }
      orderBy: createdAt
      orderDirection: desc
    ) {
      id
      amount
      tokenAddress
      recipient
      status
      createdAt
      redeemed
      redeemedAt
      refundedAt
      metadataURI
    }
    receivedGifts: giftCards(
      where: { recipient: $address }
      orderBy: createdAt
      orderDirection: desc
    ) {
      id
      amount
      tokenAddress
      sender
      status
      createdAt
      redeemed
      redeemedAt
      metadataURI
    }
  }
`;
