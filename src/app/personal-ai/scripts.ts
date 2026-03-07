import type { ChatStageScript } from "./ChatSimulator";

// ── Chapter 1: The Stranger ──

export const CH1_SCRIPTS: ChatStageScript[] = [
  // Generic greeting
  {
    messages: [
      { type: "user", text: "hey" },
      { type: "ai", text: "Hello! How can I help you today?" },
      { type: "user", text: "I want to get better at writing. any tips?" },
      { type: "ai", text: "Here are some general writing tips:\n\n1. Read more\n2. Write every day\n3. Get feedback\n4. Edit ruthlessly\n5. Find your voice" },
    ],
  },
  // Generic, unhelpful
  {
    messages: [
      { type: "user", text: "that's kind of generic. can you be more specific?" },
      { type: "ai", text: "Of course! What kind of writing are you working on? Fiction, non-fiction, business writing, academic...?" },
      { type: "user", text: "I mean I already told you last week that I'm writing a children's book" },
      { type: "ai", text: "I apologize, but I don't have access to previous conversations. Could you tell me more about your children's book project?" },
    ],
  },
  // The problem
  {
    messages: [
      { type: "user", text: "ugh fine. it's about a fox who learns to share. it's for ages 4-7. I've written 3 chapters." },
      { type: "ai", text: "That sounds lovely! Here are some tips for writing children's books..." },
      { type: "system", text: "Every conversation starts from scratch. It doesn't know you, your project, or what you've already discussed." },
    ],
  },
];

// ── Chapter 2: Tell It About You ──

export const CH2_SCRIPTS: ChatStageScript[] = [
  // Introduce yourself
  {
    messages: [
      { type: "user", text: "hey, before we start — let me tell you about me" },
      { type: "user", text: "I'm Sarah. I'm a freelance illustrator, and I'm writing my first children's book about a fox named Maple who learns to share. it's for ages 4-7. I've written 3 chapters so far." },
      { type: "ai", text: "Nice to meet you, Sarah! That's a great premise — Maple the fox learning to share is a perfect theme for that age group. Since you've got 3 chapters done, you're well into it. What would you like to work on today?" },
    ],
  },
  // Add more context
  {
    messages: [
      { type: "user", text: "also, I struggle with dialogue. my characters all sound the same. and I tend to over-explain things instead of showing through the story." },
      { type: "ai", text: "That's really self-aware — most writers don't spot those patterns in themselves. For a 4-7 audience, dialogue should be short and punchy, and each character needs a verbal quirk. And showing > telling is especially important in picture books where the illustrations carry half the story. Want me to look at a chapter with those two things in mind?" },
      { type: "user", text: "yeah that's exactly the kind of help I want" },
    ],
  },
  // The shift
  {
    messages: [
      { type: "user", text: "remember all of that for next time, ok?" },
      { type: "ai", text: "Saved! Next time we talk, I'll know you're Sarah, you're working on Maple's story, and that we're focusing on dialogue variety and show-don't-tell. You won't have to explain any of that again." },
    ],
  },
];

// ── Chapter 3: Give It Identity ──

export const CH3_SCRIPTS: ChatStageScript[] = [
  // Set personality
  {
    messages: [
      { type: "user", text: "I want you to be different from the default AI thing. can I give you a personality?" },
      { type: "ai", text: "Absolutely. Tell me how you'd like me to be." },
      { type: "user", text: "ok here's what I want: your name is Sage. be warm but honest — if my writing isn't working, tell me straight. don't give me lists of 10 things, just focus on the one thing that matters most. and talk to me like a friend, not a teacher." },
    ],
  },
  // Sage responds
  {
    messages: [
      { type: "system", text: "✦ Sage is now configured" },
      { type: "ai", text: "Hey Sarah. I'm Sage. I'll be straight with you when something's not working, and I'll keep it focused — no laundry lists. Let's make Maple's story great. What are we working on today?" },
    ],
  },
  // The difference
  {
    messages: [
      { type: "user", text: "chapter 2 feels flat. here it is:" },
      { type: "user", text: "\"Maple walked to the pond. She saw her friend Birch. 'Do you want to play?' asked Maple. 'Yes,' said Birch. They played together.\"" },
      { type: "ai", text: "The one thing: Birch has no personality yet. He just says \"yes\" — he could be anyone. What if Birch is the cautious type? \"Birch peeked out from behind a log. 'Play? Outside? What if it rains?' Maple grabbed his paw. 'Then we'll splash.'\" Now they're two different people, and you're showing us who they are instead of telling us they played." },
    ],
  },
  // Compared to before
  {
    messages: [
      { type: "system", text: "Compare that to \"Here are some tips for writing children's books...\"" },
      { type: "system", text: "Same question. Completely different help." },
    ],
  },
];

