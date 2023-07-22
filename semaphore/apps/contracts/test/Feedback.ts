import { Group } from "@semaphore-protocol/group"
import { Identity } from "@semaphore-protocol/identity"
import { generateProof } from "@semaphore-protocol/proof"
import { expect } from "chai"
import { formatBytes32String } from "ethers/lib/utils"
import { ethers, run } from "hardhat"
// @ts-ignore: typechain folder will be generated after contracts compilation
import { Feedback } from "../build/typechain"
import { config } from "../package.json"

describe("Feedback", () => {
    let feedbackContract: Feedback
    const semaphoreContract = "0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131" as any

    const groupId = "42"
    const group = new Group(groupId)
    const users: Identity[] = []

    before(async () => {
        // const { semaphore } = await run("deploy:semaphore", {
        //     logs: false
        // })

        const FeedbackFactory = await ethers.getContractFactory("Feedback")

        feedbackContract = FeedbackFactory.attach("0x0CA966181aBa3083b6B429e2e5c300C4B226B289")
        // await run("deploy", { logs: false, group: groupId, semaphore: semaphore.address })
        // semaphoreContract = semaphore

        users.push(new Identity())
        users.push(new Identity())
    })

    describe("# joinGroup", () => {
        it("Should allow users to join the group", async () => {
            for await (const [i, user] of users.entries()) {
                const transaction = feedbackContract.joinGroup(user.commitment)

                group.addMember(user.commitment)

                await expect(transaction)
                    .to.emit(semaphoreContract, "MemberAdded")
                    .withArgs(groupId, i, user.commitment, group.root)
            }
        })
    })

    describe("# sendFeedback", () => {
        const wasmFilePath = `${config.paths.build["snark-artifacts"]}/semaphore.wasm`
        const zkeyFilePath = `${config.paths.build["snark-artifacts"]}/semaphore.zkey`

        it("Should allow users to send feedback anonymously", async () => {
            const feedback = formatBytes32String("Hello World")

            const fullProof = await generateProof(users[1], group, groupId, feedback, {
                wasmFilePath,
                zkeyFilePath
            })

            const transaction = feedbackContract.sendFeedback(
                feedback,
                fullProof.merkleTreeRoot,
                fullProof.nullifierHash,
                fullProof.proof
            )

            await expect(transaction)
                .to.emit(semaphoreContract, "ProofVerified")
                .withArgs(groupId, fullProof.merkleTreeRoot, fullProof.nullifierHash, groupId, fullProof.signal)
        })
    })
})
