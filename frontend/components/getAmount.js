import { Contract } from "ethers";
import {
  abi,
  contractAddresses,
  tokenabi,
  tokencontractAddresses,
} from "../constants/index";

export async function getEtherBalance(provider, address, contract = false) {
  try {
    if (contract) {
      const balance = await provider.getBalance(contractAddresses[5][0]);
      return balance;
    } else {
      const balance = await provider.getBalance(address);
      return balance;
    }
  } catch (err) {
    console.log(err);
    return 0;
  }
}

export async function getCDTokensBalance(provider, address) {
  try {
    const tokenContract = new Contract(
      tokencontractAddresses[5][0],
      tokenabi,
      provider
    );

    const balanceOfCryptoDevTokens = await tokenContract.balanceOf(address);
    return balanceOfCryptoDevTokens;
  } catch (err) {
    console.log(err);
  }
}

export async function getLPTokensBalance(provider, address) {
  try {
    const exchangeContract = new Contract(
      contractAddresses[5][0],
      abi,
      provider
    );

    const balanceOfLPTokens = await exchangeContract.balanceOf(address);
    return balanceOfLPTokens;
  } catch (err) {
    console.log(err);
  }
}

export async function getReserveOfCDTokens(provider) {
  try {
    const exchangeContract = new Contract(
      contractAddresses[5][0],
      abi,
      provider
    );

    const reserve = await exchangeContract.getReserve();
    return reserve;
  } catch (err) {
    console.log(err);
  }
}