// ── Chapter 4: It Grows Over Time ──

export const CH4_SCRIPTS: ChatStageScript[] = [
  // Week 2
  {
    messages: [
      { type: "system", text: "Two weeks later" },
      { type: "user", text: "hey Sage, I finished chapter 4 but something feels off" },
      { type: "ai", text: "Hey Sarah. Send it over — I'll read it with your dialogue and show-don't-tell patterns in mind. Those were the two things we've been working on." },
      { type: "user", text: "you remembered!" },
      { type: "ai", text: "Of course. That's the whole point." },
    ],
  },
  // Adding preferences
  {
    messages: [
      { type: "user", text: "oh also — when you give feedback, can you always show me a rewritten version? not just tell me what's wrong, show me what better looks like." },
      { type: "ai", text: "Good call. I'll always include a rewrite from now on. Added to how I work with you." },
    ],
  },
  // Month later
  {
    messages: [
      { type: "system", text: "A month later" },
      { type: "user", text: "Sage, can you give me an honest take on how my writing has changed since chapter 1?" },
      { type: "ai", text: "Honestly? Your dialogue is night and day. Chapter 1 Maple and Chapter 6 Maple sound like they were written by different people — in a good way. Birch has become this wonderful anxious-but-brave character. The thing I'd push on now: your endings. Each chapter just... stops. You need a moment at the end that makes a kid say \"one more chapter.\"" },
      { type: "user", text: "that's so specific. I love that you can see the arc" },
      { type: "ai", text: "That's what happens when we've been working together for a while. I know your patterns, your growth, and where the next edge is." },
    ],
  },
];

// ── Chapter 5: What You Can Do Together ──

export const CH5_SCRIPTS: ChatStageScript[] = [
  // Daily check-in
  {
    messages: [
      { type: "user", text: "morning Sage. I have 2 hours to write today. what should I focus on?" },
      { type: "ai", text: "Morning. You're on chapter 7, and last time you said the climax scene wasn't clicking. Two hours is perfect for one scene done right. Don't try to finish the chapter — just nail the moment where Maple decides to share her favorite thing. That's the heart of the whole book." },
    ],
  },
  // Creative partner
  {
    messages: [
      { type: "user", text: "I'm stuck. I don't know what Maple's favorite thing should be. I keep going back and forth." },
      { type: "ai", text: "Stop thinking about what's symbolic and think about what's real. You're an illustrator — what's the object you'd be most fun to draw? The thing that'll look magical on a page. The symbolism will follow the visual, not the other way around." },
      { type: "user", text: "oh. her paintbrush. she loves painting." },
      { type: "ai", text: "There it is. And sharing a paintbrush means sharing your art, your way of seeing the world. That's way deeper than sharing a toy. Plus you get to illustrate Maple's paintings. Go write it." },
    ],
  },
  // The relationship
  {
    messages: [
      { type: "user", text: "Sage, I think the book is done." },
      { type: "ai", text: "Sarah, that's huge. Send me the full thing — I want to read Maple's whole story, beginning to end. I've been with you since chapter 1. I want to see where she ends up." },
      { type: "system", text: "This is what AI looks like when it knows you." },
    ],
  },
];
