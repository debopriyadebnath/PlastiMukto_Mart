
import { FaHome, FaGift, FaUsers, FaUser, FaCamera, FaMapMarkedAlt } from 'react-icons/fa';
import { MdLeaderboard } from 'react-icons/md';
import Image from 'next/image';

// Top header component
function DashboardHeader() {
  return (
    <header className="w-full flex items-center justify-between bg-black shadow-sm px-8 py-4 mb-6">
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="PlastiMukti Mart Logo" width={40} height={40} className="rounded-full border-2 border-green-500" />
          <span className="flex flex-col">
            <span className="text-xl font-bold text-green-500">PlastiMukti Mart</span>
            <span className="text-xs text-orange-400 font-semibold tracking-wide">(plastic free marketplace)</span>
          </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-orange-500 font-semibold">Eco-Tech Dashboard</span>
      </div>
    </header>
  );
}

const navItems = [
  { label: 'Home', icon: <FaHome className="text-orange-500" /> },
  { label: 'Rewards', icon: <FaGift className="text-orange-500" /> },
  { label: 'Community Hub', icon: <FaUsers className="text-orange-500" /> },
  { label: 'Marketplace', icon: <FaGift className="text-green-500" /> },
  { label: 'Connect Vendors', icon: <FaUsers className="text-green-500" /> },
  { label: 'Gesture Control', icon: <FaCamera className="text-orange-500" /> },
  { label: 'Profile', icon: <FaUser className="text-orange-500" /> },
];


export default function Dashboard() {
  return (
  <div className="min-h-screen flex flex-col bg-black">
      <DashboardHeader />
      <div className="flex flex-1">
        {/* Sidebar */}
  <aside className="w-64 bg-black shadow-lg flex flex-col items-center py-8 px-4 rounded-tr-3xl rounded-br-3xl border-r-2 border-orange-500">
          <div className="flex items-center gap-3 mb-10">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-500">
              {/* Green recycle icon */}
              <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><circle cx="14" cy="14" r="14" fill="#22C55E"/><path d="M8 14l6-6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 18h12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
            <span className="text-2xl font-bold text-green-500">PlastiMukti Mart</span>
          </div>
          <nav className="flex flex-col gap-4 w-full">
            {navItems.map((item) => (
              <button key={item.label} className="flex items-center gap-3 px-4 py-3 rounded-lg text-orange-500 font-semibold hover:bg-orange-900 hover:text-white transition">
                {item.icon}
                {item.label}
              </button>
            ))}
            </nav>
            <span className="flex flex-col">
              <span className="text-2xl font-bold text-green-500">PlastiMukti Mart</span>
              <span className="text-xs text-orange-400 font-semibold tracking-wide">(plastic free marketplace)</span>
            </span>
                      <span className="flex flex-col">
                        <span className="text-2xl font-bold text-green-500">PlastiMukti Mart</span>
                        <span className="text-xs text-orange-400 font-semibold tracking-wide">(plastic free marketplace)</span>
                      </span>
        </aside>
        {/* Main Content */}
  <main className="flex-1 p-8 flex flex-col gap-8 bg-black">
          {/* Welcome */}
          <div className="bg-orange-900 rounded-2xl shadow p-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Eco Hero!</h1>
              <p className="text-orange-200">Let’s make a difference today. Track your impact and earn rewards!</p>
            </div>
            <FaCamera className="text-3xl text-green-500 bg-black rounded-full p-2" />
          </div>
          {/* Impact Stats & Leaderboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black rounded-2xl shadow p-6 flex flex-col items-center border border-orange-900">
              <span className="text-3xl font-bold text-orange-400 mb-1">1,200,000+</span>
              <span className="text-green-500">Plastics Recycled</span>
            </div>
            <div className="bg-black rounded-2xl shadow p-6 flex flex-col items-center border border-orange-900">
              <MdLeaderboard className="text-2xl text-green-500 mb-1" />
              <span className="text-lg font-semibold text-orange-400">Leaderboard</span>
              <ul className="mt-2 text-orange-200 text-sm">
                <li>1. Priya D. — <span className="font-bold text-orange-400">12,500</span> pts</li>
                <li>2. Rahul S. — <span className="font-bold text-orange-400">11,800</span> pts</li>
                <li>3. Asha K. — <span className="font-bold text-orange-400">10,950</span> pts</li>
              </ul>
            </div>
            <div className="bg-black rounded-2xl shadow p-6 flex flex-col items-center border border-orange-900">
              <FaGift className="text-2xl text-orange-400 mb-1" />
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
                <FaMapMarkedAlt className="text-xl text-green-500" />
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
                <FaGift className="text-xl text-orange-400" />
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
              <Image src="/profile.jpg" alt="Profile" width={56} height={56} className="rounded-full border-4 border-green-500" />
              <div>
                <span className="block text-lg font-bold text-green-500">Priya D.</span>
                <span className="block text-orange-200 text-sm">Eco Champion</span>
              </div>
              <FaUser className="text-2xl text-orange-400 ml-auto" />
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
              <FaCamera className="text-3xl text-green-500 bg-black rounded-full p-2" />
              <span className="text-orange-200">Enable your camera to use gesture controls for a futuristic experience.</span>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
