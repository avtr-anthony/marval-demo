'use client';

import type { FormEvent, KeyboardEvent } from 'react';
import { SendHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { siteConfig } from '@/config/site';

import { ActionButton } from '../ui/ActionButton';
import styles from '../ui/PromptSurface.module.css';

interface HeroChatPromptProps {
    placeholder: string;
}

/**
 * Captures an initial question in the hero and redirects to the fullscreen chat route.
 */
export function HeroChatPrompt({ placeholder }: HeroChatPromptProps) {
    const router = useRouter();
    const [value, setValue] = useState('');

    /**
     * Redirects to chat with the drafted question encoded in the URL for one-time consumption.
     */
    const goToChat = () => {
        const trimmedValue = value.trim();
        if (!trimmedValue) {
            return;
        }

        router.push(
            `${siteConfig.routes.chat}?q=${encodeURIComponent(trimmedValue)}`,
        );
    };

    /**
     * Prevents full page reload and opens the fullscreen chat route.
     */
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        goToChat();
    };

    /**
     * Sends the hero question with Enter while preserving Shift+Enter for line breaks.
     */
    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
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
            goToChat();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`${styles.shell} shadow-xl`}
        >
            <p className={styles.label}>Consulta guiada</p>
            <div className={styles.row}>
                <div className={`${styles.field}`}>
                    <textarea
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={2}
                        placeholder={placeholder}
                        className={`${styles.textarea} max-h-44 overflow-y-auto outline-none [overflow-wrap:anywhere] scrollbar-soft`}
                    />
                </div>
                <ActionButton
                    type="submit"
                    disabled={!value.trim()}
                    className={styles.submit}
                    aria-label="Enviar pregunta"
                >
                    Enviar
                    <SendHorizontal size={16} />
                </ActionButton>
            </div>
        </form>
    );
}
