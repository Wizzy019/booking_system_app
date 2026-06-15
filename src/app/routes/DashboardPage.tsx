import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import DashboardStatsContainer from "../../components/dashboard/DashboardStatsContainer";
import DashboardTable from "../../components/dashboard/DashboardTable";
import ScheduleCalendarCard from "../../components/dashboard/ScheduleCalenderCard";
import { useAuthStore } from "../../features/auth/hooks/authStore";
import { useBooking } from "../../features/booking/hooks/useBooking";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: "home" },
  { label: "Bookings", to: "/bookins", icon: "calendar" },
  { label: "Analytics", to: "/analytics", icon: "chart" },
  { label: "Settings", to: "/settings", icon: "settings" },
];

function DashboardPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuthStore();

  const { data: bookingData, error } = useBooking();
  if (error) {
    console.log(error);
  }

  return (
    <div className="min-h-screen bg-bg-app">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        onMenuClick={() => setSidebarOpen((prev) => !prev)}
      />

      <Sidebar navItems={navItems} isOpen={isSidebarOpen} onLogout={logout} />

      <div className="md:ml-72">
        <main className="min-h-[calc(100vh-4.5rem)] overflow-y-auto px-4 pb-8 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex min-h-full max-w-7xl flex-col gap-6">
            <header className="rounded-lg border border-(--border-default) bg-(--bg-surface) px-6 py-6 shadow-subtle">
              <h1 className="text-3xl font-semibold text-(--text-primary)">
                Dashboard
              </h1>
            </header>

            <section className="grid gap-6" aria-label="Dashboard content">
              <DashboardStatsContainer />
            </section>

            <section className="grid gap-6" aria-label="Dashboard content">
              <DashboardTable bookings={bookingData} />
              <ScheduleCalendarCard bookings={bookingData} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
