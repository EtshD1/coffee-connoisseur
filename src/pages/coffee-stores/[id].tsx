import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { CairoPlaces } from "../../lib/foursquare_api";

interface ICoffeeStore {
	id: number;
	name: string;
	imgUrl: string;
	websiteUrl: string;
	address: string;
	neighbourhood: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const coffeeStoreData = await CairoPlaces();
	return {
		paths: coffeeStoreData.results.map((_) => ({ params: { id: _.fsq_id } })),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{
	coffeeStore: FoursquarePlace | undefined;
}> = async ({ params }) => {
	const { results } = await CairoPlaces();
	if (params) {
		const coffeeStore = results.find(
			(_) => _.fsq_id === params.id
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
	coffeeStore: FoursquarePlace | undefined;
}) => {
	if (coffeeStore) {
		const { name, location } = coffeeStore;

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
					<h1 className="font-bold text-xl md:text-4xl">{name}</h1>
				</div>
				<div className="flex flex-col gap-1">
					<div className="relative h-80">
						<Image
							className="object-cover rounded-md"
							src="https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
							alt={`${name} Photo`}
							fill
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2 rounded-md text-white text-lg px-4 py-4 bg-[#452103]">
					<div className="flex gap-2">
						<div className="relative w-7 h-7">
							<Image src="/static/icons/location.svg" alt="Address icon" fill />
						</div>
						<h3>{location.locality}</h3>
					</div>
					<div className="flex gap-2">
						<div className="relative w-7 h-7">
							<Image src="/static/icons/navigation.svg" alt="Address icon" fill />
						</div>
						<h3>{location.formatted_address}</h3>
					</div>
					<div className="flex gap-2">
						<div className="relative w-7 h-7">
							<Image src="/static/icons/star.svg" alt="Address icon" fill />
						</div>
						<h3>3</h3>
					</div>
					<div className="flex justify-end">
						<button className="bg-white bg-opacity-20 px-4 rounded-3xl hover:bg-opacity-30 transition-all ease-in hover:scale-105">Commend</button>
					</div>
				</div>
			</div>
		);
	}

	return <div>Store not found</div>;
};

export default CoffeeStore;
