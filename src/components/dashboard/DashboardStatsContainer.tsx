import type { ReactNode } from "react";
import DashboardStatsSection, { type StatItem } from "./DashboardStatsSection";
import { CalendarCheck, DollarSign, BarChart2, Users } from "lucide-react";

const stats: StatItem[] = [
  {
    title: "Total Bookings",
    value: 1284,
    icon: (<CalendarCheck className="h-6 w-6" />) as unknown as ReactNode,
    trend: "+8.4%",
    trendType: "success",
    description: "vs last week",
  },
  {
    title: "Revenue",
    value: "$72,430",
    icon: (<DollarSign className="h-6 w-6" />) as unknown as ReactNode,
    trend: "+4.2%",
    trendType: "success",
    description: "monthly",
  },
  {
    title: "Conversion Rate",
    value: "3.8%",
    icon: (<BarChart2 className="h-6 w-6" />) as unknown as ReactNode,
    trend: "-0.6%",
    trendType: "warning",
  },
  {
    title: "Active Users",
    value: 932,
    icon: (<Users className="h-6 w-6" />) as unknown as ReactNode,
    trend: "+1.1%",
    trendType: "success",
  },
];

interface Props {
  className?: string;
}

export default function DashboardStatsContainer({ className = "" }: Props) {
  return <DashboardStatsSection stats={stats} className={className} />;
}
