"use client";

import Link from "next/link";
import {
  Flame,
  CheckCircle2,
  Clock,
  Video,
  FileText,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import StudentLayout from "@/components/dashboard/StudentLayout";
import { mockStudent } from "@/lib/data/student";
import { useTranslations, useLocale } from "next-intl";

export default function StudentDashboardPage() {
  const t = useTranslations("StudentPortal");
  const locale = useLocale();

  return (
    <StudentLayout>
      <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
        {/* Welcome Top Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-secondary">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              {t("welcome")},
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-primary flex items-center gap-2">
              {mockStudent.name} 👋
            </h1>
            <p className="text-xs text-text-muted mt-1">{mockStudent.currentProgram}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-secondary px-4 py-2 rounded-xl flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              <div>
                <div className="text-xs font-bold text-primary">{mockStudent.streakDays} Days</div>
                <div className="text-[10px] text-text-muted uppercase font-mono">{t("streak")}</div>
              </div>
            </div>
            <div className="bg-primary text-background px-4 py-2 rounded-xl flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <div>
                <div className="text-xs font-bold text-background">{mockStudent.progressPercent}%</div>
                <div className="text-[10px] text-neutral-400 uppercase font-mono">{t("progress")}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Lesson Spotlight Card */}
        <div className="bg-primary text-background p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-primary text-[10px] font-black uppercase tracking-wider">
              <Clock className="w-3 h-3" /> {t("nextLesson")} · {mockStudent.nextLesson.date}
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-background">
              {mockStudent.nextLesson.title}
            </h2>
            <p className="text-xs text-neutral-400">
              {mockStudent.nextLesson.program} · {mockStudent.nextLesson.time}
            </p>
          </div>

          <div className="z-10 shrink-0">
            <a
              href={mockStudent.nextLesson.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-primary font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
            >
              <Video className="w-4 h-4" /> {t("joinClass")}
            </a>
          </div>
        </div>

        {/* Grid Stats & Modules Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Learning Progress & Modules */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Bar Card */}
            <div className="card-flat space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-primary">{t("progress")}</h3>
                <span className="text-xs font-mono font-bold text-primary">
                  {mockStudent.completedLessonsCount} / {mockStudent.totalLessonsCount} Lessons
                </span>
              </div>
              <div className="w-full h-3 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${mockStudent.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Modules List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-primary">Course Modules</h3>
                <Link
                  href={`/${locale}/dashboard/learning`}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  {t("viewAll")} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {mockStudent.modules.slice(0, 3).map((mod, idx) => (
                  <div key={mod.id} className="card-flat flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-background flex items-center justify-center text-xs font-bold font-mono">
                        0{idx + 1}
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-primary">{mod.title}</h4>
                        <p className="text-[10px] text-text-muted">{mod.lessons.length} lessons & hands-on exercises</p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full font-mono font-bold bg-background text-primary">
                      {mod.lessons.filter((l) => l.status === "completed").length}/{mod.lessons.length} done
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Tutor Note & Upcoming Assignments */}
          <div className="space-y-6">
            {/* Tutor Note */}
            <div className="card-flat space-y-3 bg-secondary/80 border border-neutral-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">
                  {t("tutorFeedback")}
                </span>
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xs text-primary/90 italic leading-relaxed">
                &ldquo;{mockStudent.tutorNote.message}&rdquo;
              </p>
              <div className="pt-2 border-t border-neutral-300 text-[10px] text-text-muted flex justify-between">
                <span>By {mockStudent.tutorNote.tutorName}</span>
                <span>{mockStudent.tutorNote.date}</span>
              </div>
            </div>

            {/* Assignments */}
            <div className="card-flat space-y-3">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider">
                {t("upcomingAssignments")}
              </h3>
              <div className="space-y-2">
                {mockStudent.assignments.map((asg) => (
                  <div key={asg.id} className="p-3 bg-background rounded-lg space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary">{asg.title}</span>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                          asg.status === "graded"
                            ? "bg-emerald-500/20 text-emerald-700"
                            : "bg-amber-500/20 text-amber-700"
                        }`}
                      >
                        {asg.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-text-muted">Due: {asg.deadline}</p>
                    {asg.score && (
                      <p className="text-[10px] font-bold text-emerald-600">Score: {asg.score}/100</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
