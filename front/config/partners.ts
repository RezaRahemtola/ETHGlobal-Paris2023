import { Partner } from "@/types/partners";

const partners: Partner[] = [
	{
		id: 1,
		name: "DFNS",
		description:
			"The most secure wallet-as-a-service infrastructure in Web3. Our oracle and relayer are using seedless Dfns wallets for enhanced security. In the future, we are planning to onboard non-web3 users to our platform, allowing them to create accounts with an email and creating Dfns wallets for them behind the scenes.",
		link: "https://www.dfns.co/",
		image: "/images/partners/dfns.png",
	},
	{
		id: 2,
		name: "Semaphore",
		description:
			"A zero-knowledge protocol for anonymous signalling on Ethereum. Semaphore is our first protocol integration that allows you to discuss anonymously on dedicated channels. To provide full anonymity to our users, we even set up a transaction relayer. Semaphore channels requires the generation of a proof to send messages.",
		link: "https://github.com/semaphore-protocol",
		image: "/images/partners/semaphore.svg",
	},
	{
		id: 3,
		name: "Quicknode",
		description:
			"The premier Web3 developer platform, helping today's most cutting-edge apps run with speed, reliability, and scale. To enhance the experience we rely on quicknode's great infrastructure for our blockchain queries.",
		link: "https://www.quicknode.com/",
		image: "/images/partners/quicknode.png",
	},
];
export default partners;
