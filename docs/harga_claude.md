# Halaman Harga Webind Edu: UI/UX dan Daftar Harga

Semua angka adalah usulan awal. Cocokkan dengan harga lembaga setempat, biaya transport, dan jam kerja Anda, lalu simpan di satu berkas konfigurasi (lihat bagian F) agar mudah diubah. Teks bertanda `[...]` perlu Anda isi sendiri.

---

## A. Prinsip Tampilan

a. Orang tua memilih berdasarkan kelas anak dan hasil akhir, bukan berdasarkan nama paket, sehingga halaman dimulai dari pemilih kelas.

b. Angka besar yang tampil selalu total paket, dan harga per sesi muncul sebagai teks kecil di bawahnya, supaya mudah dibandingkan dengan tarif per jam di tempat lain.

c. Semua syarat penting (transport, masa berlaku, pembatalan) tampil di halaman yang sama dengan harga, tidak disembunyikan di halaman lain.

d. Halaman dirancang untuk ponsel lebih dulu, karena sebagian besar orang tua akan membukanya dari WhatsApp.

---

## B. Struktur Halaman (Urutan dari Atas ke Bawah)

| No | Bagian | Isi dan Perilaku |
|---|---|---|
| 1 | Hero | Judul "Harga yang jelas, sesuai kelas anak", satu kalimat pendamping, dan pemilih kelas (SD 4–6, SMP 7–9, SMA, Mahasiswa pemula). Setelah kelas dipilih, bagian 4 otomatis menyorot program yang cocok. |
| 2 | Pilihan format | Tiga tab: **Privat ke rumah** (default), **Duo/Trio ke rumah**, dan **Privat daring**. Mengganti tab langsung mengubah semua harga di halaman tanpa memuat ulang. |
| 3 | Jenis paket | Tiga kartu: **Sesi Lepas**, **Paket Bulanan** (label "Paling populer"), dan **Paket Program** (label "Sampai selesai + sertifikat"). Setiap kartu menampilkan apa saja yang termasuk. |
| 4 | Tabel harga per program | Lima baris program dengan kolom jumlah sesi, harga per sesi, harga Paket Bulanan, dan total Paket Program. Baris program yang cocok dengan kelas pilihan diberi warna latar lembut. |
| 5 | Kalkulator paket | Pilih program, format, dan zona, lalu tampil estimasi total beserta tombol "Lanjut ke WhatsApp" yang sudah berisi pesan terisi otomatis. |
| 6 | Biaya transport | Tabel zona dan kolom isian kecamatan untuk memeriksa zona secara cepat. |
| 7 | Yang Anda dapatkan | Satu baris ikon singkat: kurikulum personal, materi latihan, laporan progres per sesi, proyek akhir, selaras Kurikulum Merdeka. |
| 8 | Aturan singkat | Masa berlaku, pembatalan, pembayaran, dan sesi percobaan. |
| 9 | FAQ | Akordeon, dengan satu jawaban terbuka secara default. |
| 10 | Ajakan akhir | "Coba satu sesi dulu" dan "Tanya via WhatsApp". |

Tombol WhatsApp tetap menempel di bagian bawah layar ponsel dari awal sampai akhir halaman.

---

## C. Detail Perilaku Antarmuka

| Elemen | Perilaku |
|---|---|
| Pemilih kelas | Disimpan di sesi pengguna; jika kelas dipilih, halaman program lain ikut menyorot program yang sama. |
| Tab format | Perubahan harga ditampilkan dengan transisi singkat agar pengguna sadar angka berubah. |
| Kartu "Paling populer" | Ditempatkan di tengah pada tampilan desktop, dan paling atas pada tampilan ponsel. |
| Tabel harga | Di ponsel berubah menjadi kartu bertumpuk (satu kartu per program), bukan tabel yang digeser ke samping. |
| Kalkulator | Menampilkan rincian: harga sesi, jumlah sesi, biaya transport, total. Tidak ada biaya tersembunyi di luar rincian ini. |
| Tombol daftar | Mengarah ke `/id/daftar` dengan program, format, dan paket terisi otomatis lewat parameter URL. |
| Aksesibilitas | Kontras warna memadai, ukuran teks minimal 16 px, dan semua tab bisa dioperasikan dengan papan ketik. |
| Pelacakan | Catat klik kelas, tab format, kalkulator, dan tombol WhatsApp untuk mengetahui bagian mana yang membuat orang berhenti. |

