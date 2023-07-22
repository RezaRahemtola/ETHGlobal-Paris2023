import React from "react";
import Image from "next/image";
import { Partner } from "@/types/partners";
import Link from "next/link";

type PartnerCardProps = {
	partner: Partner;
};
const PartnerCard = ({ partner }: PartnerCardProps) => {
	const { name, description, link, image } = partner;
	return (
		<Link href={link} target="_blank">
			<div className="relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark">
				<div className="relative block h-[220px] w-[220px] mx-auto">
					<Image src={image} alt={`partner-${name.toLowerCase()}-logo`} fill className="pt-3 " />
				</div>
				<div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
					<h3 className="border-t border-body-color border-opacity-10 pt-6 text-center dark:text-white mb-1 block text-xl font-bold text-black sm:text-2xl">
						{name}
					</h3>
					<br />
					<p className="text-center">{description}</p>
				</div>
			</div>
		</Link>
	);
};

export default PartnerCard;
