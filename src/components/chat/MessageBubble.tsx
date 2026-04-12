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
            <article
                className={cn(
                    'max-w-[92%] rounded-card border  px-4 py-3 text-[13px] leading-relaxed shadow-ambient-sm [overflow-wrap:anywhere] sm:max-w-[80%] sm:text-sm',
                    isUser
                        ? '!border-/10 bg-white/90 text-black'
                        : '!border-white/5 bg-[#040405]/20 backdrop-blur-sm text-ink',
                    !isUser && animateAssistantResponse && 'assistant-response-enter',
                )}
            >
                <p className="whitespace-pre-wrap break-words leading-6">
                    {message.content}
                </p>
            </article>
        </div>
    );
}
