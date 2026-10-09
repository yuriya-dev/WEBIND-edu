"use client";

import { useState } from "react";
import {
  ContentBlock,
  ContentBlockType,
  mockMediaLibrary,
  MediaItem,
} from "@/lib/data/contentStudio";
import {
  Type,
  Heading,
  Image as ImageIcon,
  Code as CodeIcon,
  AlertCircle,
  Lock,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Terminal,
  Play,
  Copy,
  Check,
  CheckCircle2,
  Upload,
  BookOpen,
} from "lucide-react";

interface UnifiedMaterialRendererProps {
  blocks: ContentBlock[];
  isEditable?: boolean; // When true: inline editing for tutors. When false: student viewing mode.
  onUpdateBlocks?: (blocks: ContentBlock[]) => void;
  userRole?: "tutor" | "student" | "parent";
}

export default function UnifiedMaterialRenderer({
  blocks,
  isEditable = false,
  onUpdateBlocks,
  userRole = "student",
}: UnifiedMaterialRendererProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [codeExecutionOutputs, setCodeExecutionOutputs] = useState<Record<string, string>>({});
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaTargetBlockId, setMediaTargetBlockId] = useState<string | null>(null);

  // Filter out teacher-notes for students and parents
  const visibleBlocks = blocks.filter((b) => {
    if (userRole === "student" || userRole === "parent") {
      return b.type !== "teacher-note";
    }
    return true;
  });

  const updateBlock = (id: string, partial: Partial<ContentBlock>) => {
    if (!onUpdateBlocks) return;
    const updated = blocks.map((b) => (b.id === id ? { ...b, ...partial } : b));
    onUpdateBlocks(updated);
  };

  const removeBlock = (id: string) => {
    if (!onUpdateBlocks) return;
    onUpdateBlocks(blocks.filter((b) => b.id !== id));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    if (!onUpdateBlocks) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= blocks.length) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIdx];
    newBlocks[targetIdx] = temp;
    onUpdateBlocks(newBlocks);
  };

  const addBlockAfter = (index: number, type: ContentBlockType) => {
    if (!onUpdateBlocks) return;
    const newBlock: ContentBlock = {
      id: `blk-${Date.now()}`,
      type,
      text:
        type === "heading"
          ? "Judul Bagian Baru"
          : type === "paragraph"
          ? "Tulis penjelasan konsep materi di sini..."
          : type === "callout"
          ? "Catatan penting untuk dipahami."
          : type === "teacher-note"
          ? "Catatan privat tutor: Ajak murid mencoba..."
          : undefined,
      cp: type === "heading" ? ["AP"] : undefined,
      tone: type === "callout" ? "tip" : undefined,
      visibility: type === "teacher-note" ? "tutor" : undefined,
      lang: type === "code" ? "python" : undefined,
      filename: type === "code" ? "main.py" : undefined,
      runnable: type === "code" ? true : undefined,
      code: type === "code" ? 'print("Halo dari Webind Edu!")' : undefined,
      expectedOutput: type === "code" ? "Halo dari Webind Edu!" : undefined,
      mediaUrl:
        type === "image"
          ? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
          : undefined,
      alt: type === "image" ? "Deskripsi gambar untuk aksesibilitas" : undefined,
      caption: type === "image" ? "Keterangan gambar" : undefined,
      quizEmbed:
        type === "quiz-embed"
          ? {
              question: "Pertanyaan kuis pemahaman konsep:",
              options: ["Pilihan A (Benar)", "Pilihan B (Salah)", "Pilihan C (Salah)"],
              correctIndex: 0,
              explanation: "Penjelasan mengapa pilihan A benar..."
            }
          : undefined,
    };

    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    onUpdateBlocks(newBlocks);
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRunCode = (id: string, expected?: string) => {
    setCodeExecutionOutputs((prev) => ({
      ...prev,
      [id]: expected || "✓ Kode berhasil dieksekusi!",
    }));
  };

  const openMediaPicker = (blockId: string) => {
    setMediaTargetBlockId(blockId);
    setIsMediaModalOpen(true);
  };

  const selectMedia = (media: MediaItem) => {
    if (mediaTargetBlockId) {
      updateBlock(mediaTargetBlockId, {
        mediaUrl: media.url,
        alt: media.alt,
        caption: media.title,
      });
    }
    setIsMediaModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {visibleBlocks.map((block, idx) => {
        return (
          <div
            key={block.id}
            className={`group relative transition-all ${
              isEditable
                ? "p-3 rounded-2xl border border-transparent hover:border-neutral-300 hover:bg-neutral-50/50"
                : ""
            }`}
          >
            {/* TUTOR INLINE ACTION TOOLBAR (When isEditable = true) */}
            {isEditable && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3.5 right-4 z-10 flex items-center gap-1 bg-primary text-background px-2.5 py-1 rounded-full shadow-md text-xs font-mono">
                <button
                  type="button"
                  onClick={() => moveBlock(idx, "up")}
                  disabled={idx === 0}
                  className="p-1 hover:text-accent disabled:opacity-30"
                  title="Pindah ke Atas"
                >
                  <MoveUp className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(idx, "down")}
                  disabled={idx === blocks.length - 1}
                  className="p-1 hover:text-accent disabled:opacity-30"
                  title="Pindah ke Bawah"
                >
                  <MoveDown className="w-3 h-3" />
                </button>
                <span className="w-px h-3 bg-neutral-600 mx-1" />
                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  className="p-1 hover:text-rose-400 text-rose-300"
                  title="Hapus Blok"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* BLOCK TYPE: HEADING */}
            {block.type === "heading" && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  {isEditable ? (
                    <input
                      type="text"
                      value={block.text || ""}
                      onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                      className="text-xl sm:text-2xl font-extrabold text-primary bg-transparent border-b border-dashed border-neutral-300 focus:outline-none focus:border-primary w-full py-1"
                    />
                  ) : (
                    <h2 className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">
                      {block.text}
                    </h2>
                  )}

                  {/* CP Badge */}
                  {block.cp && (
                    <div className="flex items-center gap-1 shrink-0">
                      {block.cp.map((c) => (
                        <span
                          key={c}
                          className="px-2 py-0.5 rounded-full bg-secondary text-primary font-mono text-[10px] font-bold"
                        >
                          CP: {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* BLOCK TYPE: PARAGRAPH */}
            {block.type === "paragraph" && (
              <div>
                {isEditable ? (
                  <textarea
                    rows={3}
                    value={block.text || ""}
                    onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                    className="w-full text-sm sm:text-base text-primary/90 bg-transparent border-b border-dashed border-neutral-200 focus:outline-none focus:border-primary leading-relaxed resize-y"
                  />
                ) : (
                  <p className="text-sm sm:text-base text-primary/90 leading-relaxed">
                    {block.text}
                  </p>
                )}
              </div>
            )}

            {/* BLOCK TYPE: IMAGE (NEW ACCORDING TO USULAN B) */}
            {block.type === "image" && (
              <div className="space-y-2 my-2">
                <div className="relative rounded-2xl overflow-hidden border border-secondary bg-neutral-100 max-w-2xl mx-auto shadow-xs">
                  {block.mediaUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={block.mediaUrl}
                      alt={block.alt || "Gambar materi"}
                      className="w-full h-auto object-cover max-h-96"
                      loading="lazy"
                    />
                  ) : (
                    <div className="p-8 text-center text-text-muted">
                      <ImageIcon className="w-8 h-8 mx-auto mb-2 text-neutral-400" />
                      <span>Belum ada gambar terpilih</span>
                    </div>
                  )}

                  {isEditable && (
                    <button
                      type="button"
                      onClick={() => openMediaPicker(block.id)}
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-primary/90 text-background text-xs font-bold hover:bg-primary transition-colors flex items-center gap-1.5 shadow-md"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Ganti Gambar</span>
                    </button>
                  )}
                </div>

                {/* Alt & Caption */}
                {isEditable ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs max-w-2xl mx-auto">
                    <input
                      type="text"
                      placeholder="Teks alternatif (wajib untuk aksesibilitas)..."
                      value={block.alt || ""}
                      onChange={(e) => updateBlock(block.id, { alt: e.target.value })}
                      className="p-1.5 rounded-lg bg-secondary/40 border border-secondary text-primary"
                    />
                    <input
                      type="text"
                      placeholder="Keterangan gambar (caption)..."
                      value={block.caption || ""}
                      onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                      className="p-1.5 rounded-lg bg-secondary/40 border border-secondary text-primary"
                    />
                  </div>
                ) : (
                  block.caption && (
                    <p className="text-center text-xs text-text-muted italic max-w-2xl mx-auto">
                      {block.caption}
                    </p>
                  )
                )}
              </div>
            )}

            {/* BLOCK TYPE: CODE (RUNNABLE / EDITABLE) */}
            {block.type === "code" && (
              <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-[#121212] text-neutral-100 shadow-lg my-2">
                <div className="bg-[#1c1c1c] px-4 py-2 flex items-center justify-between border-b border-neutral-800 text-xs font-mono">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <CodeIcon className="w-3.5 h-3.5 text-accent" />
                    {isEditable ? (
                      <input
                        type="text"
                        value={block.filename || "main.py"}
                        onChange={(e) => updateBlock(block.id, { filename: e.target.value })}
                        className="bg-transparent border-b border-neutral-700 text-neutral-200 focus:outline-none py-0.5 text-xs"
                      />
                    ) : (
                      <span>{block.filename || "script.py"}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {block.code && (
                      <button
                        type="button"
                        onClick={() => handleCopyCode(block.id, block.code!)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] transition-colors"
                      >
                        {copiedId === block.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    )}

                    {block.runnable && (
                      <button
                        type="button"
                        onClick={() => handleRunCode(block.id, block.expectedOutput)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-accent text-primary font-bold text-[11px] hover:opacity-90 transition-opacity"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Jalankan</span>
                      </button>
                    )}
                  </div>
                </div>

                {isEditable ? (
                  <textarea
                    rows={4}
                    value={block.code || ""}
                    onChange={(e) => updateBlock(block.id, { code: e.target.value })}
                    className="w-full p-4 font-mono text-xs sm:text-sm bg-[#121212] text-emerald-300 focus:outline-none resize-y leading-relaxed"
                  />
                ) : (
                  <pre className="p-4 font-mono text-xs sm:text-sm text-[#e6e6e6] overflow-x-auto leading-relaxed">
                    <code>{block.code}</code>
                  </pre>
                )}

                {/* Output Terminal */}
                {codeExecutionOutputs[block.id] && (
                  <div className="bg-[#0a0a0a] border-t border-neutral-800 p-3 space-y-1 font-mono text-xs">
                    <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] uppercase">
                      <Terminal className="w-3 h-3 text-accent" /> Output Terminal:
                    </div>
                    <pre className="text-emerald-400 whitespace-pre-wrap">
                      {codeExecutionOutputs[block.id]}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* BLOCK TYPE: CALLOUT */}
            {block.type === "callout" && (
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 text-xs sm:text-sm my-2 ${
                  block.tone === "tip"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950"
                    : "bg-blue-500/10 border-blue-500/30 text-blue-950"
                }`}
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                <div className="w-full">
                  {isEditable ? (
                    <input
                      type="text"
                      value={block.text || ""}
                      onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                      className="w-full bg-transparent border-b border-dashed border-neutral-400 focus:outline-none py-0.5 text-xs sm:text-sm text-primary font-medium"
                    />
                  ) : (
                    <p className="leading-relaxed font-medium">{block.text}</p>
                  )}
                </div>
              </div>
            )}

            {/* BLOCK TYPE: TEACHER NOTE (PRIVATE TUTOR ONLY) */}
            {block.type === "teacher-note" && userRole === "tutor" && (
              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300/80 text-amber-950 text-xs sm:text-sm space-y-1.5 my-2 shadow-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 font-mono text-[11px] uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Catatan Privat Tutor (Tersembunyi dari Murid & Orang Tua)</span>
                </div>
                {isEditable ? (
                  <textarea
                    rows={2}
                    value={block.text || ""}
                    onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                    className="w-full p-2 bg-white rounded-lg border border-amber-200 text-amber-950 text-xs focus:outline-none"
                    placeholder="Instruksi mengajar tatap muka, pertanyaan pemantik..."
                  />
                ) : (
                  <p className="italic text-amber-900 leading-relaxed">{block.text}</p>
                )}
              </div>
            )}

            {/* BLOCK TYPE: QUIZ EMBED (NEW ACCORDING TO USER REQUEST) */}
            {block.type === "quiz-embed" && (
              <div className="p-5 rounded-2xl bg-secondary/50 border border-neutral-300 space-y-3 my-2 shadow-xs">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-accent" /> Kuis Cek Pemahaman di Sini
                  </span>
                  <span className="px-2 py-0.5 rounded bg-background text-text-muted text-[10px]">
                    Interaktif
                  </span>
                </div>

                {isEditable ? (
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-text-muted">Pertanyaan Kuis:</label>
                    <input
                      type="text"
                      value={block.quizEmbed?.question || "Pertanyaan kuis..."}
                      onChange={(e) =>
                        updateBlock(block.id, {
                          quizEmbed: {
                            question: e.target.value,
                            options: block.quizEmbed?.options || ["Pilihan A", "Pilihan B"],
                            correctIndex: block.quizEmbed?.correctIndex || 0,
                            explanation: block.quizEmbed?.explanation || "Penjelasan jawaban..."
                          }
                        })
                      }
                      className="w-full p-2 text-xs font-semibold rounded-lg bg-background border border-secondary text-primary focus:outline-none"
                    />

                    <label className="text-[11px] font-bold text-text-muted pt-1 block">Pilihan Jawaban (Opsi 1 / Opsi 2 / Opsi 3):</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(block.quizEmbed?.options || ["Pilihan A", "Pilihan B"]).map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-2 bg-background p-2 rounded-lg border border-secondary text-xs">
                          <input
                            type="radio"
                            name={`correct-${block.id}`}
                            checked={(block.quizEmbed?.correctIndex ?? 0) === optIdx}
                            onChange={() =>
                              updateBlock(block.id, {
                                quizEmbed: {
                                  question: block.quizEmbed?.question || "",
                                  options: block.quizEmbed?.options || [],
                                  correctIndex: optIdx,
                                  explanation: block.quizEmbed?.explanation || ""
                                }
                              })
                            }
                            className="accent-primary"
                          />
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => {
                              const newOpts = [...(block.quizEmbed?.options || [])];
                              newOpts[optIdx] = e.target.value;
                              updateBlock(block.id, {
                                quizEmbed: {
                                  question: block.quizEmbed?.question || "",
                                  options: newOpts,
                                  correctIndex: block.quizEmbed?.correctIndex || 0,
                                  explanation: block.quizEmbed?.explanation || ""
                                }
                              });
                            }}
                            className="w-full bg-transparent focus:outline-none text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-primary">
                      {block.quizEmbed?.question || "Kuis pemahaman konsep"}
                    </p>
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {(block.quizEmbed?.options || ["Opsi A", "Opsi B"]).map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => alert(optIdx === (block.quizEmbed?.correctIndex ?? 0) ? "🎉 Benar! Bagus sekali." : "Coba pikirkan lagi!")}
                          className="w-full text-left p-3 rounded-xl bg-background hover:bg-neutral-100 border border-secondary text-xs font-medium transition-all"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* INLINE PLUS ADDER (Between Blocks) */}
            {isEditable && (
              <div className="flex items-center justify-center my-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-1.5 bg-background border border-secondary shadow-md px-3 py-1 rounded-full text-xs">
                  <span className="text-[10px] font-mono text-text-muted font-bold mr-1">+ Tambah:</span>
                  <button
                    type="button"
                    onClick={() => addBlockAfter(idx, "heading")}
                    className="px-2 py-0.5 rounded bg-secondary hover:bg-neutral-200 text-primary text-[11px] font-bold"
                  >
                    Judul
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlockAfter(idx, "paragraph")}
                    className="px-2 py-0.5 rounded bg-secondary hover:bg-neutral-200 text-primary text-[11px] font-bold"
                  >
                    Paragraf
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlockAfter(idx, "image")}
                    className="px-2 py-0.5 rounded bg-secondary hover:bg-neutral-200 text-primary text-[11px] font-bold flex items-center gap-1"
                  >
                    <ImageIcon className="w-3 h-3" /> Gambar
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlockAfter(idx, "code")}
                    className="px-2 py-0.5 rounded bg-secondary hover:bg-neutral-200 text-primary text-[11px] font-bold flex items-center gap-1"
                  >
                    <CodeIcon className="w-3 h-3" /> Kode
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlockAfter(idx, "callout")}
                    className="px-2 py-0.5 rounded bg-secondary hover:bg-neutral-200 text-primary text-[11px] font-bold"
                  >
                    Tips
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlockAfter(idx, "quiz-embed")}
                    className="px-2 py-0.5 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-[11px] font-bold flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> + Kuis
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlockAfter(idx, "teacher-note")}
                    className="px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-bold flex items-center gap-1"
                  >
                    <Lock className="w-3 h-3" /> Catatan Tutor
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* MEDIA LIBRARY MODAL PICKER */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-background rounded-3xl border border-secondary p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-secondary">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-accent" />
                <h3 className="text-base font-bold text-primary">
                  Perpustakaan Media (Media Library)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMediaModalOpen(false)}
                className="text-xs font-mono px-2.5 py-1 rounded-lg bg-secondary text-primary font-bold"
              >
                Tutup
              </button>
            </div>

            <p className="text-xs text-text-muted">
              Pilih ilustrasi diagram alur, flowchart, atau antarmuka yang sudah dioptimasi untuk koneksi luring murid:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {mockMediaLibrary.map((media) => (
                <div
                  key={media.id}
                  onClick={() => selectMedia(media)}
                  className="rounded-2xl border border-secondary overflow-hidden cursor-pointer hover:border-primary transition-all group bg-secondary/20 p-2 space-y-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={media.url}
                    alt={media.alt}
                    className="w-full h-32 object-cover rounded-xl"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-primary truncate group-hover:text-primary">
                      {media.title}
                    </h4>
                    <span className="text-[10px] font-mono text-text-muted uppercase">
                      Kategori: {media.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
