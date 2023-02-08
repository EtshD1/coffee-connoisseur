import { GetStaticProps } from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Banner from "../components/banner";
import CoffeeStoresList from "../components/layout";
import { StoreContext, UpdateCoffeeStores, UpdateLatLong } from "../context/store";
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
	const [status, info, findLocation] = useUserLocation();
	const { dispatch, state } = useContext(StoreContext);

	useEffect(() => {
		if (state.coords && status === "Done") {
			fetch(`/api/coffee-stores?latitude=${state.coords.latitude}&longitude=${state.coords.longitude}`)
				.then(res => res.json())
				.then((data: CoffeeStoresProps) => {
					if (!data.error)
						dispatch(UpdateCoffeeStores(data.coffeeStores))
				})
				.catch(err => console.error(err));
		}
	}, [state, status, dispatch]);

	const handleCoords = () => {
		findLocation()
			.then(_ => dispatch(UpdateLatLong(_)))
			.catch(err => console.error(err));
	};

	return (
		<div>
			<Head>
				<title>Coffee Connoisseur</title>
				<meta name="description" content="Coffee Connoisseur" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Banner ErrorMsg={status === "Error" ? info : null} GetUserLocation={handleCoords} />
			{status === "Done" ? <CoffeeStoresList
				heading="Places near you"
				items={state.coffeeStores.places.map((_, i) => ({
					id: _.fsq_id,
					name: _.name,
					imgHref: state.coffeeStores.images[i % state.coffeeStores.images.length].url
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
