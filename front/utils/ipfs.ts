import axios from "axios";
import { PINATA_API_KEY, PINATA_API_SECRET } from "@/config/environment";

const pinFileToIPFS = async (e, fileImg) => {
	if (fileImg) {
		try {
			const formData = new FormData();
			formData.append("file", fileImg);

			const res = await axios({
				method: "post",
				url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
				data: formData,
				headers: {
					pinata_api_key: PINATA_API_KEY,
					pinata_secret_api_key: PINATA_API_SECRET,
					"Content-Type": "multipart/form-data",
				},
			});

			return res.data.IpfsHash as string;
		} catch (error) {
			console.error(`Error sending File to IPFS: ${error}`);
		}
	}
};

export default pinFileToIPFS;
