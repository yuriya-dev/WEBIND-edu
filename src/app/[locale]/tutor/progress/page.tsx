"use client";

import TutorLayout from "@/components/dashboard/TutorLayout";
import { mockTutor } from "@/lib/data/tutor";
import { TrendingUp, Award, CheckCircle } from "lucide-react";

export default function TutorProgressPage() {
  return (
    <TutorLayout>
      <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
            Evaluation & Milestones
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-primary mt-1">
            Student Competency Progress
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Review and certify project milestones across all active learning tracks.
          </p>
        </div>

        <div className="space-y-4">
          {mockTutor.students.map((student) => (
            <div key={student.id} className="card-flat space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-primary">{student.name}</h3>
                  <p className="text-xs text-text-muted">{student.program}</p>
                </div>
                <span className="text-xs font-mono font-bold text-primary">{student.progressPercent}% Completed</span>
              </div>

              <div className="w-full h-2.5 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${student.progressPercent}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] text-text-muted pt-1">
                <span>{student.completedSessions} of {student.totalSessions} Sessions</span>
                <span>Status: <strong className="text-primary uppercase font-mono">{student.status}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TutorLayout>
  );
}
