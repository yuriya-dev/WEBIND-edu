# Pengembangan Studio Konten Tutor Webind Edu

Dokumen ini menjabarkan tiga usulan Anda dan menambahkan saran lain, berdasarkan deskripsi fitur Studio Konten (`/tutor/studio`) yang sekarang. Halaman `dashboard/materials/python-functions` tidak bisa saya buka, jadi saya mengasumsikannya sebagai tampilan baca materi untuk murid. Jika berbeda, bagian A perlu disesuaikan.

---

## 1. Kondisi Sekarang dan Celahnya

Studio yang ada sudah kuat di tiga hal: konten terhubung ke program dan nomor sesi silabus, setiap bagian materi bisa dipetakan ke elemen CP, dan presentasi berbasis web sudah punya timer, catatan pembicara, dan mini kuis. Celah terbesarnya ada di pengalaman menyunting. Editor berbasis formulir (judul bagian, isi paragraf, blok kode) membuat tutor tidak melihat hasil akhirnya saat menulis, dan belum ada gambar sama sekali di materi, presentasi, maupun kuis.

| Area | Kondisi sekarang | Dampak bagi tutor |
|---|---|---|
| Penyuntingan materi | Formulir per bagian, pratinjau lewat tombol alih | Bolak-balik antara edit dan pratinjau, lambat untuk materi panjang |
| Gambar | Belum ada | Diagram, flowchart, dan tangkapan layar tidak bisa dimasukkan |
| Presentasi | Slide web, mini kuis, blok kode statis | Kode hanya dilihat, belum bisa dijalankan atau dimodifikasi bersama murid |
| Penggunaan ulang | Materi, slide, dan kuis dibuat terpisah | Isi yang sama ditulis tiga kali |

---

## 2. Usulan Anda yang Dijabarkan

### A. Editor materi dengan tampilan seperti halaman murid

**Tujuan.** Tutor menyunting materi langsung di atas tampilan yang akan dilihat murid (WYSIWYG), tanpa berpindah antara formulir dan pratinjau.

a. **Satu komponen untuk membaca dan menyunting.** Buat satu komponen penyaji materi yang sama dipakai di halaman murid dan di Studio, dengan satu properti `editable`. Saat `editable` aktif, setiap blok bisa diklik dan diubah di tempat. Cara ini menjaga tampilan editor dan tampilan murid selalu identik karena sumbernya satu.

b. **Penyunting berbasis blok.** Tutor menambah blok lewat perintah garis miring (`/`) atau tombol plus di antara blok. Jenis blok yang disarankan: judul, paragraf, gambar, blok kode, kotak catatan (tips, peringatan, contoh), daftar, tabel, tanam kuis, dan catatan privat tutor. Urutan blok bisa diubah dengan seret dan lepas.

c. **Catatan privat tetap tampak berbeda saat menyunting.** Beri blok catatan privat latar dan ikon gembok yang jelas, sehingga tutor langsung tahu bagian mana yang tidak akan dilihat murid. Tombol "Lihat sebagai murid" tetap ada untuk memeriksa hasil akhir.

d. **Simpan otomatis dan riwayat versi.** Draf tersimpan otomatis setiap beberapa detik, dan ada indikator "Tersimpan". Setiap kali publikasi, simpan satu versi supaya tutor bisa melihat perubahan dan mengembalikan versi lama.

e. **Pemetaan CP tetap per bagian.** Tag CP ditempel pada judul bagian lewat pemilih kecil di samping judul, bukan di panel terpisah, supaya pemetaan tidak terlupa.

e2. **Penghubung ke tampilan murid.** Tampilan baca di dasbor murid memakai penyaji yang sama, hanya tanpa kontrol suntingan dan tanpa blok catatan privat.

### B. Gambar di materi, presentasi, dan kuis

**Tujuan.** Tutor bisa memasukkan diagram, flowchart, tangkapan layar, dan ilustrasi di semua jenis konten.

a. **Cara memasukkan gambar.** Seret dan lepas berkas, tempel dari papan klip (berguna untuk tangkapan layar), atau pilih dari perpustakaan media. Setelah diunggah, gambar otomatis dikecilkan dan diubah ke format ringan seperti WebP supaya cepat dibuka di koneksi rumah murid yang tidak stabil.

