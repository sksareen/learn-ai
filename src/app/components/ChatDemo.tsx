"use client";

import { useEffect, useRef, useState } from "react";

export interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

interface Props {
  messages: ChatMessage[];
  label?: string;
  tag?: string;
  tagColor?: "green" | "red" | "amber" | "blue";
  animate?: boolean;
}

const TAG_STYLES: Record<string, { bg: string; fg: string }> = {
  green: { bg: "rgba(45,90,61,0.1)", fg: "#2d5a3d" },
  red: { bg: "rgba(139,58,58,0.1)", fg: "#8b3a3a" },
  amber: { bg: "rgba(122,99,32,0.1)", fg: "#7a6320" },
  blue: { bg: "rgba(59,130,246,0.1)", fg: "#3b82f6" },
};

export function ChatDemo({ messages, label, tag, tagColor = "blue", animate = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  const ts = TAG_STYLES[tagColor];

  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
      }}
    >
      {(label || tag) && (
        <div
          className="flex items-center justify-between px-4 py-2.5 text-xs"
          style={{ borderBottom: "1px solid var(--border-color)", color: "var(--muted)" }}
        >
          <span className="font-medium uppercase tracking-wider" style={{ fontSize: 11 }}>{label}</span>
          {tag && (
            <span
              className="px-2 py-0.5 rounded-full font-semibold"
              style={{ background: ts.bg, color: ts.fg, fontSize: 11 }}
            >
              {tag}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-col gap-3 p-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: `all 0.4s ease ${i * 0.15}s`,
            }}
          >
            <div
              className="max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed"
              style={{
                borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: msg.role === "user" ? "var(--accent)" : "var(--bg-surface)",
                color: msg.role === "user" ? "white" : "var(--fg)",
                border: msg.role === "ai" ? "1px solid var(--border-color)" : "none",
                whiteSpace: "pre-line",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
