import wallets from "@/config/wallet";
import WalletCard from "@/components/Wallet/WalletCard";

const ConnectWallet = () => {
	return (
		<>
			<section className="pt-[120px] pb-[120px]">
				<div className="container">
					<div className="-mx-4 flex flex-wrap justify-center">
						{wallets.map((wallet) => (
							<div key={wallet.title} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
								<WalletCard wallet={wallet} />
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default ConnectWallet;
