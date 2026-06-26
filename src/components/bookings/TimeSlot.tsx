import { useSlots } from "../../features/booking/hooks/useAvailability";
import { formatDateToString } from "../../utils/formatDateToString";
import { timeToMinutes, minutesToTime } from "../../utils/formatTime";

export interface Availability {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

export interface AllSlots {
  available: [];
  booked: [];
}

export interface Slot {
  start: number;
  end: number;
}

export interface TimeSlotProps {
  selectedDate: Date | null;
  onSelectSlot: (slot: Slot) => void;
}

function TimeSlot({ selectedDate, onSelectSlot }: TimeSlotProps) {
  const slotDate = formatDateToString(selectedDate);
  console.log(selectedDate);

  const { data: slotsData } = useSlots(slotDate);

  const allSlots: AllSlots = slotsData;
  const availableSlots = allSlots?.available;
  const bookedSlots = allSlots?.booked;
  console.log(allSlots);

  if (!selectedDate) return null;

  const SLOT_DURATION = 90;

  const slots = availableSlots?.map((slot) => {
    const start = timeToMinutes(slot);
    const end = start + SLOT_DURATION;

    return {
      start,
      end,
    };
  });

  const bookedTimes = bookedSlots?.map((slot) => {
    const bookedTime = timeToMinutes(slot);

    return bookedTime;
  });

  const availTimes = slots?.map((slot) => slot.start);

  const bookableSlots = availTimes?.filter(
    (value) => !bookedTimes.includes(value),
  );

  if (!slots || slots.length === 0) {
    return (
      <div className="py-6 text-center">
        <div className="text-sm font-medium text-text-muted">
          No time slots available
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {slots?.map((slot: Slot, index) => {
        const isBookable = bookableSlots?.includes(slot.start);
        console.log(slot);
        return (
          <button
            disabled={!isBookable}
            onClick={() => {
              onSelectSlot(slot);
            }}
            key={index}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between border ${
              isBookable
                ? "bg-bg-surface text-text-primary cursor-pointer hover:bg-primary-soft"
                : "bg-transparent text-text-muted opacity-60"
            } focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span className="text-sm font-semibold">
              {minutesToTime(slot.start)}
            </span>
            <span className="text-sm text-text-muted">
              {minutesToTime(slot.end)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default TimeSlot;
