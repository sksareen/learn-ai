"use client";

import Link from "next/link";
import { Callout } from "../components/Callout";

const EXPERIMENTS = [
  { id: "base", score: 0.757, pass: "80%", status: "keep" as const, desc: "Baseline — original teaching prompt" },
  { id: "exp1", score: 0.817, pass: "88%", status: "keep" as const, desc: "Explicit tool vs prompt distinction" },
  { id: "exp2", score: 0.781, pass: "84%", status: "discard" as const, desc: "Tighter pacing, combine steps" },
  { id: "exp3", score: 0.862, pass: "92%", status: "keep" as const, desc: "Faster opening + explain AI mechanism during failures" },
  { id: "exp4", score: 0.897, pass: "96%", status: "keep" as const, desc: "Concrete worked example in build step" },
  { id: "exp5", score: 0.753, pass: "80%", status: "discard" as const, desc: "Active recall — learner explains back" },
  { id: "exp6", score: 0.471, pass: "52%", status: "discard" as const, desc: "Prescriptive 4-step framework" },
  { id: "exp7", score: 0.836, pass: "88%", status: "discard" as const, desc: "Faster pacing + combine steps 6&7" },
  { id: "exp8", score: 0.710, pass: "76%", status: "discard" as const, desc: "Vivid autocomplete analogy" },
  { id: "exp9", score: 0.671, pass: "72%", status: "discard" as const, desc: "Remove constraints section" },
  { id: "exp4r", score: 0.595, pass: "64%", status: "variance" as const, desc: "Re-run of exp4 — confirmed ±0.15 variance" },
  { id: "exp11", score: 0.713, pass: "76%", status: "discard" as const, desc: "Debug-via-contrast + payoff-first" },
];

const STATUS_STYLES: Record<string, { bg: string; fg: string }> = {
  keep: { bg: "rgba(45,90,61,0.1)", fg: "#2d5a3d" },
  discard: { bg: "rgba(139,58,58,0.08)", fg: "#8b3a3a" },
  variance: { bg: "rgba(122,99,32,0.1)", fg: "#7a6320" },
};

