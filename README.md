# Studio Karya Digital - Web Profile & Portofolio

Aplikasi web modern berbasis **HTML dan JavaScript murni** yang dirancang untuk dapat dijalankan secara instan di peramban (browser) lokal maupun dideploy ke **Vercel**.

---

## ✨ Fitur & Pemenuhan Kebutuhan

| Kebutuhan | Status | Implementasi |
|---|---|---|
| **1. Halaman Utama** | Selesai | Hero section interaktif, nilai keunggulan, highlight statistik, filter proyek pilihan, dan modal detail proyek. |
| **2. Halaman Profil** | Selesai | Narasi pengantar visi tim, kartu profil anggota dengan foto dan peran, alur kerja metodologi 4 tahap. |
| **3. Halaman Kontak** | Selesai | Formulir kirim pesan interaktif, riwayat pesan lokal (*Local Inbox* di peramban), dan kanal jejaring profesional. |
| **4. Konsep Warna** | Selesai | **Light Theme** elegan dengan latar belakang bersih (*slate-50*), kartu putih dengan bayangan lembut, dan aksen biru (*primary indigo*). |
| **5. Gaya Bahasa** | Selesai | **Semi-formal** bahasa Indonesia yang santun, komunikatif, dan profesional. |
| **6. Gambar & Foto** | Selesai | **Foto saya yang bisa diubah-ubah**: Tampil di Halaman Utama (Hero), Halaman Profil, dan Navigasi. Dapat diubah via Unggah Berkas lokal (JPG/PNG/WebP), Link URL gambar web, atau Pilihan Avatar bawaan, tersimpan otomatis di LocalStorage. Ditambah 3 gambar ilustrasi vektor modern. |
| **7. Privasi Informasi** | Selesai | **Sama sekali tidak memuat nomor HP, alamat fisik, maupun email**. Seluruh komunikasi dialihkan ke formulir interaktif dan akun sosial profesional resmi (GitHub, LinkedIn, Dribbble, Instagram). |
| **8. Siap untuk Vercel** | Selesai | Struktur statis murni tanpa proses build kompleks, dilengkapi file `vercel.json` dan `package.json`. |
| **9. Menu Login (Admin & User)** | Selesai | Sistem login peran ganda (*Administrator* & *Pengguna Biasa*), proteksi rute, dashboard khusus, dan tombol masuk demo instan (*1-Click Demo*). |
| **10. Edit Nama, Profil & Kontak** | Selesai | **Khusus Administrator**: Panel CMS terpadu untuk mengubah nama lengkap, peran, headline, biografi, keahlian teknis, dan akun kontak resmi yang langsung ter-update di seluruh web. |

---

## 🔐 Kredensial Masuk (Login)

Untuk kemudahan pengujian langsung di peramban lokal, sistem telah menyediakan akun demo terverifikasi:

| Peran Akun | Nama Pengguna (*Username*) | Kata Sandi (*Password*) | Hak Akses Fitur |
|---|---|---|---|
| **Administrator** | `admin` | `admin123` | Akses penuh **Dashboard Admin**: Mengubah Nama, Teks Profil & Kanal Kontak Resmi (CMS), melihat tabel seluruh pesan masuk dari pengunjung, membaca isi rincian pesan, menghapus pesan, mengosongkan antrean, dan memantau status sistem. |
| **Pengguna Biasa (User)** | `user` | `user123` | Akses **Area Pengguna**: Melihat ringkasan pesan yang pernah dikirimkan, nama otomatis terisi di formulir kontak, dan status keanggotaan terdaftar. |

> **Fitur 1-Click Demo:** Pada halaman login, tersedia tombol cepat **"Login: admin"** dan **"Login: user"** yang akan mengisi form dan memasukkan Anda secara otomatis dalam satu klik tanpa repot mengetik sandi.

---

## 📁 Struktur Direktori

```text
web-portfolio/
├── index.html                   # Berkas utama (Halaman Utama, Profil, & Kontak)
├── vercel.json                  # Konfigurasi deployment Vercel
├── package.json                 # Metadata proyek
├── .gitignore                   # Abaikan berkas sementara
├── README.md                    # Dokumentasi penggunaan
├── css/
│   └── style.css                # Desain visual lengkap bertema Light Theme
├── js/
│   └── app.js                   # Logika navigasi halaman, filter, form, & modal
└── assets/
    └── images/
        ├── hero-illustration.svg     # Ilustrasi Halaman Utama
        ├── profile-illustration.svg  # Ilustrasi Halaman Profil
        ├── contact-illustration.svg  # Ilustrasi Halaman Kontak
        ├── team-1.svg                # Avatar Bawaan 1
        ├── team-2.svg                # Avatar Bawaan 2
        ├── team-3.svg                # Avatar Bawaan 3
        └── team-4.svg                # Avatar Bawaan 4
```

---

## 🚀 Cara Menjalankan di Browser Lokal

Aplikasi ini tidak memerlukan instalasi Node.js atau server khusus untuk dicoba:

### Cara 1: Buka Langsung (Paling Cepat)
1. Buka folder proyek di File Explorer:  
   `C:\Users\ABBY\.gemini\antigravity\scratch\web-portfolio`
2. Klik dua kali (*double-click*) pada berkas **`index.html`**.
3. Aplikasi web akan langsung terbuka di browser favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, dll.).

### Cara 2: Menjalankan via Local Server (Opsional)
Jika Anda memiliki Node.js / VS Code Live Server / Python:
- **Dengan Python**:
  ```bash
  python -m http.server 3000
  ```
  Lalu buka `http://localhost:3000` di browser.
- **Dengan npx serve**:
  ```bash
  npx serve .
  ```

---

## 🌐 Cara Mengunggah (Deploy) ke Vercel

Aplikasi ini telah dioptimalkan khusus untuk Vercel. Anda dapat memilih salah satu cara berikut:

### Opsi A: Melalui GitHub & Dashboard Vercel (Rekomendasi)
1. Buat repositori baru di [GitHub](https://github.com/new).
2. Unggah/push seluruh isi folder `web-portfolio` ke repositori tersebut:
   ```bash
   git init
   git add .
   git commit -m "Inisialisasi web portofolio"
   git branch -M main
   git remote add origin <URL_REPOSITORI_GITHUB_ANDA>
   git push -u origin main
   ```
3. Buka [Vercel Dashboard](https://vercel.com/dashboard).
4. Klik tombol **"Add New..."** &gt; **"Project"**.
5. Pilih repositori GitHub Anda, lalu klik **"Deploy"**.
6. Vercel akan otomatis mengenali proyek sebagai *Static HTML* dan web Anda langsung tayang dalam beberapa detik!

### Opsi B: Menggunakan Vercel CLI
1. Buka terminal/PowerShell di folder proyek `web-portfolio`.
2. Jalankan perintah:
   ```bash
   npx vercel
   ```
3. Ikuti instruksi di terminal (tekan *Enter* untuk opsi default).
4. Web Anda akan langsung aktif dengan tautan publik Vercel!

---

## 💡 Fitur Interaktif Tambahan
- **Ganti Foto Profil Langsung**: Pada Halaman Profil, klik ikon kamera pada kartu anggota tim. Anda dapat memilih berkas foto dari komputer Anda untuk langsung dipratinjau di kartu profil secara instan.
- **Riwayat Pesan Lokal**: Setiap pesan yang Anda kirimkan melalui formulir di Halaman Kontak akan otomatis tercatat di panel *"Pesan Terkirim (Lokal)"* pada browser Anda menggunakan LocalStorage.
