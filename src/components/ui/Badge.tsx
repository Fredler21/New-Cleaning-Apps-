import type { PropsWithChildren } from "react";

type BadgeProps = PropsWithChildren<{
  variant?: "default" | "featured" | "trending" | "teal" | "gold";
}>;

export function Badge({ children, variant = "default" }: BadgeProps) {
  const styles = {
    default: "",
    featured: "border-amber-300/40 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400",
    trending: "border-orange-300/40 bg-orange-50 text-orange-700 dark:border-orange-400/30 dark:bg-orange-500/10 dark:text-orange-300",
    teal: "border-teal-300/40 bg-teal-50 text-teal-700 dark:border-teal-400/30 dark:bg-teal-500/10 dark:text-teal-300",
    gold: "border-amber-300/40 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400"
  };

  const defaultStyle =
    variant === "default"
      ? { background: "var(--badge-bg)", borderColor: "var(--badge-border)", color: "var(--badge-text)" }
      : undefined;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${styles[variant]}`}
      style={defaultStyle}
    >
      {children}
    </span>
  );
}
