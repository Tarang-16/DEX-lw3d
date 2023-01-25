import { Contract } from "ethers";
import {
  abi,
  contractAddresses,
  tokenabi,
  tokencontractAddresses,
} from "../constants/index";

export async function removeLiquidity(signer, removeLPTokensWei) {
  const exchangeContract = new Contract(contractAddresses[5][0], abi, signer);

  let tx = await exchangeContract.removeLiquidity(removeLPTokensWei);
  await tx.wait();
}

export async function getTokensAfterRemove(
  provider,
  removeLPTokensWei,
  _ethBalance,
  cryptoDevTokenReserve
) {
  try {
    const exchangeContract = new Contract(
      contractAddresses[5][0],
      abi,
      provider
    );

    const _totalSupply = await exchangeContract.totalSupply();
    const _removeEther = _ethBalance.mul(removeLPTokensWei).div(_totalSupply);
    const _removeCD = cryptoDevTokenReserve
      .mul(removeLPTokensWei)
      .div(_totalSupply);

    return { _removeEther, _removeCD };
  } catch (err) {
    console.log(err);
  }
}
