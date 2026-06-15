import { forwardRef, type KeyboardEvent } from "react";

interface Props {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isAvailable: boolean;
  onSelect: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
}

const CalendarDay = forwardRef<HTMLButtonElement, Props>(
  (
    {
      date,
      isCurrentMonth,
      isToday,
      isSelected,
      isAvailable,
      onSelect,
      onKeyDown,
    },
    ref,
  ) => {
    const label = date.getDate();

    const base =
      "w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-md transition-all select-none";

    const classes = [
      base,
      "text-sm font-medium",
      isCurrentMonth ? "" : "text-(--text-secondary) opacity-60",
      isAvailable ? "cursor-pointer" : "cursor-default opacity-50",
    ]
      .filter(Boolean)
      .join(" ");

    const selectedStyles = isSelected
      ? "bg-(--primary) text-white shadow-sm"
      : isToday
        ? "text-white ring-1 ring-(--primary)"
        : "bg-transparent";

    return (
      <div className="flex items-center justify-center">
        {isAvailable ? (
          <button
            ref={ref}
            type="button"
            onClick={onSelect}
            onKeyDown={onKeyDown}
            aria-pressed={isSelected}
            aria-label={`Select ${date.toDateString()}`}
            className={`${classes} ${selectedStyles} border ${isToday ? "border-(--border-default)" : "border-(--selected-border)"} hover:bg-[rgba(255,255,255,0.03)]`}
          >
            <span className="pointer-events-none">{label}</span>
          </button>
        ) : (
          <div
            className={`${classes} ${selectedStyles} border border-(--border-default)`}
          >
            {label}
          </div>
        )}
      </div>
    );
  },
);

CalendarDay.displayName = "CalendarDay";

export default CalendarDay;
