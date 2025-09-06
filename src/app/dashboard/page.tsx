'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // ...existing code for auth and loading...

  // New Eco-Tech Dashboard UI (with user data)
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header */}
    

      <div className="flex flex-1">
        {/* Sidebar */}
       

        {/* Main Content */}
        <main className="flex-1 p-8 flex flex-col gap-8 bg-black">
          {/* Welcome */}
          <div className="bg-orange-900 rounded-2xl shadow p-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Eco Hero!</h1>
              <p className="text-orange-200">Let’s make a difference today. Track your impact and earn rewards!</p>
            </div>
            <span className="text-3xl text-green-500 bg-black rounded-full p-2">🤳</span>
          </div>
          {/* Impact Stats & Leaderboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black rounded-2xl shadow p-6 flex flex-col items-center border border-orange-900">
              <span className="text-3xl font-bold text-orange-400 mb-1">{user.points || '1,200,000+'}</span>
              <span className="text-green-500">Plastics Recycled</span>
            </div>
            <div className="bg-black rounded-2xl shadow p-6 flex flex-col items-center border border-orange-900">
              <span className="text-2xl text-green-500 mb-1">🏆</span>
              <span className="text-lg font-semibold text-orange-400">Leaderboard</span>
              <ul className="mt-2 text-orange-200 text-sm">
                <li>1. Priya D. — <span className="font-bold text-orange-400">12,500</span> pts</li>
                <li>2. Rahul S. — <span className="font-bold text-orange-400">11,800</span> pts</li>
                <li>3. Asha K. — <span className="font-bold text-orange-400">10,950</span> pts</li>
              </ul>
            </div>
            <div className="bg-black rounded-2xl shadow p-6 flex flex-col items-center border border-orange-900">
              <span className="text-2xl text-orange-400 mb-1">🎁</span>
              <span className="text-lg font-semibold text-orange-400">Rewards</span>
              <div className="flex gap-2 mt-2">
                <span className="bg-orange-900 text-orange-200 px-3 py-1 rounded-full text-xs font-semibold">Eco Badge</span>
                <span className="bg-green-500 text-black px-3 py-1 rounded-full text-xs font-semibold">Tokens</span>
              </div>
            </div>
          </div>
          {/* Community Hub & Marketplace */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black rounded-2xl shadow p-6 border border-orange-900">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl text-green-500">🗺️</span>
                <span className="text-lg font-bold text-orange-400">Nearby NGO Drives</span>
              </div>
              <ul className="text-orange-200 text-sm mt-2">
                <li>GreenEarth Collection — 2.1 km away</li>
                <li>CleanFuture Drive — 3.4 km away</li>
                <li>EcoCSR Event — 5.0 km away</li>
              </ul>
            </div>
            <div className="bg-black rounded-2xl shadow p-6 border border-orange-900">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl text-orange-400">🛒</span>
                <span className="text-lg font-bold text-orange-400">Eco Marketplace</span>
              </div>
              <ul className="text-orange-200 text-sm mt-2">
                <li>Bamboo Toothbrush — 50 tokens</li>
                <li>Reusable Bag — 30 tokens</li>
                <li>Plantable Pencils — 20 tokens</li>
              </ul>
            </div>
          </div>
          {/* Profile Card */}
          <div className="flex justify-end">
            <div className="bg-black rounded-2xl shadow p-6 flex items-center gap-4 w-full max-w-xs border border-orange-900">
              <img src="/profile.jpg" alt="Profile" width={56} height={56} className="rounded-full border-4 border-green-500" />
              <div>
                <span className="block text-lg font-bold text-green-500">{user.name || 'Priya D.'}</span>
                <span className="block text-orange-200 text-sm">Eco Champion</span>
              </div>
              <span className="text-2xl text-orange-400 ml-auto">👤</span>
            </div>
          </div>

          {/* Marketplace Section */}
          <section className="bg-black rounded-2xl shadow p-6 border border-orange-900 mt-8">
            <h2 className="text-xl font-bold text-orange-400 mb-4">Marketplace</h2>
            <p className="text-orange-200 mb-2">Browse and purchase eco-friendly products from verified vendors.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-orange-900 rounded-xl p-4 flex flex-col items-center">
                <span className="text-green-500 font-bold">Bamboo Toothbrush</span>
                <span className="text-orange-200 text-sm">50 tokens</span>
              </div>
              <div className="bg-orange-900 rounded-xl p-4 flex flex-col items-center">
                <span className="text-green-500 font-bold">Reusable Bag</span>
                <span className="text-orange-200 text-sm">30 tokens</span>
              </div>
              <div className="bg-orange-900 rounded-xl p-4 flex flex-col items-center">
                <span className="text-green-500 font-bold">Plantable Pencils</span>
                <span className="text-orange-200 text-sm">20 tokens</span>
              </div>
            </div>
          </section>

          {/* Connect Vendors Section */}
          <section className="bg-black rounded-2xl shadow p-6 border border-orange-900 mt-8">
            <h2 className="text-xl font-bold text-green-500 mb-4">Connect Vendors</h2>
            <p className="text-orange-200 mb-2">Partner with local eco-vendors to expand your sustainable impact.</p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-orange-900 rounded-xl p-4 flex flex-col items-center min-w-[160px]">
                <span className="text-green-500 font-bold">EcoMart</span>
                <span className="text-orange-200 text-sm">Organic & Recycled Goods</span>
              </div>
              <div className="bg-orange-900 rounded-xl p-4 flex flex-col items-center min-w-[160px]">
                <span className="text-green-500 font-bold">GreenVendors</span>
                <span className="text-orange-200 text-sm">Local Sustainable Brands</span>
              </div>
            </div>
          </section>

          {/* Gesture Control Section */}
          <section className="bg-black rounded-2xl shadow p-6 border border-orange-900 mt-8">
            <h2 className="text-xl font-bold text-orange-400 mb-4">Gesture Control</h2>
            <p className="text-orange-200 mb-2">Control dashboard features with hand gestures (coming soon!).</p>
            <div className="flex items-center gap-4">
              <span className="text-3xl text-green-500 bg-black rounded-full p-2">🤳</span>
              <span className="text-orange-200">Enable your camera to use gesture controls for a futuristic experience.</span>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
