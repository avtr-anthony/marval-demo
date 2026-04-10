import { MessageSquareText, Scale, Timer } from "lucide-react";

import { ActionButton } from "../ui/ActionButton";

interface EmptyChatStateProps {
  onPrefill: (text: string) => void;
}

const starterPrompts = [
  "¿Cómo se computan los plazos del Artículo 6 del Código Fiscal?",
  "¿Qué beneficios contempla el régimen de regularización para MiPyMEs?",
  "¿Cuál es la alícuota general de Ingresos Brutos en la Ley 3479?"
];

/**
 * Initial fullscreen state shown before the first message is sent.
 */
export function EmptyChatState({ onPrefill }: EmptyChatStateProps) {
  return (
    <section className="space-y-7 rounded-panel border border-stroke-soft bg-panel p-6 shadow-ambient-xl sm:p-8">
      <div className="space-y-4">
        <span className="inline-flex rounded-pill border border-stroke-soft bg-panel-soft px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Chat fiscal
        </span>
        <h1 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
          Consultá normativa tributaria de Neuquén en lenguaje claro
        </h1>
        <p className="max-w-2xl leading-relaxed text-ink-dim">
          Esta vista mantiene historial e id de conversación para continuidad entre navegación y sesiones.
          Podés iniciar con una pregunta frecuente o escribir tu propio caso.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-card border border-stroke-soft bg-panel-soft p-4">
          <Scale size={18} className="text-accent" />
          <p className="mt-3 text-sm text-ink-dim">Respuestas orientadas a normativa provincial.</p>
        </div>
        <div className="rounded-card border border-stroke-soft bg-panel-soft p-4">
          <Timer size={18} className="text-accent" />
          <p className="mt-3 text-sm text-ink-dim">Contexto persistente para seguimiento de casos.</p>
        </div>
        <div className="rounded-card border border-stroke-soft bg-panel-soft p-4">
          <MessageSquareText size={18} className="text-accent" />
          <p className="mt-3 text-sm text-ink-dim">Interfaz full screen alineada a la landing.</p>
        </div>
      </div>

      <div className="space-y-2">
        {starterPrompts.map((prompt) => (
          <ActionButton
            key={prompt}
            variant="ghost"
            className="w-full justify-start px-4 py-3 text-left text-sm"
            onClick={() => onPrefill(prompt)}
          >
            {prompt}
          </ActionButton>
        ))}
      </div>
    </section>
  );
}
