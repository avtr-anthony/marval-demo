import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/utils/cn";

interface ActionLinkProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  variant?: "primary" | "ghost";
}

/**
 * Styled link component for primary and secondary CTAs.
 */
export function ActionLink({
  children,
  className,
  variant = "primary",
  ...props
}: ActionLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center rounded-pill px-5 py-2.5 text-sm font-semibold transition duration-300",
        variant === "primary"
          ? "bg-accent text-[var(--color-accent-contrast)] shadow-ambient-sm hover:brightness-110"
          : "border border-stroke-soft bg-panel-soft text-ink hover:bg-panel",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
