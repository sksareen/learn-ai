"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function Header() {
  const { dark, toggle } = useTheme();

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-4 py-2.5"
      style={{
        background: dark ? "rgba(10, 12, 16, 0.9)" : "rgba(248, 250, 252, 0.9)",
        borderBottom: `1px solid var(--border-color)`,
        backdropFilter: "blur(12px)",
      }}
    >
      <Link href="/" className="flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity">
        <span style={{ color: "var(--accent)" }}>✦</span>
        <span style={{ color: "var(--fg)" }}>Learn AI</span>
      </Link>

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="p-1.5 rounded-md transition-colors hover:opacity-80"
          style={{ color: "var(--muted)" }}
          title="Toggle theme (⌘I)"
        >
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  );
}
