"use client";

interface Props {
  children: string;
  title?: string;
}

export function CodeBlock({ children, title }: Props) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-color)" }}>
      {title && (
        <div
          className="px-4 py-2 text-xs font-medium"
          style={{
            background: "var(--bg-surface)",
            borderBottom: "1px solid var(--border-color)",
            color: "var(--faint)",
          }}
        >
          {title}
        </div>
      )}
      <pre
        className="p-4 text-sm leading-relaxed overflow-x-auto"
        style={{
          background: "#1a1a2e",
          color: "#e0ddd8",
          fontFamily: "var(--font-mono), monospace",
        }}
      >
        {children}
      </pre>
    </div>
  );
}
