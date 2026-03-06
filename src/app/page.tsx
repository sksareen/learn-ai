import Link from "next/link";

const GUIDES = [
  {
    href: "/claude-code",
    title: "Claude Code",
    description: "An AI that works directly on your projects. Watch it read, edit, test, and ship — all from a conversation.",
    tag: "Interactive guide",
    color: "#7aa2f7",
  },
  {
    href: "/context-management",
    title: "Context Management",
    description: "Your AI forgets everything between sessions. Here's how to give it memory, project knowledge, and team conventions.",
    tag: "Interactive guide",
    color: "#d2a8ff",
  },
  {
    href: "/gpu-scheduling",
    title: "GPU Scheduling",
    description: "When you send a prompt to an AI, hundreds of GPUs decide who goes first. This is what that looks like.",
    tag: "Live simulation",
    color: "#3b82f6",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-2" style={{ color: "#c9d1d9" }}>
          Learn AI
        </h1>
        <p className="text-sm mb-12" style={{ color: "#8b949e" }}>
          Visual, interactive guides to how AI actually works — no jargon, no prerequisites.
        </p>

        <div className="flex flex-col gap-4">
          {GUIDES.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group rounded-xl p-6 transition-all hover:scale-[1.01]"
              style={{ background: "#161b22", border: "1px solid #21262d" }}
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-semibold" style={{ color: "#c9d1d9" }}>
                  {guide.title}
                </h2>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ background: guide.color + "15", color: guide.color }}
                >
                  {guide.tag}
                </span>
              </div>
              <p className="text-sm" style={{ color: "#8b949e" }}>
                {guide.description}
              </p>
              <div
                className="mt-4 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: guide.color }}
              >
                Start exploring →
              </div>
            </Link>
          ))}
        </div>

        <p className="text-xs mt-12 text-center" style={{ color: "#21262d" }}>
          learn.justbuildapps.com
        </p>
      </div>
    </div>
  );
}
