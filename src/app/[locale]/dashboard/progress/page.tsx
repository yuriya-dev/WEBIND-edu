"use client";

import StudentLayout from "@/components/dashboard/StudentLayout";
import { mockStudent } from "@/lib/data/student";
import { CheckCircle2, Clock, Circle, Award, BarChart2 } from "lucide-react";

export default function StudentProgressPage() {
  return (
    <StudentLayout>
      <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
            Skill-Based Competency Tracker
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-primary mt-1">
            Learning Progress
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Know exactly what technology skills and concepts you have mastered.
          </p>
        </div>

        {/* Stats 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="card-flat">
            <span className="text-xs font-mono text-text-muted uppercase">Competency Score</span>
            <div className="text-3xl font-black text-primary mt-1">{mockStudent.progressPercent}%</div>
            <p className="text-[10px] text-text-muted mt-1">Based on exercises & tests</p>
          </div>
          <div className="card-flat">
            <span className="text-xs font-mono text-text-muted uppercase">Attendance Rate</span>
            <div className="text-3xl font-black text-primary mt-1">{mockStudent.attendanceRate}%</div>
            <p className="text-[10px] text-text-muted mt-1">8 of 10 sessions attended</p>
          </div>
          <div className="card-flat">
            <span className="text-xs font-mono text-text-muted uppercase">Certification Track</span>
            <div className="text-3xl font-black text-primary mt-1">2 Left</div>
            <p className="text-[10px] text-text-muted mt-1">Until final certificate issue</p>
          </div>
        </div>

        {/* Skill Matrix */}
        <div className="bg-secondary p-6 sm:p-8 rounded-2xl space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-primary flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary" /> Skill Mastery Checklist
          </h2>

          <div className="space-y-3 pt-2">
            {mockStudent.skills.map((skill, idx) => (
              <div
                key={idx}
                className="bg-background p-4 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {skill.status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  ) : skill.status === "in-progress" ? (
                    <Clock className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-neutral-300 shrink-0" />
                  )}
                  <span className="text-xs sm:text-sm font-bold text-primary">{skill.name}</span>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full ${
                    skill.status === "completed"
                      ? "bg-accent text-primary"
                      : skill.status === "in-progress"
                      ? "bg-primary text-background"
                      : "bg-secondary text-text-muted"
                  }`}
                >
                  {skill.status === "completed" ? "Mastered ✓" : skill.status === "in-progress" ? "In Progress ◐" : "Upcoming ○"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
