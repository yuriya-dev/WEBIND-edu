import { programs } from "./programs";

export type ContentStatus = "draft" | "published" | "archived";
export type QuestionType = "multiple_choice" | "true_false" | "short_answer" | "code_task";

// Supported Block Types based on docs/interaktif_modul.md
export type ContentBlockType =
  | "heading"
  | "paragraph"
  | "image"
  | "code"
  | "callout"
  | "quiz-embed"
  | "teacher-note";

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  text?: string;
  cp?: string[]; // e.g. ["AP"], ["BK"]
  // for image
  mediaUrl?: string;
  alt?: string;
  caption?: string;
  // for code
  lang?: string;
  filename?: string;
  runnable?: boolean;
  code?: string;
  expectedOutput?: string;
  // for callout
  tone?: "tip" | "warning" | "info" | "success";
  // for quiz-embed
  quizId?: string;
  quizEmbed?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  // for teacher-note (server/client filtered)
  visibility?: "tutor" | "public";
  levelFilter?: ("sd" | "smp" | "sma")[];
}

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  imageUrl?: string; // Image in quiz prompt
  imageAlt?: string;
  options?: string[]; // for multiple_choice
  optionImages?: string[]; // optional image per option
  correctAnswer: string | number; // index for mc, boolean string for tf, string for short, sample solution for code
  explanation: string;
  explanationImageUrl?: string;
  points: number;
  cpElement: string; // e.g. "AP", "BK", "TIK", "SK", "AD", "JKI"
  difficulty: "Dasar" | "Menengah" | "Tantangan";
  starterCode?: string; // for code_task
}

export interface QuizItem {
  id: string;
  programSlug: string;
  sessionNumber: number;
  title: string;
  description: string;
  status: ContentStatus;
  updatedAt: string;
  durationMinutes: number;
  passingScore: number;
  questions: Question[];
  assignedStudentIds: string[];
}

export type SlideInteractiveType =
  | "content"
  | "runnable_code"
  | "guess_output"
  | "step_ordering"
  | "quiz_mini"
  | "reflection";

