'use client';

import { useAuth } from '@/contexts/AuthContext';
import { CoinsIcon, UserIcon, BarChart3Icon, LayoutDashboardIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full flex flex-col bg-gradient-to-r from-pink-50 via-white to-green-50 shadow-md px-8 py-4 mb-6 rounded-b-2xl">
      {/* Logo + Branding */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="PlastiMukti Mart Logo"
            width={42}
            height={42}
            className="rounded-full border-2 border-green-400 shadow-sm"
          />
          <span className="flex flex-col">
            <span className="text-xl font-extrabold text-green-700 drop-shadow">
              PlastiMukto Mart
            </span>
            <span className="text-xs text-pink-600 italic font-medium tracking-wide">
              (plastic free marketplace)
            </span>
          </span>
        </div>

        {/* User + Points */}
        <div className="flex items-center gap-3">
          {user?.name && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
              Welcome, {user.name}
            </span>
          )}
          <div className="flex items-center gap-1 bg-pink-100 px-3 py-1 rounded-full shadow-sm">
            <CoinsIcon className="text-pink-500 h-4 w-4" />
            <span className="text-pink-700 text-sm font-semibold">
              {user?.points || 0} pts
            </span>
          </div>
          <Button
            onClick={logout}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-3 justify-center mt-2">
        
        
        
          
        
      </div>
    </header>
  );
};

export default Header;
