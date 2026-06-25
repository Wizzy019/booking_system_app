import React from "react";

const ClipboardIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
    <path
      fillRule="evenodd"
      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
      clipRule="evenodd"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
      clipRule="evenodd"
    />
  </svg>
);

const SmileIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
      clipRule="evenodd"
    />
  </svg>
);

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
}

function StatCard({ icon, label, value, trend }: StatCardProps) {
  return (
    <div className="bg-(--bg-surface) border border-(--border-default) rounded-lg p-4 shadow-subtle">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-(--primary-soft) flex items-center justify-center text-(--primary)">
          {icon}
        </div>
        <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-(--success) bg-(--success)/15 px-2.5 py-0.5 rounded-full">
          ↑{trend}
        </span>
      </div>
      <p className="text-(--text-muted) text-xs mb-1 leading-tight">{label}</p>
      <p className="text-(--text-primary) text-2xl font-bold tracking-tight">
        {value}
      </p>
    </div>
  );
}

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<ClipboardIcon />}
        label="Total Bookings"
        value="1768"
        trend="59%"
      />
      <StatCard
        icon={<CalendarIcon />}
        label="Upcoming Consultations"
        value="33"
        trend="19%"
      />
      <StatCard
        icon={<ClockIcon />}
        label="Available Time Slots"
        value="366"
        trend="15%"
      />
      <StatCard
        icon={<SmileIcon />}
        label="Client Satisfaction"
        value="63%"
        trend="95%"
      />
    </div>
  );
}
