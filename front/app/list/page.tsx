import GroupCard from "@/components/Messaging/GroupCard";
import { GroupAccess } from "@/types/group";

const MessageApp = () => {
	const groups = [
		{
			id: "0xcE8c5efB26AaeFBE79Eb03D2698A654b0835eB2a",
			title: "Joinable non anonymous group",
			access: GroupAccess.JOINABLE,
			semaphore: false,
		},
		{
			id: "0xcE8c5efB26AaeFBE79Eb03D2698A654b0835eB2a",
			title: "Private non anonymous group",
			access: GroupAccess.PRIVATE,
			semaphore: false,
		},
		{
			id: "0xcE8c5efB26AaeFBE79Eb03D2698A654b0835eB2a",
			title: "My joinable super semaphore group",
			access: GroupAccess.JOINABLE,
			semaphore: true,
		},
		{
			id: "0xcE8c5efB26AaeFBE79Eb03D2698A654b0835eB2a",
			title: "Joinable non anonymous group",
			access: GroupAccess.JOINABLE,
			semaphore: false,
		},
		{
			id: "0xcE8c5efB26AaeFBE79Eb03D2698A654b0835eB2a",
			title: "Private non anonymous group",
			access: GroupAccess.PRIVATE,
			semaphore: false,
		},
		{
			id: "0xcE8c5efB26AaeFBE79Eb03D2698A654b0835eB2a",
			title: "My joinable super semaphore group",
			access: GroupAccess.JOINABLE,
			semaphore: true,
		},
		{
			id: "0xcE8c5efB26AaeFBE79Eb03D2698A654b0835eB2a",
			title: "Joinable non anonymous group",
			access: GroupAccess.JOINABLE,
			semaphore: false,
		},
		{
			id: "0xcE8c5efB26AaeFBE79Eb03D2698A654b0835eB2a",
			title: "Private non anonymous group",
			access: GroupAccess.PRIVATE,
			semaphore: false,
		},
		{
			id: "0xcE8c5efB26AaeFBE79Eb03D2698A654b0835eB2a",
			title: "My joinable super semaphore group",
			access: GroupAccess.JOINABLE,
			semaphore: true,
		},
		{
			id: "0xcE8c5efB26AaeFBE79Eb03D2698A654b0835eB2a",
			title: "Joinable non anonymous group",
			access: GroupAccess.JOINABLE,
			semaphore: false,
		},
		{
			id: "0xcE8c5efB26AaeFBE79Eb03D2698A654b0835eB2a",
			title: "Private non anonymous group",
			access: GroupAccess.PRIVATE,
			semaphore: false,
		},
		{
			id: "0xcE8c5efB26AaeFBE79Eb03D2698A654b0835eB2a",
			title: "My joinable super semaphore group",
			access: GroupAccess.JOINABLE,
			semaphore: true,
		},
	];
	return (
		<>
			<section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
				<div className="container mx-auto">
					<h1 className="text-center text-xl">Chats</h1>
					<div className="flex justify-center">
						<div className="grid grid-flow-row grid-cols-3">
							{groups.map((group) => (
								<GroupCard group={group}></GroupCard>
							))}
						</div>
					</div>
				</div>
				<div className="absolute top-0 left-0 z-[-1]">
					<svg width="1440" height="969" viewBox="0 0 1440 969" fill="none" xmlns="http://www.w3.org/2000/svg">
						<mask
							id="mask0_95:1005"
							style={{ maskType: "alpha" }}
							maskUnits="userSpaceOnUse"
							x="0"
							y="0"
							width="1440"
							height="969"
						>
							<rect width="1440" height="969" fill="#090E34" />
						</mask>
						<g mask="url(#mask0_95:1005)">
							<path
								opacity="0.1"
								d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
								fill="url(#paint0_linear_95:1005)"
							/>
							<path
								opacity="0.1"
								d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
								fill="url(#paint1_linear_95:1005)"
							/>
						</g>
						<defs>
							<linearGradient
								id="paint0_linear_95:1005"
								x1="1178.4"
								y1="151.853"
								x2="780.959"
								y2="453.581"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#4A6CF7" />
								<stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
							</linearGradient>
							<linearGradient
								id="paint1_linear_95:1005"
								x1="160.5"
								y1="220"
								x2="1099.45"
								y2="1192.04"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#4A6CF7" />
								<stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
							</linearGradient>
						</defs>
					</svg>
				</div>
			</section>
		</>
	);
};

export default MessageApp;
