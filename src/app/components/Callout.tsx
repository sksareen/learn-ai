interface Props {
  type?: "insight" | "warning" | "key" | "mechanism";
  children: React.ReactNode;
}

const STYLES: Record<string, { bg: string; border: string }> = {
  insight: { bg: "rgba(45,90,61,0.06)", border: "#2d5a3d" },
  warning: { bg: "rgba(122,99,32,0.06)", border: "#7a6320" },
  key: { bg: "rgba(59,130,246,0.06)", border: "var(--accent)" },
  mechanism: { bg: "rgba(90,61,107,0.06)", border: "#5a3d6b" },
};

export function Callout({ type = "insight", children }: Props) {
  const s = STYLES[type];
  return (
    <div
      className="rounded-lg p-4 text-sm leading-relaxed"
      style={{ background: s.bg, borderLeft: `3px solid ${s.border}`, color: "var(--fg)" }}
    >
      {children}
    </div>
  );
}
