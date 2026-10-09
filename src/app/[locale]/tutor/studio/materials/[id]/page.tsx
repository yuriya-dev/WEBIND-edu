"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";
import TutorLayout from "@/components/dashboard/TutorLayout";
import UnifiedMaterialRenderer from "@/components/dashboard/UnifiedMaterialRenderer";
import {
  mockStudioMaterials,
  StudioMaterialItem,
  ContentBlock,
  getProgramTitle,
} from "@/lib/data/contentStudio";
import { programs } from "@/lib/data/programs";
import { mockTutor } from "@/lib/data/tutor";
import {
  ArrowLeft,
  Save,
  Eye,
  FileEdit,
  Sparkles,
  CheckCircle2,
  BookOpen,
  SlidersHorizontal,
  Layers,
  FileDown,
  UserCheck,
} from "lucide-react";

export default function MaterialEditorPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const materialId = params.id as string;

  const initialMaterial =
    mockStudioMaterials.find((m) => m.id === materialId) || mockStudioMaterials[0];

  const [material, setMaterial] = useState<StudioMaterialItem>(initialMaterial);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving">("saved");
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);

  // Auto-save logic whenever material changes
  const triggerAutoSave = (newMaterial: StudioMaterialItem) => {
    setSaveStatus("saving");
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    const timer = setTimeout(() => {
      setSaveStatus("saved");
    }, 1200);
    setAutoSaveTimer(timer);
  };

  const handleUpdateBlocks = (newBlocks: ContentBlock[]) => {
    const updated = { ...material, blocks: newBlocks };
    setMaterial(updated);
    triggerAutoSave(updated);
  };

  const handleManualSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
    }, 600);
  };

  return (
    <TutorLayout>
      <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-secondary">
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/tutor/studio`}
              className="p-2 rounded-xl bg-secondary hover:bg-neutral-200 text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary text-background font-bold uppercase">
                  WYSIWYG Studio Editor
                </span>
                <span className="text-xs font-mono text-text-muted">
                  Sesi {material.sessionNumber} • {getProgramTitle(material.programSlug)}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    saveStatus === "saved"
                      ? "bg-emerald-100 text-emerald-800 font-bold"
                      : "bg-amber-100 text-amber-800 animate-pulse"
                  }`}
                >
                  {saveStatus === "saved" ? "✓ Tersimpan Otomatis" : "Menyimpan..."}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary mt-1">
                {material.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-secondary/80 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("edit")}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === "edit"
                    ? "bg-primary text-background shadow-xs font-bold"
                    : "text-text-muted hover:text-primary"
                }`}
              >
                <FileEdit className="w-3.5 h-3.5" />
                <span>Sunting di Tempat</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === "preview"
                    ? "bg-primary text-background shadow-xs font-bold"
                    : "text-text-muted hover:text-primary"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Lihat Sebagai Murid</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleManualSave}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-background font-bold text-xs hover:bg-neutral-800 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4 text-accent" />
              <span>Publikasikan</span>
            </button>
          </div>
        </div>

        {/* Material Meta Card */}
        <div className="bg-background rounded-2xl border border-secondary p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-[11px] font-mono font-bold uppercase text-text-muted">
                Judul Modul
              </label>
              <input
                type="text"
                value={material.title}
                onChange={(e) => {
                  const updated = { ...material, title: e.target.value };
                  setMaterial(updated);
                  triggerAutoSave(updated);
                }}
                className="w-full mt-1 p-2 text-xs font-bold rounded-xl bg-secondary/30 border border-secondary text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono font-bold uppercase text-text-muted">
                Program Belajar
              </label>
              <select
                value={material.programSlug}
                onChange={(e) => {
                  const updated = { ...material, programSlug: e.target.value };
                  setMaterial(updated);
                  triggerAutoSave(updated);
                }}
                className="w-full mt-1 p-2 text-xs font-bold rounded-xl bg-secondary/30 border border-secondary text-primary focus:outline-none"
              >
                {programs.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.titleKey.replace("_", " ").toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-mono font-bold uppercase text-text-muted">
                Sesi Silabus Ke-
              </label>
              <input
                type="number"
                min={1}
                max={16}
                value={material.sessionNumber}
                onChange={(e) => {
                  const updated = { ...material, sessionNumber: Number(e.target.value) };
                  setMaterial(updated);
                  triggerAutoSave(updated);
                }}
                className="w-full mt-1 p-2 text-xs font-bold rounded-xl bg-secondary/30 border border-secondary text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono font-bold uppercase text-text-muted">
                Sasaran Jenjang
              </label>
              <input
                type="text"
                value={material.targetAudience}
                onChange={(e) => {
                  const updated = { ...material, targetAudience: e.target.value };
                  setMaterial(updated);
                  triggerAutoSave(updated);
                }}
                className="w-full mt-1 p-2 text-xs font-bold rounded-xl bg-secondary/30 border border-secondary text-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Student Assignment Control (Assign to specific student or all program) */}
          <div className="pt-3 border-t border-secondary space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] font-bold text-text-muted uppercase flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-accent" /> Penugasan Murid Bimbingan:
              </span>
              <span className="text-[10px] font-mono text-text-muted">
                {(material.assignedStudentIds?.length ?? 0) === 0
                  ? "Terbuka untuk semua murid program ini"
                  : `Khusus ${material.assignedStudentIds?.length} murid terpilih`}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {mockTutor.students.map((std) => {
                const isAssigned = (material.assignedStudentIds || []).includes(std.id);
                return (
                  <button
                    key={std.id}
                    type="button"
                    onClick={() => {
                      const current = material.assignedStudentIds || [];
                      const updatedIds = isAssigned
                        ? current.filter((id) => id !== std.id)
                        : [...current, std.id];
                      const updated = { ...material, assignedStudentIds: updatedIds };
                      setMaterial(updated);
                      triggerAutoSave(updated);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
                      isAssigned
                        ? "bg-primary text-background border-primary font-bold shadow-xs"
                        : "bg-secondary/40 text-text-muted border-secondary hover:text-primary hover:bg-secondary"
                    }`}
                  >
                    <span>{std.avatar}</span>
                    <span>{std.name}</span>
                    {isAssigned && <span className="text-accent text-[10px]">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Textbook Reference Accordion */}
          {material.references && material.references.length > 0 && (
            <div className="pt-3 border-t border-secondary flex items-center justify-between text-xs text-text-muted">
              <span className="font-mono text-[11px]">
                Referensi Resmi: <strong>{material.references[0].title}</strong> ({material.references[0].chapter})
              </span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold">
                ✓ Sesuai Kurikulum Merdeka
              </span>
            </div>
          )}
        </div>

        {/* WYSIWYG RENDERER CONTAINER */}
        <div className="bg-background rounded-3xl border border-secondary p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-secondary">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                {activeTab === "edit" ? "Mode Sunting Langsung (WYSIWYG)" : "Mode Tampilan Murid"}
              </span>
              <h2 className="text-lg font-bold text-primary">
                {material.title}
              </h2>
            </div>

            {activeTab === "edit" && (
              <span className="text-xs font-mono text-text-muted">
                Arahkan kursor antar blok untuk memunculkan tombol tambah (+)
              </span>
            )}
          </div>

          <UnifiedMaterialRenderer
            blocks={material.blocks}
            isEditable={activeTab === "edit"}
            onUpdateBlocks={handleUpdateBlocks}
            userRole={activeTab === "edit" ? "tutor" : "student"}
          />
        </div>
      </div>
    </TutorLayout>
  );
}
