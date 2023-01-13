import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const Card = ({ imgURL, alt, id, title }: { title: string; id: number; alt: string; imgURL: string }) => {
    const [dots, setDots] = useState(false);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const titleContainerRef = useRef<HTMLDivElement>(null);

    const memoizedCallback = useCallback(() => {
        if (titleRef.current !== null
            && titleContainerRef.current !== null
            && titleRef.current.offsetWidth > titleContainerRef.current.offsetWidth) {
            setDots(ps => !ps ? true : ps);
        } else {
            setDots(ps => ps ? false : ps);
        }
    },
        [titleRef, titleContainerRef]);

    useEffect(() => {
        memoizedCallback();
    }, [memoizedCallback]);

    useEffect(() => {
        window.addEventListener("resize", memoizedCallback);
        return () => window.removeEventListener("resize", memoizedCallback);
    }, [memoizedCallback]);

    return (
        <Link href={`/coffee-stores/${id}`}>
            <div className="group bg-orange-100 hover:bg-orange-200 rounded-lg p-4 flex flex-col gap-2 transition-all ease-in border-2 border-solid border-white border-opacity-30 shadow-md">
                <div ref={titleContainerRef} className="overflow-x-hidden transition-all ease-in relative flex">
                    <h2 ref={titleRef} className="whitespace-nowrap group-hover:opacity-100 text-xl md:text-4xl opacity-90 transition-all ease-in">{title}</h2>
                    {dots ? <div className="pl-1 bg-orange-100 group-hover:bg-orange-200 text-xl md:text-4xl transition-all ease-in absolute right-[-1px] ">
                        <span className="group-hover:opacity-100 opacity-90 transition-all ease-in">...</span>
                    </div> : ""}
                </div>
                <div className="relative w-full h-60">
                    <Image className="object-cover rounded-md" fill src={imgURL} alt={alt} />
                </div>
            </div>
        </Link>
    );
}

export default Card;
