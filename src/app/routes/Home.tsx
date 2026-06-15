import { useState } from "react";
import TimeSlot from "../../components/bookings/features/TimeSlot";
import Calendar from "../../components/bookings/calender/Calendar";

function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div>
      <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      <TimeSlot selectedDate={selectedDate} />
    </div>
  );
}

export default Home;
