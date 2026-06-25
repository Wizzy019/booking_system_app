import { useBooking } from "../../features/booking/hooks/useBooking";
import SectionHeader from "./SectionHeader";

interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  time_slot: string;
  status: BookingStatus;
}

const EyeIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path
      fillRule="evenodd"
      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
      clipRule="evenodd"
    />
  </svg>
);

const PencilIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
    <path
      fillRule="evenodd"
      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

type BookingStatus = "pending" | "completed" | "canceled";

const STATUS_MAP: Record<BookingStatus, { label: string; cls: string }> = {
  pending: { label: "Pending", cls: "text-primary bg-primary-soft" },
  completed: { label: "Completed", cls: "text-success  bg-success/15" },
  canceled: { label: "Canceled", cls: "text-danger bg-danger/15" },
};

function StatusBadge({ status }: { status: BookingStatus }) {
  const { label, cls } = STATUS_MAP[status];
  return (
    <span
      className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${cls}`}
    >
      {label}
    </span>
  );
}

export default function DashboardTable() {
  const { data } = useBooking();

  const bookings: Booking[] = data;
  const bookingKeys = bookings?.length ? Object.keys(bookings[0]) : [];
  const headers = bookingKeys?.slice(1);

  const handleEdit = (id) => {
    console.log(id);
  };

  return (
    <div className="bg-(--bg-surface) border border-(--border-default) rounded-lg shadow-subtle overflow-hidden">
      <div className="px-5 py-4 border-b border-(--border-default)">
        <SectionHeader title="Client Bookings Table" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-160">
          <thead>
            <tr className="border-b border-(--border-default) bg-(--bg-elevated)">
              {headers?.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-semibold text-(--text-muted) whitespace-nowrap"
                >
                  {header?.charAt(0).toUpperCase() + header.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-(--border-default)">
            {bookings?.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-(--bg-app) transition-colors"
              >
                {/* <td className="px-4 py-3 text-xs font-semibold text-(--text-primary)">
                  {booking.id}
                </td> */}
                <td className="px-4 py-3 text-xs font-semibold text-(--text-primary)">
                  {booking.name}
                </td>
                <td className="px-4 py-3 text-xs text-(--text-secondary)">
                  {booking.email}
                </td>
                <td className="px-4 py-3 text-xs text-(--text-secondary) whitespace-nowrap">
                  {booking.date}
                </td>
                <td className="px-4 py-3 text-xs text-(--text-secondary)">
                  {booking.time_slot.split(":")[0]}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={booking?.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-(--text-secondary) border border-(--border-default) rounded hover:bg-(--bg-app) transition-colors"
                    >
                      <EyeIcon /> View
                    </button>
                    <button className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-(--text-secondary) border border-(--border-default) rounded hover:bg-(--bg-app) transition-colors">
                      <PencilIcon /> Edit
                    </button>
                    <button className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-(--danger) border border-(--border-default) rounded hover:bg-(--danger)/10 transition-colors">
                      <TrashIcon /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
