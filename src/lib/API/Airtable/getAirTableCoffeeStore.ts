import { FieldSet } from "airtable";
import { QueryParams } from "airtable/lib/query_params";
import coffeeStoreTable from ".";

const getAirtableCoffeeStore = async (id: string, fields?: (number | string)[]) => {
	const params: QueryParams<FieldSet> = {
		view: "Grid view",
		filterByFormula: `{fsq_id} = '${id}'`,
	};
	fields && (params.fields = fields);

	const records = await coffeeStoreTable
		.select(params).firstPage();

	return records;
}

export default getAirtableCoffeeStore;
