"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import GsapReveal from "@/components/shared/GsapReveal";

export default function FAQ() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
  ];

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto space-y-12">
      <GsapReveal direction="up" className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-text-muted">{t("badge")}</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-primary">{t("title")}</h2>
        <p className="text-sm text-text-muted max-w-xl mx-auto">{t("subtitle")}</p>
      </GsapReveal>

      <GsapReveal direction="up" stagger={0.1} className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-secondary rounded-xl overflow-hidden bg-background">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-5 text-left font-bold text-primary flex items-center justify-between hover:bg-secondary/50 transition-colors"
            >
              <span className="text-sm sm:text-base pr-4">{faq.q}</span>
              <Plus className={`w-5 h-5 shrink-0 text-primary transform transition-transform duration-200 ${openIndex === idx ? "rotate-45" : ""}`} />
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-secondary pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </GsapReveal>
    </section>
  );
}
