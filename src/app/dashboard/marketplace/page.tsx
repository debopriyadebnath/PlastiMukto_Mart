"use client";

import { useState } from "react";
import Image from "next/image";
import { FaLeaf, FaRecycle, FaCoins, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button"; // shadcn button

const products = [
	{
		id: 1,
		name: "Reusable Water Bottle",
		img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
		price: "40 tokens",
		desc: "Eco-friendly stainless steel bottle. ♻️",
		details: "This reusable water bottle is made from high-grade stainless steel, keeps your drinks cold for 24 hours, and helps reduce single-use plastic waste. Dishwasher safe.",
	},
	{
		id: 2,
		name: "Cloth Shopping Bag",
		img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
		price: "20 tokens",
		desc: "Reusable cotton bag for everyday use. 🌱",
		details: "A sturdy, washable cotton bag perfect for groceries and daily errands. Say no to plastic bags and support a greener planet.",
	},
	{
		id: 3,
		name: "Bamboo Straws",
		img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
		price: "15 tokens",
		desc: "Pack of 5 biodegradable bamboo straws. ♻️",
		details: "Enjoy your drinks with these natural, biodegradable bamboo straws. Comes with a cleaning brush and a cotton pouch.",
	},
	{
		id: 4,
		name: "Recycled Notebook",
		img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
		price: "10 tokens",
		desc: "Notebook made from 100% recycled paper. 💰",
		details: "A5 size, 80 pages. Perfect for notes, sketches, and journaling. Made entirely from post-consumer recycled paper.",
	},
];

export default function MarketplaceDashboard() {
	const [selected, setSelected] = useState<null | typeof products[0]>(null);

	return (
		<div className="min-h-screen bg-black/95 py-10 px-4">
			{/* Banner */}
			<div className="max-w-4xl mx-auto mb-10">
				<div className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-700 via-black to-orange-600 rounded-2xl shadow-lg py-6 px-4">
					<FaLeaf className="text-green-400 text-3xl" />
					<h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
						Eco Marketplace –{" "}
						<span className="text-orange-400">
							Shop Green, Earn Rewards
						</span>
					</h1>
					<FaRecycle className="text-green-400 text-3xl" />
				</div>
			</div>
			{/* Product Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
				{products.map((product) => (
					<button
						key={product.id}
						className="bg-black rounded-2xl shadow-lg border-2 border-green-700 flex flex-col overflow-hidden hover:scale-105 transition-transform text-left"
						onClick={() => setSelected(product)}
						aria-label={`View details for ${product.name}`}
						type="button"
					>
						<div className="relative w-full h-48 bg-green-950">
							<Image
								src={product.img}
								alt={product.name}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 33vw"
								priority
							/>
						</div>
						<div className="flex-1 flex flex-col p-5">
							<h2 className="text-lg font-bold text-green-400 mb-1 flex items-center gap-2">
								{product.name}
								<span>
									{product.desc.includes("♻️") && (
										<FaRecycle className="inline text-green-500" />
									)}
									{product.desc.includes("🌱") && (
										<FaLeaf className="inline text-green-500" />
									)}
									{product.desc.includes("💰") && (
										<FaCoins className="inline text-orange-400" />
									)}
								</span>
							</h2>
							<p className="text-green-200 mb-3 flex-1">
								{product.desc.replace(/[♻️🌱💰]/g, "")}
							</p>
							<div className="flex items-center justify-between mt-auto">
								<span className="bg-orange-500 text-black px-3 py-1 rounded-full text-xs font-semibold shadow">
									{product.price}
								</span>
								<Button className="bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg shadow">
									Buy Now
								</Button>
							</div>
						</div>
					</button>
				))}
			</div>
			{/* Product Modal */}
			{selected && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
					<div className="bg-black rounded-2xl shadow-2xl border-2 border-green-700 max-w-md w-full p-6 relative">
						<button
							className="absolute top-4 right-4 text-orange-400 hover:text-orange-600 text-2xl"
							onClick={() => setSelected(null)}
							aria-label="Close"
							type="button"
						>
							<FaTimes />
						</button>
						<div className="relative w-full h-56 rounded-xl overflow-hidden mb-4 bg-green-950">
							<Image
								src={selected.img}
								alt={selected.name}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 33vw"
								priority
							/>
						</div>
						<h2 className="text-2xl font-bold text-green-400 mb-2 flex items-center gap-2">
							{selected.name}
							{selected.desc.includes("♻️") && (
								<FaRecycle className="inline text-green-500" />
							)}
							{selected.desc.includes("🌱") && (
								<FaLeaf className="inline text-green-500" />
							)}
							{selected.desc.includes("💰") && (
								<FaCoins className="inline text-orange-400" />
							)}
						</h2>
						<p className="text-green-200 mb-2">
							{selected.desc.replace(/[♻️🌱💰]/g, "")}
						</p>
						<p className="text-orange-200 mb-4">{selected.details}</p>
						<div className="flex items-center justify-between">
							<span className="bg-orange-500 text-black px-4 py-2 rounded-full text-sm font-semibold shadow">
								{selected.price}
							</span>
							<Button className="bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg shadow">
								Buy Now
							</Button>
						</div>
					</div>
				</div>
			)}
			{/* Subtle eco accents */}
			<div className="fixed bottom-4 right-4 opacity-30 pointer-events-none select-none">
				<FaLeaf className="text-green-500 text-7xl" />
			</div>
			<div className="fixed top-4 left-4 opacity-20 pointer-events-none select-none">
				<FaRecycle className="text-orange-500 text-6xl" />
			</div>
		</div>
	);
}
