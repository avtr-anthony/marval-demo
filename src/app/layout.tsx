import type { Metadata } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';

import { siteConfig } from '@/config/site';
import { defaultThemeMode, themeStorageKey } from '@/config/theme';

import './globals.css';

const sans = Manrope({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const serif = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-serif',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Marval',
    description:
        'Demo institucional en Next.js para consultas tributarias de Neuquén con landing premium y chat full screen.',
    icons: {
        icon: '/logo-met.png',
        shortcut: '/logo-met.png',
        apple: '/logo-met.png',
    },
};

/**
 * Root application layout that applies fonts, global styles and centralized theme tokens.
 */
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="es"
            data-theme={defaultThemeMode}
            suppressHydrationWarning
        >
            <body
                className={`${sans.variable} ${serif.variable} bg-bg font-sans text-ink antialiased`}
            >
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var storedTheme=window.localStorage.getItem('${themeStorageKey}');var theme=storedTheme==='light'||storedTheme==='dark'?storedTheme:'${defaultThemeMode}';document.documentElement.dataset.theme=theme;}catch(error){document.documentElement.dataset.theme='${defaultThemeMode}';}})();`,
                    }}
                />
                {children}
            </body>
        </html>
    );
}
