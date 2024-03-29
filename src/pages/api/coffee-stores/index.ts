import { NextApiHandler } from 'next'
import getCoffeeStores from '../../../lib/API/getCoffeeStores';

const handler: NextApiHandler<IResponse<CoffeeStores>> = async (req, res) => {
	if (req.method !== "GET")
		return res.status(405).json({error: true, message:"Method not allowed"});

	const data = await getCoffeeStores(27, `${req.query.latitude},${req.query.longitude}`);;

	if (data.error)
		return res.status(400).json({
			message: data.info,
			error: true
		});

	return res.status(200).json({
		message: "OK!",
		error: false,
		data: data.Response
	});
}

export default handler;
