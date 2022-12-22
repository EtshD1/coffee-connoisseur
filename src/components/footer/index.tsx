import Image from "next/image";

const Footer = () => {
	return (
		<footer className="py-8 border-t-2 border-solid border-[#45210344] flex items-center justify-center gap-4">
			<div>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Made by EtshD1
				</a>
			</div>
			<div>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
					className="flex gap-1"
				>
					Powered by{" "}
					<div className="px-3 py-1 bg-white rounded-md border-2 border-solid border-slate-500">
						<Image
							src="/vercel.svg"
							alt="Vercel Logo"
							width={72}
							height={16}
						/>
					</div>
				</a>
			</div>
		</footer>
	);
};

export default Footer;
