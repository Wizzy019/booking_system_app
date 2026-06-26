import { useState } from "react";
import TimeSlot from "../../components/bookings/TimeSlot";
import Calendar from "../../features/calender/Calendar";
import BookingForm from "../../components/bookings/BookingForm";
import { Link } from "react-router-dom";
import Consusltant from "../../assets/images/Home/consultant.jpg";
import Professional from "../../assets/images/Home/professional.jpg";
import { type Slot } from "../../components/bookings/TimeSlot";

function QuickLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <li className={`cursor-pointer hover:text-primary${className}`}>
      {children}
    </li>
  );
}

function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  function onSelectSlot(slot: Slot) {
    setSelectedSlot(slot);
  }

  return (
    <main className="min-h-screen bg-bg-surface text-text-primary">
      {/* Hero */}
      <section className="w-full bg-linear-to-b from-bg-surface/60 via-bg-surface/80 to-bg-surface/95">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="text-center md:text-left">
              <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                Book premium appointments with ease
              </h1>
              <p className="mx-auto md:mx-0 mb-6 max-w-xl text-sm sm:text-base text-text-muted">
                Seamless scheduling for professionals — a modern booking
                experience built for conversion and delight.
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-start justify-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-subtle hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Book a slot
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-border-default px-5 py-3 text-sm font-medium text-text-muted hover:bg-primary-soft"
                >
                  Learn more
                </a>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-md rounded-xl bg-bg-elevated p-6 shadow-lg">
                <div className="flex h-56 md:h-72 items-center justify-center rounded-lg border border-border-default bg-bg-surface">
                  <img src={Consusltant} alt="An Apex Consultant" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-lg bg-bg-elevated p-4 text-center shadow-subtle">
            <div className="text-xl font-semibold">12+</div>
            <div className="text-sm text-text-muted">Years Experience</div>
          </div>
          <div className="rounded-lg bg-bg-elevated p-4 text-center shadow-subtle">
            <div className="text-xl font-semibold">98%</div>
            <div className="text-sm text-text-muted">Client Satisfaction</div>
          </div>
          <div className="rounded-lg bg-bg-elevated p-4 text-center shadow-subtle">
            <div className="text-xl font-semibold">Flexible</div>
            <div className="text-sm text-text-muted">Scheduling</div>
          </div>
          <div className="rounded-lg bg-bg-elevated p-4 text-center shadow-subtle">
            <div className="text-xl font-semibold">Certified</div>
            <div className="text-sm text-text-muted">Experts</div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold">Why choose us</h2>
            <p className="mt-4 max-w-xl text-text-muted">
              We provide a reliable booking experience with clear availability,
              instant confirmations, and a beautiful interface tailored for busy
              professionals.
            </p>
            <a
              href="#"
              className="mt-6 inline-block text-sm font-medium text-primary"
            >
              Learn about our approach →
            </a>
          </div>
          <div className="order-first md:order-last">
            <div className="rounded-lg bg-bg-elevated p-6 shadow-subtle">
              <div className="h-48 md:h-64 flex items-center justify-center rounded-md border border-border-default bg-bg-surface">
                <img src={Professional} alt="Apex consultation meeting" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-bg-app py-10">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="mb-6 text-center text-lg font-semibold">
            Our Services
          </h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-bg-elevated p-6 shadow-lg border border-border-default">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-bg-surface flex items-center justify-center border border-border-default">
                  <span className="text-text-muted text-sm">Icon</span>
                </div>
                <div>
                  <h4 className="mb-1 text-base font-semibold">Consultation</h4>
                  <p className="text-sm text-text-muted">
                    One-on-one strategy and planning sessions.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm font-medium text-text-primary">
                      Price
                    </div>
                    <a className="text-sm text-primary" href="#">
                      Learn more →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-bg-elevated p-6 shadow-lg border border-border-default">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-bg-surface flex items-center justify-center border border-border-default">
                  <span className="text-text-muted text-sm">Icon</span>
                </div>
                <div>
                  <h4 className="mb-1 text-base font-semibold">
                    Implementation
                  </h4>
                  <p className="text-sm text-text-muted">
                    Hands-on execution and delivery support.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm font-medium text-text-primary">
                      Price
                    </div>
                    <a className="text-sm text-primary" href="#">
                      Learn more →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-bg-elevated p-6 shadow-lg border border-border-default">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-bg-surface flex items-center justify-center border border-border-default">
                  <span className="text-text-muted text-sm">Icon</span>
                </div>
                <div>
                  <h4 className="mb-1 text-base font-semibold">Review</h4>
                  <p className="text-sm text-text-muted">
                    Follow-up and continuous improvement.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm font-medium text-text-primary">
                      Price
                    </div>
                    <a className="text-sm text-primary" href="#">
                      Learn more →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="mx-auto max-w-7xl px-6 py-12">
        <h3 className="mb-6 text-center text-xl font-semibold">Book a time</h3>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="sticky top-6 rounded-xl bg-bg-elevated p-6 shadow-lg border border-border-default">
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="rounded-xl bg-bg-elevated p-6 shadow-lg border border-border-default">
              <TimeSlot
                selectedDate={selectedDate}
                onSelectSlot={onSelectSlot}
              />
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="rounded-xl bg-bg-elevated p-6 shadow-lg border border-border-default">
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
        <div className="mx-auto max-w-7xl px-6">
          <h4 className="mb-6 text-center text-lg font-semibold">
            What clients say
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg bg-bg-elevated p-6 shadow-subtle border border-border-default">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-bg-surface flex items-center justify-center">
                  A
                </div>
                <div>
                  <div className="text-sm font-semibold">Happy Customer</div>
                  <div className="text-sm text-text-muted">
                    "Fast, reliable, and beautifully designed."
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-bg-elevated p-6 shadow-subtle border border-border-default">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-bg-surface flex items-center justify-center">
                  B
                </div>
                <div>
                  <div className="text-sm font-semibold">Satisfied Client</div>
                  <div className="text-sm text-text-muted">
                    "Great communication and flexible scheduling."
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-bg-elevated p-6 shadow-subtle border border-border-default">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-bg-surface flex items-center justify-center">
                  C
                </div>
                <div>
                  <div className="text-sm font-semibold">Long-term Partner</div>
                  <div className="text-sm text-text-muted">
                    "Professional and trustworthy service."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg bg-bg-elevated p-6 shadow-subtle border border-border-default">
            <h5 className="mb-3 text-lg font-semibold">Contact</h5>
            <div className="text-sm text-text-muted">
              <div className="mb-2">
                <strong>Phone:</strong> (555) 123-4567
              </div>
              <div className="mb-2">
                <strong>Email:</strong>{" "}
                <a href="#" className="text-primary">
                  apexconsultant@google.com
                </a>
              </div>
              <div className="mb-2">
                <strong>Hours:</strong> Mon–Fri, 9am–5pm
              </div>
              <div className="mb-2">
                <strong>Address:</strong> 123 Business St, City
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-bg-elevated p-6 shadow-subtle border border-border-default">
            <div className="h-64 flex items-center justify-center rounded-md border border-border-default bg-bg-surface">
              <span className="text-text-muted">Map placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-app">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col md:flex-row md:justify-between gap-6">
            <div>
              <div className="text-xl font-bold">Apex Consulting</div>
              <div className="mt-2 text-sm text-text-muted">
                Executive advisory for strategic growth.
              </div>
            </div>
            <div className="flex gap-12">
              <div>
                <div className="font-semibold">Quick links</div>
                <ul className="mt-2 text-sm text-text-muted">
                  <QuickLink className="cursor-pointer">Service</QuickLink>
                  <QuickLink className="cursor-pointer">Pricing</QuickLink>
                  <QuickLink className="cursor-pointer">Contact</QuickLink>
                </ul>
              </div>
              <div>
                <div className="font-semibold">Contact</div>
                <div className="mt-2 text-sm text-text-muted cursor-pointer">
                  hello@example.com
                </div>
                <p className="text-primary">
                  <Link to="/login">Business login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

{
  /* Testimonials */
}
<section className="bg-bg-surface py-10">
  <div className="mx-auto max-w-4xl px-6 text-center">
    <h4 className="mb-4 text-lg font-semibold">What clients say</h4>
    <p className="mx-auto max-w-2xl text-sm text-text-muted">
      "Fast, reliable, and beautifully designed — booking has never been
      easier." — Happy Customer
    </p>
  </div>
</section>;

{
  /* Contact */
}
<section className="mx-auto max-w-4xl px-6 py-12">
  <div className="rounded-lg border border-border-default bg-bg-elevated p-6 text-center shadow-subtle">
    <h5 className="mb-2 text-lg font-semibold">Contact us</h5>
    <p className="mb-4 text-sm text-text-muted">
      Questions? Email us at
      <a href="#" className="ml-1 font-medium text-primary">
        hello@example.com
      </a>
    </p>
  </div>
</section>;
export default Home;
