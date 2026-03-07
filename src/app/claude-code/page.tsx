"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Terminal } from "./Terminal";
import {
  CHAPTER_1_SCRIPTS, CHAPTER_2_SCRIPTS, CHAPTER_3_SCRIPTS,
  CHAPTER_4_SCRIPTS, CHAPTER_5_SCRIPTS, CHAPTER_6_SCRIPTS,
  CHAPTER_7_SCRIPTS, CHAPTER_8_SCRIPTS, CHAPTER_9_SCRIPTS,
} from "./scripts";
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
    subtitle: "What Claude Code does",
    scripts: CHAPTER_1_SCRIPTS,
    stages: [
      {
        title: "Just say what you want",
        body: "You don't need to know file names or programming terms. Just describe what you want in your own words.",
      },
      {
        title: "It looks at your project first",
        body: "Before changing anything, Claude reads through your files to understand how your project is set up — so the changes it makes actually fit in.",
      },
      {
        title: "It makes the changes for you",
        body: "Claude edits your actual project files. You can see exactly what it changed — green lines are new, red lines are removed.",
      },
      {
        title: "It checks its own work",
        body: "After making changes, Claude runs your project's tests. If something broke, it fixes it automatically — just like a developer would.",
      },
      {
        title: "You're always in charge",
        body: "Claude always asks before changing anything. You see what it wants to do and decide — yes, no, or yes to everything.",
      },
      {
        title: "Change your mind anytime",
        body: "Don't like how it did something? Just say so. \"Actually, do it this way instead\" — and Claude adjusts. It's a back-and-forth, not a one-time thing.",
      },
    ],
  },
  {
    title: "Chapter 2",
    subtitle: "Make it yours",
    scripts: CHAPTER_2_SCRIPTS,
    divider: {
      text: "Now you've seen what it can do. But it doesn't know how you like to work yet.",
      heading: "Let's fix that.",
    },
    stages: [
      {
        title: "At first, it guesses",
        body: "Claude picks reasonable defaults — but they might not be your defaults. It doesn't know your favorite tools or how you like things organized.",
      },
      {
        title: "Tell it what you prefer",
        body: "Just say it like you're talking to a person. \"I always use this tool\" or \"don't do that\". Claude remembers it for next time.",
      },
      {
        title: "Give it a personality",
        body: "Want it to be brief and opinionated? Chatty and explanatory? Give it a name, a style — it'll respond the way you want.",
      },
      {
        title: "Everything's in one file",
        body: "All your preferences live in a simple text file. You can edit it by hand, share it with teammates, or save it with your project.",
      },
      {
        title: "Same question, different experience",
        body: "Ask the same thing before and after setting preferences — totally different result. It now uses your tools, your style, your way of working.",
      },
    ],
  },
  {
    title: "Chapter 3",
    subtitle: "Build something real",
    scripts: CHAPTER_3_SCRIPTS,
    divider: {
      text: "You know the tool. You've made it yours.",
      heading: "Now build something.",
    },
    stages: [
      {
        title: "Describe it in one sentence",
        body: "\"I want a waitlist page where people can sign up.\" That's enough. You don't need a plan or a spec.",
      },
      {
        title: "It builds the whole thing",
        body: "Not just one piece — the whole project. Pages, styles, the works. Claude sets everything up so it's ready to run.",
      },
      {
        title: "It handles the behind-the-scenes stuff",
        body: "Saving data, handling form submissions, connecting things together — all the stuff that's tedious to set up by hand.",
      },
      {
        title: "It makes sure everything works",
        body: "Claude starts your project, tests it, and confirms it's working. By the time it says \"done\", it actually is.",
      },
      {
        title: "\"Ship it\"",
        body: "Two words. Claude puts your project live on the internet and gives you the link. From idea to live site in one conversation.",
      },
    ],
  },
  {
    title: "Chapter 4",
    subtitle: "When things break",
    scripts: CHAPTER_4_SCRIPTS,
    divider: {
      text: "Building is the fun part. But what about when something breaks?",
      heading: "Claude's really good at fixing things.",
    },
    stages: [
      {
        title: "Just describe what's wrong",
        body: "\"It crashes when I click save\" is enough. You don't need to know why it's broken — that's Claude's job.",
      },
      {
        title: "It reads through your code",
        body: "Claude follows the trail — finds the button, finds the function, finds the exact line where things go wrong.",
      },
      {
        title: "First: stop the crash",
        body: "It adds a quick safety check so the crash stops happening. But it doesn't stop there.",
      },
      {
        title: "Then: find the real problem",
        body: "The crash was just a symptom. Claude keeps digging until it finds the actual cause and fixes that too.",
      },
      {
        title: "Double-check and done",
        body: "It runs all the tests to make sure the fix didn't break anything else. Both problems solved, everything still works.",
      },
    ],
  },
  {
    title: "Chapter 5",
    subtitle: "Beyond your project",
    scripts: CHAPTER_5_SCRIPTS,
    divider: {
      text: "Claude doesn't just work on your code. It talks to the tools you already use.",
      heading: "Your whole workflow, one conversation.",
    },
    stages: [
      {
        title: "\"What bugs do we have?\"",
        body: "Claude checks your project's issue tracker and shows you what's open. No switching tabs, no searching around.",
      },
      {
        title: "\"Fix that one\"",
        body: "Point at a bug and Claude reads the description, finds the problem in your code, and fixes it.",
      },
      {
        title: "It handles the paperwork",
        body: "Creates a branch, saves the changes, opens a request for your team to review — all the steps you'd normally do by hand.",
      },
      {
        title: "It checks everything passes",
        body: "Before saying it's done, Claude makes sure all your automated checks pass. No surprises for your teammates.",
      },
      {
        title: "It tells your team",
        body: "\"Post in Slack that it's fixed.\" Claude sends the message. Bug → fix → team update, all without leaving the conversation.",
      },
    ],
  },
  {
    title: "Chapter 6",
    subtitle: "Custom commands",
    scripts: CHAPTER_6_SCRIPTS,
    divider: {
      text: "You've seen what Claude can do step by step.",
      heading: "What if you could save those steps?",
    },
    stages: [
      {
        title: "One-word shortcuts",
        body: "Type /commit and Claude figures out what changed, writes a description, and saves it. Common tasks become single commands.",
      },
      {
        title: "Make your own",
        body: "Want a command that builds, tests, and publishes? Just describe the steps in plain English. Claude saves it for you.",
      },
      {
        title: "Then just use it",
        body: "Your custom command works the same as built-in ones. One word and the whole sequence runs automatically.",
      },
      {
        title: "Share them with your team",
        body: "Each command is a simple text file. Save it with your project and everyone on your team can use the same shortcuts.",
      },
    ],
  },
  {
    title: "Chapter 7",
    subtitle: "Connecting your tools",
    scripts: CHAPTER_7_SCRIPTS,
    divider: {
      text: "Custom commands are powerful on their own. They're even better when Claude can talk to your other tools.",
      heading: "Connect everything.",
    },
    stages: [
      {
        title: "Claude talks to other apps",
        body: "Project trackers, chat apps, documentation wikis, databases — Claude can connect to the tools your team already uses.",
      },
      {
        title: "Adding a connection is easy",
        body: "Want Claude to read your team's docs? One line in a config file and it's connected.",
      },
      {
        title: "They work together",
        body: "Read a spec from your wiki. Build it. Open a review. Update the ticket. Claude chains your tools together in one flow.",
      },
      {
        title: "One message, many tools",
        body: "A single request can touch your docs, your code, your project tracker, your team chat, and your review system. All connected.",
      },
    ],
  },
  {
    title: "Chapter 8",
    subtitle: "Putting it all together",
    scripts: CHAPTER_8_SCRIPTS,
    divider: {
      text: "Custom commands describe what to do. Connections give Claude access to your tools.",
      heading: "Combine them and you get real automation.",
    },
    stages: [
      {
        title: "Commands + connections = workflows",
        body: "A command tells Claude the steps. The connections let it actually do them — check trackers, read docs, post updates.",
      },
      {
        title: "Example: morning bug check",
        body: "A simple command that checks for new bugs, looks at error logs, figures out what's easy to fix, and tells your team. Five lines of text, four connected tools.",
      },
      {
        title: "Watch it work",
        body: "One word and Claude checks your bug queue, cross-references with errors, sorts by difficulty, and summarizes everything.",
      },
      {
        title: "Then it keeps going",
        body: "It doesn't just report — it assigns the easy fixes to itself and asks if you want it to start working. The workflow doesn't stop at analysis.",
      },
    ],
  },
  {
    title: "Chapter 9",
    subtitle: "Working in parallel",
    scripts: CHAPTER_9_SCRIPTS,
    divider: {
      text: "One Claude is powerful.",
      heading: "What about three at once?",
    },
    stages: [
      {
        title: "Multiple things at the same time",
        body: "When you have separate tasks that don't depend on each other, Claude can work on all of them simultaneously.",
      },
      {
        title: "Each one gets its own space",
        body: "Every task runs in isolation — they can't interfere with each other. Like three people working on three separate things.",
      },
      {
        title: "Watch them finish",
        body: "Some tasks finish faster than others. Claude keeps track and knows when everything is done and ready to combine.",
      },
      {
        title: "Combine and ship",
        body: "All the work merges together cleanly, everything still works. What would take most of a day happens in minutes.",
      },
    ],
  },
];

