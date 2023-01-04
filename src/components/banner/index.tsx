import Link from "next/link";
import Image from "next/image";

const Banner = () => {
    return (
        <div className="px-8 pt-10 flex flex-col gap-4 md:pt-32 md:px-32">
            <div>
                <h1 className="flex flex-col font-bold md:gap-6 text-4xl md:text-7xl md:col-span-3">
                    <div className="text-[#7c4f3f]">Coffee</div>
                    <div>Connoisseur</div>
                </h1>
                <p className="text-lg md:text-lg text-[#452103]">
                    Discover nearby local Coffee Shops with lots of options to explore!
                    Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
                    cillum sint consectetur cupidatat.
                </p>
                <div>
                    <Link href="/coffee-stores">
                        <button className="px-4 py-2 font-bold text-white bg-[#7c4f3f] w-full">
                            View Stores nearby!
                        </button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="relative w-40 h-40">
                    <Image
                        src="/hero-image.svg"
                        alt="A woman enjoying a coffee break"
                        fill
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
