import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/footer";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className="bg-white text-[#452103]">
			<Component {...pageProps} />
			<Footer />
		</div>
	);
}
