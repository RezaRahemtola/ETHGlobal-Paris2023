import { Group, GroupAccess } from "@/types/group";
import Link from "next/link";

const GroupCard = ({ group }: { group: Group }) => {
	return (
		<div className="rounded-md bg-white shadow-one dark:bg-dark w-80 m-10">
			<div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
				<p className="text-center text-lg dark:text-white mb-1 block font-bold text-black ">{group.title}</p>
				<p className="text-center mt-5">
					{group.access == GroupAccess.PRIVATE && <span className="text-center">🔒</span>}
					{group.access == GroupAccess.JOINABLE && !group.semaphore && (
						<Link
							href={`/message?id=${group.id}`}
							className="bg-primary hover:bg-sky-700 p-2 pl-6 rounded flex m-auto w-20"
						>
							<span>Join</span>{" "}
						</Link>
					)}
					{group.semaphore && (
						<Link href={`/message?id=${group.id}`} className="bg-primary hover:bg-sky-700 p-2 rounded flex m-auto w-20">
							<span>Join</span>{" "}
							{group.semaphore && (
								<img className="ml-2" width="15" src="https://semaphore.appliedzkp.org/img/favicon.ico" />
							)}
						</Link>
					)}
				</p>
			</div>
		</div>
	);
};

export default GroupCard;
