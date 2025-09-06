'use client';

import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="w-64 bg-black shadow-lg flex flex-col items-center py-8 px-4 rounded-tr-3xl rounded-br-3xl border-r-2 border-orange-500">
    <div className="flex items-center gap-3 ">
      
      <span className="text-2xl font-bold text-green-500"></span>
    </div>
    <nav className="flex flex-col gap-4 w-full">
      <button onClick={() => router.push('/dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-orange-500 font-semibold hover:bg-orange-900 hover:text-white transition"><span className="text-orange-500">🏠</span>Home</button>
      <button onClick={() => router.push('/dashboard/rewards')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-orange-500 font-semibold hover:bg-orange-900 hover:text-white transition"><span className="text-orange-500">🎁</span>Rewards</button>
      <button onClick={() => router.push('/dashboard/community')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-orange-500 font-semibold hover:bg-orange-900 hover:text-white transition"><span className="text-orange-500">👥</span>Community Hub</button>
      <button onClick={() => router.push('/dashboard/marketplace')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-green-500 font-semibold hover:bg-orange-900 hover:text-white transition"><span className="text-green-500">🛒</span>Marketplace</button>
      <button onClick={() => router.push('/dashboard/vendors')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-green-500 font-semibold hover:bg-orange-900 hover:text-white transition"><span className="text-green-500">🏪</span>Connect Vendors</button>
      <button onClick={() => router.push('/dashboard/gesture')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-orange-500 font-semibold hover:bg-orange-900 hover:text-white transition"><span className="text-orange-500">🤳</span>Gesture Control</button>
      <button onClick={() => router.push('/dashboard/profile')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-orange-500 font-semibold hover:bg-orange-900 hover:text-white transition"><span className="text-orange-500">👤</span>Profile</button>
    </nav>
    <span className="flex flex-col mt-10">
      <span className="text-2xl font-bold text-green-500">PlastiMukti Mart</span>
      <span className="text-xs text-orange-400 font-semibold tracking-wide">(plastic free marketplace)</span>
    </span>
  </aside>
  );
};

export default Sidebar;