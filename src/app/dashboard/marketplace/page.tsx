"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FaLeaf, FaRecycle, FaCoins, FaTimes, FaPlusCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const products = [
	{
		id: 1,
		name: "Reusable Water Bottle",
		img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
		price: "40 tokens",
		desc: "Eco-friendly stainless steel bottle. ♻️",
		details:
			"This reusable water bottle is made from high-grade stainless steel, keeps your drinks cold for 24 hours, and helps reduce single-use plastic waste. Dishwasher safe.",
	},
	{
		id: 2,
		name: "Cloth Shopping Bag",
		img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
		price: "20 tokens",
		desc: "Reusable cotton bag for everyday use. 🌱",
		details:
			"A sturdy, washable cotton bag perfect for groceries and daily errands. Say no to plastic bags and support a greener planet.",
	},
	{
		id: 3,
		name: "Bamboo Straws",
		img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
		price: "15 tokens",
		desc: "Pack of 5 biodegradable bamboo straws. ♻️",
		details:
			"Enjoy your drinks with these natural, biodegradable bamboo straws. Comes with a cleaning brush and a cotton pouch.",
	},
	{
		id: 4,
		name: "Recycled Notebook",
		img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
		price: "10 tokens",
		desc: "Notebook made from 100% recycled paper. 💰",
		details:
			"A5 size, 80 pages. Perfect for notes, sketches, and journaling. Made entirely from post-consumer recycled paper.",
	},
];

type DetectedItemLite = { id: string; name: string; category: string };
type WasteAnalysisLite = {
	id: string;
	imageUrl: string;
	imageName: string;
	createdAt?: string;
	confidence?: number | null;
	reuseIdeas?: unknown;
	detectedItems: DetectedItemLite[];
};

type Bounty = {
	id: string;
	title: string;
	idea: string;
	description: string | null;
	rewardTokens: number | null;
	createdAt: string;
	user: { id: string; name: string | null; email: string };
	wasteAnalysis: {
		id: string;
		imageUrl: string;
		imageName: string;
		confidence?: number | null;
		createdAt?: string;
		detectedItems: DetectedItemLite[];
		reuseIdeas?: unknown;
	};
};

