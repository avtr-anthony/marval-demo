import { ArrowRight } from 'lucide-react';

import type { ChatMessage } from '@/types/chat';

import { MessageBubble } from './MessageBubble';

interface EmptyChatStateProps {
    onSelectSuggestion: (text: string) => void;
    prompts: string[];
    disabled?: boolean;
}

/**
 * Initial fullscreen state shown before the first message is sent.
 */
export function EmptyChatState({
    onSelectSuggestion,
    prompts,
    disabled,
}: EmptyChatStateProps) {
    const welcomeMessage: ChatMessage = {
        id: 'welcome-message',
        role: 'assistant',
        content: 'Bienvenido, soy Marval Bot. ¿En qué puedo ayudarte hoy?',
        createdAt: new Date(0).toISOString(),
    };

    const suggestionsMessage: ChatMessage = {
        id: 'starter-prompts-message',
        role: 'assistant',
        content:
            'Puedes comenzar con uno de estos temas frecuentes o escribir tu caso abajo.',
        createdAt: new Date(0).toISOString(),
    };

    return (
        <section className="flex w-full max-w-3xl flex-col gap-4">
            <div className="chat-intro-slide-up">
                <MessageBubble
                    message={welcomeMessage}
                    showCopyButton={false}
                />
            </div>

            <div
                className="chat-intro-slide-up"
                style={{ animationDelay: '0.55s' }}
            >
                <MessageBubble
                    message={suggestionsMessage}
                    showCopyButton={false}
                >
                    <div className="grid gap-2">
                        {prompts.map(prompt => (
                            <button
                                key={prompt}
                                type="button"
                                className="group flex w-full items-center justify-between rounded-[18px] border border-transparent bg-[var(--chat-suggestion-bg)] px-4 py-2.5 text-left text-[13px] font-medium text-[var(--chat-suggestion-text)] transition duration-300 hover:bg-[var(--chat-suggestion-bg-hover)] hover:text-[var(--chat-suggestion-text-hover)] disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
                                onClick={() => onSelectSuggestion(prompt)}
                                disabled={disabled}
                            >
                                <span className="truncate pr-3">{prompt}</span>
                                <ArrowRight
                                    size={15}
                                    className="shrink-0 text-[var(--chat-suggestion-text-muted)] transition duration-300 group-hover:text-[var(--chat-suggestion-text-hover)]"
                                />
                            </button>
                        ))}
                    </div>
                </MessageBubble>
            </div>
        </section>
    );
}
