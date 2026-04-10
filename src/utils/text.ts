/**
 * Collapses repeated whitespace and line breaks to make extracted legal snippets readable in UI.
 */
export function normalizeTextBlock(input: string) {
  return input.replace(/\s+/g, " ").trim();
}

/**
 * Returns the first regex capture from text or null when no match exists.
 */
export function extractCapture(input: string, regex: RegExp) {
  const match = input.match(regex);
  return match?.[1]?.trim() ?? null;
}
