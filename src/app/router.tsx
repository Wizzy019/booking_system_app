import { createHashRouter } from "react-router-dom";
import BookingPage from "./routes/BookingPage";
import LoginPage from "./routes/login/LoginPage";
import DashboardPage from "./routes/DashboardPage";
import ProtectedRoute from "../utils/ProtectedRoute";

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
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);
