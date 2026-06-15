import { useState } from "react";
import TimeSlot from "../../components/bookings/TimeSlot";
import Calendar from "../../features/calender/Calendar";
import BookingForm from "../../components/bookings/BookingForm";
import HeroImg from "../../assets/illustration/Home UI.jpg";
function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  function onSelectSlot(slot) {
    setSelectedSlot(slot);
  }

  return (
    <main className="min-h-screen bg-bg-surface text-text-primary">
      {/* Hero */}
      <section className="w-full bg-gradient-to-b from-bg-surface/60 via-bg-surface/80 to-bg-surface/95">
        <div className="mx-auto max-w-4xl px-6 py-12 text-center">
          <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Book premium appointments with ease
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-sm sm:text-base text-text-muted">
            Seamless scheduling for professionals — a modern booking experience
            built for conversion and delight.
          </p>
          <div className="flex justify-center gap-3">
            <a
              href="#booking"
              className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-subtle hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Book a slot
            </a>
            <a
              href="#about"
              className="inline-flex items-center rounded-full border border-border-default px-5 py-3 text-sm font-medium text-text-muted hover:bg-primary-soft"
            >
              Learn more
            </a>
          </div>
          <div className="mt-8">
            <img
              src={HeroImg}
              alt="Hero illustration"
              className="mx-auto max-w-[520px] rounded-lg shadow-subtle"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-4xl px-6 py-12">
        <div className="prose mx-auto text-center prose-sm prose-a:text-primary">
          <h2 className="text-2xl font-bold">Why choose us</h2>
          <p className="mx-auto max-w-2xl text-text-muted">
            We provide a reliable booking experience with clear availability,
            instant confirmations, and a beautiful interface tailored for busy
            professionals.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-bg-app py-10">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-6 text-center text-lg font-semibold">
            Our Services
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-border-default bg-bg-elevated p-6 shadow-subtle">
              <h4 className="mb-2 text-base font-semibold">Consultation</h4>
              <p className="text-sm text-text-muted">
                One-on-one strategy and planning sessions.
              </p>
            </div>
            <div className="rounded-lg border border-border-default bg-bg-elevated p-6 shadow-subtle">
              <h4 className="mb-2 text-base font-semibold">Implementation</h4>
              <p className="text-sm text-text-muted">
                Hands-on execution and delivery support.
              </p>
            </div>
            <div className="rounded-lg border border-border-default bg-bg-elevated p-6 shadow-subtle">
              <h4 className="mb-2 text-base font-semibold">Review</h4>
              <p className="text-sm text-text-muted">
                Follow-up and continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="mx-auto max-w-6xl px-6 py-12">
        <h3 className="mb-6 text-center text-xl font-semibold">Book a time</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="sticky top-6 rounded-lg border border-border-default bg-bg-elevated p-4 shadow-subtle">
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="rounded-lg border border-border-default bg-bg-elevated p-4 shadow-subtle">
              <TimeSlot
                selectedDate={selectedDate}
                onSelectSlot={onSelectSlot}
              />
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="rounded-lg border border-border-default bg-bg-elevated p-4 shadow-subtle">
              <BookingForm
                selectedSlot={selectedSlot}
                selectedDate={selectedDate}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-bg-surface py-10">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h4 className="mb-4 text-lg font-semibold">What clients say</h4>
          <p className="mx-auto max-w-2xl text-sm text-text-muted">
            "Fast, reliable, and beautifully designed — booking has never been
            easier." — Happy Customer
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-lg border border-border-default bg-bg-elevated p-6 text-center shadow-subtle">
          <h5 className="mb-2 text-lg font-semibold">Contact us</h5>
          <p className="mb-4 text-sm text-text-muted">
            Questions? Email us at
            <a
              href="mailto:hello@example.com"
              className="ml-1 font-medium text-primary"
            >
              hello@example.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
