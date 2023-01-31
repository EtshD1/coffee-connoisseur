const url = "https://api.foursquare.com";

const getUrl = (values?: {
	categories?: number,
	near?: string,
	limit?: number
}) => {
	const params: string[] = [];

	if (values) {
		if (values.categories) params.push(`categories=${values.categories}`);
		if (values.near) params.push(`near=${values.near}`);
		if (values.limit) params.push(`limit=${values.limit}`);
	}

	return `${url}/v3/places/search?${params.join("&")}`
}

export const CairoPlaces = async () => {
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: process.env.FOURSQUARE_KEY!
		}
	};

	const res = await fetch(getUrl({ categories: 13032, near: "Cairo%2C%20EG", limit: 6 }), options);
	const data: FoursquarePlaceSearch = await res.json();

	return data;
}
