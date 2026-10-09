"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  ClipboardCheck,
  Video,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Camera,
} from "lucide-react";
import TutorLayout from "@/components/dashboard/TutorLayout";
import { mockTutor } from "@/lib/data/tutor";
import { useTranslations, useLocale } from "next-intl";

export default function TutorDashboardPage() {
  const t = useTranslations("TutorPortal");
  const locale = useLocale();

  const [classes, setClasses] = useState(mockTutor.todayClasses);

  const toggleAttendance = (classId: string, newStatus: "present" | "late" | "absent") => {
    setClasses((prev) =>
      prev.map((c) => (c.id === classId ? { ...c, attendanceStatus: newStatus } : c))
    );
  };

  return (
    <TutorLayout>
      <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
        {/* Header banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-secondary">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              {t("overview")},
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-primary flex items-center gap-2">
              {mockTutor.name}
            </h1>
            <p className="text-xs text-text-muted mt-1">{mockTutor.title}</p>
          </div>

          <div className="flex gap-3 font-mono text-xs">
            <div className="bg-secondary px-4 py-2 rounded-xl text-center">
              <div className="font-extrabold text-primary text-base">{mockTutor.metrics.totalStudents}</div>
              <div className="text-[9px] text-text-muted uppercase">{t("totalStudents")}</div>
            </div>
            <div className="bg-primary text-background px-4 py-2 rounded-xl text-center">
              <div className="font-extrabold text-accent text-base">{mockTutor.metrics.classesToday}</div>
              <div className="text-[9px] text-neutral-400 uppercase">{t("classesToday")}</div>
            </div>
          </div>
        </div>

        {/* Content Studio Quick Access Banner */}
        <div className="bg-primary text-background p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent text-primary font-black uppercase">
              Fitur Baru
            </span>
            <h2 className="text-lg font-bold text-background flex items-center gap-2">
              Studio Konten Pembelajaran
            </h2>
            <p className="text-xs text-neutral-300 max-w-xl">
              Buat atau sesuaikan materi silabus, butir soal kuis evaluasi, serta buka slide presentasi interaktif dengan catatan privat saat mengajar di rumah murid.
            </p>
          </div>
          <Link
            href={`/${locale}/tutor/studio`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-primary font-bold text-xs hover:opacity-90 transition-opacity shrink-0 shadow-sm"
          >
            <span>Buka Studio Konten</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Today's Classes List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Sesi Tatap Muka Hari Ini (Ke Rumah Siswa)
            </h2>
            <span className="text-xs font-mono text-text-muted">
              {new Date().toLocaleDateString("id-ID", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>

          <div className="space-y-3">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="bg-secondary p-4 sm:p-6 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6"
              >
                <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-background flex items-center justify-center font-bold text-sm sm:text-base text-primary shrink-0 shadow-xs">
                    {cls.studentAvatar}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-primary truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                        {cls.studentName}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-background text-text-muted font-bold shrink-0">
                        Session {cls.sessionNumber}/{cls.totalSessions}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted font-medium break-words line-clamp-2">
                      <span className="font-semibold text-primary/80">{cls.program}</span> — {cls.topic}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-primary pt-0.5">
                      <Clock className="w-3.5 h-3.5 text-text-muted shrink-0" />
                      <span className="text-[11px] sm:text-xs">{cls.time}</span>
                    </div>
                  </div>
                </div>

                {/* Actions: Attendance + Meeting Link */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-300/40">
                  <div className="inline-flex items-center gap-1 bg-background p-1 sm:p-1.5 rounded-xl text-xs font-mono border border-secondary shadow-xs">
                    <button
                      type="button"
                      onClick={() => toggleAttendance(cls.id, "present")}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors font-bold text-[11px] sm:text-xs ${
                        cls.attendanceStatus === "present" ? "bg-emerald-500 text-white shadow-xs" : "text-text-muted hover:text-emerald-700 hover:bg-emerald-50"
                      }`}
                    >
                      Present
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleAttendance(cls.id, "late")}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors font-bold text-[11px] sm:text-xs ${
                        cls.attendanceStatus === "late" ? "bg-amber-500 text-white shadow-xs" : "text-text-muted hover:text-amber-700 hover:bg-amber-50"
                      }`}
                    >
                      Late
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleAttendance(cls.id, "absent")}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors font-bold text-[11px] sm:text-xs ${
                        cls.attendanceStatus === "absent" ? "bg-red-500 text-white shadow-xs" : "text-text-muted hover:text-red-700 hover:bg-red-50"
                      }`}
                    >
                      Absent
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/${locale}/tutor/attendance`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary hover:bg-neutral-200 text-primary font-bold text-xs transition-colors shadow-2xs"
                      title="Beri Catatan & Upload Bukti Foto Sesi"
                    >
                      <Camera className="w-3.5 h-3.5 text-accent" />
                      <span>Catatan & Bukti Foto</span>
                    </Link>

                    <a
                      href={cls.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-accent text-primary font-bold text-xs hover:opacity-90 transition-opacity"
                    >
                      <Video className="w-4 h-4" /> {t("startMeeting")}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="card-flat space-y-2">
            <span className="text-xs font-mono text-text-muted uppercase">{t("avgAttendance")}</span>
            <div className="text-3xl font-black text-primary">{mockTutor.metrics.averageAttendance}%</div>
            <p className="text-[10px] text-text-muted">Across 18 active enrolled students</p>
          </div>

          <div className="card-flat space-y-2">
            <span className="text-xs font-mono text-text-muted uppercase">{t("pendingReviews")}</span>
            <div className="text-3xl font-black text-primary">{mockTutor.metrics.pendingAssignments} Submissions</div>
            <p className="text-[10px] text-text-muted">Requires grading & feedback</p>
          </div>

          <div className="card-flat space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-text-muted uppercase">Student Directory</span>
              <div className="text-xl font-bold text-primary mt-1">Manage 18 Students</div>
            </div>
            <Link
              href={`/${locale}/tutor/students`}
              className="text-xs font-bold text-primary underline flex items-center gap-1 mt-2"
            >
              View Directory <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </TutorLayout>
  );
}
