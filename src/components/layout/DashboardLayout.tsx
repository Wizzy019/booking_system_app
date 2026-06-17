import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
// import DashboardStatsContainer from "../../components/dashboard/DashboardStatsContainer";
// import DashboardTable from "../../components/dashboard/DashboardTable";
// import ScheduleCalendarCard from "../../components/dashboard/ScheduleCalenderCard";
import { useAuthStore } from "../../features/auth/hooks/authStore";
import DashboardPage from "../../app/routes/DashboardPage";
const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: "home" },
  { label: "Bookings", to: "/bookings", icon: "calendar" },
  { label: "Analytics", to: "/analytics", icon: "chart" },
  { label: "Settings", to: "/settings", icon: "settings" },
];

function DashBoardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-bg-app overflow-y-auto">
      <header className="w-full">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
        />
      </header>
      <aside>
        <Sidebar navItems={navItems} isOpen={isSidebarOpen} onLogout={logout} />
      </aside>
      <main className="flex-1 md:ml-72 pt-16">
        <DashboardPage />
      </main>
    </div>
  );
}

export default DashBoardLayout;
