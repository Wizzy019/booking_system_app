import { useState, type ChangeEvent } from "react";
import { minutesToTime } from "../../utils/formatTime";
import { formatDateToString } from "../../utils/formatDateToString";
import { useCreateBooking } from "../../features/booking/hooks/useBooking";
import { useLoader } from "../../contexts/LoaderContext";
import { getErrorMessage } from "../../utils/erroMessage";

type Slot = { start: number; end: number };

type FormData = {
  name: string;
  email: string;
};

type Props = {
  selectedSlot: Slot | null;
  selectedDate: Date | null;
  // bookingError: string;
  // bookingSuccess: string;
};

const BookingForm = ({
  selectedSlot,
  selectedDate,
  // bookingError,
  // bookingSuccess,
}: Props) => {
  const createBookingMutation = useCreateBooking();
  const { showLoader, hideLoader } = useLoader();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // derived values (NO STATE)
  const date = selectedDate ? formatDateToString(selectedDate) : "";

  const timeSlot = selectedSlot
    ? `${minutesToTime(selectedSlot.start)} - ${minutesToTime(
        selectedSlot.end,
      )}`
    : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !selectedDate) return;
    showLoader();

    const payload = {
      name: formData.name,
      email: formData.email,
      date,
      time_slot: minutesToTime(selectedSlot.start),
    };

    createBookingMutation.mutate(payload, {
      onError: (error) => {
        const message = getErrorMessage(error);
        // bookingError = message;
        console.log(message);
      },

      onSuccess: () => {
        // bookingSuccess = "Booking succesful";
        console.log("Booking success");
      },

      onSettled: () => {
        hideLoader();
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Email :
            <input
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Date:
            <input name="date" type="text" value={date} readOnly />
          </label>
        </div>

        <div>
          <label>
            Time slot:
            <input name="time_slot" type="text" value={timeSlot} readOnly />
          </label>
        </div>
        <button type="submit" className="cursor-pointer">
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
