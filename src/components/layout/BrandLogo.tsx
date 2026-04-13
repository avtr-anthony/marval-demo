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
            className={cn('inline-flex items-center leading-none', className)}
        >
            <span
                className={cn(
                    'relative inline-flex items-center justify-center overflow-hidden',
                    plainIcon
                        ? 'h-10 w-[8.75rem] rounded-none border-0 bg-transparent'
                        : iconOnly
                          ? 'h-10 w-[8.25rem] rounded-pill border border-white/25 bg-white/10 px-3 text-white'
                          : 'h-11 w-[9rem] rounded-pill border border-accent/30 bg-accent/10 px-3 text-accent',
                )}
            >
                <Image
                    src="/marval.png"
                    alt={`${siteConfig.brand.name} logo`}
                    width={1838}
                    height={593}
                    sizes="(max-width: 640px) 140px, 160px"
                    className="brand-logo-image h-auto w-full object-contain"
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
