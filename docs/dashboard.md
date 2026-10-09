# Spesifikasi Dasbor Webind Edu (Tutor, Murid, Orang Tua)

Dokumen ini adalah acuan implementasi dasbor. Isinya disesuaikan dengan keputusan produk terbaru: les **tatap muka ke rumah sebagai format utama**, **daring hanya bila ada halangan**, **tanpa biaya transport** (tidak ada zona), opsi **Duo** (maksimal 2 anak), dan paket **Tuntas / Bulanan / Sesi Satuan** dengan masa berlaku.

Teks bertanda `[...]` perlu diputuskan sebelum implementasi.

---

## A. Ringkasan Menu per Peran

| Peran | Menu |
|---|---|
| **Tutor** | Hari Ini, Siswa, Jadwal, Sesi dan Absensi, Laporan dan Evaluasi, **Studio Konten** (Materi, Kuis, Presentasi), Paket dan Pembayaran |
| **Murid** | Beranda, Jalur Belajar, Jadwal, Materi dan Presentasi, Kuis dan Latihan, Keterampilan dan Karya |
| **Orang tua** *(baru)* | Ringkasan Anak, Laporan Sesi, Jadwal, Paket dan Pembayaran |

Perubahan terbesar dari versi sebelumnya:
1. **Studio Konten untuk tutor**: tutor dapat membuat dan memperbarui materi, kuis, dan halaman presentasi, lalu menugaskannya ke sesi atau murid tertentu.
2. **Dasbor orang tua**: orang tua adalah pembayar dan pemantau, sehingga harus punya tampilan sendiri.
3. **Zona transport dihapus** dari semua modul, karena tarif sudah *all-in*. Jadwal cukup memperhatikan kelompok wilayah secara informal (catatan alamat), bukan perhitungan biaya.

---

## B. Prinsip Desain

a. **Satu inti data: Pendaftaran** (murid + program + paket). Sesi, laporan, tugas, kuis, dan tagihan semuanya menempel pada pendaftaran, sehingga tidak ada data tercecer.

b. **Konten ditulis sekali, dipakai berulang.** Materi, kuis, dan presentasi disimpan sebagai pustaka milik silabus (program, sesi ke-N), lalu dapat disalin dan disesuaikan per murid.

c. **Mengisi harus cepat, terutama di ponsel.** Tutor sering di jalan antar rumah murid. Formulir laporan sesi harus selesai dalam sekitar satu menit.

d. **Aturan bisnis berjalan otomatis**: potong sesi saat selesai, hitung pembatalan, tandai paket hampir habis. Tidak perlu diperdebatkan manual.

e. **Satu bahasa tampilan menurut usia.** Murid SD mendapat tampilan besar dengan ikon dan lencana, murid SMP/SMA mendapat tampilan ringkas.

---

## C. Dasbor Tutor

### C1. Hari Ini (beranda tutor)

"Daftar kerja hari ini", bukan sekadar angka.

| Blok | Isi | Aksi |
|---|---|---|
| Sesi hari ini | Jam, nama murid, program dan sesi ke-N, alamat (atau tautan video call bila daring), status | Buka materi sesi, mulai sesi, tandai selesai |
| Perlu ditindaklanjuti | Laporan sesi belum diisi, tugas atau kuis belum dinilai, paket hampir habis atau kedaluwarsa, permintaan ganti jadwal | Satu klik ke halaman terkait |
| Draf konten | Materi, kuis, atau presentasi yang belum dipublikasikan | Lanjutkan menyunting |

### C2. Siswa

Kartu murid: kontak orang tua, jenjang, alamat, program yang diikuti, sisa sesi, masa berlaku, catatan khusus (gaya belajar, perangkat). Tab di dalam kartu: **Ringkasan, Sesi, Kuis dan Tugas, Laporan, Karya**.

### C3. Jadwal

Tampilan per hari dan per minggu, sesi Duo ditandai sebagai satu blok, peringatan bentrok, dan penanda sesi yang dialihkan ke daring. Permintaan ganti jadwal dari orang tua muncul di sini untuk disetujui atau ditolak.

### C4. Sesi dan Absensi

Satu alur: tutor menandai sesi, sistem memperbarui paket.

| Status | Efek pada paket |
|---|---|
| Hadir tatap muka | Sisa sesi berkurang 1 |
| Hadir daring (karena ada halangan) | Sisa sesi berkurang 1, tanpa penalti |
| Izin lebih dari `[24 jam]` sebelum sesi | Jadwal diganti, sisa sesi tetap |
| Batal kurang dari `[24 jam]` atau tutor sudah berangkat | Tetap dihitung 1 sesi |

