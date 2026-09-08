"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, User } from "lucide-react";
import { useTranslations } from "next-intl";
import GsapReveal from "@/components/shared/GsapReveal";

export default function Testimonials() {
  const t = useTranslations("Testimonials");
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    { name: t("t1_name"), role: t("t1_role"), company: t("t1_company"), comment: t("t1_comment"), rating: 5, tag: "Web Dev" },
    { name: t("t2_name"), role: t("t2_role"), company: t("t2_company"), comment: t("t2_comment"), rating: 5, tag: "Python" },
    { name: t("t3_name"), role: t("t3_role"), company: t("t3_company"), comment: t("t3_comment"), rating: 5, tag: "Parent" },
    { name: t("t4_name"), role: t("t4_role"), company: t("t4_company"), comment: t("t4_comment"), rating: 5, tag: "AI Starter" },
    { name: t("t5_name"), role: t("t5_role"), company: t("t5_company"), comment: t("t5_comment"), rating: 5, tag: "Web Dev" },
  ];

  const total = testimonials.length;
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, []);

  const getCardStyle = (index: number) => {
    const diff = (index - activeIndex + total) % total;
    if (diff === 0) return "z-30 scale-105 opacity-100 translate-x-0 shadow-2xl bg-primary text-background border-accent";
    if (diff === 1 || diff === -(total - 1)) return "z-10 scale-95 opacity-60 translate-x-[40%] sm:translate-x-[60%] blur-[0.5px] bg-background text-primary border-secondary hidden sm:flex";
    if (diff === total - 1 || diff === -1) return "z-10 scale-95 opacity-60 -translate-x-[40%] sm:-translate-x-[60%] blur-[0.5px] bg-background text-primary border-secondary hidden sm:flex";
    return "z-0 scale-90 opacity-0 pointer-events-none hidden";
  };

  return (
    <section className="py-20 bg-secondary px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <GsapReveal direction="up" className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-text-muted">{t("badge")}</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-primary">{t("title")}</h2>
          <p className="text-sm text-text-muted max-w-xl mx-auto">{t("subtitle")}</p>
        </GsapReveal>

        <div className="relative min-h-[360px] sm:min-h-[380px] flex items-center justify-center pt-4 pb-8">
          {testimonials.map((item, idx) => {
            const cardStyle = getCardStyle(idx);
            const isActive = (idx - activeIndex + total) % total === 0;
            return (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`absolute w-full max-w-md p-6 sm:p-8 rounded-2xl border transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between ${cardStyle}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full ${isActive ? "bg-accent text-primary" : "bg-secondary text-text-muted"}`}>
                      {item.tag}
                    </span>
                    <Quote className={`w-6 h-6 opacity-40 ${isActive ? "text-accent" : "text-primary"}`} />
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <p className={`text-sm sm:text-base leading-relaxed italic ${isActive ? "text-background/95 font-medium" : "text-primary/80"}`}>
                    &ldquo;{item.comment}&rdquo;
                  </p>
                </div>
                <div className={`flex items-center gap-3 pt-6 border-t ${isActive ? "border-neutral-700" : "border-secondary"}`}>
                  <div className={`w-11 h-11 rounded-full shrink-0 flex items-center justify-center border-2 ${isActive ? "bg-accent/20 border-accent text-accent" : "bg-secondary border-neutral-300 text-primary"}`}>
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isActive ? "text-background" : "text-primary"}`}>{item.name}</h4>
                    <p className={`text-xs ${isActive ? "text-neutral-400" : "text-text-muted"}`}>
                      {item.role}{item.company ? ` · ${item.company}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-6 pt-2">
          <button onClick={handlePrev} className="p-3 rounded-full bg-background hover:bg-neutral-200 text-primary border border-secondary transition-all hover:scale-105 shadow-sm" aria-label="Previous">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button key={idx} onClick={() => setActiveIndex(idx)} className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? "w-8 bg-accent" : "w-2.5 bg-neutral-300 hover:bg-neutral-400"}`} aria-label={`Go to slide ${idx + 1}`} />
            ))}
          </div>
          <button onClick={handleNext} className="p-3 rounded-full bg-background hover:bg-neutral-200 text-primary border border-secondary transition-all hover:scale-105 shadow-sm" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
