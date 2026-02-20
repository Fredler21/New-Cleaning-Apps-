import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-premium-teal to-cyan-600 text-white hover:from-cyan-600 hover:to-premium-teal focus-visible:outline-premium-teal shadow-premium",
    secondary:
      "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 focus-visible:outline-white",
    ghost: "bg-transparent text-premium-mist hover:bg-white/10 focus-visible:outline-premium-mist"
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