export interface SlideItem {
  id: string;
  slideNumber: number;
  title: string;
  slideType?: SlideInteractiveType;
  bullets?: string[];
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  codeSnippet?: {
    language: string;
    code: string;
    output?: string;
    userExecutable?: boolean;
  };
  visualType?: "diagram" | "flowchart" | "code" | "discussion" | "quiz_mini";
  speakerNotes: string; // Private for tutor, hidden for students
  quickQuestion?: {
    prompt: string;
    options: string[];
    correctIndex: number;
  };
  guessOutputChallenge?: {
    prompt: string;
    codeSnippet: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  stepOrderingChallenge?: {
    prompt: string;
    steps: { id: string; label: string }[];
    correctOrder: string[]; // sequence of step ids
  };
  reflectionPrompt?: {
    question: string;
  };
}

export interface PresentationItem {
  id: string;
  programSlug: string;
  sessionNumber: number;
  title: string;
  status: ContentStatus;
  updatedAt: string;
  estimatedMinutes: number;
  slides: SlideItem[];
}

export interface QuizEmbedBlockData {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StudioMaterialItem {
  id: string;
  programSlug: string;
  sessionNumber: number;
  title: string;
  status: ContentStatus;
  updatedAt: string;
  readTimeMinutes: number;
  targetAudience: string;
  blocks: ContentBlock[];
  assignedStudentIds?: string[]; // Assign module to specific students or entire program
  references?: {
    title: string;
    chapter?: string;
    url?: string;
  }[];
}

// Session Bundle combining Material + Quiz + Presentation
export interface SessionPackageBundle {
  id: string;
  programSlug: string;
  sessionNumber: number;
  title: string;
  materialId: string;
  presentationId: string;
  quizIds: string[];
  assignedStudentIds: string[];
  status: ContentStatus;
  updatedAt: string;
}

// ---------------- MEDIA LIBRARY (MOCK) ---------------- //

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  alt: string;
  category: "flowchart" | "diagram" | "screenshot" | "scratch";
  uploader: string;
}

export const mockMediaLibrary: MediaItem[] = [
  {
    id: "med-scratch-blocks",
    title: "Palet Balok Warna Scratch 3.0",
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    alt: "Tampilan antarmuka Scratch 3.0 dengan balok event dan motion",
    category: "scratch",
    uploader: "Ahmad Fauzi"
  },
  {
    id: "med-flowchart-if",
    title: "Diagram Alur Percabangan Logika (Flowchart If-Else)",
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    alt: "Diagram alur belah ketupat keputusan logika komputer",
    category: "flowchart",
    uploader: "Ahmad Fauzi"
  },
  {
    id: "med-web-structure",
    title: "Anatomi Struktur Semantik HTML5",
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    alt: "Skema header, main, dan footer dokumen halaman web",
    category: "diagram",
    uploader: "Ahmad Fauzi"
  }
];

// ---------------- MOCK DATA ---------------- //

export const mockStudioMaterials: StudioMaterialItem[] = [
  {
    id: "mat-coding-starter-s1",
    programSlug: "coding-starter",
    sessionNumber: 1,
    title: "Algoritma Sehari-hari & Pengenalan Scratch",
    status: "published",
    updatedAt: "2026-10-09",
    readTimeMinutes: 15,
    targetAudience: "SD Kelas 4–6 & SMP Kelas 7",
    references: [
      {
        title: "Buku Informatika SMP Kelas 7 Kemendikdasmen",
        chapter: "Bab 7: Algoritma dan Pemrograman",
        url: "https://buku.kemdikbud.go.id"
      }
    ],
    blocks: [
      {
        id: "b1",
        type: "heading",
        text: "1. Apa itu Algoritma dalam Kehidupan Nyata?",
        cp: ["BK"]
      },
      {
        id: "b2",
        type: "paragraph",
        text: "Algoritma adalah serangkaian instruksi langkah-demi-langkah yang teratur untuk menyelesaikan suatu masalah atau pekerjaan. Komputer tidak bisa menebak pikiran manusia. Bila urutan instruksi tertukar (misalnya: memakai sepatu sebelum kaos kaki), hasilnya akan salah atau error!"
      },
      {
        id: "b3",
        type: "image",
        mediaUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        alt: "Diagram alur langkah sistematis pembuatan keputusan",
        caption: "Ilustrasi alur berpikir komputasional teratur (Flowchart)."
      },
      {
        id: "b4",
        type: "callout",
        tone: "tip",
        text: "Pilar Berpikir Komputasional: Dekomposisi (pecah masalah), Pengenalan Pola, Abstraksi (fokus inti), dan Perancangan Algoritma."
      },
      {
        id: "b5",
        type: "teacher-note",
        visibility: "tutor",
        text: "Catatan Privat Tutor: Minta siswa memberikan contoh algoritma membuat teh manis atau sarapan di rumah mereka. Beri jeda 30 detik agar anak aktif berbicara."
      },
      {
        id: "b6",
        type: "heading",
        text: "2. Menjelajah Ruang Kerja Scratch 3.0",
        cp: ["AP", "TIK"]
      },
      {
        id: "b7",
        type: "paragraph",
        text: "Scratch menggunakan pemrograman visual berbasis balok warna. Tiga area terpenting adalah: Palet Balok (kiri), Area Skrip (tengah), dan Panggung Teater/Stage (kanan)."
      },
      {
        id: "b8",
        type: "image",
        mediaUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        alt: "Tampilan antarmuka Scratch 3.0 dengan balok event dan gerak",
        caption: "Ruang kerja Scratch 3.0: Tarik dan susun balok seperti bermain puzzle Lego!"
      },
      {
        id: "b9",
        type: "code",
        lang: "scratch",
        filename: "sprite_utama.sb3",
        runnable: true,
        code: "when [green flag] clicked\nsay [Halo, Dunia!] for (2) secs\nmove (10) steps",
        expectedOutput: "Kucing Scratch menyapa 'Halo, Dunia!' lalu melangkah maju 10 pixel."
      },
      {
        id: "b10",
        type: "teacher-note",
        visibility: "tutor",
        text: "Catatan Privat Tutor: Ajak siswa mengubah teks ucapan kucing menjadi nama panggilannya sendiri di laptop mereka."
      }
    ]
  },
  {
    id: "mat-web-dev-s1",
    programSlug: "web-developer",
    sessionNumber: 1,
    title: "Anatomi Web: HTML5 Semantik & Struktur Halaman",
    status: "published",
    updatedAt: "2026-10-08",
    readTimeMinutes: 20,
    targetAudience: "SMP Kelas 8–9, SMA, & Mahasiswa",
    references: [
      {
        title: "Buku Informatika SMA Kelas 10 Kemendikdasmen",
        chapter: "Bab 3: Teknologi Informasi dan Komunikasi - Pengembangan Web"
      }
    ],
    blocks: [
      {
        id: "bw1",
        type: "heading",
        text: "1. Kerangka Dasar HTML5 Semantik",
        cp: ["TIK", "AP"]
      },
      {
        id: "bw2",
        type: "paragraph",
        text: "HTML (HyperText Markup Language) adalah kerangka pembentuk halaman web di seluruh dunia. Gunakan elemen semantik agar website mudah dibaca oleh search engine (SEO) dan pembaca tunanetra (screen reader)."
      },
      {
        id: "bw3",
        type: "image",
        mediaUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
        alt: "Anatomi halaman web dengan tag header nav main section dan footer",
        caption: "Struktur semantik HTML5 standar internasional."
      },
      {
        id: "bw4",
        type: "code",
        lang: "html",
        filename: "index.html",
        runnable: true,
        code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Portofolio Saya</title>
</head>
<body>
  <header>
    <h1>Halo, Saya Andi!</h1>
    <p>Junior Web Explorer</p>
  </header>
  <main>
    <section>
      <h2>Tentang Saya</h2>
      <p>Sedang belajar web dev privat bersama Webind Edu.</p>
    </section>
  </main>
  <footer>
    <p>&copy; 2026 Andi Pratama</p>
  </footer>
</body>
</html>`,
        expectedOutput: "Halaman web menampilkan judul besar, perkenalan diri, dan copyright footer."
      },
      {
        id: "bw5",
        type: "teacher-note",
        visibility: "tutor",
        text: "Catatan Privat Tutor: Buka file index.html ini via ekstensi VS Code Live Server di laptop murid."
      }
    ]
  }
];

export const mockStudioQuizzes: QuizItem[] = [
  {
    id: "quiz-coding-starter-s1",
    programSlug: "coding-starter",
    sessionNumber: 1,
    title: "Kuis Pengenalan Logika Algoritma & Scratch",
    description: "Evaluasi pemahaman konsep urutan instruksi dan navigasi antarmuka Scratch 3.0",
    status: "published",
    updatedAt: "2026-10-09",
    durationMinutes: 15,
    passingScore: 75,
    assignedStudentIds: ["std-001", "std-002"],
    questions: [
      {
        id: "q-1",
        type: "multiple_choice",
        prompt: "Apa yang terjadi jika urutan instruksi (algoritma) dalam program tertukar atau tidak runtut?",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Diagram alur instruksi program",
        options: [
          "Komputer otomatis memperbaiki urutan yang salah",
          "Program akan menghasilkan output yang keliru atau terjadi error / bug",
          "Kecepatan komputer akan meningkat",
          "Layar monitor langsung mati otomatis"
        ],
        correctAnswer: 1,
        explanation: "Komputer mengeksekusi instruksi secara linear dari atas ke bawah. Bila urutan salah, alur logika terganggu dan timbul bug.",
        points: 25,
        cpElement: "BK",
        difficulty: "Dasar"
      },
      {
        id: "q-2",
        type: "true_false",
        prompt: "Di Scratch 3.0, balok berwarna kuning (Events) digunakan untuk memulai jalannya sebuah skrip aksi seperti 'when green flag clicked'.",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Balok warna kuning Events di Scratch",
        options: ["Benar", "Salah"],
        correctAnswer: "Benar",
        explanation: "Balok Event adalah pemicu (trigger) utama kapan sebuah skrip mulai dieksekusi di panggung.",
        points: 25,
        cpElement: "AP",
        difficulty: "Dasar"
      },
      {
        id: "q-3",
        type: "short_answer",
        prompt: "Sebutkan nama karakter kucing oranye yang menjadi maskot resmi aplikasi Scratch!",
        correctAnswer: "Scratch Cat",
        explanation: "Maskot resmi default di panggung Scratch bernama Scratch Cat.",
        points: 20,
        cpElement: "TIK",
        difficulty: "Dasar"
      },
      {
        id: "q-4",
        type: "code_task",
        prompt: "Tuliskan urutan logika 3 langkah sederhana robot untuk berjalan 10 langkah lalu melompat!",
        starterCode: "// Tulis 3 baris langkah robot di bawah ini:\n1. \n2. \n3. ",
        correctAnswer: "1. Maju 10 langkah\n2. Tekuk lutut\n3. Lompat ke atas",
        explanation: "Pastikan runtut: aksi maju mendahului aksi melompat.",
        points: 30,
        cpElement: "AP",
        difficulty: "Menengah"
      }
    ]
  }
];

export const mockStudioPresentations: PresentationItem[] = [
  {
    id: "pres-coding-starter-s1",
    programSlug: "coding-starter",
    sessionNumber: 1,
    title: "Slide Sesi 1: Menjadi Sutradara Komputer Pertama",
    status: "published",
    updatedAt: "2026-10-09",
    estimatedMinutes: 45,
    slides: [
      {
        id: "sl-1",
        slideNumber: 1,
        title: "Selamat Datang di Dunia Koding!",
        slideType: "content",
        bullets: [
          "Kamu bukan cuma pengguna game, hari ini kamu adalah penciptanya.",
          "Les privat tatap muka langsung: santai, bertahap, dan seru.",
          "Misi hari ini: Memerintahkan Kucing Scratch bergerak & bersuara!"
        ],
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Karakter Scratch di panggung",
        speakerNotes: "Buka sesi dengan sapaan hangat, tanyakan game atau aplikasi favorit anak. Tunjukkan energi positif agar siswa tidak takut salah."
      },
      {
        id: "sl-2",
        slideNumber: 2,
        title: "Apa itu Algoritma?",
        slideType: "step_ordering",
        stepOrderingChallenge: {
          prompt: "Urutkan langkah membuat segelas teh manis hangat secara runtut:",
          steps: [
            { id: "s-air", label: "Rebus air hingga mendidih" },
            { id: "s-celup", label: "Celupkan kantong teh ke cangkir" },
            { id: "s-gula", label: "Masukkan 1 sendok gula dan aduk rata" },
            { id: "s-tuang", label: "Tuangkan air panas ke cangkir" }
          ],
          correctOrder: ["s-air", "s-celup", "s-tuang", "s-gula"]
        },
        speakerNotes: "Ajak siswa mengurutkan langkah secara langsung di layar. Tanyakan apa yang terjadi jika gula diaduk sebelum ada air."
      },
      {
        id: "sl-3",
        slideNumber: 3,
        title: "Uji Coba: Tebak Keluaran Kode!",
        slideType: "guess_output",
        guessOutputChallenge: {
          prompt: "Perhatikan potongan kode Scratch berikut. Berapa total langkah kucing setelah dijalankan?",
          codeSnippet: "when [green flag] clicked\nmove (20) steps\nmove (30) steps",
          options: ["20 langkah", "30 langkah", "50 langkah", "Tidak bergerak"],
          correctIndex: 2,
          explanation: "Komputer mengeksekusi kedua instruksi berurutan: 20 + 30 = 50 langkah!"
        },
        speakerNotes: "Tahan murid menebak dulu sebelum memberitahu kunci jawaban."
      },
      {
        id: "sl-4",
        slideNumber: 4,
        title: "Eksplorasi Kode Langsung di Layar",
        slideType: "runnable_code",
        codeSnippet: {
          language: "python",
          code: `# Coba ganti angka nama dan langkah di bawah ini:
nama = "Andi"
langkah = 10 * 5
print(f"Halo {nama}, kucingmu bergerak {langkah} langkah!")`,
          output: "Halo Andi, kucingmu bergerak 50 langkah!",
          userExecutable: true
        },
        speakerNotes: "Ajak anak mengganti nilai variabel nama dengan namanya sendiri dan klik tombol 'Jalankan Kode'."
      },
      {
        id: "sl-5",
        slideNumber: 5,
        title: "Refleksi Akhir Sesi Selesai",
        slideType: "reflection",
        reflectionPrompt: {
          question: "Bagaimana perasaanmu memahami konsep algoritma & Scratch hari ini?"
        },
        speakerNotes: "Pilihan refleksi murid akan otomatis tersimpan ke catatan laporan sesi orang tua."
      }
    ]
  }
];

export const mockSessionBundles: SessionPackageBundle[] = [
  {
    id: "bundle-coding-starter-s1",
    programSlug: "coding-starter",
    sessionNumber: 1,
    title: "Paket Belajar Sesi 1: Algoritma & Dasar Scratch 3.0",
    materialId: "mat-coding-starter-s1",
    presentationId: "pres-coding-starter-s1",
    quizIds: ["quiz-coding-starter-s1"],
    assignedStudentIds: ["std-001", "std-002"],
    status: "published",
    updatedAt: "2026-10-09",
  },
  {
    id: "bundle-web-dev-s1",
    programSlug: "web-developer",
    sessionNumber: 1,
    title: "Paket Belajar Sesi 1: Anatomi HTML5 & Dokumen Semantik",
    materialId: "mat-web-dev-s1",
    presentationId: "pres-web-dev-s1",
    quizIds: [],
    assignedStudentIds: ["std-003"],
    status: "published",
    updatedAt: "2026-10-08",
  },
];

export function getProgramTitle(programSlug: string): string {
  const p = programs.find((prog) => prog.slug === programSlug);
  if (!p) return programSlug;
  switch (p.slug) {
    case "digital-starter": return "Digital Starter";
    case "coding-starter": return "Coding Starter";
    case "web-developer": return "Web Developer";
    case "ai-starter": return "AI Starter";
    case "ai-developer": return "AI Developer";
    default: return programSlug;
  }
}
