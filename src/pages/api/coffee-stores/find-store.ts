import { FieldSet } from "airtable";
import { NextApiHandler } from "next";
import createAirTableCoffeeStore from "../../../lib/API/Airtable/createAirTableCoffeeStore";
import getAirtableCoffeeStore from "../../../lib/API/Airtable/getAirTableCoffeeStore";
import getCoffeeStore from "../../../lib/API/getCoffeeStore";

const findCoffeeStore: NextApiHandler<IResponse<FieldSet>> = async (req, res) => {
	if (req.method !== "POST")
		return res.status(405).json({ error: true, message: "Method not allowed" });

	const { fsq_id, img_url } = req.body;

	if (!fsq_id)
		return res.status(400).json({ error: true, message: "Invalid fsq_id" });

	var record = await getAirtableCoffeeStore(fsq_id);

	if (record.length !== 0) return res.json({
		error: false,
		data: record[0],
		message: "Store found."
	});

	if (!img_url || img_url == "")
		return res.status(400).json({ error: true, message: "Please supply an image" });

	const place = await getCoffeeStore(fsq_id);

	if (place.error || place.data === undefined)
		return res.status(404).json({ error: true, message: "Place is not found" });

	const newCoffeeStore = await createAirTableCoffeeStore({
		fsq_id,
		img_url,
		name: place.data.name,
		address: place.data.location.formatted_address,
		locality: place.data.location.locality
	});

	if (newCoffeeStore.length === 0)
		return res.status(500).json({ error: true, message: "Airtable generating failed." })

	return res.status(200).json({
		error: false,
		data: newCoffeeStore.map(_ => _.fields)[0],
		message: "Store Generated."
	});
}

export default findCoffeeStore;
