// Terminal session scripts for each stage.
// Line types match real Claude Code UI elements.

export type LineType =
  | "user"         // User prompt (❯ prefix)
  | "text"         // Claude's plain text response
  | "tool-read"    // ⏺ Read(file) header
  | "tool-edit"    // ⏺ Edit(file) header
  | "tool-bash"    // ⏺ Bash header
  | "tool-content" // Indented content inside a tool block
  | "diff-add"     // + line inside an edit block
  | "diff-remove"  // - line inside an edit block
  | "diff-context" // unchanged line inside an edit block
  | "bash-output"  // Output inside a bash block
  | "system"       // System/status messages
  | "blank";

export interface TerminalLine {
  type: LineType;
  text: string;
}

export interface StageScript {
  lines: TerminalLine[];
}

// ── Chapter 1: What Claude Code Does ──

export const CHAPTER_1_SCRIPTS: StageScript[] = [
  // Stage 0: The prompt
  {
    lines: [
      { type: "system", text: "~/my-project" },
      { type: "user", text: "add a dark mode toggle to the settings page" },
    ],
  },

  // Stage 1: Claude reads your code
  {
    lines: [
      { type: "blank", text: "" },
      { type: "text", text: "Let me look at what you've got." },
      { type: "blank", text: "" },
      { type: "tool-read", text: "src/pages/Settings.tsx" },
      { type: "tool-content", text: "export function Settings() {" },
      { type: "tool-content", text: '  return <div className="settings-page">' },
      { type: "tool-content", text: "    <h1>Settings</h1>" },
      { type: "tool-content", text: "    ..." },
      { type: "blank", text: "" },
      { type: "tool-read", text: "src/lib/theme.ts" },
      { type: "tool-content", text: "export type Theme = 'light' | 'dark';" },
      { type: "tool-content", text: "export function getTheme(): Theme { ... }" },
      { type: "blank", text: "" },
      { type: "text", text: "Found your settings page and a theme system." },
      { type: "text", text: "I'll add a toggle that uses what you already have." },
    ],
  },

  // Stage 2: Claude edits files
  {
    lines: [
      { type: "blank", text: "" },
      { type: "tool-edit", text: "src/pages/Settings.tsx" },
      { type: "diff-context", text: "  export function Settings() {" },
      { type: "diff-add", text: "+   const [theme, setTheme] = useTheme();" },
      { type: "diff-context", text: '    return <div className="settings-page">' },
      { type: "diff-context", text: "      <h1>Settings</h1>" },
      { type: "diff-add", text: "+     <div className=\"setting-row\">" },
      { type: "diff-add", text: "+       <label>Dark mode</label>" },
      { type: "diff-add", text: "+       <Toggle" },
      { type: "diff-add", text: "+         checked={theme === 'dark'}" },
      { type: "diff-add", text: "+         onChange={() => setTheme(...)}" },
      { type: "diff-add", text: "+       />" },
      { type: "diff-add", text: "+     </div>" },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "src/hooks/useTheme.ts (new)" },
      { type: "diff-add", text: "+ export function useTheme() {" },
      { type: "diff-add", text: "+   const [theme, set] = useState(getTheme());" },
      { type: "diff-add", text: "+   return [theme, (t) => { setTheme(t); set(t); }];" },
      { type: "diff-add", text: "+ }" },
    ],
  },

  // Stage 3: Claude runs tests
  {
    lines: [
      { type: "blank", text: "" },
      { type: "text", text: "Let me make sure nothing broke." },
      { type: "blank", text: "" },
      { type: "tool-bash", text: "npm run test" },
      { type: "bash-output", text: " PASS  src/pages/Settings.test.tsx" },
      { type: "bash-output", text: " PASS  src/lib/theme.test.ts" },
      { type: "bash-output", text: " FAIL  src/hooks/useTheme.test.ts" },
      { type: "bash-output", text: "   × should toggle between light and dark" },
      { type: "blank", text: "" },
      { type: "text", text: "One test broke. Fixing it..." },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "src/hooks/useTheme.test.ts" },
      { type: "diff-remove", text: "- expect(result.current).toBe('light');" },
      { type: "diff-add", text: "+ expect(result.current[0]).toBe('light');" },
      { type: "blank", text: "" },
      { type: "tool-bash", text: "npm run test" },
      { type: "bash-output", text: " PASS  All 14 tests passed" },
      { type: "blank", text: "" },
      { type: "text", text: "All good. Dark mode toggle is done." },
    ],
  },

  // Stage 4: The permission model
  {
    lines: [
      { type: "blank", text: "" },
      { type: "system", text: "───── Allow Claude to edit? ─────" },
      { type: "system", text: "  src/pages/Settings.tsx" },
      { type: "system", text: "  src/hooks/useTheme.ts (new)" },
      { type: "system", text: "" },
      { type: "system", text: "  [Yes]  [No]  [Yes to all]" },
      { type: "system", text: "────────────────────────────────" },
      { type: "blank", text: "" },
      { type: "text", text: "You always see what I want to change before I do it." },
      { type: "text", text: "Nothing happens until you say yes." },
    ],
  },

  // Stage 5: Conversation / iteration
  {
    lines: [
      { type: "blank", text: "" },
      { type: "user", text: "actually can you use CSS variables instead? that feels cleaner" },
      { type: "blank", text: "" },
      { type: "text", text: "Yeah, good call. I'll redo it with CSS custom properties." },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "src/hooks/useTheme.ts" },
      { type: "diff-remove", text: "- const [theme, set] = useState(getTheme());" },
      { type: "diff-add", text: "+ document.documentElement.setAttribute('data-theme', t);" },
      { type: "blank", text: "" },
      { type: "text", text: "Done. The toggle now flips a data attribute" },
      { type: "text", text: "and your CSS variables handle the rest." },
    ],
  },
];

