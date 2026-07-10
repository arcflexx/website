import Link from "next/link";

export type ProductCardProps = {
	href: string;
	title: string;
	price: React.ReactNode;
	imageSrc: string;
	className?: string;
};

export function ProductCard({
	href,
	title,
	price,
	imageSrc,
	className = "",
}: ProductCardProps) {
	return (
		<article
			className={`group relative overflow-hidden rounded-none border-none bg-linear-to-br from-white via-stone-100 to-stone-150 shadow-[0_18px_50px_rgba(0,0,0,0.08)] ${className}`}
		>
			<Link href={href} className="block h-full">
				<div className="relative flex flex-col px-3 pb-3 pt-3 sm:px-3 sm:pb-3">
					<div className="flex flex-1 items-center justify-center">
						<img
							src={imageSrc}
							alt={title}
							className="max-h-80 w-full max-w-88 object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.12)]"
						/>
					</div>
					<h3 className="truncate text-[0.9rem] font-light tracking-[-0.02em] text-stone-900 mt-4">
						{title}
					</h3>
					{price}
				</div>
			</Link>
		</article>
	);
}

