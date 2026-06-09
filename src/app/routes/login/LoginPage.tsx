import { useState } from "react";
import LeftPanel from "./LeftPanel";
import LoginCard from "./LoginCard";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/hooks/authStore";
import { useLoader } from "../../../components/contexts/LoaderComtext";

export default function LoginPage(): React.JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const navigate = useNavigate();

  const { login } = useAuthStore();
  const { showLoader, hideLoader } = useLoader();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    showLoader();

    try {
      login(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
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
    <div
      className="flex min-h-screen"
      style={{
        background: "#07101e",
        fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
      }}
    >
      <LeftPanel />

      <div
        className="flex flex-1 lg:max-w-[46%] items-center justify-center p-6 sm:p-10"
        style={{
          background: "#09121f",
        }}
      >
        <LoginCard
          email={email}
          password={password}
          rememberMe={rememberMe}
          setEmail={setEmail}
          setPassword={setPassword}
          setRememberMe={setRememberMe}
          onSubmit={handleSubmit}
          onForgotPassword={handleForgotPassword}
          onSecureAccess={handleSecureAccess}
        />
      </div>
    </div>
  );
}
