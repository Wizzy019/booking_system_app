import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import { useAvailability } from "../../../features/booking/hooks/useAvailability";

export interface Availability {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
}
export interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export default function Calendar({
  selectedDate,
  onDateSelect,
}: CalendarProps) {
  const { data: availabilityData } = useAvailability();

  const availability: Availability[] = availabilityData;

  const availableDays = availability?.map((item) => item.day_of_week);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  function goPrevious() {
    setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  }

  function goNext() {
    setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  }

  function handleDateSelect(date: Date) {
    // availability logic intentionally omitted — caller will implement
    onDateSelect(date);
  }

  return (
    <div className="max-w-full">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrev={goPrevious}
        onNext={goNext}
      />

      <CalendarGrid
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        availabilitySet={new Set(availableDays)}
      />
    </div>
  );
}
