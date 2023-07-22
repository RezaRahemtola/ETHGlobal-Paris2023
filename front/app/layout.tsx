"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { Providers } from "./providers";
import { ReactNode } from "react";
import { APP_NAME } from "@/config/environment";

const RootLayout = ({ children }: { children: ReactNode }) => (
	<html suppressHydrationWarning lang="en">
		<head>
			<title>{APP_NAME}</title>
		</head>

		<body className="dark:bg-black">
			<Providers>
				<Header />
				{children}
				<Footer />
				<ScrollToTop />
			</Providers>
		</body>
	</html>
);

export default RootLayout;
