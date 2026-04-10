import { Suspense } from "react";

import { ChatShell } from "@/components/chat/ChatShell";

/**
 * Fullscreen chat route separated from landing to match the requested UX flow.
 */
export default function ChatPage() {
  return (
    <Suspense fallback={null}>
      <ChatShell />
    </Suspense>
  );
}
