import type { ReactNode } from "react";

type TrendType = "success" | "warning" | "danger";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendType?: TrendType;
  description?: string;
}

const trendStyles: Record<TrendType, string> = {
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  trendType = "success",
  description,
}: StatsCardProps) {
  return (
    <article className="group flex h-full flex-col justify-between rounded-lg border border-border-default bg-bg-surface p-6 transition-all duration-200 hover:border-primary hover:bg-bg-elevated shadow-subtle">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted">
            {title}
          </p>
          {description ? (
            <p className="mt-2 text-sm text-text-muted">{description}</p>
          ) : null}
          <p className="mt-4 text-3xl font-semibold leading-none text-text-primary">
            {value}
          </p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-default bg-primary-soft text-primary transition-all duration-200 group-hover:bg-primary-soft">
          {icon}
        </div>
      </div>

      {trend ? (
        <div className="mt-6 flex items-center justify-between text-sm text-(--text-secondary)">
          <span className={`font-semibold ${trendStyles[trendType]}`}>
            {trend}
          </span>
        </div>
      ) : null}
    </article>
  );
}
