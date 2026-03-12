"use client";

import { ModuleLayout } from "../components/ModuleLayout";
import { ChatDemo } from "../components/ChatDemo";
import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";
import { Exercise } from "../components/Exercise";

export default function BuildATool() {
  return (
    <ModuleLayout
      moduleNumber={5}
      title="Build Your First Tool"
      partLabel="Part 2"
      partTitle="Own It"
      prevHref="/remember-you"
      nextHref=""
      nextLabel=""
    >
      {/* Scene */}
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        A good prompt solves a problem once. A <strong style={{ color: "var(--fg)" }}>tool</strong> solves
        it forever.
      </p>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        The difference is simple: a tool takes an <strong style={{ color: "var(--fg)" }}>input</strong> and
        produces an <strong style={{ color: "var(--fg)" }}>output</strong>, and you use it repeatedly for
        a recurring task. You write it once, then reach for it every time that task comes up.
      </p>

      {/* Key distinction */}
      <Callout type="key">
        <strong>A good prompt:</strong> &quot;Help me plan meals for the week&quot; — one-time ask, one-time result.<br /><br />
        <strong>A tool:</strong> A system that takes &quot;what&apos;s in my fridge&quot; as input and outputs
        &quot;3 meals + shopping list for what&apos;s missing.&quot; You use it every Sunday. It works every time.
      </Callout>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Let&apos;s look at three real examples before you build your own.
      </p>

      {/* Example 1 — Maya's Commission Intake */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        Maya&apos;s commission intake
      </h2>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Maya is an illustrator who takes commissions. Every time a new client messages her, the same
        thing happens: 5-10 back-and-forth DMs asking about size, style, budget, deadline, reference
        images. It&apos;s exhausting and it&apos;s the same conversation every time.
      </p>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        She doesn&apos;t need a good prompt. She needs a system that takes a messy client message and
        spits out a clean brief she can act on.
      </p>

      <CodeBlock title="Maya's Commission Intake Tool">
        {`You are an intake assistant for Maya's illustration commissions.

When given a client message about a commission, extract:
- Size (print size or digital dimensions)
- Style (watercolor, ink, digital — reference Maya's portfolio)
- Budget (if mentioned; note "not discussed" if not)
- Deadline (flag if under 2 weeks — rush fees apply)
- Reference images (note if provided)
- Subject/concept (what they want drawn)

Output: A clean brief Maya can read in 10 seconds.
Flag anything missing so she can follow up in ONE message.
Flag if budget seems too low for the scope.`}
      </CodeBlock>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Now watch what happens when a client message goes through the tool:
      </p>

      <ChatDemo
        tag="tool in action"
        tagColor="green"
        messages={[
          {
            role: "user",
            text: "hey maya!! love your work 😍 i want a watercolor piece of my dog for my mom's birthday, probably like 8x10? she loves autumn vibes. budget is flexible but hoping under $200? need it by march 20",
          },
          {
            role: "ai",
            text: "📋 Commission Brief\n\nClient: New inquiry\nSubject: Portrait of client's dog, autumn theme\nStyle: Watercolor (client's preference aligns with portfolio)\nSize: 8×10\"\nBudget: Under $200\nDeadline: March 20\nReferences: None provided\n\n⚠️ Missing: Dog photo/reference needed\n⚠️ Budget note: $200 for custom 8×10 watercolor is within range but tight — consider if complexity warrants discussion\n\n→ Suggested follow-up: 'Thanks! Can you send a photo of your dog and 1-2 reference images of the autumn vibe you're going for?'",
          },
        ]}
      />

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        One messy DM → clean brief in 10 seconds. Maya uses this for every single client now. That&apos;s
        a tool, not a prompt.
      </p>

      {/* Example 2 — Priya's Recipe to Shopping List */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        Priya&apos;s recipe converter
      </h2>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Priya finds recipes on Instagram and food blogs, then manually writes ingredients on a
        notepad. Half the time she forgets something and has to go back to the store. The input is
        always the same (a recipe), the output is always the same (a shopping list). Perfect
        candidate for a tool.
      </p>

      <CodeBlock title="Recipe to Shopping List">
        {`Take a recipe (pasted text or description) and produce:
1. Clean ingredient list with quantities
2. Grouped by grocery store section (Produce, Dairy, Pantry, Meat, Frozen)
3. Adjusted for a family of 4
4. Flag anything I might already have (basics like salt, oil, butter)

Keep it scannable — I'm reading this in the store on my phone.`}
      </CodeBlock>

      {/* Example 3 — Jake's Reading Summarizer */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        Jake&apos;s reading summarizer
      </h2>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Five classes, never enough time for all the readings. Same problem every week.
      </p>

      <CodeBlock title="Reading Summarizer">
        {`Take an article or PDF text and give me:
1. 5-minute summary (what's the argument, what evidence, what conclusion)
2. 3 questions I should be able to answer after reading
3. One thing that would be smart to bring up in class discussion

Write for a business major, not an academic.`}
      </CodeBlock>

      {/* The pattern */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        The pattern
      </h2>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Notice what all three tools have in common:
      </p>

      <Callout type="insight">
        Every tool follows the same structure:<br /><br />
        <strong>1.</strong> Pick a task you do repeatedly that&apos;s annoying<br />
        <strong>2.</strong> Define what goes IN (what you&apos;d paste)<br />
        <strong>3.</strong> Define what comes OUT (what you need)<br />
        <strong>4.</strong> Write instructions that bridge the two<br />
        <strong>5.</strong> Save it as a system prompt. Use it every time.
      </Callout>

      {/* Exercise */}
      <Exercise
        title="Design your tool"
        description="Think of something you do every week that&apos;s repetitive and annoying. Design a tool for it."
        placeholder={"My recurring task: ...\n\nWhat I'd paste in (the input): ...\n\nWhat I need back (the output): ...\n\nSpecial rules or formatting: ..."}
        hint="Once you have this, paste it into any AI chat as a system prompt. You just built your first AI tool. The key test: would you use this again next week?"
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
          A tool is not a good prompt. It&apos;s a system — input in, output out — that you use
          over and over.<br />
          Recurring task + defined input + defined output = reusable tool.
        </p>
      </div>
    </ModuleLayout>
  );
}
