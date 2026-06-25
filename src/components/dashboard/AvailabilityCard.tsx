import { useState } from "react";
import {
  useAvailability,
  useDeleteAvailability,
} from "../../features/booking/hooks/useAvailability";
import SectionHeader from "./SectionHeader";
import { Trash } from "lucide-react";
import { useLoader } from "../../contexts/LoaderContext";

const PencilIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);

export interface Availability {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

type AvailabilityCardProps = {
  onOpenModal: () => void;
  onOpenEditModal: () => void;
  onSelect: (availability: Availability[]) => void;
};

export default function AvailabilityCard({
  onOpenModal,
  onOpenEditModal,
  onSelect,
}: AvailabilityCardProps) {
  const [isShowing, setIsShowing] = useState(false);
  const { showLoader, hideLoader } = useLoader();

  const { data: AvailabilityData } = useAvailability();
  const availability: Availability[] = AvailabilityData;

  const { mutate: deleteAvailability } = useDeleteAvailability();

  const handleDelete = (id: string) => {
    console.log(id);

    showLoader();
    try {
      deleteAvailability({ id });
    } catch (error) {
      console.log(error);
    }
    hideLoader();
  };

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

  const formattedAvailability = availability?.map((avail) => {
    const day = getDayName(avail.day_of_week);
    const id = avail.id;
    const start_time = avail.start_time.split(".")[0];
    const end_time = avail.end_time.split(".")[0];
    const hours: string = `${start_time} - ${end_time}`;

    return { avail, id, day, hours };
  });

  return (
    <div className="bg-(--bg-surface) border border-(--border-default) rounded-lg shadow-subtle overflow-hidden">
      {/* Header */}
      <div className="px-2 md:px-5 py-4 border-b border-(--border-default)">
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
      <div className="overflow-x-auto">
        <div className="min-w-113 divide-y divide-(--border-default)">
          {formattedAvailability?.map(({ avail, day, hours }) => (
            <div
              key={day}
              onClick={() => onSelect(avail)}
              className="flex items-center justify-between px-5 py-3.5"
            >
              <span className="shrink-0 text-sm font-medium text-(--text-primary)">
                {day}
              </span>

              <div className="flex items-center gap-5">
                <span className="shrink-0 text-xs text-(--text-secondary)">
                  {hours}
                </span>

                <button
                  onClick={() => handleDelete(avail.id)}
                  className={`${isShowing ? "opacity-100" : "opacity-0"}`}
                >
                  <Trash />
                </button>

                <button
                  onClick={onOpenEditModal}
                  className="sticky right-0 shrink-0"
                >
                  <PencilIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex gap-3 px-2 md:px-5 py-4 border-t border-(--border-default)">
        <button className="flex-1 py-2 text-xs font-medium text-(--text-primary) bg-(--bg-elevated) border border-(--border-default) rounded-md hover:bg-(--bg-app) transition-colors">
          View Calendar
        </button>
        <button
          onClick={() => setIsShowing(true)}
          className="flex-1 py-2 text-xs font-semibold text-(--primary) border border-(--selected-border) rounded-md hover:bg-(--primary-soft) transition-colors"
        >
          Delete Availability
        </button>
      </div>
    </div>
  );
}
