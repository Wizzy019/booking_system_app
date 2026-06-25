// import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCards from "../../components/dashboard/StatCards";
import ScheduleCalendarCard from "../../components/dashboard/ScheduleCalenderCard";
import AvailabilityCard from "../../components/dashboard/AvailabilityCard";
import DashboardTable from "../../components/dashboard/DashboardTable";
import { useState } from "react";
import AvailabilityModal from "../../components/dashboard/AvailabiltyModal";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-5 lg:space-y-6">
        {/* Stat cards */}
        <StatCards />

        {/* Body: left + right */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 lg:gap-6">
          {/* Left column */}
          <div className="space-y-5 lg:space-y-6 min-w-0">
            <ScheduleCalendarCard />

            <DashboardTable />
          </div>

          {/* Right column */}
          <div className="space-y-5 lg:space-y-6">
            {/* <TodaySchedule /> */}
            <AvailabilityCard onOpenModal={() => setIsModalOpen(true)} />
            <div className="space-y-5 lg:space-y-6">
              <AvailabilityModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
