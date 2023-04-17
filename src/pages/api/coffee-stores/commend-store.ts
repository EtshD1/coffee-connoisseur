import { NextApiHandler } from "next";
import commendAirTableCoffeeStore from "../../../lib/API/Airtable/commendAirTableCoffeeStore";
import getAirtableCoffeeStore from "../../../lib/API/Airtable/getAirTableCoffeeStore";

const handler: NextApiHandler<IResponse<number>> = async (req, res) => {
	if (req.method !== "POST")
		return res.status(405).json({ error: true, message: "Method not allowed" });

	const { fsq_id } = req.query;

	if (!fsq_id)
		return res.status(400).json({ error: true, message: "Invalid fsq_id" });

	try {
		const records = await getAirtableCoffeeStore(fsq_id.toString(), ["votes"]);

		if (records.length === 0) return res.status(404).json({
			error: true,
			message: "Store not found."
		});

		const record = records[0];

		const newVotes = await commendAirTableCoffeeStore(record.id, record.fields.votes as number);

		return newVotes
			? res.status(200).json({ error: false, message: "Store votes updated", data: newVotes })
			: res.status(404).json({ error: false, message: "Store is not found." });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: true, message: "Server Error" });
	}
}

export default handler;
