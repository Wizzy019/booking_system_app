import React from "react";
import InputField from "./InputField";

import { IconMail, IconLock, IconEye, IconEyeOff } from "./Icons";
import Logo from "../../../assets/logo.svg";
import { useAuthStore } from "../../../features/auth/hooks/authStore";

interface LoginCardProps {
  id?: string;
  email: string;
  password: string;
  error: string | null;
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
  error,
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
    <div className="flex flex-col rounded-xl p-6 bg-(--bg-surface) border border-(--border-default) shadow-[0_12px_40px_rgba(2,6,23,0.6)] gap-4">
      {/* BRAND */}
      <div className="flex items-center gap-2 mb-3">
        <img src={Logo} alt="logo" className="size-20" />
        <span className="text-sm font-semibold tracking-wide text-(--text-primary)"></span>
      </div>

      {/* HEADER */}
      <div className="mb-4">
        <h1 className="text-xl md:text-2xl text-(--text-primary) font-extrabold tracking-tight leading-tight mb-1">
          Welcome Back
        </h1>

        <p className="text-xs md:text-sm text-(--text-secondary) leading-snug">
          Sign in to manage bookings and appointments
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        {/* ERROE */}
        {error && (
          <div className="text-red-500 text-sm px-3 py-1  border-(--border-default) rounded-2xl text-center max-h-20 overflow-auto break-words whitespace-normal">
            {error}
          </div>
        )}
        {/* INPUTS */}
        <div className="space-y-3">
          <InputField
            id="email"
            type="email"
            placeholder="you@business.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<IconMail />}
            autoComplete="email"
          />

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
                className="p-0.5 text-slate-500 transition-colors hover:text-slate-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <IconEye /> : <IconEyeOff />}
              </button>
            }
          />
        </div>

        {/* REMEMBER + FORGOT */}
        <div className="flex items-center justify-between pt-1">
          <label className="group flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              className="sr-only"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />

            <div
              className={`flex h-4 w-4 items-center justify-center rounded-md transition-all duration-150 shadow-sm ${
                rememberMe
                  ? "border-(--primary) bg-(--primary)"
                  : "border-(--border-default) bg-transparent"
              }`}
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

            <span className="text-xs text-(--text-secondary) transition-colors group-hover:text-(--text-primary)">
              Remember me
            </span>
          </label>

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm font-medium text-(--primary) transition-colors hover:text-(--primary-hover)"
          >
            Forgot password?
          </button>
        </div>

        {/* CTA */}
        <button
          type="submit"
          className="h-10 w-full rounded-lg bg-(--primary) hover:bg-(--primary-hover) text-sm font-semibold tracking-wide text-white transition-transform duration-150 active:scale-[0.985] shadow-sm hover:shadow-md"
        >
          {loading ? "Loggng in ..." : "Primary Login"}
        </button>
      </form>

      {/* DIVIDER */}
      <div className="my-6 border-t border-[rgba(255,255,255,0.06)]" />
      {/* SECONDARY ACTION */}
      <button
        type="button"
        onClick={onSecureAccess}
        className="w-full text-center text-xs text-(--text-secondary) transition-colors hover:text-(--text-primary)"
      >
        Secure business access (optional)
      </button>
    </div>
  );
}
