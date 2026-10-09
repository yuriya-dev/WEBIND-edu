"use client";

import Link from "next/link";
import StudentLayout from "@/components/dashboard/StudentLayout";
import { mockStudent } from "@/lib/data/student";
import { learningMaterialsData } from "@/lib/data/learningMaterials";
import { CheckCircle2, Circle, Clock, FileText, Code, BookOpen, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";

export default function StudentLearningPage() {
  const locale = useLocale();

  // Mapping from lessonId to materialId if available
  const lessonToMaterialMap: Record<string, string> = {
    "les-1": "algo-flowcharts",
    "les-2": "python-variables",
    "les-3": "python-conditionals",
    "les-4": "python-loops",
    "les-5": "python-functions",
  };

  return (
    <StudentLayout>
      <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-secondary">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              Course Curriculum & Lessons
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-primary mt-1">
              {mockStudent.currentProgram}
            </h1>
            <p className="text-xs sm:text-sm text-text-muted mt-1">
              Structured step-by-step track: Learn → Practice → Build → Evaluate
            </p>
          </div>

          <Link
            href={`/${locale}/dashboard/materials`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-primary text-xs font-bold hover:opacity-90 transition-opacity w-fit shadow-xs"
          >
            <BookOpen className="w-4 h-4" /> Buka LMS Reader
          </Link>
        </div>

        {/* Modules Accordion list */}
        <div className="space-y-6">
          {mockStudent.modules.map((module, idx) => (
            <div key={module.id} className="bg-secondary p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                    Module 0{idx + 1}
                  </span>
                  <h2 className="text-lg font-bold text-primary">{module.title}</h2>
                  <p className="text-xs text-text-muted mt-0.5">{module.description}</p>
                </div>
              </div>

              {/* Lessons in this module */}
              <div className="space-y-2.5 pt-2">
                {module.lessons.map((lesson) => {
                  const targetMaterialId = lessonToMaterialMap[lesson.id];

                  return (
                    <div
                      key={lesson.id}
                      className="bg-background p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-accent border border-transparent transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="pt-0.5 sm:pt-0 shrink-0">
                          {lesson.status === "completed" ? (
                            <CheckCircle2 className="w-5 h-5 text-accent" />
                          ) : lesson.status === "in-progress" ? (
                            <div className="w-5 h-5 rounded-full border-2 border-primary border-t-accent animate-spin" />
                          ) : (
                            <Circle className="w-5 h-5 text-neutral-300" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-primary">{lesson.title}</h4>
                          <div className="flex flex-wrap items-center gap-3 text-[10px] text-text-muted mt-0.5">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {lesson.duration}
                            </span>
                            {lesson.hasExercise && (
                              <span className="flex items-center gap-1 font-mono text-primary font-semibold">
                                <Code className="w-3 h-3 text-accent" /> Hands-on Exercise
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        {targetMaterialId && (
                          <Link
                            href={`/${locale}/dashboard/materials/${targetMaterialId}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary hover:bg-neutral-300 text-primary text-[11px] font-bold transition-colors"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-primary" /> Baca Materi
                          </Link>
                        )}

                        <span
                          className={`text-[10px] px-2.5 py-1 rounded font-mono font-bold uppercase ${
                            lesson.status === "completed"
                              ? "bg-accent text-primary"
                              : lesson.status === "in-progress"
                              ? "bg-primary text-background"
                              : "bg-secondary text-text-muted"
                          }`}
                        >
                          {lesson.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
