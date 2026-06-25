import React from "react";

interface SectionHeaderProps {
  title: string;
  right?: React.ReactNode;
  className?: string;
}

export default function SectionHeader({
  title,
  right,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      <h2 className="text-(--text-primary) font-semibold text-sm">{title}</h2>
      {right}
    </div>
  );
}
