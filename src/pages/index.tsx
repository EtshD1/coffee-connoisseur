import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Coffee Connoisseur</title>
				<meta
					name="description"
					content="Coffee Connoisseur"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="h-screen">
				<Banner />
			</main>
		</div>
	);
}
