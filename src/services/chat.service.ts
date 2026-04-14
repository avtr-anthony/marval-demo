import { siteConfig } from '@/config/site';
import type {
    ChatApiPayload,
    ChatApiRequest,
    NormalizedChatResponse,
} from '@/types/chat';

const REQUEST_TIMEOUT_MS = 90000;
const CANDIDATE_TEXT_KEYS = [
    'output',
    'response',
    'answer',
    'message',
    'text',
    'content',
    'reply',
];

interface SendChatOptions {
    signal?: AbortSignal;
}

/**
 * Checks if an unknown value is a plain object for safe key inspection.
 */
function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Maps frontend request shape to the backend payload contract.
 */
function toApiPayload(request: ChatApiRequest): ChatApiPayload {
    return {
        id_conversation: request.idConversation,
        chat_input: request.chatInput,
    };
}

/**
 * Safely parses HTTP response as JSON first and falls back to raw text.
 */
async function parseResponseBody(response: Response) {
    const rawText = await response.text();

    if (!rawText.trim()) {
        return {};
    }

    try {
        return JSON.parse(rawText) as unknown;
    } catch {
        return rawText;
    }
}

/**
 * Traverses unknown payloads and extracts the first meaningful text response.
 */
function extractText(payload: unknown): string | null {
    if (typeof payload === 'string') {
        const normalized = payload.trim();
        return normalized.length > 0 ? normalized : null;
    }

    if (Array.isArray(payload)) {
        for (const item of payload) {
            const nestedText = extractText(item);
            if (nestedText) {
                return nestedText;
            }
        }
        return null;
    }

    if (isRecord(payload)) {
        for (const key of CANDIDATE_TEXT_KEYS) {
            const value = payload[key];
            if (typeof value === 'string' && value.trim()) {
                return value.trim();
            }
        }

        for (const nestedValue of Object.values(payload)) {
            const nestedText = extractText(nestedValue);
            if (nestedText) {
                return nestedText;
            }
        }
    }

    return null;
}

/**
 * Calls the chat endpoint and normalizes variable response formats into a single text output.
 */
export async function sendChatMessage(
    request: ChatApiRequest,
    options?: SendChatOptions,
): Promise<NormalizedChatResponse> {
    if (!siteConfig.endpoint.chat) {
        throw new Error('Falta NEXT_PUBLIC_CHAT_ENDPOINT en el entorno.');
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const externalSignal = options?.signal;

    const handleExternalAbort = () => {
        controller.abort();
    };

    if (externalSignal) {
        externalSignal.addEventListener('abort', handleExternalAbort, {
            once: true,
        });
    }

    try {
        const response = await fetch(siteConfig.endpoint.chat, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
            body: JSON.stringify(toApiPayload(request)),
            signal: controller.signal,
        });

        const raw = await parseResponseBody(response);

        if (!response.ok) {
            throw new Error(
                `El endpoint respondió con estado ${response.status}.`,
            );
        }

        const text = extractText(raw);

        if (!text) {
            throw new Error(
                'No se pudo interpretar la respuesta del endpoint.',
            );
        }

        return { text, raw };
    } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
            if (externalSignal?.aborted) {
                throw new Error('Solicitud cancelada por navegación.');
            }
            throw new Error(
                'El endpoint tardó demasiado en responder. Intentá nuevamente.',
            );
        }

        if (error instanceof Error) {
            throw error;
        }

        throw new Error(
            'Ocurrió un error inesperado al consultar el endpoint.',
        );
    } finally {
        clearTimeout(timeout);
        if (externalSignal) {
            externalSignal.removeEventListener('abort', handleExternalAbort);
        }
    }
}
