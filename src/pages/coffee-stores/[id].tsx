import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import coffeeStoreData from "../../data/coffee-stores.json";
import Image from "next/image";

interface ICoffeeStore {
	id: number;
	name: string;
	imgUrl: string;
	websiteUrl: string;
	address: string;
	neighbourhood: string;
}

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: coffeeStoreData.map((_) => ({ params: { id: _.id.toString() } })),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{
	coffeeStore: ICoffeeStore | undefined;
}> = ({ params }) => {
	if (params) {
		const coffeeStore = coffeeStoreData.find(
			(_) => _.id.toString() === params.id
		);
		if (coffeeStore) {
			return { props: { coffeeStore } };
		}
	}
	return { props: { coffeeStore: undefined } };
};

const CoffeeStore = ({
	coffeeStore,
}: {
	coffeeStore: ICoffeeStore | undefined;
}) => {
	if (coffeeStore) {
		const { name, imgUrl, address, websiteUrl, neighbourhood } = coffeeStore;

		return (
			<div className="px-8 pb-8 pt-8 md:pt-12 md:px-12 lg:px-32 grid gap-4 grid-rows-1 md:grid-cols-2 grid-cols-1">
				<div className="col-span-2">
					<Link className="text-lg md:text-xl" href="/">Home</Link>
					<h1 className="font-bold text-xl md:text-4xl">{name}</h1>
				</div>
				<div className="flex flex-col gap-1">
					<div className="relative h-80">
						<Image
							className="object-cover rounded-md"
							src={imgUrl}
							alt={`${name} Photo`}
							fill
						/>
					</div>
				</div>
				<div>
					<h1>Welcome to our {name}!</h1>
					<h3>{address}</h3>
					<h3>{neighbourhood}</h3>
					<Link href={websiteUrl}>Page</Link>
				</div>
			</div>
		);
	}

	return <div>Store not found</div>;
};

export default CoffeeStore;
