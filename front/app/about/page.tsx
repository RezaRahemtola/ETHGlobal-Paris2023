import Roadmap from "@/components/About/Roadmap";
import Breadcrumb from "@/components/Common/Breadcrumb";

const AboutPage = () => {
	return (
		<>
			<Breadcrumb
				pageName="About Page"
				description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
			/>
			<Roadmap />
		</>
	);
};

export default AboutPage;
