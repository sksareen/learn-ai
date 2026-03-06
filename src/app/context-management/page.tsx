"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Terminal } from "./Terminal";
import { CH1_SCRIPTS, CH2_SCRIPTS, CH3_SCRIPTS, CH4_SCRIPTS } from "./scripts";
import type { StageScript } from "./scripts";
import { ChevronDown } from "lucide-react";

// ── Chapter definitions ──

interface Chapter {
  title: string;
  subtitle: string;
  scripts: StageScript[];
  stages: { title: string; body: string }[];
  divider?: { text: string; heading: string };
}

const CHAPTERS: Chapter[] = [
  {
    title: "Chapter 1",
    subtitle: "The problem",
    scripts: CH1_SCRIPTS,
    stages: [
      {
        title: "You explain things. It gets them right.",
        body: "In the moment, Claude understands perfectly. Your tools, your conventions, your API — it does exactly what you want.",
      },
      {
        title: "Next session: gone.",
        body: "Come back tomorrow and Claude has no idea what you told it. It goes back to its defaults — wrong tools, wrong URLs, wrong patterns.",
      },
      {
        title: "You re-explain. Every. Time.",
        body: "\"No, I told you — we use Tailwind, not CSS files.\" You end up repeating yourself every session. That gets old fast.",
      },
      {
        title: "Every session starts from zero",
        body: "This is the default. Claude doesn't carry anything between conversations. Your instructions, preferences, project knowledge — all gone when you close the window.",
      },
    ],
  },
  {
    title: "Chapter 2",
    subtitle: "The quick fix",
    scripts: CH2_SCRIPTS,
    divider: {
      text: "There's a two-word fix for this.",
      heading: "\"Remember this.\"",
    },
    stages: [
      {
        title: "Just say \"remember\"",
        body: "Tell Claude what to remember in plain English. It saves it to a file that persists across sessions. That's it.",
      },
      {
        title: "Next session: it knows",
        body: "Claude reads its memory at the start of every conversation. Your preferences are there. No more re-explaining.",
      },
      {
        title: "Keep adding over time",
        body: "Every time you correct Claude or teach it something new, say \"remember that.\" Your memory file grows into a perfect set of instructions.",
      },
      {
        title: "It compounds",
        body: "After a week of \"remember this\", Claude knows your tools, your file structure, your naming conventions, your API endpoints. It just works the way you expect.",
      },
    ],
  },
  {
    title: "Chapter 3",
    subtitle: "Project context",
    scripts: CH3_SCRIPTS,
    divider: {
      text: "Personal memory is great. But what about your team?",
      heading: "Put context where the project is.",
    },
    stages: [
      {
        title: "One file in your project",
        body: "Drop a CLAUDE.md in your project folder. Every time Claude works on this project, it reads this file first — like onboarding notes for a new teammate.",
      },
      {
        title: "How your team works",
        body: "Add your naming conventions, file organization, testing rules, commit style. Now Claude follows the same rules as everyone on your team.",
      },
      {
        title: "How your app is built",
        body: "Explain the big picture — what talks to what, where data lives, how things connect. This helps Claude put new code in the right place.",
      },
      {
        title: "Anyone on your team gets it for free",
        body: "A new person clones the repo and starts using Claude. No setup, no configuration — the CLAUDE.md teaches Claude everything about this project automatically.",
      },
    ],
  },
  {
    title: "Chapter 4",
    subtitle: "Getting it right",
    scripts: CH4_SCRIPTS,
    divider: {
      text: "More context isn't always better.",
      heading: "The right context is what matters.",
    },
    stages: [
      {
        title: "Too little: Claude guesses",
        body: "Without context, Claude has to explore your whole codebase just to understand the basics. It asks a lot of questions instead of just helping.",
      },
      {
        title: "Too much: Claude gets confused",
        body: "A giant context file with old notes, contradictions, and irrelevant details makes Claude worse. It can't tell what's current and what's outdated.",
      },
      {
        title: "Just right: Claude nails it",
        body: "A short, current file with your stack, structure, conventions, and known issues. Claude goes straight to the right answer.",
      },
      {
        title: "The rule of thumb",
        body: "Write your CLAUDE.md like you're onboarding a new teammate. What would you tell them on day one? Current tools, how things are organized, what to watch out for. That's it.",
      },
    ],
  },
];

