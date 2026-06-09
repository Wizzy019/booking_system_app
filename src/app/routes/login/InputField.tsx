import React from "react";

interface InputFieldProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leftIcon: React.ReactNode;
  rightElement?: React.ReactNode;
  autoComplete?: string;
}

export default function InputField({
  id,
  type,
  placeholder,
  value,
  onChange,
  leftIcon,
  rightElement,
  autoComplete,
}: InputFieldProps) {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-4 z-10 flex items-center pointer-events-none">
        {leftIcon}
      </span>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="w-full rounded-xl py-3.5 pl-11 pr-12 text-sm text-white placeholder-slate-600 outline-none"
      />

      {rightElement && (
        <span className="absolute right-4 z-10 flex items-center">
          {rightElement}
        </span>
      )}
    </div>
  );
}
