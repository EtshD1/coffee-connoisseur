import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Banner from "../components/banner";
import CoffeeStoresList from "../components/layout";
import useUserLocation from "../hooks/use-user-location";
import { GetCoffeeStores } from "../lib/API";

export const getStaticProps: GetStaticProps<CoffeeStoresProps> = async () => {
	const data = await GetCoffeeStores();

	if (data.error)
		return {
			props: {
				error: true,
				info: data.info,
			},
		}

	return {
		props: {
			error: false,
			info: "ok!",
			coffeeStores: {
				images: data.Response.images,
				places: data.Response.places
			}
		}
	};
};

const Home = (props: CoffeeStoresProps) => {
	const [coords, status, info, findLocation] = useUserLocation();
	const [coffeeStores, setCoffeeStores] = useState<CoffeeStores>();

	useEffect(() => {
		if (coords && status === "Done") {
			fetch(`/api/coffee-stores?latitude=${coords.latitude}&longitude=${coords.longitude}`)
				.then(res => res.json())
				.then((data: CoffeeStoresProps) => {
					if (!data.error) {
						setCoffeeStores(data.coffeeStores)
					}
				});
		}
	}, [coords, status]);

	return (
		<div>
			<Head>
				<title>Coffee Connoisseur</title>
				<meta name="description" content="Coffee Connoisseur" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Banner ErrorMsg={status === "Error" ? info : null} GetUserLocation={findLocation} />
			{coffeeStores ? <CoffeeStoresList
				heading="Places near you"
				items={coffeeStores.places.map((_, i) => ({
					id: _.fsq_id,
					name: _.name,
					imgHref: coffeeStores.images[i % coffeeStores.images.length].url
				}))} /> : ""}
			{props.error ?
				<></>
				: <CoffeeStoresList
					heading="Tronto Stores"
					items={props.coffeeStores.places.map((_, i) => ({
						id: _.fsq_id,
						name: _.name,
						imgHref: props.coffeeStores.images[i % props.coffeeStores.images.length].url
					}))}
				/>
			}
		</div>
	);
}

export default Home;
