const url = process.env.FOURSQUARE_API;

if (!url || url === "")
	throw new Error("Foursquare API URL is not found");

const getFourSquareUrl = (limit: number, latLong: string | null) => {
	const params: string[] = ["categories=13032"];

	latLong ? params.push(`ll=${latLong}`) : params.push('near=Cairo%2C%20EG');
	params.push(`limit=${limit}`);

	return `${url}/v3/places/search?${params.join("&")}`
}

export default getFourSquareUrl;
