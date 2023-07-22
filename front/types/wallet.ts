import React from "react";

export type Wallet = {
	title: string;
	image: string;
	render: () => React.ReactNode;
};