export default function HowWeMadeThis() {
  const maxScore = 0.897;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <div className="max-w-2xl mx-auto px-5 pt-20 pb-6 text-center">
        <span
          className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ background: "rgba(59,130,246,0.1)", color: "var(--accent)" }}
        >
          Bonus
        </span>
        <h1
          className="text-2xl sm:text-3xl font-bold leading-tight mt-4 mb-3"
          style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}
        >
          How We Made This Course
        </h1>
        <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: "var(--muted)" }}>
          We didn&apos;t just write a course about AI. We used AI to research what actually works
          when teaching people AI — then built the course around those findings.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-5 pb-16">
        <div className="flex flex-col gap-8">

          {/* The idea */}
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--fg)" }}>The experiment</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              We built an AI tutor that teaches practical AI literacy, then gave a second AI (Claude Code)
              one job: make the tutor better. It could rewrite the teaching strategy, change the order,
              add or remove tools — anything. Then it tested the result against 5 simulated learners
              and kept what worked.
            </p>
          </div>

          {/* The loop diagram */}
          <div
            className="rounded-xl p-5 text-center"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
          >
            <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-medium">
              {["Rewrite tutor", "Test on 5 learners", "Grade 25 tasks", "Keep or discard"].map((step, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span
                    className="px-3 py-1.5 rounded-lg"
                    style={{ background: "var(--bg-surface)", color: "var(--fg)", border: "1px solid var(--border-color)" }}
                  >
                    {step}
                  </span>
                  {i < 3 && <span style={{ color: "var(--faint)" }}>&rarr;</span>}
                </span>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: "var(--faint)" }}>
              Each loop: ~20 minutes, ~$2, ~150 API calls. 13 runs total.
            </p>
          </div>

          {/* The learners */}
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--fg)" }}>The 5 test learners</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
              Each simulated learner had a real personality, real skepticism, and real resistance.
              If the tutor couldn&apos;t teach all five, the strategy wasn&apos;t universal.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Priya, 58", desc: "Mom — \"Google works fine\"" },
                { name: "Marcus, 34", desc: "Barber — \"No time for this\"" },
                { name: "Maya, 28", desc: "Illustrator — \"AI is generic\"" },
                { name: "Jake, 20", desc: "Student — \"I already use it\"" },
                { name: "Bob, 65", desc: "Retiree — \"Don't want to look foolish\"" },
              ].map((p, i) => (
                <div
                  key={i}
                  className="rounded-lg px-3 py-2 text-xs"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
                >
                  <span className="font-semibold" style={{ color: "var(--fg)" }}>{p.name}</span>
                  <span className="ml-1.5" style={{ color: "var(--muted)" }}>{p.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* The skills */}
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--fg)" }}>The 5 skills tested</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
              After each teaching session, every learner was tested on 5 skills.
              These became the 5 modules in Part 1 and Part 2 of this course.
            </p>
            <div className="flex flex-col gap-1.5">
              {[
                { skill: "Prompting", maps: "Module 1: Your First Useful Thing" },
                { skill: "Critical thinking", maps: "Module 2: When AI Lies" },
                { skill: "Debugging", maps: "Module 3: Fix It, Don't Restart" },
                { skill: "Persistence", maps: "Module 4: Make It Remember You" },
                { skill: "Building", maps: "Module 5: Build Your First Tool" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
                >
                  <span className="font-semibold shrink-0" style={{ color: "var(--fg)" }}>{s.skill}</span>
                  <span style={{ color: "var(--faint)" }}>&rarr;</span>
                  <span style={{ color: "var(--muted)" }}>{s.maps}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Results chart */}
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--fg)" }}>13 experiments, 3 improvements</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
              Most ideas made things worse. Only 3 out of 11 experiments actually improved the tutor.
            </p>
            <div
              className="rounded-xl p-4 overflow-hidden"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <div className="flex items-end gap-[3px] h-40">
                {EXPERIMENTS.map((exp) => {
                  const pct = (exp.score / maxScore) * 100;
                  const s = STATUS_STYLES[exp.status];
                  return (
                    <div key={exp.id} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                      <div
                        className="w-full rounded-t transition-opacity hover:opacity-80"
                        style={{ height: `${pct}%`, background: s.fg, opacity: exp.status === "discard" ? 0.3 : 0.8 }}
                      />
                      <div
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap px-2 py-1 rounded text-xs z-10"
                        style={{ background: "var(--fg)", color: "var(--bg)" }}
                      >
                        {exp.id}: {exp.score.toFixed(3)}
                      </div>
                      <span className="text-[9px] mt-1 hidden sm:block" style={{ color: "var(--faint)" }}>
                        {exp.id}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Experiment log */}
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--fg)" }}>Full experiment log</h2>
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid var(--border-color)" }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "var(--bg-surface)" }}>
                      {["#", "Score", "Pass", "Status", "What we tried"].map((h) => (
                        <th
                          key={h}
                          className="text-left px-3 py-2.5 font-semibold uppercase tracking-wider"
                          style={{ color: "var(--faint)", borderBottom: "1px solid var(--border-color)", fontSize: 10 }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {EXPERIMENTS.map((exp) => {
                      const s = STATUS_STYLES[exp.status];
                      return (
                        <tr key={exp.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                          <td className="px-3 py-2 font-mono" style={{ color: "var(--fg)" }}>{exp.id}</td>
                          <td className="px-3 py-2 font-mono" style={{ color: "var(--fg)" }}>{exp.score.toFixed(3)}</td>
                          <td className="px-3 py-2 font-mono" style={{ color: "var(--muted)" }}>{exp.pass}</td>
                          <td className="px-3 py-2">
                            <span
                              className="px-2 py-0.5 rounded-full font-semibold"
                              style={{ background: s.bg, color: s.fg, fontSize: 10 }}
                            >
                              {exp.status}
                            </span>
                          </td>
                          <td className="px-3 py-2" style={{ color: "var(--muted)" }}>{exp.desc}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Key findings */}
          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--fg)" }}>What we learned</h2>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: "Concreteness wins",
                  body: "Every kept improvement added specificity. \"Build a tool\" failed. \"Every week you [X], let's build...\" worked. Abstract frameworks always regressed.",
                },
                {
                  title: "Constraints are load-bearing",
                  body: "Removing the \"under 150 words\" and \"never skip the why\" rules cratered the score to 0.671. Constraints aren't decoration — they shape behavior.",
                },
                {
                  title: "Verbosity always hurts",
                  body: "Every experiment that made the prompt longer scored worse. Analogies, frameworks, active recall — all added words, all regressed.",
                },
                {
                  title: "Don't rush the build step",
                  body: "Three experiments tried compressing the \"build a tool\" step. All failed. This is why Module 5 has three full examples before asking you to build.",
                },
                {
                  title: "Building is the hardest skill",
                  body: "Learners consistently confused \"a good prompt\" with \"a tool.\" The input→output framing in Module 5 came directly from the experiment that scored 0.897.",
                },
                {
                  title: "Variance dominates signal",
                  body: "The same prompt scored 0.897 and 0.595 on consecutive runs. Most of our \"failures\" may have been noise. Reliable testing needs 3+ runs per variant.",
                },
              ].map((finding, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
                >
                  <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--fg)" }}>{finding.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{finding.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How findings shaped the course */}
          <Callout type="insight">
            <strong>How this shaped the course:</strong> Every module follows the same structure the winning
            prompt used — start with a real person&apos;s problem, show the solution, explain why it
            works, show where it breaks, let them practice. The order is non-negotiable: the research
            showed reordering always made things worse.
          </Callout>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-px rounded-xl overflow-hidden"
            style={{ background: "var(--border-color)", border: "1px solid var(--border-color)" }}
          >
            {[
              { val: "13", label: "Runs" },
              { val: "~$27", label: "Total cost" },
              { val: "0.897", label: "Peak score" },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-4" style={{ background: "var(--bg-card)" }}>
                <div className="text-xl font-bold" style={{ color: "var(--fg)" }}>{stat.val}</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: "var(--faint)" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="rounded-xl p-6 text-center"
            style={{ background: "var(--fg)", color: "var(--bg)" }}
          >
            <h2 className="text-lg font-bold mb-2">Ready to learn?</h2>
            <p className="text-sm opacity-75 mb-4 max-w-md mx-auto">
              This course was built on evidence, not opinion. Start with Module 1.
            </p>
            <Link
              href="/first-useful-thing"
              className="inline-block px-5 py-2.5 rounded-lg text-sm font-medium"
              style={{ background: "var(--accent)", color: "white" }}
            >
              Start the course &rarr;
            </Link>
          </div>

        </div>
      </div>

      <footer className="px-4 py-8 text-center">
        <p className="text-xs" style={{ color: "var(--faint)" }}>learn.justbuildapps.com</p>
      </footer>
    </div>
  );
}
