interface FoursquarePlace {
	fsq_id: string,
	categories:
	{
		id: number,
		name: string,
		icon: {
			prefix: string,
			suffix: string
		}
	}[],
	chains: {
		id: string,
		name: string
	}[],
	distance: number,
	geocodes: {
		main: {
			latitude: number,
			longitude: number
		}
	},
	link: string,
	location: {
		country: string,
		cross_street: string,
		formatted_address: string,
		locality: string,
		region: string
	},
	name: string,
	related_places: {},
	timezone: string
}

interface FoursquarePlaceSearch {
	results: FoursquarePlace[],
	context: any
}

interface UnsplashImage {
	url: string;
	owner: {
		name: string;
		photo: string;
		profile: string;
	}
}

interface CoffeeStores {
	places: FoursquarePlace[],
	images: UnsplashImage[]
}

interface ApiFailResponse {
	error: true;
	info: string;
}

interface ApiSuccessResponse {
	error: false;
	info: string;
	Response: CoffeeStores
}

interface IResponse<T> {
	error: bool;
	message: string;
	data?: T
}
