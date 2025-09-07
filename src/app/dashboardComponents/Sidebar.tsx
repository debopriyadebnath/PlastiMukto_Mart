'use client';

import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="w-64 bg-gradient-to-b from-pink-100 via-white to-green-50 shadow-lg flex flex-col items-center py-8 px-4 rounded-tr-3xl rounded-br-3xl border-r-4 border-green-400">
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-8">
        <img src={"/logo.png"} className="text-2xl font-bold text-green-500 " />
       
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4 w-full">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-green-600 font-semibold bg-white hover:bg-pink-200 hover:text-pink-900 transition shadow-sm"
        >
          <span>🏠</span> Home
        </button>
        <button
          onClick={() => router.push('/dashboard/rewards')}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-green-600 font-semibold bg-white hover:bg-pink-200 hover:text-pink-900 transition shadow-sm"
        >
          <span>🎁</span> Rewards
        </button>
        <button
          onClick={() => router.push('/dashboard/community')}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-green-600 font-semibold bg-white hover:bg-pink-200 hover:text-pink-900 transition shadow-sm"
        >
          <span>👥</span> Community Hub
        </button>
        <button
          onClick={() => router.push('/dashboard/marketplace')}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-green-700 font-bold bg-pink-50 hover:bg-green-200 hover:text-green-900 transition shadow-sm"
        >
          <span>🛒</span> Marketplace
        </button>
        <button
          onClick={() => router.push('/dashboard/vendors')}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-green-700 font-bold bg-pink-50 hover:bg-green-200 hover:text-green-900 transition shadow-sm"
        >
          <span>🏪</span> Connect Vendors
        </button>
        <button
          onClick={() => router.push('/dashboard/leaderboard')}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-green-600 font-semibold bg-white hover:bg-pink-200 hover:text-pink-900 transition shadow-sm"
        >
          <span>🤳</span> leaderboard
        </button>
        <button
          onClick={() => router.push('/dashboard/profile')}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-green-600 font-semibold bg-white hover:bg-pink-200 hover:text-pink-900 transition shadow-sm"
        >
          <span>👤</span> Profile
        </button>
      </nav>

      {/* Footer Branding */}
      <span className="flex flex-col mt-10 text-center">
        <span className="text-2xl font-extrabold text-pink-600 drop-shadow-md tracking-wide">
          PlastiMukti Mart
        </span>
        <span className="text-xs text-green-500 font-semibold italic tracking-widest">
          (Plastic-Free Marketplace)
        </span>
      </span>
    </aside>
  );
};

export default Sidebar;