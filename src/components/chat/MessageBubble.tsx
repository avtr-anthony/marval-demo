'use client';

import type { ReactNode } from 'react';
import { BotMessageSquare, User } from 'lucide-react';

import type { ChatMessage } from '@/types/chat';
import { cn } from '@/utils/cn';

import { CopyResponseButton } from './CopyResponseButton';

interface MessageBubbleProps {
    message: ChatMessage;
    animateAssistantResponse?: boolean;
    children?: ReactNode;
    showCopyButton?: boolean;
}

/**
 * Renders one chat message with different visual treatment for user and assistant roles.
 */
export function MessageBubble({
    message,
    animateAssistantResponse = false,
    children,
    showCopyButton = true,
}: MessageBubbleProps) {
    const isUser = message.role === 'user';

    return (
        <div
            className={cn(
                'flex w-full',
                isUser ? 'justify-end' : 'justify-start',
            )}
        >
            <div
                className={cn(
                    'max-w-[92%] sm:max-w-[82%]',
                )}
            >
                <div
                    className={cn(
                        'mb-2 flex items-center gap-2.5 px-1',
                        isUser ? 'justify-end' : '',
                    )}
                >
                    <span
                        className={cn(
                            'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border',
                            isUser
                                ? 'border-transparent bg-accent text-[var(--color-accent-contrast)]'
                                : 'border-transparent bg-[var(--chat-bot-avatar-bg)] text-[var(--chat-suggestion-text)]',
                        )}
                    >
                        {isUser ? (
                            <User size={17} />
                        ) : (
                            <BotMessageSquare size={17} />
                        )}
                    </span>

                    {!isUser ? (
                        <>
                            <span className="text-sm font-semibold text-ink">
                                Marval Bot
                            </span>
                            {showCopyButton ? (
                                <CopyResponseButton
                                    content={message.content}
                                    className="ml-auto"
                                />
                            ) : null}
                        </>
                    ) : null}
                </div>

                <div
                    className={cn(
                        'rounded-card shadow-ambient-sm',
                        !isUser &&
                            animateAssistantResponse &&
                            'assistant-response-shell-enter',
                    )}
                >
                    <article
                        className={cn(
                            'rounded-card border px-4 py-3.5 text-[13px] leading-relaxed [overflow-wrap:anywhere] sm:text-sm',
                            isUser
                                ? 'border-stroke-soft bg-accent text-[var(--color-accent-contrast)] selection:bg-[var(--user-bubble-selection-bg)] selection:text-[var(--user-bubble-selection-text)]'
                                : 'border-stroke-soft bg-[var(--assistant-response-bg)] backdrop-blur-sm text-ink',
                            !isUser &&
                                animateAssistantResponse &&
                                'assistant-response-enter',
                        )}
                    >
                        <p className="whitespace-pre-wrap break-words leading-6">
                            {message.content}
                        </p>

                        {children ? (
                            <div className="mt-3.5">{children}</div>
                        ) : null}
                    </article>
                </div>
            </div>
        </div>
    );
}
