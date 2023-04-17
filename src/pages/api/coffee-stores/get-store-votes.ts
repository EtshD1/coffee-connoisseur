import { FieldSet } from "airtable";
import { NextApiHandler } from "next";
import { getRecordFields } from "../../../lib/API/Airtable";
import getAirtableCoffeeStore from "../../../lib/API/Airtable/getAirTableCoffeeStore";

const getStoreVotes: NextApiHandler<IResponse<FieldSet>> = async (req, res) => {
	if (req.method !== "GET")
		res.status(405).json({
			error: true,
			message: "Method not allowed"
		});

	const { fsq_id } = req.query

	if (!fsq_id)
		return res.status(400).json({
			error: true,
			message: "Invalid fsq_id."
		});

	const records = await getAirtableCoffeeStore(fsq_id.toString(), ["votes"]);

	if (records.length === 0)
		return res.status(404).json({
			error: true,
			message: "Store not found."
		});

	return res.json({
		error: false,
		message: "Store Found.",
		data: getRecordFields(records)[0]
	});
}

export default getStoreVotes;
