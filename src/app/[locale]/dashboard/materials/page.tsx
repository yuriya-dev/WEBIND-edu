"use client";

import StudentLayout from "@/components/dashboard/StudentLayout";
import { FolderArchive, Download, FileCode, FileText, ExternalLink } from "lucide-react";

export default function StudentMaterialsPage() {
  const materials = [
    { title: "Python Cheat Sheet & Syntax Guide (PDF)", size: "2.4 MB", type: "PDF Document", icon: FileText },
    { title: "Module 01 - Algorithms & Flowchart Slides", size: "8.1 MB", type: "Slide Deck", icon: FileText },
    { title: "Module 02 - Starter Code & Problem Sets (ZIP)", size: "1.2 MB", type: "Source Code", icon: FileCode },
    { title: "Python Standard Library Quick Reference", size: "Online Guide", type: "Web Resource", icon: ExternalLink },
    { title: "Final Project Boilerplate Template", size: "540 KB", type: "GitHub Starter", icon: FileCode },
  ];

  return (
    <StudentLayout>
      <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
            Resource Library
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-primary mt-1">
            Learning Materials
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Downloadable guides, slide decks, starter templates, and reference materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {materials.map((mat, idx) => {
            const Icon = mat.icon;
            return (
              <div key={idx} className="card-flat flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-background rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-primary">{mat.title}</h3>
                    <p className="text-[10px] text-text-muted">{mat.type} · {mat.size}</p>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Downloading ${mat.title}`)}
                  className="p-2 rounded-lg bg-background hover:bg-accent text-primary transition-colors"
                  aria-label="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </StudentLayout>
  );
}