---

## D. Daftar Harga (Usulan)

### D1. Harga per sesi menurut program

Sesi 90 menit. Untuk anak SD, sesi berdurasi 60 menit dengan harga 75% dari tabel.

| Program | Sesi | Privat ke rumah | Duo (per anak) | Trio (per anak) | Privat daring |
|---|---|---|---|---|---|
| Digital Starter | 8 | Rp 140.000 | Rp 100.000 | Rp 80.000 | Rp 120.000 |
| Coding Starter | 10 | Rp 160.000 | Rp 110.000 | Rp 90.000 | Rp 140.000 |
| AI Starter | 6 | Rp 175.000 | Rp 120.000 | Rp 100.000 | Rp 155.000 |
| Web Developer | 12 | Rp 200.000 | Rp 140.000 | Rp 110.000 | Rp 180.000 |
| AI Developer | 12 | Rp 225.000 | Rp 160.000 | Rp 125.000 | Rp 205.000 |

### D2. Paket Program (privat ke rumah, bayar di muka)

Harga per sesi di dalam paket sama dengan tabel D1. Paket Program mencakup seluruh sesi program, proyek akhir, laporan akhir, dan sertifikat.

| Program | Sesi | Total Paket Program | Masa berlaku |
|---|---|---|---|
| Digital Starter | 8 | Rp 1.120.000 | 12 minggu |
| Coding Starter | 10 | Rp 1.600.000 | 14 minggu |
| AI Starter | 6 | Rp 1.050.000 | 10 minggu |
| Web Developer | 12 | Rp 2.400.000 | 16 minggu |
| AI Developer | 12 | Rp 2.700.000 | 16 minggu |

### D3. Paket Bulanan (4 sesi, privat ke rumah)

Lebih fleksibel dan bisa berpindah program saat anak naik level. Harga per sesi sedikit lebih tinggi dari Paket Program karena tidak ada komitmen sampai selesai.

| Program | Total 4 sesi | Setara per sesi | Masa berlaku |
|---|---|---|---|
| Digital Starter | Rp 600.000 | Rp 150.000 | 6 minggu |
| Coding Starter | Rp 680.000 | Rp 170.000 | 6 minggu |
| AI Starter | Rp 740.000 | Rp 185.000 | 6 minggu |
| Web Developer | Rp 840.000 | Rp 210.000 | 6 minggu |
| AI Developer | Rp 940.000 | Rp 235.000 | 6 minggu |

### D4. Sesi Lepas

Harga Sesi Lepas adalah harga Paket Bulanan per sesi ditambah Rp 15.000. Tujuannya sebagai pintu masuk fleksibel, bukan pilihan utama.

### D5. Biaya Transport (hanya untuk sesi ke rumah)

Biaya dihitung per sesi. Untuk duo atau trio, biaya dibagi rata antar anak.

| Zona | Jarak dari [titik acuan] | Tambahan per sesi |
|---|---|---|
| Zona 1 | sampai 5 km | Gratis |
| Zona 2 | 5–10 km | Rp 15.000 |
| Zona 3 | 10–20 km | Rp 30.000 |
| Di luar zona | lebih dari 20 km | Dibicarakan lebih dulu |

### D6. Sesi Percobaan

45 menit, [gratis / Rp ...], dihadiri orang tua, dan bisa dilakukan sebelum membeli paket apa pun.

---

