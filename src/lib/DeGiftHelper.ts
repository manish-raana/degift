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
}