// ── Chapter 2: Make It Yours ──

export const CHAPTER_2_SCRIPTS: StageScript[] = [
  // Stage 0: The blank slate
  {
    lines: [
      { type: "system", text: "~/new-project" },
      { type: "user", text: "set up a new python api for me" },
      { type: "blank", text: "" },
      { type: "text", text: "I'll set up a Flask API." },
      { type: "tool-bash", text: "pip install flask" },
      { type: "bash-output", text: "Installing flask..." },
      { type: "blank", text: "" },
      { type: "text", text: "Created app.py with a basic Flask server" },
      { type: "text", text: "and a requirements.txt." },
    ],
  },

  // Stage 1: "Remember this"
  {
    lines: [
      { type: "blank", text: "" },
      { type: "user", text: "hey, I always use uv not pip. and I like FastAPI better than Flask. remember that" },
      { type: "blank", text: "" },
      { type: "text", text: "Got it, saving that." },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "~/.claude/memory/preferences.md" },
      { type: "diff-add", text: "+ ## Python" },
      { type: "diff-add", text: "+ - Always use uv, never pip" },
      { type: "diff-add", text: "+ - Prefer FastAPI over Flask" },
      { type: "blank", text: "" },
      { type: "text", text: "I'll use uv and FastAPI from now on." },
    ],
  },

  // Stage 2: Give it a name
  {
    lines: [
      { type: "blank", text: "" },
      { type: "user", text: "your name is Jarvis. keep it short, don't over-explain stuff" },
      { type: "blank", text: "" },
      { type: "text", text: "Noted. I'm Jarvis." },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "~/.claude/CLAUDE.md" },
      { type: "diff-add", text: "+ # Identity" },
      { type: "diff-add", text: "+ Name: Jarvis" },
      { type: "diff-add", text: "+ Style: terse, no over-explaining" },
      { type: "blank", text: "" },
      { type: "user", text: "should I use Redux or Zustand?" },
      { type: "blank", text: "" },
      { type: "text", text: "Zustand. Less boilerplate, same result." },
    ],
  },

  // Stage 3: The memory file
  {
    lines: [
      { type: "blank", text: "" },
      { type: "tool-read", text: "~/.claude/CLAUDE.md" },
      { type: "tool-content", text: "# Identity" },
      { type: "tool-content", text: "Name: Jarvis" },
      { type: "tool-content", text: "Style: terse, no over-explaining" },
      { type: "tool-content", text: "" },
      { type: "tool-content", text: "# Preferences" },
      { type: "tool-content", text: "- Always use uv, never pip" },
      { type: "tool-content", text: "- Prefer FastAPI over Flask" },
      { type: "tool-content", text: "- Use Tailwind CSS" },
      { type: "tool-content", text: "- Never auto-commit" },
    ],
  },

  // Stage 4: Watch the difference
  {
    lines: [
      { type: "blank", text: "" },
      { type: "system", text: "── same prompt, with memory ──" },
      { type: "blank", text: "" },
      { type: "user", text: "set up a new python api for me" },
      { type: "blank", text: "" },
      { type: "text", text: "FastAPI + uv. On it." },
      { type: "blank", text: "" },
      { type: "tool-bash", text: "uv init && uv add fastapi uvicorn" },
      { type: "bash-output", text: "Initialized. Added fastapi, uvicorn." },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "src/main.py (new)" },
      { type: "diff-add", text: "+ from fastapi import FastAPI" },
      { type: "diff-add", text: "+ app = FastAPI()" },
      { type: "diff-add", text: '+' },
      { type: "diff-add", text: '+ @app.get("/health")' },
      { type: "diff-add", text: "+ def health():" },
      { type: "diff-add", text: '+     return {"status": "ok"}' },
      { type: "blank", text: "" },
      { type: "text", text: "Done. `uv run uvicorn src.main:app` to start." },
    ],
  },
];

