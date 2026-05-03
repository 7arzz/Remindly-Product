# 🌊 Remindly — Manajer Tugas "Sea Space" Premium & Kolaboratif

**Remindly** adalah platform manajemen tugas dan kolaborasi real-time kelas atas yang dibangun dengan **React 19**, **Firebase**, dan **Tailwind CSS**. Template ini dirancang untuk memberikan pengalaman manajemen tugas yang elegan dengan estetika *Deep Sea glassmorphism*.

---

## 💎 Fitur Unggulan

- 🔐 **Autentikasi Google**: Sistem login yang aman dan instan.
- 🌍 **Shared Sea Space**: Tugas sinkron secara real-time untuk kolaborasi tim.
- 📊 **Statistik & Progress**: Visualisasi data yang interaktif dan dinamis.
- 📝 **Task & Project**: Pemisahan tugas harian dan manajemen proyek (catatan proyek).
- 🎨 **Desain Premium**: Animasi halus, efek kaca, dan responsivitas penuh.

---

## 🚀 Panduan Instalasi & Penggunaan

### 1. Persiapan Awal
Pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org/) (Versi 18 atau lebih baru)
- Terminal/CMD

### 2. Instalasi Proyek
```bash
# Instal dependensi (library yang dibutuhkan)
npm install

# Buat file konfigurasi lingkungan (.env)
# Salin konten dari .env.example ke .env baru
cp .env.example .env
```

### 3. Menjalankan Aplikasi
```bash
# Jalankan di mode pengembangan
npm run dev

# Aplikasi akan berjalan di: http://localhost:5173
```

---

## 🔥 Panduan Lengkap Membuat Firebase

Agar aplikasi ini bisa berjalan (Login & Simpan Data), Anda wajib membuat proyek Firebase sendiri. Ikuti langkah-langkah berikut:

### Langkah 1: Buat Proyek di Firebase Console
1. Pergi ke [Firebase Console](https://console.firebase.google.com/).
2. Klik **"Add Project"**, beri nama (misal: "MyRemindly"), lalu klik **Continue**.
3. Klik **"Create Project"** dan tunggu hingga selesai.

### Langkah 2: Aktifkan Google Authentication
1. Di menu kiri, buka **Build > Authentication**.
2. Klik tab **Sign-in method**, lalu klik **Add new provider**.
3. Pilih **Google**, aktifkan (**Enable**), pilih email dukungan, lalu klik **Save**.
4. **Penting**: Buka tab **Settings** > **Authorized domains**, pastikan `localhost` sudah ada. Jika Anda sudah deploy, tambahkan domain Anda (misal: `brand-anda.vercel.app`) di sini.

### Langkah 3: Siapkan Cloud Firestore (Database)
1. Di menu kiri, buka **Build > Firestore Database**.
2. Klik **"Create database"**.
3. Pilih lokasi (misal: `asia-southeast2` untuk Indonesia).
4. Pilih **"Start in test mode"** (agar bisa langsung baca/tulis), lalu klik **Create**.

### Langkah 4: Daftarkan Aplikasi Web & Ambil Kunci API
1. Klik ikon **Project Overview** di pojok kiri atas.
2. Klik ikon Web (`</>`) untuk mendaftarkan aplikasi.
3. Beri nama aplikasi (misal: "Remindly Web"), lalu klik **Register app**.
4. Anda akan melihat `firebaseConfig`. Salin nilai-nilai di dalamnya ke file `.env` Anda:

```bash
# Isi file .env Anda dengan data dari Firebase
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=proyek-anda.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=proyek-anda
VITE_FIREBASE_STORAGE_BUCKET=proyek-anda.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef...
```

---

## 🎨 Cara Pengeditan & Kustomisasi

Template ini dirancang agar sangat mudah diedit tanpa menyentuh banyak file logika.

### 1. Rebranding (Nama, Tagline, Author)
Buka file `src/config/appConfig.js`. Anda bisa mengubah segalanya di sini:
- `name`: Nama aplikasi Anda.
- `tagline`: Slogan yang muncul di halaman login.
- `author`: Nama Anda atau brand Anda.
- `features`: Aktifkan/matikan fitur tertentu (misal: matikan fitur statistik).

### 2. Mengubah Warna & Tema
Buka file `src/index.css`. Cari bagian `:root` untuk mengubah variabel warna utama:
- `--bg-primary`: Warna latar belakang dasar.
- `--accent-primary`: Warna tombol dan aksen (default: Aqua).
- `--bg-card`: Warna kotak/kartu tugas.

### 3. Mengubah Ikon App
Ganti file `favicon.svg` di folder `public/` dengan logo Anda sendiri.

---

## 📄 Struktur Folder
- `src/components`: Berisi semua potongan UI (TaskInput, TaskList, dll).
- `src/config`: Tempat utama untuk kustomisasi branding.
- `src/firebase.js`: Konfigurasi penghubung ke Firebase.
- `public/`: Tempat menyimpan aset statis seperti gambar dan icon.

---

## 🌐 Deployment (Online-kan Aplikasi)
Cara termudah adalah menggunakan **Vercel**:
1. Upload folder ini ke GitHub.
2. Login ke [Vercel](https://vercel.com/) dan hubungkan dengan repo GitHub Anda.
3. **Penting**: Di pengaturan Vercel, masukkan semua variabel dari `.env` ke bagian **Environment Variables**.
4. Klik **Deploy**. Selesai!

---

_Template ini dibuat dengan standar kode yang bersih untuk memudahkan pengembangan lebih lanjut._
