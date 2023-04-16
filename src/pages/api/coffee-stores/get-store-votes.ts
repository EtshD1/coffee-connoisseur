import { NextApiHandler } from "next";
import getAirtableCoffeeStore from "../../../lib/API/Airtable/getAirTableCoffeeStore";

const getStoreVotes: NextApiHandler = async (req, res) => {
	if (req.method !== "GET")
		res.status(405).json({});

	const { fsq_id } = req.query

	if (!fsq_id)
		return res.status(400).json({
			error: true,
			message: "Invalid fsq_id."
		});

	var record = await getAirtableCoffeeStore(fsq_id.toString(), ["votes"]);

	if (record.length === 0)
		return res.status(404).json({
			error: true,
			message: "Store not found."
		});

	return res.json(record[0]);
}

export default getStoreVotes;
