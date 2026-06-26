import { useState } from "react";
import LeftPanel from "./LeftPanel";
import LoginCard from "./LoginCard";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/hooks/authStore";
import { useLoader } from "../../../contexts/LoaderContext";

export default function LoginPage(): React.JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();

  const navigate = useNavigate();

  const { login } = useAuthStore();

  const error = useAuthStore((state) => state.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    showLoader();

    try {
      await login(email, password);

      const latestError = useAuthStore.getState().error;

      if (!latestError) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("unexpected error:", err);
    }
    hideLoader();
  };

  const handleForgotPassword = (): void => {
    console.log("Forgot password");
  };

  const handleSecureAccess = (): void => {
    console.log("Secure access");
  };

  return (
    <div className="flex min-h-screen ">
      <LeftPanel />

      <div className="flex-1 p-2 flex items-center justify-center">
        <div className="flex justify-center">
          <LoginCard
            email={email}
            password={password}
            rememberMe={rememberMe}
            error={error}
            setEmail={setEmail}
            setPassword={setPassword}
            setRememberMe={setRememberMe}
            onSubmit={handleSubmit}
            onForgotPassword={handleForgotPassword}
            onSecureAccess={handleSecureAccess}
          />
        </div>
      </div>
    </div>
  );
}
