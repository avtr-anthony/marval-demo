import { Suspense } from "react";

import { ChatShell } from "@/components/chat/ChatShell";
import { pickRandomChatStarterPrompts } from "@/constants/chat-starter-prompts";

/**
 * Fullscreen chat route separated from landing to match the requested UX flow.
 */
export default function ChatPage() {
  const starterPrompts = pickRandomChatStarterPrompts(3);

  return (
    <Suspense fallback={null}>
      <ChatShell starterPrompts={starterPrompts} />
    </Suspense>
  );
}
