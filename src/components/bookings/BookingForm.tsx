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
};

const BookingForm = ({ selectedSlot, selectedDate }: Props) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setError("");
    setSuccess("");

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    if (!selectedSlot || !selectedDate) {
      setError("Select a date and time slot");
      return;
    }

    if (!trimmedName || !trimmedEmail) {
      setError("Name and email are required");
      return;
    }

    setError("");
    showLoader();

    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      date,
      time_slot: minutesToTime(selectedSlot.start),
    };

    createBookingMutation.mutate(payload, {
      onError: (error) => {
        setError(getErrorMessage(error));
      },
      onSuccess: () => {
        setSuccess("Booking success !!!");
        setFormData({ name: "", email: "" });
      },
      onSettled: hideLoader,
    });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-bg-elevated p-6 shadow-lg border border-border-default text-pretty"
      >
        <div className="mb-4">
          <div className="text-sm font-semibold text-text-muted">Booking</div>
          <h4 className="mt-1 text-lg font-bold text-text-primary">
            Confirm your appointment
          </h4>
          <p className="mt-2 text-sm text-text-muted">
            Provide your details to complete the booking.
          </p>
        </div>
        {error && (
          <div className="text-sm text-center text-danger">{error}</div>
        )}
        {success && (
          <div className="font-medium text-center text-success">{success}</div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <label className="block">
            <div className="mb-1 text-sm font-medium text-text-muted">Name</div>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-md bg-bg-surface border border-border-default px-3 py-2 text-text-primary placeholder:text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </label>

          <label className="block">
            <div className="mb-1 text-sm font-medium text-text-muted">
              Email
            </div>
            <input
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-md bg-bg-surface border border-border-default px-3 py-2 text-text-primary placeholder:text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <div className="mb-1 text-sm font-medium text-text-muted">
                Date
              </div>
              <input
                name="date"
                type="text"
                value={date}
                readOnly
                className="block w-full rounded-md bg-bg-surface border border-border-default px-3 py-2 text-text-primary placeholder:text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </label>

            <label className="block">
              <div className="mb-1 text-sm font-medium text-text-muted">
                Time slot
              </div>
              <input
                name="time_slot"
                type="text"
                value={timeSlot}
                readOnly
                className="block w-full rounded-md bg-bg-surface border border-border-default px-3 py-2 text-text-primary placeholder:text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-2 rounded-md bg-primary text-white py-3 font-semibold shadow-subtle hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
