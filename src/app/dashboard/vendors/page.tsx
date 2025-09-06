"use client";

import Image from "next/image";
import { FaLeaf, FaRecycle, FaStar, FaShoppingBasket } from "react-icons/fa";
import { Button } from "@/components/ui/button"; // shadcn button

const vendors = [
	{
		id: 1,
		name: "GreenEarth Supplies",
		logo: "https://randomuser.me/api/portraits/men/32.jpg",
		rating: 4.8,
		tags: ["Eco-Friendly", "Recycled", "Verified NGO"],
		products: [
			{
				name: "Cloth Bag",
				img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=100&q=80",
			},
			{
				name: "Bamboo Bottle",
				img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=100&q=80",
			},
			{
				name: "Recycled Craft",
				img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=100&q=80",
			},
		],
	},
	{
		id: 2,
		name: "EcoMart",
		logo: "https://randomuser.me/api/portraits/women/44.jpg",
		rating: 4.6,
		tags: ["Eco-Friendly", "Verified NGO"],
		products: [
			{
				name: "Reusable Straw",
				img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=100&q=80",
			},
			{
				name: "Plantable Pencil",
				img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=100&q=80",
			},
		],
	},
	{
		id: 3,
		name: "Plastic-Free Living",
		logo: "https://randomuser.me/api/portraits/men/65.jpg",
		rating: 4.9,
		tags: ["Recycled", "Verified NGO"],
		products: [
			{
				name: "Recycled Notebook",
				img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=100&q=80",
			},
			{
				name: "Eco Basket",
				img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=100&q=80",
			},
		],
	},
];

const tagColors: Record<string, string> = {
	"Eco-Friendly": "bg-green-600 text-white",
	Recycled: "bg-orange-500 text-black",
	"Verified NGO": "bg-black text-green-400 border border-green-400",
};

export default function VendorsDashboard() {
	return (
		<div className="min-h-screen bg-black/95 py-10 px-4">
			{/* Banner */}
			<div className="max-w-4xl mx-auto mb-10">
				<div className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-700 via-black to-orange-600 rounded-2xl shadow-lg py-6 px-4">
					<FaLeaf className="text-green-400 text-3xl" />
					<h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
						Our Eco Vendors –{" "}
						<span className="text-orange-400">
							Partnering for a Plastic-Free Future
						</span>
					</h1>
					<FaRecycle className="text-green-400 text-3xl" />
				</div>
			</div>
			{/* Vendor Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
				{vendors.map((vendor) => (
					<div
						key={vendor.id}
						className="bg-black rounded-2xl shadow-lg border-2 border-green-700 flex flex-col items-center p-6 gap-4"
					>
						{/* Vendor Profile */}
						<div className="flex flex-col items-center gap-2">
							<div className="relative w-20 h-20 mb-2">
								<Image
									src={vendor.logo}
									alt={vendor.name}
									fill
									className="rounded-full border-4 border-green-500 object-cover"
									sizes="80px"
									priority
								/>
							</div>
							<span className="text-lg font-bold text-green-400 flex items-center gap-2">
								{vendor.name}
								<FaLeaf className="text-green-500" />
							</span>
							<span className="flex items-center gap-1 text-orange-400 font-semibold">
								{vendor.rating}
								{[...Array(5)].map((_, i) => (
									<FaStar
										key={i}
										className={
											i < Math.round(vendor.rating)
												? "text-orange-400"
												: "text-green-900"
										}
									/>
								))}
							</span>
							<div className="flex flex-wrap gap-2 mt-1">
								{vendor.tags.map((tag) => (
									<span
										key={tag}
										className={`px-2 py-1 rounded-full text-xs font-semibold ${
											tagColors[tag] ||
											"bg-green-900 text-white"
										}`}
									>
										{tag}
									</span>
								))}
							</div>
						</div>
						{/* Vendor Products */}
						<div className="flex flex-wrap gap-2 justify-center mt-2">
							{vendor.products.map((product, idx) => (
								<div
									key={idx}
									className="flex flex-col items-center bg-green-950 rounded-xl p-2 shadow border border-green-700"
								>
									<div className="relative w-14 h-14 mb-1">
										<Image
											src={product.img}
											alt={product.name}
											fill
											className="rounded-lg object-cover"
											sizes="56px"
											priority
										/>
									</div>
									<span className="text-xs text-green-200">
										{product.name}
									</span>
								</div>
							))}
						</div>
						{/* Actions */}
						<div className="flex gap-3 mt-4">
							<Button className="bg-orange-500 hover:bg-orange-600 text-black font-bold rounded-lg shadow flex items-center gap-2">
								<FaShoppingBasket className="text-lg" /> View Shop
							</Button>
							<Button
								variant="outline"
								className="border-green-500 text-green-400 hover:bg-green-900 font-bold rounded-lg shadow"
							>
								Contact Vendor
							</Button>
						</div>
					</div>
				))}
			</div>
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
