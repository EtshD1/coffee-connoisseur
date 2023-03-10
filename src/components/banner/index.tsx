import Image from "next/image";

const Banner = (props: {
	GetUserLocation: () => void;
	ErrorMsg: string | null;
}) => {

	return (
		<>
			<div className="px-8 pt-8 flex flex-col gap-4 md:pt-32 md:px-12 lg:px-32 md:grid md:grid-cols-7 md:grid-rows-2">
				<div className="md:col-span-3">
					<h1 className="flex flex-col font-bold md:gap-6 text-4xl md:text-7xl">
						<div className="text-[#7c4f3f]">Coffee</div>
						<div>Connoisseur</div>
					</h1>
				</div>
				<div className="relative w-full h-[75vw] md:h-full md:col-span-4 md:row-span-2 self-center">
					<Image
						src="/static/hero-image.svg"
						alt="A woman enjoying a coffee break"
						fill
					/>
				</div>
				<div className="md:col-span-3 flex flex-col justify-around">
					<p className="text-lg md:text-lg text-[#452103]">
						Discover nearby local Coffee Shops with lots of options to explore!
						Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
						cillum sint consectetur cupidatat.
					</p>
					<button onClick={props.GetUserLocation} className="px-4 py-2 font-bold text-white bg-[#7c4f3f] w-full md:w-auto md:text-lg md:px-8 md:py-4">
						View Stores nearby!
					</button>
				</div>
			</div>
			{props.ErrorMsg !== null ? <p className="font-bold text-lg text-rose-500 px-8 pt-1 md:pt-2 md:px-12 lg:px-32">{props.ErrorMsg}</p> : ""}
		</>
	);
};

export default Banner;