b. **Teks alternatif wajib.** Setiap gambar harus punya teks alternatif singkat dan boleh punya keterangan. Ini membantu aksesibilitas, dan menjadi cadangan saat gambar gagal dimuat.

c. **Perpustakaan media.** Semua gambar yang diunggah tersimpan di satu perpustakaan per tutor atau per program, lengkap dengan pencarian dan penanda. Gambar yang sama (misalnya diagram flowchart percabangan) bisa dipakai ulang di materi, slide, dan kuis tanpa unggah ulang.

d. **Gambar di kuis.** Gambar bisa ditempel di teks soal, di pilihan jawaban (misalnya memilih flowchart yang benar), dan di pembahasan. Ini berguna untuk soal berpikir komputasional di jenjang SD.

e. **Di presentasi.** Gambar bisa menjadi latar penuh, gambar berdampingan dengan teks, atau gambar dengan penanda titik (hotspot) yang menampilkan penjelasan saat diklik.

f. **Hak cipta dan keamanan.** Beri pengingat saat mengunggah bahwa gambar harus milik sendiri atau berlisensi bebas, dan sediakan kolom sumber atau kredit. Di sisi server, batasi tipe dan ukuran berkas, periksa isi berkas, dan sajikan gambar lewat tautan bertanda tangan atau jalur yang terkontrol.

### C. Presentasi yang interaktif

**Tujuan.** Murid ikut bergerak selama sesi, bukan hanya melihat slide. Ini juga memberi data nyata untuk laporan sesi.

| Jenis slide | Fungsi | Contoh penggunaan |
|---|---|---|
| Konten | Teks dan gambar | Penjelasan konsep |
| Kode yang bisa dijalankan | Menjalankan dan mengubah kode di slide | Mengubah angka di perulangan dan melihat hasilnya |
| Tebak keluaran | Murid menebak hasil sebelum kode dijalankan | Latihan memahami percabangan |
| Urutkan langkah | Murid menyusun langkah algoritma atau potongan kode | Menyusun flowchart atau urutan perintah |
| Pilihan ganda cepat | Mini kuis dengan umpan balik instan | Sudah ada, tambah penyimpanan jawaban |
| Titik panas gambar | Klik bagian gambar untuk melihat penjelasan | Mengenal bagian komputer |
| Papan tulis | Coretan bebas untuk murid dan tutor | Menggambar flowchart bersama |
| Refleksi | Murid memilih "paham / ragu / belum" | Penutup sesi untuk laporan |

a. **Kode yang benar-benar dijalankan.** Untuk Python, jalankan di peramban murid (misalnya lewat Pyodide) supaya tidak membebani server dan aman karena kode tidak dieksekusi di server Anda. Cukup mulai dari Python, lalu HTML dan CSS dengan pratinjau langsung.

b. **Tampilan presenter terpisah.** Tutor melihat slide saat ini, slide berikutnya, catatan pembicara, dan timer; murid hanya melihat slide. Untuk sesi tatap muka satu laptop, cukup tombol untuk menyembunyikan catatan dan timer.

c. **Dukungan sesi duo dan trio.** Setiap murid bisa menjawab interaktif dengan namanya, dan tutor melihat jawaban per murid. Ini sejalan dengan paket duo dan trio.

d. **Hasil interaksi masuk ke laporan sesi.** Jawaban mini kuis, hasil tebak keluaran, dan pilihan refleksi disimpan dan otomatis muncul sebagai ringkasan di formulir laporan sesi, sehingga tutor tinggal memeriksa dan menambah catatan.

e. **Tetap siap luring.** Semua aset slide, termasuk gambar dan mesin menjalankan kode, harus bisa di-cache supaya sesi tetap lancar bila internet di rumah murid mati.

---

## 3. Saran Tambahan dari Saya

a. **Satu sumber konten untuk tiga bentuk.** Materi, slide, dan kuis sebaiknya berbagi blok yang sama. Beri tombol "Buat slide dari materi" yang mengubah tiap bagian menjadi satu slide, dan "Buat kuis dari materi" yang menyiapkan draf soal. Tutor menyunting hasilnya, bukan menulis ulang dari nol.

