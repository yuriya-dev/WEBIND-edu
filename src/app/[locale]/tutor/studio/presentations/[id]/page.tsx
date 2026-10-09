"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  mockStudioPresentations,
  PresentationItem,
  SlideItem,
  getProgramTitle,
} from "@/lib/data/contentStudio";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Clock,
  Eye,
  EyeOff,
  Sparkles,
  HelpCircle,
  CheckCircle,
  FileText,
  Play,
  Terminal,
  Check,
  RotateCcw,
  ListOrdered,
  Smile,
  Meh,
  Frown,
} from "lucide-react";

export default function PresentationViewerPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const presId = params.id as string;

  const presentation =
    mockStudioPresentations.find((p) => p.id === presId) || mockStudioPresentations[0];

  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);

  // Interactive slide states
  const [selectedMiniQuizOpt, setSelectedMiniQuizOpt] = useState<number | null>(null);
  const [selectedGuessOpt, setSelectedGuessOpt] = useState<number | null>(null);
  const [userOrderedStepIds, setUserOrderedStepIds] = useState<string[]>([]);
  const [stepOrderSubmitted, setStepOrderSubmitted] = useState(false);
  const [editableCodeInput, setEditableCodeInput] = useState<string>("");
  const [runnableOutput, setRunnableOutput] = useState<string | null>(null);
  const [selectedReflection, setSelectedReflection] = useState<"paham" | "ragu" | "belum" | null>(null);

  // Timer counter
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const currentSlide: SlideItem = presentation.slides[currentSlideIdx] || presentation.slides[0];

  // Reset interactive challenges when changing slide
  useEffect(() => {
    setSelectedMiniQuizOpt(null);
    setSelectedGuessOpt(null);
    setStepOrderSubmitted(false);
    setSelectedReflection(null);
    if (currentSlide.stepOrderingChallenge) {
      setUserOrderedStepIds(currentSlide.stepOrderingChallenge.steps.map((s) => s.id));
    }
    if (currentSlide.codeSnippet) {
      setEditableCodeInput(currentSlide.codeSnippet.code);
      setRunnableOutput(null);
    }
  }, [currentSlideIdx, currentSlide]);

  const handleNext = () => {
    if (currentSlideIdx < presentation.slides.length - 1) {
      setCurrentSlideIdx(currentSlideIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx(currentSlideIdx - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlideIdx]);

  // Step ordering move
  const moveStep = (fromIdx: number, toIdx: number) => {
    const updated = [...userOrderedStepIds];
    const item = updated.splice(fromIdx, 1)[0];
    updated.splice(toIdx, 0, item);
    setUserOrderedStepIds(updated);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between selection:bg-accent selection:text-neutral-950">
      {/* Top Bar / Controls */}
      <header className="px-6 py-4 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/tutor/studio`}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent text-neutral-950 font-black uppercase">
                Slide Interaktif v2
              </span>
              <span className="text-xs font-mono text-neutral-400">
                Sesi {presentation.sessionNumber} • {getProgramTitle(presentation.programSlug)}
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
              {presentation.title}
            </h1>
          </div>
        </div>

        {/* Session Timer */}
        <div className="hidden md:flex items-center gap-3 bg-neutral-800/80 px-4 py-1.5 rounded-full border border-neutral-700">
          <Clock className="w-4 h-4 text-accent" />
          <span className="font-mono text-xs font-bold text-neutral-200">
            {formatTimer(timerSeconds)}
          </span>
          <button
            type="button"
            onClick={() => setTimerRunning(!timerRunning)}
            className="text-[10px] font-mono uppercase text-neutral-400 hover:text-white"
          >
            {timerRunning ? "Jeda" : "Mulai"}
          </button>
        </div>

        {/* Right side toggles */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              showSpeakerNotes
                ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                : "bg-neutral-800 text-neutral-400"
            }`}
          >
            {showSpeakerNotes ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span className="hidden sm:inline">Catatan Tutor</span>
          </button>

          <span className="text-xs font-mono font-bold text-neutral-400">
            {currentSlideIdx + 1} / {presentation.slides.length}
          </span>
        </div>
      </header>

      {/* Main Slide Stage & Speaker Notes Grid */}
      <main className="flex-1 flex flex-col lg:flex-row items-stretch p-4 sm:p-8 gap-6 max-w-7xl mx-auto w-full">
        {/* Slide Screen (16:9 feel) */}
        <div className="flex-1 bg-neutral-900 rounded-3xl border border-neutral-800 p-8 sm:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          {/* Slide Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
              <span className="uppercase tracking-widest text-[11px] font-bold text-accent">
                Slide #{currentSlide.slideNumber} • {currentSlide.slideType?.replace("_", " ").toUpperCase() || "CONTENT"}
              </span>
              <span>Webind Edu Tatap Muka</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {currentSlide.title}
            </h2>
          </div>

          {/* Slide Content Body (Dynamic based on slideType) */}
          <div className="my-6 space-y-6">
            {/* 1. Bullets & Image */}
            {currentSlide.bullets && (
              <ul className="space-y-3.5">
                {currentSlide.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base sm:text-xl text-neutral-200">
                    <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {currentSlide.imageUrl && (
              <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 max-w-xl mx-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentSlide.imageUrl}
                  alt={currentSlide.imageAlt || "Slide ilustrasi"}
                  className="w-full h-52 object-cover"
                />
              </div>
            )}

            {/* 2. SLIDE INTERAKTIF: RUNNABLE CODE (USULAN C1) */}
            {currentSlide.slideType === "runnable_code" && currentSlide.codeSnippet && (
              <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-5 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-accent font-bold">Terminal Python (Edit & Jalankan):</span>
                  <button
                    type="button"
                    onClick={() => {
                      setRunnableOutput("Halo Andi, kucingmu bergerak 50 langkah!");
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-neutral-950 font-bold hover:bg-lime-400 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Jalankan Kode</span>
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={editableCodeInput}
                  onChange={(e) => setEditableCodeInput(e.target.value)}
                  className="w-full bg-[#111] p-3 rounded-xl border border-neutral-800 text-emerald-400 font-mono text-xs sm:text-sm focus:outline-none leading-relaxed"
                />

                {runnableOutput && (
                  <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-neutral-200">
                    <span className="text-[10px] text-neutral-500 uppercase block mb-1">
                      Keluaran Eksekusi:
                    </span>
                    <span className="text-emerald-400 font-bold">{runnableOutput}</span>
                  </div>
                )}
              </div>
            )}

            {/* 3. SLIDE INTERAKTIF: TEBAK KELUARAN (USULAN C2) */}
            {currentSlide.slideType === "guess_output" && currentSlide.guessOutputChallenge && (
              <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-4">
                <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase font-mono">
                  <Sparkles className="w-4 h-4" />
                  <span>Tantangan Tebak Keluaran Logika</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-white">
                  {currentSlide.guessOutputChallenge.prompt}
                </p>

                <pre className="p-3.5 rounded-xl bg-neutral-950 text-emerald-300 font-mono text-xs overflow-x-auto border border-neutral-800">
                  {currentSlide.guessOutputChallenge.codeSnippet}
                </pre>

                <div className="grid grid-cols-2 gap-2.5">
                  {currentSlide.guessOutputChallenge.options.map((opt, optIdx) => {
                    const isSelected = selectedGuessOpt === optIdx;
                    const isCorrect = currentSlide.guessOutputChallenge?.correctIndex === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => setSelectedGuessOpt(optIdx)}
                        className={`p-3 rounded-xl border text-xs sm:text-sm text-left transition-all font-semibold flex items-center justify-between ${
                          isSelected
                            ? isCorrect
                              ? "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold"
                              : "bg-rose-950 border-rose-500 text-rose-200 font-bold"
                            : "bg-neutral-900 border-neutral-700 text-neutral-300 hover:border-neutral-500"
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && isCorrect && <span className="text-emerald-400">✓ Benar!</span>}
                      </button>
                    );
                  })}
                </div>

                {selectedGuessOpt !== null && (
                  <p className="text-xs text-neutral-300 pt-2 border-t border-neutral-700 italic">
                    Pembahasan: {currentSlide.guessOutputChallenge.explanation}
                  </p>
                )}
              </div>
            )}

            {/* 4. SLIDE INTERAKTIF: URUTKAN LANGKAH (USULAN C3) */}
            {currentSlide.slideType === "step_ordering" && currentSlide.stepOrderingChallenge && (
              <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-4">
                <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase font-mono">
                  <ListOrdered className="w-4 h-4" />
                  <span>Susun Urutan Algoritma</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-white">
                  {currentSlide.stepOrderingChallenge.prompt}
                </p>

                <div className="space-y-2">
                  {userOrderedStepIds.map((stepId, orderIdx) => {
                    const stepItem = currentSlide.stepOrderingChallenge?.steps.find(
                      (s) => s.id === stepId
                    );
                    return (
                      <div
                        key={stepId}
                        className="p-3 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-between text-xs sm:text-sm"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-accent text-neutral-950 font-bold flex items-center justify-center text-xs font-mono">
                            {orderIdx + 1}
                          </span>
                          <span className="text-neutral-200">{stepItem?.label}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={orderIdx === 0}
                            onClick={() => moveStep(orderIdx, orderIdx - 1)}
                            className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white disabled:opacity-30"
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            disabled={orderIdx === userOrderedStepIds.length - 1}
                            onClick={() => moveStep(orderIdx, orderIdx + 1)}
                            className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white disabled:opacity-30"
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStepOrderSubmitted(true)}
                    className="px-4 py-2 rounded-xl bg-accent text-neutral-950 font-bold text-xs hover:bg-lime-400 transition-colors"
                  >
                    Periksa Urutan
                  </button>

                  {stepOrderSubmitted && (
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      ✓ Algoritma Teratur! Urutan instruksi sudah logis.
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* 5. SLIDE INTERAKTIF: REFLEKSI AKHIR (USULAN C4) */}
            {currentSlide.slideType === "reflection" && currentSlide.reflectionPrompt && (
              <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-4 text-center">
                <p className="text-lg font-bold text-white">
                  {currentSlide.reflectionPrompt.question}
                </p>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedReflection("paham")}
                    className={`p-4 rounded-2xl border text-sm flex flex-col items-center gap-2 transition-all ${
                      selectedReflection === "paham"
                        ? "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold shadow-lg"
                        : "bg-neutral-900 border-neutral-700 hover:border-neutral-500 text-neutral-300"
                    }`}
                  >
                    <Smile className="w-8 h-8 text-emerald-400" />
                    <span>Sangat Paham</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedReflection("ragu")}
                    className={`p-4 rounded-2xl border text-sm flex flex-col items-center gap-2 transition-all ${
                      selectedReflection === "ragu"
                        ? "bg-amber-950 border-amber-500 text-amber-200 font-bold shadow-lg"
                        : "bg-neutral-900 border-neutral-700 hover:border-neutral-500 text-neutral-300"
                    }`}
                  >
                    <Meh className="w-8 h-8 text-amber-400" />
                    <span>Perlu Latihan Lagi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedReflection("belum")}
                    className={`p-4 rounded-2xl border text-sm flex flex-col items-center gap-2 transition-all ${
                      selectedReflection === "belum"
                        ? "bg-rose-950 border-rose-500 text-rose-200 font-bold shadow-lg"
                        : "bg-neutral-900 border-neutral-700 hover:border-neutral-500 text-neutral-300"
                    }`}
                  >
                    <Frown className="w-8 h-8 text-rose-400" />
                    <span>Masih Bingung</span>
                  </button>
                </div>

                {selectedReflection && (
                  <p className="text-xs font-mono text-accent pt-2">
                    ✓ Respon tercatat otomatis untuk draft laporan sesi orang tua!
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Slide Footer */}
          <div className="flex items-center justify-between text-xs text-neutral-500 font-mono pt-4 border-t border-neutral-800/80">
            <span>Gunakan panah kiri / kanan untuk berpindah</span>
            <span>Webind Interactive Deck v2</span>
          </div>
        </div>

        {/* Speaker Notes Sidebar (for Tutor during Home Lesson) */}
        {showSpeakerNotes && (
          <aside className="lg:w-80 bg-neutral-900 rounded-3xl border border-neutral-800 p-6 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-amber-300">
                  Catatan Pembicara Tutor
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 text-amber-100 text-sm leading-relaxed space-y-2">
                <p className="font-medium">{currentSlide.speakerNotes}</p>
              </div>

              <div className="text-[11px] text-neutral-400 space-y-1">
                <p className="font-bold text-neutral-300">Tips Interaksi Tatap Muka:</p>
                <p>• Biarkan murid menyentuh trackpad/mouse dan mencoba tombol di layar sendiri.</p>
                <p>• Jawaban kuis & refleksi langsung tersinkronkan ke laporan sesi.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 text-[10px] font-mono text-neutral-500 text-center">
              Aset tersimpan luring (cache) untuk sesi tanpa koneksi internet.
            </div>
          </aside>
        )}
      </main>

      {/* Bottom Floating Navigation Bar */}
      <footer className="px-6 py-4 bg-neutral-900/90 border-t border-neutral-800 flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentSlideIdx === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-white font-bold text-xs transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <div className="flex items-center gap-1.5 overflow-x-auto max-w-xs px-2">
          {presentation.slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlideIdx(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlideIdx
                  ? "w-8 bg-accent"
                  : "w-2 bg-neutral-700 hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentSlideIdx === presentation.slides.length - 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-neutral-950 font-bold text-xs hover:bg-lime-400 disabled:opacity-40 transition-colors shadow-sm"
        >
          <span>Berikutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}
