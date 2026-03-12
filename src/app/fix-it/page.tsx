"use client";

import { ModuleLayout } from "../components/ModuleLayout";
import { ChatDemo } from "../components/ChatDemo";
import { Callout } from "../components/Callout";
import { Exercise } from "../components/Exercise";

export default function FixIt() {
  return (
    <ModuleLayout
      moduleNumber={3}
      title="Fix It, Don't Restart"
      partLabel="Part 1"
      partTitle="Use It"
      prevHref="/ai-lies"
      nextHref="/remember-you"
      nextLabel="Make AI remember you"
    >
      {/* Scene */}
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Marcus runs a barbershop. He asked AI for social media posts. Here&apos;s what he got:
      </p>

      <ChatDemo
        tag="generic"
        tagColor="red"
        messages={[
          { role: "user", text: "Write me social media posts" },
          {
            role: "ai",
            text: "Looking for a fresh new look? Visit our barbershop today! We offer quality haircuts at affordable prices. Book now! #barber #haircut #freshcut",
          },
        ]}
      />

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Corporate garbage. Could be any barbershop on earth. Marcus&apos;s instinct? Scrap it and start over
        with a completely different prompt.
      </p>

      {/* The wrong instinct */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        The wrong instinct
      </h2>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        That&apos;s like throwing away a cake because it&apos;s undercooked and starting a new recipe.
        You don&apos;t need a new recipe. You need to figure out what went wrong with this one.
      </p>

      {/* The diagnosis */}
      <Callout type="key">
        <strong>Ask yourself:</strong> What did AI NOT know that it needed to?
        In Marcus&apos;s case: no personality, no location, no signature style, no voice.
        AI filled the blanks with the most generic barbershop on earth.
      </Callout>

      {/* The fix */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        The fix
      </h2>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Marcus doesn&apos;t rewrite from scratch. He adds what was missing:
      </p>

      <ChatDemo
        tag="sounds like you"
        tagColor="green"
        messages={[
          {
            role: "user",
            text: "Write 3 Instagram posts for my barbershop. I'm Marcus, 2-chair shop in Philly. Known for fades and talking Eagles football while I cut. Tone: neighborhood guy, not corporate. How I'd actually talk.",
          },
          {
            role: "ai",
            text: "Post 1: 'Sunday fade before Sunday game. You already know the vibes at the chair. Who we got this week? 🦅'\n\nPost 2: 'My man came in looking like he gave up. Left looking like he got the job. That's what the right fade does.'\n\nPost 3: 'If your barber don't know your opinion on Hurts before you sit down, you at the wrong shop.'",
          },
        ]}
      />

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Same tool. Same question. Completely different result — because Marcus told AI who he actually is.
      </p>

      {/* Second example */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        Same pattern, different person
      </h2>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Maya is an illustrator. She asked AI for an About Me:
      </p>

      <ChatDemo
        tag="soulless"
        tagColor="red"
        messages={[
          { role: "user", text: "Write an About Me for my website" },
          {
            role: "ai",
            text: "Maya is a talented creative professional with a passion for design and illustration. With years of experience bringing ideas to life, she combines artistic vision with strategic thinking to create compelling visual narratives.",
          },
        ]}
      />

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        LinkedIn-speak. No voice, no style, no personality. AI defaulted to the most generic creative bio possible.
      </p>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Maya diagnoses it: AI didn&apos;t know her style, her tone, or what she hates.
        She adds what&apos;s missing:
      </p>

      <ChatDemo
        tag="actually her"
        tagColor="green"
        messages={[
          {
            role: "user",
            text: "Write an About Me for my illustration portfolio. My style is moody watercolors with nature themes. Tone: slightly poetic, lowercase, no exclamation marks. I hate corporate bios that say 'passionate creative professional.'",
          },
          {
            role: "ai",
            text: "maya draws the quiet parts of the natural world — fog settling over ridgelines, the hour before a storm, light filtering through canopy. her work lives in watercolor, always a little moody, always rooted in place. she believes illustration should feel like a held breath, not a sales pitch.",
          },
        ]}
      />

      {/* The debugging framework */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        The debugging framework
      </h2>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Every time AI gives you bad output, ask three questions:
      </p>

      <Callout type="insight">
        <strong>1. What did AI not know?</strong> (missing context)<br />
        <strong>2. What did AI assume wrong?</strong> (wrong framing)<br />
        <strong>3. What format did I actually need?</strong> (unclear output spec)<br /><br />
        Then add what&apos;s missing. Don&apos;t rewrite from scratch.
      </Callout>

      {/* Exercise */}
      <Exercise
        title="Diagnose this"
        description="You asked AI 'Help me organize college application deadlines' and got generic tips: 'Create a spreadsheet. Set reminders. Start early. Don't procrastinate.' But you already HAVE a spreadsheet — you needed AI to look at YOUR data and tell you what's missing. Write what went wrong and how you'd fix the prompt."
        placeholder="Example: The problem was... AI didn't know I already had a spreadsheet with 8 schools and their deadlines. I'd fix it by saying: 'Here are my 8 college applications with deadlines [paste data]. What am I missing? Which ones need recommendation letters I haven't requested yet?'"
        hint="Think about what AI assumed vs. what you actually needed. The gap between those two things is your fix."
      />

      {/* What you learned */}
      <div
        className="rounded-xl p-5 text-center"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--faint)" }}>
          What you learned
        </p>
        <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>
          Don&apos;t restart — diagnose. Ask &quot;what didn&apos;t AI know?&quot; and add it.<br />
          The debugging skill is more valuable than the prompting skill.
        </p>
      </div>
    </ModuleLayout>
  );
}
