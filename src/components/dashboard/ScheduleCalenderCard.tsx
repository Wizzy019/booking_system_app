import { useMemo } from "react";

type BookingStatus = "pending" | "completed" | "canceled";

interface Booking {
  id: string;
  name: string;
  service: string;
  date: string;
  time_slot: string;
  status: BookingStatus;
}

interface ScheduleCalendarCardProps {
  bookings: Booking[];
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TIME_SLOTS = [
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
];

const statusStyles: Record<BookingStatus, string> = {
  pending: "bg-warning/10 border border-warning/20 text-warning",
  completed: "bg-success/10 border border-success/20 text-success",
  canceled: "bg-danger/10 border border-danger/20 text-danger",
};

function getDay(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
  });
}

function normalizeTimeSlot(time: string): string {
  const hour = Number(time.split(":")[0]);

  if (hour === 0) return "12 AM";
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return "12 PM";

  return `${hour - 12} PM`;
}

function BookingBlock({ booking }: { booking: Booking }) {
  return (
    <div
      className={`rounded-md px-2 py-2 text-xs transition-all duration-200 ${statusStyles[booking.status]}`}
    >
      <p className="font-semibold text-text-primary truncate">{booking.name}</p>

      <p className="text-[11px] opacity-90 truncate">{booking.service}</p>
    </div>
  );
}

export default function ScheduleCalendarCard({
  bookings,
}: ScheduleCalendarCardProps) {
  const bookingMap = useMemo(() => {
    const map: Record<string, Record<string, Booking[]>> = {};

    bookings?.forEach((booking) => {
      const day = getDay(booking.date);
      const slot = normalizeTimeSlot(booking.time_slot);

      if (!map[day]) {
        map[day] = {};
      }

      if (!map[day][slot]) {
        map[day][slot] = [];
      }

      map[day][slot].push(booking);
    });

    return map;
  }, [bookings]);

  return (
    <section className="bg-bg-surface border border-border-default rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-3 py-3 border-b border-border-default">
        <div>
          <h2 className="text-sm font-semibold text-text-primary">
            Weekly Schedule
          </h2>

          <p className="text-xs text-text-muted">Booking overview</p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-text-muted">
            <span className="w-2 h-2 rounded-full bg-warning" />
            Pending
          </span>

          <span className="flex items-center gap-1 text-text-muted">
            <span className="w-2 h-2 rounded-full bg-success" />
            Completed
          </span>

          <span className="flex items-center gap-1 text-text-muted">
            <span className="w-2 h-2 rounded-full bg-danger" />
            Canceled
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-180">
          <div
            className="grid border-b border-border-default"
            style={{
              gridTemplateColumns: "72px repeat(7, 1fr)",
            }}
          >
            <div />

            {DAYS.map((day) => (
              <div
                key={day}
                className="px-2 py-2 text-center text-xs font-semibold text-text-secondary border-l border-border-default"
              >
                {day}
              </div>
            ))}
          </div>

          {TIME_SLOTS.map((slot) => (
            <div
              key={slot}
              className="grid border-b border-border-default"
              style={{
                gridTemplateColumns: "72px repeat(7, 1fr)",
              }}
            >
              <div className="px-2 py-3 text-xs text-text-muted border-r border-border-default">
                {slot}
              </div>

              {DAYS.map((day) => {
                const cellBookings = bookingMap[day]?.[slot] ?? [];

                return (
                  <div
                    key={`${day}-${slot}`}
                    className="min-h-16 p-2 border-r border-border-default bg-bg-surface hover:bg-bg-elevated transition-all duration-200 flex flex-col gap-2"
                  >
                    {cellBookings.map((booking) => (
                      <BookingBlock key={booking.id} booking={booking} />
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
