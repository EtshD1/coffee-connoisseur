import { createApi } from "unsplash-js";

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_KEY!
});

const getPhotos = async (limit: number) => {
	try {
		const photosQuery = await unsplash.search.getPhotos({
			query: "Coffee",
			orientation: "landscape",
			perPage: limit
		});

		if (!photosQuery.response || photosQuery.status >= 400)
			return false;

		const photos: UnsplashImage[] = photosQuery.response.results.map(photo => {
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

export default getPhotos;
