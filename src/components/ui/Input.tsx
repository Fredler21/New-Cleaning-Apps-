import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-xl px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${className}`}
      style={{
        background: "var(--input-bg)",
        border: "1px solid var(--input-border)",
        color: "var(--text)"
      }}
      {...props}
    />
  );
}
