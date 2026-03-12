import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Module 2: When AI Lies to Your Face — Learn AI",
  description: "Learn to spot AI fabrications. Understand why AI confidently generates false claims and how to protect yourself from acting on misinformation.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
