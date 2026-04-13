import type { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

/**
 * Compact badge used for labels and document references.
 */
export function PillBadge({
    className,
    ...props
}: HTMLAttributes<HTMLSpanElement>) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-pill border border-stroke-soft bg-transparent px-3 py-1 text-xs font-medium text-ink',
                className,
            )}
            {...props}
        />
    );
}
