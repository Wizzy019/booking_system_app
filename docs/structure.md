src/
│
├── app/
│ ├── routes/
│ │ ├── BookingPage.tsx
│ │ ├── LoginPage.tsx
│ │ ├── DashboardPage.tsx
│ │
│ └── router.tsx
│
├── components/
│ │
│ ├── ui/ # reusable design system
│ │ ├── Button.tsx
│ │ ├── Input.tsx
│ │ ├── Card.tsx
│ │ ├── Badge.tsx
│ │ ├── Modal.tsx
│ │ ├── Table.tsx
│ │ └── Select.tsx
│ │
│ ├── layout/
│ │ ├── Navbar.tsx
│ │ ├── Sidebar.tsx
│ │ ├── DashboardLayout.tsx
│ │ └── PageHeader.tsx
│ │
│ ├── booking/
│ │ ├── DatePicker.tsx
│ │ ├── SlotGrid.tsx
│ │ ├── BookingForm.tsx
│ │ └── ConfirmBookingButton.tsx
│ │
│ ├── auth/
│ │ └── LoginForm.tsx
│ │
│ └── dashboard/
│ ├── StatsCard.tsx
│ ├── RecentActivity.tsx
│ ├── AvailabilityForm.tsx
│ ├── BookingTable.tsx
│ └── BookingActions.tsx
│
├── features/
│ │
│ ├── booking/
│ │ ├── hooks/
│ │ │ ├── useBooking.ts
│ │ │ └── useSlots.ts
│ │ │
│ │ ├── services/
│ │ │ └── bookingApi.ts
│ │ │
│ │ └── types.ts
│ │
│ ├── auth/
│ │ ├── hooks/
│ │ │ └── useAuth.ts
│ │ ├── services/
│ │ │ └── authApi.ts
│ │ └── types.ts
│ │
│ └── dashboard/
│ ├── hooks/
│ │ ├── useDashboard.ts
│ │ └── useAvailability.ts
│ │
│ ├── services/
│ │ ├── dashboardApi.ts
│ │ └── availabilityApi.ts
│ │
│ └── types.ts
│
├── lib/
│ ├── supabase.ts
│ ├── axios.ts
│ └── utils.ts
│
├── styles/
│ ├── globals.css
│ ├── tokens.css
│ └── tailwind.css
│
├── types/
│ ├── booking.ts
│ ├── user.ts
│ └── availability.ts
│
├── constants/
│ ├── routes.ts
│ └── dashboard.ts
│
├── assets/
│ ├── images/
│ └── icons/
│
├── hooks/
│ └── useLocalStorage.ts
│
└── main.tsx

src
│
├── pages
│ └── DashboardPage.tsx
│
├── layouts
│ └── DashboardLayout.tsx
│
├── components
│ └── dashboard
│ ├── Sidebar.tsx
│ ├── Navbar.tsx
│ ├── StatCards.tsx
│ ├── DashboardTable.tsx
│ ├── ScheduleCalendarCard.tsx
│ ├── AvailabilityCard.tsx
│ ├── UpcomingConsultationCard.tsx
│ └── SectionHeader.tsx
│
├── features
│ ├── bookings
│ ├── availability
│ └── dashboard
│
└── services
