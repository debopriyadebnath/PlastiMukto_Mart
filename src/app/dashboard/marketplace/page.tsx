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

export default function MarketplaceDashboard() {
  const [selected, setSelected] = useState<null | typeof products[0]>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50 py-10 px-4">
      {/* Banner */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-pink-200 via-white to-green-200 rounded-2xl shadow-lg py-6 px-4">
          <FaLeaf className="text-green-600 text-3xl" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-green-700 drop-shadow">
            Eco Marketplace –{" "}
            <span className="text-pink-600 italic">Shop Green, Earn Rewards</span>
          </h1>
          <FaRecycle className="text-green-600 text-3xl" />
        </div>
      </div>

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

      {/* Subtle eco accents */}
      <div className="fixed bottom-4 right-4 opacity-20 pointer-events-none select-none">
        <FaLeaf className="text-green-500 text-7xl" />
      </div>
      <div className="fixed top-4 left-4 opacity-10 pointer-events-none select-none">
        <FaRecycle className="text-pink-500 text-6xl" />
      </div>
    </div>
  );
}
