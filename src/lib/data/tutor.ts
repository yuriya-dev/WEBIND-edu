export interface AttendanceHistoryEntry {
  date: string; // YYYY-MM-DD
  status: "present" | "late" | "absent";
  sessionNumber: number;
  topic: string;
  durationMinutes: number;
  notes?: string;
  documentationPhotos?: string[]; // URL or base64 photo documentation
}

export interface StudentModuleRecord {
  id: string;
  title: string;
  sessionNumber: number;
  status: "completed" | "in-progress" | "locked";
  completedAt?: string;
  score?: number;
  quizCompleted?: boolean;
}

export interface TutorStudentItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  parentName?: string;
  parentPhone?: string;
  avatar: string;
  program: string;
  level: "SMP" | "SMA" | "Mahasiswa" | "Umum";
  progressPercent: number;
  attendanceRate: number;
  totalSessions: number;
  completedSessions: number;
  lastSessionDate: string;
  nextSessionDate: string;
  status: "active" | "completed" | "on-hold";
  notes: string;
  attendanceHistory: AttendanceHistoryEntry[];
  modulesList: StudentModuleRecord[];
}

export interface TutorScheduleItem {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  program: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "16:00 - 17:30 WIB"
  sessionNumber: number;
  totalSessions: number;
  topic: string;
  mode: "home_tutoring" | "online_backup";
  address?: string;
  meetingLink?: string;
  status: "scheduled" | "completed" | "rescheduled" | "cancelled";
  attendanceStatus?: "present" | "late" | "absent";
  notes?: string;
  documentationPhotos?: string[];
}

export type TutorClassToday = TutorScheduleItem;

export interface TutorData {
  name: string;
  title: string;
  avatar: string;
  metrics: {
    totalStudents: number;
    activePrograms: number;
    classesToday: number;
    pendingAssignments: number;
    averageAttendance: number;
  };
  todayClasses: TutorScheduleItem[];
  students: TutorStudentItem[];
}

