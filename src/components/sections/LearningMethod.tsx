"use client";

import { BookOpen, Code, RocketLaunch, ChartBar, ArrowRight } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import GsapReveal from "@/components/shared/GsapReveal";

export default function LearningMethod() {
  const t = useTranslations("LearningMethod");

  const steps = [
    {
      icon: <BookOpen size={24} weight="duotone" className="text-neutral-900" />,
      title: t("step1_title"),
      desc: t("step1_desc"),
      num: "01",
    },
    {
      icon: <Code size={24} weight="duotone" className="text-neutral-900" />,
      title: t("step2_title"),
      desc: t("step2_desc"),
      num: "02",
    },
    {
      icon: <RocketLaunch size={24} weight="duotone" className="text-neutral-900" />,
      title: t("step3_title"),
      desc: t("step3_desc"),
      num: "03",
    },
    {
      icon: <ChartBar size={24} weight="duotone" className="text-neutral-900" />,
      title: t("step4_title"),
      desc: t("step4_desc"),
      num: "04",
    },
  ];

  return (
    <section className="py-16 bg-secondary px-6">
      <div className="max-w-7xl mx-auto">
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

        <GsapReveal direction="up" stagger={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-background p-6 rounded-xl space-y-4 relative border border-neutral-200 shadow-xs">
              <span className="text-4xl font-extrabold text-primary opacity-10 font-mono absolute top-4 right-4">
                {step.num}
              </span>
              <div className="p-3 bg-secondary rounded-lg w-fit border border-neutral-200">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-primary">{step.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{step.desc}</p>
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-neutral-900 text-white items-center justify-center shadow-xs z-10 border-2 border-background">
                  <ArrowRight size={13} weight="bold" />
                </div>
              )}
            </div>
          ))}
        </GsapReveal>
      </div>
    </section>
  );
}
