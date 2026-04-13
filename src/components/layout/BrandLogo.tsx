import Image from 'next/image';
import Link from 'next/link';
import type { MouseEventHandler } from 'react';

import { siteConfig } from '@/config/site';
import { cn } from '@/utils/cn';

interface BrandLogoProps {
    href?: string;
    compact?: boolean;
    iconOnly?: boolean;
    plainIcon?: boolean;
    className?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
}

/**
 * Shared brand mark used in navbar, footer and chat header.
 */
export function BrandLogo({
    href = siteConfig.routes.home,
    compact,
    iconOnly,
    plainIcon,
    className,
    onClick,
}: BrandLogoProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn('inline-flex items-center', className)}
        >
            <span
                className={cn(
                    'relative inline-flex h-9 w-9 items-center justify-center overflow-hidden text-sm font-bold',
                    plainIcon
                        ? 'rounded-none border-0 bg-transparent'
                        : iconOnly
                          ? 'rounded-full border border-white/25 bg-white/10 text-white'
                          : 'rounded-full border border-accent/30 bg-accent/10 text-accent',
                )}
            >
                <Image
                    src="/nqn-logo.png"
                    alt={`${siteConfig.brand.name} logo`}
                    width={54}
                    height={54}
                    className=" object-contain"
                />
            </span>
            {!iconOnly ? (
                <span
                    className={cn(
                        'leading-tight',
                        compact ? 'hidden sm:block' : 'block',
                    )}
                ></span>
            ) : null}
        </Link>
    );
}
