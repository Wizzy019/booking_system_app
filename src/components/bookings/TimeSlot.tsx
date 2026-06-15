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

export interface TimeSlotProps {
  selectedDate: Date | null;
  onSelectSlot: (slot: object) => void;
}

function TimeSlot({ selectedDate, onSelectSlot }: TimeSlotProps) {
  const slotDate = formatDateToString(selectedDate);

  const { data: slotsData } = useSlots(slotDate);

  const allSlots: AllSlots = slotsData;
  const availableSlots = allSlots?.available;
  const bookedSlots = allSlots?.booked;

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

  return (
    <div className="flex flex-wrap gap-2">
      {slots?.map((slot, index) => {
        const isBookable = bookableSlots?.includes(slot.start);
        return (
          <button
            disabled={!isBookable}
            onClick={() => {
              onSelectSlot(slot);
            }}
            key={index}
            className={`border px-4 py-2 rounded ${
              isBookable
                ? "text-(--text-primary) cursor-pointer"
                : "text-(--text-muted)"
            }`}
          >
            {minutesToTime(slot.start)} - {minutesToTime(slot.end)}
          </button>
        );
      })}
    </div>
  );
}

export default TimeSlot;
