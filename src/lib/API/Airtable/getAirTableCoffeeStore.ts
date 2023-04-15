import coffeeStoreTable, { getRecordFields } from ".";

const getAirtableCoffeeStore = async (id: string) => {
	const records = await coffeeStoreTable
		.select({
			view: "Grid view",
			filterByFormula: `{fsq_id} = '${id}'`
		}).firstPage();

	return getRecordFields(records);
}

export default getAirtableCoffeeStore;
