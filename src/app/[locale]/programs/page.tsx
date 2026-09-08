"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Programs from "@/components/sections/Programs";
import GsapReveal from "@/components/shared/GsapReveal";
import { useTranslations } from "next-intl";

export default function ProgramsPage() {
  const t = useTranslations("Programs");

  return (
    <main className="min-h-screen bg-background text-primary pt-28">
      <Navbar />

      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-secondary">
        <GsapReveal direction="up">
          <div className="text-xs font-mono font-bold tracking-widest text-primary uppercase border-l-2 border-accent pl-3 mb-6">
            {t("badge")}
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-primary mb-6 max-w-4xl">
            {t("title")}
          </h1>
          <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
            {t("subtitle")}
          </p>
        </GsapReveal>
      </section>

      <GsapReveal direction="up">
        <Programs />
      </GsapReveal>

      <Footer />
    </main>
  );
}
