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
      expiration
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
      expiration
    }
  }
`;

export const GET_GIFT_DETAILS = gql`
  query GetUserGifts($cid: String!) {
    gift: giftCards(
      where: { metadataURI: $cid }
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
      expiration
    }
  }
`;
