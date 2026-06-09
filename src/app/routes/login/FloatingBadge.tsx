import React from "react";

interface FloatingBadgeProps {
  icon: React.ReactNode;
  style?: React.CSSProperties;
}

export default function FloatingBadge({ icon, style }: FloatingBadgeProps) {
  return (
    <div
      className="absolute w-11 h-11 rounded-2xl flex items-center justify-center z-20"
      style={{
        background: "rgba(9,18,35,0.82)",
        border: "1px solid rgba(80,120,190,0.18)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        backdropFilter: "blur(8px)",
        ...style,
      }}
    >
      {icon}
    </div>
  );
}