> **Perlu diputuskan:** batas waktu izin. `docs/FAQ.md` menyebut 24 jam, sedangkan `docs/harga.md` menyebut 6 jam. Pilih satu dan samakan di semua dokumen dan di aturan sistem.

### C5. Laporan dan Evaluasi

**Laporan sesi (target selesai dalam 1 menit):**
1. Pilih sesi dari silabus (misalnya Coding Starter sesi 7), terisi otomatis dari jadwal.
2. Centang kompetensi yang tercapai (daftar diambil dari sesi tersebut).
3. Tulis satu catatan singkat.
4. Tentukan tugas berikutnya (bisa memilih dari pustaka kuis atau latihan).
5. Kirim ke orang tua, dengan notifikasi WhatsApp.

**Evaluasi akhir program:** rubrik per elemen CP (BK, TIK, SK, JKI, AD, AP, DSI, PLB), menghasilkan rapor singkat dan rekomendasi program lanjutan.

### C6. Studio Konten (baru, inti permintaan)

Tutor dapat **membuat, menyunting, menggandakan, dan menerbitkan** tiga jenis konten. Semuanya terkait ke program dan sesi silabus.

#### C6.1 Materi

| Aspek | Spesifikasi |
|---|---|
| Penyunting | Editor blok: judul, paragraf, daftar, gambar, tabel, blok kode (dengan sorotan sintaks), tautan video, catatan tutor |
| Struktur | Program, sesi ke-N, urutan bagian. Setiap bagian dapat diberi tujuan belajar dan elemen CP |
| Lampiran | Berkas (PDF, gambar, dataset CSV, kode awal) |
| Catatan privat tutor | Kunci jawaban dan tips mengajar, **tidak terlihat oleh murid** |
| Versi | Draf, Terbit, Arsip. Riwayat perubahan disimpan, dapat dikembalikan |
| Cakupan | **Pustaka bersama** (untuk semua murid program) atau **khusus murid tertentu** (salinan yang disesuaikan) |

#### C6.2 Kuis

| Aspek | Spesifikasi |
|---|---|
| Jenis soal | Pilihan ganda, benar/salah, isian singkat, urutkan langkah, dan **soal kode** (jawaban berupa kode, dinilai tutor atau dibandingkan dengan kunci untuk kasus sederhana) |
| Per soal | Pertanyaan, opsi, kunci jawaban, **pembahasan**, bobot nilai, elemen CP, tingkat kesulitan |
| Pengaturan kuis | Durasi (opsional), jumlah percobaan, acak urutan soal, nilai kelulusan, tampilkan pembahasan setelah selesai atau setelah dinilai |
| Penilaian | Otomatis untuk soal objektif. Soal isian panjang dan kode masuk antrean **Perlu Dinilai** di beranda tutor |
| Penugasan | Ke satu murid, ke sesi Duo, atau ke semua murid satu program. Dengan tenggat |
| Hasil | Skor per murid, per soal, dan per elemen CP. Soal yang paling sering salah ditandai untuk diulang di sesi berikutnya |
| Pustaka | Bank soal per program dan sesi, dapat dipakai ulang untuk membuat kuis baru |

#### C6.3 Halaman Presentasi

Halaman presentasi dipakai tutor saat mengajar tatap muka (di laptop murid atau layar tutor) dan dapat dibuka murid untuk mengulang.

| Aspek | Spesifikasi |
|---|---|
| Format | Deretan slide berbasis web (bukan berkas terpisah), satu slide terdiri atas blok: judul, teks, gambar, kode, diagram, kuis mini |
| Mode tutor | Layar penuh, catatan pembicara tersembunyi, penunjuk waktu sesi, tombol maju/mundur |
| Mode murid | Dapat dibuka setelah sesi untuk mengulang, tanpa catatan pembicara |
| Interaktif | **Kuis mini** dan **jeda diskusi** di antara slide. Hasil kuis mini langsung masuk ke catatan sesi |
| Tautan ke materi | Satu presentasi terhubung ke satu sesi silabus, sehingga saat sesi dimulai tutor langsung melihat "Materi + Presentasi + Kuis" sesi tersebut |
| Ekspor | Cetak/PDF untuk murid yang belajar tanpa internet |
| Luring | Slide disimpan di perangkat tutor (cache) agar tetap berjalan bila sinyal di rumah murid buruk |

#### C6.4 Alur kerja konten

