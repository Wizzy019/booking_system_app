export type Booking = {
  id: string;
  name: string;
  email: string;
  date: string;
  time_slot: string;
  status: "pending" | "completed" | "canceled";
  created_at: string;
};

type Props = {
  bookings: Booking[];
};

const STATUS_STYLES: Record<Booking["status"], string> = {
  pending: "bg-(--warning)/10 text-(--warning) ring-1 ring-(--warning)/30",
  completed: "bg-(--success)/10 text-(--success) ring-1 ring-(--success)/30",
  canceled: "bg-(--danger)/10  text-(--danger)  ring-1 ring-(--danger)/30",
};

const STATUS_LABEL: Record<Booking["status"], string> = {
  pending: "Pending",
  completed: "Completed",
  canceled: "Canceled",
};

function StatusBadge({ status }: { status: Booking["status"] }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium tracking-wide ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

function DashboardTable({ bookings }: Props) {
  return (
    <div className="rounded-lg border border-(--border-default) bg-(--surface) overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-(--border-first)">
            {["Client", "Email", "Date", "Time", "Status"].map((col) => (
              <th
                key={col}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-(--text-muted) first:pl-5 last:pr-5"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-5 py-12 text-center text-(--text-muted) text-sm"
              >
                No bookings found.
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-(--border-first) last:border-0 transition-all duration-200 hover:bg-(--surface-hover)"
              >
                <td className="px-4 pl-5 py-3.5 font-medium text-(--text-primary) whitespace-nowrap">
                  {booking.name}
                </td>
                <td className="px-4 py-3.5 text-(--text-secondary) whitespace-nowrap">
                  {booking.email}
                </td>
                <td className="px-4 py-3.5 text-(--text-secondary) whitespace-nowrap">
                  {booking.date}
                </td>
                <td className="px-4 py-3.5 text-(--text-secondary) whitespace-nowrap">
                  {booking.time_slot}
                </td>
                <td className="px-4 pr-5 py-3.5">
                  <StatusBadge status={booking.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTable;
