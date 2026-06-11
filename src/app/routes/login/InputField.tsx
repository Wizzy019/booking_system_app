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
    <div className="relative flex items-center w-full">
      <span className="absolute left-4 z-10 flex items-center pointer-events-none text-(--text-secondary)">
        {leftIcon}
      </span>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="w-full h-14 rounded-lg md:rounded-xl pl-12 pr-12 text-sm text-(--text-primary) placeholder:text-(--text-secondary) bg-transparent border border-(--border-default) transition-all duration-150 focus:border-(--primary) focus:border-[1.5px] focus:ring-2 focus:ring-(--primary-soft) outline-none"
      />

      {rightElement && (
        <span className="absolute right-4 z-10 flex items-center text-(--text-secondary)">
          {rightElement}
        </span>
      )}
    </div>
  );
}
