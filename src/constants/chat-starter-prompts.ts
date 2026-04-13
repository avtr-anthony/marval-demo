/**
 * Curated starter prompts extracted from the legal materials under /docs.
 * The chat shows only a random subset on each entry to keep the empty state concise.
 */
export const chatStarterPromptBank = [
    '¿Cómo se computan los plazos?',
    '¿Cuándo una consulta es vinculante?',
    '¿Qué pide el artículo 10 para consultar?',
    '¿Cuál es la alícuota general de IIBB?',
    '¿Qué multa aplica el artículo 56?',
    '¿Qué beneficios tienen las MiPyMEs?',
    '¿Qué deudas entran en regularización?',
    '¿Cuándo caduca un plan de pago?',
    '¿Qué pasó con la prórroga 2024?',
] as const;

export function pickRandomChatStarterPrompts(count = 3) {
    const pool = [...chatStarterPromptBank];

    for (let index = pool.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
    }

    return pool.slice(0, Math.min(count, pool.length));
}