// ── Chapter 3: Build Something Real ──

export const CHAPTER_3_SCRIPTS: StageScript[] = [
  {
    lines: [
      { type: "system", text: "~" },
      { type: "user", text: "I want a waitlist page for my new app. people enter their email and it shows how many people signed up. make it look nice" },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "text", text: "I'll build that from scratch." },
      { type: "blank", text: "" },
      { type: "tool-bash", text: "npx create-next-app@latest waitlist --ts --tailwind --app" },
      { type: "bash-output", text: "✓ Created waitlist" },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "src/app/page.tsx (rewritten)" },
      { type: "diff-add", text: "+ <main className=\"min-h-screen bg-gradient-to-br from-violet-600 ...\">" },
      { type: "diff-add", text: "+   <h1>Join the waitlist</h1>" },
      { type: "diff-add", text: "+   <WaitlistForm />" },
      { type: "diff-add", text: "+   <SignupCount />" },
      { type: "diff-add", text: "+ </main>" },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "text", text: "Now I'll wire up the email collection." },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "src/app/api/waitlist/route.ts (new)" },
      { type: "diff-add", text: "+ export async function POST(req) {" },
      { type: "diff-add", text: "+   const { email } = await req.json();" },
      { type: "diff-add", text: "+   // save email, return count" },
      { type: "diff-add", text: "+   return Response.json({ count });" },
      { type: "diff-add", text: "+ }" },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "text", text: "Let me start it up and make sure everything works." },
      { type: "blank", text: "" },
      { type: "tool-bash", text: "npm run dev" },
      { type: "bash-output", text: "✓ Ready on localhost:3000" },
      { type: "blank", text: "" },
      { type: "tool-bash", text: "curl -X POST localhost:3000/api/waitlist -d '{\"email\":\"test@hey.com\"}'" },
      { type: "bash-output", text: "{\"count\":1}" },
      { type: "blank", text: "" },
      { type: "text", text: "Works. Form submits, count updates." },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "user", text: "ship it" },
      { type: "blank", text: "" },
      { type: "tool-bash", text: "vercel --prod" },
      { type: "bash-output", text: "✅ https://waitlist-abc.vercel.app" },
      { type: "blank", text: "" },
      { type: "text", text: "Live. That's idea → deployed in one conversation." },
    ],
  },
];

