"use client";
import { MessageType } from "@/types/message";
import { useState } from "react";

const MessageInput = (props: { sendMessage }) => {
	const [messageValue, setmessageValue] = useState("");
	return (
		<div>
			<label htmlFor="email" className="sr-only block text-sm font-semibold text-heading">
				Email
			</label>
			<div className="relative mt-2 flex">
				<input
					id="email"
					name="email"
					type="email"
					value={messageValue}
					onChange={(value) => setmessageValue(value.target.value)}
					placeholder="Type here..."
					className="block w-full rounded-xl rounded-r-none border-2 border-muted-3 bg-transparent px-4 py-2.5 font-semibold text-heading placeholder:text-text/50 border-primary focus:outline-none focus:ring-0 sm:text-sm"
				/>
				<button
					onClick={() => props.sendMessage({ value: messageValue, type: MessageType.TEXT })}
					type="button"
					className="right-0 -ml-0.5 inline-flex inline-flex flex-shrink-0 cursor-pointer items-center items-center justify-center overflow-hidden rounded-xl rounded-xl rounded-l-none border-2 border-primary bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm focus-within:z-20 hover:border-primary-accent hover:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-primary disabled:hover:bg-primary disabled:hover:text-white dark:focus:ring-white/80"
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default MessageInput;
