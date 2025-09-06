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
        quantity: 120,
        price: "25 tokens",
      },
      {
        name: "Bamboo Bottle",
        img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=100&q=80",
        quantity: 80,
        price: "40 tokens",
      },
      {
        name: "Recycled Craft",
        img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=100&q=80",
        quantity: 60,
        price: "30 tokens",
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
        quantity: 200,
        price: "10 tokens",
      },
      {
        name: "Plantable Pencil",
        img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=100&q=80",
        quantity: 150,
        price: "8 tokens",
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
        quantity: 90,
        price: "12 tokens",
      },
      {
        name: "Eco Basket",
        img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=100&q=80",
        quantity: 40,
        price: "35 tokens",
      },
    ],
  },
];

const tagColors: Record<string, string> = {
  "Eco-Friendly": "bg-green-100 text-green-700",
  Recycled: "bg-pink-100 text-pink-700",
  "Verified NGO": "bg-lavender-100 text-purple-700 border border-purple-300",
};

export default function VendorsDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50 py-12 px-4">
      {/* Banner */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 drop-shadow mb-2">
          🌿 Our Eco Vendors
        </h1>
        <p className="text-pink-600 italic font-medium">
          Partnering for a <span className="text-green-600">Plastic-Free Future</span>
        </p>
      </div>

      {/* Vendor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white rounded-2xl shadow-md border-2 border-pink-200 hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col items-center p-6 gap-4"
          >
            {/* Vendor Profile */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-20 h-20 mb-2">
                <Image
                  src={vendor.logo}
                  alt={vendor.name}
                  fill
                  className="rounded-full border-4 border-green-400 object-cover"
                  sizes="80px"
                  priority
                />
              </div>
              <span className="text-lg font-bold text-green-700 flex items-center gap-2 drop-shadow">
                {vendor.name}
                <FaLeaf className="text-green-500" />
              </span>
              <span className="flex items-center gap-1 text-pink-600 font-semibold">
                {vendor.rating}
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.round(vendor.rating)
                        ? "text-pink-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {vendor.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-1 rounded-full text-xs font-semibold shadow ${tagColors[tag] || "bg-green-100 text-green-700"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Vendor Products */}
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              {vendor.products.map((product, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center bg-pink-50 rounded-xl p-3 shadow border border-green-100 min-w-[110px]"
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
                  <span className="text-xs text-green-700 font-semibold">
                    {product.name}
                  </span>
                  <span className="text-xs text-pink-600 mt-1">
                    Qty: {product.quantity}
                  </span>
                  <span className="text-xs text-green-500 mt-1 font-medium">
                    {product.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg shadow flex items-center gap-2">
                <FaShoppingBasket className="text-lg" /> View Shop
              </Button>
              <Button
                variant="outline"
                className="border-green-400 text-green-600 hover:bg-green-100 font-bold rounded-lg shadow"
              >
                Contact Vendor
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
