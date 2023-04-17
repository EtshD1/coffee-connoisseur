import coffeeStoreTable from ".";

const commendAirTableCoffeeStore = async (id: string, votes: number) => {
	try {
		const record = await coffeeStoreTable
			.update(id, {
				votes: votes + 1
			});

		return record.fields.votes as number;
	} catch (error) {
		console.log(error);
		return false;
	}
}

export default commendAirTableCoffeeStore;
