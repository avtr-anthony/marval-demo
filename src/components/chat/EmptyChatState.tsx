import { ArrowRight } from 'lucide-react';

import { ActionButton } from '../ui/ActionButton';

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
    return (
        <section className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
            <span className="inline-flex rounded-pill border border-stroke-soft bg-panel-soft/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-dim">
                Chat fiscal
            </span>

            <h1 className="mt-5 max-w-xl font-serif text-2xl leading-tight text-ink sm:text-3xl">
                Elige una consulta para comenzar
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-dim">
                Puedes comenzar con uno de estos temas frecuentes o escribir tu
                caso abajo.
            </p>

            <div className="mt-7 grid w-full gap-2.5">
                {prompts.map(prompt => (
                    <ActionButton
                        key={prompt}
                        variant="ghost"
                        className="group w-full justify-between rounded-[20px] border-transparent bg-[var(--chat-suggestion-bg)] px-5 py-3.5 text-left text-sm font-medium text-[var(--chat-suggestion-text)] shadow-none hover:bg-[var(--chat-suggestion-bg-hover)] hover:text-[var(--chat-suggestion-text-hover)] sm:text-[15px]"
                        onClick={() => onSelectSuggestion(prompt)}
                        disabled={disabled}
                    >
                        <span>{prompt}</span>
                        <ArrowRight
                            size={16}
                            className="shrink-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                        />
                    </ActionButton>
                ))}
            </div>
        </section>
    );
}
