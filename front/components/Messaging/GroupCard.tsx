import { Group, GroupAccess } from "@/types/group";
import Link from "next/link";

const GroupCard = ({ group }: { group: Group }) => {
	return (
		<div className="rounded-md bg-white shadow-one dark:bg-dark w-80 m-10">
			<div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8 relative">
				{group.access == GroupAccess.PRIVATE && <span className="absolute top-2 right-2">🔒</span>}
				{group.semaphore && (
					<img className="absolute top-2 right-2" width="20" src="https://semaphore.appliedzkp.org/img/favicon.ico" />
				)}

				<p className="text-center text-lg dark:text-white mb-1 block font-bold text-black ">{group.title}</p>
				<p className="text-center mt-5">
					{group.access == GroupAccess.PRIVATE && (
						<Link
							href="#"
							className="cursor-default opacity-50 bg-primary hover:bg-sky-700 p-2 pl-6 rounded flex m-auto w-20"
						>
							<span>Join</span>
						</Link>
					)}
					{group.access == GroupAccess.PUBLIC && (
						<Link
							href={`/message?id=${group.id}`}
							className="bg-primary hover:bg-sky-700 p-2 pl-6 rounded flex m-auto w-20"
						>
							<span>Join</span>
						</Link>
					)}
				</p>
			</div>
		</div>
	);
};

export default GroupCard;
