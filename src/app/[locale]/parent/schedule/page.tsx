"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import ParentLayout from "@/components/dashboard/ParentLayout";
import { mockParentChild } from "@/lib/data/parent";
import {
  Calendar,
  Clock,
  MapPin,
  Home,
  Video,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export default function ParentSchedulePage() {
  const locale = useLocale();
  const child = mockParentChild;
  const [waToast, setWaToast] = useState(false);

  const handleReschedule = () => {
    setWaToast(true);
    setTimeout(() => setWaToast(false), 4000);
  };

  const scheduleHistory = [
    {
      session: 9,
      topic: child.nextSession.topic,
      date: child.nextSession.date,
      time: child.nextSession.time,
      status: "Terjadwal (Akan Datang)",
      type: "Tatap Muka di Rumah",
      address: child.nextSession.address,
    },
    {
      session: 8,
      topic: "Pengenalan Variabel & Skor Game",
      date: "04 Okt 2026",
      time: "16:00 - 17:30 WIB",
      status: "Selesai",
      type: "Tatap Muka di Rumah",
      address: child.nextSession.address,
    },
    {
      session: 7,
      topic: "Deteksi Tabrakan Sprite & Animasi Karakter",
      date: "27 Sep 2026",
      time: "16:00 - 17:30 WIB",
      status: "Selesai",
      type: "Tatap Muka di Rumah",
      address: child.nextSession.address,
    },
    {
      session: 6,
      topic: "Perulangan Berhingga (Repeat) vs Tak Hingga (Forever)",
      date: "20 Sep 2026",
      time: "16:00 - 17:30 WIB",
      status: "Selesai",
      type: "Tatap Muka di Rumah",
      address: child.nextSession.address,
    },
  ];

  return (
    <ParentLayout>
      <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-secondary">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-primary text-background font-bold">
                Jadwal Les Privat
              </span>
              <span className="text-xs font-mono text-text-muted">
                Tatap Muka ke Rumah Siswa
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mt-1">
              Jadwal Sesi {child.nickname}
            </h1>
            <p className="text-xs sm:text-sm text-text-muted mt-0.5">
              Guru les privat datang langsung ke rumah Anda. Tarif sudah all-in bebas biaya transport (Rp0).
            </p>
          </div>

          <button
            type="button"
            onClick={handleReschedule}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ajukan Ganti Jadwal (WA)</span>
          </button>
        </div>

        {waToast && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Format pengajuan jadwal ulang telah disiapkan untuk WhatsApp Tutor ({child.tutorName}).</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-800">Aturan: &gt;24 jam sebelumnya</span>
          </div>
        )}

        {/* Next Session Highlight Card */}
        <div className="bg-background rounded-3xl border-2 border-primary/20 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs font-mono flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-emerald-700" /> Sesi Tatap Muka Berikutnya
            </span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-secondary font-bold text-primary">
              Sesi {child.nextSession.sessionNumber}
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary">
              {child.nextSession.topic}
            </h2>
            <p className="text-xs text-text-muted mt-1">
              Tutor Pengajar: <strong className="text-primary">{child.tutorName}</strong> • Durasi 90 Menit
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono">
            <div className="p-3 rounded-2xl bg-secondary/40 border border-secondary flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-accent" />
              <div>
                <span className="text-text-muted block text-[10px]">Hari & Tanggal</span>
                <span className="font-bold text-primary">{child.nextSession.date}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-secondary/40 border border-secondary flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-accent" />
              <div>
                <span className="text-text-muted block text-[10px]">Waktu Sesi</span>
                <span className="font-bold text-primary">{child.nextSession.time}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-secondary/40 border border-secondary flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-accent" />
              <div className="truncate">
                <span className="text-text-muted block text-[10px]">Lokasi Rumah</span>
                <span className="font-bold text-primary truncate block">{child.nextSession.address}</span>
              </div>
            </div>
          </div>

          {/* Backup Online Meeting Notice */}
          <div className="p-4 rounded-2xl bg-secondary/30 border border-secondary flex items-start gap-3 text-xs">
            <Video className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-primary">Tautan Pertemuan Daring (Hanya Cadangan):</span>
              <p className="text-text-muted text-[11px] leading-relaxed">
                Format utama les adalah tatap muka langsung di rumah. Link Google Meet hanya digunakan jika anak atau tutor berhalangan hadir secara fisik karena sakit atau kondisi cuaca ekstrem.
              </p>
              {child.nextSession.backupMeetUrl && (
                <a
                  href={child.nextSession.backupMeetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-primary underline font-mono text-[11px] pt-1"
                >
                  {child.nextSession.backupMeetUrl}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Schedule History Timeline Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-text-muted">
            Riwayat Pertemuan Sesi
          </h3>

          <div className="bg-background rounded-3xl border border-secondary overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary/40 border-b border-secondary font-mono text-text-muted uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Sesi</th>
                    <th className="p-4">Topik Materi</th>
                    <th className="p-4">Tanggal & Jam</th>
                    <th className="p-4">Format</th>
                    <th className="p-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary">
                  {scheduleHistory.map((row, idx) => (
                    <tr key={idx} className="hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-mono font-bold text-primary">Sesi {row.session}</td>
                      <td className="p-4 font-semibold text-primary">{row.topic}</td>
                      <td className="p-4 font-mono text-text-muted">
                        {row.date} • {row.time}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-secondary text-primary font-mono text-[10px]">
                          {row.type}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono">
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                            row.status.includes("Akan")
                              ? "bg-primary text-background"
                              : "bg-emerald-50 text-emerald-800"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
}
