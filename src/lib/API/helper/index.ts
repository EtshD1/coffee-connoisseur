type FindStoreBody = {
	fsq_id: string;
	img_url?: string;
}

type SwrFetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<any>;

export const handleCoffeeStoreRequest = async (fsq_id: string, img_url?: string) => {
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


export const commendStoreRequest = async (fsq_id: string) => {
	const res = await fetch(`/api/coffee-stores/commend-store?fsq_id=${fsq_id}`, {
		method: "PATCH",
	});

	const value = await res.json();

	if (value.err || !value.data)
		return false;
	else
		return value;
}

export const swrFetcher: SwrFetcher = (...args) => fetch(...args).then(res => res.json());
