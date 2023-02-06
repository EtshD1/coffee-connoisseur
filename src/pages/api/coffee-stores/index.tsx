
import { NextApiResponse, NextApiRequest } from 'next'
import { GetCoffeeStores } from '../../../lib/API';

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<CoffeeStoresProps>
) => {
	const data = await GetCoffeeStores(30, `${req.query.latitude},${req.query.longitude}`);;

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
