"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CTABanner from "@/components/sections/CTABanner";
import { CheckCircle2 } from "lucide-react";
import GsapReveal from "@/components/shared/GsapReveal";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  const missions = [t("m1"), t("m2"), t("m3"), t("m4"), t("m5")];

  return (
    <main className="min-h-screen bg-background text-primary pt-28">
      <Navbar />

      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-secondary">
        <GsapReveal direction="up">
          <div className="text-xs font-mono font-bold tracking-widest text-primary uppercase border-l-2 border-accent pl-3 mb-6">
            {t("badge")}
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-primary mb-6 max-w-4xl">
            {t("title")} <span className="bg-accent px-2 py-0.5 rounded-md inline-block">{t("highlight")}</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
            {t("description")}
          </p>
        </GsapReveal>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <GsapReveal direction="up">
          <div className="bg-secondary p-8 sm:p-12 rounded-xl">
            <h2 className="text-2xl font-bold text-primary mb-4">{t("vision_title")}</h2>
            <p className="text-lg text-text-muted italic">&ldquo;{t("vision_desc")}&rdquo;</p>
          </div>
        </GsapReveal>

        <GsapReveal direction="up">
          <div className="bg-secondary p-8 sm:p-12 rounded-xl">
            <h2 className="text-2xl font-bold text-primary mb-6">{t("mission_title")}</h2>
            <ul className="space-y-4">
              {missions.map((m, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-primary">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </GsapReveal>

        <GsapReveal direction="up">
          <div className="bg-primary text-background p-8 sm:p-12 rounded-xl text-center">
            <h2 className="text-4xl sm:text-6xl font-bold text-accent">{t("tagline")}</h2>
          </div>
        </GsapReveal>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
