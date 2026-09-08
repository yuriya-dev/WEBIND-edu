"use client";

import StudentLayout from "@/components/dashboard/StudentLayout";
import { mockStudent } from "@/lib/data/student";
import { Calendar, Clock, Video, User, CheckCircle, AlertCircle } from "lucide-react";

export default function StudentSchedulePage() {
  return (
    <StudentLayout>
      <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
            1-on-1 Private Sessions
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-primary mt-1">
            Class Schedule
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Your upcoming scheduled private classes and meeting links with your tutor.
          </p>
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {mockStudent.schedule.map((session) => (
            <div
              key={session.id}
              className={`p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                session.status === "scheduled" ? "bg-secondary border-l-4 border-accent" : "bg-secondary/50 opacity-80"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-background text-primary">
                    {session.date}
                  </span>
                  <span className="text-xs font-mono text-text-muted">{session.time}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-primary">{session.title}</h3>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <User className="w-3.5 h-3.5" /> Tutor: {session.tutorName} · {session.program}
                </div>
                {session.notes && (
                  <p className="text-xs text-primary/80 italic">Note: {session.notes}</p>
                )}
              </div>

              <div>
                {session.status === "scheduled" ? (
                  <a
                    href={session.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-primary font-bold text-xs hover:opacity-90 transition-opacity shadow-sm"
                  >
                    <Video className="w-4 h-4" /> Open Google Meet
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 font-mono">
                    <CheckCircle className="w-4 h-4 text-emerald-600" /> Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
