import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Context Management — Learn AI",
  description: "Your AI forgets everything between sessions. Learn how to give it memory, project knowledge, and team conventions.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
