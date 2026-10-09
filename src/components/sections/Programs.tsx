"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { useTranslations, useLocale } from "next-intl";
import { programs } from "@/lib/data/programs";
import GsapReveal from "@/components/shared/GsapReveal";
import ProgramIcon from "@/components/shared/ProgramIcon";

interface ProgramsProps {
  limit?: number;
  showViewAll?: boolean;
  showHeader?: boolean;
}

export default function Programs({
  limit,
  showViewAll = false,
  showHeader = false,
}: ProgramsProps) {
  const t = useTranslations("Programs");
  const tCommon = useTranslations("Common");
  const locale = (useLocale() || "id") as "id" | "en";
  const programsSlug = locale === "en" ? "programs" : "program";

  const [activeGrade, setActiveGrade] = useState<"all" | "sd" | "smp" | "sma">("all");

  const filteredPrograms = programs.filter((p) => {
    if (activeGrade === "all") return true;
    return p.grades.includes(activeGrade);
  });

  const displayed = limit ? filteredPrograms.slice(0, limit) : filteredPrograms;

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      {/* Header only shown when explicitly enabled (e.g., Homepage) */}
      {showHeader && (
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
      )}

      {/* Grade Selector Tabs */}
      <GsapReveal direction="up" className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {[
          { id: "all", labelId: "Semua Program", labelEn: "All Programs" },
          { id: "sd", labelId: "SD (Kelas 4–6)", labelEn: "Elementary (Grades 4–6)" },
          { id: "smp", labelId: "SMP (Fase D / Kelas 7–9)", labelEn: "Junior High (Grades 7–9)" },
          { id: "sma", labelId: "SMA (Fase E–F / Kelas 10–12)", labelEn: "Senior High (Grades 10–12)" },
        ].map((tab) => {
          const isActive = activeGrade === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveGrade(tab.id as typeof activeGrade)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all ${
                isActive
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "bg-secondary text-neutral-600 hover:text-primary hover:bg-[#d9d9d9]"
              }`}
            >
              {locale === "en" ? tab.labelEn : tab.labelId}
            </button>
          );
        })}
      </GsapReveal>

      {/* Program Cards Grid */}
      <GsapReveal direction="up" stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayed.map((program) => {
          const programT = t.raw(program.titleKey) as Record<string, string>;
          const gradeLabel = program.gradeText[locale] || program.gradeText.id;

          return (
            <Link
              key={program.slug}
              href={`/${locale}/${programsSlug}/${program.slug}`}
              className="card-flat flex flex-col justify-between group hover:bg-[#d9d9d9] transition-all relative border border-neutral-200/80 hover:border-neutral-400"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center border border-neutral-200 shadow-xs group-hover:scale-105 transition-transform">
                    <ProgramIcon slug={program.slug} size={28} weight="duotone" className="text-neutral-900" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-background text-neutral-700 border border-neutral-300">
                    {programT.level}
                  </span>
                </div>

                {/* Grade Label with High Contrast Dark Badge */}
                <div className="mb-3">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-neutral-900 text-white font-mono text-[11px] font-bold tracking-wide shadow-xs">
                    {gradeLabel}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-black transition-colors">
                  {programT.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed mb-4">
                  {programT.desc}
                </p>

                {/* CP Badges */}
                <div className="mb-4 pt-3 border-t border-neutral-300/60">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1.5 font-bold">
                    {locale === "en" ? "Kemendikbud CP Elements:" : "Elemen CP Kemendikbud:"}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {program.cpElements.map((elem) => (
                      <span
                        key={elem.code}
                        title={elem.name}
                        className="text-[10px] px-2 py-0.5 bg-background text-neutral-900 font-mono font-bold rounded border border-neutral-300"
                      >
                        {elem.code}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-300/60 flex items-center justify-between mt-2">
                <span className="text-xs font-mono text-text-muted">
                  {program.sessions} {tCommon("sessions")} · {program.duration}
                </span>
                <span className="text-xs font-bold text-primary inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  {tCommon("viewDetails")} <ArrowRight size={14} weight="bold" />
                </span>
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
            {tCommon("explorePrograms")} <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      )}
    </section>
  );
}
