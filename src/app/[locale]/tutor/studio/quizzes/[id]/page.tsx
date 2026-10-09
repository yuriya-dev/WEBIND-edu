"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";
import TutorLayout from "@/components/dashboard/TutorLayout";
import {
  mockStudioQuizzes,
  QuizItem,
  Question,
  QuestionType,
  getProgramTitle,
} from "@/lib/data/contentStudio";
import { mockTutor } from "@/lib/data/tutor";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Check,
  AlertCircle,
  HelpCircle,
  Code,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";

export default function QuizEditorPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const quizId = params.id as string;

  const initialQuiz =
    mockStudioQuizzes.find((q) => q.id === quizId) || mockStudioQuizzes[0];

  const [quiz, setQuiz] = useState<QuizItem>(initialQuiz);
  const [saveToast, setSaveToast] = useState(false);

  const handleAddQuestion = (type: QuestionType) => {
    const newQ: Question = {
      id: `q-${Date.now()}`,
      type,
      prompt: "Pertanyaan atau instruksi baru...",
      options:
        type === "multiple_choice"
          ? ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"]
          : type === "true_false"
          ? ["Benar", "Salah"]
          : undefined,
      correctAnswer: type === "multiple_choice" ? 0 : type === "true_false" ? "Benar" : "",
      explanation: "Pembahasan mengapa jawaban ini benar...",
      points: 25,
      cpElement: "AP",
      difficulty: "Dasar",
      starterCode: type === "code_task" ? "// Tulis jawaban kode di sini\n" : undefined,
    };

    setQuiz({
      ...quiz,
      questions: [...quiz.questions, newQ],
    });
    toast.success(`Butir soal baru (${type.replace('_', ' ')}) berhasil ditambahkan!`);
  };

  const handleRemoveQuestion = (qId: string) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.filter((q) => q.id !== qId),
    });
    toast.success("Butir soal berhasil dihapus.");
  };

  const handleSave = () => {
    toast.success(`Kuis "${quiz.title}" berhasil disimpan!`);
  };

  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <TutorLayout>
      <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-secondary">
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/tutor/studio`}
              className="p-2 rounded-xl bg-secondary hover:bg-neutral-200 text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary text-background font-bold uppercase">
                  Studio Kuis
                </span>
                <span className="text-xs font-mono text-text-muted">
                  Sesi {quiz.sessionNumber} • {getProgramTitle(quiz.programSlug)}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary mt-1">
                {quiz.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Kuis</span>
            </button>
          </div>
        </div>

        {saveToast && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Bank soal kuis berhasil diperbarui dan disiapkan untuk evaluasi!</span>
            </div>
            <span className="font-mono text-[10px]">Tersimpan di Cloud</span>
          </div>
        )}

        {/* Quiz Meta Info */}
        <div className="bg-background rounded-2xl border border-secondary p-6 space-y-4">
          <h2 className="text-sm font-bold text-primary uppercase font-mono tracking-wider">
            Pengaturan Kuis & Evaluasi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-text-muted">Judul Kuis</label>
              <input
                type="text"
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                className="w-full mt-1.5 p-2.5 text-xs font-semibold rounded-xl bg-secondary/30 border border-secondary text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-text-muted">Batas Waktu (Menit)</label>
              <input
                type="number"
                value={quiz.durationMinutes}
                onChange={(e) => setQuiz({ ...quiz, durationMinutes: Number(e.target.value) })}
                className="w-full mt-1.5 p-2.5 text-xs font-semibold rounded-xl bg-secondary/30 border border-secondary text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-text-muted">KKM / Nilai Lulus (0-100)</label>
              <input
                type="number"
                value={quiz.passingScore}
                onChange={(e) => setQuiz({ ...quiz, passingScore: Number(e.target.value) })}
                className="w-full mt-1.5 p-2.5 text-xs font-semibold rounded-xl bg-secondary/30 border border-secondary text-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between pt-4 border-t border-secondary text-xs text-text-muted font-mono">
            <span>Total Poin: <strong className="text-primary">{totalPoints} poin</strong></span>
            <span>Jumlah Soal: <strong className="text-primary">{quiz.questions.length} butir</strong></span>
            <span>Status: <strong className="text-emerald-700 uppercase">{quiz.status}</strong></span>
          </div>

          {/* Student Assignment Section */}
          <div className="pt-4 border-t border-secondary space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] font-bold text-text-muted uppercase flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-accent" /> Penugasan Murid Bimbingan (Perorangan):
              </span>
              <span className="text-[10px] font-mono text-text-muted">
                {quiz.assignedStudentIds.length === 0
                  ? "Terbuka untuk semua murid"
                  : `Ditugaskan ke ${quiz.assignedStudentIds.length} murid terpilih`}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {mockTutor.students.map((std) => {
                const isAssigned = quiz.assignedStudentIds.includes(std.id);
                return (
                  <button
                    key={std.id}
                    type="button"
                    onClick={() => {
                      const updatedIds = isAssigned
                        ? quiz.assignedStudentIds.filter((id) => id !== std.id)
                        : [...quiz.assignedStudentIds, std.id];
                      setQuiz({ ...quiz, assignedStudentIds: updatedIds });
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
                      isAssigned
                        ? "bg-primary text-background border-primary font-bold shadow-xs"
                        : "bg-secondary/40 text-text-muted border-secondary hover:text-primary hover:bg-secondary"
                    }`}
                  >
                    <span>{std.avatar}</span>
                    <span>{std.name}</span>
                    {isAssigned && <span className="text-accent text-[10px]">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-primary font-mono uppercase tracking-wider">
              Daftar Butir Soal ({quiz.questions.length})
            </h3>

            {/* Quick add dropdown buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted font-medium">Tambah:</span>
              <button
                type="button"
                onClick={() => handleAddQuestion("multiple_choice")}
                className="px-2.5 py-1 text-xs rounded-lg bg-secondary hover:bg-neutral-200 text-primary font-bold"
              >
                + Pilihan Ganda
              </button>
              <button
                type="button"
                onClick={() => handleAddQuestion("true_false")}
                className="px-2.5 py-1 text-xs rounded-lg bg-secondary hover:bg-neutral-200 text-primary font-bold"
              >
                + Benar/Salah
              </button>
              <button
                type="button"
                onClick={() => handleAddQuestion("short_answer")}
                className="px-2.5 py-1 text-xs rounded-lg bg-secondary hover:bg-neutral-200 text-primary font-bold"
              >
                + Isian
              </button>
              <button
                type="button"
                onClick={() => handleAddQuestion("code_task")}
                className="px-2.5 py-1 text-xs rounded-lg bg-secondary hover:bg-neutral-200 text-primary font-bold"
              >
                + Tugas Kode
              </button>
            </div>
          </div>

          {quiz.questions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-background rounded-2xl border border-secondary p-6 space-y-4 shadow-2xs relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-background font-mono text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-secondary uppercase font-bold text-primary">
                    {q.type.replace("_", " ")}
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    Elemen CP: {q.cpElement} • {q.points} Poin
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(q.id)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                  title="Hapus Soal"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="text-xs font-medium text-text-muted">Pertanyaan / Instruksi Soal</label>
                <textarea
                  rows={2}
                  value={q.prompt}
                  onChange={(e) => {
                    const updated = [...quiz.questions];
                    updated[idx].prompt = e.target.value;
                    setQuiz({ ...quiz, questions: updated });
                  }}
                  className="w-full mt-1 p-2.5 text-xs font-semibold rounded-xl bg-secondary/30 border border-secondary text-primary focus:outline-none"
                />
              </div>

              {/* Question Image URL & Device File Upload (Flowchart / Diagram) */}
              <div className="p-3 rounded-xl bg-secondary/20 border border-secondary/60 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>Lampiran Gambar Soal (Flowchart / Diagram):</span>
                  {q.imageUrl && <span className="text-emerald-700 font-bold">✓ Gambar Terpasang</span>}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={q.imageUrl || ""}
                    onChange={(e) => {
                      const updated = [...quiz.questions];
                      updated[idx].imageUrl = e.target.value;
                      setQuiz({ ...quiz, questions: updated });
                    }}
                    placeholder="URL gambar diagram (misal: https://...)"
                    className="w-full p-2 text-xs rounded-lg bg-background border border-secondary text-primary focus:outline-none"
                  />
                  <input
                    type="text"
                    value={q.imageAlt || ""}
                    onChange={(e) => {
                      const updated = [...quiz.questions];
                      updated[idx].imageAlt = e.target.value;
                      setQuiz({ ...quiz, questions: updated });
                    }}
                    placeholder="Teks Alt (Wajib)"
                    className="w-full sm:w-44 p-2 text-xs rounded-lg bg-background border border-secondary text-primary focus:outline-none"
                  />
                  {/* File Upload from Device button */}
                  <label className="shrink-0 px-3 py-2 rounded-lg bg-secondary hover:bg-neutral-200 text-primary font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors">
                    <span>Unggah File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (uploadEvt) => {
                            const dataUrl = uploadEvt.target?.result as string;
                            const updated = [...quiz.questions];
                            updated[idx].imageUrl = dataUrl;
                            updated[idx].imageAlt = file.name;
                            setQuiz({ ...quiz, questions: updated });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
                {q.imageUrl && (
                  <div className="pt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={q.imageUrl}
                      alt={q.imageAlt || "Gambar soal"}
                      className="h-28 rounded-lg object-cover border border-secondary"
                    />
                  </div>
                )}
              </div>

              {/* Options for Multiple Choice */}
              {q.type === "multiple_choice" && q.options && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-text-muted">Pilihan Jawaban (Tandai kunci yang benar):</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs ${
                          q.correctAnswer === optIdx
                            ? "bg-emerald-50 border-emerald-300 font-bold text-emerald-950"
                            : "bg-secondary/20 border-secondary text-primary"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}-correct`}
                          checked={q.correctAnswer === optIdx}
                          onChange={() => {
                            const updated = [...quiz.questions];
                            updated[idx].correctAnswer = optIdx;
                            setQuiz({ ...quiz, questions: updated });
                          }}
                          className="accent-emerald-600"
                        />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const updated = [...quiz.questions];
                            if (updated[idx].options) {
                              updated[idx].options![optIdx] = e.target.value;
                              setQuiz({ ...quiz, questions: updated });
                            }
                          }}
                          className="w-full bg-transparent focus:outline-none text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* True / False */}
              {q.type === "true_false" && (
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="text-text-muted">Kunci Jawaban:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name={`tf-${q.id}`}
                      checked={q.correctAnswer === "Benar"}
                      onChange={() => {
                        const updated = [...quiz.questions];
                        updated[idx].correctAnswer = "Benar";
                        setQuiz({ ...quiz, questions: updated });
                      }}
                      className="accent-emerald-600"
                    />
                    <span>Benar</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name={`tf-${q.id}`}
                      checked={q.correctAnswer === "Salah"}
                      onChange={() => {
                        const updated = [...quiz.questions];
                        updated[idx].correctAnswer = "Salah";
                        setQuiz({ ...quiz, questions: updated });
                      }}
                      className="accent-emerald-600"
                    />
                    <span>Salah</span>
                  </label>
                </div>
              )}

              {/* Code task starter & solution */}
              {q.type === "code_task" && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-text-muted">Kode Awal & Kunci Jawaban Program</label>
                  <textarea
                    rows={3}
                    value={String(q.correctAnswer)}
                    onChange={(e) => {
                      const updated = [...quiz.questions];
                      updated[idx].correctAnswer = e.target.value;
                      setQuiz({ ...quiz, questions: updated });
                    }}
                    className="w-full font-mono text-xs p-3 rounded-xl bg-neutral-900 text-emerald-400 focus:outline-none"
                    placeholder="Contoh solusi kode acuan tutor..."
                  />
                </div>
              )}

              {/* Explanation */}
              <div className="p-3 rounded-xl bg-secondary/50 border border-secondary space-y-1">
                <span className="text-[11px] font-bold text-text-muted">Pembahasan untuk Murid:</span>
                <input
                  type="text"
                  value={q.explanation}
                  onChange={(e) => {
                    const updated = [...quiz.questions];
                    updated[idx].explanation = e.target.value;
                    setQuiz({ ...quiz, questions: updated });
                  }}
                  className="w-full text-xs bg-transparent focus:outline-none text-primary"
                  placeholder="Penjelasan mengapa jawaban ini benar..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </TutorLayout>
  );
}
