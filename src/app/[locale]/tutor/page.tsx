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

        {/* Today's Classes List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Today&apos;s Private Classes
            </h2>
            <span className="text-xs font-mono text-text-muted">
              {new Date().toLocaleDateString("id-ID", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>

          <div className="space-y-3">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="bg-secondary p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center font-bold text-base text-primary shrink-0">
                    {cls.studentAvatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-primary">{cls.studentName}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-background text-text-muted">
                        Session {cls.sessionNumber}/{cls.totalSessions}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted font-medium mt-0.5">{cls.program} — {cls.topic}</p>
                    <div className="flex items-center gap-2 text-xs font-mono text-primary mt-1">
                      <Clock className="w-3.5 h-3.5" /> {cls.time}
                    </div>
                  </div>
                </div>

                {/* Actions: Attendance + Meeting Link */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 bg-background p-1 rounded-lg text-xs font-mono">
                    <button
                      onClick={() => toggleAttendance(cls.id, "present")}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        cls.attendanceStatus === "present" ? "bg-emerald-500 text-white font-bold" : "text-text-muted"
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => toggleAttendance(cls.id, "late")}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        cls.attendanceStatus === "late" ? "bg-amber-500 text-white font-bold" : "text-text-muted"
                      }`}
                    >
                      Late
                    </button>
                    <button
                      onClick={() => toggleAttendance(cls.id, "absent")}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        cls.attendanceStatus === "absent" ? "bg-red-500 text-white font-bold" : "text-text-muted"
                      }`}
                    >
                      Absent
                    </button>
                  </div>

                  <a
                    href={cls.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-primary font-bold text-xs hover:opacity-90 transition-opacity"
                  >
                    <Video className="w-4 h-4" /> {t("startMeeting")}
                  </a>
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
