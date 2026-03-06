import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claude Code — Learn AI",
  description: "An interactive, visual guide to Claude Code. Learn how an AI coding agent works by watching it in action.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
