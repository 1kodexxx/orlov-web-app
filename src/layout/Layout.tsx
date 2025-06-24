import type { ReactNode } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <NavBar />
      <main className="flex-1 ">{children}</main>
      <Footer />
    </div>
  );
}
