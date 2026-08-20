import { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  /** Use "otp" for large centered, letter-spaced verification code input */
  variant?: "default" | "otp";
}

export function FormField({ label, variant = "default", id, ...props }: FormFieldProps) {
  const baseClasses =
    "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition";
  const otpClasses = "text-center text-lg tracking-[0.4em] placeholder:tracking-[0.4em]";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        className={`${baseClasses} ${variant === "otp" ? otpClasses : ""}`}
        {...props}
      />
    </div>
  );
}