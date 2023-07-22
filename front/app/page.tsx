import Roadmap from "@/components/Roadmap";
import ScrollUp from "@/components/Common/ScrollUp";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { Inter } from "next/font/google";
import Partners from "@/components/Partners";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inter = Inter({ subsets: ["latin"] });

const Home = () => (
	<>
		<ScrollUp />
		<Hero />
		<Features />
		<Partners />
		<Roadmap />
	</>
);

export default Home;
