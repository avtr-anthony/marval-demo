import type { ElementType, HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  narrow?: boolean;
}

/**
 * Standard layout container to keep section widths consistent across the site.
 */
export function Container({ as: Component = "section", className, narrow, ...props }: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-[62rem]" : "max-w-[82rem]",
        className
      )}
      {...props}
    />
  );
}
