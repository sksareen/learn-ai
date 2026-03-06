import type { StageScript } from "../claude-code/scripts";
export type { TerminalLine, LineType, StageScript } from "../claude-code/scripts";

// ── Chapter 1: The Problem ──

export const CH1_SCRIPTS: StageScript[] = [
  // You teach it something
  {
    lines: [
      { type: "system", text: "~/my-project  ·  Monday" },
      { type: "user", text: "we use Tailwind for all styling in this project. never use plain CSS files." },
      { type: "blank", text: "" },
      { type: "text", text: "Got it. Tailwind only, no separate CSS files." },
      { type: "blank", text: "" },
      { type: "user", text: "also our API is at api.myapp.com, not localhost" },
      { type: "blank", text: "" },
      { type: "text", text: "Noted. I'll use api.myapp.com for all API calls." },
      { type: "blank", text: "" },
      { type: "user", text: "make me a new settings page" },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "src/pages/Settings.tsx (new)" },
      { type: "diff-add", text: "+ // Uses Tailwind, calls api.myapp.com" },
      { type: "diff-add", text: "+ // Exactly what you asked for" },
      { type: "blank", text: "" },
      { type: "text", text: "Done. Used Tailwind and pointed at your API." },
    ],
  },

  // Next day — it's gone
  {
    lines: [
      { type: "blank", text: "" },
      { type: "system", text: "~/my-project  ·  Tuesday (new session)" },
      { type: "user", text: "add a profile page" },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "src/pages/Profile.tsx (new)" },
      { type: "diff-add", text: "+ import './Profile.css';  // ← plain CSS" },
      { type: "diff-add", text: "+ fetch('http://localhost:8000/api/user')  // ← wrong URL" },
      { type: "blank", text: "" },
      { type: "text", text: "Created the profile page." },
    ],
  },

  // You have to re-explain
  {
    lines: [
      { type: "blank", text: "" },
      { type: "user", text: "no no, I told you yesterday — we use Tailwind, not CSS files. and the API is api.myapp.com" },
      { type: "blank", text: "" },
      { type: "text", text: "Sorry about that! Let me fix it." },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "src/pages/Profile.tsx" },
      { type: "diff-remove", text: "- import './Profile.css';" },
      { type: "diff-add", text: "+ // now using Tailwind classes" },
      { type: "diff-remove", text: "- fetch('http://localhost:8000/api/user')" },
      { type: "diff-add", text: "+ fetch('https://api.myapp.com/user')" },
    ],
  },

  // The pattern
  {
    lines: [
      { type: "blank", text: "" },
      { type: "system", text: "~/my-project  ·  Wednesday (new session)" },
      { type: "user", text: "add a dashboard" },
      { type: "blank", text: "" },
      { type: "diff-add", text: "+ import './Dashboard.css';  // wrong again" },
      { type: "diff-add", text: "+ fetch('http://localhost:8000/...')  // wrong again" },
      { type: "blank", text: "" },
      { type: "system", text: "  Every session starts from zero." },
      { type: "system", text: "  Claude doesn't remember yesterday." },
    ],
  },
];

// ── Chapter 2: The Quick Fix ──

