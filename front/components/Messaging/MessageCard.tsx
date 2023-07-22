import { Message } from "@/types/message";

const MessageCard = ({ message }: { message: Message }) => {
	const { value } = message;
	return (
		<div className="m-5 flex justify-end">
			<div className={`flex w-full ${message.owned ? "flex-row-reverse" : ""}`}>
				<div
					className={`relative max-w-xl rounded-xl ${
						message.owned ? "rounded-tr-none bg-message-card-owned" : "rounded-tl-none bg-message-card-not-owned"
					} px-4 py-2`}
				>
					<span className={`text-sm font-medium ${message.owned ? "text-white" : "text-white"}`}>{value}</span>
				</div>
			</div>
		</div>
	);
};

export default MessageCard;
