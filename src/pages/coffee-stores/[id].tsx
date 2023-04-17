import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/store";
import { isEmtpy } from "../../utils";
import getCoffeeStores from "../../lib/API/getCoffeeStores";
import useSWR from 'swr';
import { commendStoreRequest, handleCoffeeStoreRequest, swrFetcher } from "../../lib/API/helper";

type StoreType = {
	name: string;
	location: {
		formatted_address: string,
		locality: string,
	},
	url: string
}

type PageProps = {
	error: true;
	info: string;
} | {
	error: false;
	info: string;
	coffeeStore: FoursquarePlace & UnsplashImage
}

export const getStaticPaths: GetStaticPaths = async () => {
	const coffeeStoreData = await getCoffeeStores();

	if (coffeeStoreData.error)
		return {
			paths: [],
			fallback: true,
		};

	return {
		paths: coffeeStoreData.Response.places.map((_) => ({ params: { id: _.fsq_id } })),
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
	const results = await getCoffeeStores();
	if (params && !results.error) {
		const index = results.Response.places.findIndex(
			(_) => _.fsq_id === params.id
		);
		if (index >= 0) {
			return {
				props: {
					error: false,
					info: results.info,
					coffeeStore: {
						...results.Response.places[index],
						...results.Response.images[index % results.Response.images.length]
					}
				}
			};
		}
	}
	return { props: { error: true, info: results.error ? results.info : "Unable to get Params" } };
};

const CoffeeStore = (props: PageProps) => {
	const [loading, setLoading] = useState(true);
	const [coffeeStore, setCoffeeStore] = useState<StoreType>();
	const router = useRouter();
	const { state: { coffeeStores } } = useContext(StoreContext);
	const [votes, setVotes] = useState(0);

	const { data: votesRequests } = useSWR(
		router.query.id === undefined ? null : `/api/coffee-stores/get-store-votes?fsq_id=${router.query.id}`,
		(args) => swrFetcher(args)
	);

	const handleStates = async (id: string, img_url?: string | undefined) => {
		try {
			const value = await handleCoffeeStoreRequest(id, img_url);
			if (value) {
				setCoffeeStore(value);
				return setLoading(false);
			}
		} catch (err) {
			console.error(err);
			return setLoading(false);
		}
	}

	useEffect(() => {
		if (!isEmtpy(props) && !props.error) {
			handleCoffeeStoreRequest(props.coffeeStore.fsq_id, props.coffeeStore.url);
			setCoffeeStore(props.coffeeStore);
			return setLoading(false);
		}

		const i = coffeeStores.places.findIndex(cs => cs.fsq_id === router.query.id);
		if (i >= 0)
			handleStates(coffeeStores.places[i].fsq_id, coffeeStores.images[i].url)

		else if (router.query.id)
			handleStates(router.query.id.toString())
	}, [router.query.id, props, coffeeStores]);

	useEffect(() => {
		if (votesRequests && !votesRequests.error)
			setVotes(votesRequests.data.votes)
	}, [votesRequests]);

	if (router.isFallback || loading)
		return (
			<div className="flex justify-center items-center h-screen">
				<h2>Loading</h2>
			</div>
		);

	if (!coffeeStore)
		return (
			<div className="flex justify-center items-center h-screen">
				<h2>Store is not found</h2>
			</div>
		);

	const commend = () =>
		router.query.id && commendStoreRequest(router.query.id.toString()).then(value => value && !value.error && setVotes(value.data));

	return (
		<div className="px-8 pb-8 pt-8 md:pt-12 md:px-12 lg:px-32 grid gap-4 grid-rows-1 md:grid-cols-2 grid-cols-1">
			<div className="md:col-span-2">
				<Link className="text-lg md:text-xl" href="/">
					<div className="flex gap-2 items-center">
						<div className="relative h-6 w-4">
							<Image src={"/static/icons/backArrow.svg"} alt={"home"} fill />
						</div>
						<div>Home</div>
					</div>
				</Link>
				<h1 className="font-bold text-xl md:text-4xl">{coffeeStore.name}</h1>
			</div>
			<div className="flex flex-col gap-1">
				<div className="relative h-80">
					<Image
						className="object-cover rounded-md"
						src={coffeeStore.url}
						alt={`${coffeeStore.name} Photo`}
						fill
					/>
				</div>
			</div>
			<div className="flex flex-col gap-2 rounded-md text-white text-lg px-4 py-4 bg-[#452103]">
				<div className="flex gap-2">
					<div className="relative w-7 h-7">
						<Image src="/static/icons/location.svg" alt="Address icon" fill />
					</div>
					<h3>{coffeeStore.location.locality}</h3>
				</div>
				<div className="flex gap-2">
					<div className="relative w-7 h-7">
						<Image src="/static/icons/navigation.svg" alt="Address icon" fill />
					</div>
					<h3>{coffeeStore.location.formatted_address}</h3>
				</div>
				<div className="flex gap-2">
					<div className="relative w-7 h-7">
						<Image src="/static/icons/star.svg" alt="Address icon" fill />
					</div>
					<h3>{votes}</h3>
				</div>
				<div className="flex justify-end">
					<button
						onClick={commend}
						className="bg-white bg-opacity-20 px-4 rounded-3xl hover:bg-opacity-30 transition-all ease-in hover:scale-105">Commend</button>
				</div>
			</div>
		</div>
	);
};

export default CoffeeStore;
