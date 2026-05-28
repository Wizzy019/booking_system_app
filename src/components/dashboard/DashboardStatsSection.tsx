import type { ReactNode } from "react";
import StatsCard from "../ui/StatsCard";

export type TrendType = "success" | "warning" | "danger";

export interface StatItem {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendType?: TrendType;
  description?: string;
}

interface DashboardStatsSectionProps {
  stats: StatItem[];
  className?: string;
}

export default function DashboardStatsSection({
  stats,
  className = "",
}: DashboardStatsSectionProps) {
  return (
    <section className={`w-full ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {stats.map((stat, idx) => (
            <div key={idx} className="h-full">
              <StatsCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                trend={stat.trend}
                trendType={stat.trendType}
                description={stat.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
