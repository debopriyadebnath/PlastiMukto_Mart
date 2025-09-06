import React from "react";
import Link from "next/link";
import { FaUser, FaStore, FaTrophy, FaCalendarAlt, FaUsers, FaHome } from "react-icons/fa";

const navItems = [
  { href: "/dashboard", label: "Home", icon: FaHome },
  { href: "/profile", label: "Profile", icon: FaUser },
  { href: "/marketplace", label: "Marketplace", icon: FaStore },
  { href: "/leaderboard", label: "Leaderboard", icon: FaTrophy },
  { href: "/events", label: "Events", icon: FaCalendarAlt },
  { href: "/community", label: "Community Hub", icon: FaUsers },
];

const Sidebar = () => (
  <aside className="bg-gradient-to-b from-green-900 to-black text-green-100 min-h-screen w-56 px-6 py-8 flex flex-col shadow-lg">
    <nav className="flex-1">
      <ul className="space-y-6">
        {navItems.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex items-center gap-3 text-lg font-medium hover:text-green-400 transition-colors"
            >
              <Icon className="text-green-400 text-xl" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