```text
Draf  →  Pratinjau (tampilan murid)  →  Terbit  →  Ditugaskan ke sesi/murid
  ↑                                                       │
  └────────────── Perbarui (versi baru) ←────────────────┘
```

Setiap sesi silabus memiliki **paket sesi**: `1 materi + 1 presentasi + 0..N kuis + latihan`. Saat tutor membuka sesi di "Hari Ini", paket ini tampil dalam satu halaman.

### C7. Paket dan Pembayaran

Daftar pendaftaran aktif: jenis paket, sisa sesi, masa berlaku, status bayar. Peringatan otomatis: sisa 1–2 sesi, 7 hari menjelang kedaluwarsa, tagihan belum dibayar.

---

## D. Dasbor Murid

Satu pengaturan **mode tampilan** per akun: *Anak (SD)* atau *Remaja (SMP/SMA)*.

| Menu | Isi |
|---|---|
| Beranda | Sesi berikutnya, tugas dan kuis yang harus dikerjakan, progres program |
| Jalur Belajar | Peta sesi 1 sampai N dengan status **selesai / sedang berjalan / terkunci**, ringkasan dan tugas tiap sesi |
| Jadwal | Sesi mendatang, tombol "ajukan ganti jadwal" (jika diizinkan orang tua) |
| Materi dan Presentasi | Dikelompokkan **per sesi**, bukan satu daftar panjang. Tombol "buka presentasi" untuk mengulang |
| Kuis dan Latihan | Daftar kuis dengan tenggat, mengerjakan kuis, melihat nilai dan pembahasan, mengumpulkan jawaban kode atau berkas |
| Keterampilan dan Karya | Kemajuan per elemen CP (grafik radar), galeri proyek yang bisa dibagikan ke orang tua |

Mode **Anak**: tampilan besar, ikon, bahasa sederhana, lencana dan bintang setiap sesi atau kuis selesai. Mode **Remaja**: tampilan ringkas dan profesional.

Akses murid: hanya melihat konten yang sudah berstatus **Terbit** dan sudah ditugaskan, tanpa catatan privat tutor dan kunci jawaban.

---

## E. Dasbor Orang Tua (baru)

Cukup empat bagian:

| Menu | Isi | Aksi |
|---|---|---|
| Ringkasan Anak | Progres program, kehadiran, **hasil kuis terakhir**, tugas berikutnya | Pilih anak (bila lebih dari satu) |
| Laporan Sesi | Daftar laporan: materi, kompetensi tercapai, catatan tutor, hasil kuis sesi | Buka detail |
| Jadwal | Sesi mendatang, status (tatap muka atau daring) | **Ajukan ganti jadwal** |
| Paket dan Pembayaran | Jenis paket, sisa sesi, masa berlaku, tagihan dan riwayat | Konfirmasi pembayaran, perpanjang paket |

Tambahan:
- **Notifikasi WhatsApp** setiap laporan terbit atau kuis dinilai.
- Untuk murid SD, akun murid **dikendalikan orang tua**.
- Orang tua dapat membuka **presentasi dan materi sesi** anak (hanya baca), supaya bisa membantu mengulang di rumah.

---

## F. Model Data (Garis Besar)

```text
User(id, role[tutor|murid|ortu|admin], nama, kontak)
ParentChild(ortu_id, murid_id)

Program(id, slug, nama, jumlah_sesi)
SyllabusSession(id, program_id, no, judul, elemen_cp[])

Enrollment(id, murid_id, program_id, tutor_id, paket[tuntas|bulanan|satuan],
           format[privat|duo], sisa_sesi, berlaku_sampai, status)

Session(id, enrollment_id, syllabus_session_id, waktu, mode[tatap_muka|daring],
        status[terjadwal|selesai|izin|batal], dihitung[bool])
SessionReport(id, session_id, kompetensi_tercapai[], catatan, tugas_berikutnya, terkirim_at)

# Studio Konten
Material(id, syllabus_session_id, owner_tutor_id, judul, blok[json], catatan_privat,
         cakupan[bersama|murid], murid_id?, status[draf|terbit|arsip], versi)
Presentation(id, syllabus_session_id, owner_tutor_id, judul, slide[json],
             catatan_pembicara, status, versi)
Quiz(id, syllabus_session_id, owner_tutor_id, judul, pengaturan[json], status, versi)
Question(id, quiz_id?, bank_program_id, tipe, teks, opsi[], kunci, pembahasan, bobot, elemen_cp[])
Assignment(id, jenis[materi|presentasi|kuis|latihan], konten_id, target[murid|duo|program],
           target_id, tenggat)
Attempt(id, quiz_id, murid_id, jawaban[json], skor, status[otomatis|perlu_dinilai|dinilai], nilai_oleh)
Artifact(id, murid_id, enrollment_id, judul, tautan/berkas, dibagikan[bool])

Invoice(id, enrollment_id, jumlah, status, jatuh_tempo)
```

