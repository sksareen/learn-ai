import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "How We Made This Course — Learn AI",
  description: "We let an AI autonomously optimize its own teaching strategy across 13 experiments. Here's what it found.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
