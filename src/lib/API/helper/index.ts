type FindStoreBody = {
	fsq_id: string;
	img_url?: string;
}

type SwrFetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<any>;

export const handleCoffeeStore = async (fsq_id: string, img_url?: string) => {
	const body: FindStoreBody = { fsq_id }
	if (img_url) body.img_url = img_url;

	const res = await fetch("/api/coffee-stores/find-store", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ fsq_id, img_url })
	});

	const json = await res.json();

	if (json.err || !json.data)
		return false;
	else
		return {
			location: {
				formatted_address: json.data.address,
				locality: json.data.locality
			},
			url: json.data.img_url,
			name: json.data.name
		};
}

export const swrFetcher: SwrFetcher = (...args) => fetch(...args).then(res => res.json());