// ── Chapter 4: When Things Go Wrong ──

export const CHAPTER_4_SCRIPTS: StageScript[] = [
  {
    lines: [
      { type: "system", text: "~/my-app" },
      { type: "user", text: "the app crashes when I click save. it just says 'cannot read properties of undefined reading id'" },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "text", text: "Let me find where that's happening." },
      { type: "blank", text: "" },
      { type: "tool-read", text: "src/components/Editor.tsx" },
      { type: "tool-content", text: "const handleSave = async () => {" },
      { type: "tool-content", text: "  const doc = documents.find(d => d.active);" },
      { type: "tool-content", text: "  await api.save(doc.id, content); // ← crashes here" },
      { type: "tool-content", text: "};" },
      { type: "blank", text: "" },
      { type: "text", text: "When no document is active, `doc` is undefined." },
      { type: "text", text: "Then it tries to read `.id` on nothing." },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "tool-edit", text: "src/components/Editor.tsx" },
      { type: "diff-context", text: "  const doc = documents.find(d => d.active);" },
      { type: "diff-add", text: "+   if (!doc) return;" },
      { type: "diff-context", text: "  await api.save(doc.id, content);" },
      { type: "blank", text: "" },
      { type: "text", text: "That stops the crash. But the real question is:" },
      { type: "text", text: "why is nothing active when you can still click save?" },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "tool-read", text: "src/components/Sidebar.tsx" },
      { type: "tool-content", text: "const closeDoc = (id) => {" },
      { type: "tool-content", text: "  setDocuments(docs => docs.filter(d => d.id !== id));" },
      { type: "tool-content", text: "  // ^ removes the doc but doesn't activate the next one" },
      { type: "tool-content", text: "};" },
      { type: "blank", text: "" },
      { type: "text", text: "There it is. Closing a tab removes it but doesn't" },
      { type: "text", text: "make another one active." },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "src/components/Sidebar.tsx" },
      { type: "diff-remove", text: "-   setDocuments(docs => docs.filter(d => d.id !== id));" },
      { type: "diff-add", text: "+   setDocuments(docs => {" },
      { type: "diff-add", text: "+     const remaining = docs.filter(d => d.id !== id);" },
      { type: "diff-add", text: "+     if (remaining.length && !remaining.some(d => d.active))" },
      { type: "diff-add", text: "+       remaining[0].active = true;" },
      { type: "diff-add", text: "+     return remaining;" },
      { type: "diff-add", text: "+   });" },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "tool-bash", text: "npm run test" },
      { type: "bash-output", text: "✓ All 23 tests passed" },
      { type: "blank", text: "" },
      { type: "text", text: "Fixed both the crash and the root cause." },
      { type: "text", text: "Closing a tab now activates the next one." },
    ],
  },
];

// ── Chapter 5: Work With Your Tools ──

