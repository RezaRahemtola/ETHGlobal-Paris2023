"use client";

import { useUserContext } from "@/utils/useUserContext";
import { Identity } from "@semaphore-protocol/identity";
import secureLocalStorage from "react-secure-storage";

export default function SemaphoreLogin() {
	const { semaphore } = useUserContext();

	const buttonStyle =
		"ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9";

	const generateIdentity = () => {
		secureLocalStorage.setItem("semaphore-identity", new Identity().toString());
	};

	if (semaphore.isLoggedIn) {
		return (
			<div className="mt-6">
				<button className={buttonStyle} disabled>
					Semaphore identity linked
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-row gap-x-8 mt-6">
			<button className={buttonStyle} onClick={generateIdentity}>
				Generate an new identity
			</button>
			<button className={buttonStyle}>Use my credentials</button>
		</div>
	);
}
