import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import DashboardStatsContainer from "../../components/dashboard/DashboardStatsContainer";
import DashboardTable from "../../components/dashboard/DashboardTable";
import ScheduleCalendarCard from "../../components/dashboard/ScheduleCalenderCard";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: "home" },
  { label: "Bookings", to: "/", icon: "calendar" },
  { label: "Analytics", to: "/analytics", icon: "chart" },
  { label: "Settings", to: "/settings", icon: "settings" },
];

const bookings = [
  {
    id: "77f025e4-038d-4549-86e2-9f078a324167",
    name: "King",
    email: "king@gmail.com",
    date: "2026-05-22",
    time_slot: "10:51:53.428000",
    status: "pending",
    created_at: "2026-05-22T16:42:22.125230",
  },
  {
    id: "26e12e1b-6d1f-4921-957d-d9977eb203d7",
    name: "King",
    email: "king@gmail.com",
    date: "2026-05-22",
    time_slot: "12:51:53.428000",
    status: "completed",
    created_at: "2026-05-22T16:43:00.625557",
  },
  {
    id: "9f607e0c-92ab-4a2f-8477-f49a2d33dac5",
    name: "King",
    email: "king@gmail.com",
    date: "2026-05-22",
    time_slot: "13:51:53.428000",
    status: "canceled",
    created_at: "2026-05-22T17:17:12.792016",
  },
  {
    id: "4d54ce28-5611-4160-af80-42889e3e37f8",
    name: "King",
    email: "king@gmail.com",
    date: "2026-05-22",
    time_slot: "14:51:53.428000",
    status: "pending",
    created_at: "2026-05-22T16:43:09.333469",
  },
  {
    id: "a4579038-87a7-4245-8124-8d6b692162a5",
    name: "string",
    email: "user@example.com",
    date: "2026-05-22",
    time_slot: "15:19:22",
    status: "pending",
    created_at: "2026-05-23T13:27:40.172396",
  },
  {
    id: "4b46d1e5-4c2e-4648-9a07-bacada7d11f2",
    name: "King",
    email: "king@gmail.com",
    date: "2026-05-22",
    time_slot: "16:44:16.027000",
    status: "completed",
    created_at: "2026-05-22T16:42:49.445852",
  },
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
        // onClose={() => setSidebarOpen(false)}
      />

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
              <DashboardTable bookings={bookings} />
              <ScheduleCalendarCard bookings={bookings} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
