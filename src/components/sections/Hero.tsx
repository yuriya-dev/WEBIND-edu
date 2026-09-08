"use client";

import Link from "next/link";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import GsapReveal from "@/components/shared/GsapReveal";
import { useTranslations, useLocale } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const registerSlug = locale === "en" ? "register" : "daftar";
  const programsSlug = locale === "en" ? "programs" : "program";

  return (
    <section className="pt-16 pb-16 px-6 max-w-7xl mx-auto">
      <GsapReveal direction="up" className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-xs font-mono font-bold text-primary uppercase tracking-widest">
          <GraduationCap className="w-4 h-4" />
          {t("badge")}
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-primary leading-[1.1]">
          {t("title")}
          <br />
          <span className="bg-accent px-3 py-1 rounded-md inline-block mt-2">
            {t("highlight")}
          </span>
        </h1>

        <p className="text-text-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          {t("description")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-2 text-xs font-mono text-primary">
          {["Computer Science", "Programming", "Web Development", "AI", "Portfolio"].map((item, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
              {item}
            </span>
          ))}
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}/${programsSlug}`}
            className="px-7 py-3.5 rounded-lg bg-accent text-primary font-bold text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            {t("cta_primary")} <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href={`/${locale}/${registerSlug}`}
            className="px-7 py-3.5 rounded-lg bg-secondary text-primary font-medium text-sm hover:bg-neutral-200 transition-colors"
          >
            {t("cta_secondary")}
          </Link>
        </div>
      </GsapReveal>

      {/* Minimal Stat Banner */}
      <GsapReveal direction="up" delay={0.3} className="mt-16 pt-10 border-t border-secondary max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-3xl font-bold text-primary">1-on-1</div>
          <div className="text-sm text-text-muted mt-1">Private Learning</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary">5</div>
          <div className="text-sm text-text-muted mt-1">Learning Tracks</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary">90 min</div>
          <div className="text-sm text-text-muted mt-1">Per Session</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary">100%</div>
          <div className="text-sm text-text-muted mt-1">Project-Based</div>
        </div>
      </GsapReveal>
    </section>
  );
}
