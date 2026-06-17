import { useRef, type KeyboardEvent } from "react";
import CalendarDay from "./CalendarDay";

interface Props {
  currentMonth: Date;
  selectedDate: Date | null;
  onDateSelect: (d: Date) => void;
  availabilitySet?: Set<number>;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function daysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export default function CalendarGrid({
  currentMonth,
  selectedDate,
  onDateSelect,
  availabilitySet,
}: Props) {
  const start = startOfMonth(currentMonth);
  const leading = start.getDay();
  const totalDays = daysInMonth(currentMonth);
  const totalCells = Math.ceil((leading + totalDays) / 7) * 7; // full weeks

  const days: Date[] = [];
  for (let i = 0; i < totalCells; i++) {
    const dayNumber = i - leading + 1;
    days.push(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber),
    );
  }

  // refs to support keyboard navigation
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function focusIndex(idx: number) {
    const day = days[idx];
    if (!day) return;
    const key = day.toDateString();
    const el = refs.current[key];
    el?.focus();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, idx: number) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusIndex(Math.min(idx + 1, days.length - 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusIndex(Math.max(idx - 1, 0));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      focusIndex(Math.min(idx + 7, days.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusIndex(Math.max(idx - 7, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const d = days[idx];
      if (
        (availabilitySet?.has(d.getDay()) ?? false) &&
        typeof onDateSelect === "function"
      )
        onDateSelect(d);
    }
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-1 text-xs text-text-muted mb-2">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-center py-1 font-medium">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((date, idx) => {
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
          const isToday = new Date().toDateString() === date.toDateString();
          const isSelected = selectedDate
            ? selectedDate.toDateString() === date.toDateString()
            : false;
          const isAvailable =
            (availabilitySet?.has((date.getDay() + 6) % 7) ?? false) &&
            isCurrentMonth;

          return (
            <CalendarDay
              key={date.toISOString()}
              date={date}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday}
              isSelected={isSelected}
              isAvailable={isAvailable}
              onSelect={() => isAvailable && onDateSelect(date)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el: HTMLButtonElement | null) =>
                (refs.current[date.toDateString()] = el)
              }
            />
          );
        })}
      </div>
    </div>
  );
}
