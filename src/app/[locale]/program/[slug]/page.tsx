"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  Sparkle,
  Stack,
  WhatsappLogo,
} from "@phosphor-icons/react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import GsapReveal from "@/components/shared/GsapReveal";
import ProgramIcon from "@/components/shared/ProgramIcon";
import { useTranslations, useLocale } from "next-intl";
import { programs } from "@/lib/data/programs";

export default function ProgramDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const locale = (useLocale() || "id") as "id" | "en";
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
          <Link
            href={`/${locale}/${programsSlug}`}
            className="text-sm text-neutral-900 font-bold hover:underline"
          >
            ← {locale === "en" ? "Back to Programs" : "Kembali ke Program"}
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const programT = t.raw(program.titleKey) as Record<string, string>;
  const gradeText = program.gradeText[locale] || program.gradeText.id;
  const prerequisiteText = program.prerequisites[locale] || program.prerequisites.id;
  const outcomeText = program.outcome[locale] || program.outcome.id;

  return (
    <main className="min-h-screen bg-background text-primary pt-28">
      <Navbar />

      {/* Hero / Header */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-secondary">
        <GsapReveal direction="up">
          <Link
            href={`/${locale}/${programsSlug}`}
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft size={16} weight="bold" /> {locale === "en" ? "Back to Programs" : "Kembali ke Katalog Program"}
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center border border-neutral-300">
              <ProgramIcon slug={program.slug} size={36} weight="duotone" className="text-neutral-900" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-secondary text-neutral-800 border border-neutral-300">
                {programT.level}
              </span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-neutral-900 text-white border border-neutral-800">
                {gradeText}
              </span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-secondary text-neutral-800 border border-neutral-300 flex items-center gap-1.5">
                <GraduationCap size={15} weight="duotone" className="text-neutral-900" />
                {locale === "en" ? "Kemendikbud Merdeka" : "Kurikulum Merdeka"}
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-primary mb-6 max-w-4xl">
            {programT.title}
          </h1>
          <p className="text-lg text-text-muted max-w-3xl leading-relaxed">
            {programT.desc}
          </p>
        </GsapReveal>
      </section>

      {/* Program Info Cards */}
      <section className="py-12 px-6 max-w-7xl mx-auto border-b border-secondary">
        <GsapReveal direction="up" stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-flat flex items-start gap-4">
            <Clock size={24} weight="duotone" className="text-neutral-900 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-primary mb-1">
                {locale === "en" ? "Duration" : "Durasi Belajar"}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {program.sessions} {locale === "en" ? "sessions" : "sesi"} · {program.duration}
              </p>
            </div>
          </div>

          <div className="card-flat flex items-start gap-4">
            <Users size={24} weight="duotone" className="text-neutral-900 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-primary mb-1">
                {locale === "en" ? "Format" : "Format Kelas"}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {locale === "en" ? "1-on-1 Private Online (Flexible Schedule)" : "1-on-1 Privat Online (Jadwal Fleksibel)"}
              </p>
            </div>
          </div>

          <div className="card-flat flex items-start gap-4">
            <BookOpen size={24} weight="duotone" className="text-neutral-900 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-primary mb-1">
                {locale === "en" ? "Prerequisites" : "Prasyarat"}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {prerequisiteText}
              </p>
            </div>
          </div>

          <div className="card-flat flex items-start gap-4">
            <Sparkle size={24} weight="duotone" className="text-neutral-900 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-primary mb-1">
                {locale === "en" ? "Target Outcome" : "Hasil Akhir"}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {outcomeText}
              </p>
            </div>
          </div>
        </GsapReveal>
      </section>

      {/* Kemendikbud CP Alignment Highlight */}
      <section className="py-12 px-6 max-w-7xl mx-auto border-b border-secondary">
        <GsapReveal direction="up" className="bg-secondary/70 p-6 sm:p-8 rounded-2xl border border-neutral-300">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap size={22} weight="duotone" className="text-neutral-900" />
            <h3 className="text-base sm:text-lg font-bold text-primary">
              {locale === "en"
                ? "Aligned with Kemendikbudristek Informatics Elements"
                : "Penyelarasan 8 Elemen Capaian Pembelajaran (CP) Kemendikdasmen"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-text-muted mb-6 max-w-3xl leading-relaxed">
            {locale === "en"
              ? "This program directly reinforces the national curriculum learned in school, combined with practical hands-on projects for student portfolios:"
              : "Program ini secara langsung memperkuat materi Informatika yang dipelajari siswa di sekolah dengan pendekatan praktik langsung dan portofolio nyata:"}
          </p>

          <div className="flex flex-wrap gap-2.5">
            {program.cpElements.map((elem) => (
              <div
                key={elem.code}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-neutral-300 text-xs shadow-xs"
              >
                <span className="font-mono font-bold text-neutral-900 bg-secondary px-1.5 py-0.5 rounded text-[11px]">{elem.code}</span>
                <span className="text-primary font-medium">{elem.name}</span>
              </div>
            ))}
          </div>
        </GsapReveal>
      </section>

      {/* Complete Session-by-Session Syllabus */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <GsapReveal direction="up" className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-neutral-600 mb-2">
            <Stack size={16} weight="bold" className="text-neutral-900" />
            {locale === "en" ? "Step-by-step Syllabus" : "Rencana Pembelajaran Sesi per Sesi"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">
            {locale === "en" ? "Detailed Curriculum" : "Silabus Lengkap"}
          </h2>
          <p className="text-sm text-text-muted max-w-2xl">
            {locale === "en"
              ? "Every session combines core concept understanding, guided practice, and tangible project output."
              : "Setiap pertemuan memadukan pemahaman konsep, praktik langsung bersama tutor, dan hasil proyek nyata."}
          </p>
        </GsapReveal>

        <GsapReveal direction="up" stagger={0.05} className="space-y-4">
          {program.syllabus.map((item) => {
            const topic = locale === "en" ? item.topicEn : item.topicId;
            const activity = locale === "en" ? item.activityEn : item.activityId;

            return (
              <div
                key={item.session}
                className="card-flat flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 hover:bg-[#d9d9d9] transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-mono font-extrabold text-primary opacity-30 w-10 shrink-0">
                    {String(item.session).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-bold text-primary">{topic}</h4>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {activity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  <div className="flex flex-wrap gap-1">
                    {item.cp.map((cpCode) => (
                      <span
                        key={cpCode}
                        className="text-[10px] font-mono font-bold px-2 py-0.5 bg-background text-primary rounded border border-neutral-300"
                      >
                        CP: {cpCode}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </GsapReveal>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto mb-12">
        <GsapReveal direction="up">
          <div className="bg-primary text-background p-8 sm:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-background">
                {locale === "en"
                  ? `Ready to master ${programT.title}?`
                  : `Siap memulai program ${programT.title}?`}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {locale === "en"
                  ? "Book a free placement session or consult with our academic advisor via WhatsApp to tailor the pace."
                  : "Daftar sekarang untuk sesi konsultasi & tes penempatan gratis, atau diskusikan kebutuhan anak langsung via WhatsApp."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-lg bg-secondary text-primary font-bold text-sm hover:bg-[#d9d9d9] transition-all inline-flex items-center gap-2"
              >
                <WhatsappLogo size={20} weight="fill" className="text-[#25D366]" /> WhatsApp
              </a>
              <Link
                href={`/${locale}/${registerSlug}`}
                className="px-7 py-3.5 rounded-lg bg-accent text-primary font-bold text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                {tCommon("register")} <ArrowUpRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </GsapReveal>
      </section>

      <Footer />
    </main>
  );
}
