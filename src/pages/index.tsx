import { GetStaticProps } from "next";
import Head from "next/head";
import { useContext, useEffect } from "react";
import Banner from "../components/banner";
import CoffeeStoresList from "../components/layout";
import { StoreContext, UpdateCoffeeStores, UpdateLatLong } from "../context/store";
import useUserLocation from "../hooks/use-user-location";
import getCoffeeStores from "../lib/API/getCoffeeStores";

export const getStaticProps: GetStaticProps<IResponse<CoffeeStores>> = async () => {
	const data = await getCoffeeStores();

	if (data.error)
		return {
			props: { message: data.info, error: true, data: undefined },
		}

	return {
		props: {
			error: false,
			message: "ok!",
			data: {
				images: data.Response.images,
				places: data.Response.places
			}
		}
	};
};

const Home = (props: IResponse<CoffeeStores>) => {
	const [status, info, findLocation] = useUserLocation();
	const { dispatch, state } = useContext(StoreContext);

	useEffect(() => {
		state.coords &&
			fetch(`/api/coffee-stores?latitude=${state.coords.latitude}&longitude=${state.coords.longitude}`)
				.then(res => res.json())
				.then((value: IResponse<CoffeeStores>) => {
					if (!value.error && value.data)
						dispatch(UpdateCoffeeStores(value.data))
				})
				.catch(err => console.error(err));
	}, [state.coords, status, dispatch]);

	const handleCoords = () =>
		findLocation()
			.then(_ => dispatch(UpdateLatLong(_)))
			.catch(err => console.error(err));

	return (
		<div>
			<Head>
				<title>Coffee Connoisseur</title>
				<meta name="description" content="Discover nearby coffee Stores in an instant!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Banner ErrorMsg={status === "Error" ? info : null} GetUserLocation={handleCoords} />
			{state.coffeeStores.images.length > 0 ? <CoffeeStoresList
				heading="Places near you"
				items={state.coffeeStores.places.map((_, i) => ({
					id: _.fsq_id,
					name: _.name,
					imgHref: state.coffeeStores.images[i % state.coffeeStores.images.length].url
				}))} /> : ""}
			{props.error || !props.data ?
				<></>
				: <CoffeeStoresList
					heading="Cairo Stores"
					items={props.data.places.map((_, i) => ({
						id: _.fsq_id,
						name: _.name,
						imgHref: props.data!.images[i % props.data!.images.length].url
					}))}
				/>
			}
		</div>
	);
}

export default Home;
