import { createApi } from "unsplash-js";

const url = "https://api.foursquare.com";

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_KEY!
});

const getUrl = (limit: number, latLong: string | null) => {
	const params: string[] = ["categories=13032"];

	latLong ? params.push(`ll=${latLong}`) : params.push('near=Cairo%2C%20EG');
	params.push(`limit=${limit}`);

	return `${url}/v3/places/search?${params.join("&")}`
}

const getPhotos = async (limit: number) => {
	try {
		const photosQuery = await unsplash.search.getPhotos({
			query: "Coffee",
			orientation: "landscape",
			perPage: limit
		});

		if (!photosQuery.response || photosQuery.status >= 400)
			return false;

		const photos: Image[] = photosQuery.response.results.map(photo => {
			return {
				url: photo.urls.regular,
				owner: {
					name: photo.user.name,
					photo: photo.user.profile_image.small,
					profile: photo.user.links.html
				}
			}
		});

		return photos;
	} catch (err) {
		console.error(err);
		return false;
	}
}

export const GetCoffeeStores = async (limit?: number, latLong?: string): Promise<ApiSuccessResponse | ApiFailResponse> => {
	try {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: process.env.FOURSQUARE_KEY!
			}
		};

		const res = await fetch(getUrl(limit = limit || 6, latLong ? latLong : null), options);
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
