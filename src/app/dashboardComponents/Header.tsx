'use client';

import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full flex items-center justify-between bg-black shadow-sm px-8 py-4 mb-6">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="PlastiMukti Mart Logo" width={40} height={40} className="rounded-full border-2 border-green-500" />
        <span className="flex flex-col">
          <span className="text-xl font-bold text-green-500">PlastiMukto Mart</span>
          <span className="text-xs text-orange-400 font-semibold tracking-wide">(plastic free marketplace)</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-orange-500 font-semibold"></span>
        <span className="text-green-400 font-semibold">{user && user.name ? `Welcome, ${user.name}!` : ''}</span>
        <span className="text-orange-400 font-semibold">{user && user.points ? `${user.points} pts` : ''}</span>
        <button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">Logout</button>
      </div>
    </header>
  );
};

export default Header;