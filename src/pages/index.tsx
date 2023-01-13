import Head from "next/head";
import Banner from "../components/banner";
import Card from "../components/card";

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

			<main className="min-h-screen">
				<Banner />
                <Card title={"Bahlasawi"} id={0} alt={"Image of the Bahlasawi cafe"} imgURL={"/static/hero-image.svg"} />
			</main>
		</div>
	);
}
