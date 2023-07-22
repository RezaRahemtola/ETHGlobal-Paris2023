"use client";

import Image from "next/image";
import MetaMaskButton from "@/app/(auth)/login/MetaMaskButton";
import SemaphoreLogin from "@/app/(auth)/login/SemaphoreLogin";

const LoginPage = () => {
	return (
		<>
			<section className="pt-[120px] pb-[120px]">
				<div className="container">
					<div className="-mx-4 flex flex-wrap justify-center gap-y-8">
						<div className="relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark w-[800px]">
							<div className="relative block h-[220px] w-[220px] mx-auto mt-4">
								<Image src="/images/wallets/metamask.png" alt="Metamask logo" fill />
							</div>
							<div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8 flex flex-col items-center gap-y-6">
								<h3 className="border-t border-body-color border-opacity-10 pt-6 text-center dark:text-white mb-1 block text-lg font-bold text-black sm:text-2xl">
									Step 1: Connect with your MetaMask wallet
								</h3>
								<MetaMaskButton />
							</div>
						</div>
						<div className="relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark w-[800px]">
							<div className="relative block h-[220px] w-[220px] mx-auto mt-4">
								<Image src="/images/partners/semaphore.svg" alt="Semaphore logo" fill />
							</div>
							<div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8 flex flex-col items-center">
								<h3 className="border-t border-body-color border-opacity-10 pt-6 text-center dark:text-white mb-1 block text-lg font-bold text-black sm:text-2xl">
									Step 2: Create or use your Semaphore identity
								</h3>
								<h5>This step is only required to join chatrooms using Semaphore groups.</h5>
								<SemaphoreLogin />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default LoginPage;
