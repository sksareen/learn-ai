"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  moduleNumber: number;
  title: string;
  partLabel: string;
  partTitle: string;
  totalModules?: number;
  prevHref?: string;
  nextHref?: string;
  nextLabel?: string;
  children: React.ReactNode;
}

const PART_COLORS: Record<string, string> = {
  "Part 1": "var(--accent)",
  "Part 2": "#a855f6",
  "Part 3": "#f59e0b",
  "Part 4": "#10b981",
};

export function ModuleLayout({
  moduleNumber,
  title,
  partLabel,
  partTitle,
  totalModules = 12,
  prevHref,
  nextHref,
  nextLabel,
  children,
}: Props) {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handler = () => {
      const h = document.documentElement;
      setScrollPct(Math.min((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100, 100));
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const partColor = PART_COLORS[partLabel] || "var(--accent)";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] z-50 transition-all duration-300"
        style={{ width: `${scrollPct}%`, background: partColor }}
      />

      {/* Hero */}
      <div className="max-w-2xl mx-auto px-5 pt-20 pb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span
            className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: `${partColor}15`, color: partColor }}
          >
            {partLabel}
          </span>
          <span className="text-xs" style={{ color: "var(--faint)" }}>
            {partTitle}
          </span>
        </div>
        <div
          className="inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold mb-4"
          style={{ background: `${partColor}15`, color: partColor }}
        >
          {moduleNumber}
        </div>
        <h1
          className="text-2xl sm:text-3xl font-bold leading-tight mb-3"
          style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}
        >
          {title}
        </h1>
        <div className="text-xs" style={{ color: "var(--faint)" }}>
          Module {moduleNumber} of {totalModules}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-5 pb-8">
        <div className="flex flex-col gap-8">
          {children}
        </div>
      </div>

      {/* Navigation */}
      <div
        className="max-w-2xl mx-auto px-5 py-12 flex items-center justify-between"
        style={{ borderTop: "1px solid var(--border-color)" }}
      >
        {prevHref ? (
          <Link href={prevHref} className="text-sm font-medium" style={{ color: "var(--muted)" }}>
            &larr; Previous
          </Link>
        ) : <div />}
        {nextHref ? (
          <Link
            href={nextHref}
            className="text-sm font-medium px-5 py-2.5 rounded-lg text-white"
            style={{ background: partColor }}
          >
            {nextLabel || "Next module"} &rarr;
          </Link>
        ) : (
          <span className="text-sm" style={{ color: "var(--faint)" }}>More modules coming soon</span>
        )}
      </div>

      <footer className="px-4 py-8 text-center">
        <p className="text-xs" style={{ color: "var(--faint)" }}>learn.justbuildapps.com</p>
      </footer>
    </div>
  );
}
