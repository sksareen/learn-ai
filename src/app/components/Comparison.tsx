"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  bad: { label: string; content: string };
  good: { label: string; content: string };
}

export function Comparison({ bad, good }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div
        className="rounded-xl p-4 transition-all duration-500"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
        }}
      >
        <h4
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: "#8b3a3a" }}
        >
          {bad.label}
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          {bad.content}
        </p>
      </div>
      <div
        className="rounded-xl p-4 transition-all duration-500"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transitionDelay: "0.15s",
        }}
      >
        <h4
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: "#2d5a3d" }}
        >
          {good.label}
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          {good.content}
        </p>
      </div>
    </div>
  );
}
