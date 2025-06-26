import type { ReactNode } from "react";
import { Footer, NavBar } from "@/components/layout";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <NavBar />
      <main className="flex-1 ">{children}</main>
      <Footer />
    </div>
  );
}
