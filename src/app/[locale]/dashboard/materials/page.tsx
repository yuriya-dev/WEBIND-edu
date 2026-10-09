"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Download,
  FileCode,
  FileText,
  ExternalLink,
  Code2,
  ChevronRight,
  PlayCircle,
} from "lucide-react";
import StudentLayout from "@/components/dashboard/StudentLayout";
import { learningMaterialsData } from "@/lib/data/learningMaterials";
import { mockStudent } from "@/lib/data/student";
import { useLocale } from "next-intl";

export default function StudentMaterialsPage() {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<"interactive" | "downloads">("interactive");

  const downloadableResources = [
    {
      title: "Python Cheat Sheet & Syntax Guide (PDF)",
      size: "2.4 MB",
      type: "PDF Document",
      icon: FileText,
      description: "Ringkasan cepat sintaks Python, fungsi bawaan, dan operasi string/list.",
    },
    {
      title: "Module 01 - Algorithms & Flowchart Slides",
      size: "8.1 MB",
      type: "Slide Deck",
      icon: FileText,
      description: "Slide presentasi pertemuan private sesi 1 & 2 beserta studi kasus flowchart.",
    },
    {
      title: "Module 02 - Starter Code & Problem Sets (ZIP)",
      size: "1.2 MB",
      type: "Source Code",
      icon: FileCode,
      description: "File latihan Python (.py) untuk menguji kondisi if-else dan perulangan.",
    },
    {
      title: "Python Standard Library Quick Reference",
      size: "Online Guide",
      type: "Web Resource",
      icon: ExternalLink,
      description: "Dokumentasi modul bawaan Python (math, random, datetime, json).",
    },
    {
      title: "Final Project Boilerplate Template",
      size: "540 KB",
      type: "GitHub Starter",
      icon: FileCode,
      description: "Struktur template awal untuk pembuatan mini project CLI / GUI.",
    },
  ];

  return (
    <StudentLayout>
      <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-secondary">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              Webind Academy Portal
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-primary mt-1 flex items-center gap-2">
              Modul & Bahan Belajar 📚
            </h1>
            <p className="text-xs sm:text-sm text-text-muted mt-1">
              Baca materi interaktif online, latihan kode, dan unduh panduan belajar {mockStudent.currentProgram}.
            </p>
          </div>

          {/* Quick Learning Stats */}
          <div className="flex items-center gap-3">
            <div className="bg-secondary px-4 py-2.5 rounded-xl">
              <div className="text-xs font-bold text-primary">{learningMaterialsData.length} Artikel</div>
              <div className="text-[10px] text-text-muted font-mono uppercase">Materi Online</div>
            </div>
            <div className="bg-primary text-background px-4 py-2.5 rounded-xl">
              <div className="text-xs font-bold text-accent">Dicoding Style</div>
              <div className="text-[10px] text-neutral-400 font-mono uppercase">Interactive LMS</div>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 p-1 bg-secondary/80 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "interactive"
                ? "bg-background text-primary shadow-xs"
                : "text-text-muted hover:text-primary"
            }`}
          >
            <BookOpen className="w-4 h-4 text-accent" />
            <span>Materi Bacaan Online ({learningMaterialsData.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("downloads")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "downloads"
                ? "bg-background text-primary shadow-xs"
                : "text-text-muted hover:text-primary"
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Resource & Unduhan ({downloadableResources.length})</span>
          </button>
        </div>

        {/* TAB 1: INTERACTIVE ONLINE MATERIALS (DICODING STYLE) */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Spotlight Banner: Mulai Belajar */}
            <div className="bg-primary text-background p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="space-y-2 z-10 max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-primary text-[10px] font-black uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" /> Rekomendasi Bacaan
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-background">
                  {learningMaterialsData[0].title}
                </h2>
                <p className="text-xs text-neutral-300">
                  {learningMaterialsData[0].summary}
                </p>
              </div>

              <div className="z-10 shrink-0">
                <Link
                  href={`/${locale}/dashboard/materials/${learningMaterialsData[0].id}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-primary font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity shadow-lg"
                >
                  <PlayCircle className="w-4 h-4" /> Mulai Membaca Modul
                </Link>
              </div>
            </div>

            {/* List of Interactive Material Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-primary">Daftar Modul Bacaan Interaktif</h3>
                <span className="text-xs font-mono text-text-muted">
                  Klik untuk membaca langsung di browser
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningMaterialsData.map((mat, idx) => (
                  <Link
                    key={mat.id}
                    href={`/${locale}/dashboard/materials/${mat.id}`}
                    className="card-flat p-5 rounded-2xl border border-secondary flex flex-col justify-between hover:border-primary transition-all group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-background border border-secondary text-primary font-bold">
                          Modul 0{idx + 1} · {mat.category}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-mono text-text-muted">
                          <Clock className="w-3 h-3" /> {mat.readTime}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-primary group-hover:text-primary transition-colors leading-snug">
                        {mat.title}
                      </h4>

                      <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                        {mat.summary}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-secondary/80 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-semibold text-text-muted">
                        Tutor: {mat.author.name}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                        Baca Sekarang <ChevronRight className="w-4 h-4 text-accent" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DOWNLOADABLE RESOURCES */}
        {activeTab === "downloads" && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-primary">File Penunjang & Template Kode</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {downloadableResources.map((mat, idx) => {
                const Icon = mat.icon;
                return (
                  <div key={idx} className="card-flat flex flex-col justify-between p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-background rounded-xl shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-primary">{mat.title}</h4>
                        <p className="text-[10px] text-text-muted mt-0.5">{mat.type} · {mat.size}</p>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">{mat.description}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-secondary/60 flex justify-end">
                      <button
                        onClick={() => alert(`Mengunduh berkas: ${mat.title}`)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-background hover:bg-accent text-primary text-xs font-semibold transition-colors shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" /> Unduh Berkas
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
