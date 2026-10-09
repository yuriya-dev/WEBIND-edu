"use client";

import { useState } from "react";
import TutorLayout from "@/components/dashboard/TutorLayout";
import { mockTutor, TutorScheduleItem } from "@/lib/data/tutor";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  User,
  Plus,
  Home,
  MapPin,
  CheckCircle2,
  X,
  Filter,
  Sparkles,
  Search,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function TutorSchedulePage() {
  const [schedules, setSchedules] = useState<TutorScheduleItem[]>(mockTutor.todayClasses);
  const [activeDateFilter, setActiveDateFilter] = useState<"today" | "upcoming" | "all">("all");
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State for scheduling a new class
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    studentId: mockTutor.students[0]?.id || "",
    date: "2026-09-11",
    timeStart: "16:00",
    timeEnd: "17:30",
    topic: "",
    mode: "home_tutoring" as "home_tutoring" | "online_backup",
    address: "Jl. Margonda Raya No. 45, Beji, Depok",
    notes: "",
  });

  const todayIso = "2026-09-09";

  // Filter schedules
  const filteredSchedules = schedules.filter((sch) => {
    // Date tab filter
    if (activeDateFilter === "today" && sch.date !== todayIso) return false;
    if (activeDateFilter === "upcoming" && sch.date < todayIso) return false;

    // Student filter
    if (selectedStudentFilter !== "all" && sch.studentId !== selectedStudentFilter) return false;

    // Search query
    if (
      searchQuery &&
      !sch.studentName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !sch.topic.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !sch.program.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Sort ascending by date & time
  filteredSchedules.sort((a, b) => new Date(`${a.date}T${a.time.slice(0, 5)}`).getTime() - new Date(`${b.date}T${b.time.slice(0, 5)}`).getTime());

  // Handle Create Schedule Submit
  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedStd = mockTutor.students.find((s) => s.id === formData.studentId);
    if (!selectedStd) return;

    const newId = `cls-${Date.now()}`;
    const newClass: TutorScheduleItem = {
      id: newId,
      studentId: selectedStd.id,
      studentName: selectedStd.name,
      studentAvatar: selectedStd.avatar,
      program: selectedStd.program,
      date: formData.date,
      time: `${formData.timeStart} - ${formData.timeEnd} WIB`,
      sessionNumber: selectedStd.completedSessions + 1,
      totalSessions: selectedStd.totalSessions,
      topic: formData.topic || `Pertemuan ${selectedStd.completedSessions + 1}: ${selectedStd.program}`,
      mode: formData.mode,
      address: formData.mode === "home_tutoring" ? formData.address : undefined,
      meetingLink: "https://meet.google.com/webind-live-class",
      status: "scheduled",
      notes: formData.notes,
    };

    setSchedules([newClass, ...schedules]);
    setIsModalOpen(false);
    toast.success(`Jadwal mengajar dengan ${selectedStd.name} berhasil dibuat!`);

    // Reset Form
    setFormData({
      studentId: mockTutor.students[0]?.id || "",
      date: "2026-09-11",
      timeStart: "16:00",
      timeEnd: "17:30",
      topic: "",
      mode: "home_tutoring",
      address: "Jl. Margonda Raya No. 45, Beji, Depok",
      notes: "",
    });
  };

  // Handle Delete / Cancel Schedule
  const handleDeleteSchedule = (classId: string, studentName: string) => {
    setSchedules((prev) => prev.filter((c) => c.id !== classId));
    toast.success(`Jadwal sesi bersama ${studentName} berhasil dibatalkan/dihapus.`);
  };

  return (
    <TutorLayout>
      <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-secondary">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              Manajemen Jadwal Sesi Mengajar
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-primary mt-1">
              Jadwal Mengajar Tutor 📅
            </h1>
            <p className="text-xs sm:text-sm text-text-muted mt-1">
              Atur agenda tatap muka ke rumah murid (Rp0 Bebas Ongkir) atau cadangan daring Google Meet.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:bg-neutral-800 transition-colors shadow-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-accent" />
            <span>Jadwalkan Mengajar Baru</span>
          </button>
        </div>

        {/* Success Toast */}
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between shadow-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{toastMessage}</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-700">Tersinkronisasi ke Dashboard Siswa & Ortu</span>
          </div>
        )}

        {/* Filters & Tabs Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Quick Date Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-secondary rounded-xl w-fit">
            <button
              type="button"
              onClick={() => setActiveDateFilter("all")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeDateFilter === "all"
                  ? "bg-background text-primary shadow-xs"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              Semua Jadwal ({schedules.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveDateFilter("today")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeDateFilter === "today"
                  ? "bg-background text-primary shadow-xs"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              Hari Ini ({schedules.filter((s) => s.date === todayIso).length})
            </button>
            <button
              type="button"
              onClick={() => setActiveDateFilter("upcoming")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeDateFilter === "upcoming"
                  ? "bg-background text-primary shadow-xs"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              Mendatang
            </button>
          </div>

          {/* Search & Student Filter */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari murid atau topik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-secondary text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <select
              value={selectedStudentFilter}
              onChange={(e) => setSelectedStudentFilter(e.target.value)}
              className="py-2 px-3 text-xs rounded-xl bg-secondary text-primary font-medium focus:outline-none"
            >
              <option value="all">Semua Murid</option>
              {mockTutor.students.map((std) => (
                <option key={std.id} value={std.id}>
                  {std.name} ({std.avatar})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Schedule Cards List */}
        <div className="space-y-4">
          {filteredSchedules.length > 0 ? (
            filteredSchedules.map((cls) => {
              const isToday = cls.date === todayIso;

              return (
                <div
                  key={cls.id}
                  className={`p-4 sm:p-6 rounded-3xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 ${
                    isToday
                      ? "bg-background border-primary/40 shadow-sm"
                      : "bg-secondary/40 border-secondary hover:border-neutral-300"
                  }`}
                >
                  <div className="space-y-3 min-w-0 flex-1 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase shrink-0 ${
                          isToday
                            ? "bg-accent text-primary"
                            : "bg-secondary text-primary border border-secondary"
                        }`}
                      >
                        {isToday ? "Hari Ini" : cls.date}
                      </span>

                      <span className="text-xs font-mono font-bold text-primary flex items-center gap-1 shrink-0">
                        <Clock className="w-3.5 h-3.5 text-text-muted" /> {cls.time}
                      </span>

                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shrink-0 ${
                          cls.mode === "home_tutoring"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-sky-100 text-sky-800"
                        }`}
                      >
                        {cls.mode === "home_tutoring" ? (
                          <>
                            <Home className="w-3 h-3" /> Tatap Muka ke Rumah (Rp0 Transport)
                          </>
                        ) : (
                          <>
                            <Video className="w-3 h-3" /> Online Backup Meet
                          </>
                        )}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-primary break-words">{cls.topic}</h3>
                      <p className="text-xs text-text-muted mt-0.5">
                        Sesi {cls.sessionNumber} dari {cls.totalSessions} • {cls.program}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-primary text-accent flex items-center justify-center font-bold text-[10px] shrink-0">
                          {cls.studentAvatar}
                        </div>
                        <span className="font-bold text-primary truncate max-w-[150px] sm:max-w-none">{cls.studentName}</span>
                      </div>

                      {cls.address && (
                        <div className="flex items-center gap-1 text-[11px] text-text-muted break-words line-clamp-1 max-w-md">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <span>{cls.address}</span>
                        </div>
                      )}
                    </div>

                    {cls.notes && (
                      <p className="text-[11px] text-text-muted italic bg-background/60 p-2 rounded-xl border border-secondary/60 break-words">
                        Catatan Tutor: "{cls.notes}"
                      </p>
                    )}
                  </div>

                  {/* Actions Right */}
                  <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-secondary">
                    <div className="flex items-center gap-2">
                      {cls.meetingLink && (
                        <a
                          href={cls.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:bg-neutral-800 transition-colors shadow-xs"
                        >
                          <Video className="w-3.5 h-3.5 text-accent" />
                          <span>{cls.mode === "online_backup" ? "Buka Google Meet" : "Link Backup"}</span>
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteSchedule(cls.id, cls.studentName)}
                        className="p-2.5 rounded-xl bg-secondary hover:bg-red-50 text-text-muted hover:text-red-600 transition-colors border border-secondary shadow-2xs"
                        title="Batalkan / Hapus Sesi Jadwal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <span className="text-[10px] font-mono text-text-muted text-center md:text-right">
                      Status: <strong className="text-emerald-700 uppercase">Terkonfirmasi</strong>
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center bg-secondary/20 rounded-3xl border border-dashed border-secondary space-y-3">
              <CalendarIcon className="w-10 h-10 text-text-muted mx-auto opacity-50" />
              <p className="text-xs text-text-muted font-medium">
                Tidak ada jadwal mengajar pada filter yang dipilih.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveDateFilter("all");
                  setSelectedStudentFilter("all");
                  setSearchQuery("");
                }}
                className="text-xs font-bold text-primary hover:underline"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* MODAL JADWALKAN MENGAJAR BARU                             */}
        {/* ========================================================= */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-background rounded-3xl border border-secondary w-full max-w-lg p-6 sm:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in duration-150">
              <div className="flex items-start justify-between pb-3 border-b border-secondary">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-text-muted">
                    Penjadwalan Sesi Baru
                  </span>
                  <h3 className="text-lg font-bold text-primary mt-0.5">
                    Jadwalkan Sesi Mengajar ✍️
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg bg-secondary hover:bg-neutral-200 text-text-muted hover:text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateSchedule} className="space-y-4 text-xs">
                {/* 1. Pilih Murid */}
                <div>
                  <label className="font-bold text-primary block mb-1">Pilih Murid Bimbingan</label>
                  <select
                    value={formData.studentId}
                    onChange={(e) => {
                      const std = mockTutor.students.find((s) => s.id === e.target.value);
                      setFormData({
                        ...formData,
                        studentId: e.target.value,
                        topic: std ? `Sesi ${std.completedSessions + 1}: ${std.program}` : "",
                      });
                    }}
                    required
                    className="w-full p-2.5 rounded-xl bg-secondary/50 border border-secondary text-primary font-medium focus:outline-none"
                  >
                    {mockTutor.students.map((std) => (
                      <option key={std.id} value={std.id}>
                        {std.name} — {std.program} ({std.level})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Topik Pertemuan */}
                <div>
                  <label className="font-bold text-primary block mb-1">Materi / Topik Pertemuan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pengenalan Looping & List di Python"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-secondary/50 border border-secondary text-primary focus:outline-none"
                  />
                </div>

                {/* 3. Tanggal & Jam */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-primary block mb-1">Tanggal</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-secondary/50 border border-secondary text-primary font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-primary block mb-1">Mulai</label>
                    <input
                      type="time"
                      required
                      value={formData.timeStart}
                      onChange={(e) => setFormData({ ...formData, timeStart: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-secondary/50 border border-secondary text-primary font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-primary block mb-1">Selesai</label>
                    <input
                      type="time"
                      required
                      value={formData.timeEnd}
                      onChange={(e) => setFormData({ ...formData, timeEnd: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-secondary/50 border border-secondary text-primary font-mono focus:outline-none"
                    />
                  </div>
                </div>

                {/* 4. Format Mengajar: Tatap Muka vs Online */}
                <div>
                  <label className="font-bold text-primary block mb-1">Format Pembelajaran</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, mode: "home_tutoring" })}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                        formData.mode === "home_tutoring"
                          ? "bg-primary text-background border-primary shadow-xs"
                          : "bg-secondary/40 text-primary border-secondary"
                      }`}
                    >
                      <Home className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                      <div>
                        <div className="font-bold text-xs">Tatap Muka ke Rumah</div>
                        <div className={`text-[10px] ${formData.mode === "home_tutoring" ? "text-neutral-300" : "text-text-muted"}`}>
                          Guru datang (Rp0 Bebas Ongkir)
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, mode: "online_backup" })}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                        formData.mode === "online_backup"
                          ? "bg-primary text-background border-primary shadow-xs"
                          : "bg-secondary/40 text-primary border-secondary"
                      }`}
                    >
                      <Video className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                      <div>
                        <div className="font-bold text-xs">Cadangan Daring</div>
                        <div className={`text-[10px] ${formData.mode === "online_backup" ? "text-neutral-300" : "text-text-muted"}`}>
                          Google Meet backup
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 5. Alamat Rumah Murid */}
                {formData.mode === "home_tutoring" && (
                  <div>
                    <label className="font-bold text-primary block mb-1">Alamat Rumah Murid</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Masukkan alamat lengkap rumah murid..."
                      className="w-full p-2.5 rounded-xl bg-secondary/50 border border-secondary text-primary focus:outline-none"
                    />
                  </div>
                )}

                {/* 6. Catatan Tutor */}
                <div>
                  <label className="font-bold text-primary block mb-1">Catatan Persiapan (Opsional)</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Contoh: Murid diminta siapkan laptop terinstall VS Code..."
                    className="w-full p-2.5 rounded-xl bg-secondary/50 border border-secondary text-primary focus:outline-none resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-secondary flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-secondary text-primary font-bold text-xs hover:bg-neutral-200 transition-colors"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:bg-neutral-800 transition-colors shadow-xs"
                  >
                    Simpan & Konfirmasi Jadwal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Place portal/modal outside space-y-8 to avoid any margin calculations */}
      {/* (Modal JSX is handled above, and now protected by global zero-margin rule too) */}
    </TutorLayout>
  );
}
