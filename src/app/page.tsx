"use client";

import Link from "next/link";

interface Module {
  num: number;
  href: string;
  title: string;
  description: string;
  comingSoon?: boolean;
}

interface Part {
  label: string;
  title: string;
  color: string;
  description: string;
  modules: Module[];
}

const PARTS: Part[] = [
  {
    label: "Part 1",
    title: "Use It",
    color: "#3b82f6",
    description: "Go from zero to your first useful result. Learn to get real value, spot when AI is wrong, and fix bad output.",
    modules: [
      { num: 1, href: "/first-useful-thing", title: "Your First Useful Thing", description: "Get AI to solve a real problem in your life" },
      { num: 2, href: "/ai-lies", title: "When AI Lies to Your Face", description: "How to spot confident nonsense" },
      { num: 3, href: "/fix-it", title: "Fix It, Don't Restart", description: "Diagnose bad output and make it better" },
    ],
  },
  {
    label: "Part 2",
    title: "Own It",
    color: "#a855f6",
    description: "Make AI yours. Set up memory, build reusable tools, and create a personal AI stack.",
    modules: [
      { num: 4, href: "/remember-you", title: "Make It Remember You", description: "System prompts and persistent context" },
      { num: 5, href: "/build-a-tool", title: "Build Your First Tool", description: "Create something you'll use every week" },
      { num: 6, href: "#", title: "Your AI Stack", description: "Project context, memory, and CLAUDE.md files", comingSoon: true },
    ],
  },
  {
    label: "Part 3",
    title: "Build With It",
    color: "#f59e0b",
    description: "Use AI to build real software. Go from idea to deployed app in one conversation.",
    modules: [
      { num: 7, href: "#", title: "Claude Code: Your Coding Partner", description: "An AI that reads, edits, and tests your code", comingSoon: true },
      { num: 8, href: "#", title: "From Idea to Deployed App", description: "Build and ship a full-stack app", comingSoon: true },
      { num: 9, href: "#", title: "When Things Break", description: "Debug like an engineer with AI", comingSoon: true },
    ],
  },
  {
    label: "Part 4",
    title: "Automate Everything",
    color: "#10b981",
    description: "Connect AI to your entire workflow. Commands, hooks, integrations, parallel agents.",
    modules: [
      { num: 10, href: "/commands-and-hooks", title: "Commands, Hooks, and Workflows", description: "Custom commands and automation", comingSoon: true },
      { num: 11, href: "/connect-everything", title: "Connect Your Whole Life", description: "MCP integrations to Slack, GitHub, Calendar", comingSoon: true },
      { num: 12, href: "/parallel-agents", title: "Working in Parallel", description: "Multiple AI agents, one goal", comingSoon: true },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <div className="max-w-2xl mx-auto px-6 pt-16 pb-6 text-center">
        <h1
          className="text-3xl sm:text-4xl font-bold leading-tight mb-3"
          style={{ color: "var(--fg)", letterSpacing: "-0.03em" }}
        >
          Learn to Actually Use AI
        </h1>
        <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "var(--muted)" }}>
          From your first prompt to building full-stack apps and automating your life.
          No jargon. Just the skills that matter.
        </p>
      </div>

      {/* Course map */}
      <div className="max-w-2xl mx-auto px-6 pb-20">
        {PARTS.map((part, pi) => (
          <div key={pi} className="mb-10 last:mb-0">
            {/* Part header */}
            <div className="flex items-center gap-3 mb-2 mt-8">
              <span
                className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{ background: part.color + "15", color: part.color }}
              >
                {part.label}
              </span>
              <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                {part.title}
              </span>
            </div>
            <p className="text-xs mb-4 pl-0.5" style={{ color: "var(--faint)" }}>
              {part.description}
            </p>

            {/* Module cards */}
            <div className="flex flex-col gap-2.5">
              {part.modules.map((m) => {
                const inner = (
                  <div
                    className={`rounded-xl p-4 transition-all duration-200 ${m.comingSoon ? "" : "group hover:translate-x-1"}`}
                    style={{
                      background: m.comingSoon ? "var(--bg-surface)" : "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                      opacity: m.comingSoon ? 0.45 : 1,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{
                          background: m.comingSoon ? "var(--bg-surface)" : part.color + "12",
                          color: m.comingSoon ? "var(--faint)" : part.color,
                          border: m.comingSoon ? "1px solid var(--border-color)" : "none",
                        }}
                      >
                        {m.num}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold" style={{ color: m.comingSoon ? "var(--faint)" : "var(--fg)" }}>
                          {m.title}
                        </h3>
                        <p className="text-xs mt-0.5" style={{ color: m.comingSoon ? "var(--faint)" : "var(--muted)" }}>
                          {m.description}
                        </p>
                      </div>
                      {!m.comingSoon && (
                        <span
                          className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                          style={{ color: part.color }}
                        >
                          Start &rarr;
                        </span>
                      )}
                      {m.comingSoon && (
                        <span className="text-xs shrink-0" style={{ color: "var(--faint)" }}>
                          Soon
                        </span>
                      )}
                    </div>
                  </div>
                );

                if (m.comingSoon) return <div key={m.num}>{inner}</div>;
                return <Link key={m.num} href={m.href}>{inner}</Link>;
              })}
            </div>
          </div>
        ))}

        {/* Bonus */}
        <div className="mt-12 text-center">
          <Link
            href="/how-we-made-this"
            className="inline-block text-xs font-medium px-4 py-2 rounded-lg transition-all hover:translate-x-0.5"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--muted)" }}
          >
            Bonus: How we made this course &rarr;
          </Link>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs" style={{ color: "var(--faint)" }}>
            12 modules &middot; From zero to full automation &middot; &#8984;I to toggle dark mode
          </p>
        </div>
      </div>
    </div>
  );
}
