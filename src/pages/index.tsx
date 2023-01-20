import Head from "next/head";
import Banner from "../components/banner";
import HomeLayout from "../components/layout";
import coffeeStores from "../data/coffee-stores.json";

interface IStores {
    id: number,
    name: string,
    imgUrl: string,
    websiteUrl: string,
    address: string,
    neighbourhood: string
}

export const getStaticProps = () => {
    return {
        props: { coffeeStores }
    }
}

export default function Home(props: { coffeeStores: IStores[] }) {
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
                <HomeLayout heading="Tronto Stores" items={props.coffeeStores.map(_ => ({
                    id: _.id,
                    name: _.name,
                    imgHref: _.imgUrl
                }))} />
            </main>
        </div>
    );
}
