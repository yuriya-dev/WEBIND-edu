export interface ParentChildInfo {
  id: string;
  name: string;
  nickname: string;
  grade: string;
  avatar: string;
  currentProgram: string;
  tutorName: string;
  packageType: "Tuntas Program" | "Bulanan (4 Sesi)" | "Sesi Satuan";
  remainingSessions: number;
  totalPackageSessions: number;
  validUntil: string;
  progressPercent: number;
  nextSession: {
    sessionNumber: number;
    topic: string;
    date: string;
    time: string;
    locationType: "Tatap Muka di Rumah" | "Daring (Google Meet)";
    address: string;
    backupMeetUrl?: string;
  };
  recentReports: {
    id: string;
    date: string;
    sessionNumber: number;
    topic: string;
    cpElementsMastered: string[];
    tutorNote: string;
    homework: string;
    status: "Hadir Tatap Muka" | "Hadir Daring" | "Izin";
    documentationPhotos?: string[];
  }[];
}

export const mockParentChild: ParentChildInfo = {
  id: "std-001",
  name: "Andi Pratama",
  nickname: "Andi",
  grade: "SMP Kelas 7",
  avatar: "AP",
  currentProgram: "Coding Starter (Informatika SMP)",
  tutorName: "Ahmad Fauzi, S.Kom.",
  packageType: "Tuntas Program",
  remainingSessions: 4,
  totalPackageSessions: 12,
  validUntil: "15 November 2026",
  progressPercent: 67,
  nextSession: {
    sessionNumber: 9,
    topic: "Percabangan Logika Majemuk (If-Else Bersarang) di Scratch",
    date: "Sabtu, 11 Oktober 2026",
    time: "16:00 - 17:30 WIB",
    locationType: "Tatap Muka di Rumah",
    address: "Jl. Melati No. 14, Jakarta Selatan",
    backupMeetUrl: "https://meet.google.com/abc-defg-hij",
  },
  recentReports: [
    {
      id: "rep-08",
      date: "04 Okt 2026",
      sessionNumber: 8,
      topic: "Pengenalan Variabel & Skor Game",
      cpElementsMastered: ["AP (Algoritma & Pemrograman)", "BK (Berpikir Komputasional)"],
      tutorNote: "Andi antusias sekali membuat sistem skor permainan. Logika penjumlahan poin sudah sangat lancar.",
      homework: "Menambahkan sprite koin yang muncul acak (bisa dibantu slide panduan).",
      status: "Hadir Tatap Muka",
      documentationPhotos: [
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80"
      ],
    },
    {
      id: "rep-07",
      date: "27 Sep 2026",
      sessionNumber: 7,
      topic: "Deteksi Tabrakan Sprite & Animasi Karakter",
      cpElementsMastered: ["AP (Algoritma & Pemrograman)"],
      tutorNote: "Andi memahami koordinat X dan Y dengan baik setelah menggunakan kertas panduan.",
      homework: "Latihan kuis 4 butir soal di portal siswa.",
      status: "Hadir Tatap Muka",
      documentationPhotos: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
      ],
    },
    {
      id: "rep-06",
      date: "20 Sep 2026",
      sessionNumber: 6,
      topic: "Perulangan Berhingga (Repeat) vs Tak Hingga (Forever)",
      cpElementsMastered: ["BK (Berpikir Komputasional)"],
      tutorNote: "Sesi berjalan lancar tepat waktu. Konsep perulangan dikuasai 100%.",
      homework: "Tidak ada (fokus istirahat menjelang PTS sekolah).",
      status: "Hadir Tatap Muka",
      documentationPhotos: [
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80"
      ],
    },
  ],
};
