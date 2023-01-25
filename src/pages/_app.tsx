import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/footer";
import { Mukta } from "@next/font/google";

const mukta = Mukta({
  weight: ["400", "700", "600"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`bg-white text-[#452103] ${mukta.className}`}>
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
