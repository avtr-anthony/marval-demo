'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface CopyResponseButtonProps {
    content: string;
}

/**
 * Copies one assistant response and briefly swaps the icon to confirm success.
 */
export function CopyResponseButton({ content }: CopyResponseButtonProps) {
    const [copied, setCopied] = useState(false);
    const copyTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (copyTimeoutRef.current !== null) {
                window.clearTimeout(copyTimeoutRef.current);
            }
        };
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);

            if (copyTimeoutRef.current !== null) {
                window.clearTimeout(copyTimeoutRef.current);
            }

            copyTimeoutRef.current = window.setTimeout(() => {
                setCopied(false);
                copyTimeoutRef.current = null;
            }, 1800);
        } catch {}
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-pill border border-stroke-soft bg-white/5 text-ink-dim transition hover:bg-white/10 hover:text-ink"
            aria-label={copied ? 'Respuesta copiada' : 'Copiar respuesta'}
            title={copied ? 'Respuesta copiada' : 'Copiar respuesta'}
        >
            {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
    );
}
