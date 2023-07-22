import { Group } from "@/types/group";

const GroupCard = ({ group }: { group: Group }) => {
	return (
		<div className="m-5 p-5 flex bg-message-card-owned rounded">
			<p>{group.title}</p>
		</div>
	);
};

export default GroupCard;
