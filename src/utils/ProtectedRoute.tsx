import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth/hooks/authStore";
import FintechLoader from "../components/ui/FintechLoader";

function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);
  const hydrated = useAuthStore((state) => state.hydrated);
  const { user } = useAuthStore();

  if (!hydrated) {
    return (
      <div>
        <FintechLoader isLoading={true} />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <FintechLoader isLoading={true} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
