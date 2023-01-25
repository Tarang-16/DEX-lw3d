import { Contract } from "ethers";
import {
  abi,
  contractAddresses,
  tokenabi,
  tokencontractAddresses,
} from "../constants/index";

export async function getAmountOfTokensReceivedFromSwap(
  _swapAmountWei,
  provider,
  ethSelected,
  ethBalance,
  reservedCD
) {
  const exchangeContract = new Contract(contractAddresses[5][0], abi, provider);

  let amountOfTokens;

  if (ethSelected) {
    amountOfTokens = await exchangeContract.getAmountofTokens(
      _swapAmountWei,
      ethBalance,
      reservedCD
    );
  } else {
    amountOfTokens = await exchangeContract.getAmountofTokens(
      _swapAmountWei,
      reservedCD,
      ethBalance
    );
  }
  return amountOfTokens;
}

export async function swapTokens(
  signer,
  swapAmountWei,
  tokensToBeReceivedAfterSwap,
  ethSelected
) {
  const exchangeContract = new Contract(contractAddresses[5][0], abi, signer);
  const tokenContract = new Contract(
    tokencontractAddresses[5][0],
    tokenabi,
    signer
  );
  let tx;

  if (ethSelected) {
    tx = await exchangeContract.ethToCryptoDevToken(
      tokensToBeReceivedAfterSwap,
      { value: swapAmountWei }
    );
  } else {
    tx = await tokenContract.approve(
      exchangeContract,
      swapAmountWei.toString()
    );
    await tx.wait();

    tx = await exchangeContract.cryptoDevTokenToEth(
      swapAmountWei,
      tokensToBeReceivedAfterSwap
    );
  }
  await tx.wait();
}
