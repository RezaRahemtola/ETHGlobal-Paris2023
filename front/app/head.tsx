import { APP_NAME } from "@/config/environment";

const Head = () => (
	<>
		<title>{APP_NAME}</title>
		<meta content="width=device-width, initial-scale=1" name="viewport" />
		<meta name="description" content="Composable chatrooms super-charged according to your needs." />
		<link rel="icon" href="/favicon.ico" />
	</>
);

export default Head;
