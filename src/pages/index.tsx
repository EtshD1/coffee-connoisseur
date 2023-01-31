import Head from "next/head";
import Banner from "../components/banner";
import HomeLayout from "../components/layout";
import { CairoPlaces } from "../lib/foursquare_api";

export const getStaticProps = async () => {
	const data = await CairoPlaces();

	console.log(data);

	return {
		props: { coffeeStores: data.results },
	};
};

export default function Home(props: { coffeeStores: FoursquarePlace[] }) {
	return (
		<div>
			<Head>
				<title>Coffee Connoisseur</title>
				<meta name="description" content="Coffee Connoisseur" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Banner />
			<HomeLayout
				heading="Tronto Stores"
				items={props.coffeeStores.map((_) => ({
					id: _.fsq_id,
					name: _.name,
					imgHref: "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
				}))}
			/>
		</div>
	);
}
