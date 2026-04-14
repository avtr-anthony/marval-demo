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
    markClassName?: string;
    title?: string;
    subtitle?: string;
    titleClassName?: string;
    subtitleClassName?: string;
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
    markClassName,
    title,
    subtitle,
    titleClassName,
    subtitleClassName,
    onClick,
}: BrandLogoProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                'inline-flex items-center leading-none',
                !iconOnly && (title || subtitle) && 'gap-3',
                className,
            )}
        >
            <span
                className={cn(
                    'relative inline-flex items-center justify-center overflow-hidden',
                    plainIcon
                        ? 'h-10 w-[8.75rem] rounded-none border-0 bg-transparent'
                        : iconOnly
                          ? 'h-10 w-[8.25rem] rounded-pill border border-white/25 bg-white/10 px-3 text-white'
                          : 'h-11 w-[9rem] rounded-pill border border-accent/30 bg-accent/10 px-3 text-accent',
                    markClassName,
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
            {!iconOnly && (title || subtitle) ? (
                <span
                    className={cn(
                        'min-w-0 leading-tight',
                        compact
                            ? 'hidden sm:flex sm:flex-col'
                            : 'flex flex-col',
                    )}
                >
                    {title ? (
                        <span
                            className={cn(
                                'text-sm font-semibold text-ink',
                                titleClassName,
                            )}
                        >
                            {title}
                        </span>
                    ) : null}
                    {subtitle ? (
                        <span
                            className={cn(
                                ' text-[10px] font-medium uppercase tracking-[0.16em] text-ink-dim',
                                subtitleClassName,
                            )}
                        >
                            {subtitle}
                        </span>
                    ) : null}
                </span>
            ) : null}
        </Link>
    );
}
