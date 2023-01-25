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
					<div className="relative w-20 h-6">
						<Image
							src="/vercel.svg"
							alt="Vercel Logo"
							fill
							className="object-contain"
						/>
					</div>
				</a>
			</div>
		</footer>
	);
};

export default Footer;
