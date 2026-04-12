'use client';

import type { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useChatController } from '@/hooks/use-chat-controller';

import { BrandLogo } from '../layout/BrandLogo';
import { ActionButton } from '../ui/ActionButton';
import { ChatComposer } from './ChatComposer';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

/**
 * Fullscreen chat experience with persistent history, retry flow and loading states.
 */
export function ChatShell() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [draft, setDraft] = useState('');
    const {
        messages,
        isSending,
        lastError,
        submitMessage,
        retryLastMessage,
        cancelPendingRequest,
        resetConversation,
    } = useChatController();
    const consumedQueryRef = useRef<string | null>(null);
    const hasHydratedMessagesRef = useRef(false);
    const scrollStateRef = useRef<{
        assistantCount: number;
        wasSending: boolean;
    } | null>(null);
    const [animatedAssistantId, setAnimatedAssistantId] = useState<
        string | null
    >(null);

    /**
     * Hides the page scrollbar for chat while preserving normal page scrolling behavior.
     */
    useEffect(() => {
        document.documentElement.classList.add('hide-page-scrollbar');
        document.body.classList.add('hide-page-scrollbar');

        return () => {
            document.documentElement.classList.remove('hide-page-scrollbar');
            document.body.classList.remove('hide-page-scrollbar');
        };
    }, []);

    /**
     * Consumes a hero question once, sends it to the chat endpoint, and then cleans the URL.
     */
    useEffect(() => {
        const heroQuestion = searchParams.get('q')?.trim();

        if (
            !heroQuestion ||
            consumedQueryRef.current === heroQuestion ||
            isSending
        ) {
            return;
        }

        consumedQueryRef.current = heroQuestion;
        setDraft('');
        void submitMessage(heroQuestion);
        router.replace(pathname);
    }, [isSending, pathname, router, searchParams, submitMessage]);

    /**
     * Smoothly scrolls down when the typing state appears and when a new assistant reply is appended.
     */
    useEffect(() => {
        const assistantCount = messages.filter(
            message => message.role === 'assistant',
        ).length;

        if (scrollStateRef.current === null) {
            scrollStateRef.current = {
                assistantCount,
                wasSending: isSending,
            };
            return;
        }

        const shouldScroll =
            (isSending && !scrollStateRef.current.wasSending) ||
            assistantCount > scrollStateRef.current.assistantCount;

        const updateState = () => {
            scrollStateRef.current = {
                assistantCount,
                wasSending: isSending,
            };
        };

        if (!shouldScroll) {
            updateState();
            return;
        }

        const scrollToBottom = () => {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
        };

        scrollToBottom();
        const animationFrameId = requestAnimationFrame(scrollToBottom);
        const timeoutId = window.setTimeout(scrollToBottom, 120);
        updateState();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.clearTimeout(timeoutId);
        };
    }, [messages, isSending]);

    /**
     * Reveals only newly appended assistant replies and skips persisted history on first render.
     */
    useEffect(() => {
        if (!hasHydratedMessagesRef.current) {
            hasHydratedMessagesRef.current = true;
            return;
        }

        const latestMessage = messages.at(-1);
        if (!latestMessage || latestMessage.role !== 'assistant') {
            return;
        }

        setAnimatedAssistantId(latestMessage.id);
        const timeoutId = window.setTimeout(() => {
            setAnimatedAssistantId(current =>
                current === latestMessage.id ? null : current,
            );
        }, 950);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [messages]);

    /**
     * Sends current draft and clears input when network call starts.
     */
    const handleSubmit = async () => {
        const content = draft.trim();
        if (!content) {
            return;
        }

        setDraft('');
        await submitMessage(content);
    };

    /**
     * Clears the current conversation before returning to the landing page.
     */
    const handleBackToHome = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        cancelPendingRequest();
        resetConversation();
        router.push('/');
    };

    return (
        <div className="chat-main app-gradient text-ink">
            <header className="chat-header-entrance fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#040405]/15  backdrop-blur-sm">
                <div className="mx-auto flex h-20 max-w-4xl items-center justify-center px-4 sm:px-6 lg:px-8">
                    <BrandLogo
                        href="/"
                        plainIcon
                        onClick={handleBackToHome}
                        className="justify-center"
                    />
                </div>
            </header>

            <main className="chat-content-entrance relative mx-auto w-full max-w-4xl px-4 !pb-28 pt-24 sm:px-6 sm:!pb-28 lg:px-8">
                <section className="rounded-panel p-4 sm:p-6">
                    <div className="space-y-4">
                        {messages.map(message => (
                            <MessageBubble
                                key={message.id}
                                message={message}
                                animateAssistantResponse={
                                    message.id === animatedAssistantId
                                }
                            />
                        ))}
                        {isSending ? <TypingIndicator /> : null}
                        {lastError ? (
                            <div className="rounded-card border border-danger/40 bg-danger/10 p-4">
                                <p className="text-sm text-danger">
                                    {lastError}
                                </p>
                                <ActionButton
                                    className="mt-3 gap-2"
                                    variant="danger"
                                    onClick={retryLastMessage}
                                    disabled={isSending}
                                >
                                    <RefreshCw size={15} />
                                    Reintentar ultimo envio
                                </ActionButton>
                            </div>
                        ) : null}
                    </div>
                </section>
            </main>

            <div className="chat-composer-entrance fixed inset-x-0 bottom-0 z-40 py-4">
                <div className="chat-composer-motion mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="chat-composer-stage">
                        <div
                            aria-hidden
                            className="chat-composer-frame"
                        />
                        <ChatComposer
                            value={draft}
                            disabled={isSending}
                            onChange={setDraft}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