// ── App ──

export default function LearnClaudeCode() {
  const [started, setStarted] = useState(false);
  if (!started) return <Landing onStart={() => setStarted(true)} />;
  return <ScrollExperience />;
}

// ── Landing ──

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ background: "var(--bg)" }}>
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold leading-tight mb-6" style={{ color: "var(--fg)" }}>
          What if your AI<br />could do anything<br />on your computer?
        </h1>
        <p className="text-base leading-relaxed mb-8" style={{ color: "var(--faint)" }}>
          Claude Code is an AI that works directly on your projects.
          It reads your files, makes changes, checks its work, and fixes what breaks —
          all from a simple conversation.
          <br /><br />
          This is what that looks like.
        </p>
        <button
          onClick={onStart}
          className="px-6 py-3 rounded-lg font-medium text-white transition-colors"
          style={{ background: "var(--accent)" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
}

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

  // Auto-trigger chapter 0, stage 0 after mount
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
              if (idx !== -1) {
                setStages(prev => {
                  const n = [...prev];
                  n[chIdx] = idx;
                  return n;
                });
              }
            }
          }
        },
        { threshold: 0.4, rootMargin: "-30% 0px -30% 0px" }
      );

      const refs = refsArray.current[chIdx].current;
      refs.forEach((ref) => ref && observer.observe(ref));
      observers.push(observer);
    }

    return () => observers.forEach(o => o.disconnect());
  }, [isDesktop, chapterCount]);

  return { stages, refsArray };
}

