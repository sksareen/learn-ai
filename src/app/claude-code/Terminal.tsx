"use client";

import { useEffect, useRef, useState } from "react";
import type { StageScript, TerminalLine } from "./scripts";
import "./terminal.css";

interface Props {
  scripts: StageScript[];
  activeStage: number;
}

function getLineDelay(line: TerminalLine): number {
  switch (line.type) {
    case "blank": return 40;
    case "user": return 350;
    case "text": return 180;
    case "tool-bash":
    case "tool-read":
    case "tool-edit": return 200;
    case "diff-add":
    case "diff-remove": return 70;
    case "bash-output": return 100;
    default: return 100;
  }
}

interface VisibleLine {
  line: TerminalLine;
  stage: number;
  index: number;
  isAnimating: boolean;
}

export function Terminal({ scripts, activeStage }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<VisibleLine[]>([]);

  useEffect(() => {
    if (activeStage < 0) {
      setVisibleLines([]);
      return;
    }

    const instantLines: VisibleLine[] = [];
    for (let s = 0; s < activeStage && s < scripts.length; s++) {
      const stageLines = scripts[s]?.lines ?? [];
      for (let i = 0; i < stageLines.length; i++) {
        instantLines.push({ line: stageLines[i], stage: s, index: i, isAnimating: false });
      }
    }

    setVisibleLines(instantLines);

    const currentStageLines = scripts[activeStage]?.lines ?? [];
    let delay = 150;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < currentStageLines.length; i++) {
      const line = currentStageLines[i];
      const d = delay;
      timeouts.push(
        setTimeout(() => {
          setVisibleLines((prev) => [
            ...prev,
            { line, stage: activeStage, index: i, isAnimating: true },
          ]);
        }, d)
      );
      delay += getLineDelay(line);
    }

    return () => timeouts.forEach(clearTimeout);
  }, [activeStage, scripts]);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleLines]);

  return (
    <div className="terminal-window">
      {/* Title bar */}
      <div className="terminal-titlebar">
        <div className="terminal-dots">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
        </div>
        <span className="terminal-title">claude</span>
      </div>

      {/* Content */}
      <div ref={containerRef} className="terminal-content">
        {visibleLines.map((entry, i) => (
          <LineView
            key={`${entry.stage}-${entry.index}`}
            line={entry.line}
            animate={entry.isAnimating}
          />
        ))}
        {visibleLines.length === 0 && (
          <span className="terminal-cursor">▊</span>
        )}
      </div>
    </div>
  );
}

function LineView({ line, animate }: { line: TerminalLine; animate: boolean }) {
  const cls = animate ? "terminal-line terminal-line-animate" : "terminal-line";

  if (line.type === "blank") return <div className="terminal-blank" />;

  if (line.type === "user") {
    return (
      <div className={cls}>
        <span className="terminal-prompt">❯ </span>
        <span className="terminal-user-text">{line.text}</span>
      </div>
    );
  }

  if (line.type === "text") {
    return <div className={cls + " terminal-assistant"}>{line.text}</div>;
  }

  if (line.type === "system") {
    return <div className={cls + " terminal-system"}>{line.text}</div>;
  }

  if (line.type === "tool-read") {
    return (
      <div className={cls + " terminal-tool"}>
        <span className="terminal-tool-icon terminal-tool-blue">⏺</span>
        <span className="terminal-tool-label">Read</span>
        <span className="terminal-tool-path">{line.text}</span>
      </div>
    );
  }

  if (line.type === "tool-edit") {
    return (
      <div className={cls + " terminal-tool"}>
        <span className="terminal-tool-icon terminal-tool-orange">⏺</span>
        <span className="terminal-tool-label">Edit</span>
        <span className="terminal-tool-path">{line.text}</span>
      </div>
    );
  }

  if (line.type === "tool-bash") {
    return (
      <div className={cls + " terminal-tool"}>
        <span className="terminal-tool-icon terminal-tool-green">⏺</span>
        <span className="terminal-tool-label">Bash</span>
        <span className="terminal-tool-path">{line.text}</span>
      </div>
    );
  }

  if (line.type === "tool-content") {
    return (
      <div className={cls + " terminal-tool-body"}>
        {line.text}
      </div>
    );
  }

  if (line.type === "diff-add") {
    return <div className={cls + " terminal-diff-add"}>{line.text}</div>;
  }

  if (line.type === "diff-remove") {
    return <div className={cls + " terminal-diff-remove"}>{line.text}</div>;
  }

  if (line.type === "diff-context") {
    return <div className={cls + " terminal-diff-context"}>{line.text}</div>;
  }

  if (line.type === "bash-output") {
    return <div className={cls + " terminal-bash-output"}>{line.text}</div>;
  }

  return <div className={cls}>{line.text}</div>;
}
