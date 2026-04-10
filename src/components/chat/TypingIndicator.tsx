import { LoaderCircle } from "lucide-react";

/**
 * Minimal typing indicator shown while waiting for endpoint response.
 */
export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="inline-flex items-center gap-3 rounded-card border border-stroke-soft/70 bg-panel-soft/90 px-4 py-3 text-[13px] text-ink-dim sm:text-sm">
        <LoaderCircle size={16} className="animate-spin text-ink-dim" />
        <span className="font-medium text-ink">Pensando...</span>
      </div>
    </div>
  );
}
