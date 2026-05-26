import { createHashRouter } from "react-router-dom";
import BookingPage from "./routes/BookingPage";
import LoginPage from "./routes/LoginPage";
import DashboardPage from "./routes/DashboardPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <BookingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);
