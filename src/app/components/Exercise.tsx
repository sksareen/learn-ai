"use client";

interface Props {
  title: string;
  description: string;
  placeholder: string;
  hint?: string;
}

export function Exercise({ title, description, placeholder, hint }: Props) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ border: "2px dashed var(--border-color)", background: "var(--bg-card)" }}
    >
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-2"
        style={{ color: "var(--accent)" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
        {description}
      </p>
      <textarea
        className="w-full min-h-[120px] rounded-lg p-3.5 text-sm leading-relaxed resize-y"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color)",
          color: "var(--fg)",
          fontFamily: "inherit",
        }}
        placeholder={placeholder}
      />
      {hint && (
        <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--faint)" }}>
          {hint}
        </p>
      )}
    </div>
  );
}
