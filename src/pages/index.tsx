import Head from "next/head";
import Banner from "../components/banner";
import Card from "../components/card";
import HomeLayout from "../components/layout";
import coffeeStore from "../data/coffee-stores.json";

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
                <HomeLayout heading="Tronto Stores" items={coffeeStore.map(_ => ({
                    id: _.id,
                    name: _.name,
                    imgHref: _.imgUrl
                }))} />
            </main>
        </div>
    );
}
