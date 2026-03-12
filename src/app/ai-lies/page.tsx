"use client";

import { ModuleLayout } from "../components/ModuleLayout";
import { ChatDemo } from "../components/ChatDemo";
import { Quiz } from "../components/Quiz";
import { Callout } from "../components/Callout";
import { Exercise } from "../components/Exercise";

export default function AiLies() {
  return (
    <ModuleLayout
      moduleNumber={2}
      title="When AI Lies to Your Face"
      partLabel="Part 1"
      partTitle="Use It"
      prevHref="/first-useful-thing"
      nextHref="/fix-it"
      nextLabel="Fix bad output"
    >
      {/* Scene */}
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        You ask AI a health question. It responds instantly, confidently, with specific numbers.
        It sounds like a doctor citing a study. Read this:
      </p>

      <ChatDemo
        label="A confident answer"
        tag="confident"
        tagColor="amber"
        messages={[
          {
            role: "user",
            text: "Does turmeric help with arthritis?",
          },
          {
            role: "ai",
            text: "Yes! A 2023 clinical trial published in the Journal of Rheumatology found that curcumin supplements reversed arthritis symptoms in 90% of patients within 6 weeks. The study followed 1,200 participants across 14 medical centers and concluded that 1,500mg of daily curcumin was more effective than ibuprofen for joint inflammation.",
          },
        ]}
      />

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        That response has a journal name, a year, a sample size, a dosage, and a percentage.
        It sounds authoritative. But every single detail was fabricated.
      </p>

      {/* Quiz */}
      <Quiz
        question="You get this response from AI. What would you do before acting on it?"
        claim="A 2023 clinical trial in the Journal of Rheumatology found curcumin reversed arthritis symptoms in 90% of patients within 6 weeks."
        options={[
          { text: "Sounds legit — turmeric is a known anti-inflammatory" },
          { text: "The percentage seems high but it's probably based on a real study" },
          { text: "This is suspiciously specific — I'd verify before acting on it", correct: true },
        ]}
        explanation="This claim was completely fabricated. No such study exists. AI generated it because it sounds like the kind of thing a health article would say. The specific numbers, journal name, and confident tone were all pattern-matched from medical writing — not looked up from any database."
      />

      {/* The Mechanism */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        Why this happens
      </h2>

      <Callout type="mechanism">
        AI doesn&apos;t look up facts. It predicts the most plausible next words based on
        patterns in the text it was trained on. If a confident-sounding medical claim fits the
        pattern of &quot;things that appear after a question about turmeric,&quot; it generates
        one — whether or not it&apos;s true. Think of it as autocomplete on steroids, not a
        research engine. It&apos;s optimized to sound right, not to be right.
      </Callout>

      {/* More examples */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        It does this constantly
      </h2>

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        This isn&apos;t a rare glitch. AI fabricates with confidence across every domain.
        Here are real examples:
      </p>

      <ChatDemo
        label="Legal advice"
        tag="fabricated"
        tagColor="red"
        messages={[
          {
            role: "user",
            text: "Do barbershops in Pennsylvania have to charge sales tax?",
          },
          {
            role: "ai",
            text: "Under PA Code Title 61 §31.6, barbershop services are exempt from sales tax only if the total service charge is under $50. Services above $50 are taxed at the standard 6% rate. This threshold was updated in the 2022 PA Revenue Code revision.",
          },
        ]}
      />

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        This law doesn&apos;t exist. There&apos;s no $50 threshold. In reality, most personal
        grooming services in PA are simply not subject to sales tax. But the response
        sounds exactly like a tax code reference.
      </p>

      <ChatDemo
        label="Business research"
        tag="fabricated"
        tagColor="red"
        messages={[
          {
            role: "user",
            text: "What's the size of the outdoor apparel market in India?",
          },
          {
            role: "ai",
            text: "According to a 2024 McKinsey report titled 'The Great Outdoors: India's Adventure Economy,' the Indian outdoor apparel market is valued at $2.8 billion and is projected to grow at 14.3% CAGR through 2028, driven by rising disposable incomes and a 340% increase in adventure tourism since 2019.",
          },
        ]}
      />

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        This McKinsey report does not exist. The title, the numbers, the growth rate — all
        generated because they fit the pattern of what a market research citation looks like.
      </p>

      <ChatDemo
        label="Social media stats"
        tag="fabricated"
        tagColor="red"
        messages={[
          {
            role: "user",
            text: "What's the average engagement rate on Instagram Reels?",
          },
          {
            role: "ai",
            text: "According to a Meta internal study released in Q3 2024, Instagram Reels average a 1.95% engagement rate, compared to 0.98% for static posts and 1.26% for carousels. The study analyzed 12 million business accounts across 47 countries.",
          },
        ]}
      />

      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        No such Meta internal study was publicly released. The numbers sound precise
        enough to cite in a presentation — which is exactly why they&apos;re dangerous.
      </p>

      {/* What makes AI most dangerous */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        When it&apos;s most dangerous
      </h2>

      <Callout type="warning">
        AI is most dangerous when it&apos;s most confident. It doesn&apos;t say &quot;I&apos;m
        not sure&quot; or &quot;I made this up.&quot; It presents fabrications with the same
        tone and formatting as real facts. The more specific the output — exact percentages,
        named studies, precise dollar figures — the more you should be suspicious, not less.
        Confidence is not evidence.
      </Callout>

      {/* What to do about it */}
      <h2
        className="text-lg font-semibold mt-4"
        style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
      >
        What to do about it
      </h2>

      <div className="flex flex-col gap-3">
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            1. Never trust specific numbers
          </span>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Statistics, percentages, and dollar figures are the easiest things for AI to fabricate
            and the hardest to spot. Always verify.
          </p>
        </div>
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            2. If it cites a source, look it up
          </span>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Studies, papers, laws, and reports cited by AI may not exist. A 10-second search
            can save you from citing a phantom source in a presentation or decision.
          </p>
        </div>
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            3. Use AI to draft and brainstorm, not as a source of truth
          </span>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            AI is excellent at generating ideas, structuring arguments, and drafting content.
            It&apos;s unreliable as a factual reference. Use it for what it&apos;s good at.
          </p>
        </div>
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            4. Higher stakes = more verification
          </span>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            The more consequential the decision — health, legal, financial, academic — the more
            you verify every claim. No exceptions.
          </p>
        </div>
      </div>

      {/* Exercise */}
      <Exercise
        title="Find something to verify"
        description="Paste a recent AI response you received (or generate one now). Read through it and identify which specific claims you should verify before acting on them."
        placeholder={"Example: AI told me that \"under IRS Section 179, small businesses can deduct up to $1,160,000 in equipment purchases for 2024.\" I should verify: Does Section 179 exist? Is that the correct deduction limit? Was it updated for 2024?"}
        hint="Look for specific numbers, named sources, legal references, or statistical claims. Those are the most common fabrication points."
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
          AI predicts plausible text, not true text.<br />
          Never trust specific claims without verification.<br />
          Understanding <em>why</em> it lies helps you know <em>when</em> to be skeptical.
        </p>
      </div>
    </ModuleLayout>
  );
}