export const mockTutor: TutorData = {
  name: "Ahmad Fauzi, S.Kom.",
  title: "Lead Instructor — Programming & AI",
  avatar: "AF",
  metrics: {
    totalStudents: 18,
    activePrograms: 4,
    classesToday: 3,
    pendingAssignments: 7,
    averageAttendance: 94,
  },
  todayClasses: [
    {
      id: "cls-1",
      studentId: "std-001",
      studentName: "Andi Pratama",
      studentAvatar: "AP",
      program: "Coding Starter (Python)",
      date: "2026-09-09",
      time: "16:00 - 17:30 WIB",
      sessionNumber: 8,
      totalSessions: 10,
      topic: "Python Functions & Modular Code",
      mode: "home_tutoring",
      address: "Jl. Margonda Raya No. 45, Beji, Depok",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      status: "scheduled",
      notes: "Tatap muka ke rumah. Bawa modul function & argumen.",
    },
    {
      id: "cls-2",
      studentId: "std-002",
      studentName: "Budi Santoso",
      studentAvatar: "BS",
      program: "AI Starter",
      date: "2026-09-09",
      time: "19:00 - 20:30 WIB",
      sessionNumber: 4,
      totalSessions: 6,
      topic: "Prompt Engineering & AI Tools",
      mode: "home_tutoring",
      address: "Komplek Pesona Depok Blok B2 No. 8",
      meetingLink: "https://meet.google.com/xyz-uvwx-rst",
      status: "scheduled",
      notes: "Eksplorasi pembuatan bot edukasi pribadi.",
    },
    {
      id: "cls-3",
      studentId: "std-003",
      studentName: "Sarah Putri",
      studentAvatar: "SP",
      program: "Web Developer (React)",
      date: "2026-09-09",
      time: "20:30 - 22:00 WIB",
      sessionNumber: 6,
      totalSessions: 12,
      topic: "React State & Hooks (useState, useEffect)",
      mode: "online_backup",
      meetingLink: "https://meet.google.com/klm-nopq-rst",
      status: "scheduled",
      notes: "Sesi online backup via Google Meet atas permintaan wali.",
    },
    {
      id: "cls-4",
      studentId: "std-004",
      studentName: "Rina Wijaya",
      studentAvatar: "RW",
      program: "AI Developer (ML)",
      date: "2026-09-10",
      time: "16:00 - 17:30 WIB",
      sessionNumber: 12,
      totalSessions: 12,
      topic: "Capstone Presentation & Final Defense",
      mode: "home_tutoring",
      address: "Jl. Cinere Raya No. 12, Depok",
      meetingLink: "https://meet.google.com/ml-final-capstone",
      status: "scheduled",
      notes: "Evaluasi capstone machine learning bersama orang tua.",
    },
    {
      id: "cls-5",
      studentId: "std-001",
      studentName: "Andi Pratama",
      studentAvatar: "AP",
      program: "Coding Starter (Python)",
      date: "2026-09-13",
      time: "16:00 - 17:30 WIB",
      sessionNumber: 9,
      totalSessions: 10,
      topic: "Dictionary & Tuple Collection Data",
      mode: "home_tutoring",
      address: "Jl. Margonda Raya No. 45, Beji, Depok",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      status: "scheduled",
      notes: "Sesi tatap muka akhir pekan.",
    },
  ],
  students: [
    {
      id: "std-001",
      name: "Andi Pratama",
      email: "andi.pratama@gmail.com",
      phone: "+62 812-3456-7890",
      parentName: "Bambang Pratama (Ayah)",
      parentPhone: "+62 811-9876-5432",
      avatar: "AP",
      program: "Coding Starter (Python)",
      level: "SMA",
      progressPercent: 80,
      attendanceRate: 92,
      totalSessions: 10,
      completedSessions: 8,
      lastSessionDate: "2026-09-06",
      nextSessionDate: "Hari ini, 16:00 WIB",
      status: "active",
      notes: "Logika problem solving kuat, siap lanjut ke OOP. Rajin bertanya dan kuis selalu di atas KKM.",
      attendanceHistory: [
        { 
          date: "2026-09-06", 
          status: "present", 
          sessionNumber: 8, 
          topic: "Python Functions & Modular Code", 
          durationMinutes: 90, 
          notes: "Hadir tepat waktu di rumah murid. Paham argumen & return values.",
          documentationPhotos: [
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80"
          ]
        },
        { 
          date: "2026-08-30", 
          status: "present", 
          sessionNumber: 7, 
          topic: "While Loops & Game Loop Dasar", 
          durationMinutes: 90, 
          notes: "Menyelesaikan tantangan tebak angka dengan baik.",
          documentationPhotos: [
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
          ]
        },
        { date: "2026-08-23", status: "late", sessionNumber: 6, topic: "For Loops & Range Function", durationMinutes: 80, notes: "Terlambat 10 menit karena macet pulang sekolah. Sesi dipadatkan." },
        { 
          date: "2026-08-16", 
          status: "present", 
          sessionNumber: 5, 
          topic: "If-Else & Logical Operators", 
          durationMinutes: 90, 
          notes: "Konsep boolean logic langsung tuntas.",
          documentationPhotos: [
            "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80"
          ]
        },
        { date: "2026-08-09", status: "present", sessionNumber: 4, topic: "Struktur Data List & Indexing", durationMinutes: 90, notes: "Latihan CRUD list selesai tanpa kendala." },
        { date: "2026-08-02", status: "absent", sessionNumber: 3, topic: "Tipe Data & Operator Matematika", durationMinutes: 0, notes: "Izin sakit demam. Sesi di-reschedule pada 4 Agustus." },
        { date: "2026-07-26", status: "present", sessionNumber: 2, topic: "Input / Output & Variabel Python", durationMinutes: 90, notes: "Instalasi VS Code & Python lancar di laptop murid." },
        { date: "2026-07-19", status: "present", sessionNumber: 1, topic: "Berpikir Komputasional & Algoritma", durationMinutes: 90, notes: "Sesi tatap muka perdana. Motivasi belajar sangat tinggi." },
      ],
      modulesList: [
        { id: "mod-01", title: "Berpikir Komputasional & Flowchart", sessionNumber: 1, status: "completed", completedAt: "2026-07-19", score: 95, quizCompleted: true },
        { id: "mod-02", title: "Variabel, Tipe Data & Input/Output", sessionNumber: 2, status: "completed", completedAt: "2026-07-26", score: 90, quizCompleted: true },
        { id: "mod-03", title: "Operator Logika & Aritmatika", sessionNumber: 3, status: "completed", completedAt: "2026-08-04", score: 85, quizCompleted: true },
        { id: "mod-04", title: "Percabangan If-Else Kondisional", sessionNumber: 4, status: "completed", completedAt: "2026-08-09", score: 92, quizCompleted: true },
        { id: "mod-05", title: "Manipulasi List & Array", sessionNumber: 5, status: "completed", completedAt: "2026-08-16", score: 88, quizCompleted: true },
        { id: "mod-06", title: "Perulangan For Loop & Range", sessionNumber: 6, status: "completed", completedAt: "2026-08-23", score: 95, quizCompleted: true },
        { id: "mod-07", title: "While Loop & Kontrol Alur Program", sessionNumber: 7, status: "completed", completedAt: "2026-08-30", score: 90, quizCompleted: true },
        { id: "mod-08", title: "Functions, Parameters & Return Values", sessionNumber: 8, status: "completed", completedAt: "2026-09-06", score: 96, quizCompleted: true },
        { id: "mod-09", title: "Dictionary & Tuple Collection Data", sessionNumber: 9, status: "in-progress" },
        { id: "mod-10", title: "Mini Project CLI: Sistem Nilai & Kasir", sessionNumber: 10, status: "locked" },
      ],
    },
    {
      id: "std-002",
      name: "Budi Santoso",
      email: "budi.santoso@gmail.com",
      phone: "+62 813-9999-1111",
      parentName: "Siti Rahayu (Ibu)",
      parentPhone: "+62 812-7777-8888",
      avatar: "BS",
      program: "AI Starter",
      level: "SMP",
      progressPercent: 65,
      attendanceRate: 100,
      totalSessions: 6,
      completedSessions: 4,
      lastSessionDate: "2026-09-04",
      nextSessionDate: "Hari ini, 19:00 WIB",
      status: "active",
      notes: "Sangat tertarik dengan tools Generative AI dan prompting. Praktik pembuatan prompt kreatif sangat cepat.",
      attendanceHistory: [
        { date: "2026-09-04", status: "present", sessionNumber: 4, topic: "Prompt Engineering & Few-Shot Prompting", durationMinutes: 90, notes: "Membuat prompt asisten belajar cerdas." },
        { date: "2026-08-28", status: "present", sessionNumber: 3, topic: "Etika AI & Deteksi Halusinasi", durationMinutes: 90, notes: "Diskusi kritis mengenai bias AI." },
        { date: "2026-08-21", status: "present", sessionNumber: 2, topic: "Pengenalan Large Language Models (LLM)", durationMinutes: 90, notes: "Eksplorasi playground model." },
        { date: "2026-08-14", status: "present", sessionNumber: 1, topic: "Pengenalan Artificial Intelligence & Sejarah", durationMinutes: 90, notes: "Hadir antusias di sesi tatap muka." },
      ],
      modulesList: [
        { id: "mod-ai-1", title: "Pengantar Kecerdasan Buatan (AI) Sehari-hari", sessionNumber: 1, status: "completed", completedAt: "2026-08-14", score: 95, quizCompleted: true },
        { id: "mod-ai-2", title: "Cara Kerja Model Bahasa & Tokenisasi", sessionNumber: 2, status: "completed", completedAt: "2026-08-21", score: 90, quizCompleted: true },
        { id: "mod-ai-3", title: "Etika, Hak Cipta & Keamanan AI", sessionNumber: 3, status: "completed", completedAt: "2026-08-28", score: 88, quizCompleted: true },
        { id: "mod-ai-4", title: "Teknik Prompting Efektif & Roleplay AI", sessionNumber: 4, status: "completed", completedAt: "2026-09-04", score: 98, quizCompleted: true },
        { id: "mod-ai-5", title: "RAG & Integrasi Dokumen Pribadi", sessionNumber: 5, status: "in-progress" },
        { id: "mod-ai-6", title: "Final Showcase: Bot Edukasi Pribadi", sessionNumber: 6, status: "locked" },
      ],
    },
    {
      id: "std-003",
      name: "Sarah Putri",
      email: "sarah.putri@gmail.com",
      phone: "+62 856-1234-5678",
      parentName: "Dewi Kartika (Ibu)",
      parentPhone: "+62 856-8765-4321",
      avatar: "SP",
      program: "Web Developer (React)",
      level: "Mahasiswa",
      progressPercent: 50,
      attendanceRate: 95,
      totalSessions: 12,
      completedSessions: 6,
      lastSessionDate: "2026-09-05",
      nextSessionDate: "Hari ini, 20:30 WIB",
      status: "active",
      notes: "Sedang menyelesaikan component architecture untuk portfolio. Perlu penguatan di dependency array useEffect.",
      attendanceHistory: [
        { date: "2026-09-05", status: "present", sessionNumber: 6, topic: "React State & Hooks (useState, useEffect)", durationMinutes: 90, notes: "Praktik fetching data API." },
        { date: "2026-08-29", status: "present", sessionNumber: 5, topic: "Komponen & Props di React Next.js", durationMinutes: 90, notes: "Membuat reusable UI buttons." },
        { date: "2026-08-22", status: "present", sessionNumber: 4, topic: "Modern JavaScript ES6+ (Map, Filter, Async)", durationMinutes: 90, notes: "Tuntas latihan async/await." },
        { date: "2026-08-15", status: "late", sessionNumber: 3, topic: "Tailwind CSS & Responsif Grid", durationMinutes: 80, notes: "Sesi live coding di rumah." },
        { date: "2026-08-08", status: "present", sessionNumber: 2, topic: "HTML Semantik & Modern CSS Layout", durationMinutes: 90, notes: "Struktur layout halaman web." },
        { date: "2026-08-01", status: "present", sessionNumber: 1, topic: "Pengenalan Web Development & Git Workflow", durationMinutes: 90, notes: "Inisialisasi repo GitHub lancar." },
      ],
      modulesList: [
        { id: "mod-web-1", title: "Git, GitHub & Web Fundamentals", sessionNumber: 1, status: "completed", completedAt: "2026-08-01", score: 92, quizCompleted: true },
        { id: "mod-web-2", title: "HTML5 Semantik & CSS Modern", sessionNumber: 2, status: "completed", completedAt: "2026-08-08", score: 90, quizCompleted: true },
        { id: "mod-web-3", title: "Tailwind CSS & Mobile Responsive Design", sessionNumber: 3, status: "completed", completedAt: "2026-08-15", score: 85, quizCompleted: true },
        { id: "mod-web-4", title: "JavaScript Modern (ES6+ & DOM)", sessionNumber: 4, status: "completed", completedAt: "2026-08-22", score: 94, quizCompleted: true },
        { id: "mod-web-5", title: "Komponen UI Reusable & State Dasar", sessionNumber: 5, status: "completed", completedAt: "2026-08-29", score: 91, quizCompleted: true },
        { id: "mod-web-6", title: "React State & Lifecycle Hooks", sessionNumber: 6, status: "completed", completedAt: "2026-09-05", score: 89, quizCompleted: true },
        { id: "mod-web-7", title: "Routing Dinamis Next.js & Server Components", sessionNumber: 7, status: "in-progress" },
        { id: "mod-web-8", title: "Form Handling & Integrasi Backend", sessionNumber: 8, status: "locked" },
      ],
    },
    {
      id: "std-004",
      name: "Rina Wijaya",
      email: "rina.wijaya@gmail.com",
      phone: "+62 821-4567-8901",
      parentName: "Agus Wijaya (Ayah)",
      parentPhone: "+62 821-9988-7766",
      avatar: "RW",
      program: "AI Developer (ML)",
      level: "Mahasiswa",
      progressPercent: 90,
      attendanceRate: 98,
      totalSessions: 12,
      completedSessions: 11,
      lastSessionDate: "2026-09-07",
      nextSessionDate: "2026-09-10",
      status: "active",
      notes: "Tinggal tahap akhir model evaluation dan deployment. Sangat mandiri dalam eksperimen hyperparameter tuning.",
      attendanceHistory: [
        { date: "2026-09-07", status: "present", sessionNumber: 11, topic: "Model Evaluation, ROC-AUC & Confusion Matrix", durationMinutes: 90, notes: "Evaluasi model klasifikasi akurasi 94%." },
        { date: "2026-08-31", status: "present", sessionNumber: 10, topic: "Supervised Learning: Random Forest & XGBoost", durationMinutes: 90, notes: "Latihan ensemble method." },
        { date: "2026-08-24", status: "present", sessionNumber: 9, topic: "Feature Engineering & Scikit-Learn Pipelines", durationMinutes: 90, notes: "Data preprocessing tuntas." },
        { date: "2026-08-17", status: "present", sessionNumber: 8, topic: "Exploratory Data Analysis dengan Pandas & Seaborn", durationMinutes: 90, notes: "Visualisasi korelasi fitur." },
      ],
      modulesList: [
        { id: "mod-ml-1", title: "Python untuk Data Science & NumPy", sessionNumber: 1, status: "completed", completedAt: "2026-07-06", score: 98, quizCompleted: true },
        { id: "mod-ml-2", title: "Manipulasi Data Pandas & Wrangling", sessionNumber: 2, status: "completed", completedAt: "2026-07-13", score: 95, quizCompleted: true },
        { id: "mod-ml-3", title: "Visualisasi Data Matplotlib & Seaborn", sessionNumber: 3, status: "completed", completedAt: "2026-07-20", score: 96, quizCompleted: true },
        { id: "mod-ml-4", title: "Statistika Dasar & Probabilitas", sessionNumber: 4, status: "completed", completedAt: "2026-07-27", score: 92, quizCompleted: true },
        { id: "mod-ml-5", title: "Regresi Linier & Logistik", sessionNumber: 5, status: "completed", completedAt: "2026-08-03", score: 94, quizCompleted: true },
        { id: "mod-ml-6", title: "Klasifikasi Decision Tree & Random Forest", sessionNumber: 6, status: "completed", completedAt: "2026-08-10", score: 97, quizCompleted: true },
        { id: "mod-ml-7", title: "Clustering K-Means & Unsupervised Learning", sessionNumber: 7, status: "completed", completedAt: "2026-08-17", score: 90, quizCompleted: true },
        { id: "mod-ml-8", title: "Model Validation & Cross Validation", sessionNumber: 8, status: "completed", completedAt: "2026-08-24", score: 93, quizCompleted: true },
        { id: "mod-ml-9", title: "Hyperparameter Tuning GridSearch", sessionNumber: 9, status: "completed", completedAt: "2026-08-31", score: 96, quizCompleted: true },
        { id: "mod-ml-10", title: "Deep Learning Dasar (Neural Network)", sessionNumber: 10, status: "completed", completedAt: "2026-09-07", score: 91, quizCompleted: true },
        { id: "mod-ml-11", title: "Model Deployment via FastAPI", sessionNumber: 11, status: "in-progress" },
        { id: "mod-ml-12", title: "Capstone Presentation & Final Defense", sessionNumber: 12, status: "locked" },
      ],
    },
    {
      id: "std-005",
      name: "Kevin Tan",
      email: "kevin.tan@gmail.com",
      phone: "+62 878-1122-3344",
      parentName: "Linda Tan (Ibu)",
      parentPhone: "+62 878-9988-1122",
      avatar: "KT",
      program: "Digital Starter",
      level: "SMP",
      progressPercent: 100,
      attendanceRate: 100,
      totalSessions: 8,
      completedSessions: 8,
      lastSessionDate: "2026-09-01",
      nextSessionDate: "-",
      status: "completed",
      notes: "Program selesai dengan predikat Sangat Baik (Nilai A). Sertifikat kelulusan telah diterbitkan.",
      attendanceHistory: [
        { date: "2026-09-01", status: "present", sessionNumber: 8, topic: "Presentasi Karya Akhir & Sertifikasi", durationMinutes: 90, notes: "Presentasi sukses di depan orang tua." },
        { date: "2026-08-25", status: "present", sessionNumber: 7, topic: "Finishing Proyek Scratch Interaktif", durationMinutes: 90, notes: "Game animasi selesai dengan audio kustom." },
        { date: "2026-08-18", status: "present", sessionNumber: 6, topic: "Desain Grafis Canva untuk Konten Edukasi", durationMinutes: 90, notes: "Membuat poster digital kreatif." },
      ],
      modulesList: [
        { id: "mod-dig-1", title: "Pengenalan Komputer & Keamanan Siber Dasar", sessionNumber: 1, status: "completed", completedAt: "2026-07-14", score: 96, quizCompleted: true },
        { id: "mod-dig-2", title: "Mengetik Cepat & Navigasi File", sessionNumber: 2, status: "completed", completedAt: "2026-07-21", score: 90, quizCompleted: true },
        { id: "mod-dig-3", title: "Dokumen Digital & Spreadsheet Google", sessionNumber: 3, status: "completed", completedAt: "2026-07-28", score: 94, quizCompleted: true },
        { id: "mod-dig-4", title: "Desain Poster & Ilustrasi Canva", sessionNumber: 4, status: "completed", completedAt: "2026-08-04", score: 98, quizCompleted: true },
        { id: "mod-dig-5", title: "Animasi Sederhana dengan Scratch Block", sessionNumber: 5, status: "completed", completedAt: "2026-08-11", score: 95, quizCompleted: true },
        { id: "mod-dig-6", title: "Interaksi Sprite & Logika Game", sessionNumber: 6, status: "completed", completedAt: "2026-08-18", score: 92, quizCompleted: true },
        { id: "mod-dig-7", title: "Sound Effect & Game Scoring", sessionNumber: 7, status: "completed", completedAt: "2026-08-25", score: 96, quizCompleted: true },
        { id: "mod-dig-8", title: "Showcase Proyek Akhir", sessionNumber: 8, status: "completed", completedAt: "2026-09-01", score: 100, quizCompleted: true },
      ],
    },
  ],
};
