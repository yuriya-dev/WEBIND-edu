"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import ParentLayout from "@/components/dashboard/ParentLayout";
import { mockParentChild } from "@/lib/data/parent";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  CreditCard,
  MessageCircle,
  ChevronRight,
  Video,
  Home,
  ShieldCheck,
  Camera,
  ZoomIn,
} from "lucide-react";

export default function ParentDashboardPage() {
  const locale = useLocale();
  const child = mockParentChild;

  const [whatsappConfirmMsg, setWhatsappConfirmMsg] = useState(false);

  const handleWhatsappReschedule = () => {
    setWhatsappConfirmMsg(true);
    setTimeout(() => setWhatsappConfirmMsg(false), 4000);
  };

  return (
    <ParentLayout>
      <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-secondary">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-primary text-background font-bold">
                Parent Portal
              </span>
              <span className="text-xs font-mono text-text-muted">
                Pemantauan Les Privat Tatap Muka
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mt-1">
              Perkembangan Belajar {child.nickname}
            </h1>
            <p className="text-xs sm:text-sm text-text-muted mt-0.5">
              {child.grade} • Program: <strong className="text-primary">{child.currentProgram}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="bg-secondary p-3 rounded-xl text-center">
              <div className="font-extrabold text-primary text-base">
                {child.remainingSessions} Sesi
              </div>
              <div className="text-[9px] text-text-muted uppercase">Sisa Paket</div>
            </div>
            <div className="bg-primary text-background p-3 rounded-xl text-center">
              <div className="font-extrabold text-accent text-base">
                {child.progressPercent}%
              </div>
              <div className="text-[9px] text-neutral-400 uppercase">Progres Program</div>
            </div>
          </div>
        </div>

        {whatsappConfirmMsg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                Pesan permintaan jadwal ulang telah disiapkan untuk WhatsApp Tutor ({child.tutorName}).
              </span>
            </div>
            <span className="font-mono text-[10px] text-emerald-800">Batas: &gt;24 jam sebelumnya</span>
          </div>
        )}

        {/* SECTION 1: UPCOMING HOME SESSION CARD */}
        <div id="schedule" className="space-y-3">
          <h2 className="text-sm font-bold text-primary font-mono uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Sesi Tatap Muka Berikutnya
          </h2>

          <div className="bg-background rounded-2xl border-2 border-primary/20 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center gap-1.5 font-mono">
                  <Home className="w-3.5 h-3.5 text-emerald-700" />
                  {child.nextSession.locationType} (Rp0 Transport)
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-secondary text-primary font-bold">
                  Sesi Ke-{child.nextSession.sessionNumber}
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-primary">
                  {child.nextSession.topic}
                </h3>
                <p className="text-xs text-text-muted mt-1 flex items-center gap-2">
                  <span>Tutor Bimbingan: <strong>{child.tutorName}</strong></span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-primary pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-text-muted" />
                  <span>{child.nextSession.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-text-muted" />
                  <span>{child.nextSession.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-text-muted">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate max-w-xs">{child.nextSession.address}</span>
                </div>
              </div>
            </div>

            {/* Actions for parents */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
              <button
                type="button"
                onClick={handleWhatsappReschedule}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-secondary hover:bg-neutral-200 text-primary font-bold text-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Ajukan Ganti Jadwal (WA)</span>
              </button>

              {child.nextSession.backupMeetUrl && (
                <a
                  href={child.nextSession.backupMeetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-secondary text-text-muted hover:text-primary text-xs font-semibold transition-colors"
                  title="Gunakan hanya jika berhalangan fisik hadir di rumah"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Link Daring (Cadangan)</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: SESSION REPORTS (TRANSPARENCY FOR PARENTS) */}
        <div id="reports" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-primary font-mono uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4" /> Riwayat Laporan Sesi Selesai
            </h2>
            <Link
              href={`/${locale}/parent/reports`}
              className="text-xs font-mono font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>Lihat Detail Laporan</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {child.recentReports.map((rep) => (
              <div
                key={rep.id}
                className="bg-background rounded-2xl border border-secondary p-5 space-y-3 hover:border-neutral-400 transition-colors shadow-2xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold px-2 py-0.5 rounded bg-secondary text-primary">
                      Sesi {rep.sessionNumber}
                    </span>
                    <span className="font-bold text-primary text-sm sm:text-base">
                      {rep.topic}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-text-muted font-mono text-[11px]">
                    <span>{rep.date}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">
                      {rep.status}
                    </span>
                  </div>
                </div>

                {/* CP Elements Mastered */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-text-muted">Kemampuan Dikuasai:</span>
                  {rep.cpElementsMastered.map((cp, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 text-[10px] font-mono font-bold"
                    >
                      {cp}
                    </span>
                  ))}
                </div>

                {/* Tutor Note & Homework */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-secondary/40 border border-secondary space-y-1">
                    <span className="font-bold text-text-muted text-[10px] uppercase font-mono">
                      Catatan Tutor untuk Orang Tua:
                    </span>
                    <p className="text-primary italic leading-relaxed">
                      &quot;{rep.tutorNote}&quot;
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-secondary/40 border border-secondary space-y-1">
                    <span className="font-bold text-text-muted text-[10px] uppercase font-mono">
                      Tugas / Latihan Mandiri:
                    </span>
                    <p className="text-primary leading-relaxed">
                      {rep.homework}
                    </p>
                  </div>
                </div>

                {/* Bukti Dokumentasi Foto Sesi */}
                {rep.documentationPhotos && rep.documentationPhotos.length > 0 && (
                  <div className="pt-2 border-t border-secondary/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5 text-accent" />
                      <span className="text-[11px] font-mono text-text-muted">
                        Dokumentasi Sesi ({rep.documentationPhotos.length} Foto):
                      </span>
                      <div className="flex items-center gap-1.5">
                        {rep.documentationPhotos.map((photo, pIdx) => (
                          <Link
                            key={pIdx}
                            href={`/${locale}/parent/reports`}
                            className="w-7 h-7 rounded-lg overflow-hidden border border-secondary hover:border-primary transition-all relative block shrink-0"
                            title="Klik untuk melihat foto di detail laporan"
                          >
                            <img src={photo} alt="Bukti Sesi" className="w-full h-full object-cover" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/${locale}/parent/reports`}
                      className="text-[11px] font-mono font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      <span>Buka Foto Penuh</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: BILLING & PACKAGE STATUS */}
        <div id="billing" className="space-y-3">
          <h2 className="text-sm font-bold text-primary font-mono uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-4 h-4" /> Paket & Masa Berlaku
          </h2>

          <div className="bg-background rounded-2xl border border-secondary p-6 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-2xs">
            <div className="space-y-1">
              <span className="text-xs font-mono text-text-muted">Jenis Paket Aktif</span>
              <h4 className="text-base font-bold text-primary">{child.packageType}</h4>
              <p className="text-xs text-text-muted">
                Total {child.totalPackageSessions} Sesi Tatap Muka ke Rumah
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-text-muted">Sisa Kuota Belajar</span>
              <h4 className="text-base font-bold text-primary">
                {child.remainingSessions} dari {child.totalPackageSessions} Sesi
              </h4>
              <p className="text-xs text-text-muted">
                Berlaku hingga <strong className="text-primary">{child.validUntil}</strong>
              </p>
            </div>

            <div className="space-y-2 flex flex-col justify-center">
              <Link
                href={`/${locale}/harga`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:bg-neutral-800 transition-colors shadow-xs"
              >
                <span>Perpanjang / Tambah Sesi</span>
                <ChevronRight className="w-4 h-4 text-accent" />
              </Link>
              <span className="text-[10px] font-mono text-text-muted text-center">
                Tarif All-In Bebas Biaya Transport (Rp0)
              </span>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
}