export const CHAPTER_5_SCRIPTS: StageScript[] = [
  {
    lines: [
      { type: "system", text: "~/my-app" },
      { type: "user", text: "what bugs do we have open?" },
      { type: "blank", text: "" },
      { type: "tool-bash", text: "gh issue list --state open" },
      { type: "bash-output", text: "#42  Login page blank on Safari      bug" },
      { type: "bash-output", text: "#38  Add CSV export to dashboard     feature" },
      { type: "bash-output", text: "#35  Slow load on /analytics         perf" },
      { type: "blank", text: "" },
      { type: "text", text: "3 open issues. Want me to fix one?" },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "user", text: "yeah do the safari one" },
      { type: "blank", text: "" },
      { type: "tool-bash", text: "gh issue view 42" },
      { type: "bash-output", text: "Login page shows blank on Safari 17." },
      { type: "bash-output", text: "Works fine on Chrome." },
      { type: "blank", text: "" },
      { type: "tool-read", text: "src/pages/Login.tsx" },
      { type: "tool-content", text: "// Using CSS nesting — not supported in Safari 17" },
      { type: "tool-content", text: ".login { .form { padding: 2rem } }" },
      { type: "blank", text: "" },
      { type: "text", text: "CSS nesting. Safari doesn't support it yet." },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "tool-edit", text: "src/pages/Login.tsx" },
      { type: "diff-remove", text: "- .login { .form { padding: 2rem } }" },
      { type: "diff-add", text: "+ .login .form { padding: 2rem; }" },
      { type: "blank", text: "" },
      { type: "tool-bash", text: "git checkout -b fix/safari-login && git commit -am 'fix: safari compat'" },
      { type: "tool-bash", text: "gh pr create --title 'Fix blank login on Safari' --body 'Fixes #42'" },
      { type: "bash-output", text: "https://github.com/you/my-app/pull/43" },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "user", text: "is CI passing?" },
      { type: "blank", text: "" },
      { type: "tool-bash", text: "gh pr checks 43" },
      { type: "bash-output", text: "✓ build     passed" },
      { type: "bash-output", text: "✓ lint      passed" },
      { type: "bash-output", text: "✓ test      passed" },
      { type: "bash-output", text: "✓ deploy    passed" },
      { type: "blank", text: "" },
      { type: "text", text: "All green. Ready to merge." },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "user", text: "tell the team in slack that it's fixed" },
      { type: "blank", text: "" },
      { type: "text", text: "Posting to #engineering..." },
      { type: "blank", text: "" },
      { type: "bash-output", text: "Sent: \"Fixed the Safari login bug (#42). PR is up.\"" },
      { type: "blank", text: "" },
      { type: "text", text: "Bug → fix → PR → CI → team update. One conversation." },
    ],
  },
];

// ── Chapter 6: Skills ──

export const CHAPTER_6_SCRIPTS: StageScript[] = [
  {
    lines: [
      { type: "system", text: "~/my-app" },
      { type: "user", text: "/commit" },
      { type: "blank", text: "" },
      { type: "tool-bash", text: "git diff --staged" },
      { type: "bash-output", text: "3 files changed, 42 insertions, 7 deletions" },
      { type: "blank", text: "" },
      { type: "text", text: "Commit: \"Add dark mode toggle with CSS variables\"" },
      { type: "tool-bash", text: "git commit -m '...'" },
      { type: "bash-output", text: "[main a3f2c1d] Add dark mode toggle with CSS variables" },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "user", text: "can you make me a /deploy command that builds, tests, and ships to vercel?" },
      { type: "blank", text: "" },
      { type: "text", text: "Sure." },
      { type: "blank", text: "" },
      { type: "tool-edit", text: ".claude/skills/deploy.md (new)" },
      { type: "diff-add", text: "+ # /deploy" },
      { type: "diff-add", text: "+ 1. Run npm run build — stop if it fails" },
      { type: "diff-add", text: "+ 2. Run npm run test — stop if tests fail" },
      { type: "diff-add", text: "+ 3. Run vercel --prod" },
      { type: "diff-add", text: "+ 4. Tell me the URL when it's live" },
      { type: "blank", text: "" },
      { type: "text", text: "Done. Type /deploy whenever you want." },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "user", text: "/deploy" },
      { type: "blank", text: "" },
      { type: "tool-bash", text: "npm run build" },
      { type: "bash-output", text: "✓ Built in 3.2s" },
      { type: "tool-bash", text: "npm run test" },
      { type: "bash-output", text: "✓ 47 tests passed" },
      { type: "tool-bash", text: "vercel --prod" },
      { type: "bash-output", text: "✅ https://my-app.vercel.app" },
      { type: "blank", text: "" },
      { type: "text", text: "Deployed. All checks passed." },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "tool-read", text: ".claude/skills/" },
      { type: "tool-content", text: "commit.md   — smart git commits" },
      { type: "tool-content", text: "deploy.md   — build + test + ship" },
      { type: "tool-content", text: "review.md   — code review the diff" },
      { type: "tool-content", text: "docs.md     — generate docs from code" },
      { type: "blank", text: "" },
      { type: "text", text: "Each skill is just a markdown file." },
      { type: "text", text: "Commit them to your repo and your whole team gets them." },
    ],
  },
];

