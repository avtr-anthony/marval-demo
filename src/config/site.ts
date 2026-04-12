export const siteConfig = {
    brand: {
        name: 'NQ Tributario',
        legalName: 'NQ Tributario Demo Institucional',
        shortTag: 'Neuquén Fiscal Assistant',
    },
    routes: {
        home: '/',
        chat: '/chat',
    },
    navigation: [
        // { label: "Propuesta", href: "#propuesta" },
        // { label: "Capacidades", href: "#capacidades" },
        // { label: "Normativa", href: "#normativa" },
        // { label: 'FAQ', href: '#faq' },
    ],
    endpoint: {
        chat: process.env.NEXT_PUBLIC_CHAT_ENDPOINT ?? '',
    },
} as const;
