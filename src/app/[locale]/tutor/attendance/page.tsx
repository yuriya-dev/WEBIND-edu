"use client";

import { useState } from "react";
import TutorLayout from "@/components/dashboard/TutorLayout";
import { mockTutor, TutorStudentItem, AttendanceHistoryEntry } from "@/lib/data/tutor";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  XCircle,
  Users,
  Filter,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
  Check,
  Search,
  BookOpen,
  MapPin,
  AlertCircle,
  ListFilter,
  MessageSquare,
  ChevronDown,
  Save,
  Camera,
  Upload,
  Trash2,
  Image as ImageIcon,
  ZoomIn,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

export default function TutorAttendancePage() {
  const [students, setStudents] = useState<TutorStudentItem[]>(mockTutor.students);
  const [activeTab, setActiveTab] = useState<"quick_log" | "heatmap" | "history">("quick_log");

  // Filter states
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("all"); // "all" or YYYY-MM-DD
  const [logToast, setLogToast] = useState<string | null>(null);

  // Today reference
  const todayIso = "2026-09-09";

  // Pre-aggregated distinct session dates that actually have attendance records
  const allRecordedDates = Array.from(
    new Set(
      students.flatMap((s) => (s.attendanceHistory || []).map((h) => h.date))
    )
  ).sort().reverse();

  // Generate August & September 2026 calendar days for an intuitive, easy-to-read calendar heatmap
  // Weekdays: Sen, Sel, Rab, Kam, Jum, Sab, Min
  const generateMonthDays = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // 0 for Monday
    const days = [];

    // Empty padding slots
    for (let p = 0; p < firstDayIndex; p++) {
      days.push(null);
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      
      // Calculate attendances on this specific date
      let presentCount = 0;
      let lateCount = 0;
      let absentCount = 0;
      const attendees: { studentName: string; status: string }[] = [];

      students.forEach((s) => {
        const found = (s.attendanceHistory || []).find((h) => h.date === dateStr);
        if (found) {
          if (found.status === "present") presentCount++;
          else if (found.status === "late") lateCount++;
          else if (found.status === "absent") absentCount++;
          attendees.push({ studentName: s.name, status: found.status });
        }
      });

      days.push({
        dayNumber: d,
        date: dateStr,
        totalSessions: presentCount + lateCount + absentCount,
        presentCount,
        lateCount,
        absentCount,
        attendees,
      });
    }

    return days;
  };

  const septemberDays = generateMonthDays(2026, 8); // Sept 2026
  const augustDays = generateMonthDays(2026, 7); // Aug 2026
  const [selectedMonthView, setSelectedMonthView] = useState<"sep" | "aug">("sep");

  // Aggregate all history entries according to filters
  const allHistoryRecords: {
    studentName: string;
    studentAvatar: string;
    program: string;
    entry: AttendanceHistoryEntry;
  }[] = [];

  students.forEach((s) => {
    if (selectedStudentFilter !== "all" && s.id !== selectedStudentFilter) return;
    (s.attendanceHistory || []).forEach((entry) => {
      if (selectedDate === "all" || entry.date === selectedDate) {
        allHistoryRecords.push({
          studentName: s.name,
          studentAvatar: s.avatar,
          program: s.program,
          entry,
        });
      }
    });
  });

  allHistoryRecords.sort((a, b) => new Date(b.entry.date).getTime() - new Date(a.entry.date).getTime());

  // Per-student attendance notes state
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    mockTutor.students.forEach((s) => {
      const todayNote = s.attendanceHistory?.find((h) => h.date === todayIso)?.notes || s.notes || "";
      initial[s.id] = todayNote;
    });
    return initial;
  });

  // Per-student documentation photos state (holds array of image URLs / base64)
  const [editingPhotos, setEditingPhotos] = useState<Record<string, string[]>>(() => {
    const initial: Record<string, string[]> = {};
    mockTutor.students.forEach((s) => {
      const todayEntry = s.attendanceHistory?.find((h) => h.date === todayIso);
      initial[s.id] = todayEntry?.documentationPhotos || [];
    });
    return initial;
  });

  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [activePhotoUploadStudentId, setActivePhotoUploadStudentId] = useState<string | null>(null);
  const [tutorLightboxImage, setTutorLightboxImage] = useState<string | null>(null);

  // Handle uploading photos from device (base64 reader)
  const handleUploadPhoto = (studentId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64Url = uploadEvent.target?.result as string;
        if (base64Url) {
          setEditingPhotos((prev) => {
            const current = prev[studentId] || [];
            return {
              ...prev,
              [studentId]: [...current, base64Url],
            };
          });

          // Also auto-attach to student's today attendance history
          setStudents((prev) =>
            prev.map((s) => {
              if (s.id !== studentId) return s;
              const existingHist = s.attendanceHistory || [];
              const foundIndex = existingHist.findIndex((h) => h.date === todayIso);
              let updatedHist = [...existingHist];
              if (foundIndex >= 0) {
                const prevPhotos = updatedHist[foundIndex].documentationPhotos || [];
                updatedHist[foundIndex] = {
                  ...updatedHist[foundIndex],
                  documentationPhotos: [...prevPhotos, base64Url],
                };
              }
              return {
                ...s,
                attendanceHistory: updatedHist,
              };
            })
          );
        }
      };
      reader.readAsDataURL(file);
    });

    const studentName = students.find((s) => s.id === studentId)?.name || "Murid";
    toast.success(`Foto dokumentasi sesi ${studentName} berhasil diunggah!`);

    // Reset input
    event.target.value = "";
  };

  // Handle removing a photo
  const handleRemovePhoto = (studentId: string, photoIndex: number) => {
    setEditingPhotos((prev) => {
      const current = prev[studentId] || [];
      const updated = current.filter((_, idx) => idx !== photoIndex);
      return {
        ...prev,
        [studentId]: updated,
      };
    });

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        const existingHist = s.attendanceHistory || [];
        const foundIndex = existingHist.findIndex((h) => h.date === todayIso);
        if (foundIndex >= 0) {
          const prevPhotos = existingHist[foundIndex].documentationPhotos || [];
          const updatedPhotos = prevPhotos.filter((_, idx) => idx !== photoIndex);
          const updatedHist = [...existingHist];
          updatedHist[foundIndex] = {
            ...updatedHist[foundIndex],
            documentationPhotos: updatedPhotos,
          };
          return {
            ...s,
            attendanceHistory: updatedHist,
          };
        }
        return s;
      })
    );
    toast.success("Foto dokumentasi berhasil dihapus.");
  };

  // Save student attendance note
  const handleSaveStudentNote = (studentId: string) => {
    const noteText = editingNotes[studentId] || "";
    const studentPhotos = editingPhotos[studentId] || [];

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        const existingHist = s.attendanceHistory || [];
        const foundIndex = existingHist.findIndex((h) => h.date === todayIso);

        let updatedHist = [...existingHist];
        if (foundIndex >= 0) {
          updatedHist[foundIndex] = {
            ...updatedHist[foundIndex],
            notes: noteText,
            documentationPhotos: studentPhotos,
          };
        } else {
          // Add default present entry with note and photos
          updatedHist = [
            {
              date: todayIso,
              status: "present",
              sessionNumber: s.completedSessions + 1,
              topic: `Sesi Tatap Muka: Pertemuan ${s.completedSessions + 1}`,
              durationMinutes: 90,
              notes: noteText,
              documentationPhotos: studentPhotos,
            },
            ...existingHist,
          ];
        }

        return {
          ...s,
          notes: noteText,
          attendanceHistory: updatedHist,
        };
      })
    );

    const studentName = students.find((s) => s.id === studentId)?.name || "Murid";
    toast.success(`Catatan evaluasi & bukti foto untuk ${studentName} berhasil disimpan!`);
  };

  // Mark attendance for student today
  const handleMarkStatus = (
    studentId: string,
    status: "present" | "late" | "absent"
  ) => {
    const studentNote = editingNotes[studentId] || "";

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;

        const existingHist = s.attendanceHistory || [];
        const filteredHist = existingHist.filter((h) => h.date !== todayIso);
        const newHist: AttendanceHistoryEntry = {
          date: todayIso,
          status,
          sessionNumber: s.completedSessions + (status === "absent" ? 0 : 1),
          topic: `Sesi Tatap Muka: Pertemuan ${s.completedSessions + 1}`,
          durationMinutes: status === "present" ? 90 : status === "late" ? 80 : 0,
          notes: studentNote || `Presensi dicatat tutor pada ${todayIso} — status: ${status === "present" ? "Hadir Tepat Waktu" : status === "late" ? "Terlambat" : "Izin/Sakit"}.`,
        };

        const totalAttended = [...filteredHist, newHist].filter(
          (h) => h.status === "present" || h.status === "late"
        ).length;
        const totalRecorded = [...filteredHist, newHist].length;
        const newRate = Math.round((totalAttended / (totalRecorded || 1)) * 100);

        return {
          ...s,
          attendanceRate: newRate,
          lastSessionDate: todayIso,
          attendanceHistory: [newHist, ...filteredHist],
        };
      })
    );

    const studentName = students.find((s) => s.id === studentId)?.name || "Murid";
    const statusLabel = status === "present" ? "HADIR" : status === "late" ? "TERLAMBAT" : "ABSEN/IZIN";
    toast.success(`Presensi ${studentName} hari ini (${statusLabel}) berhasil disimpan!`);
  };

  return (
    <TutorLayout>
      <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-secondary">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              Monitoring Kehadiran & Sesi Tatap Muka
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-primary mt-1">
              Presensi & Rekap Kehadiran 📋
            </h1>
            <p className="text-xs sm:text-sm text-text-muted mt-1">
              Catat kehadiran tatap muka hari ini, telusuri heatmap kalender sesi, dan arsip riwayat presensi per murid.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-secondary px-4 py-2.5 rounded-2xl text-center">
              <div className="text-base font-black font-mono text-emerald-600">96.4%</div>
              <div className="text-[10px] text-text-muted uppercase font-mono">Kehadiran Rata-Rata</div>
            </div>
            <div className="bg-primary text-background px-4 py-2.5 rounded-2xl text-center">
              <div className="text-base font-black font-mono text-accent">{students.length} Murid</div>
              <div className="text-[10px] text-neutral-400 uppercase font-mono">Bimbingan Aktif</div>
            </div>
          </div>
        </div>

        {/* Success Toast */}
        {logToast && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between shadow-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{logToast}</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-700">Tersimpan ke Riwayat & Laporan Wali</span>
          </div>
        )}

        {/* NAVIGATION TABS (Clear UX separation) */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 bg-secondary rounded-2xl border border-secondary">
            <button
              type="button"
              onClick={() => setActiveTab("quick_log")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "quick_log"
                  ? "bg-primary text-background shadow-xs"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>1. Presensi Hari Ini ({todayIso})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("heatmap")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "heatmap"
                  ? "bg-primary text-background shadow-xs"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>2. Kalender & Heatmap Sesi</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("history")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "history"
                  ? "bg-primary text-background shadow-xs"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>3. Riwayat Presensi Lengkap ({allHistoryRecords.length})</span>
            </button>
          </div>

          {/* Quick Info Badge */}
          <div className="text-[11px] font-mono text-text-muted bg-secondary/60 px-3 py-1.5 rounded-xl border border-secondary">
            <span>Sesi Tatap Muka: <strong>Rp0 Transport All-In</strong></span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: QUICK LOGGING PRESENSI HARI INI                     */}
        {/* ========================================================= */}
        {activeTab === "quick_log" && (
          <div className="bg-background rounded-3xl border border-secondary p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent text-primary font-bold uppercase">
                  Tanggal Aktif: {todayIso}
                </span>
                <span className="text-xs font-mono text-text-muted">Klik salah satu tombol status di bawah</span>
              </div>
              <h2 className="text-lg font-bold text-primary mt-1">
                Presensi Murid Hari Ini
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Konfirmasi status kedatangan pengajar di rumah murid. Kehadiran akan otomatis terhitung ke rapor siswa dan notifikasi orang tua.
              </p>
            </div>

            <div className="space-y-4">
              {students.map((student) => {
                const todayStatus = student.attendanceHistory?.find((h) => h.date === todayIso)?.status;
                const todayClass = mockTutor.todayClasses.find((c) => c.studentId === student.id);
                const classTime = todayClass ? todayClass.time : "16:00 - 17:30 WIB";
                const currentSessionNum = student.completedSessions + 1 > student.totalSessions ? student.totalSessions : student.completedSessions + 1;
                const currentTopic = todayClass ? todayClass.topic : student.notes || "Pendalaman Materi & Praktek Kode";

                const isNoteExpanded = expandedNoteId === student.id;
                const studentNoteText = editingNotes[student.id] || "";

                return (
                  <div
                    key={student.id}
                    className="bg-secondary p-4 sm:p-6 rounded-2xl space-y-4 hover:border-neutral-300 border border-transparent transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                      {/* Left: Avatar + Student info + Session Badge + Program/Topic + Time */}
                      <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-background flex items-center justify-center font-bold text-sm sm:text-base text-primary shrink-0 shadow-xs">
                          {student.avatar}
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm sm:text-base font-bold text-primary truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                              {student.name}
                            </h3>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-background text-text-muted font-bold shrink-0">
                              Session {currentSessionNum}/{student.totalSessions}
                            </span>
                          </div>

                          <p className="text-xs text-text-muted font-medium break-words line-clamp-2">
                            <span className="font-semibold text-primary/80">{student.program}</span> — {currentTopic}
                          </p>

                          <div className="flex items-center gap-2 text-xs font-mono text-primary pt-0.5">
                            <Clock className="w-3.5 h-3.5 text-text-muted shrink-0" />
                            <span className="text-[11px] sm:text-xs">{classTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Present / Late / Absent Button Group + Notes Toggle */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-300/40">
                        <div className="inline-flex items-center gap-1 bg-background p-1 sm:p-1.5 rounded-xl text-xs font-mono border border-secondary shadow-xs">
                          <button
                            type="button"
                            onClick={() => handleMarkStatus(student.id, "present")}
                            className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors font-bold text-[11px] sm:text-xs ${
                              todayStatus === "present"
                                ? "bg-emerald-500 text-white shadow-xs"
                                : "text-text-muted hover:text-emerald-700 hover:bg-emerald-50"
                            }`}
                          >
                            Present
                          </button>

                          <button
                            type="button"
                            onClick={() => handleMarkStatus(student.id, "late")}
                            className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors font-bold text-[11px] sm:text-xs ${
                              todayStatus === "late"
                                ? "bg-amber-500 text-white shadow-xs"
                                : "text-text-muted hover:text-amber-700 hover:bg-amber-50"
                            }`}
                          >
                            Late
                          </button>

                          <button
                            type="button"
                            onClick={() => handleMarkStatus(student.id, "absent")}
                            className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors font-bold text-[11px] sm:text-xs ${
                              todayStatus === "absent"
                                ? "bg-red-500 text-white shadow-xs"
                                : "text-text-muted hover:text-red-700 hover:bg-red-50"
                            }`}
                          >
                            Absent
                          </button>
                        </div>

                        {/* Note & Photo Drawer Toggle Button */}
                        <button
                          type="button"
                          onClick={() => setExpandedNoteId(isNoteExpanded ? null : student.id)}
                          className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 border shadow-2xs ${
                            studentNoteText.trim() || (editingPhotos[student.id] && editingPhotos[student.id].length > 0)
                              ? "bg-accent/20 border-accent/40 text-primary"
                              : "bg-background border-secondary text-text-muted hover:text-primary"
                          }`}
                          title="Beri Catatan & Unggah Bukti Foto untuk Siswa / Orang Tua"
                        >
                          <Camera className="w-3.5 h-3.5 shrink-0 text-accent" />
                          <span>
                            {editingPhotos[student.id] && editingPhotos[student.id].length > 0
                              ? `Catatan & ${editingPhotos[student.id].length} Foto`
                              : studentNoteText.trim()
                              ? "Catatan Ada"
                              : "+ Catatan & Foto"}
                          </span>
                          <ChevronDown className={`w-3 h-3 shrink-0 transition-transform ${isNoteExpanded ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Tutor Note & Photo Upload Drawer for this student */}
                    {isNoteExpanded && (
                      <div className="pt-3 border-t border-neutral-300/50 space-y-4 animate-in fade-in duration-150">
                        {/* 1. Evaluasi & Catatan */}
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                            <label className="font-bold text-primary flex items-center gap-1.5">
                              <MessageSquare className="w-3.5 h-3.5 text-accent shrink-0" />
                              <span>Catatan Perkembangan & Evaluasi Sesi Ini:</span>
                            </label>
                            <span className="text-[10px] font-mono text-text-muted">
                              Tampil di rapor siswa & WhatsApp orang tua
                            </span>
                          </div>

                          <textarea
                            rows={2}
                            value={studentNoteText}
                            onChange={(e) =>
                              setEditingNotes({
                                ...editingNotes,
                                [student.id]: e.target.value,
                              })
                            }
                            placeholder={`Tulis catatan untuk ${student.name} (misal: "Sangat antusias, logika percabangan tuntas, siap lanjut ke loop")...`}
                            className="w-full p-2.5 sm:p-3 bg-background rounded-xl text-xs text-primary border border-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none shadow-2xs"
                          />

                          <div className="flex flex-wrap items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                const template = "Materi tuntas dipahami, latihan koding diselesaikan dengan baik.";
                                setEditingNotes({ ...editingNotes, [student.id]: template });
                              }}
                              className="px-2 py-1 rounded-md bg-background hover:bg-neutral-200 text-[10px] text-text-muted font-medium transition-colors"
                            >
                              + Sangat Paham
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const template = "Perlu penguatan konsep logika dan latihan mandiri 15 menit di rumah.";
                                setEditingNotes({ ...editingNotes, [student.id]: template });
                              }}
                              className="px-2 py-1 rounded-md bg-background hover:bg-neutral-200 text-[10px] text-text-muted font-medium transition-colors"
                            >
                              + Perlu Latihan
                            </button>
                          </div>
                        </div>

                        {/* 2. Upload Bukti Foto Dokumentasi Sesi */}
                        <div className="space-y-2 pt-2 border-t border-neutral-200">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                            <label className="font-bold text-primary flex items-center gap-1.5">
                              <Camera className="w-3.5 h-3.5 text-accent shrink-0" />
                              <span>Upload Bukti Foto Sesi (Tatap Muka / Hasil Koding):</span>
                            </label>
                            <span className="text-[10px] font-mono text-text-muted">
                              {(editingPhotos[student.id] || []).length} Foto Terpilih
                            </span>
                          </div>

                          {/* Image preview grid & upload drop zone */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {(editingPhotos[student.id] || []).map((imgUrl, pIdx) => (
                              <div
                                key={pIdx}
                                className="group relative aspect-video rounded-xl overflow-hidden border border-secondary bg-neutral-900 shadow-2xs"
                              >
                                <img
                                  src={imgUrl}
                                  alt={`Bukti Sesi ${pIdx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setTutorLightboxImage(imgUrl)}
                                    className="p-1 rounded-md bg-neutral-800 text-white hover:bg-neutral-700"
                                    title="Perbesar"
                                  >
                                    <ZoomIn className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(student.id, pIdx)}
                                    className="p-1 rounded-md bg-red-600 text-white hover:bg-red-700"
                                    title="Hapus foto ini"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <div className="absolute bottom-1 left-1 bg-neutral-900/80 text-[8px] font-mono text-white px-1.5 py-0.5 rounded">
                                  Foto #{pIdx + 1}
                                </div>
                              </div>
                            ))}

                            {/* Upload Button */}
                            <label className="aspect-video rounded-xl border border-dashed border-neutral-300 hover:border-primary bg-background hover:bg-secondary/40 transition-colors flex flex-col items-center justify-center p-2 text-center cursor-pointer group">
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => handleUploadPhoto(student.id, e)}
                                className="hidden"
                              />
                              <Upload className="w-4 h-4 text-text-muted group-hover:text-primary mb-1 transition-colors" />
                              <span className="text-[10px] font-bold text-primary">Upload Foto</span>
                              <span className="text-[9px] text-text-muted font-mono">PNG / JPG</span>
                            </label>
                          </div>
                        </div>

                        {/* Save Button for Drawer */}
                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleSaveStudentNote(student.id)}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-background text-xs font-bold hover:bg-neutral-800 transition-colors shadow-2xs"
                          >
                            <Save className="w-3.5 h-3.5 text-accent" />
                            <span>Simpan Catatan & Foto Sesi</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: KALENDER & HEATMAP SESI BULANAN                    */}
        {/* ========================================================= */}
        {activeTab === "heatmap" && (
          <div className="bg-background rounded-3xl border border-secondary p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-primary flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500 fill-orange-500" /> Kalender Heatmap Sesi Mengajar
                </h2>
                <p className="text-xs text-text-muted mt-0.5">
                  Tampilan kalender bulanan yang jelas. Tanggal berwarna hijau menandakan adanya sesi les yang terlaksana.
                </p>
              </div>

              {/* Month Selector Buttons */}
              <div className="flex items-center gap-2 bg-secondary p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setSelectedMonthView("aug")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedMonthView === "aug" ? "bg-background text-primary shadow-xs" : "text-text-muted hover:text-primary"
                  }`}
                >
                  Agustus 2026
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMonthView("sep")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedMonthView === "sep" ? "bg-background text-primary shadow-xs" : "text-text-muted hover:text-primary"
                  }`}
                >
                  September 2026
                </button>
              </div>
            </div>

            {/* Calendar Heatmap Grid */}
            <div className="border border-secondary rounded-2xl p-4 bg-secondary/20">
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono font-bold text-text-muted pb-3 border-b border-secondary">
                <span>SEN</span>
                <span>SEL</span>
                <span>RAB</span>
                <span>KAM</span>
                <span>JUM</span>
                <span>SAB</span>
                <span>MIN</span>
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-2 pt-3">
                {(selectedMonthView === "sep" ? septemberDays : augustDays).map((day, idx) => {
                  if (!day) {
                    return <div key={`empty-${idx}`} className="h-20 rounded-xl bg-transparent" />;
                  }

                  const isSelected = selectedDate === day.date;
                  const hasSessions = day.totalSessions > 0;

                  return (
                    <div
                      key={day.date}
                      onClick={() => {
                        if (hasSessions) {
                          setSelectedDate(day.date);
                          setActiveTab("history"); // Jump to history with date pre-filtered
                        }
                      }}
                      className={`h-20 p-2 rounded-xl border transition-all flex flex-col justify-between ${
                        hasSessions ? "cursor-pointer hover:scale-102" : "cursor-default opacity-60"
                      } ${
                        isSelected
                          ? "ring-2 ring-primary border-primary bg-primary text-background shadow-md"
                          : hasSessions
                          ? "bg-emerald-50/80 border-emerald-200 text-emerald-950 hover:bg-emerald-100"
                          : "bg-background border-secondary/60 text-primary"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono font-bold ${isSelected ? "text-accent" : ""}`}>
                          {day.dayNumber}
                        </span>

                        {hasSessions && (
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isSelected ? "bg-accent" : "bg-emerald-600 animate-pulse"
                            }`}
                          />
                        )}
                      </div>

                      {hasSessions ? (
                        <div className="space-y-0.5">
                          <div className={`text-[10px] font-mono font-bold leading-tight ${isSelected ? "text-background" : "text-emerald-800"}`}>
                            {day.totalSessions} Sesi
                          </div>
                          <div className={`text-[9px] font-mono truncate ${isSelected ? "text-neutral-300" : "text-emerald-700"}`}>
                            {day.attendees.map((a) => a.studentName.split(" ")[0]).join(", ")}
                          </div>
                        </div>
                      ) : (
                        <span className="text-[10px] text-text-muted font-mono">-</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend & Instructions */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted pt-2 border-t border-secondary">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-emerald-100 border border-emerald-300" />
                  <span>Ada Sesi Tatap Muka</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-background border border-secondary" />
                  <span>Hari Kosong / Libur</span>
                </div>
              </div>

              <span className="font-mono text-[11px] text-primary font-medium">
                💡 Klik tanggal hijau untuk langsung membuka daftar detail presensi di Tab 3
              </span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: RIWAYAT PRESENSI LENGKAP & FILTER TANGGALAN        */}
        {/* ========================================================= */}
        {activeTab === "history" && (
          <div className="bg-background rounded-3xl border border-secondary p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-primary flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-accent" /> Arsip Log Kehadiran Murid
                </h2>
                <p className="text-xs text-text-muted mt-0.5">
                  Menampilkan rekam jejak tatap muka berdasarkan murid atau tanggal pilihan.
                </p>
              </div>

              {/* Filter Controls (Student & Date) */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Filter Murid */}
                <select
                  value={selectedStudentFilter}
                  onChange={(e) => setSelectedStudentFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl bg-secondary border border-secondary text-primary font-medium focus:outline-none"
                >
                  <option value="all">Semua Murid</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.avatar})
                    </option>
                  ))}
                </select>

                {/* Filter Tanggal (Dropdown tanggal riwayat) */}
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl bg-secondary border border-secondary text-primary font-medium focus:outline-none"
                >
                  <option value="all">Semua Tanggal ({allRecordedDates.length} Hari)</option>
                  {allRecordedDates.map((dateStr) => (
                    <option key={dateStr} value={dateStr}>
                      Tanggal: {dateStr}
                    </option>
                  ))}
                </select>

                {selectedDate !== "all" && (
                  <button
                    type="button"
                    onClick={() => setSelectedDate("all")}
                    className="px-3 py-2 text-xs rounded-xl bg-secondary/80 hover:bg-secondary text-primary font-bold transition-colors"
                  >
                    Reset Filter Tanggal
                  </button>
                )}
              </div>
            </div>

            {/* Filter info pill */}
            {selectedDate !== "all" && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                <span>
                  Memfilter presensi khusus pada tanggal: <strong className="font-mono">{selectedDate}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedDate("all")}
                  className="text-xs font-bold underline hover:text-emerald-700"
                >
                  Tampilkan Semua Tanggal
                </button>
              </div>
            )}

            {/* Records List */}
            <div className="space-y-3">
              {allHistoryRecords.length > 0 ? (
                allHistoryRecords.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-secondary/30 border border-secondary flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-background border border-secondary flex items-center justify-center font-bold text-xs text-primary shadow-2xs shrink-0">
                        {item.studentAvatar}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-primary">{item.studentName}</h4>
                          <span className="text-[10px] font-mono text-text-muted">({item.program})</span>
                          <span
                            className={`text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full ${
                              item.entry.status === "present"
                                ? "bg-emerald-100 text-emerald-800"
                                : item.entry.status === "late"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.entry.status === "present"
                              ? "Hadir Tepat Waktu"
                              : item.entry.status === "late"
                              ? "Terlambat"
                              : "Izin / Tidak Hadir"}
                          </span>
                        </div>

                        <p className="text-xs text-primary font-medium">
                          Sesi {item.entry.sessionNumber}: {item.entry.topic}
                        </p>

                        {item.entry.notes && (
                          <p className="text-[11px] text-text-muted italic bg-background/50 px-2.5 py-1 rounded-lg border border-secondary/60">
                            "{item.entry.notes}"
                          </p>
                        )}

                        {/* Foto Dokumentasi Sesi di Riwayat */}
                        {item.entry.documentationPhotos && item.entry.documentationPhotos.length > 0 && (
                          <div className="pt-1.5 flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono text-text-muted flex items-center gap-1">
                              <Camera className="w-3 h-3 text-accent" />
                              <span>Bukti Foto ({item.entry.documentationPhotos.length}):</span>
                            </span>
                            <div className="flex items-center gap-1.5">
                              {item.entry.documentationPhotos.map((imgUrl, pIdx) => (
                                <button
                                  key={pIdx}
                                  type="button"
                                  onClick={() => setTutorLightboxImage(imgUrl)}
                                  className="w-8 h-8 rounded-lg overflow-hidden border border-secondary hover:border-primary transition-all relative block shrink-0 cursor-pointer shadow-2xs group"
                                  title="Klik untuk memperbesar foto bukti"
                                >
                                  <img src={imgUrl} alt="Bukti Sesi" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-secondary">
                      <div className="text-xs font-mono font-bold text-primary flex items-center sm:justify-end gap-1.5">
                        <CalendarIcon className="w-3.5 h-3.5 text-accent" />
                        <span>{item.entry.date}</span>
                      </div>
                      <div className="text-[11px] font-mono text-text-muted mt-0.5">
                        Durasi: <strong>{item.entry.durationMinutes} menit</strong>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-14 text-center bg-secondary/20 rounded-2xl border border-dashed border-secondary space-y-2">
                  <CalendarIcon className="w-8 h-8 text-text-muted mx-auto opacity-40" />
                  <p className="text-xs text-text-muted font-medium">
                    Tidak ditemukan rekam presensi untuk filter yang dipilih.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStudentFilter("all");
                      setSelectedDate("all");
                    }}
                    className="text-xs text-primary font-bold hover:underline"
                  >
                    Reset Semua Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Lightbox Preview Foto Dokumentasi Tutor */}
        {tutorLightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setTutorLightboxImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-background rounded-3xl overflow-hidden border border-secondary shadow-2xl p-2 sm:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-3 border-b border-secondary">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold font-mono text-primary">
                    Dokumentasi Bukti Belajar Sesi
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setTutorLightboxImage(null)}
                  className="p-1.5 rounded-full hover:bg-secondary text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-2 sm:p-4 flex items-center justify-center max-h-[75vh] overflow-hidden">
                <img
                  src={tutorLightboxImage}
                  alt="Dokumentasi Sesi Full"
                  className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </TutorLayout>
  );
}