// ── Scroll Experience ──

function ScrollExperience() {
  const isDesktop = useIsDesktop();
  const { stages: chStages, refsArray } = useChapterObservers(isDesktop, CHAPTERS.length);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handler = () => { if (window.scrollY > 80) setShowScrollHint(false); };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Compute global stage and offsets
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

  // Progress dots — show one per chapter, not per stage
  const chapterDots = CHAPTERS.map((ch, i) => ({
    label: ch.subtitle,
    active: chStages[i] >= 0,
    current: chStages[i] >= 0 && (i === CHAPTERS.length - 1 || chStages[i + 1] < 0),
  }));

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Scroll hint */}
      <div
        className="hidden lg:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-1 transition-opacity duration-700"
        style={{ opacity: showScrollHint ? 1 : 0, pointerEvents: "none" }}
      >
        <span className="text-xs" style={{ color: "var(--faint)" }}>Scroll to explore</span>
        <ChevronDown size={16} color="var(--faint)" className="animate-bounce" />
      </div>

      {/* Progress dots — one per chapter */}
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

      {/* Chapters */}
      {CHAPTERS.map((ch, chIdx) => (
        <div key={chIdx}>
          {/* Divider (skip for chapter 0) */}
          {ch.divider && (
            <div className="max-w-3xl mx-auto py-16 px-4 text-center" style={{ borderTop: "1px solid var(--border-color)" }}>
              <p className="text-sm" style={{ color: "var(--faint)" }}>{ch.divider.text}</p>
              <p className="text-lg font-semibold mt-4" style={{ color: "var(--fg)" }}>{ch.divider.heading}</p>
            </div>
          )}

          {/* Desktop: scrollytelling */}
          <div className="hidden lg:flex max-w-[1400px] mx-auto relative">
            <div className="sticky top-0 self-start w-[55%] h-screen overflow-y-auto p-6 flex flex-col justify-center">
              <div className="text-xs font-mono mb-3" style={{ color: "var(--faint)" }}>
                {ch.title} <span style={{ color: "var(--accent)" }}>/ {ch.subtitle}</span>
              </div>
              <Terminal
                scripts={ch.scripts}
                activeStage={isDesktop ? chStages[chIdx] : ch.stages.length - 1}
              />
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

          {/* Mobile: linear */}
          <div className="lg:hidden max-w-2xl mx-auto px-4 py-8">
            <div className="text-xs font-mono mb-4" style={{ color: "var(--faint)" }}>
              {ch.title} <span style={{ color: "var(--accent)" }}>/ {ch.subtitle}</span>
            </div>
            {ch.stages.map((s, i) => (
              <div key={i} className="mb-12">
                <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--fg)" }}>{s.title}</h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>{s.body}</p>
                <Terminal scripts={[ch.scripts[i]]} activeStage={0} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Outro */}
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <p className="text-lg font-semibold mb-3" style={{ color: "var(--fg)" }}>
          That&apos;s Claude Code.
        </p>
        <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
          An AI that works on your projects, learns how you like to work,
          and gets better the more you use it.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="https://docs.anthropic.com/en/docs/claude-code/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg font-medium text-white"
            style={{ background: "var(--accent)" }}
          >
            Install Claude Code
          </a>
          <a
            href="https://docs.anthropic.com/en/docs/claude-code/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg font-medium"
            style={{ color: "var(--accent)", border: "1px solid var(--border-color)" }}
          >
            Read the docs
          </a>
        </div>
      </div>

      <footer className="px-4 py-8 text-center">
        <p className="text-xs" style={{ color: "var(--border-color)" }}>Built with Claude Code</p>
      </footer>
    </div>
  );
}
