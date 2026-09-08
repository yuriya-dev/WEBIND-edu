"use client";

import StudentLayout from "@/components/dashboard/StudentLayout";
import { mockStudent } from "@/lib/data/student";
import { CheckCircle2, Circle, Clock, FileText, Code } from "lucide-react";

export default function StudentLearningPage() {
  return (
    <StudentLayout>
      <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
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
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="bg-background p-4 rounded-xl flex items-center justify-between hover:border-accent border border-transparent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {lesson.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                      ) : lesson.status === "in-progress" ? (
                        <div className="w-5 h-5 rounded-full border-2 border-primary border-t-accent animate-spin shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-neutral-300 shrink-0" />
                      )}
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-primary">{lesson.title}</h4>
                        <div className="flex items-center gap-3 text-[10px] text-text-muted mt-0.5">
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
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