b. **Mulai dari silabus, bukan halaman kosong.** Tombol "Buat baru" sebaiknya diawali dengan memilih program dan nomor sesi dari silabus. Sistem lalu mengisi judul, elemen CP, dan kerangka sesi otomatis: pembukaan, materi inti, praktik, dan refleksi. Kerangka 90 menit yang disarankan: 10 menit mengulang, 25 menit materi, 40 menit praktik, dan 15 menit refleksi dan tugas (60 menit untuk SD dengan porsi lebih singkat).

c. **Varian jenjang dalam satu materi.** Materi yang sama sering perlu versi SD dan versi SMP atau SMA. Izinkan satu materi memiliki blok yang hanya tampil untuk jenjang tertentu, sehingga tutor tidak menduplikasi seluruh materi hanya karena beberapa paragraf berbeda.

d. **Asisten AI untuk draf, dengan persetujuan tutor.** Sediakan tombol yang menyusun draf materi, soal, atau catatan pembicara berdasarkan program, sesi, jenjang, dan elemen CP. Hasilnya selalu berstatus draf dan harus dibaca serta disetujui tutor sebelum diterbitkan. Cantumkan juga kolom referensi (judul buku Kemendikdasmen, bab, dan tautan) dan jangan menyalin teks buku, cukup merujuknya.

e. **Bank soal yang bisa disaring.** Beri setiap soal penanda elemen CP, tingkat kesulitan, dan jenjang, lalu izinkan pembuatan kuis dengan memilih soal dari bank, termasuk pengacakan urutan. Setelah murid mengerjakan, tampilkan soal yang paling sering salah. Data itu menunjukkan bagian materi mana yang perlu diperjelas.

f. **Penilaian tugas kode yang jelas.** Untuk soal kode, tambahkan rubrik (misalnya kebenaran hasil, kerapian, dan kreativitas) dan, bila memungkinkan, kasus uji yang dijalankan di peramban untuk memeriksa jawaban murid secara otomatis. Tutor tetap membuat keputusan akhir.

g. **Catatan privat harus aman dari sisi server.** Pastikan catatan tutor, kunci jawaban, dan blok bertanda privat tidak pernah dikirim ke peramban murid atau orang tua, bukan hanya disembunyikan lewat tampilan. Lakukan penyaringan di API berdasarkan peran, karena siapa pun bisa membaca data yang tetap terkirim lewat alat pengembang peramban.

h. **Bersihkan isi sebelum ditampilkan.** Karena editor menerima teks kaya, gambar, dan kode, bersihkan isinya di server untuk mencegah penyisipan skrip berbahaya, dan jangan izinkan HTML mentah dari tutor kecuali di blok yang memang diisolasi.

i. **Cetak dan bagikan.** Sediakan ekspor materi ke PDF sebagai lembar kerja bagi murid yang belajar tanpa laptop, serta kode QR atau tautan singkat untuk membuka slide dari ponsel murid.

j. **Kolaborasi antar tutor.** Siapkan fitur duplikat materi, komentar pada blok, dan status ulasan (draf, menunggu ulasan, diterbitkan). Ini mempermudah penambahan tutor di masa depan tanpa mengurangi kualitas.

k. **Tampilan murid yang menyesuaikan usia.** Saat materi dibuka murid SD, gunakan ukuran huruf lebih besar, ikon, dan bahasa sederhana. Untuk SMP dan SMA, gunakan tampilan yang lebih ringkas.

---

## 4. Contoh Model Data Blok

Simpan isi materi sebagai daftar blok berbentuk JSON agar mudah dipakai ulang untuk slide dan kuis.

```json
{
  "id": "mat_coding-starter_07",
  "program": "coding-starter",
  "session": 7,
  "levels": ["SMP"],
  "status": "draft",
  "references": [{ "title": "Buku Informatika Kemendikdasmen", "chapter": "[bab]", "url": "[tautan]" }],
  "blocks": [
    { "type": "heading", "text": "Percabangan (if, elif, else)", "cp": ["AP"] },
    { "type": "paragraph", "text": "Percabangan membuat program memilih jalan berdasarkan kondisi." },
    { "type": "image", "mediaId": "media_123", "alt": "Flowchart percabangan if", "caption": "Alur if dan else" },
    { "type": "code", "lang": "python", "filename": "if.py", "runnable": true, "code": "nilai = 80\nif nilai >= 75:\n    print('Lulus')" },
    { "type": "callout", "tone": "tip", "text": "Perhatikan tanda titik dua dan jarak masuk baris." },
    { "type": "quiz-embed", "quizId": "quiz_045" },
    { "type": "teacher-note", "visibility": "tutor", "text": "Ajak murid menyebut contoh keputusan sehari-hari. Beri jeda 30 detik." }
  ]
}
```