## E. Aturan Singkat (Tampil di Halaman Harga)

| Aturan | Isi |
|---|---|
| Pembayaran | Dibayar di muka sebelum sesi pertama lewat [transfer / QRIS]. |
| Penjadwalan ulang | Bisa dilakukan paling lambat 24 jam sebelum sesi. |
| Pembatalan | Pembatalan kurang dari 24 jam atau setelah tutor berangkat tetap dihitung sebagai satu sesi. |
| Masa berlaku | Sesi yang tidak terpakai sampai masa berlaku berakhir hangus. |
| Perangkat | [Murid memakai laptop sendiri / tutor menyediakan laptop cadangan]. |
| Pendampingan orang tua | Orang tua atau anggota keluarga dewasa diharapkan berada di rumah saat sesi tatap muka. |

---

## F. Contoh Berkas Konfigurasi

Simpan harga di satu tempat (misalnya `config/pricing.json`) lalu baca dari halaman harga, halaman program, dan kalkulator.

```json
{
  "programs": {
    "digital-starter": { "sessions": 8,  "perSession": 140000, "duo": 100000, "trio": 80000,  "online": 120000, "validWeeks": 12 },
    "coding-starter":  { "sessions": 10, "perSession": 160000, "duo": 110000, "trio": 90000,  "online": 140000, "validWeeks": 14 },
    "ai-starter":      { "sessions": 6,  "perSession": 175000, "duo": 120000, "trio": 100000, "online": 155000, "validWeeks": 10 },
    "web-developer":   { "sessions": 12, "perSession": 200000, "duo": 140000, "trio": 110000, "online": 180000, "validWeeks": 16 },
    "ai-developer":    { "sessions": 12, "perSession": 225000, "duo": 160000, "trio": 125000, "online": 205000, "validWeeks": 16 }
  },
  "monthlyPackage": { "sessions": 4, "validWeeks": 6, "perSessionMarkup": 10000 },
  "singleSessionMarkup": 15000,
  "elementaryFactor": 0.75,
  "transportZones": [
    { "id": 1, "maxKm": 5,  "fee": 0 },
    { "id": 2, "maxKm": 10, "fee": 15000 },
    { "id": 3, "maxKm": 20, "fee": 30000 }
  ]
}
```

---

## G. Pertanyaan yang Sering Ditanyakan

**Webind Edu untuk siapa?**
Untuk siswa SD kelas 4–6, SMP, SMA, dan mahasiswa pemula yang ingin belajar komputer, pemrograman, dan AI lewat sesi privat. Program dipilih sesuai kelas dan kemampuan anak.

**Apakah perlu pengalaman programming sebelumnya?**
Tidak. Anak yang benar-benar baru dapat mulai dari Digital Starter atau Coding Starter. Jika anak sudah pernah mencoba, kami bantu memilih program yang tepat lewat sesi percobaan.

**Bagaimana sesi belajarnya dilakukan?**
Sesi privat 1-on-1 berdurasi 90 menit (60 menit untuk SD), baik langsung ke rumah maupun daring. Materi disiapkan mengikuti program yang dipilih dan disesuaikan dengan kecepatan anak.

**Apa yang saya dapatkan setelah menyelesaikan program?**
Anak mendapat proyek akhir sesuai program (misalnya game sederhana, website portofolio, atau model AI sederhana), laporan akhir, dan sertifikat kelulusan untuk Paket Program.

**Bisakah orang tua memantau progress anak?**
Bisa. Orang tua menerima laporan singkat setelah setiap sesi dan laporan akhir di akhir program.

**Apakah anak bisa pindah program jika kurang cocok?**
Bisa. Pada Paket Bulanan, perpindahan dilakukan di awal bulan berikutnya, dan sesi yang tersisa tetap dihitung.

**Berapa biaya transport?**
Gratis di Zona 1 dan ada tambahan di zona yang lebih jauh, sesuai tabel pada halaman ini.