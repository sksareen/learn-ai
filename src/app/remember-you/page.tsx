"use client";

import { ModuleLayout } from "../components/ModuleLayout";
import { ChatDemo } from "../components/ChatDemo";
import { Comparison } from "../components/Comparison";
import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { Exercise } from "../components/Exercise";

export default function RememberYou() {
  return (
    <ModuleLayout
      moduleNumber={4}
      title="Make It Remember You"
      partLabel="Part 2"
      partTitle="Own It"
      prevHref="/fix-it"
      nextHref="/build-a-tool"
      nextLabel="Build your first tool"
    >
      {/* Scene */}
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Bob is a retired accountant. Forty years at a mid-size firm in Ohio. He uses AI
        to draft emails — to former colleagues, his financial advisor, his grandson&apos;s
        school counselor. Every single time, the AI writes in the wrong tone. Too casual
        or too corporate. Bob&apos;s style is warm but precise. And every session, he
        explains himself all over again.
      </p>

      {/* The problem */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        The problem
      </h2>

      <ChatDemo
        tag="every single time"
        tagColor="red"
        messages={[
          {
            role: "user",
            text: "Draft an email to the school counselor about Tommy's college application to Ohio State.",
          },
          {
            role: "ai",
            text: "Dear [Name],\n\nI hope this email finds you well! I am writing to follow up on the status of Tommy's college application to Ohio State University. As the application deadline approaches, I wanted to ensure that all necessary materials have been submitted in a timely manner.\n\nPlease do not hesitate to reach out if there is anything further I can provide to support this process.\n\nWarm regards!",
          },
        ]}
      />

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Bob would never write &quot;I hope this email finds you well.&quot; He&apos;d never
        end with &quot;Warm regards!&quot; But every new conversation, the AI has no idea
        who he is. So it defaults to generic corporate filler.
      </p>

      {/* The fix */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        The fix — system prompts
      </h2>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        A system prompt (or &quot;custom instructions&quot;) is background info the AI reads
        before every conversation. You write it once, and the AI knows your context from
        that point forward. No more re-explaining yourself every session.
      </p>

      {/* Show a real system prompt */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        A real system prompt
      </h2>

      <CodeBlock title="Bob's system prompt">{`# Who I am
Retired accountant, 40 years at a mid-size firm in Ohio.
Methodical and precise. I don't do fluff.

# How I write
Warm but direct. Short paragraphs. No exclamation marks.
I sign emails with just my name, no "Best regards."

# What I'm working on
Helping my grandson Tommy with college applications (12 schools).
Managing my investment portfolio in a spreadsheet.

# What I need from AI
Don't dumb things down — I understand numbers and logic.
Don't be overly cheerful. Match my tone.
When I ask about finances, precision not platitudes.`}</CodeBlock>

      {/* The difference */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        The difference
      </h2>

      <Comparison
        bad={{
          label: "Without system prompt",
          content:
            "Dear [Name], I hope this email finds you well! I am writing to follow up on the status of the college application process. Please let me know if there is anything I can do to assist. Warm regards!",
        }}
        good={{
          label: "With Bob's system prompt",
          content:
            "Hi Sandra — Wanted to check in on Tommy's application status for Ohio State. The priority deadline is January 15 and we're still missing his counselor recommendation. Can you confirm it's been sent?\n\nBob",
        }}
      />

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Same request. Same AI. The only difference is that the second version knows who
        Bob is.
      </p>

      {/* More examples */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        It works for anyone
      </h2>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        System prompts aren&apos;t just for retirees writing emails. Anyone who uses AI
        regularly should have one.
      </p>

      <CodeBlock title="Maya — Freelance illustrator">{`# Who I am
Freelance illustrator. Moody watercolors, nature themes.
Based in Portland. Sell prints and do editorial commissions.

# How I communicate
Lowercase. Short sentences. No exclamation marks ever.
I hate generic influencer-speak — no "amazing," "stunning," or "game-changer."

# What I need from AI
Help with client emails, invoice wording, and Instagram captions.
Match my voice: understated, a little dry, never salesy.`}</CodeBlock>

      <CodeBlock title="Marcus — Barbershop owner">{`# Who I am
Own a 2-chair barbershop in West Philly. Known for fades.
Been here 11 years. Eagles fan. Neighborhood spot.

# How I communicate
Direct, friendly, no corporate speak. I text clients personally.
Keep it conversational — like I'm talking to someone in the chair.

# What I need from AI
Help writing appointment reminders, social posts, and supply orders.
Don't make it sound like a chain. We're a local shop. Keep it real.`}</CodeBlock>

      {/* Insight callout */}
      <Callout type="insight">
        System prompts are like onboarding documents. You&apos;re training a new
        teammate once instead of re-explaining yourself every morning.
      </Callout>

      {/* Where to put it */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        Where to put it
      </h2>

      <div className="flex flex-col gap-3">
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            ChatGPT
          </span>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Settings → Personalization → Custom Instructions
          </p>
        </div>
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            Claude
          </span>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Project settings → Instructions, or start your first message with context
          </p>
        </div>
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            Any AI
          </span>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Paste it at the start of your first message in any conversation
          </p>
        </div>
      </div>

      {/* Exercise */}
      <Exercise
        title="Write your system prompt"
        description="Write a system prompt that describes you. Include who you are, how you communicate, what you're working on, and what you need from AI."
        placeholder={"# Who I am\n\n# How I communicate\n\n# What I'm working on\n\n# What I need from AI"}
        hint="Paste this into ChatGPT's Custom Instructions or Claude's Project Instructions to use it for real."
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
          Write your context once, use it forever.<br />
          System prompts turn every AI conversation from a first date into a working relationship.
        </p>
      </div>
    </ModuleLayout>
  );
}
