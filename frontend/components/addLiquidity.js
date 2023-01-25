import { Contract, utils } from "ethers";
import {
  abi,
  contractAddresses,
  tokenabi,
  tokencontractAddresses,
} from "../constants/index";

export async function addLiquidity(signer, addCDAmountWei, addEtherAmountWei) {
  try {
    const exchangeContract = new Contract(contractAddresses[5][0], abi, signer);
    const tokenContract = new Contract(
      tokencontractAddresses[5][0],
      tokenabi,
      signer
    );

    let tx = await tokenContract.approve(
      contractAddresses[5][0],
      addCDAmountWei.toString()
    );

    await tx.wait();

    tx = await exchangeContract.addLiquidity(addCDAmountWei, {
      value: addEtherAmountWei,
    });
    await tx.wait();
  } catch (err) {
    console.log(err);
  }
}

export async function calculateCD(
  _addEther = "0",
  etherBalanceContract,
  cdTokenReserve
) {
  const _addEtherAmountWei = utils.parseEther(_addEther);

  const cryptoDevTokenAmount = _addEtherAmountWei
    .mul(cdTokenReserve)
    .div(etherBalanceContract);
  return cryptoDevTokenAmount;
}
