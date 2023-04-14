import coffeeStoreTable from ".";

type Props = {
	fsq_id: string,
	name: string,
	address: string
	locality: string,
	img_url: string
}

const createAirTableCoffeeStore = async (params: Props) =>
	await coffeeStoreTable.create([{ fields: { ...params, votes: 0 } }]);

export default createAirTableCoffeeStore;
