import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useUserContext } from "@/utils/useUserContext";
import { Identity } from "@semaphore-protocol/identity";
import secureLocalStorage from "react-secure-storage";

interface SemaphoreInputProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

export default function SemaphoreInput({ isOpen, setIsOpen }: SemaphoreInputProps) {
	const { semaphore } = useUserContext();
	const [credentials, setCredentials] = useState("");
	const [isError, setIsError] = useState(false);

	const normalButtonStyle =
		"mt-2 block w-full rounded-xl border-2 border-muted-3 bg-transparent px-4 py-2.5 font-semibold text-heading placeholder:text-text/50 focus:border-primary sm:text-sm";
	const errorButtonStyle =
		"mt-2 block w-full rounded-xl border-2 border-red-500 bg-transparent px-4 py-2.5 font-semibold text-heading placeholder:text-text/50 focus:border-primary sm:text-sm";

	function closeModal() {
		setIsOpen(false);
	}

	function saveCredentials() {
		try {
			const id = new Identity(credentials);
			semaphore.setIdentity(id.toString());
			secureLocalStorage.setItem("semaphore-identity", id.toString());
			closeModal();
		} catch (err) {
			setIsError(true);
		}
	}

	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" onClose={closeModal} open={isOpen}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-layer-1/60 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 flex min-h-screen items-end justify-center overflow-hidden px-4 pt-4 pb-10 text-center sm:block sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="inline-flex transform flex-col overflow-hidden rounded-xl bg-primary text-left align-bottom shadow-2xl transition-all sm:my-20 w-fit min-w-[600px] sm:align-middle">
								<div className="absolute top-4 right-5">
									<button
										type="button"
										onClick={closeModal}
										className="inline-flex aspect-square cursor-pointer items-center justify-center rounded-xl border-none bg-primary p-2 font-semibold text-text hover:bg-heading/5 focus:bg-heading/5 focus:outline-none focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text child-svg:h-5 child-svg:w-5"
									>
										<span>X</span>
									</button>
								</div>

								<div className="flex h-16 flex-shrink-0 items-center justify-between px-6">
									<Dialog.Title as="h3" className="text-lg font-semibold text-heading">
										Semaphore credentials
									</Dialog.Title>
								</div>

								<hr className="border-hr" />

								<div className="p-4">
									<label htmlFor="credentials" className="sr-only block text-sm font-semibold text-heading">
										Credentials
									</label>
									<input
										id="credentials"
										name="credentials"
										type="credentials"
										placeholder="Credentials"
										value={credentials}
										onChange={(e) => setCredentials(e.target.value)}
										className={isError ? errorButtonStyle : normalButtonStyle}
									/>
									{isError && (
										<p aria-live="polite" id="email:error" className="mt-2 text-xs font-medium text-red-400">
											Invalid credentials
										</p>
									)}
								</div>

								<div className="flex h-16 flex-shrink-0 items-center justify-end space-x-2 bg-primary px-6 shadow-lg">
									<button
										type="button"
										onClick={saveCredentials}
										disabled={credentials.length === 0}
										className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-secondary bg-secondary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:border-secondary-accent hover:bg-secondary-accent focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-secondary disabled:hover:bg-secondary disabled:hover:text-white dark:focus:ring-white/80"
									>
										Save
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
