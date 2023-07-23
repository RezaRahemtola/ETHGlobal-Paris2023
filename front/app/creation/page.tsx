"use client";

import { CONTRACT_ADDRESS } from "@/config/environment";
import { Contract, ethers } from "ethers";
import { useState } from "react";
import abi from "../abi.json";

const MessageApp = () => {
	const [name, setName] = useState("");
	const [isSemaphore, setIsSemaphore] = useState(true);
	const [isPrivate, setIsPrivate] = useState(true);

	const handleCreateChannel = async () => {
		const ethereum = window.ethereum;
		const accounts = await ethereum.request({
			method: "eth_requestAccounts",
		});
		const channelType = (Number(isPrivate) << 0) | (Number(isSemaphore) << 1);

		const provider = new ethers.BrowserProvider(ethereum);
		const signer = await provider.getSigner(accounts[0]);
		const registry = new Contract(CONTRACT_ADDRESS, abi.abi, signer);
		const tx = await registry.createChannel(ethers.encodeBytes32String(name), "0x0" + channelType.toString(16));
		await tx.wait();

		window.location.href = "/rooms";
	};

	return (
		<section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
			<div className="container mx-auto">
				<h1 className="text-center text-3xl mb-5">Creation</h1>
				<div className="w-96 m-auto">
					<label htmlFor="blog-name" className="sr-only block text-sm font-semibold text-heading">
						Blog name
					</label>
					<div className="relative mt-2 flex">
						<input
							id="blog-name"
							name="blog-name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Blog name"
							className="block w-full rounded-xl border-2 border-layer-3 bg-muted-1 px-4 py-2.5 pl-11 pr-14 font-semibold text-heading placeholder:text-text/50 border-primary focus:outline-none focus:ring-0 sm:text-sm"
						/>
					</div>
				</div>
				<fieldset className="w-96 m-auto mt-5">
					<legend className="text-sm font-medium">Do you want your blog to be semaphore?</legend>

					<div className="mt-4 space-y-3">
						<div className="flex items-center space-x-3">
							<input
								checked={isSemaphore}
								onClick={() => setIsSemaphore(true)}
								name="from-semaphore"
								id="Yes-semaphore"
								type="radio"
								className="h-5 w-5 border-2 border-text bg-transparent text-primary focus:ring-primary focus:ring-offset-0 checked:focus:ring-text disabled:opacity-30"
							/>
							<label htmlFor="Yes-semaphore" className="block text-sm font-semibold text-heading">
								Yes
							</label>
						</div>
						<div className="flex items-center space-x-3">
							<input
								checked={!isSemaphore}
								onClick={() => setIsSemaphore(false)}
								name="from-semaphore"
								id="No-semaphore"
								type="radio"
								className="h-5 w-5 border-2 border-text bg-transparent text-primary focus:ring-primary focus:ring-offset-0 checked:focus:ring-text disabled:opacity-30"
							/>
							<label htmlFor="No-semaphore" className="block text-sm font-semibold text-heading">
								No
							</label>
						</div>
					</div>
				</fieldset>
				<fieldset className="w-96 m-auto mt-5">
					<legend className="text-sm font-medium">Do you want your blog to be private?</legend>

					<div className="mt-4 space-y-3">
						<div className="flex items-center space-x-3">
							<input
								checked={isPrivate}
								onClick={() => setIsPrivate(true)}
								name="from-private"
								id="Yes-private"
								type="radio"
								className="h-5 w-5 border-2 border-text bg-transparent text-primary focus:ring-primary focus:ring-offset-0 checked:focus:ring-text disabled:opacity-30"
							/>
							<label
								onClick={() => setIsPrivate(true)}
								htmlFor="Yes-private"
								className="block text-sm font-semibold text-heading"
							>
								Yes
							</label>
						</div>
						<div className="flex items-center space-x-3">
							<input
								checked={!isPrivate}
								onClick={() => setIsPrivate(false)}
								name="from-private"
								id="No-private"
								type="radio"
								className="h-5 w-5 border-2 border-text bg-transparent text-primary focus:ring-primary focus:ring-offset-0 checked:focus:ring-text disabled:opacity-30"
							/>
							<label htmlFor="No-private" className="block text-sm font-semibold text-heading">
								No
							</label>
						</div>
					</div>
				</fieldset>
				<p className="text-center">
					<button className="rounded-full bg-primary p-4" onClick={() => handleCreateChannel()}>
						Create channel
					</button>
				</p>
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
	);
};

export default MessageApp;
