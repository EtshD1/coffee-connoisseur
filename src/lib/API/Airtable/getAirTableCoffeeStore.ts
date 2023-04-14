import coffeeStoreTable from ".";

const getAirtableCoffeeStore = async (id: string) => {
	const records = await coffeeStoreTable
		.select({
			view: "Grid view",
			filterByFormula: `{fsq_id} = '${id}'`
		}).firstPage();

	return records.map(r => r.fields);
}

export default getAirtableCoffeeStore;
