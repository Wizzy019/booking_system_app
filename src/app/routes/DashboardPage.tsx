import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: "home" },
  { label: "Bookings", to: "/", icon: "calendar" },
  { label: "Analytics", to: "/analytics", icon: "chart" },
  { label: "Settings", to: "/settings", icon: "settings" },
];

function DashboardPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-app">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        onMenuClick={() => setSidebarOpen((prev) => !prev)}
      />

      <Sidebar
        navItems={navItems}
        isOpen={isSidebarOpen}
        isClose={() => setSidebarOpen(false)}
      />

      <main className="md:ml-72 p-6">
        <h2 className="text-lg font-semibold text-text-primary">Dashboard</h2>
      </main>
    </div>
  );
}

export default DashboardPage;
