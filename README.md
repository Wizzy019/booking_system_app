Consultant Booking System

A modern booking platform that enables consultants to manage their availability and allows clients to schedule consultations seamlessly.

✨ Features

- User authentication and authorization
- Consultant dashboard
- Availability management
- Create, update, and delete availability slots
- Book consultations
- Calendar-based scheduling interface
- Responsive design for desktop and mobile devices
- Real-time UI updates using React Query

🛠️ Tech Stack

Frontend

- React
- TypeScript
- Tailwind CSS v4
- React Router
- TanStack Query (React Query)
- Axios
- Lucide React

Backend

- FastAPI
- PostgreSQL
- SQLAlchemy

📸 Screenshots

Dashboard

"Dashboard Screenshot"
(./docs/screenshots/dashboard.png)
Booking Flow

"Booking Screenshot"
(./docs/screenshots/booking_page.png)

🚀 Getting Started

Prerequisites

- Node.js (v18 or later)
- npm
- Backend API running locally or deployed

Installation

Clone the repository:

git clone https://github.com/Wizzy019/booking_sysytem_app

Navigate into the project directory:

cd booking_sysytem_app

Install dependencies:

npm install

Create a ".env" file in the root directory and add:

VITE_API_BASE_URL=bookingsystemapi-production-d728.up.railway.app

Start the development server:

npm run dev

The application should now be running at:

http://localhost:5173

📂 Project Structure

src/
├── components/
├── pages/
├── hooks/
├── services/
├── routes/
├── types/
├── layouts/
├── lib/
└── utils/

🔄 State Management

Server state is managed using TanStack Query, enabling:

- Efficient data fetching
- Automatic caching
- Background refetching
- Optimistic UI updates

🎯 Future Improvements

- Email notifications
- Payment integration
- Video consultation integration
- Consultant profile customization
- Admin dashboard
- Analytics and reporting

🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create your feature branch:

git checkout -b feature/my-feature

3. Commit your changes:

git commit -m "Add new feature"

4. Push to the branch:

git push origin feature/my-feature

5. Open a Pull Request

📄 License

This project is licensed under the MIT License.
