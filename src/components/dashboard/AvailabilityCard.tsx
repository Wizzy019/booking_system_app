import { useAvailability } from "../../features/booking/hooks/useAvailability";
import SectionHeader from "./SectionHeader";

type AvailabilityCardProps = {
  onOpenModal: () => void;
};

export default function AvailabilityCard({
  onOpenModal,
}: AvailabilityCardProps) {
  const { data: AvailabilityData } = useAvailability();
  const availability = AvailabilityData;

  const getDayName = (n: number) => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return days[n] ?? "Invalid day";
  };

  const formattedAvailability = availability?.map((availability) => {
    const day = getDayName(availability.day_of_week);
    const start_time = availability.start_time.split(".")[0];
    const end_time = availability.end_time.split(".")[0];
    const hours: string = `${start_time} - ${end_time}`;

    return { day, hours };
  });

  return (
    <div className="bg-(--bg-surface) border border-(--border-default) rounded-lg shadow-subtle overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-(--border-default)">
        <SectionHeader
          title="Availability Management"
          right={
            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-1 rounded-md bg-(--primary-soft) text-(--primary) px-3 py-1.5 text-xs font-semibold hover:bg-(--primary)/10 transition-colors"
            >
              Add Availability
            </button>
          }
        />
      </div>

      {/* Day slots */}
      <div className="divide-y divide-(--border-default)">
        {formattedAvailability?.map(({ day, hours }) => (
          <div
            key={day}
            className="flex items-center justify-between px-5 py-3.5"
          >
            <span className="text-sm font-medium text-(--text-primary)">
              {day}
            </span>
            <span className="text-xs text-(--text-secondary)">{hours}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex gap-3 px-5 py-4 border-t border-(--border-default)">
        <button className="flex-1 py-2 text-xs font-medium text-(--text-primary) bg-(--bg-elevated) border border-(--border-default) rounded-md hover:bg-(--bg-app) transition-colors">
          View Calendar
        </button>
        <button className="flex-1 py-2 text-xs font-semibold text-(--primary) border border-(--selected-border) rounded-md hover:bg-(--primary-soft) transition-colors">
          Edit Availability
        </button>
      </div>
    </div>
  );
}
