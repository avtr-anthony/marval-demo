import type { FormEvent, KeyboardEvent } from 'react';
import { useEffect, useRef } from 'react';
import { SendHorizontal } from 'lucide-react';

import { ActionButton } from '../ui/ActionButton';
import styles from '../ui/PromptSurface.module.css';

interface ChatComposerProps {
    value: string;
    disabled: boolean;
    onChange: (nextValue: string) => void;
    onSubmit: () => Promise<void>;
}

/**
 * Bottom composer with enter-to-send behavior and multiline support.
 */
export function ChatComposer({
    value,
    disabled,
    onChange,
    onSubmit,
}: ChatComposerProps) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const MAX_TEXTAREA_HEIGHT_PX = 172;

    /**
     * Auto-grows the textarea up to a max height and then enables subtle internal scrolling.
     */
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) {
            return;
        }

        textarea.style.height = 'auto';
        const nextHeight = Math.min(
            textarea.scrollHeight,
            MAX_TEXTAREA_HEIGHT_PX,
        );
        textarea.style.height = `${nextHeight}px`;
        textarea.style.overflowY =
            textarea.scrollHeight > MAX_TEXTAREA_HEIGHT_PX ? 'auto' : 'hidden';
    }, [value]);

    /**
     * Sends the current message and prevents full page form navigation.
     */
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await onSubmit();
    };

    /**
     * Handles Enter as submit and Shift+Enter as newline for comfortable drafting.
     */
    const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
        const isComposing = event.nativeEvent.isComposing;
        const shouldSubmit =
            event.key === 'Enter' &&
            !event.shiftKey &&
            !event.ctrlKey &&
            !event.altKey &&
            !event.metaKey &&
            !isComposing;

        if (shouldSubmit) {
            event.preventDefault();
            await onSubmit();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`chat-composer-shell ${styles.shell} relative z-[1]`}
        >
            <div className="chat-composer-fade">
                <div className="chat-composer-content flex items-end gap-3">
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={event => onChange(event.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={2}
                        placeholder="Escribe tu consulta..."
                        className={`${styles.textarea} outline-none [overflow-wrap:anywhere] scrollbar-soft`}
                    />
                    <ActionButton
                        type="submit"
                        disabled={disabled || !value.trim()}
                        className={styles.submit}
                        aria-label="Enviar mensaje"
                    >
                        Enviar
                        <SendHorizontal size={16} />
                    </ActionButton>
                </div>
            </div>
        </form>
    );
}
