import { useUserContext } from "@/utils/useUserContext";
import { Identity } from "@semaphore-protocol/identity";
import secureLocalStorage from "react-secure-storage";
import { useState } from "react";
import SemaphoreCredentials from "@/app/(auth)/login/SemaphoreCredentials";
import SemaphoreInput from "@/app/(auth)/login/SemaphoreInput";

export default function SemaphoreLogin() {
	const { semaphore } = useUserContext();
	const [isCredsOpen, setCredsOpen] = useState(false);
	const [isInputOpen, setInputOpen] = useState(false);

	const buttonStyle =
		"ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9";

	const generateIdentity = () => {
		const id = new Identity().toString();
		secureLocalStorage.setItem("semaphore-identity", id);
		semaphore.setIdentity(id);
		setCredsOpen(true);
	};

	return (
		<>
			<SemaphoreCredentials isOpen={isCredsOpen} setIsOpen={setCredsOpen} />
			<SemaphoreInput isOpen={isInputOpen} setIsOpen={setInputOpen} />
			<div className="flex flex-row gap-x-8 mt-6">
				{semaphore.isLoggedIn ? (
					<button className={buttonStyle} disabled>
						Semaphore identity linked
					</button>
				) : (
					<>
						<button className={buttonStyle} onClick={generateIdentity}>
							Generate a new identity
						</button>
						<button className={buttonStyle} onClick={() => setInputOpen(true)}>
							Use my credentials
						</button>
					</>
				)}
			</div>
		</>
	);
}
