"use client";

import { useState } from "react";
import TutorLayout from "@/components/dashboard/TutorLayout";
import { mockTutor, TutorStudentItem } from "@/lib/data/tutor";
import {
  Users,
  Search,
  CheckCircle2,
  Calendar,
  BookOpen,
  Clock,
  Phone,
  Mail,
  User,
  GraduationCap,
  Sparkles,
  AlertCircle,
  FileCheck,
  Award,
  Edit3,
  X,
  Save,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

export default function TutorStudentsPage() {
  const [students, setStudents] = useState<TutorStudentItem[]>(mockTutor.students);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<TutorStudentItem | null>(mockTutor.students[0]);
  const [activeProfileTab, setActiveProfileTab] = useState<"modules" | "attendance" | "bio">("modules");
  const [tutorNoteInput, setTutorNoteInput] = useState(mockTutor.students[0]?.notes || "");
  const [noteSaved, setNoteSaved] = useState(false);

  // Edit Student Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editToast, setEditToast] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    level: "SMP" as "SMP" | "SMA" | "Mahasiswa" | "Umum",
    status: "active" as "active" | "completed" | "on-hold",
    parentName: "",
    parentPhone: "",
    totalSessions: 10,
    completedSessions: 8,
    progressPercent: 80,
    attendanceRate: 92,
  });

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.program.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectStudent = (student: TutorStudentItem) => {
    setSelectedStudent(student);
    setTutorNoteInput(student.notes);
    setNoteSaved(false);
  };

  const handleOpenEdit = (student: TutorStudentItem) => {
    setEditFormData({
      name: student.name,
      email: student.email,
      phone: student.phone || "",
      program: student.program,
      level: student.level,
      status: student.status,
      parentName: student.parentName || "",
      parentPhone: student.parentPhone || "",
      totalSessions: student.totalSessions,
      completedSessions: student.completedSessions,
      progressPercent: student.progressPercent,
      attendanceRate: student.attendanceRate,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEditStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    const updatedStudent: TutorStudentItem = {
      ...selectedStudent,
      name: editFormData.name,
      email: editFormData.email,
      phone: editFormData.phone,
      program: editFormData.program,
      level: editFormData.level,
      status: editFormData.status,
      parentName: editFormData.parentName,
      parentPhone: editFormData.parentPhone,
      totalSessions: Number(editFormData.totalSessions),
      completedSessions: Number(editFormData.completedSessions),
      progressPercent: Number(editFormData.progressPercent),
      attendanceRate: Number(editFormData.attendanceRate),
      // Update avatar initials if name changed
      avatar: editFormData.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase())
        .join("") || selectedStudent.avatar,
    };

    setStudents((prev) =>
      prev.map((s) => (s.id === selectedStudent.id ? updatedStudent : s))
    );
    setSelectedStudent(updatedStudent);
    setIsEditModalOpen(false);
    toast.success(`Data profil ${updatedStudent.name} berhasil diperbarui!`);
  };

  const handleSaveNote = () => {
    if (!selectedStudent) return;
    setStudents((prev) =>
      prev.map((s) => (s.id === selectedStudent.id ? { ...s, notes: tutorNoteInput } : s))
    );
    setNoteSaved(true);
    toast.success(`Catatan bimbingan untuk ${selectedStudent.name} berhasil disimpan!`);
    setTimeout(() => setNoteSaved(false), 2500);
  };

  return (
    <TutorLayout>
      <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
            Student Management & Academic Records
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-primary mt-1">
            Direktori Profil Murid 🎓
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Informasi lengkap rekam jejak belajar, riwayat presensi tatap muka, daftar modul yang dikuasai, nilai kuis, dan data orang tua.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari murid berdasarkan nama atau program belajar..."
              className="w-full pl-11 pr-4 py-3 bg-secondary rounded-xl text-xs text-primary focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-text-muted"
            />
          </div>
        </div>

        {/* 2-Column: Student list & Detailed Profile Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: List of Students */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="text-xs font-mono font-bold text-text-muted px-1 flex justify-between items-center">
              <span>DAFTAR MURID ({filtered.length})</span>
              <span>PROGRES</span>
            </div>

            {filtered.map((student) => {
              const isSelected = selectedStudent?.id === student.id;
              return (
                <div
                  key={student.id}
                  onClick={() => handleSelectStudent(student)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? "bg-primary text-background border-primary shadow-md"
                      : "bg-secondary text-primary border-transparent hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isSelected ? "bg-accent text-primary" : "bg-background text-primary"
                      }`}
                    >
                      {student.avatar}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold group-hover:underline">{student.name}</h3>
                      <p className={`text-[11px] ${isSelected ? "text-neutral-300" : "text-text-muted"}`}>
                        {student.program}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                          isSelected ? "bg-neutral-800 text-neutral-300" : "bg-background text-text-muted"
                        }`}>
                          {student.level}
                        </span>
                        <span className={`text-[9px] font-mono font-bold ${
                          isSelected ? "text-accent" : "text-emerald-700"
                        }`}>
                          Absen: {student.attendanceRate}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-black">{student.progressPercent}%</div>
                    <div className={`text-[9px] ${isSelected ? "text-neutral-300" : "text-text-muted"}`}>
                      {student.completedSessions}/{student.totalSessions} Sesi
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Profile Dossier */}
          {selectedStudent && (
            <div className="lg:col-span-8 bg-background border border-secondary p-6 sm:p-8 rounded-3xl space-y-6 shadow-xs">
              {/* Header Profile Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-secondary">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary text-accent flex items-center justify-center font-bold text-xl shrink-0 shadow-sm">
                    {selectedStudent.avatar}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-primary">{selectedStudent.name}</h2>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
                        {selectedStudent.status}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted">
                      {selectedStudent.program} • Jenjang: <strong>{selectedStudent.level}</strong>
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted pt-1">
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Mail className="w-3.5 h-3.5 text-primary" /> {selectedStudent.email}
                      </span>
                      {selectedStudent.phone && (
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <Phone className="w-3.5 h-3.5 text-primary" /> {selectedStudent.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stat Pill Box + Edit Button */}
                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  <div className="grid grid-cols-2 gap-2 bg-secondary/50 p-3 rounded-2xl shrink-0">
                    <div className="text-center px-3">
                      <div className="text-lg font-black font-mono text-primary">{selectedStudent.progressPercent}%</div>
                      <div className="text-[9px] font-mono text-text-muted uppercase">Kurikulum Selesai</div>
                    </div>
                    <div className="text-center px-3 border-l border-neutral-300">
                      <div className="text-lg font-black font-mono text-emerald-600">{selectedStudent.attendanceRate}%</div>
                      <div className="text-[9px] font-mono text-text-muted uppercase">Tingkat Kehadiran</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(selectedStudent)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-background text-xs font-bold hover:bg-neutral-800 transition-colors shadow-2xs w-full sm:w-auto"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-accent" />
                    <span>Edit Profil Murid</span>
                  </button>
                </div>
              </div>

              {editToast && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center justify-between shadow-2xs animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">{editToast}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700">Tersimpan</span>
                </div>
              )}

              {/* Sub-Tabs: 1. Modul Dipelajari | 2. Riwayat Absensi & Tanggal | 3. Biodata & Kontak Ortu */}
              <div className="flex items-center gap-2 p-1 bg-secondary rounded-xl w-fit">
                <button
                  type="button"
                  onClick={() => setActiveProfileTab("modules")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeProfileTab === "modules"
                      ? "bg-background text-primary shadow-xs"
                      : "text-text-muted hover:text-primary"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-accent" />
                  <span>Modul & Kuis ({selectedStudent.modulesList?.length || 0})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveProfileTab("attendance")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeProfileTab === "attendance"
                      ? "bg-background text-primary shadow-xs"
                      : "text-text-muted hover:text-primary"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  <span>Riwayat Presensi ({selectedStudent.attendanceHistory?.length || 0} Sesi)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveProfileTab("bio")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeProfileTab === "bio"
                      ? "bg-background text-primary shadow-xs"
                      : "text-text-muted hover:text-primary"
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-accent" />
                  <span>Biodata & Orang Tua</span>
                </button>
              </div>

              {/* TAB 1: MODUL YANG DIPELAJARI & DISELESAIKAN */}
              {activeProfileTab === "modules" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-text-muted font-mono">
                    <span>Daftar silabus modul yang ditugaskan & status pengerjaan:</span>
                    <span className="font-bold text-primary">
                      {selectedStudent.completedSessions} dari {selectedStudent.totalSessions} sesi tuntas
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {selectedStudent.modulesList && selectedStudent.modulesList.length > 0 ? (
                      selectedStudent.modulesList.map((mod) => (
                        <div
                          key={mod.id}
                          className="bg-secondary/40 border border-secondary p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center font-mono font-bold text-xs text-primary shrink-0">
                              {mod.sessionNumber}
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-primary">{mod.title}</h4>
                              <div className="flex items-center gap-2 text-[10px] text-text-muted font-mono mt-0.5">
                                <span>Pertemuan {mod.sessionNumber}</span>
                                {mod.completedAt && <span>• Tuntas pada: {mod.completedAt}</span>}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center">
                            {mod.score !== undefined && (
                              <div className="text-right">
                                <span className="text-xs font-mono font-bold text-primary">{mod.score}/100</span>
                                <p className="text-[9px] text-text-muted font-mono">Skor Kuis</p>
                              </div>
                            )}

                            <span
                              className={`text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full ${
                                mod.status === "completed"
                                  ? "bg-accent text-primary"
                                  : mod.status === "in-progress"
                                  ? "bg-primary text-background"
                                  : "bg-secondary text-text-muted"
                              }`}
                            >
                              {mod.status === "completed"
                                ? "Selesai ✓"
                                : mod.status === "in-progress"
                                ? "Sedang Dipelajari ◐"
                                : "Terkunci ○"}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-text-muted italic py-4">Belum ada modul yang terdaftar.</p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: RIWAYAT ABSENSI DETAIL DENGAN TANGGAL */}
              {activeProfileTab === "attendance" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-text-muted font-mono">
                    <span>Log kedatangan tatap muka per sesi pertemuan:</span>
                    <span className="text-emerald-700 font-bold">
                      Kehadiran: {selectedStudent.attendanceRate}%
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {selectedStudent.attendanceHistory && selectedStudent.attendanceHistory.length > 0 ? (
                      selectedStudent.attendanceHistory.map((att, idx) => (
                        <div
                          key={idx}
                          className="bg-secondary/40 border border-secondary p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-start sm:items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-background flex flex-col items-center justify-center font-mono shrink-0">
                              <span className="text-[9px] text-text-muted uppercase">Sesi</span>
                              <span className="text-xs font-bold text-primary">{att.sessionNumber}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs sm:text-sm font-bold text-primary">{att.topic}</h4>
                                <span
                                  className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                                    att.status === "present"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : att.status === "late"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {att.status === "present"
                                    ? "Hadir"
                                    : att.status === "late"
                                    ? "Terlambat"
                                    : "Tidak Hadir"}
                                </span>
                              </div>
                              <p className="text-[11px] text-text-muted mt-0.5">
                                Tanggal: <strong className="text-primary font-mono">{att.date}</strong> • Durasi tatap muka:{" "}
                                <strong className="text-primary font-mono">{att.durationMinutes} menit</strong>
                              </p>
                              {att.notes && (
                                <p className="text-[11px] text-neutral-600 italic mt-1 bg-background/60 p-1.5 rounded-lg border border-secondary/60">
                                  "{att.notes}"
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-text-muted italic py-4">Belum ada rekam presensi.</p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: BIODATA & KONTAK ORANG TUA */}
              {activeProfileTab === "bio" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-secondary/40 p-4 rounded-2xl border border-secondary space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-text-muted block">
                        Kontak Murid
                      </span>
                      <div className="text-xs space-y-1">
                        <div>
                          <span className="text-text-muted">Nama Lengkap:</span>{" "}
                          <strong className="text-primary">{selectedStudent.name}</strong>
                        </div>
                        <div>
                          <span className="text-text-muted">Email:</span>{" "}
                          <strong className="text-primary font-mono">{selectedStudent.email}</strong>
                        </div>
                        <div>
                          <span className="text-text-muted">WhatsApp:</span>{" "}
                          <strong className="text-primary font-mono">{selectedStudent.phone || "-"}</strong>
                        </div>
                        <div>
                          <span className="text-text-muted">Jenjang Pendidikan:</span>{" "}
                          <strong className="text-primary">{selectedStudent.level}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary/40 p-4 rounded-2xl border border-secondary space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-text-muted block">
                        Kontak Orang Tua / Wali
                      </span>
                      <div className="text-xs space-y-1">
                        <div>
                          <span className="text-text-muted">Nama Wali:</span>{" "}
                          <strong className="text-primary">{selectedStudent.parentName || "Bapak/Ibu Murid"}</strong>
                        </div>
                        <div>
                          <span className="text-text-muted">Nomor WhatsApp Wali:</span>{" "}
                          <strong className="text-primary font-mono">{selectedStudent.parentPhone || "-"}</strong>
                        </div>
                        <p className="text-[11px] text-text-muted pt-2 border-t border-secondary mt-2">
                          Laporan progres otomatis terkirim ke WhatsApp orang tua setiap selesai sesi tatap muka.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TUTOR NOTES & OBSERVATION FEEDBACK */}
              <div className="pt-6 border-t border-secondary space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-primary uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent" /> Catatan Pedagogi & Evaluasi Tutor
                  </label>
                  {noteSaved && (
                    <span className="text-[11px] font-mono text-emerald-600 font-bold animate-pulse">
                      ✓ Catatan berhasil disimpan!
                    </span>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={tutorNoteInput}
                  onChange={(e) => setTutorNoteInput(e.target.value)}
                  placeholder="Tuliskan catatan kemajuan belajar murid ini..."
                  className="w-full p-3.5 bg-secondary/50 rounded-xl text-xs text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none border border-secondary"
                />
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="px-5 py-2.5 rounded-xl bg-primary text-background text-xs font-bold hover:bg-neutral-800 transition-colors shadow-xs"
                >
                  Simpan Catatan Tutor
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* MODAL EDIT DATA SISWA & BIODATA                           */}
        {/* ========================================================= */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-background rounded-3xl border border-secondary w-full max-w-xl p-6 sm:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between pb-3 border-b border-secondary">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-text-muted">
                    Pembaruan Data Akademik
                  </span>
                  <h3 className="text-lg font-bold text-primary mt-0.5">
                    Edit Profil & Data Siswa ✏️
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1.5 rounded-lg bg-secondary hover:bg-neutral-200 text-text-muted hover:text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEditStudent} className="space-y-4 text-xs">
                {/* 1. Nama & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-primary block mb-1">Nama Siswa</label>
                    <input
                      type="text"
                      required
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-secondary/50 border border-secondary text-primary font-medium focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-primary block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={editFormData.email}
                      onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-secondary/50 border border-secondary text-primary font-mono focus:outline-none"
                    />
                  </div>
                </div>

                {/* 2. WhatsApp Siswa & Jenjang */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-primary block mb-1">Nomor WhatsApp Siswa</label>
                    <input
                      type="text"
                      value={editFormData.phone}
                      onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                      placeholder="+62 812-xxxx-xxxx"
                      className="w-full p-2.5 rounded-xl bg-secondary/50 border border-secondary text-primary font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-primary block mb-1">Jenjang Pendidikan</label>
                    <select
                      value={editFormData.level}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          level: e.target.value as "SMP" | "SMA" | "Mahasiswa" | "Umum",
                        })
                      }
                      className="w-full p-2.5 rounded-xl bg-secondary/50 border border-secondary text-primary font-medium focus:outline-none"
                    >
                      <option value="SMP">SMP</option>
                      <option value="SMA">SMA</option>
                      <option value="Mahasiswa">Mahasiswa</option>
                      <option value="Umum">Umum</option>
                    </select>
                  </div>
                </div>

                {/* 3. Program & Status Kursus */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-primary block mb-1">Program Kursus</label>
                    <input
                      type="text"
                      required
                      value={editFormData.program}
                      onChange={(e) => setEditFormData({ ...editFormData, program: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-secondary/50 border border-secondary text-primary font-medium focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-primary block mb-1">Status Keaktifan</label>
                    <select
                      value={editFormData.status}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          status: e.target.value as "active" | "completed" | "on-hold",
                        })
                      }
                      className="w-full p-2.5 rounded-xl bg-secondary/50 border border-secondary text-primary font-medium focus:outline-none"
                    >
                      <option value="active">Active (Aktif)</option>
                      <option value="completed">Completed (Lulus)</option>
                      <option value="on-hold">On-Hold (Cuti/Tunda)</option>
                    </select>
                  </div>
                </div>

                {/* 4. Data Wali / Orang Tua */}
                <div className="p-3.5 rounded-2xl bg-secondary/30 border border-secondary space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase text-text-muted block">
                    Kontak Wali / Orang Tua
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-primary block mb-1">Nama Orang Tua / Wali</label>
                      <input
                        type="text"
                        value={editFormData.parentName}
                        onChange={(e) => setEditFormData({ ...editFormData, parentName: e.target.value })}
                        placeholder="Contoh: Bambang Pratama (Ayah)"
                        className="w-full p-2 rounded-xl bg-background border border-secondary text-primary font-medium focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-primary block mb-1">WhatsApp Orang Tua</label>
                      <input
                        type="text"
                        value={editFormData.parentPhone}
                        onChange={(e) => setEditFormData({ ...editFormData, parentPhone: e.target.value })}
                        placeholder="+62 811-xxxx-xxxx"
                        className="w-full p-2 rounded-xl bg-background border border-secondary text-primary font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Kuota Sesi & Progres Belajar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  <div>
                    <label className="font-bold text-text-muted block mb-1 text-[11px]">Sesi Selesai</label>
                    <input
                      type="number"
                      min={0}
                      value={editFormData.completedSessions}
                      onChange={(e) => setEditFormData({ ...editFormData, completedSessions: Number(e.target.value) })}
                      className="w-full p-2 rounded-xl bg-secondary/50 border border-secondary text-primary font-mono font-bold text-center focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-text-muted block mb-1 text-[11px]">Total Sesi Paket</label>
                    <input
                      type="number"
                      min={1}
                      value={editFormData.totalSessions}
                      onChange={(e) => setEditFormData({ ...editFormData, totalSessions: Number(e.target.value) })}
                      className="w-full p-2 rounded-xl bg-secondary/50 border border-secondary text-primary font-mono font-bold text-center focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-text-muted block mb-1 text-[11px]">Progres (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={editFormData.progressPercent}
                      onChange={(e) => setEditFormData({ ...editFormData, progressPercent: Number(e.target.value) })}
                      className="w-full p-2 rounded-xl bg-secondary/50 border border-secondary text-primary font-mono font-bold text-center focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-text-muted block mb-1 text-[11px]">Kehadiran (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={editFormData.attendanceRate}
                      onChange={(e) => setEditFormData({ ...editFormData, attendanceRate: Number(e.target.value) })}
                      className="w-full p-2 rounded-xl bg-secondary/50 border border-secondary text-emerald-700 font-mono font-bold text-center focus:outline-none"
                    />
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-3 border-t border-secondary flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-secondary text-primary font-bold text-xs hover:bg-neutral-200 transition-colors"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:bg-neutral-800 transition-colors shadow-xs"
                  >
                    Simpan Perubahan Siswa
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </TutorLayout>
  );
}
