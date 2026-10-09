"use client";

import { useState } from "react";
import {
  Calculator,
  WhatsappLogo,
  CheckCircle,
  House,
  VideoCamera,
  Users,
  User,
  Sparkle,
  GraduationCap,
} from "@phosphor-icons/react";
import {
  pricingPrograms,
  calculatePrice,
  formatRupiah,
  generateWhatsAppPricingUrl,
  type PackageType,
  type StudentCount,
} from "@/lib/data/pricing";

interface PricingCalculatorProps {
  locale: "id" | "en";
}

export default function PricingCalculator({ locale }: PricingCalculatorProps) {
  const [selectedProgram, setSelectedProgram] = useState<string>("coding-starter");
  const [packageType, setPackageType] = useState<PackageType>("full");
  const [studentCount, setStudentCount] = useState<StudentCount>(1);
  const [isElementary, setIsElementary] = useState<boolean>(false);

  const calc = calculatePrice(selectedProgram, packageType, studentCount, isElementary);
  const waUrl = generateWhatsAppPricingUrl(calc, locale);

  const programsList = Object.values(pricingPrograms);

  return (
    <div className="bg-secondary/70 border border-neutral-300 rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto shadow-xs">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-neutral-300/80">
        <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
          <Calculator size={22} weight="duotone" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-primary">
            {locale === "en" ? "Interactive Pricing Calculator" : "Kalkulator Estimasi Biaya Les"}
          </h3>
          <p className="text-xs sm:text-sm text-text-muted">
            {locale === "en"
              ? "Calculate your home tutoring package with transparent, all-in pricing."
              : "Hitung estimasi biaya les tatap muka ke rumah secara transparan dan tanpa biaya tersembunyi."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Select Program */}
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 block mb-2.5">
              1. {locale === "en" ? "Select Program" : "Pilih Program Belajar"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {programsList.map((p) => {
                const isSelected = selectedProgram === p.slug;
                return (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => setSelectedProgram(p.slug)}
                    className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                        : "bg-background text-neutral-800 border-neutral-300 hover:border-neutral-400"
                    }`}
                  >
                    <div className="font-bold">{p.name[locale] || p.name.id}</div>
                    <div className={`text-[10px] ${isSelected ? "text-neutral-300" : "text-text-muted"}`}>
                      {p.sessions} {locale === "en" ? "sessions track" : "sesi pembelajaran"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Select Package Type */}
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 block mb-2.5">
              2. {locale === "en" ? "Package Type" : "Pilihan Jenis Paket"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                {
                  id: "full" as PackageType,
                  labelId: "Paket Tuntas",
                  labelEn: "Full Track",
                  subId: "Sampai Selesai",
                  subEn: "To Completion",
                  badgeId: "Rekomendasi",
                  badgeEn: "Recommended",
                },
                {
                  id: "monthly" as PackageType,
                  labelId: "Paket Bulanan",
                  labelEn: "Monthly Package",
                  subId: "4 Pertemuan",
                  subEn: "4 Sessions",
                },
                {
                  id: "single" as PackageType,
                  labelId: "Sesi Satuan",
                  labelEn: "Single Session",
                  subId: "1 Pertemuan",
                  subEn: "1 Session",
                },
              ].map((pkg) => {
                const isSelected = packageType === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setPackageType(pkg.id)}
                    className={`text-left p-3 rounded-xl border text-xs font-medium transition-all relative ${
                      isSelected
                        ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                        : "bg-background text-neutral-800 border-neutral-300 hover:border-neutral-400"
                    }`}
                  >
                    {pkg.badgeId && (
                      <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded-full bg-accent text-primary text-[9px] font-bold font-mono">
                        {locale === "en" ? pkg.badgeEn : pkg.badgeId}
                      </span>
                    )}
                    <div className="font-bold">{locale === "en" ? pkg.labelEn : pkg.labelId}</div>
                    <div className={`text-[10px] ${isSelected ? "text-neutral-300" : "text-text-muted"}`}>
                      {locale === "en" ? pkg.subEn : pkg.subId}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Number of Students & Grade Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 block mb-2.5">
                3. {locale === "en" ? "Format" : "Jumlah Siswa"}
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStudentCount(1)}
                  className={`flex-1 flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    studentCount === 1
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-background text-neutral-800 border-neutral-300 hover:border-neutral-400"
                  }`}
                >
                  <User size={14} weight="bold" />
                  <span>{locale === "en" ? "1-on-1 Solo" : "Privat (1 Siswa)"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStudentCount(2)}
                  className={`flex-1 flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    studentCount === 2
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-background text-neutral-800 border-neutral-300 hover:border-neutral-400"
                  }`}
                >
                  <Users size={14} weight="bold" />
                  <span>{locale === "en" ? "Duo (-25%)" : "Duo (Hemat 25%)"}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 block mb-2.5">
                4. {locale === "en" ? "Grade Stage" : "Jenjang Siswa"}
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsElementary(false)}
                  className={`flex-1 p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                    !isElementary
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-background text-neutral-800 border-neutral-300 hover:border-neutral-400"
                  }`}
                >
                  {locale === "en" ? "SMP / SMA (90 m)" : "SMP / SMA (90 mnt)"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsElementary(true)}
                  className={`flex-1 p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                    isElementary
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-background text-neutral-800 border-neutral-300 hover:border-neutral-400"
                  }`}
                >
                  {locale === "en" ? "SD (60 m, -25%)" : "SD (60 mnt, -25%)"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Result Column */}
        <div className="lg:col-span-5 bg-background border border-neutral-300 rounded-2xl p-6 flex flex-col justify-between shadow-sm space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-neutral-800">
                {calc.program.name[locale] || calc.program.name.id}
              </span>
              <span className="text-xs font-mono text-text-muted">
                {calc.sessions} {locale === "en" ? "sessions" : "sesi"} ({calc.sessionDuration})
              </span>
            </div>

            {/* Total Display */}
            <div className="mb-4">
              <div className="text-xs text-text-muted mb-1">
                {locale === "en" ? "Total Estimated Investment:" : "Estimasi Total Investasi:"}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                {formatRupiah(calc.grandTotal)}
              </div>
              <div className="text-xs text-neutral-600 mt-1 font-mono">
                {calc.studentCount === 2
                  ? `${formatRupiah(calc.totalPerStudent)} / anak (${formatRupiah(calc.perSessionRate)}/sesi)`
                  : `Setara ${formatRupiah(calc.perSessionRate)} per sesi`}
              </div>
            </div>

            {/* Guarantees & Features */}
            <div className="space-y-2.5 pt-4 border-t border-neutral-200 text-xs text-neutral-700">
              <div className="flex items-start gap-2">
                <House size={16} weight="duotone" className="text-neutral-900 shrink-0 mt-0.5" />
                <span>
                  <strong>{locale === "en" ? "Home Tutoring:" : "Tatap Muka ke Rumah:"}</strong>{" "}
                  {locale === "en" ? "Free transport included (All-in)." : "Bebas biaya transport (All-in)."}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <VideoCamera size={16} weight="duotone" className="text-neutral-900 shrink-0 mt-0.5" />
                <span>
                  <strong>{locale === "en" ? "Online Backup:" : "Fleksibel Daring:"}</strong>{" "}
                  {locale === "en"
                    ? "If occupied or sick, session seamlessly switches online."
                    : "Jika berhalangan hadir fisik, sesi dapat dialihkan ke daring."}
                </span>
              </div>
              {calc.packageType === "full" && (
                <div className="flex items-start gap-2">
                  <GraduationCap size={16} weight="duotone" className="text-neutral-900 shrink-0 mt-0.5" />
                  <span>
                    <strong>{locale === "en" ? "Official Certificate:" : "Sertifikat Kelulusan:"}</strong>{" "}
                    {locale === "en" ? "Includes project hosting & portfolio." : "Termasuk pendampingan portofolio & sertifikat."}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* WhatsApp Action Button */}
          <div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <WhatsappLogo size={18} weight="fill" className="text-[#25D366]" />
              <span>{locale === "en" ? "Consult via WhatsApp" : "Konsultasi / Daftar via WhatsApp"}</span>
            </a>
            <p className="text-[10px] text-center text-text-muted mt-2">
              {locale === "en"
                ? "Schedule and tutor placement confirmed via WhatsApp."
                : "Jadwal dan kecocokan tutor dikonfirmasi langsung via WhatsApp."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
