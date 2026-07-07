export type ProductImage = {
	id: string;
	url: string;
	altText: string | null;
	width: number;
	height: number;
};

export type ProductVariant = {
	id: string;
	title: string;
	availableForSale: boolean;
	price: {
		amount: string;
		currencyCode: string;
	};
	compareAtPrice: {
		amount: string;
		currencyCode: string;
	} | null;
	selectedOptions: Array<{
		name: string;
		value: string;
	}>;
};

export type ProductOption = {
	id: string;
	name: string;
	values: string[];
};

export type Product = {
	id: string;
	title: string;
	handle: string;
	description: string;
	productType: string;
	tags: string[];
	availableForSale: boolean;
	featuredImage: ProductImage | null;
	images: {
		nodes: ProductImage[];
	};
	options: ProductOption[];
	variants: {
		nodes: ProductVariant[];
	};
};

export type ProductQueryData = {
	product?: Product | null;
};

export type ProductResponse = {
	data?: ProductQueryData;
	errors?: Array<{ message: string }>;
};

export function toProduct(response: ProductQueryData | null | undefined): Product | null {
	return response?.product ?? null;
}

