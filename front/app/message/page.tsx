"use client";
import MessageCard from "@/components/Messaging/MessageCard";
import MessageInput from "@/components/Messaging/MessageInput";
import { MessageType } from "@/types/message";

const MessageApp = () => {
	// eslint-disable-next-line prefer-const
	let messages = [
		{
			type: MessageType.TEXT,
			value: "Hey, How are you?",
			owned: false,
		},
	];

	const sendMessage = (type: MessageType, value: string) => {
		messages.push({
			type,
			value,
			owned: false,
		});
		console.log(messages);
	};

	return (
		<>
			<section className="relative z-10 overflow-hidden pt-32 pb-16 md:pb-20 lg:pb-28">
				<div className="container mx-auto w-[50rem]">
					<div className="mx-auto mb-5">
						<div className="flex flex-row align-middle cursor-pointer">
							<svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path
									fill-rule="evenodd"
									d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
							<p className="ml-2">Previous</p>
						</div>
					</div>
					<div className="mx-auto h-[50rem] overflow-y-auto bg-interface-message rounded-lg">
						{messages.map((messageData) => (
							<MessageCard message={messageData}></MessageCard>
						))}
					</div>
					<MessageInput sendMessage={(type: MessageType, value: string) => sendMessage(type, value)} />
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
