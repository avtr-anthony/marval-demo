import type { CSSProperties, HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  delayMs?: number;
}

/**
 * Applies a subtle entrance animation with configurable delay.
 */
export function Reveal({ className, style, delayMs = 0, ...props }: RevealProps) {
  return (
    <div
      className={cn("animate-fade-up opacity-0", className)}
      style={{ ...(style as CSSProperties), animationDelay: `${delayMs}ms` }}
      {...props}
    />
  );
}
