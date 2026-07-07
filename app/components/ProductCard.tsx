import Link from "next/link";

export type ProductCardProps = {
	href: string;
	title: string;
	price: string;
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
				<div className="relative flex min-h-112 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
					<div className="flex flex-1 items-center justify-center">
						<img
							src={imageSrc}
							alt={title}
							className="max-h-80 w-full max-w-88 object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-[1.02]"
						/>
					</div>

					<div className="mt-6 flex items-end justify-between gap-4">
                        <h3 className="truncate text-[1rem] font-light tracking-[-0.02em] text-stone-900">
                            {title}
                        </h3>
                        <p className="mt-1 text-[0.95rem] font-light tracking-[-0.01em] text-stone-500">
                            {price}
                        </p>
					</div>
				</div>
			</Link>
		</article>
	);
}

