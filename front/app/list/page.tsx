"use client";
import GroupCard from "@/components/Messaging/GroupCard";
import { Group, GroupAccess } from "@/types/group";
import { SearchIcon } from "@heroicons/react/outline";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "../abi.json";

const MessageApp = () => {
	const [groups, setGroups] = useState<Group[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const filteredValues = groups.filter((group) =>
		group.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
	);

	useEffect(() => {
		(async () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const ethereum = window.ethereum;
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});

			const provider = new ethers.BrowserProvider(ethereum);
			const contractAddress = "0x297C24a583D6aB2053d8dF1B886d053ca79a05A3";
			const registry = new Contract(contractAddress, abi.abi, await provider.getSigner(accounts[0]));
			const rawRes = await registry.getChannels();
			const res = [];
			rawRes.map((group) => {
				console.log(group);
				res.push({
					id: group[0],
					title: ethers.decodeBytes32String(group[1]),
					access: group[2] >> 3 == 1 ? GroupAccess.JOINABLE : GroupAccess.PRIVATE,
					semaphore: group[2] >> 2 == 1,
				});
			});
			setGroups(res);
		})();
	});

	return (
		<>
			<section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
				<div className="container mx-auto">
					<div className="w-96 m-auto">
						<label htmlFor="search" className="sr-only block text-sm font-semibold text-heading">
							Search
						</label>
						<div className="relative mt-2 flex">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex flex-shrink-0 items-center pl-4 focus-within:z-20">
								<SearchIcon className="h-5 w-5 text-text" />
							</div>
							<input
								id="search"
								name="search"
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								placeholder="Quick Search"
								className="block w-full rounded-xl border-2 border-layer-3 bg-muted-1 px-4 py-2.5 pl-11 pr-14 font-semibold text-heading placeholder:text-text/50 border-primary focus:outline-none focus:ring-0 sm:text-sm"
							/>
						</div>
					</div>
					<div className="flex justify-center">
						<div className="grid grid-flow-row grid-cols-3">
							{filteredValues.map((group) => (
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
