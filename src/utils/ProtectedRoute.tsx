import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth/hooks/authStore";
import FintechLoader from "../components/ui/FintechLoader";

function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);
  const hydrated = useAuthStore((state) => state.hydrated);

  if (!hydrated) {
    return (
      <div>
        <FintechLoader />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
