import React from "react";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-8 bg-white text-green-100 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;