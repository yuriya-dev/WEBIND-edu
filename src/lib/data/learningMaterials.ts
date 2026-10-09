export interface CodeSnippet {
  language: string;
  filename?: string;
  code: string;
  output?: string;
}

export interface MaterialSection {
  id: string;
  title: string;
  content: string[];
  codeSnippet?: CodeSnippet;
  callout?: {
    type: "info" | "warning" | "tip" | "success";
    title: string;
    message: string;
  };
  keyTakeaways?: string[];
}

export interface InteractiveQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InteractiveExercise {
  title: string;
  instruction: string;
  starterCode: string;
  expectedOutput: string;
  hint: string;
}

export interface LearningMaterial {
  id: string;
  moduleId: string;
  moduleTitle: string;
  lessonId: string;
  title: string;
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  summary: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  sections: MaterialSection[];
  quiz?: InteractiveQuiz;
  exercise?: InteractiveExercise;
}

export const learningMaterialsData: LearningMaterial[] = [
  {
    id: "algo-flowcharts",
    moduleId: "mod-1",
    moduleTitle: "Module 01: Computational Thinking & Basics",
    lessonId: "les-1",
    title: "Pengenalan Algoritma & Flowchart dalam Pemrograman",
    readTime: "8 min baca",
    difficulty: "Beginner",
    category: "Computational Thinking",
    summary: "Pelajari cara menyusun logika berpikir komputasi, dekomposisi masalah, serta merancang diagram alur (flowchart) sebelum menulis baris kode pertama.",
    publishedDate: "Sep 2026",
    author: {
      name: "Ahmad Fauzi",
      role: "Lead Python & AI Tutor",
      avatar: "AF",
    },
    sections: [
      {
        id: "intro",
        title: "1. Apa itu Algoritma?",
        content: [
          "Sebelum sebuah komputer dapat menyelesaikan sebuah tugas, manusia harus memberikan instruksi yang terurut, logis, dan tidak ambigu. Urutan instruksi sistematis inilah yang kita sebut sebagai **Algoritma**.",
          "Dalam computational thinking, ada 4 pilar utama yang perlu dikuasai pemula: **Dekomposisi** (memecah masalah besar), **Pengenalan Pola**, **Abstraksi** (fokus pada hal penting), dan **Perancangan Algoritma**.",
        ],
        callout: {
          type: "tip",
          title: "Prinsip Emas Programmer",
          message: "Jangan langsung menulis kode (coding) sebelum alur logika masalah terpecahkan di atas kertas atau flowchart.",
        },
      },
      {
        id: "flowchart-symbols",
        title: "2. Simbol Standar Flowchart",
        content: [
          "Flowchart adalah representasi visual dari langkah-langkah algoritma. Beberapa simbol standar internasional yang wajib dipahami:",
          "• **Terminator (Oval)**: Menandakan titik MULAI (Start) atau SELESAI (End).",
          "• **Process (Persegi Panjang)**: Operasi perhitungan, manipulasi variabel, atau tugas internal.",
          "• **Input / Output (Jajar Genjang)**: Menerima data dari pengguna atau menampilkan hasil ke layar.",
          "• **Decision (Belah Ketupat / Diamond)**: Titik percabangan kondisi (Ya/Tidak, True/False).",
        ],
      },
      {
        id: "pseudocode-example",
        title: "3. Dari Flowchart ke Pseudocode & Python",
        content: [
          "Mari kita lihat contoh algoritma sederhana untuk mengecek apakah seseorang lulus ujian (nilai minimal 75):",
        ],
        codeSnippet: {
          language: "python",
          filename: "cek_kelulusan.py",
          code: `# Input nilai siswa
nilai = int(input("Masukkan nilai ujian: "))

# Logika percabangan (Decision)
if nilai >= 75:
    print("Selamat! Kamu dinyatakan LULUS 🎉")
else:
    print("Tetap semangat! Perlu remedial dan latihan lagi 💪")`,
          output: `Masukkan nilai ujian: 85
Selamat! Kamu dinyatakan LULUS 🎉`,
        },
        keyTakeaways: [
          "Algoritma harus memiliki kondisi berhenti (finite).",
          "Setiap instruksi harus jelas dan tidak bermakna ganda (unambiguous).",
          "Flowchart mempermudah komunikasi tim sebelum implementasi kode.",
        ],
      },
    ],
    quiz: {
      question: "Simbol flowchart manakah yang digunakan untuk proses pengambilan keputusan (percabangan kondisional True/False)?",
      options: [
        "Persegi panjang (Rectangle)",
        "Jajar genjang (Parallelogram)",
        "Belah ketupat (Diamond / Rhombus)",
        "Oval / Rounded Rectangle",
      ],
      correctIndex: 2,
      explanation: "Tepat! Simbol Belah Ketupat (Diamond) digunakan untuk titik Decision / kondisi yang menghasilkan cabang True atau False.",
    },
    exercise: {
      title: "Latihan Logika: Menentukan Bilangan Positif/Negatif",
      instruction: "Tulis kode Python untuk memeriksa apakah variabel `angka = 10` bernilai positif, negatif, atau nol menggunakan percabangan.",
      starterCode: `angka = 10

# Tulis kondisimu di bawah ini:
if angka > 0:
    print("Positif")
elif angka < 0:
    print("Negatif")
else:
    print("Nol")`,
      expectedOutput: "Positif",
      hint: "Gunakan statement if-elif-else untuk menangani 3 kemungkinan kondisi.",
    },
  },
  {
    id: "python-variables",
    moduleId: "mod-1",
    moduleTitle: "Module 01: Computational Thinking & Basics",
    lessonId: "les-2",
    title: "Variabel, Tipe Data Primitif, dan Operasi String di Python",
    readTime: "10 min baca",
    difficulty: "Beginner",
    category: "Python Basics",
    summary: "Kuasai konsep penyimpanan data di memori menggunakan variabel, memahami tipe data int, float, string, boolean, serta f-string modern.",
    publishedDate: "Sep 2026",
    author: {
      name: "Ahmad Fauzi",
      role: "Lead Python & AI Tutor",
      avatar: "AF",
    },
    sections: [
      {
        id: "variables-concept",
        title: "1. Memahami Variabel & Dynamic Typing",
        content: [
          "Variabel adalah wadah penyimpanan data di dalam memori komputer. Di Python, kamu tidak perlu mendeklarasikan tipe data secara eksplisit (Dynamic Typing). Python secara otomatis mendeteksi tipe data berdasarkan nilai yang dimasukkan.",
          "Aturan penamaan variabel di Python (PEP 8): gunakan huruf kecil dan underscore (snake_case), tidak boleh diawali angka, dan tidak menggunakan reserved keywords.",
        ],
      },
      {
        id: "data-types",
        title: "2. Tipe Data Primitif Utama",
        content: [
          "Empat tipe data dasar di Python yang paling sering digunakan:",
          "• **Integer (`int`)**: Bilangan bulat, contoh: `umur = 17`",
          "• **Float (`float`)**: Bilangan desimal/pecahan, contoh: `ipk = 3.85`",
          "• **String (`str`)**: Teks atau deretan karakter dalam tanda kutip, contoh: `nama = 'Andi'`",
          "• **Boolean (`bool`)**: Nilai kebenaran biner: `True` atau `False`",
        ],
        codeSnippet: {
          language: "python",
          filename: "tipe_data.py",
          code: `nama_siswa = "Andi Pratama"
usia = 16
rata_rata_nilai = 89.75
is_active = True

# Format string modern (f-string)
info = f"Siswa: {nama_siswa} | Usia: {usia} th | Nilai: {rata_rata_nilai} | Aktif: {is_active}"
print(info)
print("Tipe data rata_rata_nilai:", type(rata_rata_nilai))`,
          output: `Siswa: Andi Pratama | Usia: 16 th | Nilai: 89.75 | Aktif: True
Tipe data rata_rata_nilai: <class 'float'>`,
        },
        callout: {
          type: "info",
          title: "Modern Python Tip: f-string",
          message: "Gunakan `f'{variabel}'` (f-string) untuk menggabungkan string dan variabel karena jauh lebih cepat dan rapi dibanding konkatenasi tanda tambah (+).",
        },
      },
      {
        id: "string-operations",
        title: "3. Operasi dan Slicing pada String",
        content: [
          "String di Python bersifat *immutable* dan dapat diakses dengan index berbasis nol `[0]`. Kamu juga dapat memotong (slice) teks dengan format `[start:stop:step]`.",
        ],
        codeSnippet: {
          language: "python",
          filename: "string_slicing.py",
          code: `kursus = "Webind Edu Coding Track"

print("Huruf pertama:", kursus[0])       # W
print("5 Karakter awal:", kursus[0:6])     # Webind
print("Huruf besar:", kursus.upper())      # WEBIND EDU CODING TRACK
print("Panjang teks:", len(kursus))        # 24`,
          output: `Huruf pertama: W
5 Karakter awal: Webind
Huruf besar: WEBIND EDU CODING TRACK
Panjang teks: 24`,
        },
      },
    ],
    quiz: {
      question: "Manakah cara pembuatan f-string yang valid dan direkomendasikan di Python 3.6+?",
      options: [
        `print("Halo " + str(nama))`,
        `print(f"Halo, namaku {nama} dan usiaku {umur} tahun.")`,
        `print("Halo, namaku %s" % nama)`,
        `print("Halo {0}".format(nama))`,
      ],
      correctIndex: 1,
      explanation: "Tepat! f-string (`f'...'`) dengan kurung kurawal `{variabel}` adalah sintaks modern yang paling bersih, cepat, dan standar di Python saat ini.",
    },
  },
  {
    id: "python-conditionals",
    moduleId: "mod-2",
    moduleTitle: "Module 02: Control Flow & Logic",
    lessonId: "les-3",
    title: "Pengambilan Keputusan: If, Elif, Else & Operator Logika",
    readTime: "9 min baca",
    difficulty: "Beginner",
    category: "Control Flow",
    summary: "Pelajari bagaimana program mengambil keputusan cerdas menggunakan operator perbandingan, operator logika and/or/not, dan percabangan bertingkat.",
    publishedDate: "Sep 2026",
    author: {
      name: "Ahmad Fauzi",
      role: "Lead Python & AI Tutor",
      avatar: "AF",
    },
    sections: [
      {
        id: "logic-intro",
        title: "1. Struktur Percabangan If-Elif-Else",
        content: [
          "Dalam pemrograman nyata, alur eksekusi kode tidak selalu lurus dari atas ke bawah. Program seringkali harus memilih jalur tindakan yang berbeda berdasarkan kondisi tertentu.",
          "Di Python, blok kode di dalam kondisi ditentukan oleh **indentasi (4 spasi)**.",
        ],
      },
      {
        id: "operators",
        title: "2. Operator Pembanding & Logika",
        content: [
          "• **Pembanding**: `==` (sama dengan), `!=` (tidak sama), `>`, `<`, `>=`, `<=`",
          "• **Logika**: `and` (kedua kondisi harus True), `or` (salah satu kondisi True), `not` (membalik nilai boolean)",
        ],
        codeSnippet: {
          language: "python",
          filename: "sistem_grade.py",
          code: `skor = 88
kehadiran_persen = 95

if skor >= 85 and kehadiran_persen >= 80:
    grade = "A (Cumlaude)"
elif skor >= 75 and kehadiran_persen >= 75:
    grade = "B (Sangat Baik)"
elif skor >= 60:
    grade = "C (Cukup)"
else:
    grade = "D (Perlu Perbaikan)"

print(f"Hasil Evaluasi Siswa: {grade}")`,
          output: `Hasil Evaluasi Siswa: A (Cumlaude)`,
        },
      },
    ],
    quiz: {
      question: "Jika nilai `x = 5` dan `y = 10`, apa hasil evaluasi ekspresi `(x < 10) and (y == 20)`?",
      options: ["True", "False", "Error", "None"],
      correctIndex: 1,
      explanation: "False, karena operator 'and' membutuhkan KEDUA kondisi bernilai True. Di sini `y == 20` bernilai False, sehingga hasil akhirnya False.",
    },
  },
  {
    id: "python-loops",
    moduleId: "mod-2",
    moduleTitle: "Module 02: Control Flow & Logic",
    lessonId: "les-4",
    title: "Perulangan di Python: For Loop, While Loop & List Iteration",
    readTime: "11 min baca",
    difficulty: "Intermediate",
    category: "Control Flow",
    summary: "Otomatisasi tugas repetitif dengan for-in loop, fungsi range(), while loop, serta kontrol perulangan break dan continue.",
    publishedDate: "Sep 2026",
    author: {
      name: "Ahmad Fauzi",
      role: "Lead Python & AI Tutor",
      avatar: "AF",
    },
    sections: [
      {
        id: "for-loop",
        title: "1. For Loop dan Fungsi range()",
        content: [
          "For loop digunakan untuk melakukan iterasi pada sebuah urutan (seperti list, tuple, string) atau rentang angka yang dihasilkan oleh fungsi `range()`.",
        ],
        codeSnippet: {
          language: "python",
          filename: "for_loop_demo.py",
          code: `bahasa = ["Python", "TypeScript", "SQL", "Go"]

print("--- Daftar Skill Webind ---")
for index, item in enumerate(bahasa, start=1):
    print(f"{index}. Belajar {item}")

print("\\n--- Deret Angka Genap (2 sampai 10) ---")
for n in range(2, 11, 2):
    print(n, end=" ")`,
          output: `--- Daftar Skill Webind ---
1. Belajar Python
2. Belajar TypeScript
3. Belajar SQL
4. Belajar Go

--- Deret Angka Genap (2 sampai 10) ---
2 4 6 8 10 `,
        },
      },
      {
        id: "while-loop",
        title: "2. While Loop & Kontrol Break / Continue",
        content: [
          "While loop terus berjalan selama kondisi yang ditentukan bernilai `True`. Sangat cocok untuk program interaktif atau menu game yang menunggu input pemain.",
          "• `break`: Menghentikan perulangan seketika.",
          "• `continue`: Melewati iterasi saat ini dan lanjut ke iterasi berikutnya.",
        ],
      },
    ],
    quiz: {
      question: "Berapa kali perulangan `for i in range(1, 5):` akan dieksekusi?",
      options: ["4 kali (1, 2, 3, 4)", "5 kali (1, 2, 3, 4, 5)", "3 kali (1, 2, 3)", "6 kali"],
      correctIndex: 0,
      explanation: "Fungsi range(1, 5) menghasilkan angka dari start (1) sampai stop-1 (4), sehingga loop berjalan tepat 4 kali.",
    },
  },
  {
    id: "python-functions",
    moduleId: "mod-3",
    moduleTitle: "Module 03: Functions & Modular Programming",
    lessonId: "les-5",
    title: "Fungsi, Parameter, Return Values & Scope di Python",
    readTime: "12 min baca",
    difficulty: "Intermediate",
    category: "Modular Programming",
    summary: "Pelajari cara menulis kode yang bersih, modular, dan DRY (Don't Repeat Yourself) dengan mendefinisikan fungsi kustom di Python.",
    publishedDate: "Sep 2026",
    author: {
      name: "Ahmad Fauzi",
      role: "Lead Python & AI Tutor",
      avatar: "AF",
    },
    sections: [
      {
        id: "def-function",
        title: "1. Mengapa Kita Membutuhkan Functions?",
        content: [
          "Functions memungkinkan kita mengelompokkan sekumpulan baris kode menjadi satu kesatuan logika yang dapat dipanggil berkali-kali tanpa menulis ulang.",
          "Prinsip penting: **DRY (Don't Repeat Yourself)** dan **Single Responsibility Principle**.",
        ],
      },
      {
        id: "function-syntax",
        title: "2. Sintaks `def` & Nilai Kembalian `return`",
        content: [
          "Fungsi dapat menerima input berupa parameter/argumen, dan mengembalikan hasil olahan menggunakan kata kunci `return`.",
        ],
        codeSnippet: {
          language: "python",
          filename: "kalkulator_diskon.py",
          code: `def hitung_total_belanja(harga_asli: float, diskon_persen: float = 0.0) -> float:
    """Menghitung total harga setelah dipotong diskon."""
    potongan = harga_asli * (diskon_persen / 100)
    total_akhir = harga_asli - potongan
    return total_akhir

# Pemanggilan fungsi
tagihan_1 = hitung_total_belanja(200000, 15)  # Diskon 15%
tagihan_2 = hitung_total_belanja(150000)      # Default diskon 0%

print(f"Tagihan 1: Rp {tagihan_1:,.0f}")
print(f"Tagihan 2: Rp {tagihan_2:,.0f}")`,
          output: `Tagihan 1: Rp 170,000
Tagihan 2: Rp 150,000`,
        },
      },
    ],
    quiz: {
      question: "Apa fungsi dari kata kunci `return` di dalam sebuah function Python?",
      options: [
        "Untuk mencetak teks ke layar terminal",
        "Mengembalikan nilai hasil komputasi dari fungsi ke pemanggilnya dan mengakhiri eksekusi fungsi",
        "Untuk mengulang jalannya fungsi dari awal",
        "Menghapus variabel di dalam fungsi",
      ],
      correctIndex: 1,
      explanation: "Benar! `return` mengembalikan nilai keluaran (output) dari sebuah fungsi ke baris pemanggil serta menghentikan eksekusi fungsi tersebut.",
    },
  },
];
