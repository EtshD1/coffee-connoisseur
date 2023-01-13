import Image from "next/image";
import Link from "next/link";

const Card = ({ imgURL, alt, id, title }: { title: string; id: number; alt: string; imgURL: string }) => {
    return (
        <Link href={`/coffee-stores/${id}`}>
            <div>
                <h2 className="text-4xl font-bold">{title}</h2>
                <div className="relative w-full h-60">
                    <Image fill src={imgURL} alt={alt} />
                </div>
            </div>
        </Link>
    );
}

export default Card;
