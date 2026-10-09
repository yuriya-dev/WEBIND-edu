"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import ParentLayout from "@/components/dashboard/ParentLayout";
import { mockParentChild } from "@/lib/data/parent";
import { mockStudioMaterials, mockStudioPresentations } from "@/lib/data/contentStudio";
import {
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Presentation,
  Download,
  Eye,
  Award,
  Camera,
  ZoomIn,
  X,
} from "lucide-react";

export default function ParentReportsPage() {
  const locale = useLocale();
  const child = mockParentChild;
  const [selectedReportId, setSelectedReportId] = useState<string>(child.recentReports[0].id);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const selectedReport =
    child.recentReports.find((r) => r.id === selectedReportId) || child.recentReports[0];

  return (
    <ParentLayout>
      <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-secondary">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-primary text-background font-bold">
                Laporan Transparan
              </span>
              <span className="text-xs font-mono text-text-muted">
                Diberikan Tutor Pasca Sesi Les
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mt-1">
              Laporan Sesi Belajar {child.nickname}
            </h1>
            <p className="text-xs sm:text-sm text-text-muted mt-0.5">
              Pantau langsung materi yang dipelajari, kompetensi CP yang dikuasai, dan tugas latihan anak.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-secondary font-bold text-primary">
              Total {child.recentReports.length} Laporan Tersedia
            </span>
          </div>
        </div>

        {/* 2-Column Layout: Left List of Reports, Right Detailed Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report List */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              Pilih Sesi
            </h2>
            <div className="space-y-2">
              {child.recentReports.map((rep) => {
                const isSelected = rep.id === selectedReportId;
                return (
                  <button
                    key={rep.id}
                    type="button"
                    onClick={() => setSelectedReportId(rep.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all space-y-1.5 ${
                      isSelected
                        ? "bg-primary text-background border-primary shadow-sm"
                        : "bg-background border-secondary hover:border-neutral-300 text-primary"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className={isSelected ? "text-accent font-bold" : "text-text-muted"}>
                        Sesi {rep.sessionNumber}
                      </span>
                      <span className={isSelected ? "text-neutral-300" : "text-text-muted"}>
                        {rep.date}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm line-clamp-1">{rep.topic}</h4>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded inline-block font-bold ${
                        isSelected
                          ? "bg-neutral-800 text-emerald-300"
                          : "bg-emerald-50 text-emerald-800"
                      }`}
                    >
                      {rep.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Report View */}
          <div className="lg:col-span-2 bg-background rounded-3xl border border-secondary p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-secondary">
              <div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-secondary font-bold text-primary">
                  Sesi Ke-{selectedReport.sessionNumber} • {selectedReport.date}
                </span>
                <h3 className="text-xl font-bold text-primary mt-2">
                  {selectedReport.topic}
                </h3>
              </div>
              <div className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl font-bold self-start sm:self-auto">
                {selectedReport.status} (Rp0 Transport)
              </div>
            </div>

            {/* CP Elements Mastered */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase text-text-muted">
                1. Capaian Pembelajaran (CP) yang Dikuasai:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedReport.cpElementsMastered.map((cp, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-secondary text-primary font-mono text-xs font-bold flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{cp}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Tutor Note */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase text-text-muted">
                2. Catatan Tutor untuk Orang Tua:
              </h4>
              <div className="p-4 rounded-2xl bg-secondary/40 border border-secondary text-xs sm:text-sm leading-relaxed italic text-primary">
                &ldquo;{selectedReport.tutorNote}&rdquo;
              </div>
            </div>

            {/* Homework / Next Steps */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase text-text-muted">
                3. Latihan / Tugas Mandiri Murid:
              </h4>
              <div className="p-4 rounded-2xl bg-secondary/40 border border-secondary text-xs sm:text-sm leading-relaxed text-primary">
                {selectedReport.homework}
              </div>
            </div>

            {/* Documentation Photos (Bukti Gambar Sesi Belajar Tatap Muka) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase text-text-muted flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-accent" />
                  <span>4. Bukti Gambar Sesi & Hasil Koding Anak:</span>
                </h4>
                <span className="text-[10px] font-mono text-text-muted">
                  {(selectedReport.documentationPhotos || []).length} Foto Terlampir
                </span>
              </div>

              {selectedReport.documentationPhotos && selectedReport.documentationPhotos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedReport.documentationPhotos.map((imgUrl, imgIdx) => (
                    <div
                      key={imgIdx}
                      onClick={() => setLightboxImage(imgUrl)}
                      className="group relative aspect-video sm:aspect-4/3 rounded-2xl overflow-hidden border border-secondary cursor-pointer bg-secondary/30 hover:border-primary transition-all shadow-2xs"
                    >
                      <img
                        src={imgUrl}
                        alt={`Bukti Sesi ${selectedReport.sessionNumber} - Foto ${imgIdx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <div className="flex items-center gap-1.5 text-xs font-bold bg-neutral-900/80 px-2.5 py-1 rounded-full">
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>Perbesar</span>
                        </div>
                      </div>
                      <div className="absolute bottom-1.5 left-1.5 bg-neutral-900/70 text-white text-[9px] font-mono px-2 py-0.5 rounded-md backdrop-blur-xs">
                        Foto #{imgIdx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-secondary/20 border border-dashed border-secondary text-center text-xs text-text-muted flex items-center justify-center gap-2">
                  <Camera className="w-4 h-4 opacity-40" />
                  <span>Belum ada foto dokumentasi untuk sesi ini.</span>
                </div>
              )}
            </div>

            {/* Companion Materials for Parents (Read-Only) */}
            <div className="pt-4 border-t border-secondary space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase text-text-muted">
                  Bahan Belajar Sesi Ini (Bisa Dibaca Orang Tua):
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href={`/${locale}/dashboard/materials/algo-flowcharts`}
                  className="p-3.5 rounded-2xl border border-secondary hover:border-primary transition-all flex items-center justify-between text-xs group"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-accent" />
                    <div>
                      <div className="font-bold text-primary">Materi & Modul Bacaan</div>
                      <div className="text-[10px] text-text-muted">Baca modul materi yang diajarkan</div>
                    </div>
                  </div>
                  <Eye className="w-4 h-4 text-text-muted group-hover:text-primary" />
                </Link>

                <Link
                  href={`/${locale}/tutor/studio/presentations/pres-coding-starter-s1`}
                  className="p-3.5 rounded-2xl border border-secondary hover:border-primary transition-all flex items-center justify-between text-xs group"
                >
                  <div className="flex items-center gap-2.5">
                    <Presentation className="w-4 h-4 text-accent" />
                    <div>
                      <div className="font-bold text-primary">Slide Presentasi Tutor</div>
                      <div className="text-[10px] text-text-muted">Tinjau kembali slide di rumah</div>
                    </div>
                  </div>
                  <Eye className="w-4 h-4 text-text-muted group-hover:text-primary" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Lightbox Preview Foto Dokumentasi */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-background rounded-3xl overflow-hidden border border-secondary shadow-2xl p-2 sm:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-3 border-b border-secondary">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold font-mono text-primary">
                    Dokumentasi Sesi {selectedReport.sessionNumber} ({selectedReport.date})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 rounded-full hover:bg-secondary text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-2 sm:p-4 flex items-center justify-center max-h-[75vh] overflow-hidden">
                <img
                  src={lightboxImage}
                  alt="Dokumentasi Sesi Full"
                  className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ParentLayout>
  );
}
