"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import TutorLayout from "@/components/dashboard/TutorLayout";
import {
  mockStudioMaterials,
  mockStudioQuizzes,
  mockStudioPresentations,
  mockSessionBundles,
  SessionPackageBundle,
  StudioMaterialItem,
  QuizItem,
  PresentationItem,
  getProgramTitle,
} from "@/lib/data/contentStudio";
import { mockTutor } from "@/lib/data/tutor";
import { programs } from "@/lib/data/programs";
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Presentation,
  Plus,
  Search,
  SlidersHorizontal,
  Clock,
  Layers,
  FileEdit,
  Play,
  Share2,
  Check,
  AlertCircle,
  HelpCircle,
  PackageCheck,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ContentStudioPage() {
  const locale = useLocale();

  const [activeTab, setActiveTab] = useState<"materials" | "quizzes" | "presentations" | "bundles">("materials");
  const [selectedProgram, setSelectedProgram] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Assign modal state
  const [assigningItem, setAssigningItem] = useState<{
    id: string;
    title: string;
    type: "material" | "quiz" | "bundle";
    assignedStudentIds: string[];
  } | null>(null);
  const [assignSuccessToast, setAssignSuccessToast] = useState<string | null>(null);

  // Materials filter
  const filteredMaterials = mockStudioMaterials.filter((m) => {
    const matchesProg = selectedProgram === "all" || m.programSlug === selectedProgram;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.blocks.some((b) => (b.text || "").toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesProg && matchesSearch;
  });

  // Quizzes filter
  const filteredQuizzes = mockStudioQuizzes.filter((q) => {
    const matchesProg = selectedProgram === "all" || q.programSlug === selectedProgram;
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProg && matchesSearch;
  });

  // Presentations filter
  const filteredPresentations = mockStudioPresentations.filter((p) => {
    const matchesProg = selectedProgram === "all" || p.programSlug === selectedProgram;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slides.some((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesProg && matchesSearch;
  });

  // Session Package Bundles filter (Material + Presentation + Quiz per session)
  const filteredBundles = mockSessionBundles.filter((b) => {
    const matchesProg = selectedProgram === "all" || b.programSlug === selectedProgram;
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.programSlug.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProg && matchesSearch;
  });

  return (
    <TutorLayout>
      <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-secondary">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-primary text-background font-bold">
                Tutor Content Suite
              </span>
              <span className="text-xs font-mono text-text-muted">v2.1 • Silabus Merdeka</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-primary mt-2 flex items-center gap-2">
              Studio Konten Pembelajaran <Sparkles className="w-6 h-6 text-accent" />
            </h1>
            <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-2xl">
              Buat, perbarui, dan personalisasi materi pembelajaran, kuis evaluasi otomatis, serta slide presentasi tatap muka untuk murid privatmu.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/${locale}/tutor/studio/${activeTab}/new`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-background text-xs font-bold hover:bg-neutral-800 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 text-accent" />
              <span>
                {activeTab === "materials" && "Buat Materi Baru"}
                {activeTab === "quizzes" && "Buat Kuis Baru"}
                {activeTab === "presentations" && "Buat Slide Baru"}
              </span>
            </Link>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-secondary/60 p-1.5 rounded-2xl border border-secondary">
            <button
              type="button"
              onClick={() => setActiveTab("materials")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "materials"
                  ? "bg-primary text-background shadow-sm"
                  : "text-text-muted hover:text-primary hover:bg-secondary"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Materi & Modul</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-secondary text-primary font-mono ml-1">
                {mockStudioMaterials.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("quizzes")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "quizzes"
                  ? "bg-primary text-background shadow-sm"
                  : "text-text-muted hover:text-primary hover:bg-secondary"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Bank Kuis & Latihan</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-secondary text-primary font-mono ml-1">
                {mockStudioQuizzes.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("presentations")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "presentations"
                  ? "bg-primary text-background shadow-sm"
                  : "text-text-muted hover:text-primary hover:bg-secondary"
              }`}
            >
              <Presentation className="w-4 h-4" />
              <span>Halaman Presentasi Slide</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-secondary text-primary font-mono ml-1">
                {mockStudioPresentations.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("bundles")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "bundles"
                  ? "bg-primary text-background shadow-sm"
                  : "text-text-muted hover:text-primary hover:bg-secondary"
              }`}
            >
              <PackageCheck className="w-4 h-4" />
              <span>Paketan Sesi (Materi + Slide + Kuis)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-secondary text-primary font-mono ml-1">
                {mockSessionBundles.length}
              </span>
            </button>
          </div>

          {/* Filters: Search & Program */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari konten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-background border border-secondary text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="py-2 px-3 text-xs rounded-xl bg-background border border-secondary text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">Semua Program</option>
              {programs.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.titleKey.replace("_", " ").toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TAB 1: MATERI */}
        {activeTab === "materials" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-text-muted font-mono">
              <span>Menampilkan {filteredMaterials.length} materi tersimpan</span>
              <span>Terhubung dengan Silabus 8 Elemen CP</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMaterials.map((mat) => (
                <div
                  key={mat.id}
                  className="bg-background rounded-2xl border border-secondary p-5 hover:border-neutral-400 transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-secondary font-bold text-primary">
                        Sesi {mat.sessionNumber} • {getProgramTitle(mat.programSlug)}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded uppercase font-bold text-[9px] ${
                          mat.status === "published"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {mat.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-primary text-base group-hover:text-neutral-700 transition-colors line-clamp-2">
                      {mat.title}
                    </h3>

                    <p className="text-xs text-text-muted line-clamp-2">
                      Sasaran: {mat.targetAudience} • {mat.blocks.length} blok materi & gambar.
                    </p>

                    {/* Private Tutor Note Sneak Peek */}
                    {mat.blocks.find((b) => b.type === "teacher-note") && (
                      <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 flex items-start gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <p className="line-clamp-2 italic">
                          <span className="font-bold not-italic">Catatan Privat Tutor:</span>{" "}
                          {mat.blocks.find((b) => b.type === "teacher-note")?.text}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-secondary flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-text-muted font-mono text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{mat.readTimeMinutes} menit</span>
                      <span className="text-neutral-300">•</span>
                      <span>{(mat.assignedStudentIds?.length ?? 0) > 0 ? `${mat.assignedStudentIds?.length} murid` : "Semua"}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setAssigningItem({
                            id: mat.id,
                            title: mat.title,
                            type: "material",
                            assignedStudentIds: mat.assignedStudentIds || [],
                          })
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-secondary/80 hover:bg-secondary text-primary font-bold text-xs flex items-center gap-1 transition-colors"
                        title="Tugaskan ke murid perorangan"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Tugaskan</span>
                      </button>

                      <Link
                        href={`/${locale}/tutor/studio/materials/${mat.id}`}
                        className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-neutral-200 text-primary font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <FileEdit className="w-3.5 h-3.5" />
                        <span>Sunting</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: KUIS */}
        {activeTab === "quizzes" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-text-muted font-mono">
              <span>Menampilkan {filteredQuizzes.length} bank kuis & latihan</span>
              <span>Penilaian otomatis & penugasan murid</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-background rounded-2xl border border-secondary p-5 hover:border-neutral-400 transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-secondary font-bold text-primary">
                        Sesi {quiz.sessionNumber} • {getProgramTitle(quiz.programSlug)}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded uppercase font-bold text-[9px] ${
                          quiz.status === "published"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {quiz.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-primary text-base group-hover:text-neutral-700 transition-colors line-clamp-2">
                      {quiz.title}
                    </h3>

                    <p className="text-xs text-text-muted line-clamp-2">
                      {quiz.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                      <span className="px-2 py-0.5 rounded bg-secondary/80">
                        {quiz.questions.length} Butir Soal
                      </span>
                      <span className="px-2 py-0.5 rounded bg-secondary/80">
                        KKM: {quiz.passingScore}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-secondary/80">
                        {quiz.durationMinutes} Menit
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-secondary flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-text-muted">
                      Ditugaskan: {quiz.assignedStudentIds.length > 0 ? `${quiz.assignedStudentIds.length} murid` : "Semua"}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setAssigningItem({
                            id: quiz.id,
                            title: quiz.title,
                            type: "quiz",
                            assignedStudentIds: quiz.assignedStudentIds,
                          })
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-secondary/80 hover:bg-secondary text-primary font-bold text-xs flex items-center gap-1 transition-colors"
                        title="Tugaskan ke murid perorangan"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Tugaskan</span>
                      </button>

                      <Link
                        href={`/${locale}/tutor/studio/quizzes/${quiz.id}`}
                        className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-neutral-200 text-primary font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <FileEdit className="w-3.5 h-3.5" />
                        <span>Kelola Soal</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRESENTASI SLIDE */}
        {activeTab === "presentations" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-text-muted font-mono">
              <span>Menampilkan {filteredPresentations.length} presentasi slide tatap muka</span>
              <span>Mode Presenter Tutor (Layar Penuh & Catatan Privat)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPresentations.map((pres) => (
                <div
                  key={pres.id}
                  className="bg-background rounded-2xl border border-secondary p-5 hover:border-neutral-400 transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-secondary font-bold text-primary">
                        Sesi {pres.sessionNumber} • {getProgramTitle(pres.programSlug)}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded uppercase font-bold text-[9px] ${
                          pres.status === "published"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {pres.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-primary text-base group-hover:text-neutral-700 transition-colors line-clamp-2">
                      {pres.title}
                    </h3>

                    <p className="text-xs text-text-muted">
                      Total {pres.slides.length} slide interaktif • Estimasi {pres.estimatedMinutes} menit mengajar.
                    </p>

                    <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                      <span className="px-2 py-0.5 rounded bg-secondary/80">
                        Offline Ready (Cache)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-secondary/80">
                        Mini Quiz Ready
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-secondary flex items-center justify-between text-xs">
                    <Link
                      href={`/${locale}/tutor/studio/presentations/${pres.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-background font-bold hover:bg-neutral-800 transition-colors text-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-accent" />
                      <span>Mode Presenter</span>
                    </Link>

                    <Link
                      href={`/${locale}/tutor/studio/presentations/${pres.id}?mode=edit`}
                      className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-neutral-200 text-primary font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <FileEdit className="w-3.5 h-3.5" />
                      <span>Sunting</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PAKETAN SESI (BUNDLE MANAJEMEN: MATERI + SLIDE + KUIS) */}
        {activeTab === "bundles" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-text-muted font-mono">
              <span>Menampilkan {filteredBundles.length} paket pembelajaran per sesi</span>
              <span>1 Materi + 1 Slide Presentasi + Bank Kuis Evaluasi</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredBundles.map((bundle) => {
                const mat = mockStudioMaterials.find((m) => m.id === bundle.materialId);
                const pres = mockStudioPresentations.find((p) => p.id === bundle.presentationId);

                return (
                  <div
                    key={bundle.id}
                    className="bg-background rounded-3xl border border-secondary p-6 space-y-5 shadow-xs hover:border-neutral-400 transition-all"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2.5 py-1 rounded-full bg-primary text-background font-bold">
                        {getProgramTitle(bundle.programSlug)} • Sesi {bundle.sessionNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase text-[9px]">
                        {bundle.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-primary">{bundle.title}</h3>
                      <p className="text-xs text-text-muted mt-1">
                        Paket terpadu siap ajar untuk sesi tatap muka 90 menit di rumah murid.
                      </p>
                    </div>

                    {/* Integrated Components Grid */}
                    <div className="grid grid-cols-3 gap-2.5 text-xs">
                      <div className="p-3 rounded-2xl bg-secondary/40 border border-secondary space-y-1">
                        <span className="font-mono text-[10px] text-text-muted uppercase font-bold block flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-accent" /> Modul
                        </span>
                        <div className="font-bold text-primary truncate">
                          {mat ? mat.title : "Tersedia"}
                        </div>
                        <Link
                          href={`/${locale}/tutor/studio/materials/${bundle.materialId}`}
                          className="text-[11px] text-neutral-600 hover:underline block pt-1 font-semibold"
                        >
                          Buka Editor →
                        </Link>
                      </div>

                      <div className="p-3 rounded-2xl bg-secondary/40 border border-secondary space-y-1">
                        <span className="font-mono text-[10px] text-text-muted uppercase font-bold block flex items-center gap-1">
                          <Presentation className="w-3 h-3 text-accent" /> Slide
                        </span>
                        <div className="font-bold text-primary truncate">
                          {pres ? `${pres.slides.length} Slide` : "Tersedia"}
                        </div>
                        <Link
                          href={`/${locale}/tutor/studio/presentations/${bundle.presentationId}`}
                          className="text-[11px] text-neutral-600 hover:underline block pt-1 font-semibold"
                        >
                          Presenter →
                        </Link>
                      </div>

                      <div className="p-3 rounded-2xl bg-secondary/40 border border-secondary space-y-1">
                        <span className="font-mono text-[10px] text-text-muted uppercase font-bold block flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-accent" /> Kuis
                        </span>
                        <div className="font-bold text-primary truncate">
                          {bundle.quizIds.length > 0 ? `${bundle.quizIds.length} Kuis` : "Belum ada"}
                        </div>
                        {bundle.quizIds.length > 0 ? (
                          <Link
                            href={`/${locale}/tutor/studio/quizzes/${bundle.quizIds[0]}`}
                            className="text-[11px] text-neutral-600 hover:underline block pt-1 font-semibold"
                          >
                            Kelola Soal →
                          </Link>
                        ) : (
                          <span className="text-[11px] text-text-muted block pt-1">-</span>
                        )}
                      </div>
                    </div>

                    {/* Student Assignment Info */}
                    <div className="pt-3 border-t border-secondary flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-text-muted font-mono text-[11px]">
                        <UserCheck className="w-3.5 h-3.5 text-primary" />
                        <span>Ditugaskan: {bundle.assignedStudentIds.length > 0 ? `${bundle.assignedStudentIds.length} Murid` : "Semua Murid"}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setAssigningItem({
                            id: bundle.id,
                            title: bundle.title,
                            type: "bundle",
                            assignedStudentIds: bundle.assignedStudentIds,
                          })
                        }
                        className="px-3.5 py-1.5 rounded-xl bg-primary text-background font-bold text-xs hover:bg-neutral-800 transition-colors shadow-xs flex items-center gap-1.5"
                      >
                        <UserCheck className="w-3.5 h-3.5 text-accent" />
                        <span>Tugaskan Paket (Per Murid)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Success Toast */}
        {assignSuccessToast && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-900 text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <span>{assignSuccessToast}</span>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL PENUGASAN MURID PERORANGAN (ASSIGN MODAL DIALOG)    */}
        {/* ========================================================= */}
        {assigningItem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-background rounded-3xl border border-secondary w-full max-w-lg p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in duration-150">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-text-muted">
                    Penugasan Perorangan
                  </span>
                  <h3 className="text-base font-bold text-primary mt-0.5">
                    {assigningItem.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    Pilih murid mana saja yang berhak mengakses dan mempelajari item ini:
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAssigningItem(null)}
                  className="p-1.5 rounded-lg bg-secondary hover:bg-neutral-200 text-text-muted hover:text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Checkboxes List */}
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {mockTutor.students.map((student) => {
                  const isChecked = assigningItem.assignedStudentIds.includes(student.id);

                  return (
                    <div
                      key={student.id}
                      onClick={() => {
                        const updated = isChecked
                          ? assigningItem.assignedStudentIds.filter((id) => id !== student.id)
                          : [...assigningItem.assignedStudentIds, student.id];
                        setAssigningItem({ ...assigningItem, assignedStudentIds: updated });
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? "bg-primary text-background border-primary shadow-xs"
                          : "bg-secondary/40 text-primary border-secondary hover:border-neutral-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                            isChecked ? "bg-accent text-primary" : "bg-background text-primary"
                          }`}
                        >
                          {student.avatar}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold">{student.name}</h4>
                          <p className={`text-[10px] ${isChecked ? "text-neutral-300" : "text-text-muted"}`}>
                            {student.program} • {student.level}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono ${isChecked ? "text-accent" : "text-text-muted"}`}>
                          {isChecked ? "Ditugaskan ✓" : "Tidak"}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                            isChecked
                              ? "bg-accent border-accent text-primary"
                              : "border-neutral-300 bg-background"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-secondary flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setAssigningItem({
                      ...assigningItem,
                      assignedStudentIds: mockTutor.students.map((s) => s.id),
                    })
                  }
                  className="text-xs text-text-muted hover:text-primary font-semibold"
                >
                  Pilih Semua Murid
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAssigningItem(null)}
                    className="px-4 py-2 rounded-xl bg-secondary text-primary font-bold text-xs hover:bg-neutral-200 transition-colors"
                  >
                    Batal
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const count = assigningItem.assignedStudentIds.length;
                      setAssigningItem(null);
                      toast.success(`Berhasil menugaskan "${assigningItem.title}" ke ${count} murid terpilih!`);
                    }}
                    className="px-4 py-2 rounded-xl bg-primary text-background font-bold text-xs hover:bg-neutral-800 transition-colors shadow-xs"
                  >
                    Simpan Penugasan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </TutorLayout>
  );
}
