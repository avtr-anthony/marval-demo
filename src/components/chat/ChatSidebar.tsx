'use client';

import { useEffect, useRef, useState } from 'react';

import {
    ChevronRight,
    PanelLeftClose,
    PanelLeftOpen,
    Plus,
    Search,
} from 'lucide-react';

import { cn } from '@/utils/cn';

interface ChatSidebarProps {
    isDesktopLayout: boolean;
    isOpen: boolean;
    onOpen: () => void;
    onToggle: () => void;
    onNewChat: () => void;
}

const mockConversations = [
    {
        title: 'Ingresos Brutos 2026',
        preview:
            'La respuesta revisó alícuotas vigentes, padrón y cómo impacta la actividad declarada.',
    },
    {
        title: 'Plan de pagos',
        preview:
            'Se resumieron requisitos, vigencia del régimen y documentación sugerida para adherir.',
    },
    {
        title: 'Convenio Multilateral',
        preview:
            'Se explicó el criterio de atribución y qué revisar antes de presentar la DJ mensual.',
    },
    {
        title: 'Exención inmobiliaria',
        preview:
            'El ejemplo mostró cuándo aplica la exención y qué constancias conviene reunir primero.',
    },
    {
        title: 'Agente de retención',
        preview:
            'La conversación detalló altas, retenciones informadas y controles previos al cierre.',
    },
    {
        title: 'Fiscalización abierta',
        preview:
            'Se listaron pasos iniciales, plazos habituales y foco documental para responder mejor.',
    },
];

/**
 * Visual-only sidebar for browsing recent conversations and starting a new one.
 */
export function ChatSidebar({
    isDesktopLayout,
    isOpen,
    onOpen,
    onToggle,
    onNewChat,
}: ChatSidebarProps) {
    const [searchValue, setSearchValue] = useState('');
    const [shouldFocusSearch, setShouldFocusSearch] = useState(false);
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!isOpen || !shouldFocusSearch) {
            return;
        }

        const focusSearch = () => {
            searchInputRef.current?.focus();
            const length = searchInputRef.current?.value.length ?? 0;
            searchInputRef.current?.setSelectionRange(length, length);
            setShouldFocusSearch(false);
        };

        const animationFrameId = requestAnimationFrame(focusSearch);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isOpen, shouldFocusSearch]);

    const handleSearchShortcutClick = () => {
        setShouldFocusSearch(true);
        onOpen();
    };

    return (
        <aside
            className={cn(
                'fixed inset-y-0 left-0 z-50 overflow-hidden border-r backdrop-blur-xl transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                isDesktopLayout
                    ? isOpen
                        ? 'w-[19rem]'
                        : 'w-[4.75rem]'
                    : isOpen
                      ? 'w-screen max-w-none'
                      : 'pointer-events-none w-0 border-r-0',
            )}
            style={{
                borderColor: 'var(--chat-header-border)',
                backgroundColor:
                    'color-mix(in srgb, var(--navbar-bg) 90%, transparent)',
            }}
        >
            <div className="flex h-full flex-col px-3 py-4 sm:px-4 sm:py-5">
                {isOpen ? (
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onToggle}
                            aria-label="Ocultar barra de conversaciones"
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border border-[var(--color-stroke-soft)] bg-[var(--chat-sidebar-control-bg)] text-ink transition duration-300 hover:bg-[var(--chat-sidebar-control-bg-hover)]"
                        >
                            <PanelLeftClose size={18} />
                        </button>

                        <label className="relative block flex-1">
                            <Search
                                size={16}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-dim"
                            />
                            <input
                                ref={searchInputRef}
                                value={searchValue}
                                onChange={event =>
                                    setSearchValue(event.target.value)
                                }
                                aria-label="Buscar conversaciones"
                                placeholder="Buscar conversaciones"
                                className="h-12 w-full rounded-[18px] border bg-transparent pl-11 pr-4 text-sm text-ink outline-none placeholder:text-ink-dim"
                                style={{
                                    borderColor: 'var(--color-stroke-soft)',
                                    backgroundColor:
                                        'color-mix(in srgb, var(--composer-shell-bg) 64%, transparent)',
                                }}
                            />
                        </label>
                    </div>
                ) : isDesktopLayout ? (
                    <div className="flex flex-col items-center gap-3">
                        <button
                            type="button"
                            onClick={onToggle}
                            aria-label="Mostrar barra de conversaciones"
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border border-[var(--color-stroke-soft)] bg-[var(--chat-sidebar-control-bg)] text-ink transition duration-300 hover:bg-[var(--chat-sidebar-control-bg-hover)]"
                        >
                            <PanelLeftOpen size={18} />
                        </button>

                        <button
                            type="button"
                            onClick={handleSearchShortcutClick}
                            aria-label="Abrir búsqueda"
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border border-[var(--color-stroke-soft)] bg-[var(--chat-sidebar-control-bg)] text-ink transition duration-300 hover:bg-[var(--chat-sidebar-control-bg-hover)]"
                        >
                            <Search size={18} />
                        </button>
                    </div>
                ) : null}

                <div
                    className={cn(
                        'overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                        isOpen
                            ? 'mt-5 max-h-20 opacity-100'
                            : 'mt-0 max-h-0 opacity-0',
                    )}
                >
                    <h2 className="text-sm font-semibold tracking-[0.02em] text-ink">
                        Conversaciones
                    </h2>
                </div>

                <div
                    className={cn(
                        'scrollbar-soft min-h-0 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                        isOpen
                            ? 'mt-4 flex-1 opacity-100'
                            : 'mt-0 pointer-events-none flex-1 opacity-0',
                    )}
                >
                    <div className="h-full space-y-2 overflow-y-auto pr-1">
                        {mockConversations.map(conversation => (
                            <button
                                key={conversation.title}
                                type="button"
                                className="group flex w-full items-center gap-3 rounded-[20px] border border-transparent bg-[var(--chat-suggestion-bg)] px-4 py-3 text-left text-[var(--chat-suggestion-text)] shadow-none transition duration-300 hover:bg-[var(--chat-suggestion-bg-hover)] hover:text-[var(--chat-suggestion-text-hover)]"
                            >
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold">
                                        {conversation.title}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-[var(--chat-suggestion-text-muted)] transition duration-300 group-hover:text-[var(--chat-suggestion-text-muted-hover)]">
                                        {conversation.preview}
                                    </p>
                                </div>
                                <ChevronRight
                                    size={16}
                                    className="shrink-0 text-[var(--chat-suggestion-text-muted)] transition duration-300 group-hover:text-[var(--chat-suggestion-text-hover)]"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {(isOpen || isDesktopLayout) ? (
                    <div
                        className={cn(
                            'mt-auto pt-4 flex',
                            isOpen ? 'justify-end' : 'justify-center',
                        )}
                    >
                        <button
                            type="button"
                            onClick={onNewChat}
                            aria-label="Iniciar nuevo chat"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-[16px] border border-[var(--color-stroke-soft)] bg-[var(--chat-sidebar-control-bg)] text-ink transition duration-300 hover:bg-[var(--chat-sidebar-control-bg-hover)]"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                ) : null}
            </div>
        </aside>
    );
}
