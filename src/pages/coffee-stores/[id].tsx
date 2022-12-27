import Link from "next/link";
import { useRouter } from "next/router";

const CoffeeStore = () => {
    const { query } = useRouter();
    const { id } = query;

    return <div>
        <nav>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                    <Link href="/">Stores</Link>
                </li>
            </ul>
        </nav>
        <h1>Welcome to our {id} Coffee Store!</h1>
    </div>
}

export default CoffeeStore;
