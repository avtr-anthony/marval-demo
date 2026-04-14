import { BotMessageSquare, LoaderCircle } from 'lucide-react';

/**
 * Minimal typing indicator shown while waiting for endpoint response.
 */
export function TypingIndicator() {
    return (
        <div className="flex justify-start">
            <div className="max-w-[92%] sm:max-w-[82%]">
                <div className="mb-2 flex items-center gap-2.5 px-1">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-transparent bg-[var(--chat-bot-avatar-bg)] text-[var(--chat-suggestion-text)]">
                        <BotMessageSquare size={17} />
                    </span>
                    <span className="text-sm font-semibold text-ink">
                        Marval Bot
                    </span>
                </div>

                <article className="rounded-card border border-stroke-soft bg-[var(--assistant-response-bg)] px-4 py-3.5 text-[13px] text-ink shadow-ambient-sm backdrop-blur-sm sm:text-sm">
                    <div className="flex items-center gap-3 text-ink-dim">
                        <LoaderCircle
                            size={16}
                            className="animate-spin text-ink-dim"
                        />
                        <span className="font-medium text-ink">
                            Pensando...
                        </span>
                    </div>
                </article>
            </div>
        </div>
    );
}
