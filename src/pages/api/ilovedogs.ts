import { NextApiHandler } from 'next'

const handler: NextApiHandler<{ message: string }> = async (
	req,
	res
) => {
	const { breed } = req.query;
	return res.status(200).json({
		message: `I love ${breed ? breed : "dogs"}`
	});
}

export default handler;

