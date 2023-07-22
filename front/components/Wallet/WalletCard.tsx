import { Wallet } from "@/types/wallet";
import React from "react";
import Image from "next/image";

const WalletCard = ({ wallet }: { wallet: Wallet }) => {
	const { title, image } = wallet;
	return (
		<div className="relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark">
			<div className="relative block h-[220px] w-[220px] mx-auto">
				<Image src={image} alt={`wallet-${title.toLowerCase()}-logo`} fill />
			</div>
			<div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
				<h3 className="border-t border-body-color border-opacity-10 pt-6 text-center dark:text-white mb-1 block text-xl font-bold text-black sm:text-2xl">
					{title}
				</h3>
			</div>
		</div>
	);
};

export default WalletCard;
