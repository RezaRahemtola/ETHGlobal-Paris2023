import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import features from "@/config/features";

const Features = () => (
	<section id="features" className="bg-primary/[.03] py-16 md:py-20 lg:py-28">
		<div className="container">
			<SectionTitle title="Features" paragraph="" center />

			<div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
				{features.map((feature) => (
					<SingleFeature key={feature.id} feature={feature} />
				))}
			</div>
		</div>
	</section>
);

export default Features;