export default function MarketplaceDashboard() {
	const [selected, setSelected] = useState<null | typeof products[0]>(null);

	// Backend-connected state
	const [bounties, setBounties] = useState<Bounty[]>([]);
	const [airdropOpen, setAirdropOpen] = useState(false);
	const [analyses, setAnalyses] = useState<WasteAnalysisLite[]>([]);
	const [loadingAnalyses, setLoadingAnalyses] = useState(false);
	const [analysesError, setAnalysesError] = useState<string | null>(null);
	const [selectedAnalysisId, setSelectedAnalysisId] = useState("");

	// Form
	const [title, setTitle] = useState("");
	const [idea, setIdea] = useState("");
	const [rewardTokens, setRewardTokens] = useState<string>("");
	const [description, setDescription] = useState("");

	// Load existing bounties
	const loadBounties = async () => {
		try {
			const res = await fetch("/api/bounties", { credentials: "include" });
			const data = await res.json();
			if (data?.success) setBounties(data.bounties);
		} catch (e) {
			console.error("Load bounties error:", e);
		}
	};
	useEffect(() => {
		loadBounties();
	}, []);

	const resetForm = () => {
		setSelectedAnalysisId("");
		setTitle("");
		setIdea("");
		setRewardTokens("");
		setDescription("");
		setAnalysesError(null);
	};

	// Fetch only current user's analyses when modal opens
	useEffect(() => {
		if (!airdropOpen) return;
		let aborted = false;
		(async () => {
			setLoadingAnalyses(true);
			setAnalysesError(null);
			try {
				const res = await fetch("/api/waste-analysis/history", { credentials: "include" });
				if (!res.ok) throw new Error(`Failed to load analyses (${res.status})`);
				const data = await res.json();
				if (!aborted && data?.success) {
					setAnalyses(
						(data.analyses as any[]).map((a) => ({
							id: a.id,
							imageUrl: a.imageUrl,
							imageName: a.imageName,
							createdAt: a.createdAt,
							confidence: a.confidence ?? null,
							reuseIdeas: a.reuseIdeas,
							detectedItems: a.detectedItems ?? [],
						}))
					);
				}
			} catch (e: any) {
				if (!aborted) setAnalysesError(e?.message || "Failed to load analyses");
			} finally {
				if (!aborted) setLoadingAnalyses(false);
			}
		})();
		return () => {
			aborted = true;
		};
	}, [airdropOpen]);

	const selectedAnalysis = useMemo(
		() => analyses.find((a) => a.id === selectedAnalysisId),
		[analyses, selectedAnalysisId]
	);

	// Build reuse idea options from backend JSON; fallback to item-derived ideas
	const ideaOptions: string[] = useMemo(() => {
		const raw = selectedAnalysis?.reuseIdeas;

		if (Array.isArray(raw) && raw.every((x) => typeof x === "string")) {
			return raw as string[];
		}
		const collectStrings = (val: any): string[] => {
			if (!val) return [];
			if (typeof val === "string") return [val];
			if (Array.isArray(val)) return val.flatMap(collectStrings);
			if (typeof val === "object") return Object.values(val).flatMap(collectStrings);
			return [];
		};
		const fromJson = collectStrings(raw);
		if (fromJson.length > 0) return Array.from(new Set(fromJson)).slice(0, 20);

		const items = selectedAnalysis?.detectedItems ?? [];
		if (items.length === 0) return [];
		const derived = items.map((i) => `Build with ${i.name} (${i.category})`);
		return Array.from(new Set(derived));
	}, [selectedAnalysis]);

	const handleCreateBounty = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedAnalysis || !title || !idea) return;
		try {
			const res = await fetch("/api/bounties", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					wasteAnalysisId: selectedAnalysis.id,
					idea,
					title,
					description,
					rewardTokens: rewardTokens === "" ? null : Number(rewardTokens),
				}),
			});
			const data = await res.json();
			if (data?.success) {
				setBounties((prev) => [data.bounty as Bounty, ...prev]);
				setAirdropOpen(false);
				resetForm();
			}
		} catch (e) {
			console.error("Create bounty error:", e);
		}
	};

	// Close modal with Escape key
	useEffect(() => {
		if (!airdropOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setAirdropOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [airdropOpen]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50 py-10 px-4">
			{/* Banner */}
			<div className="max-w-4xl mx-auto mb-10">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-pink-200 via-white to-green-200 rounded-2xl shadow-lg py-6 px-4">
					<div className="flex items-center justify-center gap-3">
						<FaLeaf className="text-green-600 text-3xl" />
						<h1 className="text-2xl md:text-3xl font-extrabold text-green-700 drop-shadow">
							Eco Marketplace –{" "}
							<span className="text-pink-600 italic">
								Shop Green, Earn Rewards
							</span>
						</h1>
						<FaRecycle className="text-green-600 text-3xl" />
					</div>
					{/* New: Airdrop Bounty button */}
					<Button
						className="bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg shadow flex items-center gap-2"
						type="button"
						onClick={() => setAirdropOpen(true)}
						aria-label="Airdrop Bounty"
					>
						<FaPlusCircle className="text-white" />
						Airdrop Bounty
					</Button>
				</div>
			</div>

			{/* Community Bounties (from backend) */}
			{bounties.length > 0 && (
				<div className="max-w-5xl mx-auto mb-12">
					<h2 className="text-xl font-extrabold text-green-700 mb-4">
						Community Bounties
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
						{bounties.map((b) => (
							<div
								key={b.id}
								className="bg-white rounded-2xl shadow-md border-2 border-green-200 hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col overflow-hidden"
							>
								<div className="relative w-full h-48 bg-green-50">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={b.wasteAnalysis.imageUrl}
										alt={b.wasteAnalysis.imageName || "Bounty image"}
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="flex-1 flex flex-col p-5">
									<h3 className="text-lg font-bold text-green-700 mb-1">
										{b.title}
									</h3>
									<div className="text-pink-700 font-medium mb-2">
										Idea: {b.idea}
									</div>
									{b.description && (
										<p className="text-sm text-gray-600 mb-3">
											{b.description}
										</p>
									)}
									<div className="text-xs text-gray-500 mb-3">
										{b.wasteAnalysis.detectedItems?.length ?? 0} items
										{typeof b.wasteAnalysis.confidence === "number" &&
											` • ${Math.round(b.wasteAnalysis.confidence * 100)}% confidence`}
									</div>
									<div className="mt-auto flex items-center justify-between">
										<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold shadow">
											{b.rewardTokens != null
												? `${b.rewardTokens} tokens`
												: "No reward set"}
										</span>
										<Button className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow">
											View / Claim
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Product Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
				{products.map((product) => (
					<button
						key={product.id}
						className="bg-white rounded-2xl shadow-md border-2 border-pink-200 hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col overflow-hidden text-left"
						onClick={() => setSelected(product)}
						aria-label={`View details for ${product.name}`}
						type="button"
					>
						<div className="relative w-full h-48 bg-pink-50">
							<Image
								src={product.img}
								alt={product.name}
								fill
								className="object-cover rounded-t-2xl"
								sizes="(max-width: 768px) 100vw, 33vw"
								priority
							/>
						</div>
						<div className="flex-1 flex flex-col p-5">
							<h2 className="text-lg font-bold text-green-700 mb-1 flex items-center gap-2">
								{product.name}
								<span>
									{product.desc.includes("♻️") && (
										<FaRecycle className="inline text-green-500" />
									)}
									{product.desc.includes("🌱") && (
										<FaLeaf className="inline text-green-500" />
									)}
									{product.desc.includes("💰") && (
										<FaCoins className="inline text-pink-500" />
									)}
								</span>
							</h2>
							<p className="text-pink-700 mb-3 flex-1 font-medium">
								{product.desc.replace(/[♻️🌱💰]/g, "")}
							</p>
							<div className="flex items-center justify-between mt-auto">
								<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold shadow">
									{product.price}
								</span>
								<Button className="bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg shadow">
									Buy Now
								</Button>
							</div>
						</div>
					</button>
				))}
			</div>

			{/* Product Modal */}
			{selected && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="bg-white rounded-2xl shadow-2xl border-2 border-green-200 max-w-md w-full p-6 relative">
						<button
							className="absolute top-4 right-4 text-pink-500 hover:text-pink-700 text-2xl"
							onClick={() => setSelected(null)}
							aria-label="Close"
							type="button"
						>
							<FaTimes />
						</button>
						<div className="relative w-full h-56 rounded-xl overflow-hidden mb-4 bg-pink-50">
							<Image
								src={selected.img}
								alt={selected.name}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 33vw"
								priority
							/>
						</div>
						<h2 className="text-2xl font-extrabold text-green-700 mb-2 flex items-center gap-2 drop-shadow">
							{selected.name}
							{selected.desc.includes("♻️") && (
								<FaRecycle className="inline text-green-500" />
							)}
							{selected.desc.includes("🌱") && (
								<FaLeaf className="inline text-green-500" />
							)}
							{selected.desc.includes("💰") && (
								<FaCoins className="inline text-pink-500" />
							)}
						</h2>
						<p className="text-pink-700 mb-2 font-medium">
							{selected.desc.replace(/[♻️🌱💰]/g, "")}
						</p>
						<p className="text-green-700 mb-4">{selected.details}</p>
						<div className="flex items-center justify-between">
							<span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold shadow">
								{selected.price}
							</span>
							<Button className="bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg shadow">
								Buy Now
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Floating Airdrop button */}
			<Button
				type="button"
				aria-label="Airdrop Bounty"
				className="fixed bottom-6 right-6 z-50 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow-lg h-12 px-4 flex items-center gap-2"
				onClick={() => setAirdropOpen(true)}
			>
				<FaPlusCircle className="text-white" />
				Airdrop
			</Button>

			{/* Airdrop Bounty Modal (connected to backend) */}
			{airdropOpen && (
				<div
					role="dialog"
					aria-modal="true"
					aria-labelledby="airdrop-title"
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
					onClick={(e) => {
						if (e.target === e.currentTarget) setAirdropOpen(false);
					}}
				>
					<div className="bg-white rounded-2xl shadow-2xl border-2 border-green-200 w-full max-w-lg p-6 relative">
						<button
							className="absolute top-4 right-4 text-pink-500 hover:text-pink-700 text-2xl"
							onClick={() => {
								setAirdropOpen(false);
								resetForm();
							}}
							aria-label="Close"
							type="button"
						>
							<FaTimes />
						</button>

						<h2 id="airdrop-title" className="text-2xl font-extrabold text-green-700 mb-1">
							Airdrop Bounty
						</h2>
						<p className="text-sm text-gray-600 mb-4">
							Choose an analyzed image and a reuse idea from your analysis.
						</p>

						<form onSubmit={handleCreateBounty} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Your analyzed images
								</label>
								{loadingAnalyses ? (
									<div className="text-sm text-gray-600">Loading your analyses…</div>
								) : analysesError ? (
									<div className="text-sm text-red-600">{analysesError}</div>
								) : (
									<select
										className="w-full border rounded-lg p-2"
										value={selectedAnalysisId}
										onChange={(e) => setSelectedAnalysisId(e.target.value)}
										required
									>
										<option value="">Select image</option>
										{analyses.map((a) => (
											<option key={a.id} value={a.id}>
												{a.imageName || a.id}
											</option>
										))}
									</select>
								)}

								{selectedAnalysis && (
									<div className="mt-3 flex items-center gap-3">
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={selectedAnalysis.imageUrl}
											alt={selectedAnalysis.imageName}
											className="w-24 h-24 object-cover rounded border"
										/>
										<div className="text-sm text-gray-600">
											<div className="font-medium">{selectedAnalysis.imageName}</div>
											<div>
												{selectedAnalysis.detectedItems.length} detected items
												{typeof selectedAnalysis.confidence === "number" && (
													<> • {Math.round(selectedAnalysis.confidence * 100)}% confidence</>
												)}
											</div>
											{selectedAnalysis.createdAt && (
												<div>
													{new Date(selectedAnalysis.createdAt).toLocaleString()}
												</div>
											)}
										</div>
									</div>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Reuse Idea
								</label>
								{ideaOptions.length > 0 ? (
									<select
										className="w-full border rounded-lg p-2"
										value={idea}
										onChange={(e) => setIdea(e.target.value)}
										required
										disabled={!selectedAnalysis}
									>
										<option value="">Select a reuse idea</option>
										{ideaOptions.map((opt, i) => (
											<option key={`${opt}-${i}`} value={opt}>
												{opt}
											</option>
										))}
									</select>
								) : (
									<input
										className="w-full border rounded-lg p-2"
										placeholder="Describe the reuse idea"
										value={idea}
										onChange={(e) => setIdea(e.target.value)}
										required
										disabled={!selectedAnalysis}
									/>
								)}
								<p className="text-xs text-gray-500 mt-1">
									Ideas are sourced from your analysis.
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Title
									</label>
									<input
										className="w-full border rounded-lg p-2"
										placeholder="e.g., Build a planter from bottles"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										required
										disabled={!selectedAnalysis}
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Reward (tokens)
									</label>
									<input
										type="number"
										min={0}
										className="w-full border rounded-lg p-2"
										placeholder="e.g., 50"
										value={rewardTokens}
										onChange={(e) => setRewardTokens(e.target.value)}
										disabled={!selectedAnalysis}
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Description
								</label>
								<textarea
									className="w-full border rounded-lg p-2 min-h-[90px]"
									placeholder="What should be built and any constraints"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									disabled={!selectedAnalysis}
								/>
							</div>

							<div className="flex justify-end gap-3">
								<Button
									type="button"
									className="bg-gray-200 text-gray-800 hover:bg-gray-300"
									onClick={() => {
										setAirdropOpen(false);
										resetForm();
									}}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									className="bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg shadow"
									disabled={!selectedAnalysis}
								>
									Create Bounty
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Accents */}
			<div className="fixed bottom-4 right-4 opacity-20 pointer-events-none select-none">
				<FaLeaf className="text-green-500 text-7xl" />
			</div>
			<div className="fixed top-4 left-4 opacity-10 pointer-events-none select-none">
				<FaRecycle className="text-pink-500 text-6xl" />
			</div>
		</div>
	);
}
