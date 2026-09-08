"use client";

import TutorLayout from "@/components/dashboard/TutorLayout";
import { mockTutor } from "@/lib/data/tutor";
import { Calendar, Clock, Video, User } from "lucide-react";

export default function TutorSchedulePage() {
  return (
    <TutorLayout>
      <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
            Teaching Calendar
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-primary mt-1">
            Tutor Class Schedule
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Manage your daily 1-on-1 private class slots and start Google Meet sessions.
          </p>
        </div>

        <div className="space-y-4">
          {mockTutor.todayClasses.map((cls) => (
            <div key={cls.id} className="bg-secondary p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-background text-primary">
                    Today
                  </span>
                  <span className="text-xs font-mono text-text-muted">{cls.time}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-primary">{cls.topic}</h3>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <User className="w-3.5 h-3.5" /> Student: <span className="font-bold text-primary">{cls.studentName}</span> · {cls.program}
                </div>
              </div>

              <a
                href={cls.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-primary font-bold text-xs hover:opacity-90 transition-opacity shadow-sm"
              >
                <Video className="w-4 h-4" /> Start Meet Class
              </a>
            </div>
          ))}
        </div>
      </div>
    </TutorLayout>
  );
}
