"use client";

import { useState } from "react";
import TutorLayout from "@/components/dashboard/TutorLayout";
import { mockTutor } from "@/lib/data/tutor";
import { ClipboardCheck, CheckCircle2, User } from "lucide-react";

export default function TutorAttendancePage() {
  const [students, setStudents] = useState(mockTutor.students);

  const markStatus = (id: string, newRate: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, attendanceRate: newRate } : s))
    );
  };

  return (
    <TutorLayout>
      <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
            Attendance Logging System
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-primary mt-1">
            Student Attendance Records
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Record and maintain accurate attendance logs for private sessions.
          </p>
        </div>

        <div className="space-y-3">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-secondary p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center font-bold text-xs text-primary">
                  {student.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary">{student.name}</h3>
                  <p className="text-xs text-text-muted">{student.program} · Last active: {student.lastSessionDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-600">{student.attendanceRate}%</span>
                  <p className="text-[10px] text-text-muted">Attendance Rate</p>
                </div>

                <div className="flex gap-1 bg-background p-1 rounded-lg text-xs font-mono">
                  <button
                    onClick={() => markStatus(student.id, 100)}
                    className="px-2.5 py-1 rounded hover:bg-emerald-500 hover:text-white transition-colors"
                  >
                    Present
                  </button>
                  <button
                    onClick={() => markStatus(student.id, 85)}
                    className="px-2.5 py-1 rounded hover:bg-amber-500 hover:text-white transition-colors"
                  >
                    Late
                  </button>
                  <button
                    onClick={() => markStatus(student.id, 70)}
                    className="px-2.5 py-1 rounded hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Absent
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TutorLayout>
  );
}
