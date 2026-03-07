import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Personal AI — Learn AI",
  description: "Set up an AI that knows you, remembers your goals, and gets better over time. No technical skills needed.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
