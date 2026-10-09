"use client";

import Link from "next/link";
import {
  CheckCircle,
  House,
  VideoCamera,
  Users,
  ArrowUpRight,
} from "@phosphor-icons/react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FAQ from "@/components/sections/FAQ";
import GsapReveal from "@/components/shared/GsapReveal";
import PricingCalculator from "@/components/pricing/PricingCalculator";
import { pricingPrograms, formatRupiah } from "@/lib/data/pricing";
import { useTranslations, useLocale } from "next-intl";

export default function PricingPage() {
  const t = useTranslations("Pricing");
  const tCommon = useTranslations("Common");
  const locale = (useLocale() || "id") as "id" | "en";
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
      isPopular: false,
      features: [t("regular.f1"), t("regular.f2"), t("regular.f3"), t("regular.f4"), t("regular.f5")],
    },
    {
      name: t("intensive.name"),
      price: t("intensive.price"),
      period: t("intensive.period"),
      isPopular: true,
      badge: t("bestSeller"),
      features: [t("intensive.f1"), t("intensive.f2"), t("intensive.f3"), t("intensive.f4"), t("intensive.f5")],
    },
  ];

  const programList = Object.values(pricingPrograms);

  return (
    <main className="min-h-screen bg-background text-primary pt-28">
      <Navbar />

      {/* Hero Header */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-secondary">
        <GsapReveal direction="up">
          <div className="text-xs font-mono font-bold tracking-widest text-primary uppercase border-l-2 border-accent pl-3 mb-6">
            {t("badge")}
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-primary mb-6 max-w-4xl">
            {t("title")}
          </h1>
          <p className="text-lg text-text-muted max-w-2xl leading-relaxed mb-6">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-neutral-800 text-xs font-medium border border-neutral-300">
              <House size={16} weight="duotone" className="text-neutral-900" />
              <span>{locale === "en" ? "Home Tutoring (Zero Transport Fees)" : "Tatap Muka ke Rumah (Bebas Biaya Transport)"}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-neutral-800 text-xs font-medium border border-neutral-300">
              <VideoCamera size={16} weight="duotone" className="text-neutral-900" />
              <span>{locale === "en" ? "Online Backup If Occupied" : "Sesi Fleksibel Daring Jika Berhalangan"}</span>
            </div>
          </div>
        </GsapReveal>
      </section>

      {/* 3 Core Package Cards */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <GsapReveal direction="up" stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-transform duration-300 ${
                plan.isPopular
                  ? "bg-primary text-background scale-105 shadow-xl relative border border-neutral-800"
                  : "bg-secondary text-primary border border-neutral-300/60"
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
                <p className={`text-xs mb-6 ${plan.isPopular ? "text-neutral-400" : "text-text-muted"}`}>
                  {plan.period}
                </p>

                <ul className="space-y-3 text-xs mb-8 border-t pt-6 border-neutral-300/30">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <CheckCircle
                        size={16}
                        weight="fill"
                        className={`shrink-0 mt-0.5 ${plan.isPopular ? "text-accent" : "text-primary"}`}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/${locale}/${registerSlug}`}
                className={`w-full py-3.5 rounded-xl text-center text-xs font-bold transition-opacity inline-flex items-center justify-center gap-1.5 ${
                  plan.isPopular
                    ? "bg-accent text-primary hover:opacity-90 shadow-xs"
                    : "bg-background text-primary hover:bg-neutral-200 border border-neutral-300"
                }`}
              >
                {tCommon("bookNow")} <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>
          ))}
        </GsapReveal>
      </section>

      {/* Interactive Pricing Calculator */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-secondary">
        <GsapReveal direction="up" className="mb-8 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted block mb-2">
            {locale === "en" ? "Custom Estimation" : "Simulasi Biaya Mandiri"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">
            {locale === "en" ? "Calculate Your Tutoring Cost" : "Hitung Estimasi Biaya Belajar"}
          </h2>
        </GsapReveal>

        <GsapReveal direction="up">
          <PricingCalculator locale={locale} />
        </GsapReveal>
      </section>

      {/* Program Summary Table */}
      <section className="py-16 px-6 max-w-6xl mx-auto border-t border-secondary">
        <GsapReveal direction="up" className="mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted block mb-2">
            {locale === "en" ? "Program Rates" : "Tabel Tarif per Program"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
            {locale === "en" ? "Complete Program Price Breakdown" : "Daftar Tarif Lengkap per Program"}
          </h2>
          <p className="text-xs sm:text-sm text-text-muted max-w-2xl">
            {locale === "en"
              ? "All prices reflect 1-on-1 home tutoring sessions (90 mins). Elementary grades receive a 25% discount for 60-min sessions."
              : "Semua harga adalah tarif les privat tatap muka ke rumah (90 menit). Siswa SD mendapatkan penyesuaian 60 menit dengan tarif hemat 25%."}
          </p>
        </GsapReveal>

        <GsapReveal direction="up" className="overflow-x-auto">
          <div className="min-w-[640px] border border-neutral-300 rounded-2xl overflow-hidden bg-background">
            <table className="w-full text-left text-xs">
              <thead className="bg-secondary text-primary font-mono text-[11px] uppercase tracking-wider border-b border-neutral-300">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Program</th>
                  <th className="py-3.5 px-4 font-bold">Sesi</th>
                  <th className="py-3.5 px-4 font-bold">Tarif per Sesi</th>
                  <th className="py-3.5 px-4 font-bold">Paket Bulanan (4 Sesi)</th>
                  <th className="py-3.5 px-4 font-bold">Paket Tuntas (Full Track)</th>
                  <th className="py-3.5 px-4 font-bold">Output Proyek</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {programList.map((prog) => {
                  const monthlyTotal = prog.perSession * 4;
                  const fullTotal = prog.perSession * prog.sessions;
                  return (
                    <tr key={prog.slug} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-4 px-4 font-bold text-primary">
                        {prog.name[locale] || prog.name.id}
                      </td>
                      <td className="py-4 px-4 font-mono text-neutral-600">
                        {prog.sessions} sesi
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-primary">
                        {formatRupiah(prog.perSession)}
                      </td>
                      <td className="py-4 px-4 font-mono text-neutral-700">
                        {formatRupiah(monthlyTotal)}
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-primary">
                        <span className="bg-secondary px-2 py-0.5 rounded">
                          {formatRupiah(fullTotal)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-text-muted text-[11px] max-w-xs leading-relaxed">
                        {prog.portfolioOutput[locale] || prog.portfolioOutput.id}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GsapReveal>
      </section>

      {/* Value Guarantees Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto border-t border-secondary">
        <GsapReveal direction="up" stagger={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-flat p-6 rounded-2xl">
            <House size={24} weight="duotone" className="text-neutral-900 mb-3" />
            <h4 className="font-bold text-sm text-primary mb-1">
              {locale === "en" ? "Zero Transport Fees" : "Tanpa Biaya Transport"}
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              {locale === "en"
                ? "Tutors travel to your home without hidden zone fees or fuel surcharges."
                : "Tutor datang langsung ke rumah Anda tanpa biaya jarak, bensin, atau zona tambahan."}
            </p>
          </div>

          <div className="card-flat p-6 rounded-2xl">
            <VideoCamera size={24} weight="duotone" className="text-neutral-900 mb-3" />
            <h4 className="font-bold text-sm text-primary mb-1">
              {locale === "en" ? "Online Session Flexibility" : "Fleksibel Daring"}
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              {locale === "en"
                ? "If child or tutor is unwell, switch seamlessly to Google Meet so learning never stalls."
                : "Bila anak atau tutor sedang sakit/berhalangan, sesi fleksibel dialihkan online tanpa penalti."}
            </p>
          </div>

          <div className="card-flat p-6 rounded-2xl">
            <Users size={24} weight="duotone" className="text-neutral-900 mb-3" />
            <h4 className="font-bold text-sm text-primary mb-1">
              {locale === "en" ? "Duo 25% Discount" : "Diskon Belajar Berdua (Duo)"}
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              {locale === "en"
                ? "Register together with siblings or classmates and save 25% per student."
                : "Daftar berdua bersama saudara atau teman sekelas, hemat 25% per anak untuk semua paket."}
            </p>
          </div>
        </GsapReveal>
      </section>

      <FAQ limit={6} showViewAll={true} />
      <Footer />
    </main>
  );
}
