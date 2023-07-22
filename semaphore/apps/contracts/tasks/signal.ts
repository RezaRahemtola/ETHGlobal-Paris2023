import { generateProof } from "@semaphore-protocol/proof"
import { SemaphoreEthers } from "@semaphore-protocol/data"
import { Group } from "@semaphore-protocol/group"
import { Identity } from "@semaphore-protocol/identity"
import { BigNumber, utils } from "ethers"
import { task } from "hardhat/config"

task("signal", "sample script to send a signal").setAction(async (_, { ethers }) => {
    const groupId = "41"

    const FeedbackFactory = await ethers.getContractFactory("Feedback")
    const feedbackContract = FeedbackFactory.attach("0x0CA966181aBa3083b6B429e2e5c300C4B226B289")

    const Semaphore = new SemaphoreEthers("goerli", { address: "0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131" })
    const members = await Semaphore.getGroupMembers(groupId)
    const _identity = new Identity(
        '["0x704df3123c06ed0527df232abe74998b621a18446478503529494660b7eab7","0xb0ad5cb8325f8a81b2e0eefe5406716017e4d9fde89015b4ba4a642cd7ba91"]'
    )
    console.log({
        members
    })

    const feedback = "Hello world!"
    const signal = BigNumber.from(utils.formatBytes32String(feedback)).toString()

    const group = new Group(groupId, undefined, members)

    const { proof, merkleTreeRoot, nullifierHash } = await generateProof(_identity, group, groupId, signal, {
        wasmFilePath: "./build/snark-artifacts/semaphore.wasm",
        zkeyFilePath: "./build/snark-artifacts/semaphore.zkey"
    })

    await feedbackContract.sendFeedback(signal, merkleTreeRoot, nullifierHash, proof)

    console.log({
        proof,
        merkleTreeRoot,
        nullifierHash
    })
})
