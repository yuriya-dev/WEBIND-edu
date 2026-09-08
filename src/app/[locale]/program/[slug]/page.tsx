"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock, Users, BookOpen } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CTABanner from "@/components/sections/CTABanner";
import GsapReveal from "@/components/shared/GsapReveal";
import { useTranslations, useLocale } from "next-intl";
import { programs } from "@/lib/data/programs";

export default function ProgramDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const locale = useLocale();
  const t = useTranslations("Programs");
  const tCommon = useTranslations("Common");

  const program = programs.find((p) => p.slug === slug);
  const registerSlug = locale === "en" ? "register" : "daftar";
  const programsSlug = locale === "en" ? "programs" : "program";

  if (!program) {
    return (
      <main className="min-h-screen bg-background text-primary pt-28">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Program Not Found</h1>
          <Link href={`/${locale}/${programsSlug}`} className="text-sm text-accent font-bold hover:underline">
            ← Back to Programs
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const programT = t.raw(program.titleKey) as Record<string, string>;
  const topics = Object.entries(programT)
    .filter(([k]) => k.startsWith("t"))
    .map(([, v]) => v);

  return (
    <main className="min-h-screen bg-background text-primary pt-28">
      <Navbar />

      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-secondary">
        <GsapReveal direction="up">
          <Link
            href={`/${locale}/${programsSlug}`}
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Programs
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">{program.icon}</span>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-secondary text-text-muted">
                {programT.level}
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-primary mb-6 max-w-4xl">
            {programT.title}
          </h1>
          <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
            {programT.desc}
          </p>
        </GsapReveal>
      </section>

      {/* Program Info Cards */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <GsapReveal direction="up" stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-flat flex items-center gap-4">
            <Clock className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-bold text-sm text-primary">Duration</h3>
              <p className="text-xs text-text-muted">{program.duration}</p>
            </div>
          </div>
          <div className="card-flat flex items-center gap-4">
            <BookOpen className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-bold text-sm text-primary">Sessions</h3>
              <p className="text-xs text-text-muted">{program.sessions} sessions</p>
            </div>
          </div>
          <div className="card-flat flex items-center gap-4">
            <Users className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-bold text-sm text-primary">Format</h3>
              <p className="text-xs text-text-muted">1-on-1 Private Online</p>
            </div>
          </div>
        </GsapReveal>
      </section>

      {/* Curriculum */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <GsapReveal direction="up">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Curriculum</h2>
          <div className="space-y-4">
            {topics.map((topic, idx) => (
              <div key={idx} className="bg-secondary p-5 rounded-xl flex items-center gap-4">
                <span className="text-xl font-extrabold text-primary opacity-30 font-mono w-8">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm font-medium text-primary">{topic}</span>
              </div>
            ))}
          </div>
        </GsapReveal>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <GsapReveal direction="up">
          <div className="bg-primary text-background p-8 sm:p-12 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-background mb-2">
                Ready to start {programT.title}?
              </h3>
              <p className="text-xs text-neutral-400">Register now and we&apos;ll help you get started.</p>
            </div>
            <Link
              href={`/${locale}/${registerSlug}`}
              className="px-7 py-3.5 rounded-lg bg-accent text-primary font-bold text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2 shrink-0"
            >
              {tCommon("register")} <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </GsapReveal>
      </section>

      <Footer />
    </main>
  );
}
