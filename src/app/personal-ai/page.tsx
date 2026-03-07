"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ChatSimulator } from "./ChatSimulator";
import type { ChatStageScript } from "./ChatSimulator";
import { CH1_SCRIPTS, CH2_SCRIPTS, CH3_SCRIPTS, CH4_SCRIPTS, CH5_SCRIPTS } from "./scripts";
import { ChevronDown } from "lucide-react";

interface Chapter {
  title: string;
  subtitle: string;
  scripts: ChatStageScript[];
  stages: { title: string; body: string }[];
  divider?: { text: string; heading: string };
  aiName?: string;
  aiEmoji?: string;
}

const CHAPTERS: Chapter[] = [
  {
    title: "Chapter 1",
    subtitle: "The stranger",
    scripts: CH1_SCRIPTS,
    aiName: "AI",
    aiEmoji: "○",
    stages: [
      {
        title: "It's friendly. But it doesn't know you.",
        body: "You open the AI and ask for help. It responds instantly — but with generic advice that could be for anyone.",
      },
      {
        title: "It forgot everything",
        body: "You talked last week. You explained your project, your struggles, what you need. Today? Gone. You have to start over from scratch.",
      },
      {
        title: "Every time, the same blank stare",
        body: "Without memory, every conversation is a first date. You explain yourself, it gives surface-level help, and next time you do it all again.",
      },
    ],
  },
  {
    title: "Chapter 2",
    subtitle: "Tell it about you",
    scripts: CH2_SCRIPTS,
    aiName: "AI",
    aiEmoji: "○",
    divider: {
      text: "What if instead of starting from scratch...",
      heading: "You introduced yourself?",
    },
    stages: [
      {
        title: "\"Here's who I am\"",
        body: "Tell the AI about yourself — your name, what you're working on, where you are in the process. It immediately starts giving better, more relevant help.",
      },
      {
        title: "\"Here's where I struggle\"",
        body: "The more honest you are about what's hard for you, the better it can help. It doesn't judge — it adjusts.",
      },
      {
        title: "\"Remember this\"",
        body: "Two words and everything you just shared gets saved. Next time you come back, it already knows you. No more re-explaining.",
      },
    ],
  },
  {
    title: "Chapter 3",
    subtitle: "Give it a personality",
    scripts: CH3_SCRIPTS,
    aiName: "Sage",
    aiEmoji: "✦",
    divider: {
      text: "The default AI is helpful but impersonal. What if it felt like talking to someone you chose?",
      heading: "Make it yours.",
    },
    stages: [
      {
        title: "Tell it how to be",
        body: "Warm or direct? Concise or detailed? Give it a name, a style, a way of talking. You're designing the relationship.",
      },
      {
        title: "It becomes that person",
        body: "The shift is immediate. Same AI, completely different feel. It talks the way you asked, focuses on what matters, skips what doesn't.",
      },
      {
        title: "The help gets real",
        body: "Instead of generic writing tips, you get specific feedback on your actual work, in the style you asked for. That's the difference identity makes.",
      },
      {
        title: "Night and day",
        body: "Compare \"here are some tips for children's books\" to a friend who rewrites your paragraph and tells you exactly what to fix. Same AI. Different relationship.",
      },
    ],
  },
  {
    title: "Chapter 4",
    subtitle: "It grows with you",
    scripts: CH4_SCRIPTS,
    aiName: "Sage",
    aiEmoji: "✦",
    divider: {
      text: "Memory isn't just about convenience.",
      heading: "It's about getting better together.",
    },
    stages: [
      {
        title: "It picks up where you left off",
        body: "Come back after a week and it remembers your project, your patterns, your goals. The conversation continues, not restarts.",
      },
      {
        title: "You can shape it over time",
        body: "\"Always show me a rewrite, not just feedback.\" Every preference you add makes the next conversation better.",
      },
      {
        title: "It sees your growth",
        body: "After a month, it can tell you how you've improved, what patterns you've broken, and where to push next. It has context no single conversation could give.",
      },
    ],
  },
  {
    title: "Chapter 5",
    subtitle: "What you can do together",
    scripts: CH5_SCRIPTS,
    aiName: "Sage",
    aiEmoji: "✦",
    divider: {
      text: "This isn't just a chatbot anymore.",
      heading: "It's a creative partner.",
    },
    stages: [
      {
        title: "It knows what matters today",
        body: "\"You have 2 hours? Focus on this one scene.\" It knows your project, your timeline, and what's most important right now.",
      },
      {
        title: "It pushes you in the right direction",
        body: "When you're stuck, it doesn't give generic advice. It gives you the insight that unlocks the next step — because it knows your work deeply.",
      },
      {
        title: "It's been there the whole time",
        body: "When you finish your project, the AI that helped you has context on every chapter, every struggle, every breakthrough. That's a relationship, not a tool.",
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
      refsArray.current[chIdx].current.forEach(ref => ref && observer.observe(ref));
      observers.push(observer);
    }
    return () => observers.forEach(o => o.disconnect());
  }, [isDesktop, chapterCount]);

  return { stages, refsArray };
}

