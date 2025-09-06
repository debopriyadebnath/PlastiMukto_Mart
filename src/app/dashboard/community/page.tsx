"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button"; // shadcn
import EventsSection from "./EventSection";// from the earlier code
import { FaLeaf, FaRecycle } from "react-icons/fa";

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
    img: "https://images.unsplash.com/photo-1526951521990-620dc14c214b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhc3RpYyUyMGJlYWNofGVufDB8fDB8fHww",
    description: "Join the community to clean up plastic and other waste from the beach.",
    reward: "100 tokens",
  },
  {
    id: 3,
    title: "E-Waste Collection",
    img: "https://images.unsplash.com/photo-1561249974-656f51f12487?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2FzdGUlMjBjb2xsZWN0aW9uJTIwY3Jvd2R8ZW58MHx8MHx8fDA%3D",
    description: "Safely collect and dispose of e-waste in your neighborhood.",
    reward: "80 tokens",
  },
  {
    id: 4,
    title: "Plastic Bag Hunt",
    img: "https://images.unsplash.com/photo-1635919763903-c2145a58b45a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBsYXN0aWMlMjBodW50fGVufDB8fDB8fHww",
    description: "Find and collect plastic bags from public spaces.",
    reward: "30 tokens",
  },
];

export default function CommunityDashboard() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50 py-12 px-4">
      {/* Floating Eco Accents */}
      <div className="absolute top-6 left-6 opacity-20 pointer-events-none">
        <FaRecycle className="text-green-400 text-6xl" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-25 pointer-events-none">
        <FaLeaf className="text-pink-400 text-7xl" />
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-green-700 drop-shadow mb-2">
          🌍 Community Bounties
        </h1>
        <p className="text-pink-600 italic font-medium">
          Join eco challenges and earn rewards while making a meaningful impact.
        </p>
      </div>

      {/* Bounties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {wasteBounties.map((bounty) => (
          <div
            key={bounty.id}
            className="bg-white rounded-2xl shadow-md border-2 border-pink-200 hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col overflow-hidden"
          >
            <div className="relative w-full h-48">
              <Image
                src={bounty.img}
                alt={bounty.title}
                fill
                className="object-cover rounded-t-2xl"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex-1 flex flex-col p-5">
              <h2 className="text-xl font-bold text-green-700 mb-2 drop-shadow">
                {bounty.title}
              </h2>
              <p className="text-pink-700 mb-3 flex-1 font-medium">
                {bounty.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold shadow">
                  {bounty.reward}
                </span>
                <Button className="bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg shadow">
                  Take Bounty
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <EventsSection />
    </div>
  );
}
