import Image from "next/image";
import { Button } from "@/components/ui/button"; // shadcn button

const wasteBounties = [
	{
		id: 1,
		title: "Plastic Bottles Cleanup",
		img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
		description: "Help collect and recycle plastic bottles from local parks.",
		reward: "50 tokens",
	},
	{
		id: 2,
		title: "Beach Waste Drive",
		img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
		description:
			"Join the community to clean up plastic and other waste from the beach.",
		reward: "100 tokens",
	},
	{
		id: 3,
		title: "E-Waste Collection",
		img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
		description: "Safely collect and dispose of e-waste in your neighborhood.",
		reward: "80 tokens",
	},
	{
		id: 4,
		title: "Plastic Bag Hunt",
		img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
		description: "Find and collect plastic bags from public spaces.",
		reward: "30 tokens",
	},
];

export default function CommunityDashboard() {
	return (
		<div className="min-h-screen bg-black py-10 px-4">
			<h1 className="text-3xl font-bold text-green-500 mb-8 text-center">
				Community Bounties
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
				{wasteBounties.map((bounty) => (
					<div
						key={bounty.id}
						className="bg-green-950 rounded-2xl shadow-lg border-2 border-green-700 flex flex-col overflow-hidden"
					>
						<div className="relative w-full h-48">
							<Image
								src={bounty.img}
								alt={bounty.title}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 33vw"
								priority
							/>
						</div>
						<div className="flex-1 flex flex-col p-5">
							<h2 className="text-xl font-bold text-green-400 mb-2">
								{bounty.title}
							</h2>
							<p className="text-green-200 mb-3 flex-1">
								{bounty.description}
							</p>
							<div className="flex items-center justify-between mt-auto">
								<span className="bg-black text-orange-400 px-3 py-1 rounded-full text-xs font-semibold">
									{bounty.reward}
								</span>
								<Button className="bg-orange-500 hover:bg-orange-600 text-black font-bold rounded-lg shadow">
									Take Bounty
								</Button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
