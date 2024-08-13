import Web3 from "web3";

import abi from "./abi.json";

import { ethers } from "ethers";

const isBrowser = () => typeof window !== "undefined";

const { ethereum } = isBrowser();

if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}

// const contractAddress = "0x1B1228206B715Ac195630E040Be6eb371922a2B9";
const contractAddress = "0x47de23cd4F59Bf7cE6cAC0204427B4fa4f82a5ea";

export const increment = async () => {
  //provider, signer and contract instance
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();

  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, abi, signer); //contract addresss, abi of the contract, signer
  const tx = await contract.increment();
  await tx.wait();
  return await contract.getCount();
};
export const decrement = async () => {
  //provider, signer and contract instance
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();

  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, abi, signer); //contract addresss, abi of the contract, signer
  const tx = await contract.decrement();
  await tx.wait();
  return await contract.getCount();
};

export const getCount = async () => {
  //provider, signer and contract instance
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();

  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, abi, signer); //contract addresss, abi of the contract, signer
  const tx = await contract.getCount();
  await tx.wait();
  return await contract.getCount();
};
