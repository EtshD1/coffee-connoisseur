import { NextApiResponse, NextApiRequest } from 'next'

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<{ message: string }>
) => {
	const { breed } = req.query;
	return res.status(200).json({
		message: `I love ${breed ? breed : "dogs"}`
	});
}

export default handler;

