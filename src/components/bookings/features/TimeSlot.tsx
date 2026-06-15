import { useSlots } from "../../../features/booking/hooks/useAvailability";

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

function TimeSlot({ selectedDate }) {
  const year = selectedDate?.getFullYear();
  const month = String(selectedDate?.getMonth() + 1).padStart(2, "0");
  const day = String(selectedDate?.getDate()).padStart(2, "0");

  const slotDate = `${year}-${month}-${day}`;

  const { data: slotsData } = useSlots(slotDate);

  const allSlots: AllSlots = slotsData;
  const availableSlots = allSlots?.available;
  const bookedSlots = allSlots?.booked;

  if (!selectedDate) return null;

  function timeToMinutes(time: string) {
    const [h, m] = time.split(":");
    return Number(h) * 60 + Number(m);
  }

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

  const startBooking = () => {
    console.log("Let's get the booking started");
  };

  function minutesToTime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return ` ${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {slots?.map((slot, index) => {
        const isBookable = bookableSlots?.includes(slot.start);
        return (
          <button
            disabled={!isBookable}
            onClick={startBooking}
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
