import { Group } from "@semaphore-protocol/group"
import { Identity } from "@semaphore-protocol/identity"
import { task } from "hardhat/config"

task("joinGroup", "sample script to join a group").setAction(async (_, { ethers }) => {
    const groupId = "41"
    const users: Identity[] = []
    const group = new Group(groupId)

    const FeedbackFactory = await ethers.getContractFactory("Feedback")
    const feedbackContract = FeedbackFactory.attach("0x0CA966181aBa3083b6B429e2e5c300C4B226B289")

    users.push(new Identity())
    users.push(new Identity())

    for await (const [, user] of users.entries()) {
        await (await feedbackContract.joinGroup(user.commitment)).wait(1)
        group.addMember(user.commitment)
    }

    console.log(users[0].toString())
})
