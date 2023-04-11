import getFourSquareUrl from "./getFourSquareUrl";
import getPhotos from "./getPhotos";

const getCoffeeStores = async (limit?: number, latLong?: string): Promise<ApiSuccessResponse | ApiFailResponse> => {
	try {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: process.env.FOURSQUARE_KEY!
			}
		};

		const res = await fetch(getFourSquareUrl(limit = limit || 6, latLong ? latLong : null), options);
		const places: FoursquarePlaceSearch = await res.json();

		if (res.status >= 400) {
			console.log(places)
			return {
				error: true,
				info: "An error occurred while fetching stores"
			}
		}

		const images = await getPhotos(limit || 6);

		if (!images)
			return {
				error: true,
				info: "An error occurred while fetching images"
			}

		return {
			error: false,
			info: "OK!",
			Response: {
				images,
				places: places.results
			}
		};
	} catch (error) {
		console.error(error);
		return {
			error: true,
			info: "An error occurred while fetching places"
		}
	}
}

export default getCoffeeStores;
