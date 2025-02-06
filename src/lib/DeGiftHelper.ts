import { ethers, Provider, Signer, ZeroAddress } from "ethers";

export class DeGiftHelper {
  private contract: ethers.Contract;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(contractAddress: string, abi: any, providerOrSigner: Signer | Provider) {
    this.contract = new ethers.Contract(contractAddress, abi, providerOrSigner);
  }

  async createGift(
    recipient: string,
    amount: ethers.BigNumberish,
    tokenAddress: string,
    metadataURI: string,
    expiration: number
  ): Promise<ethers.ContractTransaction> {
    if (tokenAddress === ZeroAddress) {
      return await this.contract.createGift(recipient, amount, tokenAddress, metadataURI, expiration, {
        value: amount,
      });
    } else {
      return await this.contract.createGift(recipient, amount, tokenAddress, metadataURI, expiration);
    }
  }

  async redeemGift(giftId: number): Promise<ethers.ContractTransaction> {
    return await this.contract.redeemGift(giftId);
  }

  async refundGift(giftId: number): Promise<ethers.ContractTransaction> {
    return await this.contract.refundGift(giftId);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getGiftDetails(giftId: number): Promise<any> {
    return await this.contract.getGiftDetails(giftId);
  }

  // Get the total number of gift cards created
  async getTotalGiftCardsCreated(): Promise<string> {
    const totalGiftCardsCreated: ethers.BigNumberish = await this.contract.getTotalGiftCardsCreated();
    return totalGiftCardsCreated.toString();
  }

  // Get the list of gift cards created by a specific user
  async getUserCreatedGiftCards(userAddress: string): Promise<number[]> {
    return await this.contract.getUserCreatedGiftCards(userAddress);
  }

  // Get the list of gift cards redeemed by a specific user
  async getUserRedeemedGiftCards(userAddress: string): Promise<number[]> {
    return await this.contract.getUserRedeemedGiftCards(userAddress);
  }
}
