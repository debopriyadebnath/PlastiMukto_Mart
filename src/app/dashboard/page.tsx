'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-green-50">
        <div className="text-lg text-green-600 font-semibold">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-white to-green-50">
      <main className="flex-1 p-8 flex flex-col gap-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-2xl shadow-md border-2 border-pink-200 p-6 flex items-center justify-between hover:shadow-lg transition">
          <div>
            <h1 className="text-2xl font-extrabold text-green-700 drop-shadow mb-1">
              Welcome back, Eco Hero!
            </h1>
            <p className="text-pink-600 italic font-medium">
              Let’s make a difference today. Track your impact and earn rewards!
            </p>
          </div>
          <span className="text-3xl text-green-600 bg-pink-100 rounded-full p-3">🤳</span>
        </div>

        {/* Impact Stats & Leaderboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border-2 border-green-200 shadow p-6 flex flex-col items-center hover:shadow-lg transition">
            <span className="text-3xl font-bold text-green-700 mb-1">
              {user.points || '1,200,000+'}
            </span>
            <span className="text-pink-600">Plastics Recycled</span>
          </div>
          <div className="bg-white rounded-2xl border-2 border-pink-200 shadow p-6 flex flex-col items-center hover:shadow-lg transition">
            <span className="text-2xl text-green-600 mb-1">🏆</span>
            <span className="text-lg font-semibold text-green-700">Leaderboard</span>
            <ul className="mt-2 text-pink-600 text-sm">
              <li>1. Priya D. — <span className="font-bold text-green-600">12,500</span> pts</li>
              <li>2. Rahul S. — <span className="font-bold text-green-600">11,800</span> pts</li>
              <li>3. Asha K. — <span className="font-bold text-green-600">10,950</span> pts</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl border-2 border-green-200 shadow p-6 flex flex-col items-center hover:shadow-lg transition">
            <span className="text-2xl text-pink-500 mb-1">🎁</span>
            <span className="text-lg font-semibold text-green-700">Rewards</span>
            <div className="flex gap-2 mt-2">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold shadow">
                Eco Badge
              </span>
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold shadow">
                Tokens
              </span>
            </div>
          </div>
        </div>

        {/* Community Hub & Marketplace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border-2 border-green-200 shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl text-green-600">🗺️</span>
              <span className="text-lg font-bold text-green-700">Nearby NGO Drives</span>
            </div>
            <ul className="text-pink-600 text-sm mt-2">
              <li>GreenEarth Collection — 2.1 km away</li>
              <li>CleanFuture Drive — 3.4 km away</li>
              <li>EcoCSR Event — 5.0 km away</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl border-2 border-pink-200 shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl text-pink-500">🛒</span>
              <span className="text-lg font-bold text-green-700">Eco Marketplace</span>
            </div>
            <ul className="text-pink-600 text-sm mt-2">
              <li>Bamboo Toothbrush — 50 tokens</li>
              <li>Reusable Bag — 30 tokens</li>
              <li>Plantable Pencils — 20 tokens</li>
            </ul>
          </div>
        </div>

        {/* Profile Card */}
        <div className="flex justify-end">
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4 w-full max-w-xs border-2 border-green-200 hover:shadow-lg transition">
            <img
              src="/profile.jpg"
              alt="Profile"
              width={56}
              height={56}
              className="rounded-full border-4 border-pink-400"
            />
            <div>
              <span className="block text-lg font-bold text-green-700">{user.name || 'Priya D.'}</span>
              <span className="block text-pink-600 text-sm italic">Eco Champion</span>
            </div>
            <span className="text-2xl text-green-600 ml-auto">👤</span>
          </div>
        </div>

        {/* Marketplace Section */}
        <section className="bg-white rounded-2xl shadow p-6 border-2 border-pink-200 hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-green-700 mb-4 drop-shadow">Marketplace</h2>
          <p className="text-pink-600 mb-2 italic">Browse and purchase eco-friendly products from verified vendors.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-4 flex flex-col items-center border border-green-200">
              <span className="text-green-700 font-bold">Bamboo Toothbrush</span>
              <span className="text-pink-600 text-sm">50 tokens</span>
            </div>
            <div className="bg-green-50 rounded-xl p-4 flex flex-col items-center border border-green-200">
              <span className="text-green-700 font-bold">Reusable Bag</span>
              <span className="text-pink-600 text-sm">30 tokens</span>
            </div>
            <div className="bg-green-50 rounded-xl p-4 flex flex-col items-center border border-green-200">
              <span className="text-green-700 font-bold">Plantable Pencils</span>
              <span className="text-pink-600 text-sm">20 tokens</span>
            </div>
          </div>
        </section>

        {/* Connect Vendors */}
        <section className="bg-white rounded-2xl shadow p-6 border-2 border-green-200 hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-green-700 mb-4 drop-shadow">Connect Vendors</h2>
          <p className="text-pink-600 mb-2">Partner with local eco-vendors to expand your sustainable impact.</p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-pink-50 rounded-xl p-4 flex flex-col items-center min-w-[160px] border border-pink-200">
              <span className="text-green-700 font-bold">EcoMart</span>
              <span className="text-pink-600 text-sm">Organic & Recycled Goods</span>
            </div>
            <div className="bg-pink-50 rounded-xl p-4 flex flex-col items-center min-w-[160px] border border-pink-200">
              <span className="text-green-700 font-bold">GreenVendors</span>
              <span className="text-pink-600 text-sm">Local Sustainable Brands</span>
            </div>
          </div>
        </section>

        {/* Gesture Control */}
        <section className="bg-white rounded-2xl shadow p-6 border-2 border-pink-200 hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-green-700 mb-4">Gesture Control</h2>
          <p className="text-pink-600 mb-2">Control dashboard features with hand gestures (coming soon!).</p>
          <div className="flex items-center gap-4">
            <span className="text-3xl text-green-600 bg-pink-100 rounded-full p-3">🤳</span>
            <span className="text-green-700 font-medium">
              Enable your camera to use gesture controls for a futuristic experience.
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
