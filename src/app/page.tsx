"use client";

import Link from "next/link";

interface Guide {
  href: string;
  title: string;
  description: string;
  tag: string;
  color: string;
  icon: string;
  comingSoon?: boolean;
}

const TREE: { label: string; guides: Guide[] }[] = [
  {
    label: "Start here",
    guides: [
      { href: "/personal-ai", title: "Your Personal AI", description: "Give your AI a name, a personality, and memory", tag: "No tech needed", color: "#f0883e", icon: "chat" },
    ],
  },
  {
    label: "Go deeper",
    guides: [
      { href: "/context-management", title: "Context & Memory", description: "How to give AI persistent memory and project knowledge", tag: "Interactive guide", color: "#d2a8ff", icon: "brain" },
      { href: "/claude-code", title: "Claude Code", description: "An AI that works directly on your projects", tag: "Interactive guide", color: "#7aa2f7", icon: "terminal" },
    ],
  },
  {
    label: "Under the hood",
    guides: [
      { href: "/gpu-scheduling", title: "GPU Scheduling", description: "How hundreds of GPUs decide who goes first", tag: "Live simulation", color: "#3fb950", icon: "grid" },
    ],
  },
  {
    label: "Coming soon",
    guides: [
      { href: "#", title: "Prompt Engineering", description: "What actually makes a good prompt", tag: "Coming soon", color: "#f0883e", icon: "chat", comingSoon: true },
      { href: "#", title: "How LLMs Work", description: "What happens when AI reads your message", tag: "Coming soon", color: "#58a6ff", icon: "layers", comingSoon: true },
      { href: "#", title: "AI Agents", description: "When AI takes actions, not just answers", tag: "Coming soon", color: "#f778ba", icon: "agent", comingSoon: true },
      { href: "#", title: "Building with APIs", description: "Add AI to your own apps", tag: "Coming soon", color: "#79c0ff", icon: "api", comingSoon: true },
      { href: "#", title: "Fine-Tuning & RAG", description: "Make AI work on your data", tag: "Coming soon", color: "#56d364", icon: "data", comingSoon: true },
    ],
  },
];

const ICONS: Record<string, string> = {
  terminal: "❯", brain: "◉", grid: "⊞", chat: "◇", layers: "◫", agent: "⬡", api: "⟁", data: "⊡",
};

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--fg)" }}>Learn AI</h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Interactive guides to how AI actually works. No jargon. Just explore.
          </p>
        </div>

        {/* Tree */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[11px] top-4 bottom-4 w-px"
            style={{ background: "var(--border-color)" }}
          />

          {TREE.map((section, si) => (
            <div key={si} className="mb-10 last:mb-0">
              {/* Section label with dot */}
              <div className="flex items-center gap-3 mb-4 relative">
                <div
                  className="w-[23px] h-[23px] rounded-full flex items-center justify-center z-10 shrink-0"
                  style={{ background: "var(--bg-surface)", border: "2px solid var(--border-color)" }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: si === TREE.length - 1 ? "var(--faint)" : "var(--accent)" }}
                  />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--faint)" }}>
                  {section.label}
                </span>
              </div>

              {/* Cards */}
              <div className="pl-10 flex flex-col gap-3">
                {section.guides.map((g) => {
                  const isComingSoon = g.comingSoon;

                  const card = (
                    <div
                      className={`rounded-xl p-4 transition-all duration-200 ${isComingSoon ? "" : "group hover:translate-x-1"}`}
                      style={{
                        background: isComingSoon ? "var(--bg-surface)" : "var(--bg-card)",
                        border: `1px solid var(--border-color)`,
                        opacity: isComingSoon ? 0.5 : 1,
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-7 h-7 rounded-md flex items-center justify-center text-sm shrink-0"
                          style={{ background: g.color + (isComingSoon ? "08" : "12") }}
                        >
                          <span style={{ color: isComingSoon ? g.color + "40" : g.color }}>{ICONS[g.icon]}</span>
                        </div>
                        <h3 className="text-sm font-semibold" style={{ color: isComingSoon ? "var(--faint)" : "var(--fg)" }}>
                          {g.title}
                        </h3>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full ml-auto shrink-0"
                          style={{ background: g.color + (isComingSoon ? "08" : "10"), color: isComingSoon ? g.color + "50" : g.color }}
                        >
                          {g.tag}
                        </span>
                      </div>
                      <p className="text-xs pl-10" style={{ color: isComingSoon ? "var(--faint)" : "var(--muted)" }}>
                        {g.description}
                      </p>
                      {!isComingSoon && (
                        <div className="text-xs pl-10 mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: g.color }}>
                          Explore →
                        </div>
                      )}
                    </div>
                  );

                  if (isComingSoon) return <div key={g.title}>{card}</div>;

                  return (
                    <Link key={g.href} href={g.href}>
                      {card}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-xs" style={{ color: "var(--faint)" }}>
            ⌘I to toggle dark mode
          </p>
        </div>
      </div>
    </div>
  );
}
