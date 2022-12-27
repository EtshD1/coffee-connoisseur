const Banner = () => {
	const buttonClick = () => {
		console.log("Hello!");
	};

	return (
		<div className="px-8 pt-10 flex flex-col gap-4 md:pt-32 md:px-32 md:grid md:grid-cols-4">
			<h1 className="flex flex-col font-bold md:gap-6 text-4xl md:text-7xl md:col-span-3">
				<span className="text-[#7c4f3f]">Coffee</span>
				<span>Connoisseur</span>
			</h1>
            <div className="flex flex-col gap-4">
                <p className="text-xl md:text-lg text-[#452103]">Discover nearby local Coffee Shops with lots of options to explore! Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>
                <div>
                    <button className="px-4 py-2 font-bold text-white bg-[#7c4f3f] w-full" onClick={buttonClick}>View Stores nearby!</button>
                </div>
			</div>
		</div>
	);
};

export default Banner;
