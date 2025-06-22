import type { ReactNode } from "react";
import NavBar from "@/components/NavBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans">
      <NavBar />
      {/* Контейнер для всех страниц */}
      <main className="max-w-screen-xl mx-auto px-4">{children}</main>
    </div>
  );
}
