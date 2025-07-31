import uuid4 from "uuid4";

export interface ProductsProps {
	id: string;
	nama: string;
	harga: number;
	stok: number;
	diskon: number;
	star: number;
	pict: string;
	category: "Homecraft";
	description: string;
}

export const products: ProductsProps[] = [
	{
		id: uuid4(),
		nama: "Hanging Light",
		harga: 45.0,
		stok: 10,
		diskon: 35.0,
		star: 4,
		pict: "/images/2.jpg",
		category: "Homecraft",
		description:
			"lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
	},
	{
		id: uuid4(),
		nama: "Dust keeper",
		harga: 120.0,
		stok: 20,
		diskon: 110.0,
		star: 4,
		pict: "/images/1.jpg",
		category: "Homecraft",
		description:
			"lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
	},
	{
		id: uuid4(),
		nama: "Multi Trend",
		harga: 200.0,
		stok: 30,
		diskon: 120.0,
		star: 5,
		pict: "/images/2.jpg",
		category: "Homecraft",
		description:
			"lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
	},
	{
		id: uuid4(),
		nama: "Bold Watch",
		harga: 120.0,
		stok: 40,
		diskon: 110.0,
		star: 5,
		pict: "/images/1.jpg",
		category: "Homecraft",
		description:
			"lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
	},
];