---

## G. Hak Akses

| Data | Tutor | Murid | Orang tua |
|---|---|---|---|
| Murid yang ditugaskan padanya | Baca/tulis | - | - |
| Data diri murid sendiri | - | Baca | - |
| Data anak sendiri | - | - | Baca |
| Materi, presentasi, kuis (draf) | Baca/tulis (miliknya) | - | - |
| Materi, presentasi, kuis (terbit & ditugaskan) | Baca/tulis | Baca | Baca |
| Catatan privat, kunci jawaban, catatan pembicara | Baca/tulis | **Tidak terlihat** | **Tidak terlihat** |
| Alamat dan kontak | Hanya tutor yang bersangkutan | - | Milik sendiri |
| Tagihan | Baca | - | Baca/bayar |

Aturan tambahan: jangan tampilkan nama lengkap atau foto anak di area yang bisa dilihat murid lain. Terapkan kontrol akses berbasis peran sejak awal, termasuk pemeriksaan di sisi server.

---

## H. Urutan Implementasi

| Tahap | Cakupan | Alasan |
|---|---|---|
| **1** | Pendaftaran + Sesi + Absensi yang memotong sisa paket otomatis | Fondasi data dan aturan bisnis |
| **2** | Laporan sesi untuk orang tua (formulir cepat, notifikasi WhatsApp) | Nilai terbesar bagi orang tua |
| **3** | Dasbor orang tua versi sederhana | Orang tua adalah pembayar |
| **4** | **Studio Konten: Materi** (editor blok, versi, penugasan) + tampilan materi murid per sesi | Menggantikan persiapan manual tutor |
| **5** | **Studio Konten: Kuis** (bank soal, penilaian otomatis, antrean nilai) + hasil di laporan | Ukuran kemajuan yang objektif |
| **6** | **Studio Konten: Presentasi** (mode tutor/murid, kuis mini, cache luring) | Menyatukan paket sesi |
| **7** | Mode tampilan SD (lencana), radar CP, galeri karya | Pengalaman murid, bisa menyusul saat murid bertambah |

---

## I. Keterkaitan dengan Kode yang Ada

| Kebutuhan | Berkas saat ini | Tindakan |
|---|---|---|
| Data materi murid | `src/lib/data/learningMaterials.ts`, halaman `dashboard/materials` | Pindahkan ke model `Material` per sesi silabus |
| Data murid/tutor (mock) | `src/lib/data/student.ts`, `src/lib/data/tutor.ts` | Ganti bertahap dengan model `Enrollment`/`Session` |
| Layout | `StudentLayout.tsx`, `TutorLayout.tsx` | Tambahkan `ParentLayout.tsx`, menu Studio Konten di `TutorLayout` |
| Halaman tutor | `tutor/{page,students,schedule,attendance,progress}` | Tambahkan `tutor/studio/{materi,kuis,presentasi}` |
| Halaman murid | `dashboard/{page,learning,materials,schedule,progress}` | Tambahkan `dashboard/quizzes` dan `dashboard/presentations/[id]` |
| Dasbor orang tua | belum ada | Tambahkan `parent/{page,reports,schedule,billing}` |
| Silabus per sesi | `src/lib/data/programs.ts` (`syllabus`) | Jadikan sumber `SyllabusSession` |

---

## J. Keputusan yang Dibutuhkan Sebelum Implementasi

1. **Batas izin/pembatalan:** 24 jam atau 6 jam (lihat C4).
2. **Penyimpanan dan autentikasi:** apakah memakai backend sendiri (misalnya Supabase atau Firebase) atau tetap data contoh dulu untuk prototipe?
3. **Editor konten:** editor blok sederhana buatan sendiri, atau pustaka siap pakai (misalnya TipTap)?
4. **Penilaian soal kode:** cukup dinilai manual oleh tutor pada tahap awal, atau perlu pengecekan otomatis?
5. **Pembayaran:** pencatatan manual oleh tutor/admin, atau integrasi QRIS/payment gateway?
6. **Notifikasi WhatsApp:** tautan `wa.me` manual, atau WhatsApp Business API?