// ── App ──

export default function PersonalAI() {
  const [started, setStarted] = useState(false);
  if (!started) return <Landing onStart={() => setStarted(true)} />;
  return <ScrollExperience />;
}

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ background: "var(--bg)" }}>
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold leading-tight mb-6" style={{ color: "var(--fg)" }}>
          What if your AI<br />actually knew you?
        </h1>
        <p className="text-base leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
          Right now, every conversation starts from scratch.
          Your AI doesn't remember yesterday, doesn't know your goals,
          and gives the same generic help to everyone.
          <br /><br />
          It doesn't have to be that way.
        </p>
        <button
          onClick={onStart}
          className="px-6 py-3 rounded-lg font-medium text-white transition-colors"
          style={{ background: "var(--accent)" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          See How
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

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div
        className="hidden lg:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-1 transition-opacity duration-700"
        style={{ opacity: showScrollHint ? 1 : 0, pointerEvents: "none" }}
      >
        <span className="text-xs" style={{ color: "var(--faint)" }}>Scroll to explore</span>
        <ChevronDown size={16} color="var(--faint)" className="animate-bounce" />
      </div>

      <div className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3">
        {chapterDots.map((dot, i) => (
          <button key={i} className="group relative flex items-center" title={dot.label}>
            <div
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                background: dot.current ? "var(--accent)" : dot.active ? "var(--accent-dim, rgba(59,130,246,0.25))" : "var(--border-color)",
                transform: dot.current ? "scale(1.4)" : "scale(1)",
              }}
            />
            <span
              className="absolute right-6 whitespace-nowrap text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--fg)" }}
            >
              {dot.label}
            </span>
          </button>
        ))}
      </div>

      {CHAPTERS.map((ch, chIdx) => (
        <div key={chIdx}>
          {ch.divider && (
            <div className="max-w-3xl mx-auto py-16 px-4 text-center" style={{ borderTop: "1px solid var(--border-color)" }}>
              <p className="text-sm" style={{ color: "var(--muted)" }}>{ch.divider.text}</p>
              <p className="text-lg font-semibold mt-4" style={{ color: "var(--fg)" }}>{ch.divider.heading}</p>
            </div>
          )}

          {/* Desktop */}
          <div className="hidden lg:flex max-w-[1400px] mx-auto relative">
            <div className="sticky top-0 self-start w-[50%] h-screen overflow-y-auto p-6 flex flex-col justify-center">
              <div className="text-xs font-mono mb-3" style={{ color: "var(--faint)" }}>
                {ch.title} <span style={{ color: "var(--accent)" }}>/ {ch.subtitle}</span>
              </div>
              <ChatSimulator
                scripts={ch.scripts}
                activeStage={isDesktop ? chStages[chIdx] : ch.stages.length - 1}
                aiName={ch.aiName}
                aiEmoji={ch.aiEmoji}
              />
            </div>
            <div className="w-[50%]">
              {ch.stages.map((s, i) => (
                <div
                  key={i}
                  ref={el => { refsArray.current[chIdx].current[i] = el; }}
                  className="min-h-[80vh] flex items-center px-10"
                >
                  <div
                    className="max-w-md transition-all duration-700"
                    style={{
                      opacity: globalStage >= chOffsets[chIdx] + i ? 1 : 0.15,
                      transform: globalStage >= chOffsets[chIdx] + i ? "translateY(0)" : "translateY(20px)",
                    }}
                  >
                    <div className="text-xs font-mono mb-2" style={{ color: "var(--faint)" }}>
                      {chOffsets[chIdx] + i + 1} / {totalStages}
                    </div>
                    <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--fg)" }}>{s.title}</h2>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden max-w-2xl mx-auto px-4 py-8">
            <div className="text-xs font-mono mb-4" style={{ color: "var(--faint)" }}>
              {ch.title} <span style={{ color: "var(--accent)" }}>/ {ch.subtitle}</span>
            </div>
            {ch.stages.map((s, i) => (
              <div key={i} className="mb-12">
                <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--fg)" }}>{s.title}</h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>{s.body}</p>
                <ChatSimulator
                  scripts={[ch.scripts[i]]}
                  activeStage={0}
                  aiName={ch.aiName}
                  aiEmoji={ch.aiEmoji}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Outro */}
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <p className="text-lg font-semibold mb-3" style={{ color: "var(--fg)" }}>
          This is what AI is supposed to feel like.
        </p>
        <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
          Not a search engine. Not a chatbot. A partner that knows you,
          grows with you, and gets better the more you work together.
        </p>
        <a
          href="/"
          className="px-5 py-2.5 rounded-lg font-medium text-white"
          style={{ background: "var(--accent)" }}
        >
          Explore more guides →
        </a>
      </div>

      <footer className="px-4 py-8 text-center">
        <p className="text-xs" style={{ color: "var(--border-color)" }}>learn.justbuildapps.com</p>
      </footer>
    </div>
  );
}