// ── Chapter 7: MCP Integrations ──

export const CHAPTER_7_SCRIPTS: StageScript[] = [
  {
    lines: [
      { type: "system", text: "~/my-app  ·  connected: github, slack, linear, notion" },
      { type: "user", text: "what's assigned to me in Linear?" },
      { type: "blank", text: "" },
      { type: "bash-output", text: "ENG-341  Fix auth token refresh      In Progress" },
      { type: "bash-output", text: "ENG-339  Add rate limiting           Todo" },
      { type: "bash-output", text: "ENG-322  Update onboarding flow      Todo" },
      { type: "blank", text: "" },
      { type: "text", text: "3 tickets. Want me to work on one?" },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "user", text: "can you also connect to our Notion? the API specs are in there" },
      { type: "blank", text: "" },
      { type: "tool-edit", text: ".claude/mcp.json" },
      { type: "diff-context", text: '  "servers": {' },
      { type: "diff-context", text: '    "github": { ... },' },
      { type: "diff-add", text: '+   "notion": {' },
      { type: "diff-add", text: '+     "command": "npx",' },
      { type: "diff-add", text: '+     "args": ["@anthropic/mcp-server-notion"]' },
      { type: "diff-add", text: "+   }" },
      { type: "diff-context", text: "  }" },
      { type: "blank", text: "" },
      { type: "text", text: "Connected. I can read your Notion pages now." },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "user", text: "read the rate limiting spec from Notion and build it" },
      { type: "blank", text: "" },
      { type: "bash-output", text: "Found: \"API Rate Limiting Spec\"" },
      { type: "bash-output", text: "  100 req/min per key, 429 + Retry-After, Redis" },
      { type: "blank", text: "" },
      { type: "text", text: "Got the spec. Building it now." },
      { type: "blank", text: "" },
      { type: "tool-edit", text: "src/middleware/rateLimit.ts (new)" },
      { type: "diff-add", text: "+ export async function rateLimit(apiKey) {" },
      { type: "diff-add", text: "+   const count = await redis.incr(`rate:${apiKey}`);" },
      { type: "diff-add", text: "+   if (count === 1) await redis.expire(key, 60);" },
      { type: "diff-add", text: "+   return count <= 100;" },
      { type: "diff-add", text: "+ }" },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "tool-bash", text: "npm run test" },
      { type: "bash-output", text: "✓ All tests passed" },
      { type: "blank", text: "" },
      { type: "bash-output", text: "Linear: ENG-339 → Done" },
      { type: "bash-output", text: "GitHub: PR #51 created" },
      { type: "bash-output", text: "Slack: \"Rate limiting shipped per spec.\"" },
      { type: "blank", text: "" },
      { type: "text", text: "Notion spec → code → tests → PR → Linear → Slack." },
      { type: "text", text: "One prompt, five tools." },
    ],
  },
];

// ── Chapter 8: Plugins (Skills + MCP) ──

