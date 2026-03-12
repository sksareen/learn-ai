import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Module 1: Your First Useful Thing — Learn AI",
  description: "Get AI to solve a real problem in your life. The difference between useless and useful is specificity.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
