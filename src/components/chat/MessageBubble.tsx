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
                        'rounded-card border px-4 py-3 text-[13px] leading-relaxed [overflow-wrap:anywhere] sm:text-sm',
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
                </article>
            </div>
        </div>
    );
}
