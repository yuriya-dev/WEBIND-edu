"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { programs } from "@/lib/data/programs";
import GsapReveal from "@/components/shared/GsapReveal";

interface ProgramsProps {
  limit?: number;
  showViewAll?: boolean;
}

export default function Programs({ limit, showViewAll = false }: ProgramsProps) {
  const t = useTranslations("Programs");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const programsSlug = locale === "en" ? "programs" : "program";

  const displayed = limit ? programs.slice(0, limit) : programs;

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <GsapReveal direction="up" className="text-center mb-12 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
          {t("badge")}
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-primary">
          {t("title")}
        </h2>
        <p className="text-sm text-text-muted max-w-xl mx-auto">
          {t("subtitle")}
        </p>
      </GsapReveal>

      <GsapReveal direction="up" stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayed.map((program) => {
          const programT = t.raw(program.titleKey) as Record<string, string>;
          const topics = Object.entries(programT)
            .filter(([k]) => k.startsWith("t"))
            .map(([, v]) => v);

          return (
            <Link
              key={program.slug}
              href={`/${locale}/${programsSlug}/${program.slug}`}
              className="card-flat flex flex-col justify-between group hover:bg-[#d9d9d9] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{program.icon}</span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-background text-text-muted">
                    {programT.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{programT.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed mb-4">
                  {programT.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {topics.slice(0, 4).map((topic, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-1 bg-background text-primary font-mono rounded border border-secondary"
                    >
                      {topic}
                    </span>
                  ))}
                  {topics.length > 4 && (
                    <span className="text-[10px] px-2 py-1 bg-background text-text-muted font-mono rounded">
                      +{topics.length - 4}
                    </span>
                  )}
                </div>
              </div>
              <div className="pt-4 border-t border-neutral-300/50 flex items-center justify-between">
                <span className="text-xs font-mono text-text-muted">
                  {program.sessions} {tCommon("sessions")} · {program.duration}
                </span>
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </GsapReveal>

      {showViewAll && (
        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/${programsSlug}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-primary font-bold text-sm hover:opacity-90 transition-opacity"
          >
            {tCommon("explorePrograms")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
