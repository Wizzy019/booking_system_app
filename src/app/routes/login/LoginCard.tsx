import React from "react";
import InputField from "./InputField";

import { LogoMark, IconMail, IconLock, IconEye, IconEyeOff } from "./Icons";
import { useAuthStore } from "../../../features/auth/hooks/authStore";

interface LoginCardProps {
  id?: string;
  email: string;
  password: string;
  rememberMe: boolean;

  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onForgotPassword?: () => void;
  onSecureAccess?: () => void;
}

export default function LoginCard({
  email,
  password,
  rememberMe,
  setEmail,
  setPassword,
  setRememberMe,
  onSubmit,
  onForgotPassword,
  onSecureAccess,
}: LoginCardProps): React.JSX.Element {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { loading } = useAuthStore();

  return (
    <div
      className="w-full rounded-3xl p-9"
      style={{
        maxWidth: 430,
        background: "rgba(11, 20, 38, 0.98)",
        border: "1px solid rgba(255,255,255,0.065)",
        boxShadow: "0 40px 90px rgba(0,0,0,0.55)",
      }}
    >
      {/* BRAND */}
      <div className="flex items-center gap-3 mb-8">
        <LogoMark />
        <span className="text-white font-semibold text-[15px] tracking-wide">
          Business logo
        </span>
      </div>

      {/* HEADER */}
      <div className="mb-7">
        <h1
          className="text-white font-bold tracking-tight leading-tight mb-2.5"
          style={{ fontSize: 30 }}
        >
          Welcome Back
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Sign in to manage bookings and appointments
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={onSubmit} noValidate className="space-y-3.5">
        {/* EMAIL */}
        <InputField
          id="email"
          type="email"
          placeholder="you@business.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<IconMail />}
          autoComplete="email"
        />

        {/* PASSWORD */}
        <InputField
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<IconLock />}
          autoComplete="current-password"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="text-slate-500 hover:text-slate-300 transition-colors p-0.5"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <IconEye /> : <IconEyeOff />}
            </button>
          }
        />

        {/* REMEMBER + FORGOT */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2.5 cursor-pointer select-none group">
            <input
              type="checkbox"
              className="sr-only"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />

            <div
              className="w-4 h-4 rounded flex items-center justify-center transition-all duration-150"
              style={{
                background: rememberMe ? "#2563eb" : "transparent",
                border: ` 1.5px solid ${
                  rememberMe ? "#2563eb" : "rgba(70,100,155,0.6)"
                }`,
              }}
            >
              {rememberMe && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path
                    d="M1 3.5l2.2 2.2L8 1"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">
              Remember me
            </span>
          </label>

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* CTA */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide transition-all duration-200 active:scale-[0.985]"
          style={{
            background: "linear-gradient(135deg, #2563eb 0%, #1a4fd8 100%)",
            boxShadow: "0 4px 22px rgba(37,99,235,0.42)",
          }}
        >
          {loading ? "Loggng in ..." : "Primary Login"}
        </button>
      </form>

      {/* DIVIDER */}
      <div
        className="my-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      />

      {/* SECONDARY ACTION */}
      <button
        type="button"
        onClick={onSecureAccess}
        className="w-full text-center text-slate-500 hover:text-slate-400 text-xs transition-colors"
      >
        Secure business access (optional)
      </button>
    </div>
  );
}
