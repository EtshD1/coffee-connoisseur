const url = process.env.FOURSQUARE_API;

if (!url || url === "")
	throw new Error("Foursquare API URL is not found");

const getCoffeeStore = async (fsq_id: string): Promise<IResponse<FoursquarePlace>> => {
	try {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: process.env.FOURSQUARE_KEY!
			}
		};

		const res = await fetch(`${url}/v3/places/${fsq_id}`, options);
		const place: FoursquarePlace = await res.json();

		if (res.status >= 400) {
			return {
				error: true,
				message: "An error occurred while fetching stores"
			}
		}

		return {
			error: false,
			message: "OK!",
			data: place
		};
	} catch (error) {
		console.error(error);
		return {
			error: true,
			message: "An error occurred while fetching places"
		}
	}
}

export default getCoffeeStore;
