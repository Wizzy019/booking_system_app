import React from "react";
import { IconUser, IconDots, IconClock, IconDocument } from "./Icons";

type Cell = "blue" | "salmon" | "empty";

const days = [
  { label: "Mon", date: "25" },
  { label: "Tue", date: "26" },
  { label: "Wed", date: "17", today: true },
  { label: "Thu", date: "28" },
  { label: "Fri", date: "15" },
];

const grid: Cell[][] = [
  ["empty", "blue", "blue", "empty", "empty"],
  ["empty", "empty", "blue", "salmon", "empty"],
  ["salmon", "empty", "blue", "empty", "empty"],
  ["empty", "empty", "blue", "salmon", "empty"],
  ["empty", "blue", "empty", "empty", "salmon"],
];

export default function CalendarIllustration(): React.JSX.Element {
  return (
    <div
      className="relative z-10"
      style={{
        width: 450,
        height: 290,
      }}
    >
      {/* Top chips */}
      <div
        className="absolute flex gap-2 z-30"
        style={{
          top: -20,
          left: 96,
        }}
      >
        <div
          className="px-3 py-1.5 rounded-lg text-slate-300 text-xs font-medium"
          style={{
            background: "rgba(18,32,58,0.9)",
            border: "1px solid rgba(80,120,190,0.22)",
          }}
        >
          Schedule
        </div>

        <div
          className="px-3 py-1.5 rounded-lg text-blue-400 text-xs font-medium"
          style={{
            background: "rgba(30,65,175,0.22)",
            border: "1px solid rgba(59,130,246,0.32)",
          }}
        >
          Today ▾
        </div>
      </div>

      {/* Floating appointment card 1 */}
      <div
        className="absolute z-30 rounded-xl p-3 flex flex-col gap-1.5"
        style={{
          right: -30,
          top: 18,
          width: 148,
          background: "rgba(210,175,140,0.16)",
          border: "1px solid rgba(210,175,140,0.18)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          className="h-2 w-16 rounded-full"
          style={{
            background: "rgba(230,195,160,0.65)",
          }}
        />

        <div
          className="h-2 w-20 rounded-full"
          style={{
            background: "rgba(210,175,140,0.35)",
          }}
        />

        <div
          className="h-2 w-12 rounded-full"
          style={{
            background: "rgba(210,175,140,0.25)",
          }}
        />
      </div>

      {/* Floating appointment card 2 */}
      <div
        className="absolute z-30 rounded-xl p-3 flex flex-col gap-1.5"
        style={{
          right: -22,
          top: 114,
          width: 152,
          background: "rgba(37,99,235,0.22)",
          border: "1px solid rgba(59,130,246,0.28)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          className="h-2 w-14 rounded-full"
          style={{
            background: "rgba(147,197,253,0.7)",
          }}
        />

        <div
          className="h-2 w-20 rounded-full"
          style={{
            background: "rgba(147,197,253,0.38)",
          }}
        />

        <div
          className="h-2 w-10 rounded-full"
          style={{
            background: "rgba(147,197,253,0.28)",
          }}
        />
      </div>

      {/* Floating appointment card 3 */}
      <div
        className="absolute z-30 rounded-xl p-2.5 flex flex-col gap-1.5"
        style={{
          right: -12,
          bottom: 8,
          width: 136,
          background: "rgba(200,165,130,0.13)",
          border: "1px solid rgba(200,165,130,0.15)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          className="h-2 w-12 rounded-full"
          style={{
            background: "rgba(220,185,150,0.55)",
          }}
        />

        <div
          className="h-2 w-16 rounded-full"
          style={{
            background: "rgba(210,175,140,0.3)",
          }}
        />
      </div>
      {/* Main calendar panel */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden flex"
        style={{
          background: "rgba(10,20,40,0.52)",
          border: "1px solid rgba(80,130,210,0.16)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
          transform: "perspective(900px) rotateY(-5deg) rotateX(2deg)",
        }}
      >
        {/* Sidebar */}
        <div
          className="flex flex-col items-center gap-4 py-5 px-3 shrink-0"
          style={{
            width: 42,
            background: "rgba(7,14,28,0.5)",
            borderRight: "1px solid rgba(60,90,150,0.14)",
          }}
        >
          <div
            className="w-7 h-7 rounded-full"
            style={{
              background: "rgba(100,130,180,0.35)",
            }}
          />

          {[IconUser, IconDots, IconClock, IconDocument].map((Icon, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-5 h-5 opacity-40"
            >
              <Icon />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-3.5 gap-2.5 overflow-hidden">
          <span className="text-white text-sm font-semibold opacity-90">
            Calendar
          </span>

          {/* Day Headers */}
          <div
            className="grid gap-1.5"
            style={{
              gridTemplateColumns: ` repeat(${days.length}, 1fr)`,
            }}
          >
            {days.map((day) => (
              <div key={day.label} className="flex flex-col items-center gap-1">
                <span className="text-slate-500 text-[9px] font-medium uppercase">
                  {day.label}
                </span>

                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{
                    background: day.today ? "#2563eb" : "transparent",
                    color: day.today ? "white" : "#64748b",
                  }}
                >
                  {day.date}
                </div>
              </div>
            ))}
          </div>
          {/* Appointment Grid */}
          <div
            className="flex-1 grid gap-1"
            style={{
              gridTemplateRows: `repeat(${grid.length}, 1fr)`,
            }}
          >
            {grid.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid gap-1.5"
                style={{
                  gridTemplateColumns: ` repeat(${days.length}, 1fr)`,
                }}
              >
                {row.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    className="rounded-md"
                    style={{
                      minHeight: 26,
                      background:
                        cell === "blue"
                          ? "rgba(37,99,235,0.72)"
                          : cell === "salmon"
                            ? "rgba(205,160,125,0.42)"
                            : "rgba(30,50,90,0.22)",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Mini Calendar Popup */}
        <div
          className="absolute bottom-3 right-3 rounded-xl p-2.5 z-20"
          style={{
            width: 112,
            background: "rgba(7,14,28,0.92)",
            border: "1px solid rgba(60,90,150,0.22)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-white text-[8.5px] font-semibold">
              Appointment
            </span>

            <div className="flex gap-1 text-slate-500 text-[8px]">
              <span>‹</span>
              <span>›</span>
            </div>
          </div>

          {/* Week Headers */}
          <div className="grid grid-cols-7 gap-px mb-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div
                key={index}
                className="text-slate-600 text-[6.5px] text-center font-medium"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-px">
            {Array.from({ length: 35 }, (_, index) => {
              const day = index - 2;
              const isToday = day === 17;
              const inMonth = day >= 1 && day <= 30;

              return (
                <div
                  key={index}
                  className="rounded-sm h-3 w-full flex items-center justify-center text-[6.5px] font-medium"
                  style={{
                    background: isToday ? "#2563eb" : "transparent",
                    color: isToday ? "white" : inMonth ? "#64748b" : "#1e2d45",
                  }}
                >
                  {inMonth ? day : ""}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