---

## 5. Urutan Pengerjaan yang Disarankan

| Fase | Fokus | Hasil |
|---|---|---|
| 1 | Penyunting blok di tempat, simpan otomatis, gambar di materi, perpustakaan media | Tutor menulis materi lebih cepat dan bisa memakai gambar |
| 2 | Gambar di kuis dan slide, jenis slide interaktif (kode yang bisa dijalankan, tebak keluaran, urutkan langkah), penyimpanan jawaban murid | Sesi tatap muka lebih hidup dan data jawaban masuk ke laporan sesi |
| 3 | Mulai dari silabus, buat slide dan kuis dari materi, varian jenjang, bank soal | Pembuatan konten jauh lebih cepat dan konsisten |
| 4 | Asisten AI, riwayat versi, ulasan antar tutor, ekspor PDF | Siap ditambah tutor baru |

Penyaringan catatan privat di sisi server dan pembersihan isi (bagian 3g dan 3h) tidak menunggu fase tertentu. Kerjakan bersamaan dengan Fase 1 karena menyangkut keamanan data murid.

---

## 6. Kriteria Selesai Singkat

| Fitur | Dianggap selesai bila | Status Implementasi |
|---|---|---|
| Editor di tempat (WYSIWYG) | Tampilan editor dan tampilan murid identik (`UnifiedMaterialRenderer`), dan perubahan tersimpan otomatis (`auto-save`) | ✅ **Selesai Diimplementasikan** (`/tutor/studio/materials/[id]`) |
| Gambar di materi | Tersedia dukungan blok gambar, wajib teks alternatif, dan pemilih Perpustakaan Media | ✅ **Selesai Diimplementasikan** (`UnifiedMaterialRenderer` & `mockMediaLibrary`) |
| Kuis bergambar | Gambar tampil di pertanyaan soal dan opsi jawaban | ✅ **Selesai Diimplementasikan** (`/tutor/studio/quizzes/[id]`) |
| Slide interaktif | Berjalan luring dengan tipe kode dieksekusi, tebak keluaran, urutkan langkah, dan refleksi | ✅ **Selesai Diimplementasikan** (`/tutor/studio/presentations/[id]`) |
| Keamanan catatan privat | Catatan privat tutor otomatis disaring dan disembunyikan untuk peran murid dan orang tua | ✅ **Selesai Diimplementasikan** (`userRole` filter pada `UnifiedMaterialRenderer`) |
| Penghubung tampilan murid | Halaman pembaca materi murid (`/dashboard/materials/[materialId]`) menggunakan penyaji blok terpadu | ✅ **Selesai Diimplementasikan** (`MaterialReaderPage`) |

---

## 7. Catatan Teknis & Arsitektur Kode
1. **Penyaji Blok Terpadu**: Komponen [`src/components/dashboard/UnifiedMaterialRenderer.tsx`](file:///Users/wahyutricahya/Web%20Development/WEBIND-eco/WEBIND-edu/src/components/dashboard/UnifiedMaterialRenderer.tsx) digunakan ganda oleh Tutor (mode `isEditable={true}`) dan Murid (`isEditable={false}`).
2. **Model Blok JSON**: Format data disimpan dalam array objek `ContentBlock` pada [`src/lib/data/contentStudio.ts`](file:///Users/wahyutricahya/Web%20Development/WEBIND-eco/WEBIND-edu/src/lib/data/contentStudio.ts) lengkap dengan blok `heading`, `paragraph`, `image`, `code`, `callout`, dan `teacher-note`.
3. **Presenter Interaktif**: Viewer slide pada [`src/app/[locale]/tutor/studio/presentations/[id]/page.tsx`](file:///Users/wahyutricahya/Web%20Development/WEBIND-eco/WEBIND-edu/src/app/[locale]/tutor/studio/presentations/[id]/page.tsx) mendukung kontrol keyboard, eksekusi kode langsung, tebak keluaran, pengurutan langkah algoritma, dan refleksi akhir sesi.