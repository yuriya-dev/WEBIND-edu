"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Code,
  Copy,
  Check,
  Sparkles,
  Award,
  Bookmark,
  Share2,
  Lightbulb,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Menu,
  X,
  Play,
  Terminal,
} from "lucide-react";
import StudentLayout from "@/components/dashboard/StudentLayout";
import { learningMaterialsData, LearningMaterial } from "@/lib/data/learningMaterials";
import { useLocale } from "next-intl";

export default function MaterialReaderPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const materialId = params.materialId as string;

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [completedMaterials, setCompletedMaterials] = useState<string[]>(["algo-flowcharts"]);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [exerciseRunOutput, setExerciseRunOutput] = useState<string | null>(null);

  // Find current material
  const currentMaterialIndex = useMemo(() => {
    const idx = learningMaterialsData.findIndex((m) => m.id === materialId);
    return idx !== -1 ? idx : 0;
  }, [materialId]);

  const currentMaterial: LearningMaterial = learningMaterialsData[currentMaterialIndex];

  const prevMaterial = currentMaterialIndex > 0 ? learningMaterialsData[currentMaterialIndex - 1] : null;
  const nextMaterial = currentMaterialIndex < learningMaterialsData.length - 1 ? learningMaterialsData[currentMaterialIndex + 1] : null;

  const isCurrentCompleted = completedMaterials.includes(currentMaterial.id);

  const handleToggleComplete = () => {
    if (isCurrentCompleted) {
      setCompletedMaterials(completedMaterials.filter((id) => id !== currentMaterial.id));
    } else {
      setCompletedMaterials([...completedMaterials, currentMaterial.id]);
    }
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleQuizSubmit = (optionIndex: number) => {
    setSelectedQuizOption(optionIndex);
    setShowQuizResult(true);
  };

  return (
    <StudentLayout>
      <div className="min-h-screen bg-background">
        {/* Top Header Bar for Reader */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-secondary px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/dashboard/materials`}
              className="p-2 rounded-lg bg-secondary/80 hover:bg-secondary text-primary transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Kembali ke Materi</span>
            </Link>
            <div className="h-4 w-px bg-secondary hidden sm:block" />
            <span className="text-xs font-mono text-text-muted truncate max-w-[200px] sm:max-w-xs">
              {currentMaterial.moduleTitle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle Complete button */}
            <button
              onClick={handleToggleComplete}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isCurrentCompleted
                  ? "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30"
                  : "bg-primary text-background hover:bg-neutral-800"
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCurrentCompleted ? "text-emerald-600" : "text-accent"}`} />
              <span className="hidden sm:inline">
                {isCurrentCompleted ? "Selesai Dibaca" : "Tandai Selesai"}
              </span>
            </button>

            {/* Mobile Syllabus Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-secondary hover:bg-neutral-300 text-primary transition-colors flex items-center gap-1 text-xs font-semibold"
              aria-label="Toggle Syllabus"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Silabus</span>
            </button>
          </div>
        </div>

        {/* Reader Body: Grid 2 Columns (Sidebar Syllabuses + Main Article) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 lg:py-8 flex flex-col lg:flex-row gap-8">
          
          {/* ========================================================= */}
          {/* LEFT: SYLLABUS / TABLE OF CONTENTS (DICODING STYLE)       */}
          {/* ========================================================= */}
          {/* Overlay for mobile drawer */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <aside
            className={`fixed lg:static top-0 bottom-0 left-0 z-50 lg:z-auto w-80 max-w-[85vw] bg-background lg:bg-transparent p-5 lg:p-0 border-r lg:border-r-0 border-secondary lg:w-72 shrink-0 space-y-6 overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${
              isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
            }`}
          >
            <div className="flex items-center justify-between lg:hidden pb-3 border-b border-secondary">
              <span className="font-bold text-sm text-primary">Daftar Materi</span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 rounded-lg bg-secondary text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Course Progress Card */}
            <div className="bg-secondary/40 p-4 rounded-xl border border-secondary space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-primary">Progress Membaca</span>
                <span className="font-mono font-bold text-primary">
                  {completedMaterials.length} / {learningMaterialsData.length} Selesai
                </span>
              </div>
              <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{
                    width: `${(completedMaterials.length / learningMaterialsData.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Modules & Lessons Navigation */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted px-1">
                Daftar Modul Belajar
              </h3>

              <div className="space-y-1.5">
                {learningMaterialsData.map((mat, idx) => {
                  const isActive = mat.id === currentMaterial.id;
                  const isDone = completedMaterials.includes(mat.id);

                  return (
                    <Link
                      key={mat.id}
                      href={`/${locale}/dashboard/materials/${mat.id}`}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-start gap-3 p-3 rounded-xl text-xs transition-all ${
                        isActive
                          ? "bg-primary text-background font-bold shadow-sm"
                          : "text-text-muted hover:bg-secondary hover:text-primary"
                      }`}
                    >
                      <div className="pt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2
                            className={`w-4 h-4 ${isActive ? "text-accent" : "text-emerald-500"}`}
                          />
                        ) : (
                          <Circle
                            className={`w-4 h-4 ${isActive ? "text-accent" : "text-neutral-300"}`}
                          />
                        )}
                      </div>
                      <div className="overflow-hidden space-y-0.5">
                        <div className="truncate font-semibold leading-snug">{mat.title}</div>
                        <div className={`text-[10px] font-mono ${isActive ? "text-neutral-300" : "text-text-muted"}`}>
                          {mat.readTime} · {mat.difficulty}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* RIGHT: MAIN READING CONTENT (DICODING LMS ARTICLE)        */}
          {/* ========================================================= */}
          <article className="flex-1 min-w-0 max-w-3xl space-y-8 pb-16">
            {/* Material Header */}
            <div className="space-y-4 pb-6 border-b border-secondary">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-accent/20 border border-accent/40 text-primary text-[10px] font-bold font-mono uppercase tracking-wider">
                  {currentMaterial.category}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-secondary text-text-muted text-[10px] font-mono font-medium">
                  {currentMaterial.difficulty}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-text-muted">
                  <Clock className="w-3.5 h-3.5" /> {currentMaterial.readTime}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-primary leading-tight">
                {currentMaterial.title}
              </h1>

              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                {currentMaterial.summary}
              </p>

              {/* Author & Published Info */}
              <div className="flex items-center justify-between pt-3 text-xs text-text-muted">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary text-accent flex items-center justify-center font-bold text-xs">
                    {currentMaterial.author.avatar}
                  </div>
                  <div>
                    <span className="font-bold text-primary block">{currentMaterial.author.name}</span>
                    <span className="text-[10px]">{currentMaterial.author.role}</span>
                  </div>
                </div>
                <span className="font-mono text-[11px]">{currentMaterial.publishedDate}</span>
              </div>
            </div>

            {/* Material Content Sections */}
            <div className="space-y-10">
              {currentMaterial.sections.map((section, sIdx) => (
                <section key={section.id} className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-bold text-primary">
                    {section.title}
                  </h2>

                  {/* Paragraphs */}
                  <div className="space-y-3 text-sm sm:text-base text-primary/90 leading-relaxed">
                    {section.content.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Callout Box if exists */}
                  {section.callout && (
                    <div
                      className={`p-4 rounded-xl border flex items-start gap-3 text-xs sm:text-sm ${
                        section.callout.type === "tip"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900"
                          : section.callout.type === "warning"
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-900"
                          : "bg-blue-500/10 border-blue-500/30 text-blue-900"
                      }`}
                    >
                      <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                      <div>
                        <h4 className="font-bold text-primary mb-1">{section.callout.title}</h4>
                        <p className="text-text-muted text-xs leading-relaxed">{section.callout.message}</p>
                      </div>
                    </div>
                  )}

                  {/* Code Snippet Box with Copy & Terminal Output */}
                  {section.codeSnippet && (
                    <div className="rounded-xl overflow-hidden border border-neutral-800 bg-[#141414] text-neutral-100 shadow-md">
                      {/* Code Snippet Top Bar */}
                      <div className="bg-[#1c1c1c] px-4 py-2 flex items-center justify-between border-b border-neutral-800 text-xs font-mono">
                        <div className="flex items-center gap-2 text-neutral-400">
                          <Code className="w-3.5 h-3.5 text-accent" />
                          <span>{section.codeSnippet.filename || "example.py"}</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(section.codeSnippet!.code, sIdx)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors text-[11px]"
                        >
                          {copiedIndex === sIdx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Salin Kode</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Code Lines */}
                      <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed text-[#e6e6e6]">
                        <code>{section.codeSnippet.code}</code>
                      </pre>

                      {/* Terminal Execution Output */}
                      {section.codeSnippet.output && (
                        <div className="bg-[#0c0c0c] border-t border-neutral-800/80 p-3.5 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                            <Terminal className="w-3 h-3 text-accent" /> Output Terminal:
                          </div>
                          <pre className="text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                            {section.codeSnippet.output}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Key Takeaways */}
                  {section.keyTakeaways && (
                    <div className="bg-secondary p-4 rounded-xl space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-primary" /> Rangkuman Penting:
                      </h4>
                      <ul className="space-y-1 text-xs text-text-muted list-disc list-inside">
                        {section.keyTakeaways.map((item, kIdx) => (
                          <li key={kIdx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* ========================================================= */}
            {/* INTERACTIVE QUIZ (DICODING KNOWLEDGE CHECK)               */}
            {/* ========================================================= */}
            {currentMaterial.quiz && (
              <div className="bg-secondary p-6 sm:p-8 rounded-2xl border border-neutral-300 space-y-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary text-accent">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-primary">Cek Pemahaman (Mini Quiz)</h3>
                    <p className="text-xs text-text-muted">Uji pemahamanmu sebelum melanjutkan ke materi berikutnya.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm sm:text-base font-semibold text-primary">
                    {currentMaterial.quiz.question}
                  </p>

                  <div className="space-y-2 pt-2">
                    {currentMaterial.quiz.options.map((option, optIdx) => {
                      const isSelected = selectedQuizOption === optIdx;
                      const isCorrect = optIdx === currentMaterial.quiz?.correctIndex;

                      let btnStyle = "bg-background hover:bg-neutral-200 border-secondary text-primary";
                      if (showQuizResult) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-800 font-bold";
                        } else if (isSelected && !isCorrect) {
                          btnStyle = "bg-rose-500/20 border-rose-500 text-rose-800";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-primary text-background font-bold";
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleQuizSubmit(optIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{option}</span>
                          {showQuizResult && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {showQuizResult && isSelected && !isCorrect && (
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {showQuizResult && (
                    <div
                      className={`p-4 rounded-xl text-xs sm:text-sm mt-4 animate-in fade-in ${
                        selectedQuizOption === currentMaterial.quiz.correctIndex
                          ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-900"
                          : "bg-amber-500/15 border border-amber-500/30 text-amber-900"
                      }`}
                    >
                      <span className="font-bold block mb-1">
                        {selectedQuizOption === currentMaterial.quiz.correctIndex
                          ? "🎉 Jawaban Kamu Benar!"
                          : "💡 Penjelasan:"}
                      </span>
                      <p className="text-xs leading-relaxed">{currentMaterial.quiz.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* INTERACTIVE EXERCISE / CODE PLAYGROUND PREVIEW           */}
            {/* ========================================================= */}
            {currentMaterial.exercise && (
              <div className="bg-[#141414] text-white p-6 sm:p-8 rounded-2xl border border-neutral-800 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-accent" />
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {currentMaterial.exercise.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent text-primary font-bold">
                    Hands-on
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300">
                  {currentMaterial.exercise.instruction}
                </p>

                {/* Starter Code Box */}
                <div className="bg-[#1c1c1c] p-4 rounded-xl font-mono text-xs text-neutral-200 border border-neutral-800">
                  <pre>{currentMaterial.exercise.starterCode}</pre>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => setExerciseRunOutput(currentMaterial.exercise?.expectedOutput || "Program Selesai")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-primary font-bold text-xs hover:opacity-90 transition-opacity"
                  >
                    <Play className="w-3.5 h-3.5 fill-primary" /> Jalankan Solusi
                  </button>

                  <span className="text-[11px] text-neutral-400 italic">
                    Hint: {currentMaterial.exercise.hint}
                  </span>
                </div>

                {exerciseRunOutput && (
                  <div className="p-3 bg-black/60 rounded-xl border border-emerald-500/30 text-xs font-mono text-emerald-400 space-y-1">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Output:</span>
                    <div>{exerciseRunOutput}</div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* BOTTOM LESSON NAVIGATION (PREV / NEXT)                    */}
            {/* ========================================================= */}
            <div className="pt-8 border-t border-secondary flex flex-col sm:flex-row items-center justify-between gap-4">
              {prevMaterial ? (
                <Link
                  href={`/${locale}/dashboard/materials/${prevMaterial.id}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary hover:bg-neutral-300 text-primary text-xs font-semibold w-full sm:w-auto transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <div className="text-left">
                    <span className="text-[10px] text-text-muted block">Materi Sebelumnya</span>
                    <span className="truncate max-w-[160px] block">{prevMaterial.title}</span>
                  </div>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}

              {nextMaterial ? (
                <Link
                  href={`/${locale}/dashboard/materials/${nextMaterial.id}`}
                  onClick={() => {
                    if (!isCurrentCompleted) {
                      setCompletedMaterials([...completedMaterials, currentMaterial.id]);
                    }
                  }}
                  className="flex items-center justify-between gap-2 px-6 py-3 rounded-xl bg-primary text-background text-xs font-semibold w-full sm:w-auto transition-opacity hover:opacity-90 shadow-sm"
                >
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-neutral-400 block">Materi Selanjutnya</span>
                    <span className="truncate max-w-[180px] block">{nextMaterial.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </Link>
              ) : (
                <Link
                  href={`/${locale}/dashboard/materials`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-primary text-xs font-bold w-full sm:w-auto transition-opacity hover:opacity-90 shadow-sm"
                >
                  <Award className="w-4 h-4" />
                  <span>Selesai Seluruh Modul! 🎉</span>
                </Link>
              )}
            </div>
          </article>
        </div>
      </div>
    </StudentLayout>
  );
}