export const CH2_SCRIPTS: StageScript[] = [
  // Remember this
  {
    lines: [
      { type: "system", text: "~/my-project" },
      { type: "user", text: "remember: we use Tailwind, never plain CSS. our API is at api.myapp.com." },
      { type: "blank", text: "" },
      { type: "text", text: "Saved." },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "~/.claude/CLAUDE.md (updated)" },
      { type: "diff-add", text: "+ # Project rules" },
      { type: "diff-add", text: "+ - Always use Tailwind CSS, never plain CSS files" },
      { type: "diff-add", text: "+ - API endpoint: https://api.myapp.com" },
    ],
  },

  // Next session — it remembers
  {
    lines: [
      { type: "blank", text: "" },
      { type: "system", text: "~/my-project  ·  next day (new session)" },
      { type: "user", text: "add a dashboard" },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "src/pages/Dashboard.tsx (new)" },
      { type: "diff-add", text: "+ <div className=\"p-6 bg-white rounded-xl\">  // Tailwind ✓" },
      { type: "diff-add", text: "+   const res = await fetch('https://api.myapp.com/stats')  // correct ✓" },
      { type: "blank", text: "" },
      { type: "text", text: "Created the dashboard. Used Tailwind and your API endpoint." },
    ],
  },

  // Building up memory
  {
    lines: [
      { type: "blank", text: "" },
      { type: "user", text: "remember: we always put components in src/components/, pages in src/pages/" },
      { type: "blank", text: "" },
      { type: "text", text: "Added to memory." },
      { type: "blank", text: "" },
      { type: "user", text: "also remember that we use Zustand for state, not Redux" },
      { type: "blank", text: "" },
      { type: "text", text: "Noted." },
      { type: "blank", text: "" },
      { type: "tool-read", text: "~/.claude/CLAUDE.md" },
      { type: "tool-content", text: "# Project rules" },
      { type: "tool-content", text: "- Always use Tailwind CSS, never plain CSS files" },
      { type: "tool-content", text: "- API endpoint: https://api.myapp.com" },
      { type: "tool-content", text: "- Components in src/components/, pages in src/pages/" },
      { type: "tool-content", text: "- Use Zustand for state management, not Redux" },
    ],
  },

  // It compounds
  {
    lines: [
      { type: "blank", text: "" },
      { type: "system", text: "~/my-project  ·  a week later" },
      { type: "user", text: "add a user profile page with state management" },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "src/pages/Profile.tsx (new)" },
      { type: "diff-add", text: "+ import { useUserStore } from '../stores/user'  // Zustand ✓" },
      { type: "diff-add", text: "+ className=\"p-6 bg-white ...\"  // Tailwind ✓" },
      { type: "diff-add", text: "+ fetch('https://api.myapp.com/user')  // correct API ✓" },
      { type: "blank", text: "" },
      { type: "text", text: "Everything follows your conventions — without you reminding me." },
    ],
  },
];

// ── Chapter 3: Going Deeper ──

export const CH3_SCRIPTS: StageScript[] = [
  // Project CLAUDE.md
  {
    lines: [
      { type: "system", text: "~/my-project" },
      { type: "user", text: "I want to set up context for this specific project so anyone on my team gets the same behavior" },
      { type: "blank", text: "" },
      { type: "text", text: "I'll create a project-level context file." },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "~/my-project/CLAUDE.md (new)" },
      { type: "diff-add", text: "+ # My App" },
      { type: "diff-add", text: "+ " },
      { type: "diff-add", text: "+ ## Stack" },
      { type: "diff-add", text: "+ - Next.js 15 with App Router" },
      { type: "diff-add", text: "+ - Tailwind CSS (no plain CSS)" },
      { type: "diff-add", text: "+ - Zustand for state" },
      { type: "diff-add", text: "+ - API: https://api.myapp.com" },
    ],
  },

  // Team conventions
  {
    lines: [
      { type: "blank", text: "" },
      { type: "user", text: "add our team conventions too — how we name things, how we organize files" },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "~/my-project/CLAUDE.md (updated)" },
      { type: "diff-add", text: "+ ## Conventions" },
      { type: "diff-add", text: "+ - Components: PascalCase (UserCard.tsx)" },
      { type: "diff-add", text: "+ - Hooks: camelCase with 'use' prefix (useAuth.ts)" },
      { type: "diff-add", text: "+ - Pages go in src/pages/, components in src/components/" },
      { type: "diff-add", text: "+ - Always write tests for new features" },
      { type: "diff-add", text: "+ - Commit messages: lowercase, present tense" },
      { type: "blank", text: "" },
      { type: "text", text: "Now anyone on your team who uses Claude Code" },
      { type: "text", text: "on this repo will follow the same rules." },
    ],
  },

  // Architecture context
  {
    lines: [
      { type: "blank", text: "" },
      { type: "user", text: "what about explaining how our app is structured? like what talks to what" },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "~/my-project/CLAUDE.md (updated)" },
      { type: "diff-add", text: "+ ## Architecture" },
      { type: "diff-add", text: "+ - Frontend (Next.js) → API Gateway → Backend services" },
      { type: "diff-add", text: "+ - Auth: JWT tokens stored in httpOnly cookies" },
      { type: "diff-add", text: "+ - Database: PostgreSQL, accessed through Prisma ORM" },
      { type: "diff-add", text: "+ - File uploads go to S3, served through CloudFront" },
      { type: "blank", text: "" },
      { type: "text", text: "This helps me understand where new code should go" },
      { type: "text", text: "and how different parts connect." },
    ],
  },

  // The difference
  {
    lines: [
      { type: "blank", text: "" },
      { type: "system", text: "── new teammate joins, clones the repo ──" },
      { type: "blank", text: "" },
      { type: "user", text: "add a file upload feature to the settings page" },
      { type: "blank", text: "" },
      { type: "text", text: "Based on your CLAUDE.md, I'll:" },
      { type: "text", text: "- Put the component in src/components/FileUpload.tsx" },
      { type: "text", text: "- Upload to S3, serve through CloudFront" },
      { type: "text", text: "- Use Tailwind, Zustand for upload state" },
      { type: "text", text: "- Add tests, commit in lowercase" },
      { type: "blank", text: "" },
      { type: "text", text: "They didn't configure anything. The repo taught me." },
    ],
  },
];