// ── Hooks ──

function useIsDesktop() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const c = () => setV(window.innerWidth >= 1024);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);
  return v;
}

function useChapterObservers(isDesktop: boolean, chapterCount: number) {
  const [stages, setStages] = useState<number[]>(() => Array(chapterCount).fill(-1));
  const refsArray = useRef<React.RefObject<(HTMLDivElement | null)[]>[]>(
    Array.from({ length: chapterCount }, () => ({ current: [] }))
  );

  useEffect(() => {
    const t = setTimeout(() => setStages(prev => { const n = [...prev]; n[0] = 0; return n; }), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const observers: IntersectionObserver[] = [];
    for (let ch = 0; ch < chapterCount; ch++) {
      const chIdx = ch;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const idx = refsArray.current[chIdx].current.indexOf(entry.target as HTMLDivElement);
              if (idx !== -1) setStages(prev => { const n = [...prev]; n[chIdx] = idx; return n; });
            }
          }
        },
        { threshold: 0.4, rootMargin: "-30% 0px -30% 0px" }
      );
      refsArray.current[chIdx].current.forEach((ref) => ref && observer.observe(ref));
      observers.push(observer);
    }
    return () => observers.forEach(o => o.disconnect());
  }, [isDesktop, chapterCount]);

  return { stages, refsArray };
}

// ── App ──

