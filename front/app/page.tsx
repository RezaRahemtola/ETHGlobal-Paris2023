import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Inter } from "next/font/google";
import Partners from "@/components/Partners";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<ScrollUp />
			<Hero />
			<Features />
			<Partners />
			<Video />
			<AboutSectionOne />
			<AboutSectionTwo />
			<Testimonials />
			<Blog />
			<Contact />
		</>
	);
}
