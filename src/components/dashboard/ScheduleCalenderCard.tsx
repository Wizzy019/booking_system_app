import { useMemo } from "react";
import { useBooking } from "../../features/booking/hooks/useBooking";
import SectionHeader from "./SectionHeader";

const ChevronDownIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

interface Booking {
  id: string;
  name: string;
  service: string;
  date: string;
  time_slot: string;
  status: BookingStatus;
}

type BookingStatus = "pending" | "completed" | "canceled";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ScheduleCalendarCard() {
  const { data } = useBooking();
  const bookings: Booking[] = data;

  const bookingsByDate = useMemo(() => {
    const map: Record<string, Booking[]> = {};

    bookings?.forEach((booking) => {
      const dateKey = booking.date;

      if (!map[dateKey]) {
        map[dateKey] = [];
      }

      map[dateKey].push(booking);
    });

    return map;
  }, [bookings]);

  const currentDate = useMemo(() => new Date(), []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startOffset = firstDay.getDay();

    const days = [];

    for (let i = startOffset - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month, -i),
        currentMonth: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateKey = date.toISOString().split("T")[0];

      days.push({
        date,
        currentMonth: true,
        hasBooking: !!bookingsByDate[dateKey],
        bookingsCount: bookingsByDate[dateKey]?.length ?? 0,
        isToday: date.toDateString() === currentDate.toDateString(),
      });
    }

    return days;
  }, [bookingsByDate, month, year, currentDate]);

  return (
    <div className="bg-(--bg-surface) border border-(--border-default) rounded-lg shadow-subtle overflow-hidden">
      {/* Header */}
      <div className="flex justify-between px-2 md:px-5 py-4 border-b border-(--border-default)">
        <SectionHeader
          title="Dashboard Overview"
          right={
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-(--primary)" />
                <span className="text-(--text-muted) text-xs whitespace-nowrap">
                  Upcoming Consultations
                </span>
              </div>
              <span>
                {" "}
                {monthName} {year}
              </span>
              <button
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md border
            border-(--border-default) px-3 py-1.5 text-xs font-medium text-(--text-primary)"
              >
                {}
                <ChevronDownIcon />
              </button>
            </div>
          }
        />
      </div>

      {/* Calendar grid */}
      <div className="overflow-x-auto">
        <div className="min-w-105 px-5 pt-3 pb-4">
          <div className="grid grid-cols-7 text-center">
            {WEEK_DAYS.map((d) => (
              <div
                key={d}
                className="py-2 text-xs font-semibold text-(--text-muted)"
              >
                {d}
              </div>
            ))}

            {calendarDays.map((day, i) => (
              <div key={i} className="flex flex-col items-center py-1">
                <button
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    day.isToday
                      ? "bg-(--primary) text-white font-semibold"
                      : day.currentMonth
                        ? "text-(--text-primary) hover:bg-(--bg-elevated)"
                        : "text-(--text-muted)"
                  }`}
                >
                  {/* {day} */}
                </button>

                <span
                  className={`h-1 w-1 mt-0.5 rounded-full ${
                    day.hasBooking ? "bg-(--primary)" : "invisible"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
