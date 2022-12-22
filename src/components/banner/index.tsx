const Banner = () => {
	const buttonClick = () => {
		console.log("Hello!");
	};

	return (
		<div className="pl-32 pt-32 flex flex-col gap-8">
			<h1 className="flex flex-col md:flex-row font-bold gap-6 text-7xl">
				<span className="text-[#b76935]">Coffee</span>
				<span>Connoiseur</span>
			</h1>
			<p className="text-3xl">Discover your local Coffee Shops!</p>
			<div>
				<button className="px-4 py-1 rounded-md text-white bg-[#b76935] border-2 border-solid border-white border-opacity-50" onClick={buttonClick}>View Stores nearby!</button>
			</div>
		</div>
	);
};

export default Banner;
