"use client";

import { useState } from "react";

interface Option {
  text: string;
  correct?: boolean;
}

interface Props {
  question: string;
  claim?: string;
  options: Option[];
  explanation: string;
}

export function Quiz({ question, claim, options, explanation }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
    >
      <div className="p-5">
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--fg)" }}>{question}</h3>

        {claim && (
          <div
            className="text-sm leading-relaxed p-3.5 rounded-lg mb-4 italic"
            style={{
              background: "var(--bg-surface)",
              borderLeft: "3px solid var(--faint)",
              color: "var(--muted)",
            }}
          >
            {claim}
          </div>
        )}

        <div className="flex flex-col gap-2 mb-3">
          {options.map((opt, i) => {
            let style: React.CSSProperties = {
              background: "var(--bg-surface)",
              border: "1px solid var(--border-color)",
              color: "var(--fg)",
            };
            if (answered) {
              if (opt.correct) {
                style = { background: "rgba(45,90,61,0.1)", border: "1px solid #2d5a3d", color: "#2d5a3d" };
              } else if (i === selected && !opt.correct) {
                style = { background: "rgba(139,58,58,0.1)", border: "1px solid #8b3a3a", color: "#8b3a3a" };
              } else {
                style = { ...style, opacity: 0.4 };
              }
            }

            return (
              <button
                key={i}
                onClick={() => !answered && setSelected(i)}
                className="text-left px-4 py-3 rounded-lg text-sm leading-relaxed transition-all"
                style={{ ...style, cursor: answered ? "default" : "pointer" }}
              >
                {opt.text}
              </button>
            );
          })}
        </div>

        {answered && (
          <div
            className="text-sm leading-relaxed p-3.5 rounded-lg"
            style={{ background: "rgba(45,90,61,0.08)", color: "var(--fg)" }}
          >
            {explanation}
          </div>
        )}
      </div>
    </div>
  );
}
