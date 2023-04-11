import { NextApiHandler } from 'next'
import getCoffeeStores from '../../../lib/API/getCoffeeStores';

const handler: NextApiHandler<CoffeeStoresProps> = async (req, res) => {
	const data = await getCoffeeStores(27, `${req.query.latitude},${req.query.longitude}`);;

	if (data.error)
		return res.status(200).json({
			error: true,
			info: data.info
		});

	return res.status(200).json({
		error: false,
		info: "OK!",
		coffeeStores: data.Response
	});
}

export default handler;
