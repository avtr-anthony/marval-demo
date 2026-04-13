'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
    defaultThemeMode,
    themeStorageKey,
    type ThemeMode,
} from '@/config/theme';

import styles from './ThemeToggle.module.css';

function resolveInitialTheme(): ThemeMode {
    if (typeof document === 'undefined') {
        return defaultThemeMode;
    }

    return document.documentElement.dataset.theme === 'light'
        ? 'light'
        : defaultThemeMode;
}

/**
 * Small icon toggle that switches the shared color theme.
 */
export function ThemeToggle() {
    const [theme, setTheme] = useState<ThemeMode>(defaultThemeMode);

    useEffect(() => {
        const nextTheme = resolveInitialTheme();
        document.documentElement.dataset.theme = nextTheme;
        setTheme(nextTheme);
    }, []);

    const isLight = theme === 'light';

    const handleClick = () => {
        const nextTheme: ThemeMode = isLight ? 'dark' : 'light';
        document.documentElement.dataset.theme = nextTheme;
        try {
            window.localStorage.setItem(themeStorageKey, nextTheme);
        } catch {}
        setTheme(nextTheme);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={styles.button}
            aria-label={
                isLight ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'
            }
            title={isLight ? 'Tema claro' : 'Tema oscuro'}
        >
            {isLight ? <Moon size={16} /> : <Sun size={16} />}
        </button>
    );
}
