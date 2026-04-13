'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ChatMessage } from '@/types/chat';
import { cn } from '@/utils/cn';

interface MessageBubbleProps {
    message: ChatMessage;
    animateAssistantResponse?: boolean;
}

/**
 * Renders one chat message with different visual treatment for user and assistant roles.
 */
export function MessageBubble({
    message,
    animateAssistantResponse = false,
}: MessageBubbleProps) {
    const isUser = message.role === 'user';
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
            await navigator.clipboard.writeText(message.content);
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
        <div
            className={cn(
                'flex w-full',
                isUser ? 'justify-end' : 'justify-start',
            )}
        >
            <div
                className={cn(
                    'max-w-[92%] rounded-card shadow-ambient-sm sm:max-w-[80%]',
                    !isUser &&
                        animateAssistantResponse &&
                        'assistant-response-shell-enter',
                )}
            >
                <article
                    className={cn(
                        'relative rounded-card border px-4 py-3 text-[13px] leading-relaxed [overflow-wrap:anywhere] sm:text-sm',
                        isUser
                            ? 'border-stroke-soft bg-accent text-[var(--color-accent-contrast)] selection:bg-[var(--user-bubble-selection-bg)] selection:text-[var(--user-bubble-selection-text)]'
                            : 'border-stroke-soft bg-[var(--assistant-response-bg)] pr-12 backdrop-blur-sm text-ink',
                        !isUser &&
                            animateAssistantResponse &&
                            'assistant-response-enter',
                    )}
                >
                    {!isUser ? (
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-pill border border-stroke-soft bg-white/5 text-ink-dim transition hover:bg-white/10 hover:text-ink"
                            aria-label={
                                copied
                                    ? 'Respuesta copiada'
                                    : 'Copiar respuesta'
                            }
                            title={
                                copied
                                    ? 'Respuesta copiada'
                                    : 'Copiar respuesta'
                            }
                        >
                            {copied ? (
                                <Check size={14} />
                            ) : (
                                <Copy size={14} />
                            )}
                        </button>
                    ) : null}
                    <p className="whitespace-pre-wrap break-words leading-6">
                        {message.content}
                    </p>
                </article>
            </div>
        </div>
    );
}
