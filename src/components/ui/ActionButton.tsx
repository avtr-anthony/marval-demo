import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/utils/cn";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger";
}

/**
 * Styled button for interactive controls inside chat and FAQs.
 */
export function ActionButton({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-pill px-5 py-2.5 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-40",
        variant === "primary" && "bg-accent text-slate-950 shadow-ambient-sm hover:brightness-110",
        variant === "ghost" && "border border-stroke-soft bg-panel-soft text-ink hover:bg-panel",
        variant === "danger" && "border border-danger/40 bg-danger/10 text-danger hover:bg-danger/20",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
