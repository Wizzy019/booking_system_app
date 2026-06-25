import { X } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { useLoader } from "../../contexts/LoaderContext";
import { useCreateAvailability } from "../../features/booking/hooks/useAvailability";
import { getErrorMessage } from "../../utils/erroMessage";

type AvailabilityModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  day_of_week: number;
  start_time: string;
  end_time: string;
};

function AvailabilityModal({ isOpen, onClose }: AvailabilityModalProps) {
  const [day, setDay] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<FormData>({
    day_of_week: 0,
    start_time: "",
    end_time: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { hideLoader, showLoader } = useLoader();
  const createAvailabilityMutation = useCreateAvailability();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const startTime = formData.start_time.trim();
    const endTime = formData.end_time.trim();

    if (!startTime || !endTime) {
      setError("Start Time and End Time are required");
      return;
    }

    setError("");
    showLoader();

    const payload = {
      day_of_week: day,
      start_time: startTime,
      end_time: endTime,
    };

    createAvailabilityMutation.mutate(payload, {
      onError: (error) => {
        setError(getErrorMessage(error));
      },
      onSuccess: () => {
        setSuccess("Availability Added!!!");
        console.log("Availability Added!!!");
        setFormData({ day_of_week: 0, start_time: "", end_time: "" });
      },
      onSettled: hideLoader,
    });
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      )}

      {/* Modal */}
      <div
        className={`fixed top-50 right-0 z-50 w-full max-w-md bg-bg-elevated rounded-3xl shadow-xl transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">Availability</h2>

          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          {/* Your form goes here */}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block  text-text-secondary">Day</label>
              <select
                className="w-full rounded border p-2 bg-bg-elevated"
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
              >
                <option value={0}>Monday</option>
                <option value={1}>Tuesday</option>
                <option value={2}>Wednesday</option>
                <option value={3}>Thursday</option>
                <option value={4}>Friday</option>
                <option value={5}>Saturday</option>
                <option value={6}>Sunday</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-text-secondary">
                Start Time
              </label>
              <input
                name="start_time"
                type="text"
                value={formData.start_time}
                placeholder="08:30:20"
                className="w-full rounded border p-2"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-1 block text-text-secondary">End Time</label>
              <input
                name="end_time"
                type="text"
                value={formData.end_time}
                placeholder="17:30:20"
                className="w-full rounded border p-2"
                onChange={handleChange}
              />
            </div>

            <button
              className="w-full rounded bg-primary p-2 text-text-primary"
              type="submit"
            >
              Save Availability
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AvailabilityModal;