// ── Chapter 4: The Art of Context ──

export const CH4_SCRIPTS: StageScript[] = [
  // Too little
  {
    lines: [
      { type: "system", text: "~/big-project  ·  no context file" },
      { type: "user", text: "fix the login bug" },
      { type: "blank", text: "" },
      { type: "text", text: "I see a few login-related files. Let me check..." },
      { type: "blank", text: "" },
      { type: "tool-read", text: "src/auth/login.ts" },
      { type: "tool-read", text: "src/auth/session.ts" },
      { type: "tool-read", text: "src/middleware/auth.ts" },
      { type: "tool-read", text: "src/api/auth/route.ts" },
      { type: "tool-read", text: "src/lib/jwt.ts" },
      { type: "blank", text: "" },
      { type: "text", text: "Which login bug do you mean? There are several auth flows." },
      { type: "text", text: "Is it the OAuth flow, email/password, or the session refresh?" },
      { type: "blank", text: "" },
      { type: "system", text: "  Without context, Claude has to guess — and ask." },
    ],
  },

  // Too much
  {
    lines: [
      { type: "blank", text: "" },
      { type: "system", text: "~/big-project  ·  CLAUDE.md: 500 lines" },
      { type: "user", text: "fix the login bug" },
      { type: "blank", text: "" },
      { type: "tool-read", text: "CLAUDE.md" },
      { type: "tool-content", text: "... 500 lines of every decision ever made ..." },
      { type: "tool-content", text: "... deploy history, meeting notes, old TODOs ..." },
      { type: "tool-content", text: "... contradicting instructions from 3 months ago ..." },
      { type: "blank", text: "" },
      { type: "text", text: "Looking at the login system... I see your CLAUDE.md" },
      { type: "text", text: "mentions both Firebase Auth AND custom JWT. Which one" },
      { type: "text", text: "is current? The doc says both in different sections." },
      { type: "blank", text: "" },
      { type: "system", text: "  Too much context is just as bad as too little." },
      { type: "system", text: "  Contradictions and noise make Claude worse." },
    ],
  },

  // Just right
  {
    lines: [
      { type: "blank", text: "" },
      { type: "system", text: "~/big-project  ·  CLAUDE.md: 30 lines" },
      { type: "user", text: "fix the login bug" },
      { type: "blank", text: "" },
      { type: "tool-read", text: "CLAUDE.md" },
      { type: "tool-content", text: "Auth: JWT with httpOnly cookies (moved off Firebase in Jan)" },
      { type: "tool-content", text: "Login flow: src/auth/login.ts → session.ts → cookie" },
      { type: "tool-content", text: "Known issue: token refresh fails after 24h" },
      { type: "blank", text: "" },
      { type: "text", text: "The token refresh bug. Let me look at session.ts." },
      { type: "blank", text: "" },
      { type: "tool-read", text: "src/auth/session.ts" },
      { type: "tool-content", text: "// refresh token expires but we never catch the error" },
      { type: "blank", text: "" },
      { type: "text", text: "Found it. The refresh token error isn't caught." },
      { type: "text", text: "Fixing now." },
    ],
  },

  // The principles
  {
    lines: [
      { type: "blank", text: "" },
      { type: "system", text: "── what good context looks like ──" },
      { type: "blank", text: "" },
      { type: "tool-read", text: "Good CLAUDE.md" },
      { type: "tool-content", text: "✓ Current stack and tools (not historical)" },
      { type: "tool-content", text: "✓ How the project is organized" },
      { type: "tool-content", text: "✓ Known issues and gotchas" },
      { type: "tool-content", text: "✓ Team conventions (naming, testing, commits)" },
      { type: "tool-content", text: "" },
      { type: "tool-content", text: "✗ Meeting notes and old decisions" },
      { type: "tool-content", text: "✗ Full API documentation (too long)" },
      { type: "tool-content", text: "✗ Contradicting instructions" },
      { type: "tool-content", text: "✗ Things that change every week" },
      { type: "blank", text: "" },
      { type: "text", text: "Think of it like onboarding a new teammate." },
      { type: "text", text: "What would you tell them on day one?" },
      { type: "text", text: "That's your CLAUDE.md." },
    ],
  },
];
