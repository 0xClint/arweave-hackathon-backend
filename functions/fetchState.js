import { readContractState } from "arweavekit/contract";
import dotenv from "dotenv";
dotenv.config();

export async function fetchState() {
  let data;
  const { readContract } = await readContractState({
    environment: "testnet",
    contractTxId: process.env.CONTRACT_TX_ID,
  });
  // console.log(readContract.cachedValue.state.users);
  data = Object.values(readContract.cachedValue.state.users);
  // console.log(data);
  return data;
}

// getState();
