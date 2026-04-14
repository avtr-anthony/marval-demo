'use client';

import type { MouseEvent } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PanelLeftOpen, RefreshCw } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useChatController } from '@/hooks/use-chat-controller';
import { chatStorageKey } from '@/store/chat-store';

import { BrandLogo } from '../layout/BrandLogo';
import { ThemeToggle } from '../theme/ThemeToggle';
import { ActionButton } from '../ui/ActionButton';
import { ChatComposer } from './ChatComposer';
import { ChatSidebar } from './ChatSidebar';
import { EmptyChatState } from './EmptyChatState';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { cn } from '@/utils/cn';

/**
 * Fullscreen chat experience with persistent history, retry flow and loading states.
 */
interface ChatShellProps {
    starterPrompts: string[];
}

export function ChatShell({ starterPrompts }: ChatShellProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [draft, setDraft] = useState('');
    const [introAnimationKey, setIntroAnimationKey] = useState(0);
    const [showIntroMessages, setShowIntroMessages] = useState(
        !searchParams.get('q')?.trim(),
    );
    const [hasResolvedViewportLayout, setHasResolvedViewportLayout] =
        useState(false);
    const [isDesktopLayout, setIsDesktopLayout] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const initialHeroQuestionRef = useRef(
        searchParams.get('q')?.trim() ?? null,
    );
    const hasInitializedChatRef = useRef(false);
    const hasInitializedSidebarRef = useRef(false);
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
    useLayoutEffect(() => {
        const scrollbarOffset = Math.max(
            0,
            window.innerWidth - document.documentElement.clientWidth,
        );

        document.documentElement.style.setProperty(
            '--page-scrollbar-offset',
            `${scrollbarOffset}px`,
        );
        document.documentElement.classList.add('hide-page-scrollbar');
        document.body.classList.add('hide-page-scrollbar');

        return () => {
            document.documentElement.classList.remove('hide-page-scrollbar');
            document.body.classList.remove('hide-page-scrollbar');
            document.documentElement.style.removeProperty(
                '--page-scrollbar-offset',
            );
        };
    }, []);

    /**
     * Uses a wider default sidebar on desktop and a collapsed rail on smaller screens.
     */
    useLayoutEffect(() => {
        const mediaQueryList = window.matchMedia('(min-width: 1024px)');

        const syncSidebarLayout = () => {
            const isDesktop = mediaQueryList.matches;
            setIsDesktopLayout(isDesktop);
            setHasResolvedViewportLayout(true);

            if (hasInitializedSidebarRef.current) {
                return;
            }

            hasInitializedSidebarRef.current = true;
            setIsSidebarOpen(isDesktop);
        };

        syncSidebarLayout();

        mediaQueryList.addEventListener('change', syncSidebarLayout);
        return () =>
            mediaQueryList.removeEventListener('change', syncSidebarLayout);
    }, []);

    /**
     * Always starts the chat route with a fresh conversation.
     * If the landing passed ?q=..., that query becomes the first message of the new chat.
     */
    useEffect(() => {
        if (hasInitializedChatRef.current) {
            return;
        }

        hasInitializedChatRef.current = true;
        cancelPendingRequest();
        window.localStorage.removeItem(chatStorageKey);
        resetConversation();
        setDraft('');

        const heroQuestion = initialHeroQuestionRef.current;
        if (!heroQuestion) {
            return;
        }

        consumedQueryRef.current = heroQuestion;
        void submitMessage(heroQuestion);
        router.replace(pathname);
    }, [
        cancelPendingRequest,
        pathname,
        resetConversation,
        router,
        submitMessage,
    ]);

    /**
     * Resets the chat state so the empty suggestions screen becomes the starting point again.
     */
    const resetChatSession = () => {
        cancelPendingRequest();
        window.localStorage.removeItem(chatStorageKey);
        resetConversation();
        setDraft('');
        setShowIntroMessages(true);
        setIntroAnimationKey(current => current + 1);
        setAnimatedAssistantId(null);
        scrollStateRef.current = null;
        consumedQueryRef.current = initialHeroQuestionRef.current;
    };

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
     * Starts a chat directly from one of the empty-state recommendations.
     */
    const handleSuggestionSelect = async (content: string) => {
        setDraft('');
        await submitMessage(content);
    };

    /**
     * Starts a brand new local conversation and returns to the suggestion prompts.
     */
    const handleNewChat = () => {
        resetChatSession();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /**
     * Clears the current conversation before returning to the landing page.
     */
    const handleBackToHome = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        resetChatSession();
        router.push('/');
    };

    const hasIncomingHeroQuestion = Boolean(
        initialHeroQuestionRef.current && !consumedQueryRef.current,
    );
    const isIntroOnlyState =
        showIntroMessages &&
        messages.length === 0 &&
        !isSending &&
        !hasIncomingHeroQuestion;
    const desktopSidebarWidth = isSidebarOpen ? 304 : 76;
    const contentLeftInset = isDesktopLayout ? desktopSidebarWidth : 0;

    return (
        <div
            className={cn(
                'chat-main text-ink',
                !hasResolvedViewportLayout && 'opacity-0',
            )}
        >
            <ChatSidebar
                isDesktopLayout={isDesktopLayout}
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(current => !current)}
                onNewChat={handleNewChat}
            />

            <header
                className="chat-header-entrance fixed inset-x-0 top-0 z-40 border-b backdrop-blur-sm transition-[left] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                    left: `${contentLeftInset}px`,
                    borderColor: 'var(--chat-header-border)',
                    backgroundColor: 'var(--navbar-bg)',
                    paddingRight: 'var(--page-scrollbar-offset, 0px)',
                }}
            >
                <div className="flex min-h-[78px] w-full items-center justify-between gap-4 px-4 sm:px-6">
                    <div className="flex min-w-0 items-center gap-3">
                        <BrandLogo
                            href="/"
                            plainIcon
                            onClick={handleBackToHome}
                            className="shrink-0"
                            markClassName="h-8 w-[6.75rem] sm:h-9 sm:w-[7.5rem]"
                        />
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-ink sm:text-base">
                                Marval Bot
                            </p>
                            <p className="truncate text-[10px] font-medium uppercase tracking-[0.18em] text-ink-dim sm:text-[11px]">
                                Asistente fiscal
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        {hasResolvedViewportLayout && !isDesktopLayout ? (
                            <button
                                type="button"
                                onClick={() => setIsSidebarOpen(true)}
                                aria-label="Mostrar barra de conversaciones"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-[16px] border border-[var(--color-stroke-soft)] bg-[var(--chat-sidebar-control-bg)] text-[var(--chat-sidebar-control-text)] transition duration-300 hover:bg-[var(--chat-sidebar-control-bg-hover)] hover:text-[var(--chat-sidebar-control-hover-text)]"
                            >
                                <PanelLeftOpen size={18} />
                            </button>
                        ) : null}
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <div
                className="transition-[padding-left] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                    paddingLeft: `${contentLeftInset}px`,
                    paddingRight: 'var(--page-scrollbar-offset, 0px)',
                }}
            >
                <main
                    className={`chat-content-entrance relative mx-auto w-full max-w-4xl px-4 !pb-28 pt-28 sm:px-6 sm:!pb-28 lg:px-8 ${
                        isIntroOnlyState
                            ? 'min-h-[calc(100vh-13rem)] !pb-36'
                            : ''
                    }`}
                >
                    <section className="w-full rounded-panel pb-4 sm:pb-6">
                        <div className="space-y-4">
                            {showIntroMessages ? (
                                <EmptyChatState
                                    key={introAnimationKey}
                                    onSelectSuggestion={handleSuggestionSelect}
                                    prompts={starterPrompts}
                                    disabled={isSending}
                                />
                            ) : null}
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
                                        Reintentar último envío
                                    </ActionButton>
                                </div>
                            ) : null}
                        </div>
                    </section>
                </main>
            </div>

            <div
                className="chat-composer-entrance fixed inset-x-0 bottom-0 z-40 py-4 transition-[left] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                    left: `${contentLeftInset}px`,
                    paddingRight: 'var(--page-scrollbar-offset, 0px)',
                }}
            >
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
