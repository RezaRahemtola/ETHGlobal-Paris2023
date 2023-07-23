import { Identity } from "@semaphore-protocol/identity";
import { Group } from "@semaphore-protocol/group";
import { BigNumber } from "@ethersproject/bignumber";
import { ethers, Contract } from "ethers";
import { generateProof } from "@semaphore-protocol/proof";
import { CONTRACT_ADDRESS } from "@/config/environment";
import abi from "@/app/abi.json";

export default async function sendSemaphoreMessage(params: { identity: Identity; group: Group; message: string }) {
	try {
		const signal = BigNumber.from(ethers.encodeBytes32String(params.message)).toString();

		const { proof, merkleTreeRoot, nullifierHash } = await generateProof(
			params.identity,
			params.group,
			params.group.id,
			signal,
		);

		const types = ["bytes32", "bytes32", "bytes32", "bytes32[8]"];
		const values = [signal, merkleTreeRoot, nullifierHash, proof];
		const packed = ethers.solidityPacked(types, values);
		console.log(packed);

		const ethereum = window.ethereum;
		const accounts = await ethereum.request({
			method: "eth_requestAccounts",
		});

		const provider = new ethers.BrowserProvider(ethereum);
		const registry = new Contract(CONTRACT_ADDRESS, abi.abi, await provider.getSigner(accounts[0]));
		const rawRes = await registry.sendMessage(packed);
	} catch (error) {
		console.error(error);
	}
}
