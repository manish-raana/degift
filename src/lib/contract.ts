import { ethers } from "ethers";

export enum TokenType {
  NATIVE = 0,
  ERC20 = 1,
}

export interface GiftCard {
  sender: string;
  recipient: string;
  amount: ethers.BigNumberish;
  tokenAddress: string;
  metadataURI: string;
  redeemed: boolean;
  tokenType: TokenType;
  expiration: number; // Timestamp
}

export interface DeGiftContract {
  createGift: (
    recipient: string,
    amount: ethers.BigNumberish,
    tokenAddress: string,
    metadataURI: string,
    expiration: number,
    overrides?: ethers.Overrides
  ) => Promise<ethers.ContractTransaction>;

  redeemGift: (giftId: number) => Promise<ethers.ContractTransaction>;

  refundGift: (giftId: number) => Promise<ethers.ContractTransaction>;

  getGiftDetails: (giftId: number) => Promise<GiftCard>;

  filters: {
    GiftCreated: (
      giftId?: number | null,
      sender?: string | null,
      recipient?: string | null,
      amount?: ethers.BigNumberish | null,
      tokenAddress?: string | null,
      metadataURI?: string | null,
      expiration?: number | null
    ) => ethers.EventFilter;

    GiftRedeemed: (
      giftId?: number | null,
      recipient?: string | null,
      amount?: ethers.BigNumberish | null,
      tokenAddress?: string | null
    ) => ethers.EventFilter;

    GiftRefunded: (
      giftId?: number | null,
      sender?: string | null,
      amount?: ethers.BigNumberish | null,
      tokenAddress?: string | null
    ) => ethers.EventFilter;
  };
}

export const getDeGiftContract = (
  providerOrSigner: ethers.Provider | ethers.Signer,
  contractAddress: string
): DeGiftContract => {
  const abi = [
    "function createGift(address recipient, uint256 amount, address tokenAddress, string metadataURI, uint256 expiration) payable",
    "function redeemGift(uint256 giftId)",
    "function refundGift(uint256 giftId)",
    "function getGiftDetails(uint256 giftId) view returns (tuple(address sender, address recipient, uint256 amount, address tokenAddress, string metadataURI, bool redeemed, uint8 tokenType, uint256 expiration))",
    "event GiftCreated(uint256 indexed giftId, address indexed sender, address recipient, uint256 amount, address tokenAddress, string metadataURI, uint256 expiration)",
    "event GiftRedeemed(uint256 indexed giftId, address indexed recipient, uint256 amount, address tokenAddress)",
    "event GiftRefunded(uint256 indexed giftId, address indexed sender, uint256 amount, address tokenAddress)",
  ];

  const contract = new ethers.Contract(contractAddress, abi, providerOrSigner) as unknown as DeGiftContract;
  return contract;
};
