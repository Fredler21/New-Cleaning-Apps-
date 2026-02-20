import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function Button({ children, className = "", variant = "primary", size = "md", ...props }: ButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm hover:shadow-md hover:brightness-105 active:scale-[0.97]",
    secondary:
      "border active:scale-[0.97]",
    ghost:
      "bg-transparent"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-[15px]"
  };

  const themeStyle =
    variant === "secondary"
      ? { background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }
      : variant === "ghost"
        ? { color: "var(--text-secondary)" }
        : undefined;

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${sizes[size]} ${variants[variant]} ${className}`}
      style={themeStyle}
      {...props}
    >
      {children}
    </button>
  );
}
