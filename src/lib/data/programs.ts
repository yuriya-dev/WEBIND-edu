export interface SyllabusSession {
  session: number;
  topicId: string;
  topicEn: string;
  activityId: string;
  activityEn: string;
  cp: string[];
}

export interface Program {
  slug: string;
  icon: string;
  titleKey: string;
  sessions: number;
  duration: string;
  grades: ("sd" | "smp" | "sma")[];
  gradeText: {
    id: string;
    en: string;
  };
  prerequisites: {
    id: string;
    en: string;
  };
  outcome: {
    id: string;
    en: string;
  };
  cpElements: {
    code: string;
    name: string;
  }[];
  syllabus: SyllabusSession[];
}

export const programs: Program[] = [
  {
    slug: "digital-starter",
    icon: "💻",
    titleKey: "digital_starter",
    sessions: 8,
    duration: "90 min/session",
    grades: ["sd", "smp"],
    gradeText: {
      id: "SD Kelas 4–6 & SMP Kelas 7",
      en: "Elementary (Grades 4–6) & Junior High (Grade 7)",
    },
    prerequisites: {
      id: "Tidak ada (Pemula total)",
      en: "None (Absolute beginner)",
    },
    outcome: {
      id: "Mampu mengelola file secara mandiri, membuat dokumen, spreadsheet, dan presentasi rapi, serta menjaga keamanan akun.",
      en: "Able to manage files independently, create neat documents, spreadsheets, and presentations, and maintain account security.",
    },
    cpElements: [
      { code: "SK", name: "Sistem Komputer" },
      { code: "TIK", name: "Teknologi Informasi dan Komunikasi" },
      { code: "JKI", name: "Jaringan Komputer dan Internet" },
      { code: "AD", name: "Analisis Data" },
      { code: "DSI", name: "Dampak Sosial Informatika" },
      { code: "PLB", name: "Praktik Lintas Bidang" },
    ],
    syllabus: [
      {
        session: 1,
        topicId: "Mengenal Komputer dan Perangkat",
        topicEn: "Introduction to Computers and Hardware",
        activityId: "Mengidentifikasi perangkat keras dan lunak, menyalakan dan mematikan komputer dengan aman.",
        activityEn: "Identify hardware and software, safely boot and power down computers.",
        cp: ["SK", "TIK"],
      },
      {
        session: 2,
        topicId: "Sistem Operasi, File, dan Folder",
        topicEn: "Operating Systems, Files, and Folders",
        activityId: "Membuat struktur folder tugas sekolah dan menamai file dengan rapi dan terorganisir.",
        activityEn: "Create structured folders for school tasks and establish organized file naming.",
        cp: ["TIK"],
      },
      {
        session: 3,
        topicId: "Mengetik dan Riset Internet Kredibel",
        topicEn: "Typing and Credible Internet Research",
        activityId: "Latihan mengetik 10 jari, mencari dengan kata kunci efektif, dan menilai kredibilitas sumber informasi.",
        activityEn: "Touch typing practice, search with effective keywords, and assess information credibility.",
        cp: ["TIK", "JKI"],
      },
      {
        session: 4,
        topicId: "Pengolah Kata (Word / Google Docs)",
        topicEn: "Word Processing (Word / Google Docs)",
        activityId: "Membuat laporan 1 halaman dengan format judul, paragraf, gambar, dan tabel rapi.",
        activityEn: "Produce a 1-page report with clean formatting, headings, paragraphs, and images.",
        cp: ["TIK"],
      },
      {
        session: 5,
        topicId: "Spreadsheet Dasar (Excel / Google Sheets)",
        topicEn: "Basic Spreadsheets (Excel / Google Sheets)",
        activityId: "Membuat tabel nilai dengan formula otomatis SUM, AVERAGE, MIN, dan MAX.",
        activityEn: "Build a grade sheet using SUM, AVERAGE, MIN, and MAX formulas.",
        cp: ["TIK", "AD"],
      },
      {
        session: 6,
        topicId: "Presentasi Interaktif (PowerPoint / Slides)",
        topicEn: "Interactive Presentations (PowerPoint / Slides)",
        activityId: "Membuat presentasi 5 slide tentang topik pilihan dengan visual menarik dan transisi bersih.",
        activityEn: "Design a 5-slide presentation on a chosen topic with clean visuals and transitions.",
        cp: ["TIK"],
      },
      {
        session: 7,
        topicId: "Kolaborasi Cloud (Google Workspace)",
        topicEn: "Cloud Collaboration (Google Workspace)",
        activityId: "Mengerjakan dokumen bersama di Google Drive, berbagi tautan, dan mengatur izin akses.",
        activityEn: "Collaborate in real-time on Google Drive, share documents, and set permissions.",
        cp: ["TIK", "PLB"],
      },
      {
        session: 8,
        topicId: "Keamanan Digital, Etika & Proyek Akhir",
        topicEn: "Digital Safety, Ethics & Final Project",
        activityId: "Membuat kata sandi kuat, mengenali phishing & jejak digital, serta mempresentasikan portofolio tugas akhir.",
        activityEn: "Create strong passwords, identify phishing & digital footprints, and present final project package.",
        cp: ["DSI", "PLB"],
      },
    ],
  },
  {
    slug: "coding-starter",
    icon: "🐍",
    titleKey: "coding_starter",
    sessions: 10,
    duration: "90 min/session",
    grades: ["sd", "smp"],
    gradeText: {
      id: "SD Kelas 5–6 (Scratch) & SMP Kelas 7–8 (Python)",
      en: "Elementary (Grades 5–6, Scratch) & Junior High (Grades 7–8, Python)",
    },
    prerequisites: {
      id: "Digital Starter atau terbiasa operasional komputer",
      en: "Digital Starter or basic computer literacy",
    },
    outcome: {
      id: "Mampu berpikir komputasional secara runtut dan membuat program interaktif sendiri seperti kalkulator atau game tebak angka.",
      en: "Able to think computationally and build interactive programs such as calculators or number guessing games.",
    },
    cpElements: [
      { code: "BK", name: "Berpikir Komputasional" },
      { code: "AP", name: "Algoritma dan Pemrograman" },
      { code: "AD", name: "Analisis Data" },
      { code: "PLB", name: "Praktik Lintas Bidang" },
      { code: "SK", name: "Sistem Komputer" },
    ],
    syllabus: [
      {
        session: 1,
        topicId: "Pengenalan Berpikir Komputasional",
        topicEn: "Introduction to Computational Thinking",
        activityId: "Aktivitas unplugged: memecahkan masalah sehari-hari secara bertahap dan terstruktur.",
        activityEn: "Unplugged activity: breaking down everyday problems systematically.",
        cp: ["BK"],
      },
      {
        session: 2,
        topicId: "Dekomposisi dan Pengenalan Pola",
        topicEn: "Decomposition and Pattern Recognition",
        activityId: "Memecah masalah besar menjadi bagian-bagian kecil dan mengenali kemiripan pola persoalan.",
        activityEn: "Breaking complex tasks into manageable subtasks and identifying data patterns.",
        cp: ["BK"],
      },
      {
        session: 3,
        topicId: "Abstraksi dan Perancangan Algoritma",
        topicEn: "Abstraction and Algorithm Design",
        activityId: "Menyaring informasi penting dan menuliskan langkah algoritma dalam bahasa sehari-hari.",
        activityEn: "Filtering essential details and formulating step-by-step logic in pseudocode.",
        cp: ["BK", "AP"],
      },
      {
        session: 4,
        topicId: "Flowchart: Percabangan dan Perulangan",
        topicEn: "Flowcharts: Branching and Loops",
        activityId: "Membuat diagram alir (flowchart) dengan simbol keputusan (if) dan perulangan (loop).",
        activityEn: "Construct flowcharts with decision nodes (if) and iteration loops.",
        cp: ["BK", "AP"],
      },
      {
        session: 5,
        topicId: "Hello Python: Output, Variabel & Tipe Data",
        topicEn: "Hello Python: Output, Variables & Data Types",
        activityId: "Menulis program pertama yang menampilkan teks dan menyimpan data angka serta teks.",
        activityEn: "Write first program printing output and storing text/numerical variables.",
        cp: ["AP"],
      },
      {
        session: 6,
        topicId: "Input Pengguna dan Operasi Aritmatika",
        topicEn: "User Input and Arithmetic Operations",
        activityId: "Membuat program kalkulator sederhana dengan input dinamis dari terminal.",
        activityEn: "Build an interactive calculator taking dynamic user inputs from the console.",
        cp: ["AP"],
      },
      {
        session: 7,
        topicId: "Percabangan Logika (if, elif, else)",
        topicEn: "Conditional Logic (if, elif, else)",
        activityId: "Membuat program penentu kelulusan nilai ujian atau sistem verifikasi umur.",
        activityEn: "Build a grade evaluation or age validation program using branch logic.",
        cp: ["AP"],
      },
      {
        session: 8,
        topicId: "Perulangan Logika (for, while)",
        topicEn: "Iteration and Loops (for, while)",
        activityId: "Membuat generator tabel perkalian dan program perulangan hitung mundur interaktif.",
        activityEn: "Create automated multiplication tables and countdown loops.",
        cp: ["AP"],
      },
      {
        session: 9,
        topicId: "List dan Fungsi Sederhana (def)",
        topicEn: "Lists and Custom Functions (def)",
        activityId: "Mengolah daftar koleksi nilai dan membuat fungsi mandiri yang reusable (beserta konsep memori data komputer).",
        activityEn: "Manage list collections and encapsulate logic into reusable functions.",
        cp: ["AP", "AD", "SK"],
      },
      {
        session: 10,
        topicId: "Proyek Akhir dan Presentasi Mandiri",
        topicEn: "Final Project and Presentation",
        activityId: "Membangun game tebak angka dengan skor atau kalkulator serbaguna, lalu mempresentasikannya.",
        activityEn: "Build a playable guessing game with score mechanics and deliver a live presentation.",
        cp: ["PLB", "AP"],
      },
    ],
  },
  {
    slug: "web-developer",
    icon: "🌐",
    titleKey: "web_developer",
    sessions: 12,
    duration: "90 min/session",
    grades: ["smp", "sma"],
    gradeText: {
      id: "SMP Kelas 9 & SMA Kelas X–XII",
      en: "Junior High (Grade 9) & Senior High (Grades 10–12)",
    },
    prerequisites: {
      id: "Coding Starter atau logika pemrograman dasar",
      en: "Coding Starter or basic programming logic",
    },
    outcome: {
      id: "Membangun website portofolio interaktif responsif dari nol dan mempublikasikannya secara online ke internet.",
      en: "Build an interactive responsive portfolio website from scratch and deploy it live to the web.",
    },
    cpElements: [
      { code: "JKI", name: "Jaringan Komputer dan Internet" },
      { code: "TIK", name: "Teknologi Informasi dan Komunikasi" },
      { code: "AP", name: "Algoritma dan Pemrograman" },
      { code: "AD", name: "Analisis Data" },
      { code: "DSI", name: "Dampak Sosial Informatika" },
      { code: "PLB", name: "Praktik Lintas Bidang" },
    ],
    syllabus: [
      {
        session: 1,
        topicId: "Cara Kerja Web dan Internet",
        topicEn: "How the Web and Internet Work",
        activityId: "Memahami model client-server, protokol HTTP/HTTPS, DNS, dan URL lewat demo browser.",
        activityEn: "Understand client-server architecture, HTTP/HTTPS, DNS, and URL resolution in browser.",
        cp: ["JKI"],
      },
      {
        session: 2,
        topicId: "HTML Semantik Dasar",
        topicEn: "Semantic HTML Fundamentals",
        activityId: "Membuat kerangka halaman web dengan heading, paragraf, list, dan link.",
        activityEn: "Create structured web pages with semantic tags, headings, paragraphs, and links.",
        cp: ["TIK", "AP"],
      },
      {
        session: 3,
        topicId: "HTML Lanjutan & Formulir",
        topicEn: "Advanced HTML & Web Forms",
        activityId: "Menambahkan gambar, video, tabel, dan formulir interaktif (input, button, select).",
        activityEn: "Incorporate images, videos, tables, and functional input forms.",
        cp: ["AP"],
      },
      {
        session: 4,
        topicId: "CSS Dasar & Box Model",
        topicEn: "CSS Fundamentals & Box Model",
        activityId: "Mengatur warna, font typography, margin, padding, border, dan layout elemen.",
        activityEn: "Style web elements with color palettes, typography, margins, padding, and borders.",
        cp: ["AP"],
      },
      {
        session: 5,
        topicId: "CSS Modern: Flexbox & Responsif",
        topicEn: "Modern CSS: Flexbox & Responsive Layouts",
        activityId: "Mendesain layout fleksibel dengan Flexbox dan CSS Grid yang rapi di layar smartphone.",
        activityEn: "Build adaptable layouts using Flexbox, CSS Grid, and media queries for mobile devices.",
        cp: ["AP"],
      },
      {
        session: 6,
        topicId: "JavaScript Fundamental",
        topicEn: "JavaScript Fundamentals",
        activityId: "Variabel (let, const), tipe data, kondisional, dan fungsi dasar pada browser.",
        activityEn: "Modern variable declarations, data types, condition checks, and functions in the browser.",
        cp: ["AP"],
      },
      {
        session: 7,
        topicId: "DOM Manipulation & Event Handling",
        topicEn: "DOM Manipulation & Event Handling",
        activityId: "Membuat tombol interaktif, menangani event klik, dan memperbarui konten halaman secara langsung.",
        activityEn: "Create interactive buttons, listen to click events, and dynamically mutate page content.",
        cp: ["AP"],
      },
      {
        session: 8,
        topicId: "Array, Objek, dan Fetch API Publik",
        topicEn: "Arrays, Objects, and Fetching Public APIs",
        activityId: "Mengambil data real-time dari API publik (misal data kutipan/cuaca) dan merendernya ke tampilan.",
        activityEn: "Fetch live data from public APIs and display JSON responses on the page.",
        cp: ["AP", "AD"],
      },
      {
        session: 9,
        topicId: "Version Control: Git & GitHub",
        topicEn: "Version Control: Git & GitHub",
        activityId: "Membuat repositori Git lokal, commit perubahan, dan push kode proyek ke akun GitHub.",
        activityEn: "Initialize local Git repo, track changes with commits, and push repositories to GitHub.",
        cp: ["TIK", "PLB"],
      },
      {
        session: 10,
        topicId: "Pengenalan Komponen React",
        topicEn: "Introduction to React Components",
        activityId: "Mempelajari komponen modular, props, dan konsep state untuk antarmuka modern.",
        activityEn: "Explore modular UI components, props data passing, and state fundamentals.",
        cp: ["AP"],
      },
      {
        session: 11,
        topicId: "Membangun Portofolio & Aksesibilitas",
        topicEn: "Building Portfolio & Web Accessibility",
        activityId: "Menyusun proyek portofolio diri dengan memperhatikan standar aksesibilitas dan privasi.",
        activityEn: "Assemble a personal portfolio project following accessibility and UX guidelines.",
        cp: ["PLB", "DSI"],
      },
      {
        session: 12,
        topicId: "Deployment Online & Presentasi",
        topicEn: "Live Deployment & Final Presentation",
        activityId: "Mempublikasikan website ke Vercel atau GitHub Pages dan mempresentasikannya ke publik.",
        activityEn: "Deploy live website to Vercel/GitHub Pages and present the live URL to peers.",
        cp: ["PLB", "JKI"],
      },
    ],
  },
  {
    slug: "ai-starter",
    icon: "🤖",
    titleKey: "ai_starter",
    sessions: 6,
    duration: "90 min/session",
    grades: ["sd", "smp", "sma"],
    gradeText: {
      id: "SD Kelas 6, SMP Kelas 8–9 & SMA Kelas X–XII",
      en: "Elementary (Grade 6), Junior High (8–9) & Senior High (10–12)",
    },
    prerequisites: {
      id: "Digital Starter atau kemampuan komputer dasar",
      en: "Digital Starter or basic computer literacy",
    },
    outcome: {
      id: "Memakai AI secara cerdas dan bertanggung jawab untuk belajar, menguasai prompt terarah, dan mengenali batasan AI.",
      en: "Use AI responsibly for learning, master structured prompt crafting, and identify AI limitations.",
    },
    cpElements: [
      { code: "TIK", name: "Teknologi Informasi dan Komunikasi" },
      { code: "DSI", name: "Dampak Sosial Informatika" },
      { code: "AD", name: "Analisis Data" },
      { code: "PLB", name: "Praktik Lintas Bidang" },
    ],
    syllabus: [
      {
        session: 1,
        topicId: "Apa itu AI dan Cara AI Belajar",
        topicEn: "What is AI and How AI Learns",
        activityId: "Membandingkan aturan pemrograman biasa dengan model yang belajar dari data lewat simulasi klasifikasi.",
        activityEn: "Contrast rule-based programming with data-driven machine learning through classification games.",
        cp: ["TIK", "AD"],
      },
      {
        session: 2,
        topicId: "Cara Kerja Generative AI & Batasannya",
        topicEn: "How Generative AI Works & Its Limits",
        activityId: "Mencoba LLM chatbot, mengenali fenomena halusinasi, bias jawaban, dan informasi yang keliru.",
        activityEn: "Experiment with LLMs, identify hallucinations, algorithmic bias, and flawed outputs.",
        cp: ["TIK", "DSI"],
      },
      {
        session: 3,
        topicId: "Dasar Prompt Engineering Efektif",
        topicEn: "Effective Prompt Engineering Basics",
        activityId: "Menulis prompt dengan formula Role, Context, Task, dan Constraints; membandingkan variasi output.",
        activityEn: "Formulate prompts using Role, Context, Task, and Constraints; evaluate response quality.",
        cp: ["TIK"],
      },
      {
        session: 4,
        topicId: "AI untuk Belajar dan Produktivitas",
        topicEn: "AI for Accelerated Learning & Study",
        activityId: "Memanfaatkan AI untuk meringkas materi bacaan, membuat latihan soal mandiri, dan menyusun jadwal belajar.",
        activityEn: "Leverage AI to summarize reading materials, generate practice quizzes, and structure study plans.",
        cp: ["TIK", "PLB"],
      },
      {
        session: 5,
        topicId: "Etika, Privasi, dan Integritas Akademik",
        topicEn: "Ethics, Data Privacy, and Academic Integrity",
        activityId: "Diskusi studi kasus: batas penggunaan AI di sekolah, anti-plagiarisme, dan bahaya membocorkan data pribadi.",
        activityEn: "Case study discussions on appropriate AI usage in schools, anti-plagiarism, and data privacy safeguards.",
        cp: ["DSI"],
      },
      {
        session: 6,
        topicId: "Verifikasi Informasi & Proyek Mini Panduan",
        topicEn: "Fact Verification & AI Guide Mini Project",
        activityId: "Memeriksa kebenaran klaim AI dengan riset silang, lalu merancang buku panduan saku penggunaan AI bijak.",
        activityEn: "Cross-verify AI assertions with trustworthy sources and create a student guide for responsible AI.",
        cp: ["DSI", "PLB"],
      },
    ],
  },
  {
    slug: "ai-developer",
    icon: "🧠",
    titleKey: "ai_developer",
    sessions: 12,
    duration: "90 min/session",
    grades: ["sma"],
    gradeText: {
      id: "SMA Kelas XI–XII & Persiapan Kuliah IT",
      en: "Senior High (Grades 11–12) & Pre-College IT",
    },
    prerequisites: {
      id: "Coding Starter atau kemampuan dasar bahasa Python",
      en: "Coding Starter or fundamental Python proficiency",
    },
    outcome: {
      id: "Mampu memproses dataset riil, melatih model Machine Learning klasifikasi & regresi, serta membuat demo web interaktif.",
      en: "Able to process real datasets, train classification & regression ML models, and build interactive web demos.",
    },
    cpElements: [
      { code: "AD", name: "Analisis Data" },
      { code: "AP", name: "Algoritma dan Pemrograman" },
      { code: "BK", name: "Berpikir Komputasional" },
      { code: "DSI", name: "Dampak Sosial Informatika" },
      { code: "PLB", name: "Praktik Lintas Bidang" },
    ],
    syllabus: [
      {
        session: 1,
        topicId: "Python untuk Sains Data & Colab",
        topicEn: "Python for Data Science & Google Colab",
        activityId: "Mengulang sintaks Python dan mengoperasikan Google Colab / Jupyter Notebook.",
        activityEn: "Review Python syntax and navigate Google Colab / Jupyter Notebook environments.",
        cp: ["AP"],
      },
      {
        session: 2,
        topicId: "Manipulasi Data dengan NumPy dan Pandas",
        topicEn: "Data Wrangling with NumPy & Pandas",
        activityId: "Memuat file dataset CSV, indexing, memfilter baris, dan mengolah kolom data tabular.",
        activityEn: "Load CSV datasets, index rows/columns, filter records, and transform tabular features.",
        cp: ["AD", "AP"],
      },
      {
        session: 3,
        topicId: "Pembersihan Data (Data Cleaning)",
        topicEn: "Data Cleaning & Preprocessing",
        activityId: "Menangani data yang hilang (missing values), menghapus duplikat, dan standarisasi tipe data.",
        activityEn: "Handle missing null values, deduplicate records, and cast data types appropriately.",
        cp: ["AD"],
      },
      {
        session: 4,
        topicId: "Visualisasi Data (Matplotlib & Seaborn)",
        topicEn: "Data Visualization (Matplotlib & Seaborn)",
        activityId: "Membuat grafik batang, scatter plot, dan histogram distribusi untuk membaca tren data.",
        activityEn: "Generate bar charts, scatter plots, and histograms to uncover underlying patterns.",
        cp: ["AD"],
      },
      {
        session: 5,
        topicId: "Statistik Dasar & Exploratory Data Analysis",
        topicEn: "Descriptive Statistics & Exploratory Data Analysis",
        activityId: "Menghitung mean, median, standar deviasi, serta korelasi antar variabel dalam dataset.",
        activityEn: "Compute mean, median, standard deviation, and feature correlation matrices.",
        cp: ["AD"],
      },
      {
        session: 6,
        topicId: "Konsep Inti Machine Learning",
        topicEn: "Core Machine Learning Principles",
        activityId: "Memahami Supervised vs Unsupervised Learning, pembagian data latih (train) dan data uji (test).",
        activityEn: "Understand Supervised vs Unsupervised models and train-test dataset splitting.",
        cp: ["AD", "BK"],
      },
      {
        session: 7,
        topicId: "Model Regresi Prediktif",
        topicEn: "Predictive Regression Models",
        activityId: "Melatih model Linear Regression untuk memprediksi nilai numerik kontinu.",
        activityEn: "Train Linear Regression models to predict continuous numerical values.",
        cp: ["AP", "AD"],
      },
      {
        session: 8,
        topicId: "Model Klasifikasi (Decision Tree & KNN)",
        topicEn: "Classification Models (Decision Tree & KNN)",
        activityId: "Membangun model pengelompokan kategori pada dataset nyata dan visualisasi pohon keputusan.",
        activityEn: "Construct classification models on practical datasets and inspect decision trees.",
        cp: ["AP", "AD"],
      },
      {
        session: 9,
        topicId: "Evaluasi Model & Bias Data",
        topicEn: "Model Evaluation & Mitigating Bias",
        activityId: "Mengukur akurasi, presisi, recall, memahami overfitting, dan menganalisis bias data latih.",
        activityEn: "Calculate accuracy, precision, recall, analyze overfitting, and examine data bias.",
        cp: ["AD", "DSI"],
      },
      {
        session: 10,
        topicId: "Pengenalan Arsitektur Neural Network",
        topicEn: "Introduction to Neural Network Architectures",
        activityId: "Memahami konsep neuron buatan, bobot (weights), aktivasi, dan cara jaringan saraf belajar.",
        activityEn: "Understand artificial neurons, weights, activation functions, and deep learning workflows.",
        cp: ["AP"],
      },
      {
        session: 11,
        topicId: "Proyek Akhir: Pelatihan Model Mandiri",
        topicEn: "Final Project: End-to-End Model Training",
        activityId: "Mengumpulkan dan memilih dataset, memproses data, lalu melatih model machine learning mandiri.",
        activityEn: "Select a real-world dataset, clean features, and train a customized machine learning model.",
        cp: ["PLB", "AD"],
      },
      {
        session: 12,
        topicId: "Demo Aplikasi Interaktif & Presentasi",
        topicEn: "Interactive Web Demo & Presentation",
        activityId: "Membungkus model ke dalam web demo interaktif (Streamlit/Gradio) dan mempresentasikan hasilnya.",
        activityEn: "Deploy trained model into an interactive web UI (Streamlit/Gradio) and present outcomes.",
        cp: ["PLB", "DSI"],
      },
    ],
  },
];
