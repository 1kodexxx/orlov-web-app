import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans">
      <div className="max-w-screen-xl mx-auto px-4">{children}</div>
    </div>
  );
}
