'use client';

import { useState } from 'react';

import {
    ChevronRight,
    PanelLeftClose,
    PanelLeftOpen,
    Plus,
    Search,
} from 'lucide-react';

import { cn } from '@/utils/cn';

interface ChatSidebarProps {
    isOpen: boolean;
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
    isOpen,
    onToggle,
    onNewChat,
}: ChatSidebarProps) {
    const [searchValue, setSearchValue] = useState('');

    return (
        <aside
            className={cn(
                'fixed inset-y-0 left-0 z-50 overflow-hidden border-r backdrop-blur-xl transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                isOpen
                    ? 'w-[calc(100vw-1rem)] max-w-[20rem] lg:w-[19rem] lg:max-w-none'
                    : 'w-[4.75rem]',
            )}
            style={{
                borderColor: 'var(--chat-header-border)',
                backgroundColor:
                    'color-mix(in srgb, var(--navbar-bg) 90%, transparent)',
            }}
        >
            <div className="flex h-full flex-col px-3 py-4 sm:px-4 sm:py-5">
                <div
                    className={cn(
                        'flex items-center gap-3',
                        isOpen ? 'justify-between' : 'justify-center',
                    )}
                >
                    <button
                        type="button"
                        onClick={onToggle}
                        aria-label={
                            isOpen
                                ? 'Ocultar barra de conversaciones'
                                : 'Mostrar barra de conversaciones'
                        }
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border border-[var(--color-stroke-soft)] bg-[var(--chat-sidebar-control-bg)] text-ink transition duration-300 hover:bg-[var(--chat-sidebar-control-bg-hover)]"
                    >
                        {isOpen ? (
                            <PanelLeftClose size={18} />
                        ) : (
                            <PanelLeftOpen size={18} />
                        )}
                    </button>

                    <div
                        className={cn(
                            'overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                            isOpen ? 'w-11 opacity-100' : 'w-0 opacity-0',
                        )}
                    >
                        <button
                            type="button"
                            aria-label="Buscar conversaciones"
                            className={cn(
                                'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border border-[var(--color-stroke-soft)] bg-[var(--chat-sidebar-control-bg)] text-ink transition duration-300 hover:bg-[var(--chat-sidebar-control-bg-hover)]',
                                !isOpen && 'pointer-events-none',
                            )}
                        >
                            <Search size={18} />
                        </button>
                    </div>
                </div>

                <div
                    className={cn(
                        'overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                        isOpen
                            ? 'mt-5 max-h-24 opacity-100'
                            : 'mt-0 max-h-0 opacity-0',
                    )}
                >
                    <label className="relative block">
                        <Search
                            size={16}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-dim"
                        />
                        <input
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

                <div
                    className={cn(
                        'overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                        isOpen
                            ? 'mt-5 max-h-20 opacity-100'
                            : 'mt-0 max-h-0 opacity-0',
                    )}
                >
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-sm font-semibold tracking-[0.02em] text-ink">
                            Conversaciones
                        </h2>
                        <button
                            type="button"
                            onClick={onNewChat}
                            aria-label="Iniciar nuevo chat"
                            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-[var(--color-stroke-soft)] bg-[var(--chat-sidebar-control-bg)] text-ink transition duration-300 hover:bg-[var(--chat-sidebar-control-bg-hover)]"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
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

                {!isOpen ? (
                    <div className="mt-4 flex flex-col items-center gap-3">
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
