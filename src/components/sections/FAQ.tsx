"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "@phosphor-icons/react";
import { useTranslations, useLocale } from "next-intl";
import GsapReveal from "@/components/shared/GsapReveal";

interface FAQProps {
  limit?: number;
  showViewAll?: boolean;
}

export default function FAQ({ limit, showViewAll = false }: FAQProps) {
  const t = useTranslations("FAQ");
  const locale = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const allFaqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
    { q: t("q7"), a: t("a7") },
    { q: t("q8"), a: t("a8") },
    { q: t("q9"), a: t("a9") },
    { q: t("q10"), a: t("a10") },
    { q: t("q11"), a: t("a11") },
    { q: t("q12"), a: t("a12") },
    { q: t("q13"), a: t("a13") },
  ];

  const displayedFaqs = limit ? allFaqs.slice(0, limit) : allFaqs;

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto space-y-12">
      <GsapReveal direction="up" className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-text-muted">{t("badge")}</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-primary">{t("title")}</h2>
        <p className="text-sm text-text-muted max-w-xl mx-auto">{t("subtitle")}</p>
      </GsapReveal>

      <GsapReveal direction="up" stagger={0.06} className="space-y-4">
        {displayedFaqs.map((faq, idx) => (
          <div key={idx} className="border border-neutral-300 rounded-xl overflow-hidden bg-background shadow-2xs">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-5 text-left font-bold text-primary flex items-center justify-between hover:bg-secondary/50 transition-colors"
            >
              <span className="text-sm sm:text-base pr-4 leading-snug">{faq.q}</span>
              <Plus
                size={18}
                weight="bold"
                className={`shrink-0 text-primary transform transition-transform duration-200 ${
                  openIndex === idx ? "rotate-45" : ""
                }`}
              />
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-neutral-200 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </GsapReveal>

      {showViewAll && limit && limit < allFaqs.length && (
        <div className="text-center pt-4">
          <Link
            href={`/${locale}/faq`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-primary font-bold text-xs hover:bg-[#d9d9d9] transition-all border border-neutral-300"
          >
            <span>{t("viewAll")} ({allFaqs.length} {locale === "en" ? "Questions" : "Pertanyaan"})</span>
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      )}
    </section>
  );
}
