// import { useState } from "react";
// import Navbar from "../../components/layout/Navbar";
// import Sidebar from "../../components/layout/Sidebar";
import DashboardStatsContainer from "../../components/dashboard/DashboardStatsContainer";
import DashboardTable from "../../components/dashboard/DashboardTable";
import ScheduleCalendarCard from "../../components/dashboard/ScheduleCalenderCard";
// import { useAuthStore } from "../../features/auth/hooks/authStore";
import { useBooking } from "../../features/booking/hooks/useBooking";

function DashboardPage() {
  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  // const { logout } = useAuthStore();

  const { data: bookingData, error } = useBooking();
  if (error) {
    console.log(error);
  }

  return (
    <div className="min-h-screen bg-bg-app">
      <main>
        <div className="mx-auto min-h-screen flex max-w-7xl flex-col gap-6 px-6 py-6">
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
  );
}

export default DashboardPage;