export const CHAPTER_8_SCRIPTS: StageScript[] = [
  {
    lines: [
      { type: "system", text: "~/my-app  ·  connected: github, slack, linear, postgres" },
      { type: "system", text: "skills: /commit /deploy /review /triage" },
      { type: "blank", text: "" },
      { type: "text", text: "Skills tell me what to do." },
      { type: "text", text: "MCP gives me access to your tools." },
      { type: "text", text: "Together? Reusable workflows that connect everything." },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "tool-read", text: ".claude/skills/triage.md" },
      { type: "tool-content", text: "# /triage" },
      { type: "tool-content", text: "1. Check Linear for new bugs (urgent/high)" },
      { type: "tool-content", text: "2. Cross-reference with error logs in postgres" },
      { type: "tool-content", text: "3. Estimate: quick fix or needs investigation" },
      { type: "tool-content", text: "4. Post summary in #engineering on Slack" },
      { type: "tool-content", text: "5. Assign quick fixes to yourself" },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "user", text: "/triage" },
      { type: "blank", text: "" },
      { type: "bash-output", text: "Linear: 4 new bugs since yesterday" },
      { type: "bash-output", text: "  ENG-355  Login timeout         urgent  340 errors/24h" },
      { type: "bash-output", text: "  ENG-354  CSV missing headers   high    no errors in logs" },
      { type: "bash-output", text: "  ENG-353  Wrong timezone         high    needs investigation" },
      { type: "bash-output", text: "  ENG-352  Typo in email          low     quick fix" },
      { type: "blank", text: "" },
      { type: "text", text: "ENG-355 is urgent. 352 and 354 are quick fixes." },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "bash-output", text: "Slack #engineering:" },
      { type: "bash-output", text: "  \"4 new bugs. ENG-355 is urgent (340 errors)." },
      { type: "bash-output", text: "  352 + 354 are quick fixes, I'll handle those.\"" },
      { type: "blank", text: "" },
      { type: "bash-output", text: "Linear: ENG-352, ENG-354 → assigned to you" },
      { type: "blank", text: "" },
      { type: "text", text: "Triage done. Want me to start fixing?" },
      { type: "blank", text: "" },
      { type: "user", text: "yeah go for it" },
      { type: "blank", text: "" },
      { type: "text", text: "On it." },
    ],
  },
];

// ── Chapter 9: Agent Teams ──

export const CHAPTER_9_SCRIPTS: StageScript[] = [
  {
    lines: [
      { type: "system", text: "~/my-app" },
      { type: "user", text: "I need auth, a dashboard, and rate limiting. they're separate things, can you do them all at once?" },
      { type: "blank", text: "" },
      { type: "text", text: "Spinning up 3 agents. Each gets their own branch." },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "system", text: "───── Agent Pool ─────────────────" },
      { type: "bash-output", text: "  Agent 1  auth          working" },
      { type: "bash-output", text: "  Agent 2  dashboard     working" },
      { type: "bash-output", text: "  Agent 3  rate-limit    working" },
      { type: "system", text: "─────────────────────────────────" },
      { type: "blank", text: "" },
      { type: "text", text: "Each one has its own copy of the code." },
      { type: "text", text: "They can't step on each other." },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "bash-output", text: "  Agent 1  auth          ✓ done   4 files, 12 tests" },
      { type: "bash-output", text: "  Agent 2  dashboard     working  building charts..." },
      { type: "bash-output", text: "  Agent 3  rate-limit    ✓ done   2 files, 6 tests" },
      { type: "blank", text: "" },
      { type: "bash-output", text: "  Agent 2  dashboard     ✓ done   7 files, 15 tests" },
      { type: "blank", text: "" },
      { type: "text", text: "All three done. Merging." },
    ],
  },
  {
    lines: [
      { type: "blank", text: "" },
      { type: "tool-bash", text: "git merge auth-feature && git merge dashboard && git merge rate-limiting" },
      { type: "bash-output", text: "All merged clean" },
      { type: "blank", text: "" },
      { type: "tool-bash", text: "npm run test" },
      { type: "bash-output", text: "✓ 33 new tests, 80 total — all passing" },
      { type: "blank", text: "" },
      { type: "text", text: "3 features, built in parallel, merged clean." },
      { type: "text", text: "What would take a day took 10 minutes." },
    ],
  },
];