export default function ContextManagement() {
  const [started, setStarted] = useState(false);
  if (!started) return <Landing onStart={() => setStarted(true)} />;
  return <ScrollExperience />;
}

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ background: "#0f0f14" }}>
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold leading-tight mb-6" style={{ color: "#c9d1d9" }}>
          You told your AI something<br />yesterday.<br />Today it has no idea.
        </h1>
        <p className="text-base leading-relaxed mb-8" style={{ color: "#8b949e" }}>
          AI agents start fresh every session. Your preferences, your project knowledge,
          your team's conventions — gone every time.
          <br /><br />
          Here's how to fix that.
        </p>
        <button
          onClick={onStart}
          className="px-6 py-3 rounded-lg font-medium text-white transition-colors"
          style={{ background: "#7aa2f7" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#89b4fa")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#7aa2f7")}
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
}

function ScrollExperience() {
  const isDesktop = useIsDesktop();
  const { stages: chStages, refsArray } = useChapterObservers(isDesktop, CHAPTERS.length);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handler = () => { if (window.scrollY > 80) setShowScrollHint(false); };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const chLens = useMemo(() => CHAPTERS.map(c => c.stages.length), []);
  const chOffsets = useMemo(() => {
    const o = [0];
    for (let i = 0; i < chLens.length - 1; i++) o.push(o[i] + chLens[i]);
    return o;
  }, [chLens]);
  const totalStages = useMemo(() => chLens.reduce((a, b) => a + b, 0), [chLens]);

  let globalStage = chStages[0];
  for (let c = 1; c < chStages.length; c++) {
    if (chStages[c] >= 0) globalStage = chOffsets[c] + chStages[c];
  }

  const chapterDots = CHAPTERS.map((ch, i) => ({
    label: ch.subtitle,
    active: chStages[i] >= 0,
    current: chStages[i] >= 0 && (i === CHAPTERS.length - 1 || chStages[i + 1] < 0),
  }));

  const allStages = CHAPTERS.flatMap(c => c.stages);

  return (
    <div className="min-h-screen" style={{ background: "#0f0f14" }}>
      <div
        className="hidden lg:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-1 transition-opacity duration-700"
        style={{ opacity: showScrollHint ? 1 : 0, pointerEvents: "none" }}
      >
        <span className="text-xs" style={{ color: "#565869" }}>Scroll to explore</span>
        <ChevronDown size={16} color="#565869" className="animate-bounce" />
      </div>

      <div className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3">
        {chapterDots.map((dot, i) => (
          <button key={i} className="group relative flex items-center" title={dot.label}>
            <div
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                background: dot.current ? "#7aa2f7" : dot.active ? "#7aa2f740" : "#21262d",
                transform: dot.current ? "scale(1.4)" : "scale(1)",
              }}
            />
            <span
              className="absolute right-6 whitespace-nowrap text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ background: "#161b22", border: "1px solid #21262d", color: "#c9d1d9" }}
            >
              {dot.label}
            </span>
          </button>
        ))}
      </div>

      {CHAPTERS.map((ch, chIdx) => (
        <div key={chIdx}>
          {ch.divider && (
            <div className="max-w-3xl mx-auto py-16 px-4 text-center" style={{ borderTop: "1px solid #21262d" }}>
              <p className="text-sm" style={{ color: "#8b949e" }}>{ch.divider.text}</p>
              <p className="text-lg font-semibold mt-4" style={{ color: "#c9d1d9" }}>{ch.divider.heading}</p>
            </div>
          )}

          <div className="hidden lg:flex max-w-[1400px] mx-auto relative">
            <div className="sticky top-0 self-start w-[55%] h-screen overflow-y-auto p-6 flex flex-col justify-center">
              <div className="text-xs font-mono mb-3" style={{ color: "#484f58" }}>
                {ch.title} <span style={{ color: "#58a6ff" }}>/ {ch.subtitle}</span>
              </div>
              <Terminal scripts={ch.scripts} activeStage={isDesktop ? chStages[chIdx] : ch.stages.length - 1} />
            </div>
            <div className="w-[45%]">
              {ch.stages.map((s, i) => (
                <div
                  key={i}
                  ref={(el) => { refsArray.current[chIdx].current[i] = el; }}
                  className="min-h-[80vh] flex items-center px-8"
                >
                  <div
                    className="max-w-md transition-all duration-700"
                    style={{
                      opacity: globalStage >= chOffsets[chIdx] + i ? 1 : 0.15,
                      transform: globalStage >= chOffsets[chIdx] + i ? "translateY(0)" : "translateY(20px)",
                    }}
                  >
                    <div className="text-xs font-mono mb-2" style={{ color: "#484f58" }}>
                      {chOffsets[chIdx] + i + 1} / {totalStages}
                    </div>
                    <h2 className="text-xl font-semibold mb-3" style={{ color: "#c9d1d9" }}>{s.title}</h2>
                    <p className="text-sm leading-relaxed" style={{ color: "#8b949e" }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:hidden max-w-2xl mx-auto px-4 py-8">
            <div className="text-xs font-mono mb-4" style={{ color: "#484f58" }}>
              {ch.title} <span style={{ color: "#58a6ff" }}>/ {ch.subtitle}</span>
            </div>
            {ch.stages.map((s, i) => (
              <div key={i} className="mb-12">
                <h2 className="text-lg font-semibold mb-2" style={{ color: "#c9d1d9" }}>{s.title}</h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#8b949e" }}>{s.body}</p>
                <Terminal scripts={[ch.scripts[i]]} activeStage={0} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <p className="text-lg font-semibold mb-3" style={{ color: "#c9d1d9" }}>
          Context is everything.
        </p>
        <p className="text-sm mb-8" style={{ color: "#8b949e" }}>
          The difference between an AI that guesses and one that just knows?
          A few lines of text that tell it how you work.
        </p>
        <a
          href="/claude-code"
          className="px-5 py-2.5 rounded-lg font-medium text-white"
          style={{ background: "#7aa2f7" }}
        >
          Learn Claude Code →
        </a>
      </div>

      <footer className="px-4 py-8 text-center">
        <p className="text-xs" style={{ color: "#21262d" }}>learn.justbuildapps.com</p>
      </footer>
    </div>
  );
}
