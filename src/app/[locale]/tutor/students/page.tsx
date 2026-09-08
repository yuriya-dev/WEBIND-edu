"use client";

import { useState } from "react";
import TutorLayout from "@/components/dashboard/TutorLayout";
import { mockTutor, TutorStudentItem } from "@/lib/data/tutor";
import { Users, Search, Filter, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function TutorStudentsPage() {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<TutorStudentItem | null>(mockTutor.students[0]);

  const filtered = mockTutor.students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.program.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TutorLayout>
      <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
            Student Management
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-primary mt-1">
            Student Directory
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Track individual student progress, attendance rates, session records, and tutor notes.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student by name or program..."
              className="w-full pl-11 pr-4 py-3 bg-secondary rounded-xl text-xs text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* 2-Column: Student list & Selected Profile Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* List */}
          <div className="lg:col-span-7 space-y-3">
            {filtered.map((student) => {
              const isSelected = selectedStudent?.id === student.id;
              return (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-primary text-background border-primary shadow-md"
                      : "bg-secondary text-primary border-transparent hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isSelected ? "bg-accent text-primary" : "bg-background text-primary"
                      }`}
                    >
                      {student.avatar}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold">{student.name}</h3>
                      <p className={`text-[10px] ${isSelected ? "text-neutral-400" : "text-text-muted"}`}>
                        {student.program} · {student.level}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-bold">{student.progressPercent}%</div>
                    <div className={`text-[9px] ${isSelected ? "text-neutral-400" : "text-text-muted"}`}>
                      {student.completedSessions}/{student.totalSessions} Sessions
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Profile Detail Card */}
          {selectedStudent && (
            <div className="lg:col-span-5 bg-secondary p-6 rounded-2xl space-y-6 sticky top-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary text-accent flex items-center justify-center font-bold text-lg">
                  {selectedStudent.avatar}
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary">{selectedStudent.name}</h3>
                  <p className="text-xs text-text-muted">{selectedStudent.email}</p>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-background text-primary font-bold uppercase mt-1 inline-block">
                    {selectedStudent.level}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-neutral-300/60">
                  <span className="text-text-muted">Enrolled Program</span>
                  <span className="font-bold text-primary">{selectedStudent.program}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-300/60">
                  <span className="text-text-muted">Progress</span>
                  <span className="font-mono font-bold text-primary">{selectedStudent.progressPercent}% ({selectedStudent.completedSessions}/{selectedStudent.totalSessions} Sessions)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-300/60">
                  <span className="text-text-muted">Attendance Rate</span>
                  <span className="font-mono font-bold text-emerald-600">{selectedStudent.attendanceRate}%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-300/60">
                  <span className="text-text-muted">Next Session</span>
                  <span className="font-mono font-bold text-primary">{selectedStudent.nextSessionDate}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary uppercase">Tutor Notes & Feedback</label>
                <textarea
                  rows={3}
                  defaultValue={selectedStudent.notes}
                  className="w-full p-3 bg-background rounded-lg text-xs text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                <button
                  onClick={() => alert("Note updated successfully!")}
                  className="w-full py-2 rounded-lg bg-primary text-background text-xs font-bold hover:opacity-90"
                >
                  Update Tutor Note
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </TutorLayout>
  );
}
