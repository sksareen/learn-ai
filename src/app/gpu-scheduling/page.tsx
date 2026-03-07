import type { Metadata } from "next";
import GpuApp from "./GpuApp";

export const metadata: Metadata = {
  title: "GPU Scheduling — Learn AI",
  description: "Watch 256 GPUs juggle AI workloads in real time. An interactive simulation of how GPU clusters schedule competing jobs.",
};

export default function GpuSchedulingPage() {
  // GPU simulator has its own dark theme baked in — force dark context
  return (
    <div className="dark" style={{ background: "#0f1117" }}>
      <GpuApp />
    </div>
  );
}
