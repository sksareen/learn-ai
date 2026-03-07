"use client";

import { useEffect, useRef, useState } from "react";
import "./chat.css";

export type MessageType = "user" | "ai" | "system" | "thinking";

export interface ChatMessage {
  type: MessageType;
  text: string;
}

export interface ChatStageScript {
  messages: ChatMessage[];
}

interface Props {
  scripts: ChatStageScript[];
  activeStage: number;
  aiName?: string;
  aiEmoji?: string;
}

function getMessageDelay(msg: ChatMessage): number {
  switch (msg.type) {
    case "user": return 500;
    case "thinking": return 300;
    case "ai": return 400;
    case "system": return 200;
    default: return 300;
  }
}

interface VisibleMessage {
  msg: ChatMessage;
  stage: number;
  index: number;
  isAnimating: boolean;
}

export function ChatSimulator({ scripts, activeStage, aiName = "AI", aiEmoji = "✦" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<VisibleMessage[]>([]);

  useEffect(() => {
    if (activeStage < 0) {
      setVisibleMessages([]);
      return;
    }

    const instant: VisibleMessage[] = [];
    for (let s = 0; s < activeStage && s < scripts.length; s++) {
      const msgs = scripts[s]?.messages ?? [];
      for (let i = 0; i < msgs.length; i++) {
        instant.push({ msg: msgs[i], stage: s, index: i, isAnimating: false });
      }
    }
    setVisibleMessages(instant);

    const current = scripts[activeStage]?.messages ?? [];
    let delay = 200;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < current.length; i++) {
      const msg = current[i];
      const d = delay;
      timeouts.push(
        setTimeout(() => {
          setVisibleMessages(prev => [...prev, { msg, stage: activeStage, index: i, isAnimating: true }]);
        }, d)
      );
      delay += getMessageDelay(msg);
    }

    return () => timeouts.forEach(clearTimeout);
  }, [activeStage, scripts]);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleMessages]);

  return (
    <div className="chat-window">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-avatar">{aiEmoji}</div>
        <div>
          <div className="chat-header-name">{aiName}</div>
          <div className="chat-header-status">Online</div>
        </div>
      </div>

      {/* Messages */}
      <div ref={containerRef} className="chat-messages">
        {visibleMessages.map((entry, i) => (
          <MessageBubble
            key={`${entry.stage}-${entry.index}`}
            msg={entry.msg}
            animate={entry.isAnimating}
            aiName={aiName}
            aiEmoji={aiEmoji}
          />
        ))}
        {visibleMessages.length === 0 && (
          <div className="chat-empty">Start a conversation...</div>
        )}
      </div>
    </div>
  );
}

function MessageBubble({ msg, animate, aiName, aiEmoji }: { msg: ChatMessage; animate: boolean; aiName: string; aiEmoji: string }) {
  const cls = animate ? "chat-bubble-animate" : "";

  if (msg.type === "system") {
    return <div className={`chat-system ${cls}`}>{msg.text}</div>;
  }

  if (msg.type === "thinking") {
    return (
      <div className={`chat-row chat-row-ai ${cls}`}>
        <div className="chat-avatar">{aiEmoji}</div>
        <div className="chat-bubble chat-bubble-ai chat-thinking">{msg.text}</div>
      </div>
    );
  }

  if (msg.type === "user") {
    return (
      <div className={`chat-row chat-row-user ${cls}`}>
        <div className="chat-bubble chat-bubble-user">{msg.text}</div>
      </div>
    );
  }

  // ai
  return (
    <div className={`chat-row chat-row-ai ${cls}`}>
      <div className="chat-avatar">{aiEmoji}</div>
      <div className="chat-bubble chat-bubble-ai">{msg.text}</div>
    </div>
  );
}
