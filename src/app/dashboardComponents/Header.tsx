'use client';

import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full flex items-center justify-between bg-stone shadow-sm px-8 py-4 mb-6">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="PlastiMukti Mart Logo" width={40} height={40} className="rounded-full border-2 border-olive" />
        <span className="flex flex-col">
          <span className="text-xl font-bold text-olive">PlastiMukto Mart</span>
          <span className="text-xs text-terracotta font-semibold tracking-wide">(plastic free marketplace)</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-terracotta font-semibold"></span>
        <span className="text-olive font-semibold">{user && user.name ? `Welcome, ${user.name}!` : ''}</span>
        <span className="text-terracotta font-semibold">{user && user.points ? `${user.points} pts` : ''}</span>
        <button 
          onClick={logout} 
          className="bg-terracotta hover:bg-lavender text-cream px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;