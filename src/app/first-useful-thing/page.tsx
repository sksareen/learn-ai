"use client";

import { ModuleLayout } from "../components/ModuleLayout";
import { ChatDemo } from "../components/ChatDemo";
import { Comparison } from "../components/Comparison";
import { Callout } from "../components/Callout";
import { Exercise } from "../components/Exercise";

export default function FirstUsefulThing() {
  return (
    <ModuleLayout
      moduleNumber={1}
      title="Your First Useful Thing"
      partLabel="Part 1"
      partTitle="Use It"
      nextHref="/ai-lies"
      nextLabel="When AI lies"
    >
      {/* Scene */}
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Priya is planning a family reunion. 14 people, 3 days, 4 dietary restrictions, a 4-bedroom house,
        and ages ranging from 6 to 78. She opens AI and types what most people type:
      </p>

      {/* Bad prompt */}
      <ChatDemo
        label="What most people do"
        tag="generic"
        tagColor="red"
        messages={[
          { role: "user", text: "Plan a family dinner" },
          {
            role: "ai",
            text: "Here are some popular dinner ideas:\n\n1. Pasta Night — Everyone loves pasta!\n2. Taco Tuesday — Fun and customizable!\n3. BBQ — Great for families!\n4. Pizza Party — A crowd pleaser!\n5. Soup and Salad — Light and healthy!\n\nWould you like me to elaborate on any of these? 😊",
          },
        ]}
      />

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Useless. This could be for anyone on earth. Priya closes the tab and thinks AI is overhyped.
      </p>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        But the problem isn&apos;t AI. It&apos;s that she gave it nothing to work with.
        AI doesn&apos;t know her life until she tells it. Watch what happens when she does:
      </p>

      {/* Good prompt */}
      <ChatDemo
        label="What actually works"
        tag="actionable"
        tagColor="green"
        messages={[
          {
            role: "user",
            text: "I'm hosting 14 family members for 3 days at my house. One person is celiac, one is vegan, two have nut allergies. I have a 4-bedroom house and need sleeping arrangements. Ages range from 6 to 78. Plan meals for all 3 days and suggest activities everyone can do. I shop at Costco.",
          },
          {
            role: "ai",
            text: "Night 1: Mexican Bowls (naturally gluten-free, easily veganized)\n• Base: Costco cilantro lime rice + black beans\n• Protein: Kirkland rotisserie chicken (separate vegan bowl with seasoned sweet potato)\n• Safe toppings: avocado, salsa, corn, peppers\n• ⚠️ Skip sour cream on vegan bowl, check salsa label for hidden nuts\n\nNight 2: Sheet Pan Mediterranean\n• Chicken thighs + roasted vegetables (safe for all)\n• GF pasta side from Costco's Barilla GF line\n• Separate hummus plate for vegan\n\n[continues with Night 3, sleeping arrangements by mobility/age, and activities sorted by weather...]",
          },
        ]}
      />

      <Callout type="insight">
        <strong>The rule:</strong> The more specific you are about your actual situation, the more useful the
        output. Think of it as briefing a smart stranger who knows nothing about you. Details
        aren&apos;t optional — they&apos;re the whole game.
      </Callout>

      {/* The pattern */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        The pattern
      </h2>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Look at the difference between the two prompts. The good one has three things the bad one doesn&apos;t:
      </p>

      <div className="flex flex-col gap-3">
        <div className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            1. Your specific situation
          </span>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            14 people, 3 days, 4 bedrooms. Not &quot;a family dinner&quot; — <em>her</em> family dinner.
          </p>
        </div>
        <div className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            2. Your real constraints
          </span>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Celiac, vegan, nut allergies, ages 6-78, Costco shopper. Every constraint makes the output more useful.
          </p>
        </div>
        <div className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            3. What you&apos;ll do with the answer
          </span>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Plan meals, arrange sleeping, choose activities. Telling AI what you need the output <em>for</em> shapes the format.
          </p>
        </div>
      </div>

      {/* More examples */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        This works for everything
      </h2>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Same pattern, totally different lives:
      </p>

      <Comparison
        bad={{ label: "Vague", content: "\"Write me social media posts for my barbershop\"" }}
        good={{
          label: "Specific",
          content:
            "\"Write 3 Instagram posts for my barbershop. I'm Marcus, I run a 2-chair shop in Philly. Known for fades and Eagles football takes. Tone: neighborhood guy, not corporate.\"",
        }}
      />

      <Comparison
        bad={{ label: "Vague", content: "\"Help me with my college project\"" }}
        good={{
          label: "Specific",
          content:
            "\"I'm doing competitive analysis for a group project on Patagonia entering India. I need to find who they'd compete with in the Indian outdoor market and why. Don't write my section — help me think through the analysis.\"",
        }}
      />

      <Comparison
        bad={{ label: "Vague", content: "\"Write an About Me for my website\"" }}
        good={{
          label: "Specific",
          content:
            "\"Write an About Me for my illustration portfolio. My style is moody watercolors with nature themes. I want the tone slightly poetic, lowercase, no exclamation marks. I hate corporate bios that say 'passionate creative professional.'\"",
        }}
      />

      {/* Exercise */}
      <Exercise
        title="Your turn"
        description="Think of a real problem in your life right now. Write a prompt that includes your specific situation, your real constraints, and what you'd do with the answer."
        placeholder={"Example: I need to write a thank-you email to my kid's teacher. She helped him through a rough patch with math anxiety in 4th grade. I want it to feel genuinely grateful, not over-the-top. 3-4 sentences max — she's busy."}
        hint="There's no submit button — this is for you to practice. A good prompt has real details from YOUR life, not placeholders."
      />

      {/* What you built */}
      <div
        className="rounded-xl p-5 text-center"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--faint)" }}>
          What you learned
        </p>
        <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>
          AI is only as useful as the details you give it.<br />
          Specific situation + real constraints + clear purpose = useful output.
        </p>
      </div>
    </ModuleLayout>
  );
}
