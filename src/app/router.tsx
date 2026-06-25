import { createHashRouter } from "react-router-dom";
import LoginPage from "./routes/login/LoginPage";
import DashboardPage from "./routes/DashboardPage";
import ProtectedRoute from "../utils/ProtectedRoute";
import Home from "./routes/Home";

export const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
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
