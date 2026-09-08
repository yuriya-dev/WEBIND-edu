"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FAQ from "@/components/sections/FAQ";
import GsapReveal from "@/components/shared/GsapReveal";
import { useTranslations, useLocale } from "next-intl";

export default function PricingPage() {
  const t = useTranslations("Pricing");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const registerSlug = locale === "en" ? "register" : "daftar";

  const plans = [
    {
      name: t("starter.name"),
      price: t("starter.price"),
      period: t("starter.period"),
      isPopular: false,
      features: [t("starter.f1"), t("starter.f2"), t("starter.f3"), t("starter.f4")],
    },
    {
      name: t("regular.name"),
      price: t("regular.price"),
      period: t("regular.period"),
      isPopular: true,
      badge: t("bestSeller"),
      features: [t("regular.f1"), t("regular.f2"), t("regular.f3"), t("regular.f4"), t("regular.f5")],
    },
    {
      name: t("intensive.name"),
      price: t("intensive.price"),
      period: t("intensive.period"),
      isPopular: false,
      features: [t("intensive.f1"), t("intensive.f2"), t("intensive.f3"), t("intensive.f4"), t("intensive.f5")],
    },
  ];

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
        </GsapReveal>
      </section>

      <section className="py-12 px-6 max-w-5xl mx-auto">
        <GsapReveal direction="up" stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl flex flex-col justify-between transition-transform duration-300 ${
                plan.isPopular
                  ? "bg-primary text-background scale-105 shadow-xl relative"
                  : "bg-secondary text-primary"
              }`}
            >
              <div>
                {plan.badge && (
                  <span className="inline-block px-3 py-1 bg-accent text-primary text-[10px] font-extrabold tracking-wider uppercase rounded-full mb-3">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <div className="text-3xl font-extrabold mb-1">{plan.price}</div>
                <p className={`text-xs mb-6 ${plan.isPopular ? "text-neutral-400" : "text-text-muted"}`}>{plan.period}</p>

                <ul className="space-y-3 text-xs mb-8 border-t pt-6 border-neutral-300/30">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.isPopular ? "text-accent" : "text-primary"}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/${locale}/${registerSlug}`}
                className={`w-full py-3 rounded-lg text-center text-xs font-bold transition-opacity ${
                  plan.isPopular ? "bg-accent text-primary hover:opacity-90" : "bg-background text-primary hover:bg-neutral-200"
                }`}
              >
                {tCommon("bookNow")}
              </Link>
            </div>
          ))}
        </GsapReveal>
      </section>

      <FAQ />
      <Footer />
    </main>
  );
}
